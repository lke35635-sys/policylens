// Design Ref: §6 폴더 구조 lib/ai, §7 보안 — 서버에서 AI(OpenAI)를 부르는 공통 함수 (PLAN 8번).
// - AI 키(OPENAI_API_KEY)는 이 파일에서만, 서버가 호출할 때만 읽는다. 이름에 NEXT_PUBLIC_을 붙이지 않고 브라우저 코드에서 가져다 쓰지 않는다.
// - AI의 답은 JSON으로 받아 Zod로 모양을 검사한다. 호출이 실패하거나 모양이 틀리면 자동으로 1번 다시 시도하고, 그래도 안 되면 AI_FAILED로 끝낸다.
// - AI는 기사 읽기(요약·유형·충격 크기)에만 쓴다. 변수별 수치는 lib/stress가 계산한다 (PRD 핵심 규칙).
import OpenAI from "openai";
import type { ZodType } from "zod";

export type AiErrorCode = "AI_FAILED";

// 화면에 보여 줄 수 있는 오류. 키·서버 내부 내용은 담지 않는다.
export class AiError extends Error {
  readonly code: AiErrorCode = "AI_FAILED";
  constructor(message = "분석에 실패했습니다. 다시 시도해 주세요.") {
    super(message);
    this.name = "AiError";
  }
}

export interface AiRequest {
  system: string; // AI에게 주는 역할·규칙 (lib/ai/prompts.ts)
  user: string; // 분석할 글 (기사 글자 또는 이슈 문단)
}

// AI에게 질문을 보내고 글자로 된 답을 돌려주는 함수. 시험에서는 가짜로 바꿔 끼운다.
export type AiComplete = (request: AiRequest) => Promise<string>;

export const MAX_ATTEMPTS = 2; // 처음 1번 + 자동 재시도 1번
const TIMEOUT_MS = 25_000; // 서버리스 함수의 시간 제한 안에서 끝나도록 한 번에 25초까지만 기다린다
const DEFAULT_MODEL = "gpt-4o-mini"; // .env의 OPENAI_MODEL로 바꿀 수 있다

// 다시 시도해도 소용없는 문제(키가 없음)를 구분하는 표시
class NotRetryable extends AiError {}

export const openAiComplete: AiComplete = async ({ system, user }) => {
  if (typeof window !== "undefined") throw new NotRetryable(); // 브라우저에서는 절대 부르지 않는다
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new NotRetryable(); // 키가 비어 있으면 호출하지 않는다 (키 값은 어디에도 출력하지 않는다)

  // 재시도는 아래 askAi가 정확히 1번만 하므로, 라이브러리 자체의 재시도는 끈다
  const client = new OpenAI({ apiKey, maxRetries: 0, timeout: TIMEOUT_MS });
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    temperature: 0, // 같은 글에는 같은 답이 나오게 한다
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  return response.choices[0]?.message?.content ?? "";
};

// AI에게 묻고, 답이 약속한 모양(schema)인지 검사해서 돌려준다.
// 실패(호출 오류, JSON이 아님, 모양이 다름)하면 한 번 더 시도하고, 그래도 안 되면 AiError를 던진다.
export async function askAi<T>(request: AiRequest, schema: ZodType<T>, complete: AiComplete = openAiComplete): Promise<T> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const text = await complete(request);
      const parsed = schema.safeParse(JSON.parse(text));
      if (parsed.success) return parsed.data;
    } catch (error) {
      if (error instanceof NotRetryable) throw new AiError();
      // 호출 실패나 JSON이 아닌 답: 아래에서 다시 시도한다
    }
  }
  throw new AiError();
}
