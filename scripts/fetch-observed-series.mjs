// 시점별 그래프(PLAN 6번)에 쓸 한국의 과거 실제 월별 통계를 각 기관의 최신 자료에서 직접 내려받아
// src/lib/stress/observed-series.ts로 만든다. 앱은 이 파일에 고정된 값을 쓰며 실행 중에 통계를 부르지 않는다 (PRD 6번).
// 실행: node scripts/fetch-observed-series.mjs  (인터넷 연결 필요)
//
// 자료 (변수 5개, 값은 모두 "충격 시점의 값을 기준으로 한 변화량"으로 쓰기 전의 원래 값)
// - gdp:        OECD 분기 실질 GDP 전년 동기 대비 성장률(%, 계절조정), FRED 경유 (KORGDPRQPSMEI).
//               같은 분기의 세 달에 같은 값을 쓰고, 아직 발표되지 않은 분기의 달은 마지막 발표값을 유지한다.
// - cpi:        IMF 소비자물가지수(전 품목, 월별) → 전년 동월 대비 상승률(%). IMF 새 데이터 서비스(api.imf.org)
// - policyRate: 한국은행 기준금리(%, 월말 기준). BIS 중앙은행 정책금리(WS_CBPOL)
// - fx:         원/달러 월평균 환율(원). 미 연준 H.10 자료, FRED 경유 (EXKOUS)
// - kospi:      OECD 주가지수(2015=100), FRED 경유 (SPASTT01KRM661N). 지수 수준이며 코스피 포인트와 단위가 다르다.
// 기준 월(충격 시점) = 월별 자료 4개에 모두 값이 있는 가장 마지막 달. 그 이전 36개월까지 저장한다.
// 과거에 쓰던 DBnomics의 IMF 사본은 2025-08 이후 갱신이 없어서(자료가 2025-05까지) 원 기관 서비스로 바꿨다.
import { writeFile } from "node:fs/promises";

const PAST_MONTHS = 36;

const URLS = {
  gdp: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=KORGDPRQPSMEI",
  cpi: "https://api.imf.org/external/sdmx/2.1/data/IMF.STA,CPI/KOR.CPI._T.IX.M?startPeriod=2022-01",
  policyRate: "https://stats.bis.org/api/v1/data/WS_CBPOL/M.KR?startPeriod=2022-01&format=csv",
  fx: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXKOUS",
  kospi: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=SPASTT01KRM661N",
};

async function getText(url, headers = {}) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(90000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (error) {
      if (attempt === 3) throw new Error(`${url} 를 받지 못함: ${error.message}`);
    }
  }
}

// FRED CSV("2026-09-01,1359.2") → { "2026-09": 1359.2 }
function parseFred(csv) {
  const map = new Map();
  for (const line of csv.trim().split("\n").slice(1)) {
    const [date, value] = line.split(",");
    const n = Number(value);
    if (date && Number.isFinite(n) && value.trim() !== "") map.set(date.slice(0, 7), n);
  }
  return map;
}

console.log("통계를 내려받는 중...");
const raw = {};

// 1) GDP 성장률: FRED의 분기 시작일(2026-04-01 = 2분기)을 "2026-Q2"로 바꾼다
const gdpMonthly = parseFred(await getText(URLS.gdp));
raw.gdp = new Map([...gdpMonthly].map(([m, v]) => [`${m.slice(0, 4)}-Q${Math.floor((Number(m.slice(5, 7)) - 1) / 3) + 1}`, v]));

// 2) 소비자물가: IMF SDMX-JSON ("2026-M09" → "2026-09")
const imf = JSON.parse(await getText(URLS.cpi, { Accept: "application/json" }));
const imfTimes = imf.structure.dimensions.observation[0].values.map((v) => v.id.replace("-M", "-"));
const imfSeries = Object.values(imf.dataSets[0].series)[0].observations;
raw.cpi = new Map(Object.entries(imfSeries).map(([i, v]) => [imfTimes[Number(i)], v[0]]));

// 3) 기준금리: BIS CSV
{
  const lines = (await getText(URLS.policyRate)).trim().split("\n");
  const header = lines[0].split(",");
  const t = header.indexOf("TIME_PERIOD");
  const o = header.indexOf("OBS_VALUE");
  raw.policyRate = new Map(lines.slice(1).map((l) => l.split(",")).map((c) => [c[t], Number(c[o])]));
}

// 4) 환율, 5) 주가지수: FRED
raw.fx = parseFred(await getText(URLS.fx));
raw.kospi = parseFred(await getText(URLS.kospi));

// "2025-05" 달 계산
const monthIndex = (m) => Number(m.slice(0, 4)) * 12 + (Number(m.slice(5, 7)) - 1);
const monthString = (index) => `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, "0")}`;
const quarterOf = (m) => `${m.slice(0, 4)}-Q${Math.floor((Number(m.slice(5, 7)) - 1) / 3) + 1}`;
const quarterIndex = (q) => Number(q.slice(0, 4)) * 4 + (Number(q.slice(6, 7)) - 1);
const quarterString = (index) => `${Math.floor(index / 4)}-Q${(index % 4) + 1}`;

