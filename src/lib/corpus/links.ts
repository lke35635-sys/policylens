// Design Ref: §10 링크 점검 — 자료집의 모든 출처 주소를 모아 열어 보고 깨진 링크를 찾는다 (PLAN 2번, 검사 스크립트 check-links.mjs가 사용).
// 실제로 주소를 여는 함수(fetchFn)는 바깥에서 넣어 주므로, 시험에서는 가짜 함수로 바꿔 끼울 수 있다.
import type { Corpus, Source } from "./types";

export interface LinkRef {
  url: string;
  where: string; // 어디에 쓰인 주소인지 (예: "정책 bok-rate 연혁 h1")
  hasArchive: boolean; // 보관본 링크가 있는지
  archiveUrl?: string;
}

// 자료집 안의 모든 주소(출처 원문, 보관본, 공식 사이트, 통계 출처)를 모은다
export function collectLinks(corpus: Corpus): LinkRef[] {
  const refs: LinkRef[] = [];
  const addSource = (s: Source, where: string) => {
    refs.push({ url: s.url, where, hasArchive: Boolean(s.archiveUrl), archiveUrl: s.archiveUrl });
    if (s.archiveUrl) refs.push({ url: s.archiveUrl, where: `${where} (보관본)`, hasArchive: true });
  };
  for (const p of corpus.policies) {
    refs.push({ url: p.officialSite.url, where: `정책 ${p.id} 공식 사이트`, hasArchive: false });
    for (const h of p.history) h.sources.forEach((s, i) => addSource(s, `정책 ${p.id} 연혁 ${h.id} 출처 ${i + 1}`));
  }
  for (const g of corpus.governments) addSource(g.stance.source, `정부 ${g.id} 기조 출처`);
  for (const t of corpus.transmission) {
    t.summary.sources.forEach((s, i) => addSource(s, `파급경로 ${t.foreignPolicyId} 요약 출처 ${i + 1}`));
    for (const c of t.channels) {
      c.narrative.sources.forEach((s, i) => addSource(s, `파급경로 ${t.foreignPolicyId} 경로 ${c.id} 해설 출처 ${i + 1}`));
      for (const st of c.steps) addSource(st.source, `파급경로 ${t.foreignPolicyId} 경로 ${c.id} 단계 ${st.id} 출처`);
    }
  }
  for (const s of corpus.series) addSource(s.source, `통계 ${s.id} 출처`);
  return refs;
}

export type FetchFn = (url: string) => Promise<{ ok: boolean; status: number }>;

export interface LinkReport {
  total: number; // 서로 다른 주소 수
  broken: { url: string; where: string[]; status: string; archived: boolean }[];
}

// 주소를 하나씩 열어 본다. 깨졌는데 보관본(archiveUrl)이 있는 출처는 archived=true로 표시한다 (오류가 아니라 경고).
export async function checkLinks(refs: LinkRef[], fetchFn: FetchFn): Promise<LinkReport> {
  const byUrl = new Map<string, LinkRef[]>();
  for (const r of refs) byUrl.set(r.url, [...(byUrl.get(r.url) ?? []), r]);
  const broken: LinkReport["broken"] = [];
  for (const [url, list] of byUrl) {
    let status = "";
    try {
      const res = await fetchFn(url);
      if (res.ok) continue;
      status = `HTTP ${res.status}`;
    } catch (error) {
      status = error instanceof Error ? error.message : "열 수 없음";
    }
    // 보관본 주소 자체가 깨진 경우는 보관본이 있어도 해결이 안 된다
    const archived = list.every((r) => r.hasArchive && !r.where.endsWith("(보관본)"));
    broken.push({ url, where: list.map((r) => r.where), status, archived });
  }
  return { total: byUrl.size, broken };
}
