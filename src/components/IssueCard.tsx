// Design Ref: §3.1 ⑤ 결과 영역, §3.3 결과 카드 — 이슈 하나의 유형 배지, 요약, 충격 크기와 출처, 결과 표, 근거와 가정.
// 결과 표 아래에 작음 / 중간 / 큼 시점별 그래프 3개(PLAN 6번)가 과거 실제와 충격 이후 경로를 보여 준다.
import { BasisPanel } from "@/components/BasisPanel";
import { ScenarioPathCharts } from "@/components/ScenarioPathCharts";
import { ScenarioTable } from "@/components/ScenarioTable";
import { formatShock, formatShockSource } from "@/lib/stress/format";
import { ISSUE_TYPE_LABEL } from "@/lib/stress/types";
import type { IssueType, StressResult } from "@/lib/stress/types";

interface IssueCardProps {
  index: number; // 한 차례 안에서의 순서 (1부터)
  title: string;
  summary: string;
  type: IssueType;
  approximate: boolean; // 가까운 유형으로 연결했으면 "근사치" 배지를 붙인다
  result: StressResult;
}

export function IssueCard({ index, title, summary, type, approximate, result }: IssueCardProps) {
  return (
    <article className="flex flex-col gap-4 break-keep rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold">
          이슈 {index}. {title}
        </h3>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          {ISSUE_TYPE_LABEL[type]}
        </span>
        {approximate && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            근사치
          </span>
        )}
      </header>

      <p className="text-zinc-700 dark:text-zinc-300">{summary}</p>

      {result.shock === null ? (
        // 기사에도 과거 사례 표에도 충격 크기가 없으면 계산하지 않는다 (PRD 5번)
        <p className="rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          충격 크기를 알 수 없어 계산하지 않았습니다.
        </p>
      ) : (
        <>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">충격 크기:</span> {formatShock(result.shock)} · {formatShockSource(result.shock)}
          </p>
          <ScenarioTable result={result} />
          <ScenarioPathCharts id={`path-${index}`} result={result} />
          <BasisPanel result={result} />
        </>
      )}

      {!result.verification.passed && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          계산 검증에 실패했습니다: {result.verification.problems.join("; ")}
        </p>
      )}
    </article>
  );
}
