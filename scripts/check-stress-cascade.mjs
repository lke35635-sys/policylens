// 연쇄 효과 계산(src/lib/stress/cascade.ts)과 과거 관계 표(linkages.ts)가 설계대로인지 확인한다.
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-cascade.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import { calculateCascade } from "../src/lib/stress/cascade.ts";
import { calculateStressTest } from "../src/lib/stress/calculate.ts";
import { COEFFICIENTS } from "../src/lib/stress/coefficients.ts";
import { typicalShock } from "../src/lib/stress/history.ts";
import { LINKAGE_META, LINKAGE_SOURCES, LINKAGES, WEAK_LINKAGES } from "../src/lib/stress/linkages.ts";
import { getSampleIssues } from "../src/lib/stress/sample.ts";
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
function expect(condition, message) {
  if (!condition) throw new Error(message);
}
const near = (a, b) => Math.abs(a - b) < 1e-9;

console.log("1) 과거 관계 표");
check("쓰는 관계는 모두 상관계수 절댓값 0.3 이상이고, 뺀 관계는 모두 0.3 미만이다", () => {
  expect(LINKAGE_META.minAbsR === 0.3, `기준 ${LINKAGE_META.minAbsR}`);
  for (const l of LINKAGES) expect(Math.abs(l.r) >= 0.3, `${l.cause}→${l.effect} r=${l.r}`);
  for (const l of WEAK_LINKAGES) expect(Math.abs(l.r) < 0.3, `${l.cause}→${l.effect} r=${l.r}`);
});
check("기울기의 부호는 상관계수의 부호와 같고, 범위(기울기 ± 표준오차)는 기울기를 감싼다", () => {
  for (const l of [...LINKAGES, ...WEAK_LINKAGES]) {
    expect(Math.sign(l.slope) === Math.sign(l.r), `${l.cause}→${l.effect}: 기울기 ${l.slope}, r ${l.r}`);
    expect(l.low <= l.slope && l.slope <= l.high, `${l.cause}→${l.effect} 범위`);
  }
});
check("같은 변수끼리, 같은 연결의 중복, 코스피를 원인으로 하는 연결이 없다", () => {
  const seen = new Set();
  for (const l of [...LINKAGES, ...WEAK_LINKAGES]) {
    expect(l.cause !== l.effect && l.cause !== "kospi", `${l.cause}→${l.effect}`);
    const key = `${l.cause}→${l.effect}`;
    expect(!seen.has(key), `중복 ${key}`);
    seen.add(key);
  }
});
check("독립 표본 수는 표본 월 수의 12분의 1이고, 기간·방법·한계·출처 5개가 적혀 있다", () => {
  for (const l of LINKAGES) expect(l.nEff === Math.floor(LINKAGE_META.months / 12), `nEff ${l.nEff}`);
  expect(LINKAGE_META.period.includes("~") && LINKAGE_META.method.length > 20 && LINKAGE_META.caveat.length > 20, "메타");
  expect(LINKAGE_SOURCES.length === 5 && LINKAGE_SOURCES.every((s) => s.url.startsWith("https://")), "출처");
});

console.log("\n2) 연쇄 계산 (유가 +20% 샘플)");
const oil = getSampleIssues()[0].result;
const cascade = calculateCascade(oil);
const byKey = Object.fromEntries(cascade.map((c) => [`${c.linkage.cause}→${c.linkage.effect}`, c]));
check("원인 변수의 값이 결과 표에 있는 연결만 나온다 (GDP·물가만 값이 있으므로 물가→금리, GDP→코스피)", () => {
  expect(Object.keys(byKey).sort().join(",") === "cpi→policyRate,gdp→kospi", Object.keys(byKey).join(","));
});
check("GDP→코스피: 중간 GDP -0.42~-0.2%p × 기울기 3.84~6.71 → 코스피 -2.82 ~ -0.77%", () => {
  const e = byKey["gdp→kospi"].effect.medium;
  expect(near(e.min, -0.42 * LINKAGES.find((l) => l.cause === "gdp" && l.effect === "kospi").high) && e.unit === "%", JSON.stringify(e));
  expect(near(e.max, -0.2 * LINKAGES.find((l) => l.cause === "gdp" && l.effect === "kospi").low), JSON.stringify(e));
});
check("작음 ≤ 중간 ≤ 큼: 시나리오가 클수록 연쇄 효과의 크기도 커진다 (모든 연결)", () => {
  for (const c of cascade) {
    const size = (r) => Math.max(Math.abs(r.min), Math.abs(r.max));
    expect(size(c.effect.small) <= size(c.effect.medium) && size(c.effect.medium) <= size(c.effect.large), `${c.linkage.cause}→${c.linkage.effect}`);
  }
});
check("연쇄 효과의 범위는 min ≤ max이고, 단위는 결과 변수의 그래프 단위(%p 또는 %)다", () => {
  for (const c of cascade) for (const s of SCENARIO_KEYS) {
    expect(c.effect[s].min <= c.effect[s].max, `${c.linkage.effect}/${s}`);
    expect(c.effect[s].unit === (c.linkage.effect === "fx" || c.linkage.effect === "kospi" ? "%" : "%p"), `${c.linkage.effect} 단위 ${c.effect[s].unit}`);
  }
});

console.log("\n3) 경계 조건");
check("근거 없는 칸만 있는 결과(충격 크기를 모르는 경우)는 연쇄도 없다", () => {
  const none = calculateStressTest({ type: "commoditySupply", shock: null }, { coefficients: COEFFICIENTS, typicalShock: () => null });
  expect(calculateCascade(none).length === 0, "연쇄가 나옴");
});
check("원인 변수의 값이 1개월 값(코스피)이면 12개월 관계에 쓰지 않는다", () => {
  const kospiCause = [{ cause: "kospi", effect: "gdp", slope: 1, low: 0.5, high: 1.5, r: 0.5, nEff: 26 }];
  const r = calculateStressTest({ type: "fx", shock: { value: 10, unit: "% 원/달러 환율 상승" } }, { coefficients: COEFFICIENTS, typicalShock });
  expect(calculateCascade(r, kospiCause).length === 0, "1개월 값이 쓰임");
});
check("연쇄 계산은 결과 표의 값을 바꾸지 않는다", () => {
  const before = JSON.stringify(oil);
  calculateCascade(oil);
  expect(before === JSON.stringify(oil), "결과가 바뀜");
  expect(VARIABLE_KEYS.length === 5, "변수 수");
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("연쇄 효과 검사 통과");
}
