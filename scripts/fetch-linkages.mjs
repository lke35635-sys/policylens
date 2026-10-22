// 변수들이 과거에 서로 어떻게 함께 움직였는지(연쇄 효과)를 한국의 공개 통계에서 직접 계산해
// src/lib/stress/linkages.ts로 만든다. 앱은 이 파일의 고정값만 쓰며 실행 중에 통계를 부르지 않는다 (PRD 6번).
// 실행: node scripts/fetch-linkages.mjs  (인터넷 연결 필요)
//
// 방법 (일부러 단순하게, 누구나 다시 계산해 볼 수 있게)
// 1) 변수 5개의 "12개월 변화"를 달마다 계산한다. GDP·소비자물가·기준금리는 12개월 전과의 %p 차이(GDP는 전년 동기 성장률, 소비자물가는
//    전년 동월 상승률의 차이), 환율·코스피는 12개월 변화율(%). 그래프·결과 표와 같은 단위다.
// 2) 원인 변수 A의 12개월 변화로 결과 변수 B의 같은 12개월 변화를 직선(최소제곱)으로 설명하고, 기울기(A가 1 움직일 때 B가 움직인 크기)를 구한다.
// 3) 12개월 구간을 한 달씩 밀어 만든 표본은 서로 겹치므로, 불확실성은 "독립 표본 수 = 표본 수 ÷ 12"로 보수적으로 계산한다.
//    범위 = 기울기 ± 표준오차 1개.
// 4) 상관계수 절댓값이 0.3 미만인 관계는 "뚜렷한 관계 없음"으로 보고 쓰지 않는다 (결과를 보기 전에 정한 기준).
// 한계: 같은 기간의 동시 움직임이라 인과가 아니다. 제3의 요인(예: 세계 경기)이 둘을 함께 움직였을 수 있다.
import { writeFile } from "node:fs/promises";

const START = "2000-01"; // 외환위기 직후의 변동성을 빼고 변동환율제가 자리 잡은 뒤부터 쓴다
const MIN_ABS_R = 0.3;

const URLS = {
  gdp: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=KORGDPRQPSMEI",
  cpi: "https://api.imf.org/external/sdmx/2.1/data/IMF.STA,CPI/KOR.CPI._T.IX.M?startPeriod=1998-01",
  policyRate: "https://stats.bis.org/api/v1/data/WS_CBPOL/M.KR?startPeriod=1998-01&format=csv",
  fx: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXKOUS",
  kospi: "https://fred.stlouisfed.org/graph/fredgraph.csv?id=SPASTT01KRM661N",
};
const VARIABLES = Object.keys(URLS);
// 살펴볼 "원인 → 결과" 방향. 상관은 방향이 없어서(A→B와 B→A의 상관이 같다) 결과를 보기 전에 경제학적으로 말이 되는 방향만 미리 정했다.
// 뺀 방향: 기준금리→물가(한국은행은 물가가 오를 때 금리를 올려서, 데이터에는 "금리가 오를 때 물가도 오른" 모양이 나와 인과로 읽으면 거꾸로다),
//         물가→환율, 환율→기준금리, GDP→환율(환율→GDP가 이미 있다). 코스피는 표의 값이 1개월이라 연쇄의 출발점이 아니라 결과로만 본다.
const PAIRS = [
  ["cpi", "policyRate"],
  ["cpi", "gdp"],
  ["cpi", "kospi"],
  ["policyRate", "gdp"],
  ["policyRate", "fx"],
  ["policyRate", "kospi"],
  ["fx", "cpi"],
  ["fx", "gdp"],
  ["fx", "kospi"],
  ["gdp", "cpi"],
  ["gdp", "policyRate"],
  ["gdp", "kospi"],
];

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
function parseFred(csv) {
  const map = new Map();
  for (const line of csv.trim().split("\n").slice(1)) {
    const [date, value] = line.split(",");
    const n = Number(value);
    if (date && Number.isFinite(n) && value.trim() !== "") map.set(date.slice(0, 7), n);
  }
  return map;
}
const monthIndex = (m) => Number(m.slice(0, 4)) * 12 + (Number(m.slice(5, 7)) - 1);
const monthString = (i) => `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, "0")}`;
const quarterOf = (m) => `${m.slice(0, 4)}-Q${Math.floor((Number(m.slice(5, 7)) - 1) / 3) + 1}`;

