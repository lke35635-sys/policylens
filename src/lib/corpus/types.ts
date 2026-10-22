// Design Ref: §5 자료 모양 — 자료집의 타입. 모양은 schema.ts(Zod)가 정하고, 여기서는 그 모양에서 타입을 만들어 내보낸다.
import type { z } from "zod";
import type {
  assessmentSchema,
  channelSchema,
  corpusSchema,
  governmentSchema,
  historyItemSchema,
  narrativeSchema,
  policySchema,
  seriesSchema,
  sourceSchema,
  stepSchema,
  transmissionPlanSchema,
} from "./schema";

export type Source = z.infer<typeof sourceSchema>;
export type HistoryItem = z.infer<typeof historyItemSchema>;
export type Policy = z.infer<typeof policySchema>;
export type Government = z.infer<typeof governmentSchema>;
export type Narrative = z.infer<typeof narrativeSchema>;
export type Step = z.infer<typeof stepSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type Channel = z.infer<typeof channelSchema>;
export type TransmissionPlan = z.infer<typeof transmissionPlanSchema>;
export type Series = z.infer<typeof seriesSchema>;
export type Corpus = z.infer<typeof corpusSchema>;

// 정책이 속하는 범위
export type PolicyScope = Policy["scope"];

// 이번 사이클에서 먼저 채우는 4개 분야 (PRD 6번). 이 밖의 분야도 자료집에 추가할 수 있다.
export const CORE_FIELDS = ["통화", "무역·관세", "재정·세제", "부동산·금융규제"] as const;
