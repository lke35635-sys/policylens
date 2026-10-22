// 결과 표에 보이는 글자(format.ts)와 샘플 데이터(sample.ts)가 설계대로인지 확인한다 (PLAN 5번).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-format.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import {
  formatNumber,
  formatPeriod,
  formatRange,
  formatShock,
  formatShockSource,
} from "../src/lib/stress/format.ts";
import { getSampleIssues, SAMPLE_NOTICE } from "../src/lib/stress/sample.ts";
import { SCENARIO_KEYS, VARIABLE_KEYS } from "../src/lib/stress/types.ts";

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
  if (actual !== expected) throw new Error(`${label}: 기대 "${expected}", 실제 "${actual}"`);
}

console.log("1) 숫자와 범위 모양");
check("양수에는 +, 음수에는 -, 0은 부호 없이, 뒤의 0은 뺀다", () => {
  same(formatNumber(0.2), "+0.2", "0.2");
  same(formatNumber(-0.42), "-0.42", "-0.42");
  same(formatNumber(0), "0", "0");
  same(formatNumber(-0.0004), "0", "-0.0004");
  same(formatNumber(16), "+16", "16");
  same(formatNumber(1.2346), "+1.235", "1.2346"); // 셋째 자리까지 반올림 (딱 절반인 값은 컴퓨터가 정확히 저장하지 못해 시험에 쓰지 않는다)
});
check("범위는 'min ~ max단위', 추정치가 하나뿐이면 한 값만 쓴다", () => {
  same(formatRange({ min: -0.42, max: -0.2, unit: "%p" }), "-0.42 ~ -0.2%p", "범위");
  same(formatRange({ min: 0.22, max: 0.4, unit: "%p" }), "+0.22 ~ +0.4%p", "양수 범위");
  same(formatRange({ min: -2.2, max: -2.2, unit: "%p" }), "-2.2%p", "단일");
  same(formatRange({ min: 80, max: 120, unit: "bp" }), "+80 ~ +120bp", "bp");
});
check("기간 문구", () => {
  same(formatPeriod("1y"), "충격 후 1년 누적", "1y");
  same(formatPeriod("1m"), "향후 1개월", "1m");
});
check("충격 크기는 숫자 바로 뒤에 단위를 붙인다", () => {
  same(formatShock({ value: 20, unit: "% 국제 유가 상승" }), "+20% 국제 유가 상승", "유가");
  same(formatShock({ value: 200, unit: "bp 연준 기준금리 추가 인상폭 (연말 3.75%까지)" }), "+200bp 연준 기준금리 추가 인상폭 (연말 3.75%까지)", "bp");
  same(formatShock({ value: 1, unit: "%" }), "+1%", "단위만 있는 경우");
});
check("충격 출처: 기사 기준 / 과거 사례 기준", () => {
  same(formatShockSource({ value: 20, unit: "%", source: "article" }), "기사 기준", "기사");
  same(
    formatShockSource({ value: 30, unit: "%", source: "history", historyRefs: [{ report: "보고서", year: 2019 }] }),
    "과거 사례 기준: 보고서, 2019년",
    "과거 사례",
  );
});

console.log("\n2) 샘플 데이터");
const samples = getSampleIssues();
check("샘플은 이슈 상한(9개)만큼 있고 세 가지 상태(기사 기준 / 과거 사례 기준 / 계산 불가)를 모두 보여 준다", () => {
  same(String(samples.length), "9", "개수");
  same(String(samples.filter((s) => s.result.shock?.source === "article").length), "6", "기사 기준");
  same(String(samples.filter((s) => s.result.shock?.source === "history").length), "2", "과거 사례 기준");
  same(String(samples.filter((s) => s.result.shock === null).length), "1", "계산 불가");
  same(String(samples.filter((s) => s.approximate).length), "4", "근사치");
});
check("요약은 300자 이내이고 샘플 안내 문구가 있다", () => {
  for (const s of samples) if (s.summary.length > 300) throw new Error(`${s.title}: 요약 ${s.summary.length}자`);
  if (!SAMPLE_NOTICE.includes("샘플")) throw new Error("샘플 안내 문구에 '샘플'이 없음");
});
check("모든 샘플 결과가 계산 검증을 통과한다", () => {
  for (const s of samples) if (!s.result.verification.passed) throw new Error(`${s.title}: ${s.result.verification.problems}`);
});
const oil = samples[0].result;
check("유가 +20% 샘플: GDP 중간은 '-0.42 ~ -0.2%p', 물가 중간은 '+0.22 ~ +0.4%p', 근거 없는 칸은 null", () => {
  same(formatRange(oil.scenarios.medium.gdp), "-0.42 ~ -0.2%p", "GDP 중간");
  same(formatRange(oil.scenarios.medium.cpi), "+0.22 ~ +0.4%p", "물가 중간");
  for (const key of SCENARIO_KEYS) for (const v of ["fx", "policyRate", "kospi"]) {
    if (oil.scenarios[key][v] !== null) throw new Error(`${key}/${v}가 null이 아님`);
  }
});
const exportControl = samples[1].result;
check("수출 규제 샘플: 충격 수치가 없어 과거 사례(30%) 값을 쓰고 GDP 중간은 '-2.2%p'", () => {
  same(exportControl.shock.source, "history", "출처");
  same(formatRange(exportControl.scenarios.medium.gdp), "-2.2%p", "GDP 중간");
  same(formatShockSource(exportControl.shock).startsWith("과거 사례 기준: "), true, "출처 문구");
});
const commodity = samples[2].result;
check("원자재 샘플: 충격 크기를 알 수 없어 모든 칸이 null이다", () => {
  same(String(commodity.shock), "null", "shock");
  for (const key of SCENARIO_KEYS) for (const v of VARIABLE_KEYS) {
    if (commodity.scenarios[key][v] !== null) throw new Error(`${key}/${v}가 null이 아님`);
  }
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("결과 표 글자·샘플 검사 통과");
}
