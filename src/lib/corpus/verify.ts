// Design Ref: §10 검증 계획, PLAN 2번 — 자료집이 PRD 규칙을 지키는지 검사하는 순수 함수들.
// 화면·Next.js와 무관해서 검사 스크립트(scripts/check-corpus.mjs)에서 그대로 돌릴 수 있다.
// 두 가지 층으로 본다.
//  1) 모양: schema.ts(Zod)가 빠진 칸·날짜 모양·https 주소·허용 기관 종류를 본다.
//  2) 규칙: 이 파일이 연혁 5건·날짜 순서·글자 수·짝·경로·그래프 지표 같은 PRD 규칙을 본다.
// release 옵션을 켜면 "이번 사이클을 끝내려면 이만큼 있어야 한다"는 개수 목표(정책 12개 등)까지 본다.
import { corpusSchema } from "./schema";
import { CORE_FIELDS } from "./types";
import type { Channel, Corpus, Narrative, Policy, Series, Source } from "./types";

export const LIMITS = {
  minHistory: 5, // 정책당 연혁 5건 이상
  maxSentence: 80, // 해설·요약 문장 80자 이내
  maxSummary: 500, // 정책 요약 문단 500자 이내
  maxQuote: 100, // 정부 기조 인용 한 문장 100자 이내
  channelSentences: [3, 6] as const, // 경로 해설 3~6문장
  minChannels: 3, // 해외 정책마다 경로 3개 이상
  chartSeries: [2, 3] as const, // 그래프 지표 2~3개
  chartYears: 2, // 시행일 앞뒤 각 2년
} as const;

// 개수 목표 (release 모드에서만 검사)
export const TARGETS = { policies: 12, domestic: 6, foreign: 6, plans: 6 } as const;

export interface VerifyOptions {
  release?: boolean;
}

export interface VerifyResult {
  problems: string[];
  stats: { policies: number; domestic: number; foreign: number; governments: number; plans: number; series: number };
}

// ---- 도움 함수 ----

// 문장 나누기: 마침표·물음표·느낌표 뒤에 공백이나 끝이 오면 문장 끝으로 본다 (0.5%p 같은 소수점은 문장 끝이 아니다)
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?。])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// 월 번호 (2022-08-25 → 2022*12+7)
const monthIndex = (date: string): number => Number(date.slice(0, 4)) * 12 + (Number(date.slice(5, 7)) - 1);

// 통계 기간 → 월 번호 ("2022-08"은 그 달, "2022-Q3"은 그 분기의 첫 달)
function periodMonth(period: string): number | null {
  const m = /^(\d{4})-(\d{2})$/.exec(period);
  if (m) return Number(m[1]) * 12 + (Number(m[2]) - 1);
  const q = /^(\d{4})-Q([1-4])$/.exec(period);
  if (q) return Number(q[1]) * 12 + (Number(q[2]) - 1) * 3;
  return null;
}

function checkSource(source: Source, where: string, problems: string[]): void {
  if (source.archiveUrl === source.url) problems.push(`${where}: 보관본 주소가 원문 주소와 같습니다`);
  if (source.checkedAt < source.date) problems.push(`${where}: 확인일(${source.checkedAt})이 문서 날짜(${source.date})보다 이릅니다`);
}

function checkNarrative(n: Narrative, where: string, problems: string[], range?: readonly [number, number]): void {
  if (range && (n.sentences.length < range[0] || n.sentences.length > range[1])) {
    problems.push(`${where}: 해설은 ${range[0]}~${range[1]}문장이어야 합니다 (지금 ${n.sentences.length}문장)`);
  }
  n.sentences.forEach((s, i) => {
    if (s.length > LIMITS.maxSentence) problems.push(`${where}: ${i + 1}번째 문장이 ${LIMITS.maxSentence}자를 넘습니다 (${s.length}자)`);
    if (splitSentences(s).length > 1) problems.push(`${where}: ${i + 1}번째 항목에 문장이 둘 이상 들어 있습니다`);
  });
  n.sources.forEach((s, i) => checkSource(s, `${where} 출처 ${i + 1}`, problems));
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const v of values) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

// ---- 검사 본체 ----

