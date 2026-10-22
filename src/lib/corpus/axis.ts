// Design Ref: §3.4 시계열 그래프, §7 폴더 구조 lib/corpus/axis.ts — 세로축 범위와 눈금을 정하는 순수 함수들.
// 이전 주제(MacroLens)의 그래프 코드를 옮겨 온 것이다. 왼쪽 축은 %p 단위 지표, 오른쪽 축은 % 단위 지표이고 두 축의 0은 같은 높이에 둔다.
// 새 주제의 지표 단위에 맞게 다듬는 일은 PLAN 14번에서 한다.

export type ChartAxis = "left" | "right";

// 축 맨 위에 적는 단위
export const AXIS_UNIT: Record<ChartAxis, string> = { left: "%p", right: "%" };

// 눈금 간격을 1, 2, 2.5, 5 × 10의 거듭제곱 가운데 가장 가까운 큰 값으로 정한다.
export function niceStep(rough: number): number {
  if (!(rough > 0) || !Number.isFinite(rough)) return 1;
  const base = 10 ** Math.floor(Math.log10(rough));
  const f = rough / base;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * base;
}

export interface AxisDomain {
  lo: number;
  hi: number;
  ticks: number[];
}

// 값들을 모두 담고 0이 항상 안쪽에 오도록 위아래에 여유를 둔 범위
function paddedRange(values: number[]): { lo: number; hi: number } {
  const lo0 = Math.min(0, ...values);
  const hi0 = Math.max(0, ...values);
  const pad = (hi0 - lo0 || 1) * 0.1;
  return { lo: lo0 - pad, hi: hi0 + pad };
}

function ticksOf(lo: number, hi: number): number[] {
  const step = niceStep((hi - lo) / 14);
  const ticks: number[] = [];
  for (let i = Math.ceil(lo / step - 1e-9); i <= Math.floor(hi / step + 1e-9); i += 1) {
    ticks.push(Number((i * step).toFixed(10)) + 0); // +0은 -0을 0으로 바꾼다
  }
  return ticks;
}

// 왼쪽·오른쪽 축의 범위를 정한다. 두 축의 0이 같은 높이에 오도록 맞춰서, 0선 하나로 읽을 수 있게 한다.
export function alignedDomains(
  leftValues: number[],
  rightValues: number[],
): { left: AxisDomain | null; right: AxisDomain | null } {
  const ranges = {
    left: leftValues.length > 0 ? paddedRange(leftValues) : null,
    right: rightValues.length > 0 ? paddedRange(rightValues) : null,
  };

  const zeroFraction = (r: { lo: number; hi: number }) => -r.lo / (r.hi - r.lo);
  const fractions = [ranges.left, ranges.right].filter((r) => r !== null).map(zeroFraction);
  const target = Math.max(...fractions);

  const finish = (r: { lo: number; hi: number } | null): AxisDomain | null => {
    if (r === null) return null;
    // 0의 높이가 목표보다 낮으면 아래쪽을 늘려서 올린다
    const lo = zeroFraction(r) < target - 1e-12 ? (-r.hi * target) / (1 - target) : r.lo;
    return { lo, hi: r.hi, ticks: ticksOf(lo, r.hi) };
  };

  return { left: finish(ranges.left), right: finish(ranges.right) };
}
