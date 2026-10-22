// 방향 일치율 검증용 과거 사례(PLAN 3번)를 공개 통계에서 내려받아 src/lib/stress/validation-cases.ts로 만든다.
// 실행: node scripts/fetch-validation-data.mjs  (인터넷 연결 필요)
//
// 사례를 고르는 규칙 (결과를 보기 전에 정한 규칙이며, 아래 상수와 함수가 곧 규칙이다)
// - 기간: 1991~2024년 중 자료가 있는 해 (유형마다 자료 기간이 달라 실제 범위는 유형별로 다르다)
// - 유가 사례: 연평균 유가(IMF 두바이유 지수)의 전년 대비 변동 폭(절댓값)이 큰 연도 7개
// - 환율 사례: 연평균 원/달러 환율(세계은행)의 전년 대비 변동 폭이 큰 연도 3개
// - 미국 금리 사례: 미국 프라임레이트 연평균(세계은행, 연준 기준금리 대용)의 전년 대비 변화(bp)가 큰 연도 3개.
//   충격 표의 과거 사례(history.ts)와 같은 해는 제외한다 (정답을 보고 표를 맞추는 것을 막으려는 것).
// - 글로벌 경기 둔화 사례: 세계 경제성장률(세계은행)의 전년 대비 하락 폭이 큰 연도 3개 (상승한 해도 폭이 크면 포함)
// - 원자재 사례: IMF 전체 원자재 가격 지수 연평균의 전년 대비 변동 폭이 큰 연도 3개
// - 실제 변화: 그해 값 − 전년 값 (한국 GDP 성장률 %p, 소비자물가 상승률 %p), 원/달러 환율은 연평균 변동률(%)
// 충격 표의 과거 사례와 겹치는 해는 쓰지 않는다 (검사 스크립트가 다시 확인한다).
import { writeFile } from "node:fs/promises";

const START_YEAR = 1991;
const END_YEAR = 2024;
const OIL_CASE_COUNT = 7;
const FX_CASE_COUNT = 3;
const NEW_TYPE_CASE_COUNT = 3; // 미국 금리, 글로벌 경기 둔화, 원자재 각각

// 충격 표의 과거 사례(history.ts)와 같은 유형·같은 연도라서 뺄 해. 값을 바꾸면 규칙이 바뀌는 것이니 history.ts와 함께 본다.
const EXCLUDED_YEARS = { policyRate: [2022] };

const OIL_URL = "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1";
const COMMODITY_URL = "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.PALLFNF?observations=1";
const worldBankUrl = (indicator, country = "KOR") =>
  `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=200&date=1989:${END_YEAR}`;

async function getJson(url) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      if (attempt === 3) throw new Error(`${url} 를 받지 못함: ${error.message}`);
    }
  }
}

// 세계은행 응답 → { 연도: 값 }
async function worldBank(indicator, country = "KOR") {
  const url = worldBankUrl(indicator, country);
  const [meta, rows] = await getJson(url);
  const byYear = {};
  for (const row of rows) if (row.value !== null) byYear[Number(row.date)] = row.value;
  return { byYear, lastUpdated: meta.lastupdated, url };
}

// DBnomics(IMF) 응답 → { 연도: 값 }
async function imfSeries(url) {
  const json = await getJson(url);
  const doc = json.series.docs[0];
  return {
    byYear: Object.fromEntries(doc.period.map((p, i) => [Number(p), doc.value[i]])),
    indexedAt: doc.indexed_at?.slice(0, 10),
    url,
  };
}

const today = new Date().toISOString().slice(0, 10);

console.log("통계를 내려받는 중...");
const oil = await imfSeries(OIL_URL);
const commodity = await imfSeries(COMMODITY_URL);
const gdp = await worldBank("NY.GDP.MKTP.KD.ZG");
const cpi = await worldBank("FP.CPI.TOTL.ZG");
const fx = await worldBank("PA.NUS.FCRF");
const usPrime = await worldBank("FR.INR.LEND", "USA");
const world = await worldBank("NY.GDP.MKTP.KD.ZG", "WLD");

const pctChange = (series, year) =>
  series[year] !== undefined && series[year - 1] !== undefined
    ? (series[year] / series[year - 1] - 1) * 100
    : null;
