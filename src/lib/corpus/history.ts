// Design Ref: §3.2 연혁 묶기 — 정책 연혁을 시간순 그대로, 또는 정부(집권 시기)별로 묶는 순수 함수 (PLAN 12번).
// 정부별 묶음은 연혁 항목의 governmentId를 따르고, 1998년 이전 항목(governmentId 없음)은 "1998년 이전" 묶음으로 맨 앞에 둔다.
// 연혁이 있는 정부들 사이의 정부는 항목이 없어도 묶음을 만들어 기조 인용을 같은 형식으로 보여 준다 (모든 정부를 같은 형식으로 다룬다).
import type { Government, HistoryItem, Policy } from "./types";

export interface GovernmentGroup {
  id: string; // 정부 아이디 또는 "before-1998"
  title: string; // 예: 김대중 정부
  period: string; // 예: 1998~2003 / 1998년 이전
  government: Government | null; // 1998년 이전 묶음은 null
  items: HistoryItem[];
}

// 시간순 (날짜 오름차순, 같은 날짜는 자료집 순서 유지)
export function timeline(policy: Policy): HistoryItem[] {
  return policy.history.map((item, order) => ({ item, order })).sort((a, b) => a.item.date.localeCompare(b.item.date) || a.order - b.order).map(({ item }) => item);
}

const periodLabel = (g: Government): string => `${g.start.slice(0, 4)}~${g.end ? g.end.slice(0, 4) : "현재"}`;

// 정부별 묶음 (오래된 정부부터)
export function groupByGovernment(policy: Policy, governments: Government[]): GovernmentGroup[] {
  const items = timeline(policy);
  const groups: GovernmentGroup[] = [];
  const before = items.filter((i) => !i.governmentId);
  if (before.length > 0) groups.push({ id: "before-1998", title: "1998년 이전", period: "1998년 이전", government: null, items: before });

  const withGov = items.filter((i) => i.governmentId);
  if (withGov.length > 0) {
    const order = governments.map((g) => g.id);
    const used = withGov.map((i) => order.indexOf(i.governmentId as string)).filter((n) => n >= 0);
    const from = Math.min(...used);
    const to = Math.max(...used);
    for (const g of governments.slice(from, to + 1)) {
      groups.push({ id: g.id, title: g.name, period: periodLabel(g), government: g, items: withGov.filter((i) => i.governmentId === g.id) });
    }
  }
  return groups;
}
