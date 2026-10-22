// Design Ref: §3.3 시점별 그래프 (PLAN 6번) — 시나리오 하나(작음 / 중간 / 큼)의 "과거 실제 + 충격 이후 경로" 꺾은선 그래프.
// 충격 12개월 전 ~ 충격 12개월 후를 한 장에 그린다. 충격 시점(0개월)에 세로 점선, 3개월마다 세로 눈금선.
// 충격 이후 선은 약 1주(0.25개월) 간격으로 나눈 점을 잇고, 3개월마다 점을 찍어 시점별 값을 읽을 수 있게 한다.
// 세 시나리오가 같은 눈금이라 크기를 비교할 수 있다.
// - 세로축은 충격 시점의 값을 0으로 맞춘 변화량: 왼쪽 %p(GDP·소비자물가·기준금리), 오른쪽 %(환율·코스피). 두 축의 0은 같은 높이.
// - 충격 이전: 실제 월별 통계(가는 선). 충격 이후: 표의 변동 범위에 도달하는 경로(굵은 선 = 범위의 가운데 값, 음영 = 최소~최대).
// - 근거 자료가 없는 변수는 그리지 않는다. 추가 도구 없이 SVG로 직접 그린다.
// 값 계산은 lib/stress/paths.ts, 축 계산은 lib/stress/axis.ts에 있고 여기서는 그리기만 한다.
import { AXIS_UNIT } from "@/lib/stress/axis";
import type { AxisDomain, ChartAxis } from "@/lib/stress/axis";
import { formatNumber, formatRange } from "@/lib/stress/format";
import { OBSERVED_META } from "@/lib/stress/observed-series";
import { monthLabel } from "@/lib/stress/paths";
import type { ScenarioPath } from "@/lib/stress/paths";
import { SCENARIO_LABEL, SCENARIO_MULTIPLIERS } from "@/lib/stress/types";
import type { ScenarioKey, StressResult, VariableKey } from "@/lib/stress/types";

const WIDTH = 720;
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

interface Domains {
  left: AxisDomain | null;
  right: AxisDomain | null;
}

interface PathSvgProps {
  id: string;
  title: string;
  description: string;
  scenario: ScenarioKey;
  result: StressResult;
  paths: ScenarioPath[];
  domains: Domains;
  fromMonth: number; // 가로축의 왼쪽 끝 (전체는 -12, 확대는 0)
  height: number;
  xTicks: number[];
  caption: { left?: string; right: string }; // 가로축 아래 설명 글자
}

