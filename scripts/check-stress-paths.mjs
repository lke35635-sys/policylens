// 시점별 그래프에 그릴 값(src/lib/stress/paths.ts, axis.ts)과 과거 실제 통계가 설계대로인지 확인한다 (PLAN 6번).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-paths.mjs
// 하나라도 어긋나면 종료 코드 1로 끝난다.
import { alignedDomains, AXIS_UNIT, niceStep } from "../src/lib/stress/axis.ts";
import { calculateStressTest } from "../src/lib/stress/calculate.ts";
import { OBSERVED_META, OBSERVED_SERIES } from "../src/lib/stress/observed-series.ts";
import { buildScenarioPaths, chartValues, DEFAULT_PAST_MONTHS, monthLabel } from "../src/lib/stress/paths.ts";
import { getSampleIssues } from "../src/lib/stress/sample.ts";
import { ISSUE_TYPES, SCENARIO_KEYS, VARIABLE_KEYS } from "../src/lib/stress/types.ts";

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

console.log("1) 과거 실제 통계 (IMF)");
const monthIndex = (m) => Number(m.slice(0, 4)) * 12 + (Number(m.slice(5, 7)) - 1);
check("변수 5개 모두 월별 37개(기준 월 포함 36개월 전부터)이고 끊김 없이 이어진다", () => {
  for (const v of VARIABLE_KEYS) {
    const pts = OBSERVED_SERIES[v].points;
    expect(pts.length === OBSERVED_META.pastMonths + 1, `${v}: ${pts.length}개`);
    expect(pts.at(-1).month === OBSERVED_META.baseMonth, `${v}: 마지막 달 ${pts.at(-1).month}`);
    for (let i = 1; i < pts.length; i += 1) {
      expect(monthIndex(pts[i].month) - monthIndex(pts[i - 1].month) === 1, `${v}: ${pts[i - 1].month} 다음이 ${pts[i].month}`);
    }
    expect(pts.every((p) => Number.isFinite(p.value)), `${v}: 숫자가 아닌 값`);
  }
});
check("모든 통계에 출처(기관·제목·날짜·https 주소)와 가공 방법이 있다", () => {
  for (const v of VARIABLE_KEYS) {
    const s = OBSERVED_SERIES[v];
    expect(s.source.institution && s.source.title && s.source.date && s.source.url.startsWith("https://"), `${v}: 출처 정보`);
    expect(s.derivation.length > 0 && s.unit.length > 0, `${v}: 가공 방법·단위`);
  }
});
check("GDP 성장률은 분기 자료라서 같은 분기의 세 달은 값이 같다", () => {
  const pts = OBSERVED_SERIES.gdp.points;
  const quarter = (m) => `${m.slice(0, 4)}-${Math.floor((Number(m.slice(5, 7)) - 1) / 3)}`;
  for (let i = 1; i < pts.length; i += 1) {
    if (quarter(pts[i].month) === quarter(pts[i - 1].month)) expect(pts[i].value === pts[i - 1].value, `${pts[i].month}`);
  }
});

