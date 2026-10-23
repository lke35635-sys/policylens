// Design Ref: §3.1 ③ 보기 버튼 — [국내 정책 연혁][해외 정책 연혁][파급경로·그래프]. 지금 보는 보기가 눌린 모양(●)으로 보인다.
import { VIEWS, VIEW_LABEL, type View } from "@/lib/corpus/viewState";

export function ViewButtons({ view, onSelect }: { view: View; onSelect: (view: View) => void }) {
  return (
    <nav aria-label="보기 선택" className="flex flex-wrap gap-2">
      {VIEWS.map((v) => {
        const active = v === view;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(v)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              active
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {active ? "● " : ""}
            {VIEW_LABEL[v]}
          </button>
        );
      })}
    </nav>
  );
}
