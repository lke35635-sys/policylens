// 정책 자료집(src/data)이 PRD 규칙을 지키는지 검사한다 (PLAN 2번, DESIGN §10).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-corpus.mjs [--release]
//   기본: 1) 검사 도구 자체 시험(가짜 자료로 규칙이 잡히는지)  2) 실제 자료집 검사  3) 이번 사이클 목표까지 남은 양 안내
//   --release: 실제 자료집이 개수 목표(정책 12개 등)까지 채웠는지도 실패 조건으로 본다 (종합 검증·배포 전에 쓴다)
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import { CORPUS } from "../src/data/index.ts";
import { TARGETS, verifyCorpus } from "../src/lib/corpus/verify.ts";
import { EXAMPLE_CORPUS } from "./fixtures/example-corpus.ts";

const release = process.argv.includes("--release");
let passed = 0;
const failures = [];
function check(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`  ✗ ${name}\n      ${error.message}`);
  }
}
const clone = () => structuredClone(EXAMPLE_CORPUS);
const policy = (c, id) => c.policies.find((p) => p.id === id);

console.log("1) 검사 도구 자체 시험 (가짜 자료)");
check("규칙을 지킨 가짜 자료는 문제 0개로 통과한다", () => {
  const { problems } = verifyCorpus(EXAMPLE_CORPUS);
  if (problems.length > 0) throw new Error(problems.join(" / "));
});

