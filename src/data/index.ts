// Design Ref: §7 폴더 구조 src/data — 사람이 조사해 출처와 함께 고정한 자료집. 화면·계산과 무관한 자료만 둔다.
// 지금(PLAN 6번)은 정부 표(governments.ts), 통화정책 6개(policies/monetary.ts), 무역·관세 정책 6개(policies/trade.ts), 재정·세제 정책 3개(policies/fiscal.ts)가 채워져 있다. 나머지 분야 연혁은 7번, 통계는 8번, 파급경로는 9번에서 채운다.
// 자료는 이 파일에서 하나로 모아 내보내고, 모양은 lib/corpus/schema.ts가, 규칙은 lib/corpus/verify.ts가 검사한다.
import type { Corpus } from "../lib/corpus/types";
import { GOVERNMENTS } from "./governments";
import { MONETARY_POLICIES } from "./policies/monetary";
import { FISCAL_POLICIES } from "./policies/fiscal";
import { TRADE_POLICIES } from "./policies/trade";

export const CORPUS: Corpus = {
  policies: [...MONETARY_POLICIES, ...TRADE_POLICIES, ...FISCAL_POLICIES],
  governments: GOVERNMENTS,
  transmission: [],
  series: [],
};
