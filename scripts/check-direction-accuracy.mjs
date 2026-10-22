// 방향 일치율 검증 (PLAN 3번): 계산 함수가 예측한 방향이 실제 변화 방향과 얼마나 맞는지 센다.
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-direction-accuracy.mjs
//
// 판정 방법 (PRD 3번)
// - 사례 10건 × 변수 5개 = 50칸 가운데, 아래 칸은 비교에서 뺀다.
//   · 계수 표에 근거가 없는 칸 ("근거 자료 없음": 숫자를 내지 않으므로 방향도 없음)
//   · 실제 변화 값이 없는 칸 (검증 자료에 GDP·소비자물가 변화만 있음)
//   · 실제 변화가 0.05%p 미만이라 방향을 말할 수 없는 칸
// - 예측 방향 = 중간 시나리오 범위의 가운데 값의 부호, 실제 방향 = 그해 전년 대비 변화의 부호
// - 목표: 비교한 칸 중 80% 이상 일치
// 이 스크립트는 결과를 알려 줄 뿐 표 값을 바꾸지 않는다. 목표에 못 미치면 사람이 이유를 보고 표를 고칠지 정한다.
import { calculateStressTest, midpoint } from "../src/lib/stress/calculate.ts";
import { COEFFICIENTS } from "../src/lib/stress/coefficients.ts";
import { HISTORICAL_CASES, typicalShock } from "../src/lib/stress/history.ts";
import { ISSUE_TYPE_LABEL, VARIABLE_KEYS, VARIABLE_META } from "../src/lib/stress/types.ts";
import { VALIDATION_CASES, VALIDATION_META } from "../src/lib/stress/validation-cases.ts";

const TARGET = 0.8;
const MIN_DIRECTION = 0.05; // 이보다 작은 변화는 방향 판정에서 제외 (%p)
const tables = { coefficients: COEFFICIENTS, typicalShock };

const problems = [];

// 충격 표의 과거 사례와 같은 유형·같은 연도면 겹치는 사례다 (정답을 보고 표를 맞추는 것을 막는다).
for (const v of VALIDATION_CASES) {
  for (const h of HISTORICAL_CASES) {
    if (h.type === v.type && String(h.date).startsWith(String(v.year))) {
      problems.push(`검증 사례 ${v.id}가 충격 표 사례 ${h.id}와 겹침`);
    }
  }
}
if (VALIDATION_CASES.length < 10) problems.push(`검증 사례가 ${VALIDATION_CASES.length}건뿐임 (10건 필요)`);

const sign = (value) => (value > 0 ? "+" : "-");
const rows = [];
const skipped = { noBasis: 0, noObserved: 0, tiny: 0 };
const byVariable = {};

for (const c of VALIDATION_CASES) {
  const result = calculateStressTest({ type: c.type, shock: c.shock }, tables);
  for (const variable of VARIABLE_KEYS) {
    const cell = result.scenarios.medium[variable];
    const observed = c.observed[variable];
    if (cell === null) {
      skipped.noBasis += 1;
      continue;
    }
    if (!observed) {
      skipped.noObserved += 1;
      continue;
    }
    if (Math.abs(observed.value) < MIN_DIRECTION) {
      skipped.tiny += 1;
      continue;
    }
    const predicted = sign(midpoint(cell));
    const actual = sign(observed.value);
    const match = predicted === actual;
    byVariable[variable] ??= { total: 0, matched: 0 };
    byVariable[variable].total += 1;
    if (match) byVariable[variable].matched += 1;
    rows.push({ id: c.id, variable, predicted, actual, observed: observed.value, match, note: observed.note });
  }
}

const total = VALIDATION_CASES.length * VARIABLE_KEYS.length;
const compared = rows.length;
const matched = rows.filter((r) => r.match).length;
const rate = compared > 0 ? matched / compared : 0;

console.log(`검증 규칙: ${VALIDATION_META.rule}`);
console.log(`자료 내려받은 날: ${VALIDATION_META.generatedAt}\n`);

console.log("사례별 비교 (예측 = 중간 시나리오 가운데 값의 부호, 실제 = 전년 대비 변화의 부호)");
for (const r of rows) {
  const label = `${r.id} ${VARIABLE_META[r.variable].label}`.padEnd(22, "　");
  console.log(`  ${r.match ? "✓" : "✗"} ${label} 예측 ${r.predicted}  실제 ${r.actual} (${r.observed > 0 ? "+" : ""}${r.observed}%p)  ${r.note}`);
}

console.log(`\n전체 ${total}칸 (${VALIDATION_CASES.length}건 × 변수 ${VARIABLE_KEYS.length}개)`);
console.log(`  제외: 근거 자료 없음 ${skipped.noBasis}칸, 실제 변화 값 없음 ${skipped.noObserved}칸, 변화 ${MIN_DIRECTION}%p 미만 ${skipped.tiny}칸`);
console.log(`  비교한 칸 ${compared}칸 중 일치 ${matched}칸`);
for (const [variable, s] of Object.entries(byVariable)) {
  console.log(`    ${VARIABLE_META[variable].label}: ${s.matched}/${s.total} (${Math.round((s.matched / s.total) * 100)}%)`);
}
const byType = {};
for (const c of VALIDATION_CASES) byType[c.type] = (byType[c.type] ?? 0) + 1;
console.log(`  사례 유형: ${Object.entries(byType).map(([t, n]) => `${ISSUE_TYPE_LABEL[t]} ${n}건`).join(", ")}`);

const needed = Math.ceil(TARGET * compared);
console.log(`\n방향 일치율: ${matched}/${compared} = ${(rate * 100).toFixed(1)}%  (목표 ${TARGET * 100}% 이상 = ${compared}칸 중 ${needed}칸 이상 일치)`);
console.log(rate >= TARGET ? "판정: 목표 달성" : "판정: 목표 미달");

if (problems.length > 0) {
  console.error(`\n검증 조건 문제 ${problems.length}개`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exitCode = 1;
}
