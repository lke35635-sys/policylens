// 내려받을 공식 통계의 목록 (PLAN 8번). 키 없이 받을 수 있는 FRED(세인트루이스 연준)의 시계열을 쓴다.
// FRED는 원 기관(미 연준 이사회, OECD, IMF, BIS)의 자료를 모아 놓은 곳이라, 화면의 출처에는 원 기관을 적고 "FRED 경유"를 덧붙인다.
// 이 목록을 고치려면 scripts/fetch-series.mjs를 다시 실행한다. 어느 지표를 어느 경로에 연결할지는 PLAN 9~10번에서 정한다.
//
// 칸 설명
// - id: FRED 시계열 아이디 (그대로 통계 아이디로 쓴다)
// - name: 화면에 보일 한국어 이름
// - unit: 화면에 보일 단위 (원래 숫자를 scale로 나눈 뒤의 단위)
// - scale: 원래 숫자를 이 값으로 나눠 저장한다 (큰 금액을 조·십억 단위로 줄인다)
// - frequency: 저장하는 주기 (monthly 월별, quarterly 분기별)
// - rawFrequency: FRED 원래 주기. daily·weekly이면 월 평균을 내서 저장한다 (진행 중인 달은 평균이 덜 찬 값이라 뺀다)
// - fredUnits: FRED 페이지의 단위 설명에 들어 있어야 하는 글자. 다르면 FRED가 단위를 바꾼 것이니 멈춘다
// - fredSource: FRED 페이지의 출처 설명에 들어 있어야 하는 글자. 원 기관과 종류를 정하는 데 쓴다

export const START = "1984-01"; // 가장 이른 정책 시행일(1994)의 10년 전부터 저장한다

export const ORGS = {
  "Board of Governors of the Federal Reserve System (US)": { name: "미국 연방준비제도 이사회", type: "해외 중앙은행" },
  "Organization for Economic Co-operation and Development": { name: "OECD", type: "국제기구" },
  "International Monetary Fund": { name: "국제통화기금(IMF)", type: "국제기구" },
  "Bank for International Settlements": { name: "국제결제은행(BIS)", type: "국제기구" },
};

export const SERIES_SPEC = [
  // 미국
  { id: "FEDFUNDS", name: "미국 연방기금 실효금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Board of Governors" },
  { id: "GS10", name: "미국 10년 국채금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Board of Governors" },
  { id: "WALCL", name: "미국 연준 총자산(월평균)", unit: "조 달러", scale: 1e6, frequency: "monthly", rawFrequency: "weekly", fredUnits: "Millions of U.S. Dollars", fredSource: "Board of Governors" },
  { id: "TREAST", name: "미국 연준 보유 국채(월평균)", unit: "조 달러", scale: 1e6, frequency: "monthly", rawFrequency: "weekly", fredUnits: "Millions of U.S. Dollars", fredSource: "Board of Governors" },
  { id: "DTWEXBGS", name: "미국 달러지수(광의, 월평균)", unit: "지수(2006년 1월=100)", scale: 1, frequency: "monthly", rawFrequency: "daily", fredUnits: "Index Jan 2006=100", fredSource: "Board of Governors" },
  // 한국
  { id: "EXKOUS", name: "원/달러 환율", unit: "원/달러", scale: 1, frequency: "monthly", fredUnits: "South Korean Won to One U.S. Dollar", fredSource: "Board of Governors" },
  { id: "IR3TIB01KRM156N", name: "한국 3개월 은행간금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
  { id: "IRLTLT01KRM156N", name: "한국 10년 국채금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
  { id: "XTEXVA01KRM667S", name: "한국 상품 수출액(계절조정)", unit: "십억 달러", scale: 1e9, frequency: "monthly", fredUnits: "US dollars", fredSource: "Organization for Economic" },
  { id: "XTIMVA01KRM667S", name: "한국 상품 수입액(계절조정)", unit: "십억 달러", scale: 1e9, frequency: "monthly", fredUnits: "US dollars", fredSource: "Organization for Economic" },
  { id: "SPASTT01KRM661N", name: "한국 주가지수", unit: "지수(2015년=100)", scale: 1, frequency: "monthly", fredUnits: "Index 2015=100", fredSource: "Organization for Economic" },
  { id: "TRESEGKRM052N", name: "한국 외환보유액(금 제외)", unit: "십억 달러", scale: 1e3, frequency: "monthly", fredUnits: "Millions of Dollars", fredSource: "International Monetary Fund" },
  { id: "RBKRBIS", name: "한국 실질실효환율(광의)", unit: "지수(2020년=100)", scale: 1, frequency: "monthly", fredUnits: "Index 2020=100", fredSource: "Bank for International Settlements" },
  { id: "KORLOLITOAASTSAM", name: "한국 경기선행지수", unit: "지수", scale: 1, frequency: "monthly", fredUnits: "Index", fredSource: "Organization for Economic" },
  { id: "LRHUTTTTKRM156S", name: "한국 실업률(계절조정)", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
  { id: "CRDQKRAPABIS", name: "한국 민간 비금융부문 신용", unit: "조 원", scale: 1e3, frequency: "quarterly", fredUnits: "Billions of South Korean Wons", fredSource: "Bank for International Settlements" },
  { id: "QKRR628BIS", name: "한국 실질 주택가격지수", unit: "지수(2010년=100)", scale: 1, frequency: "quarterly", fredUnits: "Index 2010=100", fredSource: "Bank for International Settlements" },
  // 중국
  { id: "EXCHUS", name: "위안/달러 환율", unit: "위안/달러", scale: 1, frequency: "monthly", fredUnits: "Chinese Yuan Renminbi to One U.S. Dollar", fredSource: "Board of Governors" },
  { id: "XTEXVA01CNM667S", name: "중국 상품 수출액(계절조정)", unit: "십억 달러", scale: 1e9, frequency: "monthly", fredUnits: "US dollars", fredSource: "Organization for Economic" },
  { id: "IR3TIB01CNM156N", name: "중국 3개월 은행간금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
  // 일본
  { id: "EXJPUS", name: "엔/달러 환율", unit: "엔/달러", scale: 1, frequency: "monthly", fredUnits: "Japanese Yen to One U.S. Dollar", fredSource: "Board of Governors" },
  { id: "XTEXVA01JPM664S", name: "일본 상품 수출액(계절조정)", unit: "조 엔", scale: 1e12, frequency: "monthly", fredUnits: "Yen", fredSource: "Organization for Economic" },
  { id: "IRSTCI01JPM156N", name: "일본 단기금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
  { id: "IRLTLT01JPM156N", name: "일본 10년 국채금리", unit: "%", scale: 1, frequency: "monthly", fredUnits: "Percent", fredSource: "Organization for Economic" },
];
