// Design Ref: §3.3 결과 카드 "연쇄 효과" — 결과 표의 값이 다른 변수에 이어서 미치는 영향을 "원인 → 결과" 표로 보여 준다.
// 값은 lib/stress/cascade.ts가 계산한 것을 그대로 보여 주기만 한다. 직접 효과와 겹칠 수 있어 위 결과 표와 더하지 않는다는 점을 밝힌다.
import { calculateCascade } from "@/lib/stress/cascade";
import { formatRange } from "@/lib/stress/format";
import { LINKAGE_META, LINKAGE_SOURCES, WEAK_LINKAGES } from "@/lib/stress/linkages";
import { SCENARIO_KEYS, SCENARIO_LABEL, VARIABLE_META } from "@/lib/stress/types";
import type { StressResult } from "@/lib/stress/types";

const name = (variable: keyof typeof VARIABLE_META) => VARIABLE_META[variable].label;

export function CascadePanel({ result }: { result: StressResult }) {
  const links = calculateCascade(result);
  if (links.length === 0) return null; // 이어질 연결이 없으면 보여 주지 않는다

  // 이번 결과에 해당하는데 과거에 뚜렷한 관계가 없어 뺀 연결 (원인 변수의 값이 결과 표에 있는 것만)
  const weak = WEAK_LINKAGES.filter((l) => result.scenarios.medium[l.cause] !== null && result.scenarios.medium[l.cause]!.period === "1y");

  return (
    <section aria-label="연쇄 효과" className="flex flex-col gap-3">
      <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">연쇄 효과 (과거에 변수들이 함께 움직인 관계로 본 추정)</h4>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        위 결과 표의 값이 다른 변수에 이어졌을 때 얼마나 함께 움직였는지를, {LINKAGE_META.period}의 실제 통계에서 계산한 관계로 보여 줘요.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <caption className="sr-only">연쇄 효과: 원인 변수가 움직였을 때 이어서 움직일 것으로 추정한 값</caption>
          <thead>
            <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
              <th scope="col" className="py-2 pr-3 font-medium text-zinc-500 dark:text-zinc-400">
                연결 (과거 상관계수)
              </th>
              {SCENARIO_KEYS.map((key) => (
                <th key={key} scope="col" className="px-3 py-2 font-medium">
                  {SCENARIO_LABEL[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {links.map(({ linkage, cause, effect }) => (
              <tr key={`${linkage.cause}-${linkage.effect}`} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <th scope="row" className="py-2 pr-3 text-left font-medium">
                  {name(linkage.cause)} → {name(linkage.effect)}
                  <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">
                    상관계수 {linkage.r > 0 ? "+" : ""}
                    {linkage.r}, 1년 기준
                  </span>
                </th>
                {SCENARIO_KEYS.map((key) => (
                  <td key={key} className="px-3 py-2 tabular-nums">
                    {formatRange(effect[key])}
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      ({name(linkage.cause)} {formatRange(cause[key])} 일 때)
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        <li>
          연쇄 효과는 위 결과 표의 <strong>직접 효과와 겹칠 수 있어서 더하지 않았어요.</strong> 따로 보는 참고 값이에요.
        </li>
        <li>
          <strong>같은 기간에 함께 움직인 정도</strong>를 본 것이라 원인과 결과를 뜻하지 않아요. 위기 때처럼 세계 경기 같은 다른 요인이 둘을 함께 움직였을
          수 있고, 앞으로도 같다는 보장이 없어요.
        </li>
        {weak.length > 0 && (
          <li>
            과거에 뚜렷한 관계가 없어 뺀 연결: {weak.map((l) => `${name(l.cause)} → ${name(l.effect)}(상관계수 ${l.r})`).join(", ")}
          </li>
        )}
      </ul>

      <details className="rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-800">
        <summary className="cursor-pointer font-medium">계산 방법과 출처 보기</summary>
        <div className="mt-2 flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
          <p>{LINKAGE_META.method}</p>
          <p>{LINKAGE_META.caveat}</p>
          <ul className="list-disc space-y-1 pl-5">
            {LINKAGE_SOURCES.map((s) => (
              <li key={s.url}>
                {s.institution}, {s.title} ({s.via}){" "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400">
                  원문 보기
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
