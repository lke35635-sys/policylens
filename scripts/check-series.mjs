// 내려받아 고정한 통계(src/data/series)가 목록·약속과 맞는지 인터넷 없이 확인한다 (PLAN 8번).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-series.mjs
// 확인하는 것: 목록(series-spec.mjs)의 통계가 빠짐없이 있고 아이디가 겹치지 않는지, 출처가 모두 있고 허용된 기관 종류인지,
// 기간이 오름차순이고 주기에 맞는 모양인지, 값이 숫자인지, 빠진 기간이 얼마나 되는지, 최신 기간이 너무 오래되지 않았는지.
// 모양과 날짜 규칙은 자료집 검사(check-corpus.mjs)도 같이 본다. 값 자체를 출처와 다시 대조하려면 scripts/fetch-series.mjs를 다시 실행해 diff를 본다.
import { SERIES } from "../src/data/series/index.ts";
import { INSTITUTION_TYPES } from "../src/lib/corpus/schema.ts";
import { SERIES_SPEC } from "./series-spec.mjs";

const monthIndex = (period) => {
  const m = /^(\d{4})-(\d{2})$/.exec(period);
  if (m) return Number(m[1]) * 12 + Number(m[2]) - 1;
  const q = /^(\d{4})-Q([1-4])$/.exec(period);
  if (q) return Number(q[1]) * 12 + (Number(q[2]) - 1) * 3;
  return null;
};

// 통계 하나를 검사해 문제와 경고를 돌려준다
export function checkOne(series, spec, today) {
  const problems = [];
  const warnings = [];
  const where = series.id;
  if (!spec) return { problems: [`${where}: 목록에 없는 통계입니다`], warnings };
  if (series.name !== spec.name || series.unit !== spec.unit || series.frequency !== spec.frequency) problems.push(`${where}: 이름·단위·주기가 목록과 다릅니다`);
  const s = series.source;
  if (!INSTITUTION_TYPES.includes(s.institutionType)) problems.push(`${where}: 허용되지 않는 기관 종류입니다 (${s.institutionType})`);
  if (!s.url.startsWith(`https://fred.stlouisfed.org/series/${series.id}`)) problems.push(`${where}: 출처 주소가 FRED 시계열 페이지가 아닙니다 (${s.url})`);
  if (!s.institution.includes("FRED 경유")) problems.push(`${where}: 출처 기관에 "FRED 경유"가 없습니다`);
  if (s.checkedAt < s.date) problems.push(`${where}: 조회일(${s.checkedAt})이 갱신일(${s.date})보다 이릅니다`);
  const pattern = series.frequency === "monthly" ? /^\d{4}-\d{2}$/ : /^\d{4}-Q[1-4]$/;
  const step = series.frequency === "monthly" ? 1 : 3;
  if (series.points.length < 24) problems.push(`${where}: 값이 ${series.points.length}개뿐입니다 (24개 이상 필요)`);
  let gaps = 0;
  series.points.forEach((p, i) => {
    if (!pattern.test(p.period)) problems.push(`${where}: ${p.period}이(가) 주기(${series.frequency}) 모양이 아닙니다`);
    if (!Number.isFinite(p.value)) problems.push(`${where}: ${p.period} 값이 숫자가 아닙니다`);
    if (i > 0) {
      const d = monthIndex(p.period) - monthIndex(series.points[i - 1].period);
      if (d <= 0) problems.push(`${where}: 기간이 오름차순이 아닙니다 (${series.points[i - 1].period} → ${p.period})`);
      else if (d > step) gaps += (d / step) - 1;
    }
  });
  if (gaps > 0) warnings.push(`${where}: 빠진 ${series.frequency === "monthly" ? "달" : "분기"} ${gaps}개`);
  const last = series.points[series.points.length - 1];
  const lagMonths = monthIndex(today.slice(0, 7)) - monthIndex(last.period);
  const maxLag = series.frequency === "monthly" ? 4 : 9;
  if (lagMonths > maxLag) warnings.push(`${where}: 최신 기간 ${last.period}이(가) 오늘보다 ${lagMonths}개월 전입니다 (통계가 더 이상 갱신되지 않을 수 있음)`);
  return { problems, warnings };
}

const today = new Date().toISOString().slice(0, 10);
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

console.log("1) 검사 도구 자체 시험 (일부러 망가뜨린 가짜 통계)");
{
  const spec = SERIES_SPEC[0];
  const base = structuredClone(SERIES.find((s) => s.id === spec.id));
  const run = (mutate) => {
    const s = structuredClone(base);
    mutate(s);
    return checkOne(s, spec, today);
  };
  check("멀쩡한 통계는 통과한다", () => expect(checkOne(base, spec, today).problems.length === 0, "문제가 나옴"));
  check("기간이 뒤바뀌면 걸러낸다", () => expect(run((s) => ([s.points[5], s.points[6]] = [s.points[6], s.points[5]])).problems.length > 0, "못 걸렀음"));
  check("값이 숫자가 아니면 걸러낸다", () => expect(run((s) => (s.points[3].value = Number.NaN)).problems.length > 0, "못 걸렀음"));
  check("기간 모양이 주기와 다르면 걸러낸다", () => expect(run((s) => (s.points[3].period = "2000-Q1")).problems.length > 0, "못 걸렀음"));
  check("출처 주소가 FRED가 아니면 걸러낸다", () => expect(run((s) => (s.source.url = "https://example.com/x")).problems.length > 0, "못 걸렀음"));
  check("허용되지 않은 기관 종류를 걸러낸다", () => expect(run((s) => (s.source.institutionType = "언론")).problems.length > 0, "못 걸렀음"));
  check("단위가 목록과 다르면 걸러낸다", () => expect(run((s) => (s.unit = "달러")).problems.length > 0, "못 걸렀음"));
  check("빠진 달은 경고로 알린다", () => expect(run((s) => s.points.splice(10, 2)).warnings.some((w) => w.includes("빠진")), "경고가 없음"));
}

console.log("\n2) 실제 통계 (src/data/series)");
const problems = [];
const warnings = [];
const ids = SERIES.map((s) => s.id);
for (const spec of SERIES_SPEC) {
  if (!ids.includes(spec.id)) problems.push(`${spec.id}: 목록에 있는데 파일이 없습니다 (scripts/fetch-series.mjs 실행 필요)`);
}
for (const id of new Set(ids.filter((x, i) => ids.indexOf(x) !== i))) problems.push(`${id}: 아이디가 겹칩니다`);
for (const series of SERIES) {
  const r = checkOne(series, SERIES_SPEC.find((s) => s.id === series.id), today);
  problems.push(...r.problems);
  warnings.push(...r.warnings);
}
check("실제 통계가 목록과 약속을 지킨다", () => expect(problems.length === 0, `\n        - ${problems.join("\n        - ")}`));
console.log(`  통계 ${SERIES.length}개 (목록 ${SERIES_SPEC.length}개), 점 ${SERIES.reduce((n, s) => n + s.points.length, 0)}개`);
if (warnings.length > 0) console.log(`  경고 ${warnings.length}개:\n    - ${warnings.join("\n    - ")}`);

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.log("\n실패한 검사");
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("통계 검사 통과");
}
