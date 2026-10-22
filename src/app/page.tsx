// Design Ref: §3.1 화면 배치 — 한 페이지(/), 위에서 아래로 ① 머리말 → ② 안내 문구 → ③ 업로드 카드 → ⑤ 결과 영역 → ⑥ 바닥 문구.
// 지금(PLAN 5번)의 ⑤ 결과 영역은 샘플 데이터로 모양만 확인한다. 실제 분석 결과로 바꾸는 것은 PLAN 13번이고,
// ④ 진행 표시와 "다음 이슈 분석하기" 버튼은 PLAN 7번, 13번에서 붙인다.
import { IssueCard } from "@/components/IssueCard";
import { DisclaimerBar, NoticeBar } from "@/components/NoticeBar";
import { UploadCard } from "@/components/UploadCard";
import { getSampleIssues, SAMPLE_NOTICE } from "@/lib/stress/sample";

export default function Home() {
  const samples = getSampleIssues();

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

        {/* ⑤ 결과 영역 (샘플) */}
        <section aria-labelledby="result-heading" className="flex flex-col gap-4">
          <h2 id="result-heading" className="text-2xl font-semibold">
            분석 결과 미리보기
          </h2>
          <p
            role="note"
            className="break-keep rounded-lg border border-dashed border-zinc-400 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          >
            {SAMPLE_NOTICE}
          </p>
          {samples.map((sample, i) => (
            <IssueCard
              key={sample.title}
              index={i + 1}
              title={sample.title}
              summary={sample.summary}
              type={sample.type}
              approximate={sample.approximate}
              result={sample.result}
            />
          ))}
        </section>
      </main>

      {/* ⑥ 바닥 문구 */}
      <DisclaimerBar />
    </div>
  );
}
