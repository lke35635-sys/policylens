// Design Ref: §4.6 — 변동 범위 = 계수 × (충격 ÷ 기준 충격) × 시나리오 배율
// 이 표는 계산의 재료이며, 모든 칸은 출처(기관, 보고서, 연도)를 달고 있어야 한다.
//
// 작성 원칙
// - 출처를 직접 확인한 칸만 "sourced"로 적는다. 확인하지 못한 칸은 숫자를 만들지 않고 "pending"으로 둔다.
// - "보도 확인"은 보고서 원문이 아니라 그것을 인용한 기사로 확인했다는 뜻이다 (Source.via 참고).
// - 숫자를 바꾸거나 칸을 채울 때는 반드시 출처를 함께 추가한다.
import type { Coefficient, IssueType, Source, VariableKey } from "./types";

const 출처필요 = (note = "출처 조사 필요"): Coefficient => ({ status: "pending", note });

// ── 출처 (직접 열어 확인한 보도 기준) ──────────────────────────────

const KDI_2026_유가물가: Source = {
  institution: "한국개발연구원(KDI)",
  title: "최근 국제유가 상승이 소비자물가에 미치는 영향",
  date: "2026-05-11",
  url: "https://www.khan.co.kr/article/202605111744001",
  via: "경향신문 보도",
};

const 한은_2008_유가충격: Source = {
  institution: "한국은행",
  title: "유가 상승 충격의 요인 분해와 시사점",
  date: "2008-04-24",
  url: "https://www.khan.co.kr/article/200804241808505",
  via: "경향신문 보도",
};

const 한은_2025_환율전가: Source = {
  institution: "한국은행",
  title: "환율의 장단기 물가 전가 효과 분석: 개별 품목을 통한 파급경로를 중심으로",
  date: "2025-02-27",
  url: "https://core.asiae.co.kr/article/2025022622392606596",
  via: "아시아경제 보도",
};

const 한경연_2019_수출규제: Source = {
  institution: "한국경제연구원",
  title: "일본 수출규제 긴급세미나 모의실험 결과 (조경엽 선임연구위원)",
  date: "2019-07-10",
  url: "https://www.dailian.co.kr/news/view/809572/",
  via: "데일리안 보도",
};

const KDI_2011_유가: Source = {
  institution: "한국개발연구원(KDI)",
  title: "국제유가 10% 상승 시 물가·GDP 영향 분석 (경향신문 기사에 보고서 제목 없음)",
  date: "2011-02-22",
  url: "https://www.khan.co.kr/article/20110222142757A/",
  via: "경향신문 보도",
};

const 한은_2012_유가: Source = {
  institution: "한국은행",
  title: "Pricier oil clouds economic outlook (보도 제목. 한국은행이 '5월'에 추정했다고만 적혀 있음)",
  date: "2012-08-06",
  url: "https://www.koreajoongangdaily.com/business/pricier-oil-clouds-economic-outlook/10195028",
  via: "Korea JoongAng Daily 보도",
};

const 현경연_2026_환율: Source = {
  institution: "현대경제연구원",
  title: "물가, 환율 상승의 누적 효과에 주의해야 한다",
  date: "2026-05-10",
  url: "https://www.inews24.com/view/1967162",
  via: "아이뉴스24 보도",
};

const 한은_2021_원자재: Source = {
  institution: "한국은행",
  title: "국제원자재가격 상승 배경 및 국내경제 파급영향 점검",
  date: "2021-06-09",
  url: "https://news.jkn.co.kr/post/830987",
  via: "재경일보 보도",
};

const KDI_2009_세계성장: Source = {
  institution: "한국개발연구원(KDI)",
  title: "IMF Forecasts Minus 4% Growth for Korea (보도 제목. KDI의 세계 성장률 민감도 전망을 인용)",
  date: "2009-02-03",
  url: "https://www.koreatimes.co.kr/amp/business/companies/20090203/imf-forecasts-minus-4-growth-for-korea",
  via: "코리아타임스 보도 (기사 본문에 날짜가 없어 주소의 날짜를 씀)",
};

const KIF_2022_연준: Source = {
  institution: "한국금융연구원(김현태 연구위원)",
  title: "미국 통화정책 정상화의 영향과 시사점 (세미나 발표)",
  date: "2022-07-08",
  url: "https://www.dailian.co.kr/news/view/1130808/",
  via: "데일리안 보도",
};

// ── 계수 표: 유형 × 변수 ─────────────────────────────────────────