const diff = (series, year) =>
  series[year] !== undefined && series[year - 1] !== undefined ? series[year] - series[year - 1] : null;

const round2 = (v) => Math.round(v * 100) / 100;
const round1 = (v) => Math.round(v * 10) / 10;
const sign = (v) => (v >= 0 ? "+" : "");

// 사례 후보: 충격과 실제 변화(GDP·물가·환율)를 모두 계산할 수 있는 해만, 충격 폭이 큰 순서로
function candidates(shockOf, excluded = []) {
  const list = [];
  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    if (excluded.includes(year)) continue;
    const shock = shockOf(year);
    const gdpDiff = diff(gdp.byYear, year);
    const cpiDiff = diff(cpi.byYear, year);
    const fxPct = pctChange(fx.byYear, year);
    if (shock === null || gdpDiff === null || cpiDiff === null || fxPct === null) continue;
    list.push({ year, shock, gdpDiff, cpiDiff, fxPct });
  }
  return list.sort((a, b) => Math.abs(b.shock) - Math.abs(a.shock));
}

const wb = (title, series) => ({
  institution: "세계은행",
  title,
  date: series.lastUpdated,
  url: series.url,
  via: `세계은행 API 직접 조회 (조회일 ${today})`,
});
const sources = {
  oil: {
    institution: "IMF",
    title: "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
    date: oil.indexedAt ?? today,
    url: oil.url,
    via: `DBnomics API 직접 조회 (조회일 ${today})`,
  },
  commodity: {
    institution: "IMF",
    title: "Primary Commodity Prices: All Commodity 연평균 지수 (PCPS A.W00.PALLFNF.IX)",
    date: commodity.indexedAt ?? today,
    url: commodity.url,
    via: `DBnomics API 직접 조회 (조회일 ${today})`,
  },
  gdp: wb("GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)", gdp),
  cpi: wb("Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)", cpi),
  fx: wb("Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)", fx),
  usPrime: wb("Lending interest rate (%), United States — 프라임레이트 (FR.INR.LEND). 연준 기준금리 대용", usPrime),
  world: wb("GDP growth (annual %), World (NY.GDP.MKTP.KD.ZG)", world),
};

function buildCase({ type, item, shockUnit, name, shockSource }) {
  const y = item.year;
  return {
    id: `${type}-${y}`,
    type,
    year: y,
    name,
    shock: { value: round2(item.shock), unit: shockUnit },
    observed: {
      gdp: {
        value: round2(item.gdpDiff),
        unit: "%p",
        note: `${y}년 ${round1(gdp.byYear[y])}% − ${y - 1}년 ${round1(gdp.byYear[y - 1])}% (GDP 성장률)`,
      },
      cpi: {
        value: round2(item.cpiDiff),
        unit: "%p",
        note: `${y}년 ${round1(cpi.byYear[y])}% − ${y - 1}년 ${round1(cpi.byYear[y - 1])}% (소비자물가 상승률)`,
      },
      fx: {
        value: round2(item.fxPct),
        unit: "%",
        note: `${y}년 ${round1(fx.byYear[y])}원 / ${y - 1}년 ${round1(fx.byYear[y - 1])}원 (연평균 원/달러 환율 변동률)`,
      },
    },
    sources: [shockSource, sources.gdp, sources.cpi, sources.fx],
  };
}

const byYear = (a, b) => a.year - b.year;
const top = (list, count) => list.slice(0, count);

const oilCases = top(candidates((y) => pctChange(oil.byYear, y)), OIL_CASE_COUNT)
  .map((item) =>
    buildCase({
      type: "oil",
      item,
      shockUnit: "% 국제 유가 상승",
      name: `${item.year}년 국제 유가 ${sign(item.shock)}${round1(item.shock)}% (연평균, 전년 대비)`,
      shockSource: sources.oil,
    }),
  )
  .sort(byYear);

const fxCases = top(candidates((y) => pctChange(fx.byYear, y)), FX_CASE_COUNT)
  .map((item) =>
    buildCase({
      type: "fx",
      item,
      shockUnit: "% 원/달러 환율 상승",
      name: `${item.year}년 원/달러 환율 ${sign(item.shock)}${round1(item.shock)}% (연평균, 전년 대비)`,
      shockSource: sources.fx,
    }),
  )
  .sort(byYear);

