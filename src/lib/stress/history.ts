// Design Ref: §4.2 단계 ⑤ — 기사에 충격 수치가 없으면 이 표의 과거 사례 값을 대신 쓰고, 그 사실을 화면에 표시한다.
// 이 표는 계수 표(coefficients.ts)와 같은 원칙을 따른다: 출처를 직접 확인한 사례만 넣고, 모르는 것은 비워 둔다.
// 사례 조사는 개발 단계에서 사람이 하며, 앱이 실시간으로 검색하지 않는다 (PRD 6번).
import type { HistoricalCase, IssueType, ShockBase, Source } from "./types";

const 서울신문_2026_유가환율: Source = {
  institution: "서울신문",
  title: "119달러 ‘유가 폭탄’… 환율 1500원 뚫렸다",
  date: "2026-03-20",
  url: "https://m.seoul.co.kr/news/2026/03/20/20260320001004",
  via: "보도 기사",
};

const 블록미디어_2022_연준: Source = {
  institution: "블록미디어",
  title: "미 연준 ‘자이언트 스텝’ 단행",
  date: "2022-07",
  url: "https://www.blockmedia.co.kr/archives/242717",
  via: "보도 기사 (기사에 연도 표기가 없어, 기준금리 1.50~1.75%에서 2.25~2.50%로 오른 결정이므로 2022년 7월 FOMC로 판단)",
};

const 한경연_2019_수출규제: Source = {
  institution: "한국경제연구원",
  title: "일본 수출규제 긴급세미나 모의실험 결과 (조경엽 선임연구위원)",
  date: "2019-07-10",
  url: "https://www.dailian.co.kr/news/view/809572/",
  via: "데일리안 보도",
};

// Plan SC: 확인된 사례만 넣는다. 사례가 없는 유형(원자재·공급망, 글로벌 경기 둔화)은 비어 있고, 기사에 충격 수치가 없으면 "대신 쓸 값 없음"이 된다.
export const HISTORICAL_CASES: HistoricalCase[] = [
  {
    id: "oil-2026-03-19",
    type: "oil",
    name: "2026년 3월 19일 국제 유가 급등 (브렌트유 하루 10% 이상, 119.13달러)",
    date: "2026-03-19",
    kind: "observed",
    shock: { value: 10, unit: "% 국제 유가 상승 (하루, 보도의 '10% 이상'을 10으로 적음)" },
    observed: {
      fx: {
        value: 1.2,
        unit: "%",
        note: "원/달러 환율이 17.9원 올라 1501.0원 (전일 종가 1483.1원을 보도 수치로 역산해 계산)",
      },
      kospi: { value: -2.73, unit: "%", note: "코스피 5763.22로 마감, 전일 대비 161.81포인트 하락" },
    },
    sources: [서울신문_2026_유가환율],
    note: "중동 전쟁 등 복합 악재 속에서 나온 하루 반응이라 유가만의 효과가 아니다. 방향 일치율 검증에서 참고용으로만 쓴다.",
  },
  {
    id: "fx-2026-03-19",
    type: "fx",
    name: "2026년 3월 19일 원/달러 환율 1500원 돌파 (주간 종가 기준 2009년 3월 이후 17년 만)",
    date: "2026-03-19",
    kind: "observed",
    shock: { value: 1.2, unit: "% 원/달러 환율 상승 (하루, 17.9원)" },
    observed: {
      kospi: { value: -2.73, unit: "%", note: "같은 날 코스피 전일 대비 2.73% 하락" },
    },
    sources: [서울신문_2026_유가환율],
    note: "유가 급등과 같은 날의 사례라 위 유가 사례와 원인이 겹친다.",
  },
  {
    id: "policyRate-2022-07",
    type: "policyRate",
    name: "2022년 7월 미 연준 자이언트 스텝 (1.50~1.75%에서 2.25~2.50%로)",
    date: "2022-07",
    kind: "observed",
    shock: { value: 75, unit: "bp 연준 기준금리 인상폭" },
    sources: [블록미디어_2022_연준],
    note: "해당 기사에 코스피·환율 반응 수치가 없어 observed는 비워 두었다. 방향 일치율 검증(PLAN 3번)에서 채운다.",
  },
  {
    id: "exportControl-2019-07",
    type: "exportControl",
    name: "2019년 7월 일본 수출규제 시나리오 (반도체 소재 30% 부족 가정)",
    date: "2019-07-10",
    kind: "scenario",
    shock: { value: 30, unit: "% 반도체 소재 공급 부족 (연구기관 가정)" },
    sources: [한경연_2019_수출규제],
    note: "실제 관측이 아니라 모의실험의 가정이다. 이후 학술 분석은 실제 반도체 산업 타격이 제한적이었다고 평가했다.",
  },
];

// 유형별 대표 충격: 사례가 하나면 그 값, 여럿이면 같은 단위끼리 중앙값. 사례가 없으면 null.
// Plan SC: 충격 수치가 없는 기사는 이 값을 쓰고 "과거 사례 기준"임을 화면에 표시한다.
export function typicalShock(
  type: IssueType,
): { shock: ShockBase; basedOn: string[]; sources: Source[] } | null {
  const cases = HISTORICAL_CASES.filter((c) => c.type === type);
  if (cases.length === 0) return null;

  const unit = cases[0].shock.unit;
  const sameUnit = cases.filter((c) => c.shock.unit === unit);
  const values = sameUnit.map((c) => c.shock.value).sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  const median = values.length % 2 === 1 ? values[mid] : (values[mid - 1] + values[mid]) / 2;

  return {
    shock: { value: median, unit },
    basedOn: sameUnit.map((c) => c.id),
    sources: sameUnit.flatMap((c) => c.sources),
  };
}
