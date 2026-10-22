// 판정 계산·검사에 쓰는 원자료 (판정이 섞이기 전의 경로·정책·통계). build-assessment.mjs와 check-assessment.mjs가 함께 쓴다.
export { TRANSMISSION as TRANSMISSION_FOR_ASSESSMENT } from "../src/data/transmission/index.ts";
export { SERIES as SERIES_FOR_ASSESSMENT } from "../src/data/series/index.ts";
import { FISCAL_POLICIES } from "../src/data/policies/fiscal.ts";
import { MONETARY_POLICIES } from "../src/data/policies/monetary.ts";
import { REALESTATE_POLICIES } from "../src/data/policies/realestate.ts";
import { TRADE_POLICIES } from "../src/data/policies/trade.ts";
export const POLICIES_FOR_ASSESSMENT = [...MONETARY_POLICIES, ...TRADE_POLICIES, ...FISCAL_POLICIES, ...REALESTATE_POLICIES];
