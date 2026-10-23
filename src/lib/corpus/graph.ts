// Design Ref: §4.2 그래프 값, §7 폴더 구조 lib/corpus/graph.ts — 저장된 통계에서 정책 최초 시행일 앞뒤 각 2년의 값을 골라 그래프용 자료를 만드는 순수 함수 (PLAN 14번).
// 값은 통계 파일의 값을 그대로 쓰고 계산하지 않는다. "뚜렷한 연관 없음" 판정도 개발 단계에 저장된 값(channel.assessment)을 그대로 전달할 뿐이다.
import type { Assessment, Channel, Policy, Series, Source } from "./types";

const WINDOW_MONTHS = 24; // 시행일 앞뒤 각 2년

export interface GraphSeries {
  id: string;
  name: string;
  unit: string;
  frequency: Series["frequency"];
  source: Source; // 출처(기관, 통계명, 조회일)
  latestPeriod: string; // 통계 기준일: 이 통계에 들어 있는 가장 최근 기간
  points: { period: string; month: number; value: number }[]; // month: 월 번호 (그래프 가로 위치)
}

export interface ChannelGraph {
  channelId: string;
  effectiveDate: string; // 정책 최초 시행일 (세로선)
  effectiveMonth: number;
  fromMonth: number; // 그래프 가로 범위 (시행일 앞 2년)
  toMonth: number; // (시행일 뒤 2년)
  series: GraphSeries[];
  assessment: Assessment | null;
}

export const monthNumber = (date: string): number => Number(date.slice(0, 4)) * 12 + (Number(date.slice(5, 7)) - 1);

// "2022-08" → 월 번호, "2022-Q3" → 그 분기 첫 달의 월 번호
export function periodMonthNumber(period: string): number {
  const m = /^(\d{4})-(\d{2})$/.exec(period);
  if (m) return Number(m[1]) * 12 + (Number(m[2]) - 1);
  const q = /^(\d{4})-Q([1-4])$/.exec(period);
  if (q) return Number(q[1]) * 12 + (Number(q[2]) - 1) * 3;
  throw new Error(`기간 모양을 알 수 없습니다: ${period}`);
}

// 경로 하나의 그래프 자료. 그래프가 없는 경로(연결 통계 2개 미만)는 null.
export function buildChannelGraph(channel: Channel, policy: Policy, seriesById: Map<string, Series>): ChannelGraph | null {
  if (!channel.chart) return null;
  const eff = monthNumber(policy.firstEffectiveDate);
  const from = eff - WINDOW_MONTHS;
  const to = eff + WINDOW_MONTHS;
  const series: GraphSeries[] = [];
  for (const id of channel.chart.seriesIds) {
    const s = seriesById.get(id);
    if (!s) return null;
    const points = s.points
      .map((p) => ({ period: p.period, month: periodMonthNumber(p.period), value: p.value }))
      .filter((p) => p.month >= from && p.month <= to);
    series.push({
      id: s.id,
      name: s.name,
      unit: s.unit,
      frequency: s.frequency,
      source: s.source,
      latestPeriod: s.points[s.points.length - 1].period,
      points,
    });
  }
  return { channelId: channel.id, effectiveDate: policy.firstEffectiveDate, effectiveMonth: eff, fromMonth: from, toMonth: to, series, assessment: channel.assessment ?? null };
}

// 해외 정책들의 모든 경로 그래프 자료를 한꺼번에 만든다 (서버에서 한 번 만들어 화면에 전달한다)
export function buildAllGraphs(policies: Policy[], plans: { foreignPolicyId: string; channels: Channel[] }[], series: Series[]): Record<string, ChannelGraph> {
  const byId = new Map(series.map((s) => [s.id, s]));
  const out: Record<string, ChannelGraph> = {};
  for (const plan of plans) {
    const policy = policies.find((p) => p.id === plan.foreignPolicyId);
    if (!policy) continue;
    for (const c of plan.channels) {
      const g = buildChannelGraph(c, policy, byId);
      if (g) out[c.id] = g;
    }
  }
  return out;
}

// 그래프 가로 눈금(해마다 1월)을 정한다
export function yearTicks(fromMonth: number, toMonth: number): { month: number; label: string }[] {
  const ticks: { month: number; label: string }[] = [];
  for (let y = Math.ceil(fromMonth / 12); y * 12 <= toMonth; y += 1) ticks.push({ month: y * 12, label: String(y) });
  return ticks;
}

// 세로축의 범위와 눈금: 값이 모두 들어가도록 약간 여유를 두고 눈금 간격은 1·2·2.5·5×10의 거듭제곱으로 정한다
export function valueAxis(values: number[]): { lo: number; hi: number; ticks: number[] } {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || Math.abs(max) || 1;
  const pad = span * 0.08;
  const rough = (span + 2 * pad) / 4;
  const base = 10 ** Math.floor(Math.log10(rough));
  const f = rough / base;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * base;
  const lo = Math.floor((min - pad) / step) * step;
  const hi = Math.ceil((max + pad) / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step * 1e-9; v += step) ticks.push(Number(v.toPrecision(12)));
  return { lo, hi, ticks };
}
