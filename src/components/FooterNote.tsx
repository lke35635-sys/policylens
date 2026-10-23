// Design Ref: §3.1 ⑥ 바닥 — 정책을 고르기 전에는 자료집 작성일, 고른 뒤에는 그 정책의 기준일·마지막 확인일·공식 사이트 안내(파급경로 보기에서는 통계 기준일도) (PLAN 15번).
import type { Policy } from "@/lib/corpus/types";

export function FooterNote({ policy, policies, statsPeriods }: { policy: Policy | undefined; policies: Policy[]; statsPeriods: string[] }) {
  // 자료집 작성일 = 정책들의 마지막 확인일 가운데 가장 늦은 날
  const compiled = policies.reduce((latest, p) => (p.lastCheckedAt > latest ? p.lastCheckedAt : latest), "");
  const sorted = [...statsPeriods].sort();
  return (
    <footer className="mt-4 border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      {policy ? (
        <p className="break-keep">
          {policy.name}: {policy.asOf}까지 반영 · 마지막 확인일 {policy.lastCheckedAt}
          {sorted.length > 0 && <> · 통계 기준일 {sorted[0] === sorted[sorted.length - 1] ? sorted[0] : `${sorted[0]} ~ ${sorted[sorted.length - 1]} (지표마다 다름)`}</>} · 이후 변경은{" "}
          <a href={policy.officialSite.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline dark:text-blue-300">
            공식 사이트<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (새 창으로 열림)</span>
          </a>
          에서 확인하세요.
        </p>
      ) : (
        <p className="break-keep">자료집 작성일 {compiled}. 모든 내용은 공식 자료의 출처와 함께 정리했고, 정책을 고르면 그 정책의 기준일이 여기에 나옵니다.</p>
      )}
      <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500">머리말 지구 이미지: NASA Earth Observatory (공개 자료, 지형·도시 불빛 지도)</p>
    </footer>
  );
}
