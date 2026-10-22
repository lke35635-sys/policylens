// AI 호출 공통 함수(src/lib/ai/client.ts)가 설계대로인지 확인한다 (PLAN 8번). 실제 AI는 부르지 않고 가짜 AI로 시험한다.
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-ai-client.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import { z } from "zod";
import { AiError, askAi, MAX_ATTEMPTS, openAiComplete } from "../src/lib/ai/client.ts";

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

const schema = z.object({ title: z.string() });
const request = { system: "시험", user: "시험" };
// 차례대로 준비한 답(글자) 또는 오류를 내놓는 가짜 AI. 몇 번 불렸는지도 센다.
function fake(...steps) {
  const f = async () => {
    f.calls += 1;
    const step = steps[Math.min(f.calls, steps.length) - 1];
    if (step instanceof Error) throw step;
    return step;
  };
  f.calls = 0;
  return f;
}
async function failsWith(promise) {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("오류가 나야 하는데 성공함");
}

console.log("1) 정상 답과 자동 재시도");
await check("모양이 맞는 답은 한 번에 돌려준다 (호출 1번)", async () => {
  const ai = fake('{"title":"유가 급등"}');
  const result = await askAi(request, schema, ai);
  expect(result.title === "유가 급등" && ai.calls === 1, `결과 ${JSON.stringify(result)}, 호출 ${ai.calls}번`);
});
await check("호출이 한 번 실패하면 자동으로 다시 시도해 성공한다 (호출 2번)", async () => {
  const ai = fake(new Error("네트워크 오류"), '{"title":"환율"}');
  const result = await askAi(request, schema, ai);
  expect(result.title === "환율" && ai.calls === 2, `호출 ${ai.calls}번`);
});
await check("JSON이 아닌 답이나 모양이 틀린 답도 한 번 다시 시도한다", async () => {
  const first = fake("JSON 아님", '{"title":"성공"}');
  expect((await askAi(request, schema, first)).title === "성공" && first.calls === 2, "JSON 아님");
  const second = fake('{"title":1}', '{"title":"성공"}');
  expect((await askAi(request, schema, second)).title === "성공" && second.calls === 2, "모양 틀림");
});

console.log("\n2) 계속 실패하면 AI_FAILED");
await check(`재시도는 1번뿐이다 (최대 ${MAX_ATTEMPTS}번 부르고 AI_FAILED)`, async () => {
  expect(MAX_ATTEMPTS === 2, `최대 호출 ${MAX_ATTEMPTS}번`);
  const ai = fake(new Error("계속 실패"));
  const error = await failsWith(askAi(request, schema, ai));
  expect(error instanceof AiError && error.code === "AI_FAILED" && ai.calls === 2, `호출 ${ai.calls}번, ${error.name}`);
});
await check("두 번 다 모양이 틀려도 AI_FAILED이고, 오류 문구에 AI의 답이나 내부 내용이 들어가지 않는다", async () => {
  const ai = fake('{"secret":"sk-비밀"}');
  const error = await failsWith(askAi(request, schema, ai));
  expect(error.code === "AI_FAILED" && !error.message.includes("sk-") && error.message.includes("다시 시도"), error.message);
});

console.log("\n3) 키 관리");
await check("키가 없으면 AI를 부르지 않고 바로 AI_FAILED다 (재시도 없음, 키 값은 출력하지 않음)", async () => {
  const saved = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  try {
    const error = await failsWith(askAi(request, schema, openAiComplete));
    expect(error.code === "AI_FAILED", error.message);
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
  console.log("AI 호출 공통 함수 검사 통과");
}
