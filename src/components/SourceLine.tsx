// Design Ref: §3.2 출처 표시 — 기관, 문서명(원문 링크, 새 창), 문서 날짜, 확인일, 보관본 링크, 이용 조건. 외부 링크는 새 창에서 noopener noreferrer로 연다.
import type { Source } from "@/lib/corpus/types";

export function SourceLine({ source, className = "" }: { source: Source; className?: string }) {
  return (
    <p className={`break-keep text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 ${className}`}>
      <span className="font-medium">출처:</span> {source.institution},{" "}
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:text-blue-600 dark:text-blue-300">
        {source.title}
        <span aria-hidden="true"> ↗</span>
        <span className="sr-only"> (새 창으로 열림)</span>
      </a>
      , 문서 날짜 {source.date}, 확인일 {source.checkedAt}
      {source.archiveUrl && (
        <>
          {" "}
          <a href={source.archiveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:text-blue-600 dark:text-blue-300">
            보관본<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (새 창으로 열림)</span>
          </a>
        </>
      )}
      {source.license && <> · 이용 조건: {source.license}</>}
    </p>
  );
}