// 기준 월: 월별 자료 4개에 값이 모두 있는 가장 마지막 달
const monthly = ["cpi", "policyRate", "fx", "kospi"];
const lastOf = (map) => Math.max(...[...map.keys()].map(monthIndex));
const baseIndex = Math.min(...monthly.map((v) => lastOf(raw[v])));
const startIndex = baseIndex - PAST_MONTHS;

const lastGdpQuarter = [...raw.gdp.keys()].sort((a, b) => quarterIndex(a) - quarterIndex(b)).at(-1);

function valueAt(variable, index) {
  const m = monthString(index);
  if (variable === "cpi") {
    const now = raw.cpi.get(m);
    const before = raw.cpi.get(monthString(index - 12));
    return now !== undefined && before !== undefined ? (now / before - 1) * 100 : undefined;
  }
  if (variable === "gdp") {
    // 아직 발표되지 않은 분기의 달은 마지막 발표 분기의 값을 유지한다
    const qi = Math.min(quarterIndex(quarterOf(m)), quarterIndex(lastGdpQuarter));
    return raw.gdp.get(quarterString(qi));
  }
  return raw[variable].get(m);
}

const UNITS = { gdp: "%", cpi: "%", policyRate: "%", fx: "원", kospi: "지수" };
const DERIVATIONS = {
  gdp: `OECD 분기 실질 GDP의 전년 동기 대비 성장률(계절조정). 같은 분기의 세 달에 같은 값이고, 아직 발표되지 않은 분기의 달은 마지막 발표 분기(${lastGdpQuarter})의 값을 유지`,
  cpi: "IMF 소비자물가지수(전 품목)의 전년 동월 대비 상승률",
  policyRate: "한국은행 기준금리 그대로 (월말 기준)",
  fx: "원/달러 월평균 환율 그대로 (미 연준 H.10)",
  kospi: "OECD 주가지수(2015=100) 그대로. 코스피 포인트와 단위가 다르다",
};

const today = new Date().toISOString().slice(0, 10);
const SOURCES = {
  gdp: ["OECD (FRED 경유)", "Real GDP for Korea, 전년 동기 대비 증가율, 계절조정, 분기 (KORGDPRQPSMEI)", "FRED 직접 조회"],
  cpi: ["IMF", "소비자물가지수(CPI), 한국, 전 품목, 월별 (IMF.STA CPI)", "IMF 데이터 서비스 직접 조회"],
  policyRate: ["BIS", "중앙은행 정책금리: 한국은행 기준금리, 월말 (WS_CBPOL)", "BIS 데이터 서비스 직접 조회"],
  fx: ["미 연준 H.10 (FRED 경유)", "원/달러 환율, 월평균 (EXKOUS)", "FRED 직접 조회"],
  kospi: ["OECD (FRED 경유)", "한국 주가지수, 2015=100, 월별 (SPASTT01KRM661N)", "FRED 직접 조회"],
};

const observed = {};
for (const variable of Object.keys(URLS)) {
  const points = [];
  for (let i = startIndex; i <= baseIndex; i += 1) {
    const value = valueAt(variable, i);
    if (value === undefined) throw new Error(`${variable} ${monthString(i)} 값이 없음`);
    points.push({ month: monthString(i), value: Math.round(value * 10000) / 10000 });
  }
  const [institution, title, how] = SOURCES[variable];
  observed[variable] = {
    variable,
    unit: UNITS[variable],
    derivation: DERIVATIONS[variable],
    points,
    source: { institution, title, date: today, url: URLS[variable], via: `${how} (조회일 ${today})` },
  };
}

const meta = {
  generatedAt: today,
  baseMonth: monthString(baseIndex), // 충격 시점 (월별 자료가 모두 있는 가장 마지막 달)
  pastMonths: PAST_MONTHS,
  gdpLastQuarter: lastGdpQuarter,
  note: "각 기관이 공개한 가장 최근 월까지의 자료다. 앱은 실행 중에 통계를 부르지 않고 이 파일의 고정값을 쓴다. 새 자료를 쓰려면 스크립트를 다시 실행한다.",
};

const file = `// 이 파일은 scripts/fetch-observed-series.mjs가 각 기관(IMF, BIS, OECD·FRED)의 최신 자료에서 내려받아 만든다. 직접 고치지 않는다.
// 시점별 그래프(PLAN 6번)의 "과거 실제" 구간에 쓰는 한국 월별 통계다.
import type { ObservedSeries, VariableKey } from "./types";

export const OBSERVED_META = ${JSON.stringify(meta, null, 2)};

export const OBSERVED_SERIES: Record<VariableKey, ObservedSeries> = ${JSON.stringify(observed, null, 2)};
`;
await writeFile(new URL("../src/lib/stress/observed-series.ts", import.meta.url), file, "utf8");

console.log(`\n저장했습니다: src/lib/stress/observed-series.ts`);
console.log(`기준 월(충격 시점): ${meta.baseMonth}, 과거 ${PAST_MONTHS}개월 (${monthString(startIndex)} ~ ${meta.baseMonth}), GDP 마지막 발표 분기 ${lastGdpQuarter}\n`);
for (const [variable, s] of Object.entries(observed)) {
  const first = s.points[0];
  const last = s.points.at(-1);
  console.log(`${variable.padEnd(10)} ${s.points.length}개 | ${first.month}=${first.value} → ${last.month}=${last.value} (${s.unit}) | ${s.source.institution}`);
}