// Plan SC: 6개 유형 × 변수 5개 = 30칸이 모두 있어야 한다. (Record 타입이 빠진 칸을 컴파일 단계에서 막는다.)
export const COEFFICIENTS: Record<IssueType, Record<VariableKey, Coefficient>> = {
  // 국제 유가 상승
  oil: {
    gdp: {
      status: "sourced",
      min: -0.21,
      max: -0.1,
      per: { value: 10, unit: "% 국제 유가 상승" },
      period: "1y",
      sources: [한은_2008_유가충격, KDI_2011_유가, 한은_2012_유가],
      assumption:
        "유가가 10% 오를 때 GDP 성장률이 한국은행(2008)은 2000년대에 0.1%p가량, KDI(2011)는 0.21%p, 한국은행(2012)은 0.1%p 낮아진다고 추정했다. 이 최근 추정들의 범위(0.1~0.21%p)를 썼다. 한국은행(2008)의 1970~99년 수치(0.4%p)는 유가 충격의 영향이 줄어들기 전 값이라 소비자물가 칸과 같은 기준으로 제외했다 (이전 판은 이 값을 하한으로 써서 두 칸의 기준이 달랐고, 이번에 맞췄다). 보도에 기간이 적혀 있지 않아 연간 성장률로 해석했다.",
    },
    cpi: {
      status: "sourced",
      min: 0.11,
      max: 0.2,
      per: { value: 10, unit: "% 국제 유가 상승" },
      period: "1y",
      sources: [KDI_2026_유가물가, 한은_2008_유가충격, KDI_2011_유가, 한은_2012_유가],
      assumption:
        "KDI(2026)는 두바이유가 10%p 오르면 소비자물가가 0.2%p 오르고, 과거 유가 상승기에는 0.11%p였다고 추정했다. KDI(2011)는 0.12%p, 한국은행(2012)은 0.19%p로 추정했고 모두 0.11~0.2%p 안에 들어서 이 범위를 썼다. 한국은행(2008)의 1970~99년 수치(1.5%p)는 경제 구조가 바뀌기 전 값이라 제외했다. KDI(2026)의 '10%p 상승'은 유가 상승률 10%로 해석했다.",
    },
    fx: 출처필요("유가 상승이 환율에 주는 영향을 보고서로 확인하지 못함. 2026-03-19 하루 사례는 history.ts에 있으나 유가만의 효과가 아니라 계수로 쓰지 않음"),
    policyRate: 출처필요("유가 상승이 기준금리에 주는 영향을 보고서로 확인하지 못함"),
    kospi: 출처필요("유가 10% 상승 시 코스피 변동을 정량 제시한 보고서를 찾지 못함"),
  },

  // 기준금리 (주요국 금리 인상)
  policyRate: {
    gdp: {
      status: "sourced",
      min: -0.7,
      max: -0.7,
      per: { value: 200, unit: "bp 연준 기준금리 추가 인상폭 (연말 3.75%까지)" },
      period: "1y",
      sources: [KIF_2022_연준],
      assumption:
        "연준이 2022년 말까지 기준금리를 시장 예상대로 3.75%까지 올리면 한국 GDP가 연간 약 0.7% 감소한다는 동태적 거시경제 모형 추정이다. 보도에 인상 폭이 '3.75%p 인상'과 '추가로 2%p 인상한 3.75%'로 서로 다르게 적혀 있어, 발표 시점(2022-07, 금리 상단 1.75%)을 감안해 약 200bp로 해석했다. 이 해석이 틀리면 계수 크기가 크게 달라지므로 원문 확인이 필요하다. 단일 추정치이고, GDP 수준 감소(%)를 성장률 영향(%p)에 대응시켰다.",
      singleEstimate: true,
    },
    cpi: 출처필요(),
    fx: {
      status: "sourced",
      min: 16,
      max: 16,
      per: { value: 200, unit: "bp 연준 기준금리 추가 인상폭 (연말 3.75%까지)" },
      period: "1y",
      sources: [KIF_2022_연준],
      assumption:
        "같은 모형 추정에서 연준이 연말까지 3.75%로 올리면 원/달러 환율이 최대 약 16% 오른다. 보도에 '최대'라는 표현이 있어 16%는 상한일 수 있으나 하한이 적혀 있지 않아 단일 값으로 썼다. 환율 수치의 기간이 보도에 없어 1년으로 두었다. 인상 폭을 약 200bp로 해석한 점은 gdp 칸과 같다. 같은 연구의 4.75% 시나리오 수치(GDP -1.2%, 환율 최대 +24%)는 재게시 글에만 있고 원 기사에서는 확인하지 못해 쓰지 않았다.",
      singleEstimate: true,
    },
    policyRate: 출처필요("미국 금리 인상이 한국 기준금리에 주는 영향을 보고서로 확인하지 못함"),
    kospi: 출처필요(),
  },

  // 환율 상승
  fx: {
    gdp: 출처필요(),
    cpi: {
      status: "sourced",
      min: 0.3,
      max: 0.5,
      per: { value: 10, unit: "% 원/달러 환율 상승" },
      period: "1y",
      sources: [한은_2025_환율전가, 현경연_2026_환율],
      assumption:
        "한국은행(2025)은 연평균 환율이 10% 오르면 연간 소비자물가 상승률이 0.35%p(단기 0.28%p와 장기 0.19%p를 더하면 0.47%p) 높아진다고, 현대경제연구원(2026)은 단기 약 0.3%p, 6개월 뒤 최대 0.5%p 높아진다고 추정했다. 가장 작은 값(0.3)을 하한, 가장 큰 값(0.5)을 상한으로 썼다. 한국은행 보도 안에서 0.35와 0.47이 서로 맞지 않아 보고서 원문 확인이 필요하다.",
    },
    fx: 출처필요("환율 유형의 자기 자신 변수라 기준 충격 그대로 쓸지 정해야 함 (계산 함수 작업에서 결정)"),
    policyRate: 출처필요(),
    kospi: 출처필요(),
  },

  // 수출 규제
  exportControl: {
    gdp: {
      status: "sourced",
      min: -2.2,
      max: -2.2,
      per: { value: 30, unit: "% 반도체 소재 공급 부족" },
      period: "1y",
      sources: [한경연_2019_수출규제],
      assumption:
        "반도체 소재가 30% 부족하면 한국 GDP가 2.2% 감소한다는 단일 모의실험 추정이다. 부족분이 45%로 커지면 4.2~5.4% 감소로 선형이 아니라서, 충격을 크게 키운 시나리오는 이 값을 단순 배율로 늘리면 과소 추정될 수 있다. 분석 기간이 보도에 없어 1년으로 두었고, GDP 수준 감소(%)를 성장률 영향(%p)에 대응시켰다.",
      singleEstimate: true,
    },
    cpi: 출처필요(),
    fx: 출처필요(),
    policyRate: 출처필요(),
    kospi: 출처필요(),
  },

  // 원자재·공급망
  commoditySupply: {
    gdp: 출처필요(),
    cpi: {
      status: "sourced",
      min: 0.05,
      max: 0.2,
      per: { value: 10, unit: "% 국제 원자재 가격 상승" },
      period: "1y",
      sources: [한은_2021_원자재],
      assumption:
        "원자재 가격 상승률이 10%에 이르러 추세적으로 이어지면 소비자물가가 네 분기 뒤 최대 0.2% 높아지고, 일시적 상승에 그치면 0.05%에 그친다는 한국은행 추정이다. 일시적 0.05를 하한, 추세적 0.2를 상한으로 썼다. 보도가 '%p'가 아니라 '%'(전년동기대비)로 적어서 %p로 해석했고, 0.05의 기준은 보도에 명시돼 있지 않다. 한국무역협회의 원자재 수입가 10% 상승 시 생산자물가 +0.43%는 소비자물가가 아니라 쓰지 않았다.",
    },
    fx: 출처필요(),
    policyRate: 출처필요(),
    kospi: 출처필요(),
  },

  // 글로벌 경기 둔화
  globalSlowdown: {
    gdp: {
      status: "sourced",
      min: -1,
      max: -0.6,
      per: { value: 1, unit: "%p 세계 경제성장률 하락" },
      period: "1y",
      sources: [KDI_2009_세계성장],
      assumption:
        "세계 경제성장률이 1% 낮아질 때 한국 성장률이 0.6~1%p 하락한다는 KDI의 전망이다 (보도 원문: 'for every 1 percent loss in the global economic growth rate'). 보도의 '1 percent'를 1%p로 해석했고, 2008~09년 위기 국면의 전망이라 오늘의 구조와 다를 수 있다. 기간이 적혀 있지 않아 연간 성장률로 해석했다. 참고 후보였던 KBI 분석(미국 성장률 1%p 상승 시 한국 +0.496%p)은 원문을 확인하지 못해 쓰지 않았다.",
    },
    cpi: 출처필요(),
    fx: 출처필요(),
    policyRate: 출처필요(),
    kospi: 출처필요(),
  },
};
