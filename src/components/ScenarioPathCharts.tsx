// Design Ref: §3.1 ⑤ 결과 영역, §3.3 결과 카드 — 작음 / 중간 / 큼 시점별 그래프 3개를 한 묶음으로 보여 준다 (PLAN 6번).
// 그래프를 읽는 법과 과거 실제 통계의 출처를 한 번만 적고, 그 아래에 시나리오별 그래프를 쌓는다.
import { ScenarioPathChart } from "@/components/ScenarioPathChart";
import { OBSERVED_META, OBSERVED_SERIES } from "@/lib/stress/observed-series";
import { buildScenarioPaths } from "@/lib/stress/paths";
import { SCENARIO_KEYS, VARIABLE_KEYS, VARIABLE_META } from "@/lib/stress/types";
import type { StressResult } from "@/lib/stress/types";

export function ScenarioPathCharts({ id, result }: { id: string; result: StressResult }) {
  const drawn = buildScenarioPaths(result, "medium", OBSERVED_SERIES).map((p) => p.variable);
  if (drawn.length === 0) return null; // 그릴 변수가 하나도 없으면 그래프를 만들지 않는다

  const missing = VARIABLE_KEYS.filter((v) => !drawn.includes(v));

  return (
    <section aria-label="시점별 그래프" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">시점별 그래프 (과거 실제 + 충격 이후 경로)</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            값은 <strong>충격 시점({OBSERVED_META.baseMonth})의 값을 0으로 맞춘 변화량</strong>이에요. 물가·성장률·기준금리는 %p 차이(왼쪽 축),
            환율·코스피는 % 변화율(오른쪽 축)이에요.
          </li>
          <li>
            충격 이전은 <strong>실제 월별 통계</strong>예요. 충격 이후 굵은 선은 결과 표 범위의 가운데 값, 옅은 음영은 최소~최대예요.
          </li>
          <li>
            끝점(충격 후 12개월, 코스피는 1개월)의 값은 결과 표에서 나와 근거가 있지만,{" "}
            <strong>그 사이 경로의 모양(직선)은 가정</strong>이에요. 충격이 없다면 변화가 없다고 보았어요.
          </li>
          <li>
            과거 통계는 공개 서비스에 올라온 가장 최근 자료({OBSERVED_META.baseMonth})까지라서 오늘보다 오래됐어요.
          </li>
        </ul>
        <details className="rounded-lg border border-zinc-200 px-4 py-2 dark:border-zinc-800">
          <summary className="cursor-pointer font-medium">과거 실제 통계 출처 보기</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
            {drawn.map((variable) => {
              const s = OBSERVED_SERIES[variable];
              return (
                <li key={variable}>
                  {VARIABLE_META[variable].label}: {s.source.institution}, {s.source.title} ({s.source.date}, {s.source.via}). 가공: {s.derivation}.{" "}
                  <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400">
                    원문 보기
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </div>

      {SCENARIO_KEYS.map((scenario) => (
        <ScenarioPathChart key={scenario} id={`${id}-${scenario}`} scenario={scenario} result={result} />
      ))}

      {missing.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          근거 자료가 없는 변수는 그래프에 그리지 않았습니다: {missing.map((v) => VARIABLE_META[v].label).join(", ")}
        </p>
      )}
    </section>
  );
}