console.log("통계를 내려받는 중...");
const raw = {};
const gdpMonthly = parseFred(await getText(URLS.gdp));
raw.gdpQ = new Map([...gdpMonthly].map(([m, v]) => [quarterOf(m), v]));
const imf = JSON.parse(await getText(URLS.cpi, { Accept: "application/json" }));
const imfTimes = imf.structure.dimensions.observation[0].values.map((v) => v.id.replace("-M", "-"));
raw.cpiIndex = new Map(Object.entries(Object.values(imf.dataSets[0].series)[0].observations).map(([i, v]) => [imfTimes[Number(i)], v[0]]));
{
  const lines = (await getText(URLS.policyRate)).trim().split("\n");
  const header = lines[0].split(",");
  const t = header.indexOf("TIME_PERIOD");
  const o = header.indexOf("OBS_VALUE");
  raw.policyRate = new Map(lines.slice(1).map((l) => l.split(",")).map((c) => [c[t], Number(c[o])]));
}
raw.fx = parseFred(await getText(URLS.fx));
raw.kospi = parseFred(await getText(URLS.kospi));

// 달 t의 "수준" 값: gdp는 전년 동기 성장률(분기값을 세 달에 같이 씀), cpi는 전년 동월 상승률, 나머지는 그대로
function level(variable, m) {
  if (variable === "gdp") return raw.gdpQ.get(quarterOf(m));
  if (variable === "cpi") {
    const now = raw.cpiIndex.get(m);
    const before = raw.cpiIndex.get(monthString(monthIndex(m) - 12));
    return now !== undefined && before !== undefined ? (now / before - 1) * 100 : undefined;
  }
  return raw[variable].get(m);
}
// 12개월 변화: 비율 변수(환율·코스피)는 % 변화율, 나머지는 %p 차이
function change12(variable, m) {
  const now = level(variable, m);
  const before = level(variable, monthString(monthIndex(m) - 12));
  if (now === undefined || before === undefined) return undefined;
  return variable === "fx" || variable === "kospi" ? (now / before - 1) * 100 : now - before;
}

// 모든 변수의 12개월 변화가 있는 달들
const lastMonth = Math.min(...["policyRate", "fx", "kospi"].map((v) => Math.max(...[...raw[v].keys()].map(monthIndex))), Math.max(...[...raw.cpiIndex.keys()].map(monthIndex)));
const months = [];
for (let i = monthIndex(START); i <= lastMonth; i += 1) {
  const m = monthString(i);
  if (VARIABLES.every((v) => change12(v, m) !== undefined)) months.push(m);
}
const series = Object.fromEntries(VARIABLES.map((v) => [v, months.map((m) => change12(v, m))]));
console.log(`표본: ${months[0]} ~ ${months.at(-1)}, 월 ${months.length}개 (12개월 구간이 겹침 → 독립 표본 약 ${Math.floor(months.length / 12)}개)`);

function regress(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0, syy = 0, sxy = 0;
  for (let i = 0; i < n; i += 1) {
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
    sxy += (xs[i] - mx) * (ys[i] - my);
  }
  const slope = sxy / sxx;
  const r = sxy / Math.sqrt(sxx * syy);
  const nEff = Math.floor(n / 12);
  const se = Math.sqrt((1 - r * r) / (nEff - 2)) * Math.sqrt(syy / sxx);
  return { slope, r, nEff, se };
}
const round = (x, d = 4) => Math.round(x * 10 ** d) / 10 ** d;

const links = [];
const dropped = [];
for (const [cause, effect] of PAIRS) {
  const { slope, r, nEff, se } = regress(series[cause], series[effect]);
  const row = { cause, effect, slope: round(slope), low: round(slope - se), high: round(slope + se), r: round(r, 3), nEff };
  (Math.abs(r) >= MIN_ABS_R ? links : dropped).push(row);
}