const policyRateCases = top(
  candidates((y) => (diff(usPrime.byYear, y) === null ? null : diff(usPrime.byYear, y) * 100), EXCLUDED_YEARS.policyRate),
  NEW_TYPE_CASE_COUNT,
)
  .map((item) =>
    buildCase({
      type: "policyRate",
      item,
      shockUnit: "bp 연준 기준금리 인상폭",
      name: `${item.year}년 미국 프라임레이트 ${round2(usPrime.byYear[item.year - 1])}% → ${round2(usPrime.byYear[item.year])}% (연평균, ${sign(item.shock)}${Math.round(item.shock)}bp)`,
      shockSource: sources.usPrime,
    }),
  )
  .sort(byYear);

const globalSlowdownCases = top(
  candidates((y) => (diff(world.byYear, y) === null ? null : -diff(world.byYear, y))),
  NEW_TYPE_CASE_COUNT,
)
  .map((item) =>
    buildCase({
      type: "globalSlowdown",
      item,
      shockUnit: "%p 세계 경제성장률 하락",
      name: `${item.year}년 세계 경제성장률 ${round1(world.byYear[item.year - 1])}% → ${round1(world.byYear[item.year])}% (${sign(item.shock)}${round1(item.shock)}%p 하락)`,
      shockSource: sources.world,
    }),
  )
  .sort(byYear);

const commodityCases = top(candidates((y) => pctChange(commodity.byYear, y)), NEW_TYPE_CASE_COUNT)
  .map((item) =>
    buildCase({
      type: "commoditySupply",
      item,
      shockUnit: "% 국제 원자재 가격 상승",
      name: `${item.year}년 국제 원자재 가격(전체 지수) ${sign(item.shock)}${round1(item.shock)}% (연평균, 전년 대비)`,
      shockSource: sources.commodity,
    }),
  )
  .sort(byYear);

const cases = [...oilCases, ...fxCases, ...policyRateCases, ...globalSlowdownCases, ...commodityCases];

const meta = {
  generatedAt: today,
  rule:
    `1991~2024년 중 자료가 있는 해에서, 유가 변동 폭이 큰 ${OIL_CASE_COUNT}개 연도, 원/달러 환율 변동 폭이 큰 ${FX_CASE_COUNT}개 연도, ` +
    `미국 프라임레이트(연준 기준금리 대용) 변화가 큰 ${NEW_TYPE_CASE_COUNT}개 연도(충격 표 사례와 겹치는 2022년 제외), ` +
    `세계 경제성장률 변동 폭이 큰 ${NEW_TYPE_CASE_COUNT}개 연도, 전체 원자재 가격 변동 폭이 큰 ${NEW_TYPE_CASE_COUNT}개 연도. ` +
    "실제 변화는 그해 값에서 전년 값을 뺀 차이(GDP·물가 %p, 환율은 변동률 %).",
};

const file = `// 이 파일은 scripts/fetch-validation-data.mjs가 공개 통계에서 내려받아 만든다. 직접 고치지 않는다.
// 방향 일치율 검증(PLAN 3번)에 쓰는 과거 사례이며, 충격 표의 과거 사례(history.ts)와 겹치지 않는다.
import type { ValidationCase } from "./types";

export const VALIDATION_META = ${JSON.stringify(meta, null, 2)};

export const VALIDATION_CASES: ValidationCase[] = ${JSON.stringify(cases, null, 2)};
`;

await writeFile(new URL("../src/lib/stress/validation-cases.ts", import.meta.url), file, "utf8");

console.log(`\n사례 ${cases.length}건을 src/lib/stress/validation-cases.ts에 저장했습니다.`);
console.log(`규칙: ${meta.rule}\n`);
for (const c of cases) {
  console.log(
    `${c.id.padEnd(20)} 충격 ${String(c.shock.value).padStart(8)}  GDP 변화 ${String(c.observed.gdp.value).padStart(7)}%p  물가 변화 ${String(c.observed.cpi.value).padStart(6)}%p  환율 변화 ${String(c.observed.fx.value).padStart(6)}%`,
  );
}
