// Design Ref: §3.3 시점별 그래프 (PLAN 6번) — 시나리오 하나(작음 / 중간 / 큼)의 "과거 실제 + 충격 이후 경로" 꺾은선 그래프.
// - 가로축은 시간: 충격 36개월 전 ~ 충격 12개월 후. 충격 시점(0개월)에 세로 점선.
// - 세로축은 충격 시점의 값을 0으로 맞춘 변화량: 왼쪽 %p(GDP·소비자물가·기준금리), 오른쪽 %(환율·코스피). 두 축의 0은 같은 높이.
// - 충격 이전: 실제 월별 통계(가는 선). 충격 이후: 표의 변동 범위에 도달하는 경로(굵은 선 = 범위의 가운데 값, 음영 = 최소~최대).
// - 근거 자료가 없는 변수는 그리지 않는다. 추가 도구 없이 SVG로 직접 그린다.
// 값 계산은 lib/stress/paths.ts, 축 계산은 lib/stress/axis.ts에 있고 여기서는 그리기만 한다.
import { alignedDomains, AXIS_UNIT } from "@/lib/stress/axis";
import type { ChartAxis } from "@/lib/stress/axis";
import { formatNumber, formatRange } from "@/lib/stress/format";
import { OBSERVED_META, OBSERVED_SERIES } from "@/lib/stress/observed-series";
import { buildScenarioPaths, monthLabel } from "@/lib/stress/paths";
import type { ScenarioPath } from "@/lib/stress/paths";
import { SCENARIO_LABEL, SCENARIO_MULTIPLIERS, VARIABLE_META } from "@/lib/stress/types";
import type { ScenarioKey, StressResult, VariableKey } from "@/lib/stress/types";

const WIDTH = 720;
const HEIGHT = 360;
const MARGIN = { top: 34, bottom: 52, left: 64 };
const PAST_MONTHS = OBSERVED_META.pastMonths; // 36
const FUTURE_MONTHS = 12;

type Shape = "circle" | "square" | "diamond" | "triangle" | "cross";

// 색만으로 구분하지 않도록 변수마다 끝점 모양도 다르게 한다
const STYLE: Record<VariableKey, { stroke: string; fill: string; band: string; shape: Shape }> = {
  gdp: {
    stroke: "stroke-blue-600 dark:stroke-blue-400",
    fill: "fill-blue-600 dark:fill-blue-400",
    band: "fill-blue-600/20 dark:fill-blue-400/20",
    shape: "circle",
  },
  cpi: {
    stroke: "stroke-orange-600 dark:stroke-orange-400",
    fill: "fill-orange-600 dark:fill-orange-400",
    band: "fill-orange-600/20 dark:fill-orange-400/20",
    shape: "square",
  },
  policyRate: {
    stroke: "stroke-violet-600 dark:stroke-violet-400",
    fill: "fill-violet-600 dark:fill-violet-400",
    band: "fill-violet-600/20 dark:fill-violet-400/20",
    shape: "diamond",
  },
  fx: {
    stroke: "stroke-emerald-600 dark:stroke-emerald-400",
    fill: "fill-emerald-600 dark:fill-emerald-400",
    band: "fill-emerald-600/20 dark:fill-emerald-400/20",
    shape: "triangle",
  },
  kospi: {
    stroke: "stroke-rose-600 dark:stroke-rose-400",
    fill: "fill-rose-600 dark:fill-rose-400",
    band: "fill-rose-600/20 dark:fill-rose-400/20",
    shape: "cross",
  },
};

function Marker({ variable, x, y }: { variable: VariableKey; x: number; y: number }) {
  const { shape, fill, stroke } = STYLE[variable];
  const r = 5;
  switch (shape) {
    case "circle":
      return <circle cx={x} cy={y} r={r} className={fill} />;
    case "square":
      return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} className={fill} />;
    case "diamond":
      return <polygon points={`${x},${y - r - 1} ${x + r + 1},${y} ${x},${y + r + 1} ${x - r - 1},${y}`} className={fill} />;
    case "triangle":
      return <polygon points={`${x},${y - r - 1} ${x + r + 1},${y + r} ${x - r - 1},${y + r}`} className={fill} />;
    case "cross":
      return (
        <path
          d={`M${x - r},${y - r}L${x + r},${y + r}M${x - r},${y + r}L${x + r},${y - r}`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          className={stroke}
        />
      );
  }
}