const today = new Date().toISOString().slice(0, 10);
const sources = [
  ["OECD (FRED 경유)", "Real GDP for Korea, 전년 동기 대비 증가율, 분기 (KORGDPRQPSMEI)", URLS.gdp, "FRED 직접 조회"],
  ["IMF", "소비자물가지수(CPI), 한국, 전 품목, 월별 (IMF.STA CPI)", URLS.cpi, "IMF 데이터 서비스 직접 조회"],
  ["BIS", "중앙은행 정책금리: 한국은행 기준금리, 월말 (WS_CBPOL)", URLS.policyRate, "BIS 데이터 서비스 직접 조회"],
  ["미 연준 H.10 (FRED 경유)", "원/달러 환율, 월평균 (EXKOUS)", URLS.fx, "FRED 직접 조회"],
  ["OECD (FRED 경유)", "한국 주가지수, 월별 (SPASTT01KRM661N)", URLS.kospi, "FRED 직접 조회"],
].map(([institution, title, url, how]) => ({ institution, title, date: today, url, via: `${how} (조회일 ${today})` }));

const meta = {
  generatedAt: today,
  period: `${months[0]} ~ ${months.at(-1)}`,
  months: months.length,
  minAbsR: MIN_ABS_R,
  method:
    "변수별 12개월 변화(GDP·물가·기준금리는 %p 차이, 환율·코스피는 % 변화율)에서, 원인 변수의 변화로 결과 변수의 같은 기간 변화를 직선(최소제곱)으로 설명한 기울기다. 12개월 구간이 한 달씩 겹치므로 독립 표본 수는 표본 수의 12분의 1로 보고, 범위는 기울기 ± 표준오차 1개다. 상관계수 절댓값이 0.3 미만인 관계는 쓰지 않았다. 원인→결과 방향은 결과를 보기 전에 경제학적으로 말이 되는 12가지만 미리 정했다.",
  caveat: "같은 기간의 동시 움직임을 본 것이라 원인과 결과를 뜻하지 않는다. 세계 경기 같은 제3의 요인이 둘을 함께 움직였을 수 있고, 과거의 관계가 앞으로도 같다는 보장이 없다.",
};

const file = `// 이 파일은 scripts/fetch-linkages.mjs가 공개 통계(IMF, BIS, OECD·FRED)에서 계산해 만든다. 직접 고치지 않는다.
// 변수들이 과거에 서로 함께 움직인 정도(연쇄 효과 추정)이며, 결과 카드의 "연쇄 효과"에 쓴다.
import type { Linkage, LinkageMeta, Source } from "./types";

export const LINKAGE_META: LinkageMeta = ${JSON.stringify(meta, null, 2)};

export const LINKAGE_SOURCES: Source[] = ${JSON.stringify(sources, null, 2)};

// 상관계수 절댓값이 ${MIN_ABS_R} 이상인 관계만 담았다.
export const LINKAGES: Linkage[] = ${JSON.stringify(links, null, 2)};

// 참고: 상관이 약해서 뺀 관계 (화면에 "뚜렷한 관계 없음"으로 알릴 때 쓴다)
export const WEAK_LINKAGES: Linkage[] = ${JSON.stringify(dropped, null, 2)};
`;
await writeFile(new URL("../src/lib/stress/linkages.ts", import.meta.url), file, "utf8");

const NAME = { gdp: "GDP", cpi: "물가", policyRate: "금리", fx: "환율", kospi: "코스피" };
console.log(`\n쓰는 관계 ${links.length}개 (|r| ≥ ${MIN_ABS_R}), 뺀 관계 ${dropped.length}개\n`);
for (const l of links) console.log(`  ${NAME[l.cause]} → ${NAME[l.effect]}: 기울기 ${l.slope} (${l.low} ~ ${l.high}), r=${l.r}`);
console.log("\n뺀 관계");
for (const l of dropped) console.log(`  ${NAME[l.cause]} → ${NAME[l.effect]}: r=${l.r}`);
