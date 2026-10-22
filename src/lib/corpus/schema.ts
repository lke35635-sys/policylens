// Design Ref: §5 자료 모양, §6.2 Zod — 자료집이 약속한 모양인지 검사하는 규칙 (PLAN 2번).
// 이 파일은 "모양"(빠진 칸, 글자·숫자 종류, 날짜 모양)만 본다. "규칙"(연혁 5건 이상, 출처 허용 기관, 날짜 순서 등)은 verify.ts가 본다.
// 자료 파일(src/data)은 이 모양을 따라야 하고, types.ts의 타입은 여기서 만들어진다 (모양을 한 곳에서만 정의).
import { z } from "zod";

// 날짜 모양: 2022-08-25 처럼 연-월-일이고 실제로 있는 날짜여야 한다
export const DATE = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD 모양이어야 합니다")
  .refine((s) => !Number.isNaN(Date.parse(`${s}T00:00:00Z`)) && new Date(`${s}T00:00:00Z`).toISOString().startsWith(s), "없는 날짜입니다");

const HTTPS_URL = z.string().refine((s) => {
  try {
    return new URL(s).protocol === "https:";
  } catch {
    return false;
  }
}, "https 주소여야 합니다");

const NONEMPTY = z.string().trim().min(1, "비어 있을 수 없습니다");

// 허용하는 출처 기관의 종류 (PRD "공식 자료"의 정의). 국책연구원·언론은 허용하지 않는다.
export const INSTITUTION_TYPES = ["정부 부처", "한국은행", "국회", "국제기구", "해외 중앙은행", "해외 정부 기관"] as const;

export const sourceSchema = z.object({
  institution: NONEMPTY, // 기관명 (예: 한국은행, IMF)
  institutionType: z.enum(INSTITUTION_TYPES), // 기관의 종류 (허용 목록 검사용)
  title: NONEMPTY, // 문서명 또는 통계명
  date: DATE, // 문서 날짜
  url: HTTPS_URL, // 원문 주소
  checkedAt: DATE, // 링크를 직접 열어 확인한 날
  archiveUrl: HTTPS_URL.optional(), // 보관본(웹 아카이브) 링크
  license: NONEMPTY.optional(), // 이용 조건 (예: 공공누리 1유형)
});

export const historyItemSchema = z.object({
  id: NONEMPTY,
  date: DATE, // 공식 발표일
  title: NONEMPTY,
  summary: NONEMPTY, // 공식 발표의 요약(사실). 해석은 넣지 않는다
  sources: z.array(sourceSchema).min(1, "출처가 1개 이상 있어야 합니다"),
  governmentId: NONEMPTY.optional(), // 국내 정책: 어느 정부 시기인지 (1998년 이전이면 비움)
});

export const policySchema = z.object({
  id: NONEMPTY,
  scope: z.enum(["domestic", "foreign"]),
  field: NONEMPTY, // 분야 (통화, 무역·관세, 재정·세제, 부동산·금융규제, …)
  name: NONEMPTY,
  aliases: z.array(NONEMPTY), // 영어·약어·별칭
  keywords: z.array(NONEMPTY), // 관련 이슈어
  firstEffectiveDate: DATE, // 최초 시행일 (그래프 세로선)
  asOf: DATE, // "○○까지 반영" 기준일 = 연혁에 반영한 가장 최근 변경의 날짜
  lastCheckedAt: DATE, // 마지막 확인일 = 공식 사이트를 다시 확인한 날
  officialSite: z.object({ institution: NONEMPTY, url: HTTPS_URL }),
  history: z.array(historyItemSchema),
  foreignPolicyId: NONEMPTY.optional(), // 해외 짝 (국내 정책에만)
  domesticPolicyId: NONEMPTY.optional(), // 해외 정책이 붙는 국내 정책 (해외 정책에만)
});

export const governmentSchema = z.object({
  id: NONEMPTY,
  name: NONEMPTY,
  president: NONEMPTY,
  start: DATE,
  end: DATE.nullable(), // 현재 정부는 null
  stance: z.object({
    quote: NONEMPTY.optional(), // 공식 경제정책 방향 문서의 인용 한 문장 (이용 조건이 안 맞으면 비움)
    source: sourceSchema,
  }),
});

export const narrativeSchema = z.object({
  sentences: z.array(NONEMPTY),
  sources: z.array(sourceSchema).min(1, "해설에는 출처가 1개 이상 있어야 합니다"),
});

export const stepSchema = z.object({
  id: NONEMPTY,
  label: NONEMPTY,
  explanation: NONEMPTY, // 설명(해석). 연혁이 아니라 "설명"으로 표시된다
  source: sourceSchema, // 설명의 출처 (필수)
  seriesId: NONEMPTY.optional(), // 연결한 통계. 없으면 이 단계는 "연결 통계 없음"
});

export const assessmentSchema = z.object({
  unclear: z.boolean(), // true면 "뚜렷한 연관이 보이지 않았다"
  change: z.number().nonnegative(), // 시행 직전·직후 12개월 평균 차이의 절댓값
  stdev: z.number().nonnegative(), // 시행일 이전 10년(가능한 기간) 월별 값의 표준편차
  stdevPeriod: NONEMPTY, // 표준편차에 쓴 기간 (예: 2012-08 ~ 2022-07)
  computedAt: DATE,
});

export const channelSchema = z.object({
  id: NONEMPTY,
  name: NONEMPTY, // 예: 금리 채널
  narrative: narrativeSchema, // 경로 해설 3~6문장
  steps: z.array(stepSchema),
  chart: z.object({ seriesIds: z.array(NONEMPTY) }).optional(), // 통계가 연결된 단계가 2개 미만이면 없음
  assessment: assessmentSchema.optional(),
});

export const transmissionPlanSchema = z.object({
  foreignPolicyId: NONEMPTY,
  summary: narrativeSchema, // 정책 전체 요약 문단 (500자 이내)
  channels: z.array(channelSchema),
});

export const seriesSchema = z.object({
  id: NONEMPTY,
  name: NONEMPTY,
  unit: NONEMPTY,
  frequency: z.enum(["monthly", "quarterly"]),
  source: sourceSchema, // source.checkedAt = 조회일
  points: z.array(z.object({ period: NONEMPTY, value: z.number() })),
});

export const corpusSchema = z.object({
  policies: z.array(policySchema),
  governments: z.array(governmentSchema),
  transmission: z.array(transmissionPlanSchema),
  series: z.array(seriesSchema),
});
