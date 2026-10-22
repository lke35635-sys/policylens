// Design Ref: §7 폴더 구조 src/data — 사람이 조사해 출처와 함께 고정한 자료집. 화면·계산과 무관한 자료만 둔다.
// 지금(PLAN 2번)은 비어 있다. 정부 표는 3번, 정책 연혁은 4~7번, 파급경로는 9번, 통계는 8번에서 채운다.
// 자료는 이 파일에서 하나로 모아 내보내고, 모양은 lib/corpus/schema.ts가, 규칙은 lib/corpus/verify.ts가 검사한다.
import type { Corpus } from "../lib/corpus/types";

export const CORPUS: Corpus = {
  policies: [],
  governments: [],
  transmission: [],
  series: [],
};
