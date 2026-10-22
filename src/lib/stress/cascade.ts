// Design Ref: §3.3 결과 카드 "연쇄 효과" — 결과 표의 값(1차 효과)이 다른 변수에 어떻게 이어졌을지, 과거에 변수들이 함께 움직인 관계로 추정한다.
// 관계(기울기)는 scripts/fetch-linkages.mjs가 공개 통계에서 계산해 linkages.ts에 고정해 둔 값이다. 여기서는 곱하기만 한다.
// Plan SC: 연쇄 효과는 결과 표의 직접 효과와 겹칠 수 있어 합치지 않고 따로 보여 준다. 과거의 동시 움직임이지 인과가 아니다.
// Plan SC: 상관이 약한 관계는 만들지 않는다 (linkages.ts에는 이미 걸러진 관계만 있다).
import { chartValue } from "./calculate";
import { LINKAGES } from "./linkages";
import { SCENARIO_KEYS } from "./types";
import type { Linkage, ScenarioKey, StressResult } from "./types";

export interface CascadeRange {
  min: number;
  max: number;
  unit: string; // "%p" 또는 "%"
}

export interface CascadeLink {
  linkage: Linkage;
  cause: Record<ScenarioKey, CascadeRange>; // 결과 표(1차 효과)의 원인 변수 값, 12개월 누적
  effect: Record<ScenarioKey, CascadeRange>; // 이어서 움직일 것으로 추정한 값
}

// 그래프와 같은 단위: GDP·소비자물가·기준금리는 %p, 환율·코스피는 %
export function chartUnit(variable: Linkage["cause"]): string {
  return variable === "fx" || variable === "kospi" ? "%" : "%p";
}

// 시나리오마다, 결과 표에 원인 변수의 값이 있고(1년 누적) 과거에 뚜렷한 관계가 있는 연결만 계산한다.
export function calculateCascade(result: StressResult, linkages: Linkage[] = LINKAGES): CascadeLink[] {
  const links: CascadeLink[] = [];
  for (const linkage of linkages) {
    const cause = {} as Record<ScenarioKey, CascadeRange>;
    const effect = {} as Record<ScenarioKey, CascadeRange>;
    let usable = true;

    for (const scenario of SCENARIO_KEYS) {
      const cell = result.scenarios[scenario][linkage.cause];
      // 코스피 등 1개월 값은 12개월 관계와 기간이 달라 쓰지 않는다
      if (cell === null || cell.period !== "1y") {
        usable = false;
        break;
      }
      const lo = chartValue(linkage.cause, cell.min);
      const hi = chartValue(linkage.cause, cell.max);
      // 원인의 범위 × 기울기의 범위 → 가능한 값 네 개 중 가장 작은 값과 큰 값
      const products = [lo * linkage.low, lo * linkage.high, hi * linkage.low, hi * linkage.high];
      cause[scenario] = { min: lo, max: hi, unit: chartUnit(linkage.cause) };
      effect[scenario] = { min: Math.min(...products), max: Math.max(...products), unit: chartUnit(linkage.effect) };
    }

    if (usable) links.push({ linkage, cause, effect });
  }
  return links;
}
