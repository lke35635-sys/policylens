// Design Ref: §3.2 정부별 묶음 — 정부(집권 시기)마다 공식 경제정책 방향 문서의 기조 인용(그대로)과 그 기간의 연혁 항목을 같은 형식으로 보여 준다 (PLAN 12번).
// 정부 간 우열·효과의 좋고 나쁨 같은 평가 표현은 쓰지 않는다. 이용 조건 때문에 인용 문장을 못 넣은 정부는 출처 링크만 보여 준다.
import type { GovernmentGroup } from "@/lib/corpus/history";
import { HistoryItemCard } from "./HistoryTimeline";
import { SourceLine } from "./SourceLine";

export function GovernmentView({ groups }: { groups: GovernmentGroup[] }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => (
        <section key={g.id} aria-label={`${g.title} ${g.period}`} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            {g.title} <span className="font-normal text-zinc-600 dark:text-zinc-400">{g.period}</span>
          </h3>
          {g.government && (
            <figure className="mt-2 rounded bg-zinc-100 p-3 dark:bg-zinc-800">
              <figcaption className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">경제정책 기조 (공식 문서 인용)</figcaption>
              {g.government.stance.quote ? (
                <blockquote className="mt-1 break-keep text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">“{g.government.stance.quote}”</blockquote>
              ) : (
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">이용 조건 때문에 인용 문장을 싣지 않았습니다. 아래 출처에서 원문을 확인하세요.</p>
              )}
              <SourceLine source={g.government.stance.source} className="mt-1" />
            </figure>
          )}
          {g.items.length > 0 ? (
            <ol aria-label={`${g.title} 연혁`} className="mt-4 flex flex-col">
              {g.items.map((item) => (
                <HistoryItemCard key={item.id} item={item} />
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">이 기간에 자료집에 담은 연혁 항목이 없습니다.</p>
          )}
        </section>
      ))}
    </div>
  );
}
