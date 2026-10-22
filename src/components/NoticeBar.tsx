// Design Ref: §3.1 ② 안내 문구, ⑥ 바닥 문구 — 어떤 화면 상태에서도 항상 보인다.
// 문구는 PRD 6번·7번에 정해진 그대로 쓴다.
export const NOTICE_PUBLIC_ONLY = "공개된 기사만 올려 주세요";
export const NOTICE_AI_TRANSFER = "업로드한 PDF 내용은 분석을 위해 AI 서비스로 전송됩니다";
export const NOTICE_EDUCATIONAL = "교육용 추정치이며 실제 예측이 아닙니다";

// 업로드 카드 위에 항상 보이는 안내 문구 (공개 기사만 / AI 전송)
export function NoticeBar() {
  return (
    <section
      aria-label="이용 안내"
      className="break-keep rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <ul className="list-disc space-y-1 pl-5">
        <li>{NOTICE_PUBLIC_ONLY}</li>
        <li>{NOTICE_AI_TRANSFER}</li>
      </ul>
    </section>
  );
}

// 페이지 맨 아래에 항상 보이는 문구 (교육용 추정치)
export function DisclaimerBar() {
  return (
    <footer className="w-full border-t border-zinc-200 px-4 py-4 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      {NOTICE_EDUCATIONAL}
    </footer>
  );
}
