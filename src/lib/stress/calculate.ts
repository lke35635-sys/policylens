// Design Ref: §4.6 — 변동 범위 = 계수 표의 영향(최소~최대) × (충격 크기 ÷ 표의 기준 충격) × 시나리오 배율
// 이 파일은 AI·화면과 무관한 순수 계산이다. 표는 인자로 받아서 쓴다 (types.ts의 StressTables).
//
// 약속
// - 숫자는 표에서만 나온다. 계수 표에 출처가 없는 칸은 계산하지 않고 null로 둔다 ("근거 자료 없음").
// - 충격 크기는 기사에서 읽은 값을 쓰고, 없으면 과거 사례 표의 대표 값을 쓴다. 둘 다 없으면 계산하지 않는다.
// - 시나리오 배율이 모두 양수라서 영향의 크기는 작음 ≤ 중간 ≤ 큼이 계산식 자체로 지켜지고, 검증이 한 번 더 확인한다.
import {
  SCENARIO_KEYS,
  SCENARIO_MULTIPLIERS,
  VARIABLE_KEYS,
  VARIABLE_META,
} from "./types";
import type {
  BasisItem,
  ScenarioKey,
  ScenarioValue,
  ShockBase,
  StressInput,
  StressResult,
  StressTables,
  VariableKey,
} from "./types";

// 소수점 셋째 자리까지만 남긴다 (0.15000000000000002 같은 찌꺼기 제거). 반올림은 순서를 바꾸지 않는다.
const round = (value: number): number => {
  const rounded = Math.round(value * 1000) / 1000;
  return Object.is(rounded, -0) ? 0 : rounded;
};

// 단위의 맨 앞 단어 ("% 국제 유가 상승" → "%", "bp 연준 기준금리 인상폭" → "bp")
const unitClass = (unit: string): string => unit.trim().split(/\s+/)[0] ?? "";

function assertValidShock(shock: ShockBase): void {
  if (!Number.isFinite(shock.value) || shock.value === 0) {
    throw new RangeError(`충격 크기는 0이 아닌 숫자여야 합니다: ${shock.value}`);
  }
}

// 스트레스 테스트를 계산한다.
// 충격 단위(%, bp)가 계수 표의 기준 단위와 다르면 잘못된 숫자가 나오므로 계산하지 않고 오류를 던진다.
export function calculateStressTest(input: StressInput, tables: StressTables): StressResult {
  const { type } = input;

  // 1) 충격 크기 정하기: 기사 → 과거 사례 → 없음
  let shock: StressResult["shock"] = null;
  if (input.shock) {
    assertValidShock(input.shock);
    shock = { value: input.shock.value, unit: input.shock.unit, source: "article" };
  } else {
    const typical = tables.typicalShock(type);
    if (typical) {
      assertValidShock(typical.shock);
      shock = {
        value: typical.shock.value,
        unit: typical.shock.unit,
        source: "history",
        historyRefs: typical.sources.map((s) => ({ report: s.title, year: Number(s.date.slice(0, 4)) })),
      };
    }
  }

  // 2) 시나리오 × 변수 칸 계산
  const scenarios = Object.fromEntries(
    SCENARIO_KEYS.map((key) => [key, Object.fromEntries(VARIABLE_KEYS.map((v) => [v, null]))]),
  ) as StressResult["scenarios"];
  const basis: BasisItem[] = [];
  const missing: VariableKey[] = [];

  for (const variable of VARIABLE_KEYS) {
    const entry = tables.coefficients[type][variable];

    // Plan SC: 출처가 없는 칸(또는 충격 크기를 모르는 경우)은 숫자를 내지 않는다.
    if (!shock || entry.status !== "sourced") {
      missing.push(variable);
      continue;
    }

    if (unitClass(shock.unit) !== unitClass(entry.per.unit)) {
      throw new RangeError(
        `충격 단위("${shock.unit}")가 계수 표의 기준 단위("${entry.per.unit}")와 다릅니다 (유형 ${type}, 변수 ${variable})`,
      );
    }

    const ratio = shock.value / entry.per.value;
    basis.push({
      variable,
      sources: entry.sources,
      assumption: entry.assumption,
      singleEstimate: entry.singleEstimate ?? false,
    });

    for (const key of SCENARIO_KEYS) {
      const a = entry.min * ratio * SCENARIO_MULTIPLIERS[key];
      const b = entry.max * ratio * SCENARIO_MULTIPLIERS[key];
      // 충격이 음수(예: 유가 하락)면 영향의 부호가 뒤집히므로 작은 쪽을 min으로 다시 정한다.
      scenarios[key][variable] = {
        min: round(Math.min(a, b)),
        max: round(Math.max(a, b)),
        unit: VARIABLE_META[variable].unit,
        period: entry.period,
      };
    }
  }

  const result: StressResult = {
    type,
    shock,
    scenarios,
    basis,
    missing,
    verification: { passed: true, problems: [] },
  };
  const problems = verifyStressResult(result);
  result.verification = { passed: problems.length === 0, problems };
  return result;
}

// 단계 ⑥ 검증: 영향 크기 순서, 범위, 출처, 단위·기간을 확인하고 문제 목록을 돌려준다 (비어 있으면 통과).
export function verifyStressResult(result: StressResult): string[] {
  const problems: string[] = [];

  for (const variable of VARIABLE_KEYS) {
    const cells = SCENARIO_KEYS.map((key) => result.scenarios[key][variable]);
    const empty = cells.filter((cell) => cell === null).length;
    const item = result.basis.find((b) => b.variable === variable);

    if (empty === SCENARIO_KEYS.length) {
      if (item) problems.push(`${variable}: 값이 없는데 근거가 있음`);
      continue;
    }
    if (empty !== 0) {
      problems.push(`${variable}: 시나리오 일부에만 값이 있음`);
      continue;
    }
    if (!item || item.sources.length === 0 || item.assumption.trim() === "") {
      problems.push(`${variable}: 수치가 있는데 출처나 가정이 없음`);
    }

    // 영향의 크기 = 범위 양 끝의 절댓값 중 큰 쪽. 작음 ≤ 중간 ≤ 큼이어야 한다.
    const magnitudes = (cells as ScenarioValue[]).map((c) => Math.max(Math.abs(c.min), Math.abs(c.max)));
    if (!(magnitudes[0] <= magnitudes[1] && magnitudes[1] <= magnitudes[2])) {
      problems.push(`${variable}: 영향 크기가 작음 ≤ 중간 ≤ 큼 순서가 아님`);
    }

    for (const [i, cell] of (cells as ScenarioValue[]).entries()) {
      const key: ScenarioKey = SCENARIO_KEYS[i];
      if (!(cell.min <= cell.max)) problems.push(`${variable}/${key}: min이 max보다 큼`);
      if (cell.unit !== VARIABLE_META[variable].unit) problems.push(`${variable}/${key}: 단위가 변수 정의와 다름`);
      if (cell.period !== VARIABLE_META[variable].period) problems.push(`${variable}/${key}: 기간이 변수 정의와 다름`);
    }
  }

  return problems;
}

// ── 그래프용 환산 (Plan SC: 기준금리는 표·계산에서는 bp, 그래프에서는 %p) ──

// 그래프에 그릴 값으로 바꾼다. 기준금리만 100bp = 1%p로 환산한다.
export function chartValue(variable: VariableKey, value: number): number {
  return variable === "policyRate" ? value / 100 : value;
}

// 그래프의 선은 범위의 가운데 값을 지난다 (PRD 5번).
export function midpoint(range: { min: number; max: number }): number {
  return (range.min + range.max) / 2;
}