export function verifyCorpus(input: unknown, options: VerifyOptions = {}): VerifyResult {
  const problems: string[] = [];
  const empty = { policies: 0, domestic: 0, foreign: 0, governments: 0, plans: 0, series: 0 };

  // 1) 모양
  const parsed = corpusSchema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) problems.push(`모양: ${issue.path.join(".") || "(전체)"} — ${issue.message}`);
    return { problems, stats: empty };
  }
  const corpus: Corpus = parsed.data;
  const { policies, governments, transmission, series } = corpus;
  const byId = new Map(policies.map((p) => [p.id, p]));
  const seriesById = new Map(series.map((s) => [s.id, s]));
  const stats = {
    policies: policies.length,
    domestic: policies.filter((p) => p.scope === "domestic").length,
    foreign: policies.filter((p) => p.scope === "foreign").length,
    governments: governments.length,
    plans: transmission.length,
    series: series.length,
  };

  // 2) 아이디·이름·별칭 중복
  for (const d of duplicates(policies.map((p) => p.id))) problems.push(`정책 아이디 중복: ${d}`);
  for (const d of duplicates(policies.map((p) => p.name.toLowerCase()))) problems.push(`정책 이름 중복: ${d}`);
  const aliasOwner = new Map<string, string>();
  for (const p of policies) {
    for (const key of [p.name, ...p.aliases]) {
      const k = key.toLowerCase().replace(/\s+/g, "");
      const owner = aliasOwner.get(k);
      if (owner && owner !== p.id) problems.push(`별칭·이름 충돌: "${key}"이(가) ${owner}와 ${p.id}에 모두 있습니다`);
      aliasOwner.set(k, p.id);
    }
  }
  for (const d of duplicates(series.map((s) => s.id))) problems.push(`통계 아이디 중복: ${d}`);
  for (const d of duplicates(governments.map((g) => g.id))) problems.push(`정부 아이디 중복: ${d}`);

  // 3) 정부 표
  const sortedGov = [...governments].sort((a, b) => a.start.localeCompare(b.start));
  governments.forEach((g) => {
    const where = `정부 ${g.id}`;
    if (g.end !== null && g.end < g.start) problems.push(`${where}: 끝(${g.end})이 시작(${g.start})보다 이릅니다`);
    if (g.stance.quote !== undefined) {
      if (g.stance.quote.length > LIMITS.maxQuote) problems.push(`${where}: 기조 인용이 ${LIMITS.maxQuote}자를 넘습니다 (${g.stance.quote.length}자)`);
      if (splitSentences(g.stance.quote).length > 1) problems.push(`${where}: 기조 인용은 한 문장이어야 합니다`);
      if (!g.stance.source.license) problems.push(`${where}: 인용이 있으면 이용 조건(license)을 적어야 합니다`);
    }
    checkSource(g.stance.source, `${where} 출처`, problems);
  });
  sortedGov.forEach((g, i) => {
    const next = sortedGov[i + 1];
    if (next && (g.end === null || g.end > next.start)) problems.push(`정부 기간이 겹치거나 끝이 비었습니다: ${g.id} → ${next.id}`);
  });
  if (sortedGov.length > 0 && sortedGov[0].start < "1998-01-01") problems.push("정부 구분은 1998년(김대중 정부)부터여야 합니다");
  const govById = new Map(governments.map((g) => [g.id, g]));

  // 4) 정책별 규칙
  for (const p of policies) {
    const where = `정책 ${p.id}`;
    if (p.history.length < LIMITS.minHistory) problems.push(`${where}: 연혁이 ${LIMITS.minHistory}건 이상이어야 합니다 (지금 ${p.history.length}건)`);
    for (const d of duplicates(p.history.map((h) => h.id))) problems.push(`${where}: 연혁 아이디 중복 ${d}`);
    for (let i = 1; i < p.history.length; i += 1) {
      if (p.history[i].date < p.history[i - 1].date) problems.push(`${where}: 연혁이 날짜 오름차순이 아닙니다 (${p.history[i - 1].id} → ${p.history[i].id})`);
    }
    p.history.forEach((h) => {
      const w = `${where} 연혁 ${h.id}`;
      if (h.summary.length > LIMITS.maxSentence) problems.push(`${w}: 요약이 ${LIMITS.maxSentence}자를 넘습니다 (${h.summary.length}자)`);
      if (splitSentences(h.summary).length > 1) problems.push(`${w}: 요약은 한 문장이어야 합니다`);
      h.sources.forEach((s, i) => checkSource(s, `${w} 출처 ${i + 1}`, problems));
      // 정부 시기 연결: 국내 정책만, 정부 표가 있을 때만
      if (p.scope === "foreign" && h.governmentId) problems.push(`${w}: 해외 정책 연혁에는 정부 구분을 두지 않습니다`);
      if (p.scope === "domestic" && sortedGov.length > 0) {
        const gov = h.governmentId ? govById.get(h.governmentId) : undefined;
        if (h.governmentId && !gov) problems.push(`${w}: 없는 정부입니다 (${h.governmentId})`);
        else if (gov && (h.date < gov.start || (gov.end !== null && h.date > gov.end))) problems.push(`${w}: 날짜(${h.date})가 ${gov.id} 기간 밖입니다`);
        else if (!gov && h.date >= sortedGov[0].start) problems.push(`${w}: 정부를 연결해야 합니다 (1998년 이후 항목)`);
      }
    });
    const latest = p.history.reduce((m, h) => (h.date > m ? h.date : m), "");
    if (latest && p.asOf < latest) problems.push(`${where}: 기준일(${p.asOf})이 가장 최근 연혁(${latest})보다 이릅니다`);
    if (p.lastCheckedAt < p.asOf) problems.push(`${where}: 마지막 확인일(${p.lastCheckedAt})이 기준일(${p.asOf})보다 이릅니다`);
    if (p.firstEffectiveDate > p.asOf) problems.push(`${where}: 최초 시행일이 기준일보다 늦습니다`);

    // 짝 (국내 1 ↔ 해외 1)
    if (p.scope === "domestic") {
      if (p.domesticPolicyId) problems.push(`${where}: 국내 정책에는 domesticPolicyId가 없어야 합니다`);
      if (p.foreignPolicyId) {
        const f = byId.get(p.foreignPolicyId);
        if (!f) problems.push(`${where}: 해외 짝이 없는 정책입니다 (${p.foreignPolicyId})`);
        else if (f.scope !== "foreign") problems.push(`${where}: 해외 짝이 해외 정책이 아닙니다 (${f.id})`);
        else if (f.domesticPolicyId !== p.id) problems.push(`${where}: 해외 짝 ${f.id}의 domesticPolicyId가 서로 맞지 않습니다`);
      }
    } else {
      if (p.foreignPolicyId) problems.push(`${where}: 해외 정책에는 foreignPolicyId가 없어야 합니다`);
      if (!p.domesticPolicyId) problems.push(`${where}: 해외 정책은 국내 정책의 짝이어야 합니다 (domesticPolicyId 없음)`);
      else {
        const d = byId.get(p.domesticPolicyId);
        if (!d) problems.push(`${where}: 짝이 되는 국내 정책이 없습니다 (${p.domesticPolicyId})`);
        else if (d.scope !== "domestic") problems.push(`${where}: 짝이 국내 정책이 아닙니다 (${d.id})`);
        else if (d.foreignPolicyId !== p.id) problems.push(`${where}: 국내 정책 ${d.id}의 foreignPolicyId가 서로 맞지 않습니다`);
      }
    }
  }

  // 5) 통계
  for (const s of series) {
    const where = `통계 ${s.id}`;
    checkSource(s.source, `${where} 출처`, problems);
    if (s.points.length === 0) problems.push(`${where}: 값이 하나도 없습니다`);
    const pattern = s.frequency === "monthly" ? /^\d{4}-\d{2}$/ : /^\d{4}-Q[1-4]$/;
    s.points.forEach((pt, i) => {
      if (!pattern.test(pt.period)) problems.push(`${where}: ${i + 1}번째 기간 모양이 주기(${s.frequency})와 다릅니다 (${pt.period})`);
      else if (i > 0 && (periodMonth(pt.period) ?? 0) <= (periodMonth(s.points[i - 1].period) ?? 0)) problems.push(`${where}: 기간이 오름차순이 아닙니다 (${s.points[i - 1].period} → ${pt.period})`);
    });
  }

  // 6) 파급경로
  const planPolicyIds = transmission.map((t) => t.foreignPolicyId);
  for (const d of duplicates(planPolicyIds)) problems.push(`파급경로 계획이 같은 정책에 둘 이상입니다: ${d}`);
  for (const plan of transmission) {
    const where = `파급경로 ${plan.foreignPolicyId}`;
    const policy = byId.get(plan.foreignPolicyId);
    if (!policy) problems.push(`${where}: 없는 정책입니다`);
    else if (policy.scope !== "foreign") problems.push(`${where}: 해외 정책이 아닙니다`);
    checkNarrative(plan.summary, `${where} 요약`, problems);
    const summaryLen = plan.summary.sentences.join(" ").length;
    if (summaryLen > LIMITS.maxSummary) problems.push(`${where}: 요약 문단이 ${LIMITS.maxSummary}자를 넘습니다 (${summaryLen}자)`);
    if (plan.channels.length < LIMITS.minChannels) problems.push(`${where}: 경로가 ${LIMITS.minChannels}개 이상이어야 합니다 (지금 ${plan.channels.length}개)`);
    for (const d of duplicates(plan.channels.map((c) => c.id))) problems.push(`${where}: 경로 아이디 중복 ${d}`);
    plan.channels.forEach((c) => verifyChannel(c, where, policy, seriesById, problems));
  }

  // 7) 개수 목표 (이번 사이클을 끝내려면)
  if (options.release) {
    if (stats.policies < TARGETS.policies) problems.push(`목표: 정책이 ${TARGETS.policies}개 이상이어야 합니다 (지금 ${stats.policies}개)`);
    if (stats.domestic < TARGETS.domestic) problems.push(`목표: 국내 정책이 ${TARGETS.domestic}개 이상이어야 합니다 (지금 ${stats.domestic}개)`);
    if (stats.foreign < TARGETS.foreign) problems.push(`목표: 해외 정책이 ${TARGETS.foreign}개 이상이어야 합니다 (지금 ${stats.foreign}개)`);
    for (const field of CORE_FIELDS) {
      if (!policies.some((p) => p.scope === "domestic" && p.field === field)) problems.push(`목표: ${field} 분야에 국내 정책이 1개 이상 있어야 합니다`);
    }
    for (const p of policies.filter((x) => x.scope === "foreign")) {
      if (!planPolicyIds.includes(p.id)) problems.push(`목표: 해외 정책 ${p.id}에 파급경로 계획이 없습니다`);
    }
    if (stats.plans < TARGETS.plans) problems.push(`목표: 파급경로 계획이 ${TARGETS.plans}개 이상이어야 합니다 (지금 ${stats.plans}개)`);
    if (stats.governments === 0) problems.push("목표: 정부 표가 비어 있습니다");
    else if (sortedGov[sortedGov.length - 1].end !== null) problems.push("목표: 현재 정부의 끝(end)은 비워 두어야 합니다");
  }

  return { problems, stats };
}

