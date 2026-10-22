// Design Ref: §4.4 POST /api/issues — 브라우저가 PDF에서 꺼낸 글자를 받아 이슈 목록(최대 9개)을 돌려준다 (PLAN 9번).
// 받는 것: { text, truncated } / 돌려주는 것: { issues[], overflow, truncated } 또는 { error: { code, message } }.
// 글자는 이 요청 안에서만 쓰고 저장하거나 기록하지 않는다. AI 키는 lib/ai/client.ts가 서버에서만 읽는다.
import { ApiError, errorResponse } from "@/lib/ai/errors";
import { extractIssues } from "@/lib/ai/extract-issues";
import { MAX_TEXT_CHARS } from "@/lib/ai/limits";

export async function POST(request: Request): Promise<Response> {
  // 본문이 너무 크면 읽기 전에 거절한다 (한국어 글자는 UTF-8에서 최대 3바이트, JSON 여유 포함)
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_TEXT_CHARS * 3 + 1024) return errorResponse("TEXT_TOO_LONG");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("BAD_REQUEST");
  }
  const { text, truncated } = (body ?? {}) as { text?: unknown; truncated?: unknown };
  if (typeof text !== "string") return errorResponse("BAD_REQUEST");

  try {
    const { issues, overflow } = await extractIssues(text);
    return Response.json({ issues, overflow, truncated: truncated === true });
  } catch (error) {
    if (error instanceof ApiError) return errorResponse(error.code);
    return errorResponse("AI_FAILED"); // 알 수 없는 오류도 내부 내용 없이 같은 문구로 끝낸다
  }
}
