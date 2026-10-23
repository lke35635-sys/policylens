// Design Ref: §3.2 시간순 타임라인 — 연혁 항목은 모두 [사실](공식 발표의 요약)이고, 날짜·변경 요약·출처를 보여 준다 (PLAN 12번).
import type { HistoryItem } from "@/lib/corpus/types";
import { SourceLine } from "./SourceLine";

export function FactBadge() {
  return <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">사실</span>;
}

export function HistoryItemCard({ item }: { item: HistoryItem }) {
  return (
    <li className="relative border-l-2 border-zinc-300 pb-5 pl-5 last:pb-0 dark:border-zinc-700">
      <span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-700 dark:border-zinc-900" />
      <div className="flex flex-wrap items-center gap-2">
        <time dateTime={item.date} className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
          {item.date}
        </time>
        <FactBadge />
      </div>
      <h4 className="mt-1 break-keep font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h4>
      <p className="mt-1 break-keep text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{item.summary}</p>
      <div className="mt-1 flex flex-col gap-0.5">
        {item.sources.map((s) => (
          <SourceLine key={s.url + s.title} source={s} />
        ))}
      </div>
    </li>
  );
}

export function HistoryTimeline({ items }: { items: HistoryItem[] }) {
  return (
    <ol aria-label="연혁 (시간순)" className="flex flex-col">
      {items.map((item) => (
        <HistoryItemCard key={item.id} item={item} />
      ))}
    </ol>
  );
}
