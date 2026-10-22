// 이 파일은 scripts/fetch-linkages.mjs가 공개 통계(IMF, BIS, OECD·FRED)에서 계산해 만든다. 직접 고치지 않는다.
// 변수들이 과거에 서로 함께 움직인 정도(연쇄 효과 추정)이며, 결과 카드의 "연쇄 효과"에 쓴다.
import type { Linkage, LinkageMeta, Source } from "./types";

export const LINKAGE_META: LinkageMeta = {
  "generatedAt": "2026-10-22",
  "period": "2000-05 ~ 2026-06",
  "months": 314,
  "minAbsR": 0.3,
  "method": "변수별 12개월 변화(GDP·물가·기준금리는 %p 차이, 환율·코스피는 % 변화율)에서, 원인 변수의 변화로 결과 변수의 같은 기간 변화를 직선(최소제곱)으로 설명한 기울기다. 12개월 구간이 한 달씩 겹치므로 독립 표본 수는 표본 수의 12분의 1로 보고, 범위는 기울기 ± 표준오차 1개다. 상관계수 절댓값이 0.3 미만인 관계는 쓰지 않았다. 원인→결과 방향은 결과를 보기 전에 경제학적으로 말이 되는 12가지만 미리 정했다.",
  "caveat": "같은 기간의 동시 움직임을 본 것이라 원인과 결과를 뜻하지 않는다. 세계 경기 같은 제3의 요인이 둘을 함께 움직였을 수 있고, 과거의 관계가 앞으로도 같다는 보장이 없다."
};

export const LINKAGE_SOURCES: Source[] = [
  {
    "institution": "OECD (FRED 경유)",
    "title": "Real GDP for Korea, 전년 동기 대비 증가율, 분기 (KORGDPRQPSMEI)",
    "date": "2026-10-22",
    "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=KORGDPRQPSMEI",
    "via": "FRED 직접 조회 (조회일 2026-10-22)"
  },
  {
    "institution": "IMF",
    "title": "소비자물가지수(CPI), 한국, 전 품목, 월별 (IMF.STA CPI)",
    "date": "2026-10-22",
    "url": "https://api.imf.org/external/sdmx/2.1/data/IMF.STA,CPI/KOR.CPI._T.IX.M?startPeriod=1998-01",
    "via": "IMF 데이터 서비스 직접 조회 (조회일 2026-10-22)"
  },
  {
    "institution": "BIS",
    "title": "중앙은행 정책금리: 한국은행 기준금리, 월말 (WS_CBPOL)",
    "date": "2026-10-22",
    "url": "https://stats.bis.org/api/v1/data/WS_CBPOL/M.KR?startPeriod=1998-01&format=csv",
    "via": "BIS 데이터 서비스 직접 조회 (조회일 2026-10-22)"
  },
  {
    "institution": "미 연준 H.10 (FRED 경유)",
    "title": "원/달러 환율, 월평균 (EXKOUS)",
    "date": "2026-10-22",
    "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXKOUS",
    "via": "FRED 직접 조회 (조회일 2026-10-22)"
  },
  {
    "institution": "OECD (FRED 경유)",
    "title": "한국 주가지수, 월별 (SPASTT01KRM661N)",
    "date": "2026-10-22",
    "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=SPASTT01KRM661N",
    "via": "FRED 직접 조회 (조회일 2026-10-22)"
  }
];

// 상관계수 절댓값이 0.3 이상인 관계만 담았다.
export const LINKAGES: Linkage[] = [
  {
    "cause": "cpi",
    "effect": "policyRate",
    "slope": 0.2062,
    "low": 0.0944,
    "high": 0.3179,
    "r": 0.352,
    "nEff": 26
  },
  {
    "cause": "fx",
    "effect": "gdp",
    "slope": -0.1547,
    "low": -0.2131,
    "high": -0.0962,
    "r": -0.475,
    "nEff": 26
  },
  {
    "cause": "fx",
    "effect": "kospi",
    "slope": -1.1477,
    "low": -1.6817,
    "high": -0.6137,
    "r": -0.402,
    "nEff": 26
  },
  {
    "cause": "gdp",
    "effect": "kospi",
    "slope": 5.2745,
    "low": 3.8422,
    "high": 6.7068,
    "r": 0.601,
    "nEff": 26
  }
];

// 참고: 상관이 약해서 뺀 관계 (화면에 "뚜렷한 관계 없음"으로 알릴 때 쓴다)
export const WEAK_LINKAGES: Linkage[] = [
  {
    "cause": "cpi",
    "effect": "gdp",
    "slope": -0.2621,
    "low": -0.7203,
    "high": 0.1961,
    "r": -0.116,
    "nEff": 26
  },
  {
    "cause": "cpi",
    "effect": "kospi",
    "slope": -2.3228,
    "low": -6.3447,
    "high": 1.699,
    "r": -0.117,
    "nEff": 26
  },
  {
    "cause": "policyRate",
    "effect": "gdp",
    "slope": 0.2349,
    "low": -0.5522,
    "high": 1.022,
    "r": 0.061,
    "nEff": 26
  },
  {
    "cause": "policyRate",
    "effect": "fx",
    "slope": -3.3116,
    "low": -5.6386,
    "high": -0.9846,
    "r": -0.279,
    "nEff": 26
  },
  {
    "cause": "policyRate",
    "effect": "kospi",
    "slope": -0.6516,
    "low": -7.5726,
    "high": 6.2693,
    "r": -0.019,
    "nEff": 26
  },
  {
    "cause": "fx",
    "effect": "cpi",
    "slope": 0.022,
    "low": -0.007,
    "high": 0.051,
    "r": 0.153,
    "nEff": 26
  },
  {
    "cause": "gdp",
    "effect": "cpi",
    "slope": -0.0513,
    "low": -0.141,
    "high": 0.0384,
    "r": -0.116,
    "nEff": 26
  },
  {
    "cause": "gdp",
    "effect": "policyRate",
    "slope": 0.0157,
    "low": -0.037,
    "high": 0.0685,
    "r": 0.061,
    "nEff": 26
  }
];
