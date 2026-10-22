// Design Ref: §3.1 전체 배치 — 한 페이지(/), 위에서 아래로 ① 머리말 → ② 안내 띠 → ⑤ 본문 → ⑥ 바닥.
// 지금(PLAN 1번)은 빈 첫 화면이다. ③ 보기 버튼과 ④ 검색창은 PLAN 11번에서, 연혁과 그래프 화면은 12~14번에서 만든다.
import { NOTICE_TEXT } from "@/components/Notice";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12 sm:py-16">
        {/* ① 머리말 */}
        <header className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">PolicyLens</h1>
          <p className="break-keep text-lg text-zinc-600 dark:text-zinc-400">
            경제정책의 변천과 해외 정책이 국내 경제에 번지는 경로를 공식 자료로 살펴보는 교육용 앱
          </p>
        </header>

        {/* ② 안내 띠 (모든 화면에 항상 보인다) */}
        <p
          role="note"
          className="break-keep rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {NOTICE_TEXT}
        </p>

        {/* ⑤ 본문: 아직 만들지 않았다 */}
        <section aria-label="준비 중" className="rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          정책 검색과 연혁 화면은 준비 중입니다.
        </section>
      </main>
    </div>
  );
}
