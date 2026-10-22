// 이 파일은 PLAN 9번 작업에서 해외 정책별 파일을 모아 내보낸다. 정책별 파일은 scripts 밖 조사 결과(근거 문장)를 옮겨 만든 것이다.
import type { TransmissionPlan } from "../../lib/corpus/types";
import { TX_FED_FUNDS_RATE } from "./fed-funds-rate";
import { TX_FED_QE_QT } from "./fed-qe-qt";
import { TX_PBOC_MONETARY } from "./pboc-monetary";
import { TX_US_TARIFFS } from "./us-tariffs";
import { TX_US_CHINA_TRADE_CONFLICT } from "./us-china-trade-conflict";
import { TX_JAPAN_EXPORT_CONTROL } from "./japan-export-control";

export const TRANSMISSION: TransmissionPlan[] = [TX_FED_FUNDS_RATE, TX_FED_QE_QT, TX_PBOC_MONETARY, TX_US_TARIFFS, TX_US_CHINA_TRADE_CONFLICT, TX_JAPAN_EXPORT_CONTROL];
