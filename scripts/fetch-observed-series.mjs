// 시점별 그래프(PLAN 6번)에 쓸 한국의 과거 실제 월별 통계를 IMF 국제금융통계(IFS)에서 내려받아
// src/lib/stress/observed-series.ts로 만든다. 앱은 이 파일에 고정된 값을 쓰며 실행 중에 통계를 부르지 않는다 (PRD 6번).
// 실행: node scripts/fetch-observed-series.mjs  (인터넷 연결 필요, DBnomics 경유)
//
// 가공 규칙 (변수 5개, 값은 모두 "충격 시점의 값을 기준으로 한 변화량"으로 쓰기 전의 원래 값)
// - gdp:        분기 실질 GDP(계절조정) → 전년 동기 대비 성장률(%). 같은 분기의 세 달에 같은 값을 쓴다.
// - cpi:        월별 소비자물가지수 → 전년 동월 대비 상승률(%)
// - policyRate: 월별 정책금리(%)
// - fx:         원/달러 월평균 환율(원)
// - kospi:      월별 주가지수 (IMF IFS의 한국 주가지수. 지수 수준이며 코스피 포인트와 단위가 다를 수 있다)
// 기준 월(충격 시점) = 월별 자료 4개에 모두 값이 있는 가장 마지막 달. 그 이전 36개월까지 저장한다.
import { writeFile } from "node:fs/promises";

const PAST_MONTHS = 36;
const BASE = "https://api.db.nomics.world/v22/series/IMF/IFS/";
const IDS = {
  gdp: "Q.KR.NGDP_R_SA_XDC",
  cpi: "M.KR.PCPI_IX",
  policyRate: "M.KR.FPOLM_PA",
  fx: "M.KR.ENDA_XDC_USD_RATE",
  kospi: "M.KR.FPE_IX",
};
const TITLES = {
  gdp: "IFS: 한국 실질 GDP, 계절조정, 분기, 자국통화 (NGDP_R_SA_XDC)",
  cpi: "IFS: 한국 소비자물가지수, 전 품목, 월별 (PCPI_IX)",
  policyRate: "IFS: 한국 정책금리(Monetary Policy-Related Interest Rate), 월별 (FPOLM_PA)",
  fx: "IFS: 원/달러 환율, 기간 평균, 월별 (ENDA_XDC_USD_RATE)",
  kospi: "IFS: 한국 주가지수(Equities index), 월별 (FPE_IX)",
};

async function getSeries(id) {
  const url = `${BASE}${id}?observations=1`;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const doc = (await res.json()).series.docs[0];
      const byPeriod = new Map();
      doc.period.forEach((p, i) => {
        if (typeof doc.value[i] === "number") byPeriod.set(p, doc.value[i]);
      });
      return { byPeriod, url, indexedAt: doc.indexed_at?.slice(0, 10) };
    } catch (error) {
      if (attempt === 3) throw new Error(`${url} 를 받지 못함: ${error.message}`);
    }
  }
}

const today = new Date().toISOString().slice(0, 10);
console.log("통계를 내려받는 중...");
const raw = {};
for (const [variable, id] of Object.entries(IDS)) raw[variable] = await getSeries(id);

// "2025-05" 달 계산
const monthIndex = (m) => Number(m.slice(0, 4)) * 12 + (Number(m.slice(5, 7)) - 1);
const monthString = (index) => `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, "0")}`;
const quarterOf = (m) => `${m.slice(0, 4)}-Q${Math.floor((Number(m.slice(5, 7)) - 1) / 3) + 1}`;
const quarterIndex = (q) => Number(q.slice(0, 4)) * 4 + (Number(q.slice(6, 7)) - 1);
const quarterString = (index) => `${Math.floor(index / 4)}-Q${(index % 4) + 1}`;

