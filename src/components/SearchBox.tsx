// Design Ref: §3.1 ④ 검색창, §3.5 화면 상태 — 검색창과 결과 카드 목록, 결과 없음 안내. 검색어는 이 브라우저 안에서만 쓰고 서버·주소에 담지 않는다.
import type { FormEvent } from "react";
import type { SearchHit } from "@/lib/corpus/search";
import type { Policy } from "@/lib/corpus/types";

export interface SearchBoxProps {
  label: string; // 검색창 이름 (화면 읽기 프로그램용)
  placeholder: string;
  examples: string[]; // 처음 화면의 검색 예시
  draft: string; // 입력 중인 글자
  onDraftChange: (value: string) => void;
  onSubmit: (text?: string) => void;
  submitted: string; // 마지막으로 검색한 말 (빈 값이면 아직 검색 전)
  hits: SearchHit[];
  allPolicies: Policy[]; // 결과가 없을 때 보여 줄 "다룰 수 있는 정책"
  showPairBadge: boolean; // 국내 보기: 해외 짝 표시
  onSelectPolicy: (id: string) => void;
}

export function SearchBox(props: SearchBoxProps) {
  const { label, placeholder, examples, draft, onDraftChange, onSubmit, submitted, hits, allPolicies, showPairBadge, onSelectPolicy } = props;
  const handle = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  const searched = submitted.trim().length > 0;
  return (
    <section aria-label={label} className="flex flex-col gap-4">
      <form onSubmit={handle} role="search" className="flex gap-2">
        <input
          type="search"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-base text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="button-glow shrink-0 rounded-full bg-[#0a4267] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#20658e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          검색
        </button>
      </form>

      {!searched && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p className="break-keep">정책 이름이나 관련 키워드를 입력해 보세요. 영어나 줄임말(예: Fed, LTV)도 찾을 수 있어요.</p>
          <p className="mt-2 flex flex-wrap items-center gap-2">
            <span>예시:</span>
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  onDraftChange(ex);
                  onSubmit(ex);
                }}
                className="rounded-full border border-zinc-300 px-3 py-1 text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {ex}
              </button>
            ))}
          </p>
        </div>
      )}

      {searched && hits.length > 0 && (
        <ul aria-label="검색 결과" className="flex flex-col gap-2">
          {hits.map(({ policy }) => (
            <li key={policy.id}>
              <button
                type="button"
                onClick={() => onSelectPolicy(policy.id)}
                className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-left hover:border-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <span className="break-keep font-semibold text-zinc-900 dark:text-zinc-50">{policy.name}</span>
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{policy.field}</span>
                {showPairBadge && policy.foreignPolicyId && (
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-950 dark:text-blue-200">● 해외 짝 있음</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {searched && hits.length === 0 && (
        <div role="status" className="rounded-lg border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">자료집에 없는 정책입니다</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">다른 말로 검색하거나, 아래에서 다룰 수 있는 정책을 골라 보세요.</p>
          <ul className="mt-3 flex flex-col gap-1">
            {allPolicies.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => onSelectPolicy(p.id)} className="text-left text-sm text-blue-800 underline hover:text-blue-600 dark:text-blue-300">
                  {p.name} <span className="text-zinc-500">({p.field})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
