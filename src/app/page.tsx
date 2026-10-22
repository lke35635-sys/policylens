// Design Ref: §3.1 화면 배치 — 한 페이지(/), 위에서 아래로 ① 머리말 → ② 안내 문구 → ③ 업로드 카드 → ⑥ 바닥 문구.
// 처음 상태(§3.2)에는 ④ 진행 표시와 ⑤ 결과 영역이 없다. 두 영역은 PLAN 5~7번, 13번에서 붙인다.
import { DisclaimerBar, NoticeBar } from "@/components/NoticeBar";
import { UploadCard } from "@/components/UploadCard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12 sm:py-16">
        {/* ① 머리말 */}
        <header className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">MacroLens</h1>
          <p className="break-keep text-lg text-zinc-600 dark:text-zinc-400">뉴스 한 편으로 보는 거시경제 스트레스 테스트</p>
        </header>

        {/* ② 안내 문구 */}
        <NoticeBar />

        {/* ③ 업로드 카드 */}
        <UploadCard />
      </main>

      {/* ⑥ 바닥 문구 */}
      <DisclaimerBar />
    </div>
  );
}
