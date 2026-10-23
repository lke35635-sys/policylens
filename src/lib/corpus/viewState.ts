// Design Ref: §4.3 화면 상태와 주소 — 보기와 선택한 정책을 주소 뒤쪽(#view=domestic&policy=...)에 담고 읽는 순수 함수 (PLAN 11번).
// 검색어는 주소에 담지 않는다. '#' 뒤는 서버로 전달되지 않는다. 없는 보기·정책 아이디는 처음 화면으로 돌아간다.
import type { Policy, PolicyScope } from "./types";

export type View = "domestic" | "foreign" | "transmission";
export const VIEWS: readonly View[] = ["domestic", "foreign", "transmission"];

export const VIEW_LABEL: Record<View, string> = {
  domestic: "국내 정책 연혁",
  foreign: "해외 정책 연혁",
  transmission: "파급경로·그래프",
};

// 보기마다 검색하는 정책의 범위
export const VIEW_SCOPE: Record<View, PolicyScope> = { domestic: "domestic", foreign: "foreign", transmission: "foreign" };

export interface ViewState {
  view: View;
  policyId: string | null;
}

export const DEFAULT_STATE: ViewState = { view: "domestic", policyId: null };

// "#view=foreign&policy=fed-funds-rate" → 상태. 알 수 없는 값은 처음 상태로 돌린다.
export function parseHash(hash: string, policies: Policy[]): ViewState {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const view = params.get("view");
  if (!view || !(VIEWS as readonly string[]).includes(view)) return DEFAULT_STATE;
  const policyId = params.get("policy");
  if (!policyId) return { view: view as View, policyId: null };
  const policy = policies.find((p) => p.id === policyId);
  // 보기의 범위와 맞는 정책만 인정한다 (국내 보기에 해외 정책 아이디가 오면 무시)
  if (!policy || policy.scope !== VIEW_SCOPE[view as View]) return DEFAULT_STATE;
  return { view: view as View, policyId };
}

export function formatHash(state: ViewState): string {
  const params = new URLSearchParams({ view: state.view });
  if (state.policyId) params.set("policy", state.policyId);
  return `#${params.toString()}`;
}