console.log("\n2) 시나리오 경로 (실제 표, 유가 +20% 샘플)");
const oil = getSampleIssues()[0].result;
const paths = Object.fromEntries(SCENARIO_KEYS.map((k) => [k, buildScenarioPaths(oil, k, OBSERVED_SERIES)]));
const pathsFull = Object.fromEntries(SCENARIO_KEYS.map((k) => [k, buildScenarioPaths(oil, k, OBSERVED_SERIES, 36)]));
check("근거가 있는 변수(GDP, 소비자물가)만 그리고 근거 없는 변수는 그리지 않는다", () => {
  for (const k of SCENARIO_KEYS) expect(paths[k].map((p) => p.variable).join(",") === "gdp,cpi", `${k}: ${paths[k].map((p) => p.variable)}`);
});
check("과거는 충격 시점(0개월)의 값이 0이 되도록 맞춘 변화량이다 (물가: 전년 동월 상승률의 %p 차이, 저장된 36개월 전체)", () => {
  const cpi = pathsFull.medium[1];
  const raw = OBSERVED_SERIES.cpi.points;
  expect(cpi.past.length === 37 && cpi.past[0].month === -36 && cpi.past.at(-1).month === 0, "개월 범위");
  expect(near(cpi.past.at(-1).value, 0), `0개월 값 ${cpi.past.at(-1).value}`);
  expect(near(cpi.past[0].value, raw[0].value - raw.at(-1).value), "-36개월 값");
});
check(`그리는 과거 구간은 기본 ${DEFAULT_PAST_MONTHS}개월이고, 줄여도 기준(충격 시점의 값)은 같다`, () => {
  expect(DEFAULT_PAST_MONTHS >= 12 && DEFAULT_PAST_MONTHS <= 18, `기본값 ${DEFAULT_PAST_MONTHS}`);
  const cpi = paths.medium[1];
  const raw = OBSERVED_SERIES.cpi.points;
  expect(cpi.past.length === DEFAULT_PAST_MONTHS + 1, `점 개수 ${cpi.past.length}`);
  expect(cpi.past[0].month === -DEFAULT_PAST_MONTHS && cpi.past.at(-1).month === 0, "개월 범위");
  expect(near(cpi.past[0].value, raw.at(-1 - DEFAULT_PAST_MONTHS).value - raw.at(-1).value), "시작 값이 36개월 전체일 때와 같은 기준");
  const fullSameMonth = pathsFull.medium[1].past.find((q) => q.month === -DEFAULT_PAST_MONTHS);
  expect(near(cpi.past[0].value, fullSameMonth.value), "같은 달의 값이 구간을 줄여도 같음");
});
check("충격 이후는 0개월에서 시작해 12개월에 표의 값에 도달한다 (GDP 중간: 가운데 -0.31, 범위 -0.42~-0.2)", () => {
  const f = paths.medium[0].future;
  expect(f.length === 13 && f[0].month === 0 && f[12].month === 12, "개월 범위");
  expect(near(f[0].mid, 0) && near(f[0].min, 0) && near(f[0].max, 0), "0개월은 변화 없음");
  expect(near(f[12].mid, -0.31) && near(f[12].min, -0.42) && near(f[12].max, -0.2), JSON.stringify(f[12]));
  expect(near(f[6].mid, -0.155), `6개월 ${f[6].mid}`);
});
check("작음·큼은 같은 모양에서 배율만 다르다 (12개월 가운데: -0.155 / -0.465)", () => {
  expect(near(paths.small[0].future[12].mid, -0.155) && near(paths.large[0].future[12].mid, -0.465), "배율");
});
check("세 시나리오의 과거 구간은 같다 (충격 크기와 무관한 실제 통계)", () => {
  const a = JSON.stringify(paths.small[0].past);
  expect(a === JSON.stringify(paths.medium[0].past) && a === JSON.stringify(paths.large[0].past), "과거가 다름");
});
check("근거 없는 칸만 있는 결과(충격 크기를 모르는 경우)는 경로가 하나도 없다", () => {
  const none = getSampleIssues()[2].result;
  for (const k of SCENARIO_KEYS) expect(buildScenarioPaths(none, k, OBSERVED_SERIES).length === 0, `${k}`);
});

console.log("\n2-2) 충격 이후 확대 그래프와 공통 눈금");
const allOil = SCENARIO_KEYS.flatMap((k) => paths[k]);
check("확대 그래프의 값은 충격 이후 값만 모은 것이다 (과거 값은 들어가지 않음)", () => {
  const withPast = chartValues(allOil, "left", true);
  const futureOnly = chartValues(allOil, "left", false);
  expect(futureOnly.length < withPast.length, "충격 이후만이 더 적어야 함");
  const maxFuture = Math.max(...futureOnly.map(Math.abs));
  expect(near(maxFuture, 0.63) || maxFuture < 0.7, `충격 이후 최대 절댓값 ${maxFuture}`);
  expect(Math.max(...withPast.map(Math.abs)) > 1, "과거 값은 충격 이후보다 훨씬 커야 이 설계의 의미가 있음");
});
check("확대 그래프의 세로축은 전체 그래프보다 훨씬 좁고, 세 시나리오의 모든 값이 범위 안에 들어간다", () => {
  const full = alignedDomains(chartValues(allOil, "left", true), []);
  const zoom = alignedDomains(chartValues(allOil, "left", false), []);
  expect(zoom.left.hi - zoom.left.lo < (full.left.hi - full.left.lo) / 2, `확대 ${zoom.left.hi - zoom.left.lo} vs 전체 ${full.left.hi - full.left.lo}`);
  for (const v of chartValues(allOil, "left", false)) expect(v >= zoom.left.lo && v <= zoom.left.hi, `범위 밖: ${v}`);
});
check("작음·중간·큼의 끝점 가운데 값은 같은 눈금에서 크기 순서가 보인다 (GDP -0.155 → -0.31 → -0.465)", () => {
  const ends = SCENARIO_KEYS.map((k) => paths[k][0].future.at(-1).mid);
  expect(near(ends[0], -0.155) && near(ends[1], -0.31) && near(ends[2], -0.465), JSON.stringify(ends));
  expect(Math.abs(ends[0]) < Math.abs(ends[1]) && Math.abs(ends[1]) < Math.abs(ends[2]), "크기 순서");
});