function verifyChannel(c: Channel, planWhere: string, policy: Policy | undefined, seriesById: Map<string, Series>, problems: string[]): void {
  const where = `${planWhere} 경로 ${c.id}`;
  checkNarrative(c.narrative, `${where} 해설`, problems, LIMITS.channelSentences);
  if (c.steps.length < 2) problems.push(`${where}: 단계가 2개 이상이어야 합니다`);
  for (const d of duplicates(c.steps.map((s) => s.id))) problems.push(`${where}: 단계 아이디 중복 ${d}`);
  c.steps.forEach((s) => checkSource(s.source, `${where} 단계 ${s.id} 출처`, problems));

  // 통계가 연결된 단계에서 시행에 가까운 단계부터 2~3개를 그래프에 올린다
  const linked: string[] = [];
  for (const s of c.steps) {
    if (!s.seriesId) continue;
    if (!seriesById.has(s.seriesId)) problems.push(`${where}: 단계 ${s.id}가 없는 통계를 가리킵니다 (${s.seriesId})`);
    else if (!linked.includes(s.seriesId)) linked.push(s.seriesId);
  }
  if (linked.length < LIMITS.chartSeries[0]) {
    if (c.chart) problems.push(`${where}: 통계가 연결된 단계가 ${LIMITS.chartSeries[0]}개 미만이면 그래프를 두지 않습니다 ("연결 통계 없음"으로 표시)`);
  } else {
    const expected = linked.slice(0, LIMITS.chartSeries[1]);
    if (!c.chart) problems.push(`${where}: 그래프가 없습니다 (통계가 연결된 단계가 ${linked.length}개)`);
    else if (c.chart.seriesIds.join(",") !== expected.join(",")) {
      problems.push(`${where}: 그래프 지표는 통계가 연결된 단계 중 시행에 가까운 ${expected.length}개(${expected.join(", ")})여야 합니다 (지금 ${c.chart.seriesIds.join(", ")})`);
    }
    // 그래프 기간: 최초 시행일 앞뒤 각 2년이 통계에 들어 있어야 한다
    if (c.chart && policy) {
      const eff = monthIndex(policy.firstEffectiveDate);
      for (const id of c.chart.seriesIds) {
        const s = seriesById.get(id);
        if (!s || s.points.length === 0) continue;
        const first = periodMonth(s.points[0].period);
        const last = periodMonth(s.points[s.points.length - 1].period);
        if (first !== null && first > eff - LIMITS.chartYears * 12) problems.push(`${where}: 통계 ${id}가 시행일 2년 전부터 시작하지 않습니다`);
        if (last !== null && last < eff + LIMITS.chartYears * 12) problems.push(`${where}: 통계 ${id}가 시행일 2년 뒤까지 이어지지 않습니다`);
      }
    }
  }
  if (c.assessment && c.assessment.unclear !== c.assessment.change <= c.assessment.stdev) {
    problems.push(`${where}: 판정(unclear)이 변화와 표준편차의 비교와 다릅니다`);
  }
  if (c.assessment) {
    if (!c.chart) problems.push(`${where}: 그래프가 없는 경로에는 판정을 두지 않습니다`);
    else if (c.chart.seriesIds[c.chart.seriesIds.length - 1] !== c.assessment.seriesId) {
      problems.push(`${where}: 판정 지표(${c.assessment.seriesId})는 그래프 지표 중 마지막(${c.chart.seriesIds[c.chart.seriesIds.length - 1]})이어야 합니다`);
    }
  }
}
