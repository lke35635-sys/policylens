// Design Ref: §4.3 "다음 이슈 분석하기" — 한 기사에서 찾는 이슈는 기사에 나온 순서대로 최대 9개(3차례)이고,
// 한 차례에 3개씩 분석한다 (PRD 5번 예외 상황 표, PLAN 7번). 이 파일은 그 규칙만 담은 순수 함수들이다.

export const MAX_ISSUES = 9; // 한 기사에서 찾는 이슈의 상한
export const BATCH_SIZE = 3; // 한 차례에 분석하는 이슈 수

// 기사에서 찾은 이슈 가운데 앞의 9개만 남긴다. 순서는 기사에 나온 그대로다.
// overflow는 상한 때문에 분석하지 않는 이슈 수 (0이면 모두 분석한다).
export function limitIssues<T>(found: T[]): { items: T[]; overflow: number } {
  return { items: found.slice(0, MAX_ISSUES), overflow: Math.max(0, found.length - MAX_ISSUES) };
}

// 몇 차례(rounds) 분석했을 때 화면에 보이는 이슈 수. 1차례 = 3개, 2차례 = 6개, 3차례 = 9개
export function visibleCount(total: number, rounds: number): number {
  return Math.min(total, Math.max(0, rounds) * BATCH_SIZE);
}

// 아직 분석하지 않은 이슈 수
export function remainingCount(total: number, rounds: number): number {
  return total - visibleCount(total, rounds);
}

// 다음 차례에 분석할 이슈 수 (남은 이슈가 3개보다 적으면 그만큼)
export function nextBatchSize(total: number, rounds: number): number {
  return Math.min(BATCH_SIZE, remainingCount(total, rounds));
}
