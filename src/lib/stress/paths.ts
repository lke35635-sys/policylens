// Design Ref: §3.3 시점별 그래프 — 시나리오 하나(작음 / 중간 / 큼)의 변수별 "과거 실제 + 충격 이후 경로"를 만든다.
//
// 읽는 법 (값은 모두 "충격 시점의 값을 0으로 맞춘 변화량"이다)
// - 과거(충격 시점 이전): IMF 통계의 실제 월별 값. gdp·cpi·policyRate는 %p 차이, fx·kospi는 % 변화율.
// - 충격 시점(0개월)부터: 결과 표의 변동 범위에 도달하는 경로. 충격이 없었다면 변화 없음(0)으로 가정한다.
// Plan SC: 끝점(1년 뒤, 코스피는 1개월 뒤)의 값은 결과 표에서 나오고 근거가 있다. 중간 경로의 모양(직선)은 가정이다.
// Plan SC: 근거 자료가 없는 변수(표의 칸이 null)는 그리지 않는다.
import type { ChartAxis } from "./axis";
import { chartValue, midpoint } from "./calculate";
import { VARIABLE_KEYS, VARIABLE_META } from "./types";
import type { ObservedSeries, ScenarioKey, StressResult, VariableKey } from "./types";

export interface PastPoint {
  month: number; // 충격 시점 기준 달 수 (-36 ~ 0)
  value: number;
}

export interface FuturePoint {
  month: number; // 0 ~ 경로 끝 (1년이면 12, 코스피는 1)
  mid: number; // 선이 지나는 값 (범위의 가운데)
  min: number; // 음영의 아래쪽
  max: number; // 음영의 위쪽
}

export interface ScenarioPath {
  variable: VariableKey;
  legend: string;
  axis: ChartAxis;
  past: PastPoint[];
  future: FuturePoint[];
  horizon: number; // 경로가 끝나는 달 (12 또는 1)
}

// 그래프에서 %p 변수(기준금리 포함)는 왼쪽, % 변수(환율·코스피)는 오른쪽 축을 쓴다.
function axisOf(variable: VariableKey): ChartAxis {
  return VARIABLE_META[variable].unit === "%" ? "right" : "left";
}

function legendOf(variable: VariableKey): string {
  const { label, period } = VARIABLE_META[variable];
  if (variable === "policyRate") return `${label} (bp를 %p로 환산)`;
  return period === "1m" ? `${label} (충격 후 1개월까지)` : label;
}

// 기준 값 대비 변화량: 비율 변수(환율, 주가지수)는 % 변화율, 나머지는 %p 차이
function relativeTo(variable: VariableKey, value: number, base: number): number {
  return variable === "fx" || variable === "kospi" ? (value / base - 1) * 100 : value - base;
}

export function buildScenarioPaths(
  result: StressResult,
  scenario: ScenarioKey,
  observed: Record<VariableKey, ObservedSeries>,
): ScenarioPath[] {
  const paths: ScenarioPath[] = [];

  for (const variable of VARIABLE_KEYS) {
    const cell = result.scenarios[scenario][variable];
    if (cell === null) continue; // 근거 자료 없음: 그리지 않는다

    const points = observed[variable].points;
    const base = points[points.length - 1].value;
    const past: PastPoint[] = points.map((p, i) => ({
      month: i - (points.length - 1),
      value: relativeTo(variable, p.value, base),
    }));

    // 1년 값(표의 값)에 직선으로 도달한다. 코스피는 표가 1개월 값이라 1개월까지만 그린다.
    const horizon = cell.period === "1m" ? 1 : 12;
    const min = chartValue(variable, cell.min);
    const max = chartValue(variable, cell.max);
    const mid = chartValue(variable, midpoint(cell));
    const future: FuturePoint[] = [];
    for (let m = 0; m <= horizon; m += 1) {
      const fraction = m / horizon;
      future.push({ month: m, mid: mid * fraction, min: min * fraction, max: max * fraction });
    }

    paths.push({ variable, legend: legendOf(variable), axis: axisOf(variable), past, future, horizon });
  }

  return paths;
}

// 기준 월("2025-05")에서 offset개월 뒤의 달 이름 ("2026-05")
export function monthLabel(baseMonth: string, offset: number): string {
  const index = Number(baseMonth.slice(0, 4)) * 12 + (Number(baseMonth.slice(5, 7)) - 1) + offset;
  return `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, "0")}`;
}
