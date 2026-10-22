// Design Ref: §7 폴더 구조 src/data — 사람이 조사해 출처와 함께 고정한 자료집. 화면·계산과 무관한 자료만 둔다.
// 지금(PLAN 9번)은 정부 표(governments.ts), 통화정책 6개(policies/monetary.ts), 무역·관세 정책 6개(policies/trade.ts), 재정·세제 정책 3개(policies/fiscal.ts), 부동산·금융규제 정책 3개(policies/realestate.ts)가 채워져 있다. 통계 24개(series/, 스크립트로 내려받아 고정)가 채워져 있고 해외 정책의 파급경로와 글 해설(transmission/)이 채워져 있다.
// 자료는 이 파일에서 하나로 모아 내보내고, 모양은 lib/corpus/schema.ts가, 규칙은 lib/corpus/verify.ts가 검사한다.
import type { Corpus } from "../lib/corpus/types";
import { GOVERNMENTS } from "./governments";
import { FISCAL_POLICIES } from "./policies/fiscal";
import { MONETARY_POLICIES } from "./policies/monetary";
import { REALESTATE_POLICIES } from "./policies/realestate";
import { TRADE_POLICIES } from "./policies/trade";
import { SERIES } from "./series/index";
import { ASSESSMENTS } from "./transmission/assessments";
import { TRANSMISSION } from "./transmission/index";

// 경로별 "뚜렷한 연관 없음" 판정 값(scripts/build-assessment.mjs가 계산해 저장)을 경로에 붙인다
const TRANSMISSION_WITH_ASSESSMENT = TRANSMISSION.map((plan) => ({
  ...plan,
  channels: plan.channels.map((c) => (ASSESSMENTS[c.id] ? { ...c, assessment: ASSESSMENTS[c.id] } : c)),
}));

export const CORPUS: Corpus = {
  policies: [...MONETARY_POLICIES, ...TRADE_POLICIES, ...FISCAL_POLICIES, ...REALESTATE_POLICIES],
  governments: GOVERNMENTS,
  transmission: TRANSMISSION_WITH_ASSESSMENT,
  series: SERIES,
};
