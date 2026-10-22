// Design Ref: §3.1 ⑤ 결과 영역, §3.3 결과 카드 — 작음 / 중간 / 큼 시점별 그래프 3개를 한 묶음으로 보여 준다 (PLAN 6번).
// 그래프를 읽는 법과 과거 실제 통계의 출처를 한 번만 적고, 그 아래에 시나리오별 그래프를 쌓는다.
// 세 시나리오가 같은 세로축 눈금을 쓰도록 축 범위를 여기서 한 번에 정해서 내려준다.
import { ScenarioPathChart } from "@/components/ScenarioPathChart";
import { alignedDomains } from "@/lib/stress/axis";
import { OBSERVED_META, OBSERVED_SERIES } from "@/lib/stress/observed-series";
import { buildScenarioPaths, chartValues, DEFAULT_PAST_MONTHS } from "@/lib/stress/paths";
import { SCENARIO_KEYS, VARIABLE_KEYS, VARIABLE_META } from "@/lib/stress/types";
import type { ScenarioKey, StressResult } from "@/lib/stress/types";

export function ScenarioPathCharts({ id, result }: { id: string; result: StressResult }) {
  const pathsByScenario = Object.fromEntries(
    SCENARIO_KEYS.map((key) => [key, buildScenarioPaths(result, key, OBSERVED_SERIES)]),
  ) as Record<ScenarioKey, ReturnType<typeof buildScenarioPaths>>;
  const allPaths = SCENARIO_KEYS.flatMap((key) => pathsByScenario[key]);
  if (allPaths.length === 0) return null; // 그릴 변수가 하나도 없으면 그래프를 만들지 않는다

  // 세 시나리오가 같은 눈금을 쓰도록 모든 시나리오의 값으로 한 번만 정한다
  const fullDomains = alignedDomains(chartValues(allPaths, "left", true), chartValues(allPaths, "right", true));
  const zoomDomains = alignedDomains(chartValues(allPaths, "left", false), chartValues(allPaths, "right", false));

  const drawn = pathsByScenario.medium.map((p) => p.variable);
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
            충격 이전 {DEFAULT_PAST_MONTHS}개월은 <strong>실제 월별 통계</strong>예요. 충격 이후 굵은 선은 결과 표 범위의 가운데 값, 옅은 음영은
            최소~최대이고, 선 끝의 숫자는 충격 후 12개월(코스피는 1개월) 가운데 값이에요.
          </li>
          <li>
            각 시나리오의 위 그래프는 과거와 함께 보는 전체 모습이고, 아래 <strong>확대 그래프</strong>는 충격 이후만 세로축을 크게 늘린 거예요.
            시나리오 세 개가 같은 눈금이라 크기를 비교할 수 있어요.
          </li>
          <li>
            끝점의 값은 결과 표에서 나와 근거가 있지만, <strong>그 사이 경로의 모양(직선)은 가정</strong>이에요. 충격이 없다면 변화가 없다고 보았어요.
          </li>
          <li>과거 통계는 공개 서비스에 올라온 가장 최근 자료({OBSERVED_META.baseMonth})까지라서 오늘보다 오래됐어요.</li>
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
        <ScenarioPathChart
          key={scenario}
          id={`${id}-${scenario}`}
          scenario={scenario}
          result={result}
          paths={pathsByScenario[scenario]}
          fullDomains={fullDomains}
          zoomDomains={zoomDomains}
        />
      ))}

      {missing.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          근거 자료가 없는 변수는 그래프에 그리지 않았습니다: {missing.map((v) => VARIABLE_META[v].label).join(", ")}
        </p>
      )}
    </section>
  );
}