// 기준 월: 월별 자료 4개에 값이 모두 있는 가장 마지막 달 (물가는 전년 동월 값도 있어야 한다)
const monthly = ["cpi", "policyRate", "fx", "kospi"];
const lastOf = (series) => Math.max(...[...series.byPeriod.keys()].map(monthIndex));
const baseIndex = Math.min(...monthly.map((v) => lastOf(raw[v])));
const startIndex = baseIndex - PAST_MONTHS;

// 월별 값 계산
function valueAt(variable, index) {
  const m = monthString(index);
  const s = raw[variable].byPeriod;
  if (variable === "cpi") {
    const now = s.get(m);
    const before = s.get(monthString(index - 12));
    return now !== undefined && before !== undefined ? (now / before - 1) * 100 : undefined;
  }
  if (variable === "gdp") {
    const q = quarterIndex(quarterOf(m));
    const now = s.get(quarterString(q));
    const before = s.get(quarterString(q - 4));
    return now !== undefined && before !== undefined ? (now / before - 1) * 100 : undefined;
  }
  return s.get(m);
}

const UNITS = { gdp: "%", cpi: "%", policyRate: "%", fx: "원", kospi: "지수" };
const DERIVATIONS = {
  gdp: "분기 실질 GDP(계절조정)의 전년 동기 대비 성장률. 같은 분기의 세 달에 같은 값",
  cpi: "소비자물가지수의 전년 동월 대비 상승률",
  policyRate: "정책금리 그대로",
  fx: "원/달러 월평균 환율 그대로",
  kospi: "주가지수 그대로 (IMF IFS의 한국 주가지수)",
};

const observed = {};
for (const variable of Object.keys(IDS)) {
  const points = [];
  for (let i = startIndex; i <= baseIndex; i += 1) {
    const value = valueAt(variable, i);
    if (value === undefined) throw new Error(`${variable} ${monthString(i)} 값이 없음`);
    points.push({ month: monthString(i), value: Math.round(value * 10000) / 10000 });
  }
  observed[variable] = {
    variable,
    unit: UNITS[variable],
    derivation: DERIVATIONS[variable],
    points,
    source: {
      institution: "IMF",
      title: TITLES[variable],
      date: raw[variable].indexedAt ?? today,
      url: raw[variable].url,
      via: `DBnomics API 직접 조회 (조회일 ${today})`,
    },
  };
}

const meta = {
  generatedAt: today,
  baseMonth: monthString(baseIndex), // 충격 시점 (자료가 있는 가장 마지막 달)
  pastMonths: PAST_MONTHS,
  note: "공개 서비스(DBnomics)에 올라온 가장 최근 자료 기준이라 오늘 날짜보다 오래됐을 수 있다. 앱이 실행 중에 통계를 부르지 않고 이 파일의 고정값을 쓴다.",
};

const file = `// 이 파일은 scripts/fetch-observed-series.mjs가 IMF 국제금융통계(IFS)에서 내려받아 만든다. 직접 고치지 않는다.
// 시점별 그래프(PLAN 6번)의 "과거 실제" 구간에 쓰는 한국 월별 통계다.
import type { ObservedSeries, VariableKey } from "./types";

export const OBSERVED_META = ${JSON.stringify(meta, null, 2)};

export const OBSERVED_SERIES: Record<VariableKey, ObservedSeries> = ${JSON.stringify(observed, null, 2)};
`;
await writeFile(new URL("../src/lib/stress/observed-series.ts", import.meta.url), file, "utf8");

console.log(`\n저장했습니다: src/lib/stress/observed-series.ts`);
console.log(`기준 월(충격 시점): ${meta.baseMonth}, 과거 ${PAST_MONTHS}개월 (${monthString(startIndex)} ~ ${meta.baseMonth})\n`);
for (const [variable, s] of Object.entries(observed)) {
  const first = s.points[0];
  const last = s.points.at(-1);
  console.log(`${variable.padEnd(10)} ${s.points.length}개 | ${first.month}=${first.value} → ${last.month}=${last.value} (${s.unit})`);
}