// 그래프 한 장을 그린다. 전체 그래프와 충격 이후 확대 그래프가 같은 코드를 쓴다.
function PathSvg({ id, title, description, scenario, result, paths, domains, fromMonth, height, xTicks, caption }: PathSvgProps) {
  const showPast = fromMonth < 0;
  const gridAxis: ChartAxis = domains.left ? "left" : "right";
  const hasRight = domains.right !== null;

  const margin = { top: 34, bottom: 52, left: 64, right: hasRight ? 64 : 40 }; // 오른쪽 끝 달 이름이 잘리지 않을 여백
  const innerWidth = WIDTH - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xAt = (month: number) => margin.left + (innerWidth * (month - fromMonth)) / (FUTURE_MONTHS - fromMonth);
  const yAt = (axis: ChartAxis, value: number) => {
    const d = domains[axis]!;
    return margin.top + innerHeight * (1 - (value - d.lo) / (d.hi - d.lo));
  };
  const plotBottom = height - margin.bottom;

  return (
    // 좁은 화면에서는 글자가 너무 작아지지 않도록 그래프만 가로 스크롤을 허용한다
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="h-auto w-full min-w-[36rem]"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>

        {/* 충격 이후 구간 배경 */}
        <rect x={xAt(0)} y={margin.top} width={xAt(FUTURE_MONTHS) - xAt(0)} height={innerHeight} className="fill-zinc-100 dark:fill-zinc-900" />

        {/* 가로 3개월 간격 세로 눈금선 */}
        {xTicks.map((month) => (
          <line key={`v${month}`} x1={xAt(month)} x2={xAt(month)} y1={margin.top} y2={plotBottom} className="stroke-zinc-200 dark:stroke-zinc-800" />
        ))}

        {/* 눈금선과 0선 (두 축의 0은 같은 높이) */}
        {domains[gridAxis]!.ticks.map((tick) => (
          <line
            key={tick}
            x1={margin.left}
            x2={WIDTH - margin.right}
            y1={yAt(gridAxis, tick)}
            y2={yAt(gridAxis, tick)}
            className={tick === 0 ? "stroke-zinc-500 dark:stroke-zinc-400" : "stroke-zinc-200 dark:stroke-zinc-800"}
            strokeWidth={tick === 0 ? 1.5 : 1}
          />
        ))}

        {/* 세로축 눈금 글자와 단위 */}
        {domains.left?.ticks.map((tick) => (
          <text key={`l${tick}`} x={margin.left - 8} y={yAt("left", tick) + 4} textAnchor="end" fontSize={12} className="fill-zinc-600 dark:fill-zinc-400">
            {formatNumber(tick)}
          </text>
        ))}
        {domains.left && (
          <text x={margin.left - 8} y={margin.top - 14} textAnchor="end" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
            {AXIS_UNIT.left}
          </text>
        )}
        {domains.right?.ticks.map((tick) => (
          <text key={`r${tick}`} x={WIDTH - margin.right + 8} y={yAt("right", tick) + 4} textAnchor="start" fontSize={12} className="fill-zinc-600 dark:fill-zinc-400">
            {formatNumber(tick)}
          </text>
        ))}
        {domains.right && (
          <text x={WIDTH - margin.right + 8} y={margin.top - 14} textAnchor="start" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
            {AXIS_UNIT.right}
          </text>
        )}

        {/* 가로축: 달 이름 */}
        {xTicks.map((month) => (
          <g key={month}>
            <line x1={xAt(month)} x2={xAt(month)} y1={plotBottom} y2={plotBottom + 5} className="stroke-zinc-500 dark:stroke-zinc-400" />
            <text x={xAt(month)} y={plotBottom + 20} textAnchor="middle" fontSize={12} className="fill-zinc-700 dark:fill-zinc-300">
              {monthLabel(OBSERVED_META.baseMonth, month)}
            </text>
          </g>
        ))}
        {caption.left && (
          <text x={xAt(fromMonth / 2)} y={height - 10} textAnchor="middle" fontSize={12} className="fill-zinc-500 dark:fill-zinc-400">
            {caption.left}
          </text>
        )}
        <text x={xAt(FUTURE_MONTHS / 2)} y={height - 10} textAnchor="middle" fontSize={12} className="fill-zinc-500 dark:fill-zinc-400">
          {caption.right}
        </text>

        {/* 충격 시점 */}
        {showPast && (
          <>
            <line x1={xAt(0)} x2={xAt(0)} y1={margin.top} y2={plotBottom} strokeDasharray="5 4" strokeWidth={1.5} className="stroke-zinc-700 dark:stroke-zinc-300" />
            <text x={xAt(0)} y={margin.top - 10} textAnchor="middle" fontSize={12} fontWeight={600} className="fill-zinc-700 dark:fill-zinc-300">
              충격 시점 ({OBSERVED_META.baseMonth})
            </text>
          </>
        )}

        {/* 범위 음영 → 과거 선 → 충격 이후 선 → 끝점 → 끝 수치 순서로 그려서 끝점과 수치가 맨 위에 보이게 한다 */}
        {paths.map((p) => {
          if (!p.future.some((q) => q.min !== q.max)) return null;
          const upper = p.future.map((q) => `${xAt(q.month)},${yAt(p.axis, q.max)}`);
          const lower = p.future.map((q) => `${xAt(q.month)},${yAt(p.axis, q.min)}`).reverse();
          return <polygon key={`band-${p.variable}`} points={[...upper, ...lower].join(" ")} className={STYLE[p.variable].band} />;
        })}
        {showPast &&
          paths.map((p) => (
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
        {/* 3개월마다 작은 점 (코스피는 0.5개월 지점) */}
        {paths.map((p) =>
          p.future
            .filter((q) => q.month > 0 && q.month < p.horizon && (p.horizon === 1 ? Math.abs(q.month - 0.5) < 1e-9 : q.month % 3 === 0))
            .map((q) => (
              <circle key={`dot-${p.variable}-${q.month}`} cx={xAt(q.month)} cy={yAt(p.axis, q.mid)} r={3.5} className={`${STYLE[p.variable].fill} stroke-white dark:stroke-black`} strokeWidth={1.5}>
                <title>{`${p.legend} · 충격 후 ${q.month}개월: 가운데 ${formatNumber(q.mid)}${AXIS_UNIT[p.axis]} (범위 ${formatNumber(q.min)} ~ ${formatNumber(q.max)})`}</title>
              </circle>
            )),
        )}
        {paths.map((p) => {
          const end = p.future[p.future.length - 1];
          const x = xAt(end.month);
          const y = yAt(p.axis, end.mid);
          // 끝까지(12개월) 가는 선은 점 왼쪽에, 코스피처럼 일찍 끝나는 선은 점 오른쪽에 수치를 쓴다. 위쪽 값은 위에, 아래쪽 값은 아래에 둔다.
          const reachesEnd = end.month === FUTURE_MONTHS;
          return (
            <g key={`end-${p.variable}`}>
              {/* 끝점에 마우스를 올리면 결과 표와 같은 범위를 보여 준다 */}
              <title>{`${p.legend} · 충격 후 ${p.horizon}개월: ${formatRange(result.scenarios[scenario][p.variable]!)}`}</title>
              <Marker variable={p.variable} x={x} y={y} />
              <text
                x={reachesEnd ? x - 10 : x + 10}
                y={end.mid >= 0 ? y - 10 : y + 20}
                textAnchor={reachesEnd ? "end" : "start"}
                fontSize={12}
                fontWeight={700}
                className={STYLE[p.variable].fill}
              >
                {formatNumber(end.mid)}
                {AXIS_UNIT[p.axis]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface ScenarioPathChartProps {
  id: string; // 화면 안에서 겹치지 않는 이름 (접근성 연결용)
  scenario: ScenarioKey;
  result: StressResult;
  paths: ScenarioPath[]; // 이 시나리오에서 그릴 변수들의 경로
  fullDomains: Domains; // 그래프의 세로축 (세 시나리오가 같다)
}

export function ScenarioPathChart({ id, scenario, result, paths, fullDomains }: ScenarioPathChartProps) {
  if (paths.length === 0) return null; // 그릴 변수가 하나도 없으면 그래프를 만들지 않는다

  const pastMonths = -paths[0].past[0].month; // 그린 과거 구간의 길이
  const description = paths
    .map((p) => `${p.legend}: 충격 후 ${p.horizon}개월 가운데 ${formatNumber(p.future[p.future.length - 1].mid)}`)
    .join(". ");
  const label = SCENARIO_LABEL[scenario];
  // 3개월마다 눈금을 둔다 (과거 12개월 + 충격 이후 12개월이면 9개)
  const xTicks = Array.from({ length: (pastMonths + FUTURE_MONTHS) / 3 + 1 }, (_, i) => -pastMonths + i * 3);

  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-base font-semibold">
        {label}{" "}
        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">(충격 ×{SCENARIO_MULTIPLIERS[scenario]})</span>
      </figcaption>

      <PathSvg
        id={`${id}-full`}
        title={`${label} 시나리오: 과거 실제와 충격 이후 경로 꺾은선 그래프`}
        description={description}
        scenario={scenario}
        result={result}
        paths={paths}
        domains={fullDomains}
        fromMonth={-pastMonths}
        height={340}
        xTicks={xTicks}
        caption={{ left: "과거 실제", right: "충격 이후 (가정된 경로)" }}
      />

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
              <span className="text-zinc-500 dark:text-zinc-400"> ({p.axis === "left" ? "왼쪽" : "오른쪽"} 축, {AXIS_UNIT[p.axis]})</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
