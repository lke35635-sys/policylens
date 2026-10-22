// "이슈 9개 상한, 3개씩 보여 주기"(src/lib/stress/batches.ts)와 9개 샘플 이슈(sample.ts)가 설계대로인지 확인한다 (PLAN 7번).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-batches.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import {
  BATCH_SIZE,
  limitIssues,
  MAX_ISSUES,
  nextBatchSize,
  remainingCount,
  visibleCount,
} from "../src/lib/stress/batches.ts";
import { formatRange } from "../src/lib/stress/format.ts";
import { getSampleIssues } from "../src/lib/stress/sample.ts";

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
function same(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label}: 기대 ${JSON.stringify(expected)}, 실제 ${JSON.stringify(actual)}`);
}

console.log("1) 규칙: 이슈는 최대 9개, 한 차례 3개");
check("상한은 9개, 한 차례는 3개, 9개는 3차례다", () => {
  same(MAX_ISSUES, 9, "상한");
  same(BATCH_SIZE, 3, "한 차례");
  same(MAX_ISSUES / BATCH_SIZE, 3, "차례 수");
});
check("9개를 넘으면 기사에 나온 순서대로 앞의 9개만 남기고 나머지 수를 알려 준다 (12개 → 9개, 3개 제외)", () => {
  const found = Array.from({ length: 12 }, (_, i) => `이슈${i + 1}`);
  const { items, overflow } = limitIssues(found);
  same(items.length, 9, "남은 개수");
  same(overflow, 3, "제외된 개수");
  same(items.join(","), found.slice(0, 9).join(","), "순서");
});
check("9개 이하면 그대로 두고 제외는 0이다 (9개, 5개, 0개)", () => {
  for (const n of [9, 5, 0]) {
    const { items, overflow } = limitIssues(Array.from({ length: n }, (_, i) => i));
    same(items.length, n, `${n}개`);
    same(overflow, 0, `${n}개의 제외`);
  }
});
check("1차례 3개, 2차례 6개, 3차례 9개가 보이고 그 뒤로는 늘지 않는다 (이슈 9개)", () => {
  same([1, 2, 3, 4].map((r) => visibleCount(9, r)).join(","), "3,6,9,9", "보이는 수");
});
check("남은 이슈 수는 6, 3, 0, 0이다 (이슈 9개)", () => {
  same([1, 2, 3, 4].map((r) => remainingCount(9, r)).join(","), "6,3,0,0", "남은 수");
});
check("이슈가 4개면 첫 차례에 3개, 남은 1개, 다음 차례는 1개만 분석한다", () => {
  same(visibleCount(4, 1), 3, "보이는 수");
  same(remainingCount(4, 1), 1, "남은 수");
  same(nextBatchSize(4, 1), 1, "다음 차례");
  same(visibleCount(4, 2), 4, "2차례");
});
check("이슈가 3개 이하면 버튼이 필요 없다 (남은 0)", () => {
  for (const n of [0, 1, 2, 3]) same(remainingCount(n, 1), 0, `${n}개`);
});
check("다음 차례 수: 이슈 9개에서 1차례 뒤 3개, 3차례 뒤 0개", () => {
  same(nextBatchSize(9, 1), 3, "1차례 뒤");
  same(nextBatchSize(9, 3), 0, "3차례 뒤");
});
check("잘못된 차례 수(0, 음수)는 아무것도 보이지 않는다", () => {
  same(visibleCount(9, 0), 0, "0차례");
  same(visibleCount(9, -2), 0, "음수");
});

console.log("\n2) 샘플 이슈 9개");
const samples = getSampleIssues();
check("샘플은 상한(9개)과 같고 상한에 걸려 제외되는 것이 없다", () => {
  same(samples.length, MAX_ISSUES, "개수");
  same(limitIssues(samples).overflow, 0, "제외");
});
check("제목은 서로 다르고 모두 '샘플'을 밝힌다", () => {
  same(new Set(samples.map((s) => s.title)).size, 9, "서로 다른 제목");
  for (const s of samples) if (!s.title.includes("샘플")) throw new Error(`${s.title}`);
});
check("모든 샘플의 계산 검증이 통과한다", () => {
  for (const s of samples) if (!s.result.verification.passed) throw new Error(`${s.title}: ${s.result.verification.problems}`);
});
check("4번 연준 +200bp: GDP 중간 '-0.7%p', 환율 중간 '+16%', 나머지는 근거 없음", () => {
  const r = samples[3].result;
  same(formatRange(r.scenarios.medium.gdp), "-0.7%p", "GDP");
  same(formatRange(r.scenarios.medium.fx), "+16%", "환율");
  same(r.missing.join(","), "cpi,policyRate,kospi", "근거 없는 변수");
});
check("5번 환율 +8%: 물가 중간 '+0.24 ~ +0.4%p'", () => {
  same(formatRange(samples[4].result.scenarios.medium.cpi), "+0.24 ~ +0.4%p", "물가");
});
check("6번 세계 성장률 1%p 하락: GDP 중간 '-1 ~ -0.6%p'", () => {
  same(formatRange(samples[5].result.scenarios.medium.gdp), "-1 ~ -0.6%p", "GDP");
});
check("7번 원자재 +15%: 물가 중간 '+0.075 ~ +0.3%p'", () => {
  same(formatRange(samples[6].result.scenarios.medium.cpi), "+0.075 ~ +0.3%p", "물가");
});
check("8번 소재 공급 부족 45%: GDP 중간 '-3.3%p'", () => {
  same(formatRange(samples[7].result.scenarios.medium.gdp), "-3.3%p", "GDP");
});
check("9번 충격 수치 없는 에너지 이슈: 과거 사례(유가 10%) 값으로 GDP 중간 '-0.21 ~ -0.1%p'", () => {
  const r = samples[8].result;
  same(r.shock.source, "history", "출처");
  same(formatRange(r.scenarios.medium.gdp), "-0.21 ~ -0.1%p", "GDP");
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("이슈 묶음·샘플 검사 통과");
}
