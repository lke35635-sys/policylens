// 스트레스 테스트 계산 함수(src/lib/stress/calculate.ts)가 설계(DESIGN §4.6)와 PRD 규칙대로 동작하는지 확인한다.
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-calculate.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import {
  calculateStressTest,
  chartValue,
  midpoint,
  verifyStressResult,
} from "../src/lib/stress/calculate.ts";
import { COEFFICIENTS } from "../src/lib/stress/coefficients.ts";
import { typicalShock } from "../src/lib/stress/history.ts";
import {
  ISSUE_TYPES,
  SCENARIO_KEYS,
  VARIABLE_KEYS,
  VARIABLE_META,
} from "../src/lib/stress/types.ts";

const realTables = { coefficients: COEFFICIENTS, typicalShock };

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

const near = (a, b) => Math.abs(a - b) < 1e-9;
function expect(condition, message) {
  if (!condition) throw new Error(message);
}
function expectRange(cell, min, max, label) {
  expect(cell !== null, `${label}: 값이 없음(null)`);
  expect(near(cell.min, min) && near(cell.max, max), `${label}: 기대 ${min}~${max}, 실제 ${cell.min}~${cell.max}`);
}
function expectThrows(fn, label) {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  expect(threw, `${label}: 오류가 나야 하는데 계산됨`);
}

const OIL_UNIT = "% 국제 유가 상승";

console.log("1) 기본 계산 (실제 표)");
const oil20 = calculateStressTest({ type: "oil", shock: { value: 20, unit: OIL_UNIT } }, realTables);
check("유가 +20%: GDP는 작음 -0.21~-0.1, 중간 -0.42~-0.2, 큼 -0.63~-0.3", () => {
  expectRange(oil20.scenarios.small.gdp, -0.21, -0.1, "작음");
  expectRange(oil20.scenarios.medium.gdp, -0.42, -0.2, "중간");
  expectRange(oil20.scenarios.large.gdp, -0.63, -0.3, "큼");
});
check("유가 +20%: 소비자물가는 작음 0.11~0.2, 중간 0.22~0.4, 큼 0.33~0.6", () => {
  expectRange(oil20.scenarios.small.cpi, 0.11, 0.2, "작음");
  expectRange(oil20.scenarios.medium.cpi, 0.22, 0.4, "중간");
  expectRange(oil20.scenarios.large.cpi, 0.33, 0.6, "큼");
});
check("출처가 없는 변수(환율·기준금리·코스피)는 숫자 없이 null이고 missing에 들어간다", () => {
  for (const key of SCENARIO_KEYS) {
    for (const v of ["fx", "policyRate", "kospi"]) expect(oil20.scenarios[key][v] === null, `${key}/${v}가 null이 아님`);
  }
  expect(oil20.missing.join(",") === "fx,policyRate,kospi", `missing: ${oil20.missing}`);
});
check("값이 있는 변수에는 출처와 가정이 붙는다 (근거 표시 100%)", () => {
  expect(oil20.basis.map((b) => b.variable).join(",") === "gdp,cpi", "basis의 변수가 gdp, cpi가 아님");
  for (const item of oil20.basis) expect(item.sources.length > 0 && item.assumption.length > 0, `${item.variable}: 출처·가정 없음`);
});
check("단위와 기간이 변수 정의와 같다 (GDP %p·1년)", () => {
  const cell = oil20.scenarios.medium.gdp;
  expect(cell.unit === VARIABLE_META.gdp.unit && cell.period === VARIABLE_META.gdp.period, "단위·기간 불일치");
});
check("검증 통과", () => expect(oil20.verification.passed, oil20.verification.problems.join("; ")));
check("충격 출처는 기사(article)", () => expect(oil20.shock?.source === "article", `source: ${oil20.shock?.source}`));

const fx10 = calculateStressTest({ type: "fx", shock: { value: 10, unit: "% 원/달러 환율 상승" } }, realTables);
check("환율 +10%: 소비자물가 작음 0.15~0.25, 중간 0.3~0.5, 큼 0.45~0.75", () => {
  expectRange(fx10.scenarios.small.cpi, 0.15, 0.25, "작음");
  expectRange(fx10.scenarios.medium.cpi, 0.3, 0.5, "중간");
  expectRange(fx10.scenarios.large.cpi, 0.45, 0.75, "큼");
});

