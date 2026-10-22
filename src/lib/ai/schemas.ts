// Design Ref: §6 lib/ai/schemas.ts — AI가 약속한 모양으로 답했는지 검사하는 규칙 (Zod). 모양이 맞지 않으면 client.ts가 1번 다시 시도한다.
import { z } from "zod";

// 단계 ③ 이슈 찾기: 기사에 나온 순서대로 이슈 제목과 관련 문단. 이슈가 없으면 빈 배열.
export const issuesAnswerSchema = z.object({
  issues: z.array(
    z.object({
      title: z.string().trim().min(1),
      excerpt: z.string().trim().min(1),
    }),
  ),
});

export type IssuesAnswer = z.infer<typeof issuesAnswerSchema>;
