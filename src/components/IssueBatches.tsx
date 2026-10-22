"use client";

// Design Ref: §3.1 ⑤ 결과 영역, §3.2 화면 상태 "결과", §4.3 — 이슈 카드를 한 차례에 3개씩 보여 주고,
// 남은 이슈가 있으면 "남은 이슈 ○개 · 다음 이슈 분석하기" 버튼으로 다음 3개를 보여 준다 (PLAN 7번).
// 지금은 샘플이라 버튼을 누르면 바로 다음 카드가 나온다. 실제로는 버튼을 누르면 서버(`/api/analyze`)에 다음 3개를 보내 분석하고(PLAN 13번),
// 카드는 서버에서 그려 이 부품에 넘겨 주는 구조라서 이 부품은 "몇 개를 보여 줄지"만 정한다.
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BATCH_SIZE, MAX_ISSUES, nextBatchSize, remainingCount, visibleCount } from "@/lib/stress/batches";

interface IssueBatchesProps {
  items: { key: string; node: ReactNode }[]; // 기사에 나온 순서대로, 이미 상한(9개)으로 자른 이슈 카드들
  overflow: number; // 상한 때문에 분석하지 않는 이슈 수 (0이면 모두 분석)
}

export function IssueBatches({ items, overflow }: IssueBatchesProps) {
  const [rounds, setRounds] = useState(1);
  const total = items.length;
  const shown = visibleCount(total, rounds);
  const remaining = remainingCount(total, rounds);
  const found = total + overflow;
  const previousShown = useRef(shown);

  // 다음 이슈를 보여 준 뒤, 새로 나온 첫 카드로 키보드 포커스를 옮겨 화면 읽기 도구가 새 내용을 알려 주게 한다
  useEffect(() => {
    if (shown > previousShown.current) {
      document.getElementById(`issue-item-${previousShown.current}`)?.focus();
    }
    previousShown.current = shown;
  }, [shown]);

  if (total === 0) {
    return <p className="rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">분석할 수 있는 이슈가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p aria-live="polite" className="break-keep text-sm text-zinc-700 dark:text-zinc-300">
        기사에서 이슈 <strong>{found}개</strong>를 찾았어요. 한 번에 {BATCH_SIZE}개씩 분석하고, 지금 <strong>{shown}개</strong>를 분석했어요.
        {overflow > 0 && (
          <>
            {" "}
            이슈가 {MAX_ISSUES}개를 넘어 앞의 {MAX_ISSUES}개만 분석하고, 나머지 {overflow}개는 분석하지 않아요.
          </>
        )}
      </p>

      <ol className="flex flex-col gap-4">
        {items.slice(0, shown).map((item, i) => (
          <li key={item.key} id={`issue-item-${i}`} tabIndex={-1} className="focus:outline-none">
            {item.node}
          </li>
        ))}
      </ol>

      {remaining > 0 ? (
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={() => setRounds((r) => r + 1)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            남은 이슈 {remaining}개 · 다음 이슈 분석하기
          </button>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">다음에 {nextBatchSize(total, rounds)}개를 분석해요.</span>
        </div>
      ) : (
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">이슈 {shown}개를 모두 분석했어요.</p>
      )}
    </div>
  );
}
