// 방향 일치율 검증용 과거 사례(PLAN 3번)를 공개 통계에서 내려받아 src/lib/stress/validation-cases.ts로 만든다.
// 실행: node scripts/fetch-validation-data.mjs  (인터넷 연결 필요)
//
// 사례를 고르는 규칙 (결과를 보기 전에 정한 규칙이며, 아래 상수가 곧 규칙이다)
// - 기간: 1991~2024년
// - 유가 사례: 연평균 유가(IMF 두바이유 지수)의 전년 대비 변동 폭(절댓값)이 큰 연도 7개
// - 환율 사례: 연평균 원/달러 환율(세계은행)의 전년 대비 변동 폭(절댓값)이 큰 연도 3개
// - 실제 변화: 그해 값 − 전년 값 (GDP 성장률 %p, 소비자물가 상승률 %p, 세계은행)
// 충격 표의 과거 사례(history.ts)와 겹치는 해는 쓰지 않는다 (검사 스크립트가 다시 확인한다).
import { writeFile } from "node:fs/promises";

const START_YEAR = 1991;
const END_YEAR = 2024;
const OIL_CASE_COUNT = 7;
const FX_CASE_COUNT = 3;

const OIL_URL = "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1";
const worldBankUrl = (indicator) =>
  `https://api.worldbank.org/v2/country/KOR/indicator/${indicator}?format=json&per_page=200&date=1989:${END_YEAR}`;

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
async function worldBank(indicator) {
  const [meta, rows] = await getJson(worldBankUrl(indicator));
  const byYear = {};
  for (const row of rows) if (row.value !== null) byYear[Number(row.date)] = row.value;
  return { byYear, lastUpdated: meta.lastupdated, url: worldBankUrl(indicator) };
}

const today = new Date().toISOString().slice(0, 10);

console.log("통계를 내려받는 중...");
const oilJson = await getJson(OIL_URL);
const oilDoc = oilJson.series.docs[0];
const oilByYear = Object.fromEntries(oilDoc.period.map((p, i) => [Number(p), oilDoc.value[i]]));
const gdp = await worldBank("NY.GDP.MKTP.KD.ZG");
const cpi = await worldBank("FP.CPI.TOTL.ZG");
const fx = await worldBank("PA.NUS.FCRF");

const pctChange = (series, year) =>
  series[year] !== undefined && series[year - 1] !== undefined
    ? (series[year] / series[year - 1] - 1) * 100
    : null;
const diff = (series, year) =>
  series[year] !== undefined && series[year - 1] !== undefined ? series[year] - series[year - 1] : null;

const round2 = (v) => Math.round(v * 100) / 100;
const round1 = (v) => Math.round(v * 10) / 10;

// 사례 후보: 충격(연간 변동률)과 실제 변화(GDP·물가)를 모두 계산할 수 있는 해만
function candidates(shockSeries) {
  const list = [];
  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    const shock = pctChange(shockSeries, year);
    const gdpDiff = diff(gdp.byYear, year);
    const cpiDiff = diff(cpi.byYear, year);
    if (shock === null || gdpDiff === null || cpiDiff === null) continue;
    list.push({ year, shock, gdpDiff, cpiDiff });
  }
  return list.sort((a, b) => Math.abs(b.shock) - Math.abs(a.shock));
}

const sources = {
  oil: {
    institution: "IMF",
    title: "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
    date: oilDoc.indexed_at?.slice(0, 10) ?? today,
    url: OIL_URL,
    via: `DBnomics API 직접 조회 (조회일 ${today})`,
  },
  gdp: {
    institution: "세계은행",
    title: "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
    date: gdp.lastUpdated,
    url: gdp.url,
    via: `세계은행 API 직접 조회 (조회일 ${today})`,
  },
  cpi: {
    institution: "세계은행",
    title: "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
    date: cpi.lastUpdated,
    url: cpi.url,
    via: `세계은행 API 직접 조회 (조회일 ${today})`,
  },
  fx: {
    institution: "세계은행",
    title: "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
    date: fx.lastUpdated,
    url: fx.url,
    via: `세계은행 API 직접 조회 (조회일 ${today})`,
  },
};

const sign = (v) => (v >= 0 ? "+" : "");
function buildCase(type, item, shockUnit, shockLabel, shockSource) {
  const y = item.year;
  return {
    id: `${type}-${y}`,
    type,
    year: y,
    name: `${y}년 ${shockLabel} ${sign(item.shock)}${round1(item.shock)}% (연평균, 전년 대비)`,
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
    },
    sources: [shockSource, sources.gdp, sources.cpi],
  };
}

const oilCases = candidates(oilByYear)
  .slice(0, OIL_CASE_COUNT)
  .map((item) => buildCase("oil", item, "% 국제 유가 상승", "국제 유가", sources.oil))
  .sort((a, b) => a.year - b.year);
const fxCases = candidates(fx.byYear)
  .slice(0, FX_CASE_COUNT)
  .map((item) => buildCase("fx", item, "% 원/달러 환율 상승", "원/달러 환율", sources.fx))
  .sort((a, b) => a.year - b.year);

const cases = [...oilCases, ...fxCases];

const meta = {
  generatedAt: today,
  rule: `${START_YEAR}~${END_YEAR}년 중 연평균 유가 변동 폭이 큰 ${OIL_CASE_COUNT}개 연도와 연평균 원/달러 환율 변동 폭이 큰 ${FX_CASE_COUNT}개 연도. 실제 변화는 그해 값에서 전년 값을 뺀 차이(%p).`,
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
    `${c.id.padEnd(10)} 충격 ${String(c.shock.value).padStart(7)}%  GDP 변화 ${String(c.observed.gdp.value).padStart(6)}%p  물가 변화 ${String(c.observed.cpi.value).padStart(6)}%p`,
  );
}
