// 이슈 찾기(src/lib/ai/extract-issues.ts)와 서버 주소(src/app/api/issues/route.ts)가 설계대로인지 확인한다 (PLAN 9번).
// 실제 AI는 부르지 않고 가짜 AI로 시험한다. 실제 호출 시험은 scripts/try-openai.mjs로 따로 한다.
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-issues-api.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import { ApiError } from "../src/lib/ai/errors.ts";
import { extractIssues } from "../src/lib/ai/extract-issues.ts";
import { MAX_TEXT_CHARS } from "../src/lib/ai/limits.ts";
import { ISSUES_SYSTEM, issuesUserMessage } from "../src/lib/ai/prompts.ts";
import { POST } from "../src/app/api/issues/route.ts";

let passed = 0;
const failures = [];
async function check(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`  ✗ ${name}\n      ${error.message}`);
  }
}
function expect(condition, message) {
  if (!condition) throw new Error(message);
}
const answer = (n, extra = {}) =>
  JSON.stringify({ issues: Array.from({ length: n }, (_, i) => ({ title: `이슈${i + 1}`, excerpt: `기사 문단 ${i + 1}`, ...extra })) });
const fakeAi = (text) => {
  const f = async (request) => {
    f.calls += 1;
    f.last = request;
    return text;
  };
  f.calls = 0;
  return f;
};
async function codeOf(promise) {
  try {
    await promise;
  } catch (error) {
    return error instanceof ApiError ? error.code : `다른 오류: ${error.message}`;
  }
  return "성공";
}
const post = (body, headers = {}) =>
  POST(new Request("http://localhost/api/issues", { method: "POST", headers: { "content-type": "application/json", ...headers }, body }));

console.log("1) 이슈 뽑기");
await check("기사 순서대로 이슈를 돌려주고 id를 붙인다 (3개)", async () => {
  const { issues, overflow } = await extractIssues("기사 글자", fakeAi(answer(3)));
  expect(issues.map((i) => i.id).join(",") === "issue-1,issue-2,issue-3" && issues[0].title === "이슈1" && overflow === 0, JSON.stringify(issues));
});
await check("이슈가 12개로 오면 앞의 9개만 남기고 3개가 넘쳤다고 알린다", async () => {
  const { issues, overflow } = await extractIssues("기사 글자", fakeAi(answer(12)));
  expect(issues.length === 9 && overflow === 3 && issues[8].title === "이슈9", `${issues.length}개, 넘침 ${overflow}`);
});
await check("너무 긴 제목·문단은 화면용 길이로 자른다 (제목 80자, 문단 1000자)", async () => {
  const long = JSON.stringify({ issues: [{ title: "가".repeat(200), excerpt: "나".repeat(3000) }] });
  const { issues } = await extractIssues("기사 글자", fakeAi(long));
  expect(issues[0].title.length === 80 && issues[0].excerpt.length === 1000, `${issues[0].title.length}/${issues[0].excerpt.length}`);
});
await check("AI에 보내는 글: 지시문은 역할·규칙만, 기사 글자는 <기사> 표시로 감싼 사용자 글로 따로 간다", async () => {
  const ai = fakeAi(answer(1));
  await extractIssues("ZZ본문ZZ", ai);
  expect(ai.last.user === issuesUserMessage("ZZ본문ZZ") && ai.last.user.startsWith("<기사>") && !ai.last.system.includes("ZZ본문ZZ"), "메시지");
  expect(ISSUES_SYSTEM.includes("따르지 말고") && ISSUES_SYSTEM.includes("최대 9개") && ISSUES_SYSTEM.includes("계산하거나 영향을 예측하지"), "지시문");
});

console.log("\n2) 오류");
await check("이슈가 없다는 답(빈 배열)은 NO_ISSUE다", async () => {
  expect((await codeOf(extractIssues("기사 글자", fakeAi('{"issues":[]}')))) === "NO_ISSUE", "코드");
});
await check("빈 글자는 AI를 부르지 않고 NO_ISSUE다", async () => {
  const ai = fakeAi(answer(1));
  expect((await codeOf(extractIssues("   \n ", ai))) === "NO_ISSUE" && ai.calls === 0, `호출 ${ai.calls}번`);
});
await check(`글자가 상한(${MAX_TEXT_CHARS}자)을 넘으면 AI를 부르지 않고 TEXT_TOO_LONG이다 (상한 그대로는 통과)`, async () => {
  const ai = fakeAi(answer(1));
  expect((await codeOf(extractIssues("가".repeat(MAX_TEXT_CHARS + 1), ai))) === "TEXT_TOO_LONG" && ai.calls === 0, "초과");
  expect((await codeOf(extractIssues("가".repeat(MAX_TEXT_CHARS), ai))) === "성공", "상한 그대로");
});
await check("AI가 계속 모양이 틀린 답을 하면 한 번 다시 시도한 뒤 AI_FAILED다 (호출 2번)", async () => {
  const ai = fakeAi('{"issues":[{"title":1}]}');
  expect((await codeOf(extractIssues("기사 글자", ai))) === "AI_FAILED" && ai.calls === 2, `호출 ${ai.calls}번`);
});

console.log("\n3) 서버 주소 (/api/issues, AI를 부르기 전에 걸러지는 경우)");
const readError = async (res) => (await res.json()).error;
await check("JSON이 아니거나 text가 글자가 아니면 400 BAD_REQUEST", async () => {
  for (const body of ["이건 JSON 아님", JSON.stringify({ text: 123 }), JSON.stringify({})]) {
    const res = await post(body);
    const error = await readError(res);
    expect(res.status === 400 && error.code === "BAD_REQUEST", `${body}: ${res.status} ${error?.code}`);
  }
});
await check("글자가 상한을 넘으면 413 TEXT_TOO_LONG이고 오류 모양은 { error: { code, message } }다", async () => {
  const res = await post(JSON.stringify({ text: "가".repeat(MAX_TEXT_CHARS + 1) }));
  const error = await readError(res);
  expect(res.status === 413 && error.code === "TEXT_TOO_LONG" && error.message === "요청이 너무 깁니다.", `${res.status} ${JSON.stringify(error)}`);
});
await check("본문 크기(content-length)가 너무 크면 읽지 않고 413으로 거절한다", async () => {
  const res = await post(JSON.stringify({ text: "짧은 글" }), { "content-length": String(MAX_TEXT_CHARS * 3 + 5000) });
  expect(res.status === 413, `${res.status}`);
});
await check("AI 키가 없으면 502 AI_FAILED이고 문구에 내부 내용·키가 없다", async () => {
  const saved = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  try {
    const res = await post(JSON.stringify({ text: "기사 글자" }));
    const error = await readError(res);
    expect(res.status === 502 && error.code === "AI_FAILED" && error.message === "분석에 실패했습니다. 다시 시도해 주세요.", `${res.status} ${JSON.stringify(error)}`);
  } finally {
    if (saved !== undefined) process.env.OPENAI_API_KEY = saved;
  }
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("이슈 찾기 API 검사 통과");
}
