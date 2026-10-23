// Design Ref: §3.4 시계열 그래프 [사실] — 경로 하나의 지표 2~3개를 시행일 앞뒤 각 2년 구간으로 그린다 (PLAN 14번).
// 지표마다 단위가 달라 같은 가로축을 쓰는 작은 그래프를 위아래로 쌓는다(축을 섞지 않는다). 최초 시행일에 세로선, 선마다 출처와 통계 기준일, 주기(월별/분기별)를 적고
// 색만으로 구분하지 않도록 지표마다 선 끝 모양을 다르게 한다. 값 표와 대체 설명을 함께 둔다.
import { valueAxis, yearTicks, type ChannelGraph, type GraphSeries } from "@/lib/corpus/graph";
import { SourceLine } from "./SourceLine";

const W = 640;
const PANEL_H = 120;
const LEFT = 64;
const RIGHT = 16;
const TOP = 14;
const BOTTOM = 26;

const COLORS = ["#1d4ed8", "#b45309", "#047857"];
const MARKERS = ["circle", "square", "triangle"] as const;

const fmt = (v: number): string => (Math.abs(v) >= 1000 ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : Number(v.toPrecision(4)).toString());

function Marker({ kind, x, y, color }: { kind: (typeof MARKERS)[number]; x: number; y: number; color: string }) {
  if (kind === "circle") return <circle cx={x} cy={y} r={4} fill={color} />;
  if (kind === "square") return <rect x={x - 4} y={y - 4} width={8} height={8} fill={color} />;
  return <polygon points={`${x},${y - 5} ${x - 5},${y + 4} ${x + 5},${y + 4}`} fill={color} />;
}

function Panel({ s, index, graph }: { s: GraphSeries; index: number; graph: ChannelGraph }) {
  const color = COLORS[index % COLORS.length];
  const marker = MARKERS[index % MARKERS.length];
  const innerW = W - LEFT - RIGHT;
  const innerH = PANEL_H - TOP - BOTTOM;
  const x = (month: number): number => LEFT + ((month - graph.fromMonth) / (graph.toMonth - graph.fromMonth)) * innerW;
  const axis = valueAxis(s.points.map((p) => p.value));
  const y = (v: number): number => TOP + (1 - (v - axis.lo) / (axis.hi - axis.lo)) * innerH;
  const path = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.month).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const last = s.points[s.points.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${PANEL_H}`} role="img" aria-label={`${s.name} 그래프`} className="h-auto w-full">
      <title>{s.name}</title>
      <desc>{`${s.name}(${s.unit}, ${s.frequency === "monthly" ? "월별" : "분기별"}) 시행일 ${graph.effectiveDate} 앞뒤 각 2년. 값 표는 그래프 아래에 있습니다.`}</desc>
      {axis.ticks.map((t) => (
        <g key={t}>
          <line x1={LEFT} x2={W - RIGHT} y1={y(t)} y2={y(t)} stroke="currentColor" strokeOpacity={0.12} />
          <text x={LEFT - 6} y={y(t) + 4} textAnchor="end" fontSize={11} fill="currentColor" fillOpacity={0.75}>
            {fmt(t)}
          </text>
        </g>
      ))}
      {yearTicks(graph.fromMonth, graph.toMonth).map((t) => (
        <g key={t.month}>
          <line x1={x(t.month)} x2={x(t.month)} y1={PANEL_H - BOTTOM} y2={PANEL_H - BOTTOM + 4} stroke="currentColor" strokeOpacity={0.5} />
          <text x={x(t.month)} y={PANEL_H - 8} textAnchor="middle" fontSize={11} fill="currentColor" fillOpacity={0.75}>
            {t.label}
          </text>
        </g>
      ))}
      {/* 최초 시행일 세로선 */}
      <line x1={x(graph.effectiveMonth)} x2={x(graph.effectiveMonth)} y1={TOP} y2={PANEL_H - BOTTOM} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="5 3" />
      {index === 0 && (
        <text x={x(graph.effectiveMonth) + 4} y={TOP + 10} fontSize={11} fill="#dc2626" fontWeight={600}>
          시행 {graph.effectiveDate}
        </text>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {last && <Marker kind={marker} x={x(last.month)} y={y(last.value)} color={color} />}
    </svg>
  );
}

export function ChannelChart({ graph }: { graph: ChannelGraph }) {
  return (
    <figure className="flex flex-col gap-3" aria-label="시계열 그래프">
      <figcaption className="flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">사실</span>
        시행일({graph.effectiveDate}) 앞뒤 각 2년의 공식 통계
      </figcaption>

      {graph.assessment?.unclear && (
        <p role="note" className="break-keep rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          이 기간에는 뚜렷한 연관이 보이지 않았다 (기준: {graph.series.find((s) => s.id === graph.assessment?.seriesId)?.name ?? graph.assessment.seriesId}의 시행 전후 12개월 평균 차이 {fmt(graph.assessment.change)},
          시행 전 10년 월별 값의 표준편차 {fmt(graph.assessment.stdev)}({graph.assessment.stdevPeriod}) → 평균 차이가 표준편차 이내)
        </p>
      )}

      {graph.series.map((s, i) => (
        <div key={s.id} className="text-zinc-900 dark:text-zinc-100">
          <p className="mb-1 flex flex-wrap items-center gap-x-2 text-sm font-semibold">
            <svg width="18" height="12" aria-hidden="true">
              <Marker kind={MARKERS[i % MARKERS.length]} x={9} y={6} color={COLORS[i % COLORS.length]} />
            </svg>
            {s.name}
            <span className="font-normal text-zinc-600 dark:text-zinc-400">
              ({s.unit} · {s.frequency === "monthly" ? "월별" : "분기별"} · 통계 기준일 {s.latestPeriod})
            </span>
          </p>
          <Panel s={s} index={i} graph={graph} />
          <SourceLine source={s.source} />
        </div>
      ))}

      <details className="text-sm text-zinc-800 dark:text-zinc-200">
        <summary className="cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-blue-600">값 표 보기</summary>
        <div className="mt-2 max-h-72 overflow-auto">
          <table className="w-full border-collapse text-xs">
            <caption className="sr-only">그래프에 그린 통계의 값 표</caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-zinc-300 px-2 py-1 text-left dark:border-zinc-700">기간</th>
                {graph.series.map((s) => (
                  <th key={s.id} scope="col" className="border-b border-zinc-300 px-2 py-1 text-right dark:border-zinc-700">
                    {s.name} ({s.unit})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows(graph).map((row) => (
                <tr key={row.period}>
                  <th scope="row" className="px-2 py-0.5 text-left font-normal tabular-nums">{row.period}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-2 py-0.5 text-right tabular-nums">
                      {v === null ? "–" : fmt(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

// 값 표의 행: 모든 지표의 기간을 모아 오름차순으로 (분기 지표는 그 분기 첫 달 행에 놓는다)
function tableRows(graph: ChannelGraph): { period: string; values: (number | null)[] }[] {
  const months = new Map<number, string>();
  for (const s of graph.series) for (const p of s.points) if (!months.has(p.month)) months.set(p.month, s.frequency === "monthly" ? p.period : `${p.period}`);
  return [...months.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([month, period]) => ({
      period,
      values: graph.series.map((s) => s.points.find((p) => p.month === month)?.value ?? null),
    }));
}
