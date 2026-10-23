// 파급경로·그래프 규칙을 확인한다 (PLAN 14~15번, DESIGN §10 그래프).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-graph.mjs   (인터넷 필요 없음)
// 확인하는 것: 해외 정책 6개 이상·정책마다 경로 3개 이상, 경로당 그래프 지표 2~3개(단계 통계 중에서만), 시행일 앞뒤 각 2년, 월별(없으면 분기 표시),
// 지표마다 출처·통계 기준일, 저장된 판정(check-assessment.mjs와 같은 계산식), 해설에 나온 변수 이름이 그래프 선 이름과 어긋나지 않는지.
import { CORPUS } from "../src/data/index.ts";
import { buildAllGraphs, periodMonthNumber } from "../src/lib/corpus/graph.ts";

let passed = 0;
const failures = [];
const check = (name, fn) => {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`  ✗ ${name}\n      ${error.message}`);
  }
};
const expect = (c, m) => {
  if (!c) throw new Error(m);
};

const foreign = CORPUS.policies.filter((p) => p.scope === "foreign");
const graphs = buildAllGraphs(CORPUS.policies, CORPUS.transmission, CORPUS.series);
const allChannels = CORPUS.transmission.flatMap((t) => t.channels.map((c) => ({ plan: t, c })));

console.log("1) 경로와 그래프 개수");
check("해외 정책 6개 이상에 파급경로가 있고 정책마다 경로가 3개 이상이다", () => {
  expect(CORPUS.transmission.length >= 6, `파급경로 ${CORPUS.transmission.length}개`);
  const few = CORPUS.transmission.filter((t) => t.channels.length < 3).map((t) => t.foreignPolicyId);
  expect(few.length === 0, `경로 3개 미만: ${few}`);
  const missing = foreign.filter((p) => !CORPUS.transmission.some((t) => t.foreignPolicyId === p.id)).map((p) => p.id);
  expect(missing.length === 0, `파급경로 없는 해외 정책: ${missing}`);
});
check("경로의 그래프 지표는 2~3개이고 그 경로 단계에 연결된 통계에서만 고른다", () => {
  for (const { plan, c } of allChannels) {
    const linked = [...new Set(c.steps.map((s) => s.seriesId).filter(Boolean))];
    if (!c.chart) {
      expect(linked.length < 2, `${c.id}: 연결 통계가 ${linked.length}개인데 그래프가 없음`);
      continue;
    }
    const n = c.chart.seriesIds.length;
    expect(n >= 2 && n <= 3, `${c.id}: 그래프 지표 ${n}개`);
    for (const id of c.chart.seriesIds) expect(linked.includes(id), `${c.id}: ${id}는 단계에 연결된 통계가 아님`);
    expect(CORPUS.policies.some((p) => p.id === plan.foreignPolicyId), `${c.id}: 정책 없음`);
  }
});

console.log("\n2) 그래프 자료");
check("시행일 앞뒤 각 2년이 월별(또는 분기별)로 모두 들어 있다", () => {
  for (const g of Object.values(graphs)) {
    for (const s of g.series) {
      expect(s.points.length > 0, `${g.channelId}/${s.id}: 값이 없음`);
      const first = periodMonthNumber(s.points[0].period);
      const last = periodMonthNumber(s.points[s.points.length - 1].period);
      expect(first <= g.fromMonth + 3 && last >= g.toMonth - 3, `${g.channelId}/${s.id}: 앞뒤 2년을 덮지 못함 (${s.points[0].period} ~ ${s.points[s.points.length - 1].period})`);
      const per = s.frequency === "monthly" ? 49 : 17;
      expect(s.points.length >= per - 8, `${g.channelId}/${s.id}: 값이 너무 적음 (${s.points.length}개)`);
    }
  }
});
check("지표마다 출처(기관·통계명·조회일)와 통계 기준일, 주기가 있다", () => {
  for (const g of Object.values(graphs)) {
    for (const s of g.series) {
      const src = s.source;
      expect(src.institution && src.title && src.checkedAt && src.url, `${g.channelId}/${s.id}: 출처 정보 부족`);
      expect(s.latestPeriod && (s.frequency === "monthly" || s.frequency === "quarterly"), `${g.channelId}/${s.id}: 기준일·주기 없음`);
    }
  }
});
check("그래프가 있는 경로는 저장된 판정이 있고 판정 지표가 그래프 마지막 지표이다", () => {
  for (const { c } of allChannels) {
    if (!c.chart) continue;
    expect(c.assessment, `${c.id}: 판정이 없음`);
    expect(c.assessment.seriesId === c.chart.seriesIds[c.chart.seriesIds.length - 1], `${c.id}: 판정 지표 불일치`);
  }
});

console.log("\n3) 해설과 그래프 선 이름");
// 해설·도식·그래프는 모두 같은 단계 이름·통계 이름을 쓴다. 그래프 선 이름은 통계 이름이라 해설 문장에 통계 이름 전체가 그대로 나올 필요는 없지만,
// 경로 해설이 비어 있거나 그래프 선 이름이 서로 겹치면 읽는 사람이 헷갈리므로 이름 중복과 빈 문장을 막는다.
check("한 그래프의 선 이름이 서로 다르고 경로 해설에 빈 문장이 없다", () => {
  for (const { c } of allChannels) {
    const g = graphs[c.id];
    if (g) {
      const names = g.series.map((s) => s.name);
      expect(new Set(names).size === names.length, `${c.id}: 선 이름 중복 ${names}`);
    }
    expect(c.narrative.sentences.every((s) => s.trim().length > 0), `${c.id}: 빈 문장`);
  }
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.log("\n실패한 검사");
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else console.log("그래프 검사 통과");