console.log("\n3) 단위 환산과 축 (시험용 표: 연준 +200bp)");
const pending = { status: "pending", note: "시험용" };
const source = { institution: "시험", title: "시험용", date: "2000-01", url: "https://example.com", via: "시험" };
const fake = Object.fromEntries(ISSUE_TYPES.map((t) => [t, Object.fromEntries(VARIABLE_KEYS.map((v) => [v, pending]))]));
const sourced = (min, max, period = "1y") => ({
  status: "sourced",
  min,
  max,
  per: { value: 200, unit: "bp 시험" },
  period,
  sources: [source],
  assumption: "시험용",
});
fake.policyRate.fx = sourced(10, 14);
fake.policyRate.policyRate = sourced(100, 140);
fake.policyRate.kospi = sourced(-6, -2, "1m");
const fakeResult = calculateStressTest(
  { type: "policyRate", shock: { value: 200, unit: "bp 시험" } },
  { coefficients: fake, typicalShock: () => null },
);
const fakePaths = Object.fromEntries(buildScenarioPaths(fakeResult, "medium", OBSERVED_SERIES).map((p) => [p.variable, p]));
check("기준금리는 bp를 %p로 환산하고(100~140bp → 12개월 1~1.4%p) 왼쪽 축이다", () => {
  const f = fakePaths.policyRate.future;
  expect(near(f[12].min, 1) && near(f[12].max, 1.4) && near(f[12].mid, 1.2), JSON.stringify(f[12]));
  expect(fakePaths.policyRate.axis === "left" && fakePaths.policyRate.legend.includes("%p로 환산"), "축·범례");
});
check("환율·코스피는 오른쪽(%) 축이고 환율 과거는 % 변화율이다", () => {
  expect(fakePaths.fx.axis === "right" && fakePaths.kospi.axis === "right", "축");
  const raw = OBSERVED_SERIES.fx.points;
  expect(near(fakePaths.fx.past[0].value, (raw.at(-1 - DEFAULT_PAST_MONTHS).value / raw.at(-1).value - 1) * 100), "환율 변화율");
  expect(AXIS_UNIT.left === "%p" && AXIS_UNIT.right === "%", "축 단위");
});
check("코스피는 표가 1개월 값이라 충격 후 1개월까지만 그린다 (0, 1개월 두 점, 1개월 가운데 -4)", () => {
  const f = fakePaths.kospi.future;
  expect(fakePaths.kospi.horizon === 1 && f.length === 2, `길이 ${f.length}`);
  expect(near(f[1].mid, -4) && near(f[0].mid, 0), JSON.stringify(f));
  expect(fakePaths.kospi.legend.includes("1개월"), fakePaths.kospi.legend);
});
check("달 이름: 기준 월에서 개월 수만큼 앞뒤로 간다", () => {
  expect(monthLabel("2025-05", 0) === "2025-05" && monthLabel("2025-05", 12) === "2026-05", "뒤");
  expect(monthLabel("2025-05", -36) === "2022-05" && monthLabel("2025-05", -5) === "2024-12", "앞");
});

console.log("\n4) 눈금과 축 범위");
check("눈금 간격은 1, 2, 2.5, 5 × 10의 거듭제곱이다", () => {
  expect(near(niceStep(0.13), 0.2) && near(niceStep(0.7), 1) && near(niceStep(2.3), 2.5) && near(niceStep(4), 5) && near(niceStep(30), 50), "간격");
  expect(niceStep(0) === 1 && niceStep(Number.NaN) === 1, "잘못된 값");
});
check("두 축의 0이 같은 높이에 오고, 모든 값과 0이 범위 안에 있다", () => {
  const left = [-1.05, -0.35, -0.7, 1.0, 1.4, -3.2];
  const right = [8, 24, 16, -6, -12];
  const d = alignedDomains(left, right);
  const zl = -d.left.lo / (d.left.hi - d.left.lo);
  const zr = -d.right.lo / (d.right.hi - d.right.lo);
  expect(near(zl, zr), `0의 높이 ${zl} vs ${zr}`);
  for (const v of [0, ...left]) expect(v >= d.left.lo && v <= d.left.hi, `왼쪽 범위 밖: ${v}`);
  for (const v of [0, ...right]) expect(v >= d.right.lo && v <= d.right.hi, `오른쪽 범위 밖: ${v}`);
});
check("눈금에는 0이 있고 오름차순이며 -0이 없고, 한쪽 축만 있어도 된다", () => {
  const d = alignedDomains([-0.63, -0.1, 0.33], []);
  expect(d.right === null, "오른쪽 축이 없어야 함");
  expect(d.left.ticks.includes(0) && !d.left.ticks.some((t) => Object.is(t, -0)), `눈금: ${d.left.ticks}`);
  expect(d.left.ticks.every((t, i, a) => i === 0 || t > a[i - 1]), "오름차순");
});
check("값이 모두 음수(또는 모두 양수)여도 0이 범위 안에 있다", () => {
  const neg = alignedDomains([-3, -1], []);
  const pos = alignedDomains([], [2, 5]);
  expect(neg.left.hi > 0 && neg.left.lo < -3, `음수만: ${JSON.stringify(neg.left)}`);
  expect(pos.right.lo < 0 && pos.right.hi > 5, `양수만: ${JSON.stringify(pos.right)}`);
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.error("\n실패한 검사");
  for (const f of failures) console.error(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("시점별 그래프 값 검사 통과");
}
