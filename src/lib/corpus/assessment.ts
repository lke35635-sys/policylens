// Design Ref: §5 Assessment, PRD 4번 "뚜렷한 연관 없음" 판정 — 개발 단계에 판정 값을 계산하는 순수 함수 (PLAN 10번).
// 계산식(PRD): 변화 = 시행월 직전 12개월 평균과 직후 12개월 평균의 차이의 절댓값, 표준편차 = 시행월 이전 10년(120개월) 월별 값의 표준편차.
// 변화가 표준편차 이내이면 "뚜렷한 연관이 보이지 않았다"(unclear = true). 화면은 저장된 값만 보여 주고 여기서 계산하지 않는다.
// 정하는 방식: 시행월 자체는 직전·직후 어느 쪽에도 넣지 않는다. 분기 통계는 분기 시작 달로 보며(4개 분기 = 12개월) 같은 창을 쓴다.
// 표준편차는 표본 표준편차(n-1)다. 시행일 이전 통계가 10년이 안 되면 있는 기간만 쓰고 그 기간을 stdevPeriod에 적는다 (12개 이상 필요).
import type { Assessment, Series } from "./types";

const WINDOW = 12; // 직전·직후 12개월
const HISTORY = 120; // 표준편차 기간 10년
const MIN_HISTORY = 12;

const monthIndex = (date: string): number => Number(date.slice(0, 4)) * 12 + (Number(date.slice(5, 7)) - 1);

function periodIndex(period: string): number {
  const m = /^(\d{4})-(\d{2})$/.exec(period);
  if (m) return Number(m[1]) * 12 + (Number(m[2]) - 1);
  const q = /^(\d{4})-Q([1-4])$/.exec(period);
  if (q) return Number(q[1]) * 12 + (Number(q[2]) - 1) * 3;
  throw new Error(`기간 모양을 알 수 없습니다: ${period}`);
}

const mean = (v: number[]): number => v.reduce((s, x) => s + x, 0) / v.length;

function sampleStdev(v: number[]): number {
  const m = mean(v);
  return Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length - 1));
}

const round6 = (x: number): number => Math.round(x * 1e6) / 1e6;

// 판정을 계산한다. 시행 전후 12개월이나 이전 통계가 모자라면 null (판정을 두지 않는다).
export function computeAssessment(series: Series, effectiveDate: string, computedAt: string): Assessment | null {
  const eff = monthIndex(effectiveDate);
  const perWindow = series.frequency === "monthly" ? WINDOW : WINDOW / 3;
  const items = series.points.map((p) => ({ idx: periodIndex(p.period), period: p.period, value: p.value }));
  const before = items.filter((p) => p.idx >= eff - WINDOW && p.idx <= eff - 1);
  const after = items.filter((p) => p.idx >= eff + 1 && p.idx <= eff + WINDOW);
  if (before.length !== perWindow || after.length !== perWindow) return null;
  const history = items.filter((p) => p.idx >= eff - HISTORY && p.idx <= eff - 1);
  const need = series.frequency === "monthly" ? MIN_HISTORY : MIN_HISTORY / 3;
  if (history.length < need) return null;
  const change = round6(Math.abs(mean(after.map((p) => p.value)) - mean(before.map((p) => p.value))));
  const stdev = round6(sampleStdev(history.map((p) => p.value)));
  return {
    seriesId: series.id,
    unclear: change <= stdev,
    change,
    stdev,
    stdevPeriod: `${history[0].period} ~ ${history[history.length - 1].period}`,
    computedAt,
  };
}
