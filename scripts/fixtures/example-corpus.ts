// 검사 도구를 시험하기 위한 가짜 자료집이다. 앱에는 들어가지 않고(src/data가 아님), 실제 정책·기관·주소가 아니다.
// "규칙을 지킨 자료"가 검사를 통과하고, 여기서 한 군데씩 망가뜨린 자료가 걸리는지 check-corpus.mjs가 확인하는 데 쓴다.
import type { Corpus, Source } from "../../src/lib/corpus/types.ts";

// 시험용 출처: 주소는 example.com (실제 자료 아님)
const source = (title: string, date: string, extra: Partial<Source> = {}): Source => ({
  institution: "한국은행",
  institutionType: "한국은행",
  title,
  date,
  url: `https://example.com/${encodeURIComponent(title)}`,
  checkedAt: "2026-10-22",
  ...extra,
});

const history = (prefix: string, rows: [string, string, string?][]) =>
  rows.map(([date, summary, governmentId], i) => ({
    id: `${prefix}-h${i + 1}`,
    date,
    title: `${prefix} 변경 ${i + 1}`,
    summary,
    sources: [source(`${prefix} 문서 ${i + 1}`, date)],
    ...(governmentId ? { governmentId } : {}),
  }));

// 2018-01 ~ 2026-12 월별 시험 통계
const months: { period: string; value: number }[] = [];
for (let y = 2018; y <= 2026; y += 1) for (let m = 1; m <= 12; m += 1) months.push({ period: `${y}-${String(m).padStart(2, "0")}`, value: (y - 2018) * 12 + m });

const series = (id: string) => ({ id, name: `시험 통계 ${id}`, unit: "%", frequency: "monthly" as const, source: source(`시험 통계 ${id}`, "2026-10-01"), points: months });

const narrative = (n: number) => ({
  sentences: Array.from({ length: n }, (_, i) => `시험 문장 ${i + 1}번은 짧게 쓴 한 문장이다.`),
  sources: [source("시험 해설 근거", "2024-01-01")],
});

const step = (id: string, seriesId?: string) => ({
  id,
  label: `단계 ${id}`,
  explanation: `단계 ${id}의 시험 설명이다.`,
  source: source(`단계 ${id} 근거`, "2024-02-01"),
  ...(seriesId ? { seriesId } : {}),
});

export const EXAMPLE_CORPUS: Corpus = {
  governments: [
    { id: "gov-a", name: "시험 정부 A", president: "가상 대통령 A", start: "1998-02-25", end: "2013-02-24", stance: { quote: "시험용 기조 문장이다.", source: source("시험 경제정책방향 A", "1999-01-01", { license: "시험용 이용 조건" }) } },
    { id: "gov-b", name: "시험 정부 B", president: "가상 대통령 B", start: "2013-02-25", end: null, stance: { source: source("시험 경제정책방향 B", "2014-01-01", { license: "시험용 이용 조건" }) } },
  ],
  policies: [
    {
      id: "ex-domestic",
      scope: "domestic",
      field: "통화",
      name: "예시 국내 정책",
      aliases: ["EX-D"],
      keywords: ["시험"],
      firstEffectiveDate: "1995-03-01",
      asOf: "2022-05-01",
      lastCheckedAt: "2026-10-22",
      officialSite: { institution: "한국은행", url: "https://example.com/bok" },
      foreignPolicyId: "ex-foreign",
      history: history("ex-domestic", [
        ["1995-03-01", "시험 정책이 처음 시행되었다."],
        ["2000-06-01", "시험 정책의 기준이 한 번 바뀌었다.", "gov-a"],
        ["2010-09-01", "시험 정책의 대상이 넓어졌다.", "gov-a"],
        ["2015-04-01", "시험 정책의 한도가 조정되었다.", "gov-b"],
        ["2022-05-01", "시험 정책이 다시 개정되었다.", "gov-b"],
      ]),
    },
    {
      id: "ex-foreign",
      scope: "foreign",
      field: "통화",
      name: "예시 해외 정책",
      aliases: ["EX-F"],
      keywords: ["시험"],
      firstEffectiveDate: "2022-03-17",
      asOf: "2023-07-26",
      lastCheckedAt: "2026-10-22",
      officialSite: { institution: "해외 중앙은행", url: "https://example.com/foreign" },
      domesticPolicyId: "ex-domestic",
      history: history("ex-foreign", [
        ["2019-01-10", "해외 시험 정책이 발표되었다."],
        ["2020-03-15", "해외 시험 정책이 한 번 확대되었다."],
        ["2022-03-17", "해외 시험 정책이 본격 시행되었다."],
        ["2022-12-14", "해외 시험 정책의 폭이 조정되었다."],
        ["2023-07-26", "해외 시험 정책이 마지막으로 조정되었다."],
      ]),
    },
  ],
  series: [series("s1"), series("s2"), series("s3")],
  transmission: [
    {
      foreignPolicyId: "ex-foreign",
      summary: narrative(3),
      channels: [
        { id: "c1", name: "시험 경로 1", narrative: narrative(3), steps: [step("a", "s1"), step("b", "s2"), step("c")], chart: { seriesIds: ["s1", "s2"] }, assessment: { unclear: true, change: 0.5, stdev: 1.0, stdevPeriod: "2012-03 ~ 2022-02", computedAt: "2026-10-22" } },
        { id: "c2", name: "시험 경로 2", narrative: narrative(4), steps: [step("d", "s2"), step("e", "s3"), step("f", "s1")], chart: { seriesIds: ["s2", "s3", "s1"] } },
        { id: "c3", name: "시험 경로 3", narrative: narrative(6), steps: [step("g", "s3"), step("h")] },
      ],
    },
  ],
};
