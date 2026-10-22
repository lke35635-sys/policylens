// Design Ref: §3.1 ⑤ 결과 영역 — PLAN 5·7번: 실제 분석을 연결하기 전에 결과 화면을 눈으로 확인하는 샘플.
// 이슈 제목과 요약 문장은 가상의 예시다. 수치는 실제 계수 표와 계산 함수에서 나온다.
// 한 기사에서 이슈 9개(상한)를 찾았다고 보고, 3개씩 보여 주는 흐름(PLAN 7번)을 확인할 수 있게 9개를 둔다.
// 실제 분석 결과가 연결되면(PLAN 13번) 이 파일은 지운다.
import { calculateStressTest } from "./calculate";
import { COEFFICIENTS } from "./coefficients";
import { typicalShock } from "./history";
import type { IssueType, ShockBase, StressResult } from "./types";

export const SAMPLE_NOTICE =
  "아래는 화면 확인용 샘플입니다. 실제 기사를 분석한 결과가 아니며, 이슈 제목과 요약 문장은 가상의 예시입니다.";

interface SampleSource {
  title: string;
  summary: string; // 실제로는 300자 이내 AI 요약 (PRD 5번)
  type: IssueType;
  approximate: boolean; // 정확히 맞는 유형이 아니라 가까운 유형으로 연결한 경우
  shock: ShockBase | null; // null = 기사에 충격 수치가 없는 경우
}

export interface SampleIssue extends SampleSource {
  result: StressResult;
}

// 기사에 나온 순서대로 9개. 앞의 세 개는 서로 다른 상태를 한 번에 보여 준다.
// 1) 기사에 충격 수치가 있고, 일부 변수는 근거 자료가 없는 경우
// 2) 충격 수치가 없어 과거 사례 값을 쓰고, 가까운 유형이라 "근사치"인 경우
// 3) 충격 수치도 과거 사례도 없어 계산하지 못하는 경우
const SOURCES: SampleSource[] = [
  {
    title: "국제 유가 급등 (샘플)",
    summary:
      "중동 정세 불안으로 국제 유가가 한 달 새 20% 넘게 올랐다는 내용이다. 수입 에너지 비중이 큰 국내 물가와 성장에 부담이 될 수 있다는 분석이 함께 소개됐다.",
    type: "oil",
    approximate: false,
    shock: { value: 20, unit: "% 국제 유가 상승" },
  },
  {
    title: "첨단 반도체 장비 수출 통제 확대 (샘플)",
    summary:
      "주요국이 첨단 반도체 장비의 수출 통제를 넓힌다는 소식이다. 기사에는 구체적인 감소 규모가 없고, 국내 반도체 생산에 미칠 영향이 불확실하다고 전한다.",
    type: "exportControl",
    approximate: true,
    shock: null,
  },
  {
    title: "글로벌 해운 물류 차질 (샘플)",
    summary:
      "주요 항로의 운항이 막혀 해운 운임이 급등했다는 내용이다. 수입 원자재의 도착이 늦어질 수 있다고 하지만 가격 변동의 크기는 밝히지 않았다.",
    type: "commoditySupply",
    approximate: true,
    shock: null,
  },
  {
    title: "미 연준의 추가 금리 인상 시사 (샘플)",
    summary:
      "연준이 물가 안정을 위해 연말까지 기준금리를 2%p가량 더 올릴 수 있다고 밝혔다는 내용이다. 한국 금융시장에서 자금이 빠져나갈 수 있다는 우려가 함께 나왔다.",
    type: "policyRate",
    approximate: false,
    shock: { value: 200, unit: "bp 연준 기준금리 추가 인상폭" },
  },
  {
    title: "원/달러 환율 급등 (샘플)",
    summary:
      "달러 강세가 이어지면서 원/달러 환율이 한 달 사이 8% 올랐다는 소식이다. 수입 물가가 오르면서 소비자물가에 부담이 될 수 있다는 전망이 나왔다.",
    type: "fx",
    approximate: false,
    shock: { value: 8, unit: "% 원/달러 환율 상승" },
  },
  {
    title: "세계 경기 둔화 우려 (샘플)",
    summary:
      "국제기구가 세계 경제성장률 전망을 1%p 낮췄다는 내용이다. 수출 비중이 큰 한국 경제에도 하방 압력이 될 수 있다는 분석이 함께 소개됐다.",
    type: "globalSlowdown",
    approximate: false,
    shock: { value: 1, unit: "%p 세계 경제성장률 하락" },
  },
  {
    title: "국제 원자재 가격 상승 (샘플)",
    summary:
      "곡물과 금속을 포함한 국제 원자재 가격이 석 달 새 15% 올랐다는 소식이다. 수입 비용이 늘어 국내 물가를 밀어 올릴 수 있다는 관측이 나왔다.",
    type: "commoditySupply",
    approximate: false,
    shock: { value: 15, unit: "% 국제 원자재 가격 상승" },
  },
  {
    title: "반도체 핵심 소재 공급 불안 (샘플)",
    summary:
      "핵심 소재의 공급이 45%가량 부족해질 수 있다는 업계 전망이 나왔다. 정확히 같은 사례는 아니지만 수출 규제로 인한 소재 부족과 비슷한 상황으로 보인다.",
    type: "exportControl",
    approximate: true,
    shock: { value: 45, unit: "% 반도체 소재 공급 부족" },
  },
  {
    title: "에너지 가격의 불안정한 움직임 (샘플)",
    summary:
      "에너지 가격이 크게 흔들리고 있다는 내용이지만 기사에는 구체적인 상승 폭이 없다. 국제 유가 급등과 비슷한 상황으로 보고 과거 사례의 충격 크기를 가져다 쓴다.",
    type: "oil",
    approximate: true,
    shock: null,
  },
];

export function getSampleIssues(): SampleIssue[] {
  const tables = { coefficients: COEFFICIENTS, typicalShock };
  return SOURCES.map((source) => ({
    ...source,
    result: calculateStressTest({ type: source.type, shock: source.shock }, tables),
  }));
}