const valuesOf = (paths: ScenarioPath[], axis: ChartAxis): number[] =>
  paths
    .filter((p) => p.axis === axis)
    .flatMap((p) => [...p.past.map((q) => q.value), ...p.future.flatMap((q) => [q.mid, q.min, q.max])]);

interface ScenarioPathChartProps {
  id: string; // 화면 안에서 겹치지 않는 이름 (접근성 연결용)
  scenario: ScenarioKey;
  result: StressResult;
}

export function ScenarioPathChart({ id, scenario, result }: ScenarioPathChartProps) {
  const paths = buildScenarioPaths(result, scenario, OBSERVED_SERIES);
  if (paths.length === 0) return null; // 그릴 변수가 하나도 없으면 그래프를 만들지 않는다

  const domains = alignedDomains(valuesOf(paths, "left"), valuesOf(paths, "right"));
  const gridAxis: ChartAxis = domains.left ? "left" : "right";
  const hasRight = domains.right !== null;

  const left = MARGIN.left;
  const right = hasRight ? 64 : 24;
  const innerWidth = WIDTH - left - right;
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const span = PAST_MONTHS + FUTURE_MONTHS;

  const xAt = (month: number) => left + (innerWidth * (month + PAST_MONTHS)) / span;
  const yAt = (axis: ChartAxis, value: number) => {
    const d = domains[axis]!;
    return MARGIN.top + innerHeight * (1 - (value - d.lo) / (d.hi - d.lo));
  };

  const description = paths
    .map((p) => `${p.legend}: 충격 후 ${p.horizon}개월 가운데 ${formatNumber(p.future[p.future.length - 1].mid)}`)
    .join(". ");
  const xTicks = [-36, -24, -12, 0, 12];

  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="text-base font-semibold">
        {SCENARIO_LABEL[scenario]}{" "}
        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">(충격 ×{SCENARIO_MULTIPLIERS[scenario]})</span>
      </figcaption>

      {/* 좁은 화면에서는 글자가 너무 작아지지 않도록 그래프만 가로 스크롤을 허용한다 */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="h-auto w-full min-w-[40rem]"
        >
          <title id={`${id}-title`}>{`${SCENARIO_LABEL[scenario]} 시나리오: 과거 실제와 충격 이후 경로 꺾은선 그래프`}</title>
          <desc id={`${id}-desc`}>{description}</desc>

          {/* 충격 이후 구간 배경 */}
          <rect
            x={xAt(0)}
            y={MARGIN.top}
            width={xAt(FUTURE_MONTHS) - xAt(0)}
            height={innerHeight}
            className="fill-zinc-100 dark:fill-zinc-900"
          />

          {/* 눈금선과 0선 (두 축의 0은 같은 높이) */}
          {domains[gridAxis]!.ticks.map((tick) => (
            <line
              key={tick}
              x1={left}
              x2={WIDTH - right}
              y1={yAt(gridAxis, tick)}
              y2={yAt(gridAxis, tick)}
              className={tick === 0 ? "stroke-zinc-500 dark:stroke-zinc-400" : "stroke-zinc-200 dark:stroke-zinc-800"}
              strokeWidth={tick === 0 ? 1.5 : 1}
            />
          ))}

          {/* 세로축 눈금 글자와 단위 */}
          {domains.left?.ticks.map((tick) => (
            <text key={`l${tick}`} x={left - 8} y={yAt("left", tick) + 4} textAnchor="end" fontSize={12} className="fill-zinc-600 dark:fill-zinc-400">
              {formatNumber(tick)}
            </text>
          ))}
          {domains.left && (
            <text x={left - 8} y={MARGIN.top - 14} textAnchor="end" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
              {AXIS_UNIT.left}
            </text>
          )}
          {domains.right?.ticks.map((tick) => (
            <text key={`r${tick}`} x={WIDTH - right + 8} y={yAt("right", tick) + 4} textAnchor="start" fontSize={12} className="fill-zinc-600 dark:fill-zinc-400">
              {formatNumber(tick)}
            </text>
          ))}
          {domains.right && (
            <text x={WIDTH - right + 8} y={MARGIN.top - 14} textAnchor="start" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
              {AXIS_UNIT.right}
            </text>
          )}

          {/* 가로축: 달 이름 */}
          {xTicks.map((month) => (
            <g key={month}>
              <line x1={xAt(month)} x2={xAt(month)} y1={HEIGHT - MARGIN.bottom} y2={HEIGHT - MARGIN.bottom + 5} className="stroke-zinc-500 dark:stroke-zinc-400" />
              <text x={xAt(month)} y={HEIGHT - MARGIN.bottom + 20} textAnchor="middle" fontSize={12} className="fill-zinc-700 dark:fill-zinc-300">
                {monthLabel(OBSERVED_META.baseMonth, month)}
              </text>
            </g>
          ))}
          <text x={xAt(-18)} y={HEIGHT - 10} textAnchor="middle" fontSize={12} className="fill-zinc-500 dark:fill-zinc-400">
            과거 실제
          </text>
          <text x={xAt(6)} y={HEIGHT - 10} textAnchor="middle" fontSize={12} className="fill-zinc-500 dark:fill-zinc-400">
            충격 이후 (가정된 경로)
          </text>

          {/* 충격 시점 */}
          <line x1={xAt(0)} x2={xAt(0)} y1={MARGIN.top} y2={HEIGHT - MARGIN.bottom} strokeDasharray="5 4" strokeWidth={1.5} className="stroke-zinc-700 dark:stroke-zinc-300" />
          <text x={xAt(0)} y={MARGIN.top - 10} textAnchor="middle" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
            충격 시점 ({OBSERVED_META.baseMonth})
          </text>

          {/* 범위 음영 → 과거 선 → 충격 이후 선 → 끝점 순서로 그려서 끝점이 맨 위에 보이게 한다 */}
          {paths.map((p) => {
            if (!p.future.some((q) => q.min !== q.max)) return null;
            const upper = p.future.map((q) => `${xAt(q.month)},${yAt(p.axis, q.max)}`);
            const lower = p.future.map((q) => `${xAt(q.month)},${yAt(p.axis, q.min)}`).reverse();
            return <polygon key={`band-${p.variable}`} points={[...upper, ...lower].join(" ")} className={STYLE[p.variable].band} />;
          })}
          {paths.map((p) => (
            <polyline
              key={`past-${p.variable}`}
              points={p.past.map((q) => `${xAt(q.month)},${yAt(p.axis, q.value)}`).join(" ")}
              fill="none"
              strokeWidth={1.75}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={STYLE[p.variable].stroke}
            />
          ))}
          {paths.map((p) => (
            <polyline
              key={`future-${p.variable}`}
              points={p.future.map((q) => `${xAt(q.month)},${yAt(p.axis, q.mid)}`).join(" ")}
              fill="none"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={STYLE[p.variable].stroke}
            />
          ))}
          {paths.map((p) => {
            const end = p.future[p.future.length - 1];
            return (
              <g key={`end-${p.variable}`}>
                {/* 끝점에 마우스를 올리면 결과 표와 같은 범위를 보여 준다 */}
                <title>{`${p.legend} · 충격 후 ${p.horizon}개월: ${formatRange(result.scenarios[scenario][p.variable]!)}`}</title>
                <Marker variable={p.variable} x={xAt(end.month)} y={yAt(p.axis, end.mid)} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 범례: 색과 끝점 모양, 어느 축을 읽는지 */}
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
        {paths.map((p) => (
          <li key={p.variable} className="flex items-center gap-2">
            <svg width={28} height={14} aria-hidden="true">
              <line x1={0} x2={28} y1={7} y2={7} strokeWidth={3} className={STYLE[p.variable].stroke} />
              <Marker variable={p.variable} x={14} y={7} />
            </svg>
            <span>
              {p.legend}
              <span className="text-zinc-500 dark:text-zinc-400"> ({p.axis === "left" ? "왼쪽" : "오른쪽"} 축, {p.axis === "left" ? "%p" : "%"})</span>
              <span className="sr-only"> {VARIABLE_META[p.variable].label}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
