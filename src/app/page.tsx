// Design Ref: §3.1 전체 배치 — 한 페이지(/), 위에서 아래로 ① 머리말 → ② 안내 띠 → ③ 보기 버튼 → ④ 검색창 → ⑤ 본문 → ⑥ 바닥.
// 서버 컴포넌트: 자료집을 읽어 클라이언트 컴포넌트(PolicyLensApp)에 전달한다. 요청마다 계산하지 않고, 검색어는 서버로 오지 않는다.
import { CORPUS } from "@/data";
import { NOTICE_TEXT } from "@/components/Notice";
import { PolicyLensApp } from "@/components/PolicyLensApp";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10 sm:py-14">
        {/* ① 머리말 */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-zinc-50">PolicyLens</h1>
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

        {/* ③ 보기 버튼 · ④ 검색창 · ⑤ 본문 */}
        <PolicyLensApp policies={CORPUS.policies} />
      </main>
    </div>
  );
}
