// 저장된 "뚜렷한 연관 없음" 판정이 계산식과 맞는지 확인한다 (PLAN 10번, DESIGN §10 그래프 규칙의 판정 부분).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-assessment.mjs   (인터넷 필요 없음)
// 1) 계산 함수를 손으로 계산한 가짜 통계로 시험한다. 2) 실제 자료집의 경로마다 저장된 값을 다시 계산해 같은지 본다.
import { computeAssessment } from "../src/lib/corpus/assessment.ts";
import { CORPUS } from "../src/data/index.ts";

let passed = 0;
const failures = [];
const check = (name, fn) => {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`  ✗ ${name}\n      ${error.message}`);
  }
};
const expect = (c, m) => {
  if (!c) throw new Error(m);
};
const near = (a, b) => Math.abs(a - b) < 1e-6;

// 시험용 월별 통계: 시작 달부터 값 목록을 이어 붙인다
function monthly(start, values, id = "t") {
  let [y, m] = start.split("-").map(Number);
  return { id, name: "시험", unit: "x", frequency: "monthly", source: {}, points: values.map((value) => {
    const period = `${y}-${String(m).padStart(2, "0")}`;
    m += 1;
    if (m > 12) { m = 1; y += 1; }
    return { period, value };
  }) };
}

console.log("1) 계산 함수 자체 시험 (손으로 계산한 가짜 통계)");
// 시행 2020-07. 2010-07 ~ 2020-06은 번갈아 0,2 (120개월): 평균 1, 표본 표준편차 = sqrt(120/119)
const base = Array.from({ length: 120 }, (_, i) => (i % 2 === 0 ? 0 : 2));
const eff = "2020-07-15";
check("직전·직후 12개월 평균 차이와 표준편차를 계산한다", () => {
  // 시행월(2020-07)은 어느 쪽에도 넣지 않는다: 값 99를 넣어 뒤 12개월(2020-08~2021-07)이 모두 3
  const s = monthly("2010-07", [...base, 99, ...Array(12).fill(3)]);
  const a = computeAssessment(s, eff, "2026-10-23");
  expect(a !== null, "null");
  // 직전 12개월 = 2019-07~2020-06 = 0,2 번갈아 평균 1, 직후 평균 3 → 변화 2
  expect(near(a.change, 2), `변화 ${a.change}`);
  expect(near(a.stdev, Math.sqrt(120 / 119)), `표준편차 ${a.stdev}`);
  expect(a.stdevPeriod === "2010-07 ~ 2020-06", a.stdevPeriod);
  expect(a.unclear === false, "변화 2 > 표준편차 약 1.004 이므로 unclear=false여야 함");
});
check("변화가 표준편차 이내이면 unclear = true", () => {
  const s = monthly("2010-07", [...base, 99, ...Array(12).fill(1.5)]);
  const a = computeAssessment(s, eff, "2026-10-23");
  expect(a.unclear === true && near(a.change, 0.5), `변화 ${a.change}, unclear ${a.unclear}`);
});
check("변화와 표준편차가 같으면 unclear = true (이내)", () => {
  const s = monthly("2010-07", [...base, 99, ...Array(12).fill(1)]);
  const a = computeAssessment(s, eff, "2026-10-23");
  expect(a.unclear === true, "경계는 이내로 본다");
});
check("시행 전 통계가 10년보다 짧으면 있는 기간으로 계산하고 기간을 적는다", () => {
  const s = monthly("2019-01", [...Array.from({ length: 18 }, (_, i) => (i % 2 === 0 ? 0 : 2)), 99, ...Array(12).fill(3)]);
  const a = computeAssessment(s, eff, "2026-10-23");
  expect(a !== null && a.stdevPeriod === "2019-01 ~ 2020-06", a?.stdevPeriod);
});
check("시행 전 통계가 12개월보다 짧으면 판정하지 않는다", () => {
  const s = monthly("2020-01", [...Array(6).fill(1), 99, ...Array(12).fill(3)]);
  expect(computeAssessment(s, eff, "2026-10-23") === null, "null이어야 함");
});
check("시행 후 12개월이 안 차면 판정하지 않는다", () => {
  const s = monthly("2010-07", [...base, 99, ...Array(6).fill(3)]);
  expect(computeAssessment(s, eff, "2026-10-23") === null, "null이어야 함");
});
check("분기 통계는 4개 분기를 직전·직후 12개월로 본다", () => {
  const q = { id: "q", name: "시험", unit: "x", frequency: "quarterly", source: {}, points: [] };
  const pts = [];
  for (let y = 2010; y <= 2021; y += 1) for (let n = 1; n <= 4; n += 1) pts.push({ period: `${y}-Q${n}`, value: y < 2020 || (y === 2020 && n <= 2) ? (n % 2 === 0 ? 0 : 2) : 5 });
  q.points = pts;
  const a = computeAssessment(q, "2020-07-15", "2026-10-23");
  expect(a !== null, "null");
});

console.log("\n2) 실제 자료집의 저장된 판정");
const seriesById = new Map(CORPUS.series.map((s) => [s.id, s]));
let checked = 0;
const problems = [];
for (const plan of CORPUS.transmission) {
  const policy = CORPUS.policies.find((p) => p.id === plan.foreignPolicyId);
  for (const c of plan.channels) {
    if (!c.chart) {
      if (c.assessment) problems.push(`${c.id}: 그래프가 없는데 판정이 있습니다`);
      continue;
    }
    if (!c.assessment) {
      problems.push(`${c.id}: 그래프가 있는데 판정이 없습니다 (scripts/build-assessment.mjs 실행 필요)`);
      continue;
    }
    const last = c.chart.seriesIds[c.chart.seriesIds.length - 1];
    const fresh = computeAssessment(seriesById.get(last), policy.firstEffectiveDate, c.assessment.computedAt);
    if (!fresh) { problems.push(`${c.id}: 다시 계산하지 못했습니다`); continue; }
    if (c.assessment.seriesId !== last) problems.push(`${c.id}: 판정 지표가 그래프 마지막 지표(${last})가 아닙니다`);
    for (const k of ["change", "stdev"]) if (!near(fresh[k], c.assessment[k])) problems.push(`${c.id}: 저장된 ${k}(${c.assessment[k]})가 계산값(${fresh[k]})과 다릅니다`);
    if (fresh.unclear !== c.assessment.unclear) problems.push(`${c.id}: 저장된 unclear가 계산값과 다릅니다`);
    if (fresh.stdevPeriod !== c.assessment.stdevPeriod) problems.push(`${c.id}: 표준편차 기간이 다릅니다`);
    checked += 1;
  }
}
check("저장된 판정이 모두 계산식과 같다", () => expect(problems.length === 0, `\n        - ${problems.join("\n        - ")}`));
console.log(`  판정 ${checked}개 확인`);

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else console.log("판정 검사 통과");
