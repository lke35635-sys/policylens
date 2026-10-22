// Design Ref: §3.3 결과 카드 — "근거와 가정" 접이식: 변수마다 출처(기관, 보고서, 날짜)와 계산 가정.
// 브라우저의 기본 접기/펼치기(details)를 써서 자바스크립트 없이 동작한다.
import { VARIABLE_META } from "@/lib/stress/types";
import type { StressResult } from "@/lib/stress/types";

export function BasisPanel({ result }: { result: StressResult }) {
  return (
    <details className="rounded-lg border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
      <summary className="cursor-pointer font-medium">근거와 가정 보기</summary>

      {result.basis.length === 0 ? (
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">보여 줄 근거가 없습니다. 모든 칸이 &quot;근거 자료 없음&quot;입니다.</p>
      ) : (
        <ul className="mt-3 space-y-4">
          {result.basis.map((item) => (
            <li key={item.variable}>
              <p className="font-medium">
                {VARIABLE_META[item.variable].label}
                {item.singleEstimate && (
                  <span className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-normal text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    단일 추정치
                  </span>
                )}
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-zinc-600 dark:text-zinc-400">
                {item.sources.map((source) => (
                  <li key={source.url}>
                    {source.institution}, {source.title} ({source.date}, {source.via}){" "}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline dark:text-blue-400"
                    >
                      원문 보기
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">가정: {item.assumption}</p>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