const export30 = calculateStressTest({ type: "exportControl", shock: { value: 30, unit: "% 반도체 소재 공급 부족" } }, realTables);
check("수출 규제 30% 부족: 단일 추정치라 범위가 한 점이고 작음 -1.1, 중간 -2.2, 큼 -3.3", () => {
  expectRange(export30.scenarios.small.gdp, -1.1, -1.1, "작음");
  expectRange(export30.scenarios.medium.gdp, -2.2, -2.2, "중간");
  expectRange(export30.scenarios.large.gdp, -3.3, -3.3, "큼");
  expect(export30.basis[0].singleEstimate === true, "singleEstimate가 true가 아님");
});

console.log("\n2) 충격 크기가 없을 때");
const oilHistory = calculateStressTest({ type: "oil", shock: null }, realTables);
check("기사에 충격 수치가 없으면 과거 사례 값(유가 10%)을 쓰고 '과거 사례 기준'으로 표시한다", () => {
  expect(oilHistory.shock?.source === "history" && oilHistory.shock.value === 10, `shock: ${JSON.stringify(oilHistory.shock)}`);
  expect(oilHistory.shock.historyRefs?.length > 0 && oilHistory.shock.historyRefs[0].year === 2026, "historyRefs가 없거나 연도가 다름");
  expectRange(oilHistory.scenarios.medium.gdp, -0.21, -0.1, "중간");
});
const noBasis = calculateStressTest({ type: "commoditySupply", shock: null }, realTables);
check("과거 사례도 없는 유형은 계산하지 않는다 (shock null, 모든 칸 null, 검증은 통과)", () => {
  expect(noBasis.shock === null, "shock이 null이 아님");
  expect(noBasis.missing.length === VARIABLE_KEYS.length, `missing 개수: ${noBasis.missing.length}`);
  for (const key of SCENARIO_KEYS) for (const v of VARIABLE_KEYS) expect(noBasis.scenarios[key][v] === null, `${key}/${v}가 null이 아님`);
  expect(noBasis.verification.passed, noBasis.verification.problems.join("; "));
});
check("기준금리 유형: 근거가 있는 GDP·환율만 값이 나오고 소비자물가·기준금리·코스피는 null이다 (연준 +200bp)", () => {
  const r = calculateStressTest({ type: "policyRate", shock: { value: 200, unit: "bp 연준 기준금리 인상폭" } }, realTables);
  expectRange(r.scenarios.medium.gdp, -0.7, -0.7, "GDP 중간");
  expectRange(r.scenarios.medium.fx, 16, 16, "환율 중간");
  expect(r.missing.join(",") === "cpi,policyRate,kospi", `missing: ${r.missing}`);
  expect(r.verification.passed, r.verification.problems.join("; "));
});

console.log("\n3) 잘못된 입력은 계산하지 않고 오류를 낸다");
check("충격 단위가 표와 다르면(유가에 bp) 오류", () =>
  expectThrows(() => calculateStressTest({ type: "oil", shock: { value: 50, unit: "bp" } }, realTables), "단위 불일치"));
check("충격이 0이면 오류", () =>
  expectThrows(() => calculateStressTest({ type: "oil", shock: { value: 0, unit: OIL_UNIT } }, realTables), "0"));
check("충격이 숫자가 아니면(NaN) 오류", () =>
  expectThrows(() => calculateStressTest({ type: "oil", shock: { value: Number.NaN, unit: OIL_UNIT } }, realTables), "NaN"));

console.log("\n4) 충격이 음수일 때 (유가 하락)");
check("유가 -10%: GDP 영향의 부호가 뒤집혀 중간 0.1~0.21이 되고 min ≤ max를 지킨다", () => {
  const r = calculateStressTest({ type: "oil", shock: { value: -10, unit: OIL_UNIT } }, realTables);
  expectRange(r.scenarios.medium.gdp, 0.1, 0.21, "중간");
  expect(r.verification.passed, r.verification.problems.join("; "));
});

console.log("\n5) 영향 크기 순서 (작음 ≤ 중간 ≤ 큼): 여러 충격 크기로 반복");
check("6개 유형 × 충격 크기 9가지에서 순서가 항상 지켜지고 검증이 통과한다", () => {
  const sizes = [0.1, 1, 3, 5, 10, 20, 37.5, -3, -10];
  const units = {
    oil: OIL_UNIT,
    fx: "% 원/달러 환율 상승",
    exportControl: "% 반도체 소재 공급 부족",
    policyRate: "bp 연준 기준금리 인상폭",
    commoditySupply: "% 국제 원자재 가격 상승",
    globalSlowdown: "%p 세계 경제성장률 하락",
  };
  let count = 0;
  for (const type of ISSUE_TYPES) {
    for (const size of sizes) {
      const unit = units[type] ?? "% 시험용";
      const r = calculateStressTest({ type, shock: { value: size, unit } }, realTables);
      expect(r.verification.passed, `${type} ${size}: ${r.verification.problems.join("; ")}`);
      count += 1;
    }
  }
  expect(count === ISSUE_TYPES.length * sizes.length, "반복 횟수 이상");
});

