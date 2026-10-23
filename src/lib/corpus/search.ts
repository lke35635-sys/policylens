// Design Ref: §4.2 검색 — 정책 이름·별칭(영어·약어)·키워드와 검색어를 비교해 일치도 순으로 돌려주는 순수 함수 (PLAN 11번).
// 일치도: 이름 정확히 일치 > 별칭 정확히 일치 > 이름·별칭이 검색어로 시작 > 이름·별칭·키워드가 검색어를 포함. 오타 보정은 하지 않는다.
// 국내 보기는 국내 정책만, 해외·파급경로 보기는 해외 정책만 검색한다 (scope로 정한다).
import type { Policy, PolicyScope } from "./types";

export interface SearchHit {
  policy: Policy;
  score: number; // 클수록 잘 맞는다
}

// 소문자로 바꾸고 공백·가운뎃점·괄호 같은 구분 글자를 없앤다 ("소재·부품·장비"와 "소재 부품 장비"가 같아진다)
export function normalize(text: string): string {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[\s·・‧.,\-_/()（）[\]'"“”‘’~]+/g, "");
}

// 한 정책이 검색어와 얼마나 맞는지 점수를 낸다 (0이면 해당 없음)
function scorePolicy(policy: Policy, rawQuery: string): number {
  const q = normalize(rawQuery);
  if (q.length === 0) return 0;
  const name = normalize(policy.name);
  const aliases = policy.aliases.map(normalize);
  const keywords = policy.keywords.map(normalize);
  const field = normalize(policy.field);

  if (name === q) return 100;
  if (aliases.includes(q)) return 90;
  if (name.startsWith(q)) return 80;
  if (aliases.some((a) => a.startsWith(q))) return 70;
  if (name.includes(q)) return 60;
  if (aliases.some((a) => a.includes(q))) return 50;
  if (keywords.includes(q)) return 45;
  if (keywords.some((k) => k.includes(q))) return 40;
  if (field.includes(q)) return 20; // 분야 이름으로 훑어보기 ("통화", "무역")

  // 단어가 여러 개이면(예: "연준 금리") 모든 단어가 어디엔가 들어 있는 정책을 찾는다
  const tokens = rawQuery
    .split(/\s+/)
    .map(normalize)
    .filter((t) => t.length > 0);
  if (tokens.length >= 2) {
    const haystack = [name, ...aliases, ...keywords, field];
    if (tokens.every((t) => haystack.some((h) => h.includes(t)))) return 30;
  }
  return 0;
}

// 검색어로 정책을 찾는다. 결과는 점수 높은 순이고, 점수가 같으면 자료집의 원래 순서를 따른다.
export function searchPolicies(policies: Policy[], query: string, scope: PolicyScope): SearchHit[] {
  return policies
    .filter((p) => p.scope === scope)
    .map((policy, order) => ({ policy, score: scorePolicy(policy, query), order }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(({ policy, score }) => ({ policy, score }));
}

// 범위 안의 정책 전체 (검색 결과가 없을 때 "다룰 수 있는 정책 목록"으로 보여 준다)
export function listPolicies(policies: Policy[], scope: PolicyScope): Policy[] {
  return policies.filter((p) => p.scope === scope);
}
