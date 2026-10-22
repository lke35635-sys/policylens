// Design Ref: §3.3 결과 카드 — 결과 표: 변수 5행 × 시나리오 3열, 셀은 범위, 행 제목에 단위와 기간.
// 근거 자료가 없는 칸은 숫자 대신 "근거 자료 없음"으로 보여 준다 (PRD 5번).
import { formatPeriod, formatRange } from "@/lib/stress/format";
import {
  SCENARIO_KEYS,
  SCENARIO_MULTIPLIERS,
  VARIABLE_KEYS,
  VARIABLE_META,
} from "@/lib/stress/types";
import type { ScenarioKey, StressResult } from "@/lib/stress/types";

const SCENARIO_LABEL: Record<ScenarioKey, string> = {
  small: "작음",
  medium: "중간",
  large: "큼",
};

export function ScenarioTable({ result }: { result: StressResult }) {
  return (
    // 좁은 화면에서도 페이지가 가로로 밀리지 않도록 표만 가로 스크롤을 허용한다
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <caption className="sr-only">시나리오별 거시 변수 예상 변동 범위</caption>
        <thead>
          <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
            <th scope="col" className="py-2 pr-3 font-medium text-zinc-500 dark:text-zinc-400">
              변수 (단위, 기간)
            </th>
            {SCENARIO_KEYS.map((key) => (
              <th key={key} scope="col" className="px-3 py-2 font-medium">
                {SCENARIO_LABEL[key]}
                <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  충격 ×{SCENARIO_MULTIPLIERS[key]}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VARIABLE_KEYS.map((variable) => {
            const meta = VARIABLE_META[variable];
            return (
              <tr key={variable} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <th scope="row" className="py-2 pr-3 text-left font-medium">
                  {meta.label}
                  <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                    {meta.unit}, {formatPeriod(meta.period)}
                  </span>
                </th>
                {SCENARIO_KEYS.map((key) => {
                  const cell = result.scenarios[key][variable];
                  return cell === null ? (
                    <td key={key} className="px-3 py-2 text-zinc-400 dark:text-zinc-500">
                      근거 자료 없음
                    </td>
                  ) : (
                    <td key={key} className="px-3 py-2 tabular-nums">
                      {formatRange(cell)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