console.log("\n6) 검증(⑥)이 잘못된 결과를 잡아내는지");
check("작음과 큼을 바꿔치기하면 순서 오류로 잡는다", () => {
  const tampered = structuredClone(oil20);
  [tampered.scenarios.small.gdp, tampered.scenarios.large.gdp] = [tampered.scenarios.large.gdp, tampered.scenarios.small.gdp];
  const problems = verifyStressResult(tampered);
  expect(problems.some((p) => p.includes("순서")), `잡지 못함: ${problems}`);
});
check("근거를 지우면 '출처나 가정이 없음'으로 잡는다", () => {
  const tampered = structuredClone(oil20);
  tampered.basis = tampered.basis.filter((b) => b.variable !== "gdp");
  expect(verifyStressResult(tampered).some((p) => p.includes("출처")), "잡지 못함");
});
check("한 시나리오 칸만 비우면 '일부에만 값이 있음'으로 잡는다", () => {
  const tampered = structuredClone(oil20);
  tampered.scenarios.medium.cpi = null;
  expect(verifyStressResult(tampered).some((p) => p.includes("일부")), "잡지 못함");
});
check("값이 없는 변수에 근거가 남아 있으면 잡는다", () => {
  const tampered = structuredClone(oil20);
  for (const key of SCENARIO_KEYS) tampered.scenarios[key].gdp = null;
  expect(verifyStressResult(tampered).some((p) => p.includes("근거가 있음")), "잡지 못함");
});

console.log("\n7) 시험용 표로도 같은 함수가 동작하는지 (표를 인자로 받는 구조)");
check("기준금리 bp 표: 150bp 충격에서 작음 40~60, 중간 80~120, 큼 120~180bp", () => {
  const pending = { status: "pending", note: "시험용" };
  const source = { institution: "시험", title: "시험용 보고서", date: "2000-01", url: "https://example.com", via: "시험" };
  const fakeCoefficients = Object.fromEntries(
    ISSUE_TYPES.map((t) => [t, Object.fromEntries(VARIABLE_KEYS.map((v) => [v, pending]))]),
  );
  fakeCoefficients.policyRate.policyRate = {
    status: "sourced",
    min: 40,
    max: 60,
    per: { value: 75, unit: "bp 시험용 인상폭" },
    period: "1y",
    sources: [source],
    assumption: "시험용 가정",
  };
  const r = calculateStressTest(
    { type: "policyRate", shock: { value: 150, unit: "bp" } },
    { coefficients: fakeCoefficients, typicalShock: () => null },
  );
  expectRange(r.scenarios.small.policyRate, 40 * 2 * 0.5, 60 * 2 * 0.5, "작음");
  expectRange(r.scenarios.medium.policyRate, 80, 120, "중간");
  expectRange(r.scenarios.large.policyRate, 120, 180, "큼");
  expect(r.verification.passed, r.verification.problems.join("; "));
});

console.log("\n8) 그래프용 환산");
check("기준금리만 100bp = 1%p로 환산하고 나머지는 그대로", () => {
  expect(near(chartValue("policyRate", 25), 0.25), "25bp → 0.25%p가 아님");
  expect(near(chartValue("gdp", 0.3), 0.3) && near(chartValue("fx", 1.2), 1.2) && near(chartValue("kospi", -2.7), -2.7), "다른 변수가 바뀜");
});
check("선은 범위의 가운데 값을 지난다 (-0.4~-0.1 → -0.25)", () => {
  expect(near(midpoint({ min: -0.4, max: -0.1 }), -0.25), "가운데 값이 -0.25가 아님");
});

// ── 눈으로 확인하는 표 ───────────────────────────────────────────
console.log("\n유가 +20% 계산 결과 (실제 표 기준, '근거 자료 없음'은 숫자를 내지 않은 칸)");
console.log(`${"변수".padEnd(14)}${"작음".padEnd(16)}${"중간".padEnd(16)}큼`);
for (const v of VARIABLE_KEYS) {
  const cells = SCENARIO_KEYS.map((key) => {
    const c = oil20.scenarios[key][v];
    return c ? `${c.min} ~ ${c.max}${VARIABLE_META[v].unit}` : "근거 자료 없음";
  });
  console.log(`${VARIABLE_META[v].label.padEnd(12, "　")}${cells[0].padEnd(18)}${cells[1].padEnd(18)}${cells[2]}`);
}

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("계산 함수 검사 통과");
}
