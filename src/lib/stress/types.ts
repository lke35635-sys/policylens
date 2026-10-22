// Design Ref: §4.5 — 스트레스 테스트 계산에 쓰는 데이터 모양을 한곳에 모은다.
// 이 파일은 AI·화면과 무관한 순수 정의만 담는다 (§6 lib/stress).

// 결과로 보여 주는 거시 변수 5개
export const VARIABLE_KEYS = ["gdp", "cpi", "fx", "policyRate", "kospi"] as const;
export type VariableKey = (typeof VARIABLE_KEYS)[number];

// 이슈 기본 유형 6개 (PRD 6번)
export const ISSUE_TYPES = [
  "oil",
  "policyRate",
  "fx",
  "exportControl",
  "commoditySupply",
  "globalSlowdown",
] as const;
export type IssueType = (typeof ISSUE_TYPES)[number];

// 예측 기간: 1y = 충격 후 1년 누적, 1m = 향후 1개월 변동률
export type Period = "1y" | "1m";

export interface VariableMeta {
  label: string;
  unit: string; // 표에 적는 단위 (기준금리는 bp, 그래프에서만 %p로 환산한다)
  period: Period;
}

// Plan SC: 변수 5개와 단위·기간이 PRD 3번과 같아야 한다.
export const VARIABLE_META: Record<VariableKey, VariableMeta> = {
  gdp: { label: "GDP 성장률", unit: "%p", period: "1y" },
  cpi: { label: "소비자물가", unit: "%p", period: "1y" },
  fx: { label: "원/달러 환율", unit: "%", period: "1y" },
  policyRate: { label: "기준금리", unit: "bp", period: "1y" },
  kospi: { label: "코스피", unit: "%", period: "1m" },
};

export const ISSUE_TYPE_LABEL: Record<IssueType, string> = {
  oil: "국제 유가",
  policyRate: "기준금리",
  fx: "환율",
  exportControl: "수출 규제",
  commoditySupply: "원자재·공급망",
  globalSlowdown: "글로벌 경기 둔화",
};

// 출처 한 건. 모든 수치에 이 정보가 붙어야 한다 (근거 표시 100%).
export interface Source {
  institution: string; // 발표 기관 (예: 한국은행)
  title: string; // 보고서 또는 보도 제목
  date: string; // 발표일 또는 보도일 (YYYY-MM-DD, 일자를 모르면 YYYY-MM)
  url: string;
  via: string; // 확인한 경로 (예: 경향신문 보도). 보고서 원문을 직접 본 것이 아니면 반드시 적는다.
}

// 기준 충격: "충격이 이만큼일 때" 아래 영향이 나온다는 뜻
export interface ShockBase {
  value: number;
  unit: string; // 예: "% 국제 유가 상승"
}

// 계수 표의 칸 하나 (유형 × 변수)
export type Coefficient =
  | {
      // 출처를 찾지 못한 칸. 숫자를 만들어 채우지 않고 비워 둔다.
      status: "pending";
      note: string;
    }
  | {
      status: "sourced";
      min: number; // 기준 충격일 때 변동 범위 (min ≤ max)
      max: number;
      per: ShockBase;
      period: Period;
      sources: Source[];
      assumption: string; // 계산에 쓴 가정 (결과 화면의 "근거와 가정")
      singleEstimate?: boolean; // 추정치가 하나뿐이라 min과 max가 같다
    };

// 과거 유사 사례 한 건 (기사에 충격 수치가 없을 때 대신 쓰는 값의 근거)
export interface HistoricalCase {
  id: string;
  type: IssueType;
  name: string;
  date: string;
  // observed = 실제로 있었던 일, scenario = 연구기관이 가정한 시나리오
  kind: "observed" | "scenario";
  shock: ShockBase;
  // 그 사례에서 실제로 관측된 변수 반응 (방향 일치율 검증에 쓴다)
  observed?: Partial<Record<VariableKey, { value: number; unit: string; note: string }>>;
  sources: Source[];
  note?: string;
}
