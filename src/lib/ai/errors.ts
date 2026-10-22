// Design Ref: §4.4 서버 주소 오류 — 서버 주소가 돌려주는 오류 코드와 화면에 보이는 문구. 오류는 항상 { error: { code, message } } 모양이다.
// 문구에는 AI의 답, 키, 서버 내부 내용을 넣지 않는다.
export const API_ERRORS = {
  BAD_REQUEST: { status: 400, message: "요청 형식이 올바르지 않습니다." },
  NO_ISSUE: { status: 422, message: "분석할 수 있는 이슈가 없습니다." },
  TEXT_TOO_LONG: { status: 413, message: "요청이 너무 깁니다." },
  TOO_MANY_ISSUES: { status: 413, message: "한 번에 분석할 수 있는 이슈 수를 넘었습니다." },
  AI_FAILED: { status: 502, message: "분석에 실패했습니다. 다시 시도해 주세요." },
} as const;

export type ApiErrorCode = keyof typeof API_ERRORS;

// 서버 주소 코드 안에서 던지고 route.ts에서 응답으로 바꾸는 오류
export class ApiError extends Error {
  readonly code: ApiErrorCode;
  constructor(code: ApiErrorCode) {
    super(API_ERRORS[code].message);
    this.name = "ApiError";
    this.code = code;
  }
}

export function errorResponse(code: ApiErrorCode): Response {
  return Response.json({ error: { code, message: API_ERRORS[code].message } }, { status: API_ERRORS[code].status });
}