// [이름, 자료를 망가뜨리는 함수, 문제 메시지에 들어 있어야 할 글자]
const BREAKS = [
  ["출처가 없는 연혁 항목", (c) => { policy(c, "ex-domestic").history[1].sources = []; }, "출처가 1개 이상"],
  ["http 주소 출처", (c) => { policy(c, "ex-domestic").history[0].sources[0].url = "http://example.com/x"; }, "https 주소"],
  ["허용되지 않는 기관 종류(언론)", (c) => { policy(c, "ex-domestic").history[0].sources[0].institutionType = "언론"; }, "institutionType"],
  ["없는 날짜", (c) => { policy(c, "ex-domestic").history[0].date = "2022-02-30"; }, "없는 날짜"],
  ["연혁 4건", (c) => { policy(c, "ex-domestic").history.pop(); }, "5건 이상"],
  ["연혁 날짜 역순", (c) => { const h = policy(c, "ex-domestic").history; [h[1], h[2]] = [h[2], h[1]]; }, "오름차순"],
  ["연혁 요약 81자", (c) => { policy(c, "ex-domestic").history[0].summary = `${"가".repeat(80)}다.`; }, "80자를 넘습니다"],
  ["연혁 요약이 두 문장", (c) => { policy(c, "ex-domestic").history[0].summary = "첫 문장이다. 둘째 문장이다."; }, "한 문장"],
  ["별칭 중복", (c) => { policy(c, "ex-foreign").aliases.push("ex-d"); }, "별칭·이름 충돌"],
  ["정책 아이디 중복", (c) => { policy(c, "ex-foreign").id = "ex-domestic"; }, "아이디 중복"],
  ["기준일이 최근 연혁보다 이름", (c) => { policy(c, "ex-domestic").asOf = "2022-01-01"; }, "기준일"],
  ["마지막 확인일이 기준일보다 이름", (c) => { policy(c, "ex-domestic").lastCheckedAt = "2022-01-01"; }, "마지막 확인일"],
  ["해외 짝이 서로 맞지 않음", (c) => { policy(c, "ex-foreign").domesticPolicyId = "없는-정책"; }, "짝"],
  ["해외 정책에 국내 짝이 없음", (c) => { delete policy(c, "ex-foreign").domesticPolicyId; }, "국내 정책의 짝이어야"],
  ["해외 연혁에 정부 구분", (c) => { policy(c, "ex-foreign").history[0].governmentId = "gov-a"; }, "정부 구분을 두지 않습니다"],
  ["1998년 이후 국내 연혁에 정부 없음", (c) => { delete policy(c, "ex-domestic").history[1].governmentId; }, "정부를 연결해야"],
  ["정부 기간 밖의 연혁", (c) => { policy(c, "ex-domestic").history[3].governmentId = "gov-a"; }, "기간 밖"],
  ["기조 인용 101자", (c) => { c.governments[0].stance.quote = `${"가".repeat(100)}다.`; }, "100자를 넘습니다"],
  ["기조 인용이 두 문장", (c) => { c.governments[0].stance.quote = "첫 문장이다. 둘째 문장이다."; }, "한 문장"],
  ["인용이 있는데 이용 조건 없음", (c) => { delete c.governments[0].stance.source.license; }, "이용 조건"],
  ["정부 기간 겹침", (c) => { c.governments[0].end = "2014-01-01"; }, "겹치거나"],
  ["1998년 이전부터 시작한 정부", (c) => { c.governments[0].start = "1990-01-01"; }, "1998년"],
  ["경로 2개뿐", (c) => { c.transmission[0].channels.pop(); }, "경로가 3개 이상"],
  ["경로 해설 2문장", (c) => { c.transmission[0].channels[0].narrative.sentences.pop(); }, "3~6문장"],
  ["경로 해설 7문장", (c) => { c.transmission[0].channels[0].narrative.sentences.push("가", "나", "다", "라", "마"); }, "3~6문장"],
  ["해설 문장 81자", (c) => { c.transmission[0].channels[0].narrative.sentences[0] = `${"가".repeat(80)}다.`; }, "80자를 넘습니다"],
  ["요약 문단 501자", (c) => { c.transmission[0].summary.sentences = Array.from({ length: 7 }, () => `${"가".repeat(70)}.`); }, "500자를 넘습니다"],
  ["해설에 출처 없음", (c) => { c.transmission[0].channels[0].narrative.sources = []; }, "출처가 1개 이상"],
  ["단계가 없는 통계를 가리킴", (c) => { c.transmission[0].channels[0].steps[0].seriesId = "없는-통계"; }, "없는 통계"],
  ["그래프 지표가 단계 순서와 다름", (c) => { c.transmission[0].channels[0].chart.seriesIds = ["s2", "s1"]; }, "시행에 가까운"],
  ["그래프 지표 4개 이상 (3개까지만)", (c) => { c.series.push({ ...structuredClone(c.series[0]), id: "s4" }); c.transmission[0].channels[1].steps.push({ ...structuredClone(c.transmission[0].channels[1].steps[0]), id: "g2", seriesId: "s4" }); c.transmission[0].channels[1].chart.seriesIds.push("s4"); }, "시행에 가까운"],
  ["그래프가 빠짐", (c) => { delete c.transmission[0].channels[1].chart; }, "그래프가 없습니다"],
  ["통계 연결 단계가 1개뿐인데 그래프가 있음", (c) => { c.transmission[0].channels[2].chart = { seriesIds: ["s3"] }; }, "그래프를 두지 않습니다"],
  ["통계가 시행 2년 전부터 시작하지 않음", (c) => { c.series[0].points = c.series[0].points.slice(30); }, "2년 전부터"],
  ["통계가 시행 2년 뒤까지 이어지지 않음", (c) => { c.series[0].points = c.series[0].points.slice(0, 60); }, "2년 뒤까지"],
  ["통계 기간이 오름차순이 아님", (c) => { const p = c.series[0].points; [p[3], p[4]] = [p[4], p[3]]; }, "오름차순"],
  ["통계 기간 모양이 주기와 다름", (c) => { c.series[0].frequency = "quarterly"; }, "주기"],
  ["판정이 계산과 다름", (c) => { c.transmission[0].channels[0].assessment.unclear = false; }, "판정"],
  ["확인일이 문서 날짜보다 이름", (c) => { policy(c, "ex-domestic").history[0].sources[0].checkedAt = "1990-01-01"; }, "확인일"],
  ["보관본 주소가 원문과 같음", (c) => { const s = policy(c, "ex-domestic").history[0].sources[0]; s.archiveUrl = s.url; }, "보관본"],
];
for (const [name, brake, expected] of BREAKS) {
  check(`걸러냄: ${name}`, () => {
    const c = clone();
    brake(c);
    const { problems } = verifyCorpus(c);
    if (!problems.some((p) => p.includes(expected))) throw new Error(`"${expected}"가 들어간 문제를 찾지 못함. 나온 문제: ${problems.join(" / ") || "(없음)"}`);
  });
}
check("가짜 자료로 개수 목표(release)를 보면 목표 미달이 나온다 (정책 12개 등)", () => {
  const { problems } = verifyCorpus(EXAMPLE_CORPUS, { release: true });
  for (const key of ["정책이 12개", "국내 정책이 6개", "해외 정책이 6개", "재정·세제", "파급경로 계획이 6개"]) {
    if (!problems.some((p) => p.includes(key))) throw new Error(`"${key}" 미달이 안 나옴: ${problems.join(" / ")}`);
  }
});

console.log("\n2) 실제 자료집 (src/data)");
const real = verifyCorpus(CORPUS, { release });
check("실제 자료집이 모양과 규칙을 지킨다", () => {
  if (real.problems.length > 0) throw new Error(`\n        - ${real.problems.join("\n        - ")}`);
});
const s = real.stats;
console.log(`  현재: 정책 ${s.policies}개(국내 ${s.domestic}, 해외 ${s.foreign}), 정부 ${s.governments}개, 파급경로 ${s.plans}개, 통계 ${s.series}개`);
console.log(`  목표: 정책 ${TARGETS.policies}개 이상(국내 ${TARGETS.domestic}+해외 ${TARGETS.foreign}), 파급경로 ${TARGETS.plans}개 이상 ${release ? "(--release: 목표 미달은 실패)" : "(목표 미달은 --release에서만 실패)"}`);

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("자료집 검사 통과");
}
