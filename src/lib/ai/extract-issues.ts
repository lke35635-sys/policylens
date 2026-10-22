// Design Ref: §4.2 단계 ③ 이슈 찾기 — 브라우저가 꺼낸 기사 글자에서 이슈를 기사 순서대로 최대 9개 뽑는다 (PLAN 9번).
// 글자 수를 서버가 한 번 더 검사하고, AI의 답은 Zod로 검사한다. 글자는 AI에 보내는 동안만 쓰고 저장하지 않는다.
import { askAi, openAiComplete } from "./client";
import type { AiComplete } from "./client";
import { ApiError } from "./errors";
import { MAX_TEXT_CHARS } from "./limits";
import { ISSUES_SYSTEM, issuesUserMessage } from "./prompts";
import { issuesAnswerSchema } from "./schemas";
import { limitIssues } from "../stress/batches";

export interface ExtractedIssue {
  id: string;
  title: string;
  excerpt: string; // 이슈와 관련된 기사 문단
}

// 화면에 넘기기 전에 AI가 길게 쓴 것을 자른다 (카드가 길어지는 것을 막는 안전장치)
const MAX_TITLE_CHARS = 80;
const MAX_EXCERPT_CHARS = 1000;

export async function extractIssues(
  text: string,
  complete: AiComplete = openAiComplete,
): Promise<{ issues: ExtractedIssue[]; overflow: number }> {
  if (text.length > MAX_TEXT_CHARS) throw new ApiError("TEXT_TOO_LONG");
  if (text.trim().length === 0) throw new ApiError("NO_ISSUE");

  let answer;
  try {
    answer = await askAi({ system: ISSUES_SYSTEM, user: issuesUserMessage(text) }, issuesAnswerSchema, complete);
  } catch {
    throw new ApiError("AI_FAILED");
  }

  // 이슈는 기사에 나온 순서대로 최대 9개 (PRD 5번). 넘친 수는 화면에서 알릴 수 있게 함께 돌려준다.
  const { items, overflow } = limitIssues(answer.issues);
  if (items.length === 0) throw new ApiError("NO_ISSUE");

  return {
    issues: items.map((issue, i) => ({
      id: `issue-${i + 1}`,
      title: issue.title.slice(0, MAX_TITLE_CHARS),
      excerpt: issue.excerpt.slice(0, MAX_EXCERPT_CHARS),
    })),
    overflow,
  };
}
