// Design Ref: §3.3 결과 카드 — 계산 결과를 화면에 보여 줄 글자로 바꾸는 순수 함수들 (화면 부품은 이 글자를 그대로 쓴다).
import type { Period, ScenarioValue, StressResult } from "./types";

// 소수점 셋째 자리까지만 보이고 뒤의 0은 뺀다. 양수에는 +를 붙인다. (-0은 0으로)
export function formatNumber(value: number): string {
  const text = String(Number(value.toFixed(3)));
  return value > 0 ? `+${text}` : text;
}

// 변동 범위를 "min ~ max단위"로 쓴다. 추정치가 하나뿐이면(min = max) 한 값만 쓴다.
export function formatRange(cell: Pick<ScenarioValue, "min" | "max" | "unit">): string {
  if (cell.min === cell.max) return `${formatNumber(cell.min)}${cell.unit}`;
  return `${formatNumber(cell.min)} ~ ${formatNumber(cell.max)}${cell.unit}`;
}

export function formatPeriod(period: Period): string {
  return period === "1y" ? "충격 후 1년 누적" : "향후 1개월";
}

// 충격 크기를 "+20% 국제 유가 상승"처럼 쓴다. 단위의 맨 앞 단어(%, bp, %p)를 숫자 바로 뒤에 붙인다.
export function formatShock(shock: { value: number; unit: string }): string {
  const [head, ...rest] = shock.unit.trim().split(/\s+/);
  return `${formatNumber(shock.value)}${head}${rest.length > 0 ? ` ${rest.join(" ")}` : ""}`;
}

// 충격 크기가 어디서 왔는지 (기사 기준 / 과거 사례 기준)
export function formatShockSource(shock: NonNullable<StressResult["shock"]>): string {
  if (shock.source === "article") return "기사 기준";
  const refs = (shock.historyRefs ?? []).map((r) => `${r.report}, ${r.year}년`).join(" / ");
  return refs === "" ? "과거 사례 기준" : `과거 사례 기준: ${refs}`;
}
