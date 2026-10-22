// 이 파일은 scripts/build-assessment.mjs가 2026-10-23에 만들었다. 손으로 고치지 않는다.
// 경로별 "뚜렷한 연관 없음" 판정 값 (계산식은 src/lib/corpus/assessment.ts). 화면은 이 값을 읽기만 한다.
import type { Assessment } from "../../lib/corpus/types";
export const ASSESSMENTS: Record<string, Assessment> = {
  "fed-funds-rate-c1": {
    "seriesId": "EXKOUS",
    "unclear": true,
    "change": 3.552983,
    "stdev": 67.585221,
    "stdevPeriod": "1984-02 ~ 1994-01",
    "computedAt": "2026-10-23"
  },
  "fed-funds-rate-c2": {
    "seriesId": "GS10",
    "unclear": true,
    "change": 1.571667,
    "stdev": 1.824901,
    "stdevPeriod": "1984-02 ~ 1994-01",
    "computedAt": "2026-10-23"
  },
  "fed-funds-rate-c3": {
    "seriesId": "SPASTT01KRM661N",
    "unclear": true,
    "change": 11.302607,
    "stdev": 13.42271,
    "stdevPeriod": "1984-02 ~ 1994-01",
    "computedAt": "2026-10-23"
  },
  "fed-qe-qt-c1": {
    "seriesId": "IRLTLT01KRM156N",
    "unclear": true,
    "change": 0.508333,
    "stdev": 0.923654,
    "stdevPeriod": "2000-10 ~ 2008-10",
    "computedAt": "2026-10-23"
  },
  "fed-qe-qt-c2": {
    "seriesId": "EXKOUS",
    "unclear": false,
    "change": 266.886417,
    "stdev": 125.020379,
    "stdevPeriod": "1998-11 ~ 2008-10",
    "computedAt": "2026-10-23"
  },
  "fed-qe-qt-c3": {
    "seriesId": "SPASTT01KRM661N",
    "unclear": true,
    "change": 14.438928,
    "stdev": 20.262637,
    "stdevPeriod": "1998-11 ~ 2008-10",
    "computedAt": "2026-10-23"
  },
  "pboc-monetary-c1": {
    "seriesId": "EXKOUS",
    "unclear": false,
    "change": 56.226025,
    "stdev": 44.161353,
    "stdevPeriod": "2009-08 ~ 2019-07",
    "computedAt": "2026-10-23"
  },
  "pboc-monetary-c2": {
    "seriesId": "KORLOLITOAASTSAM",
    "unclear": true,
    "change": 0.009874,
    "stdev": 1.02053,
    "stdevPeriod": "2009-08 ~ 2019-07",
    "computedAt": "2026-10-23"
  },
  "pboc-monetary-c3": {
    "seriesId": "XTEXVA01KRM667S",
    "unclear": false,
    "change": 5.77255,
    "stdev": 4.4132,
    "stdevPeriod": "2009-08 ~ 2019-07",
    "computedAt": "2026-10-23"
  },
  "us-tariffs-c1": {
    "seriesId": "XTEXVA01KRM667S",
    "unclear": true,
    "change": 0.621641,
    "stdev": 6.123902,
    "stdevPeriod": "2008-03 ~ 2018-02",
    "computedAt": "2026-10-23"
  },
  "us-tariffs-c2": {
    "seriesId": "KORLOLITOAASTSAM",
    "unclear": false,
    "change": 1.474928,
    "stdev": 1.329608,
    "stdevPeriod": "2008-03 ~ 2018-02",
    "computedAt": "2026-10-23"
  },
  "us-tariffs-c3": {
    "seriesId": "KORLOLITOAASTSAM",
    "unclear": false,
    "change": 1.474928,
    "stdev": 1.329608,
    "stdevPeriod": "2008-03 ~ 2018-02",
    "computedAt": "2026-10-23"
  },
  "us-china-trade-conflict-c1": {
    "seriesId": "KORLOLITOAASTSAM",
    "unclear": true,
    "change": 1.268589,
    "stdev": 1.275279,
    "stdevPeriod": "2008-07 ~ 2018-06",
    "computedAt": "2026-10-23"
  },
  "us-china-trade-conflict-c2": {
    "seriesId": "SPASTT01KRM661N",
    "unclear": true,
    "change": 14.372517,
    "stdev": 14.889426,
    "stdevPeriod": "2008-07 ~ 2018-06",
    "computedAt": "2026-10-23"
  },
  "us-china-trade-conflict-c3": {
    "seriesId": "XTEXVA01KRM667S",
    "unclear": true,
    "change": 1.517918,
    "stdev": 6.145637,
    "stdevPeriod": "2008-07 ~ 2018-06",
    "computedAt": "2026-10-23"
  },
  "japan-export-control-c1": {
    "seriesId": "XTEXVA01KRM667S",
    "unclear": false,
    "change": 5.91937,
    "stdev": 4.577899,
    "stdevPeriod": "2009-07 ~ 2019-06",
    "computedAt": "2026-10-23"
  },
  "japan-export-control-c3": {
    "seriesId": "XTIMVA01KRM667S",
    "unclear": true,
    "change": 3.941154,
    "stdev": 4.751303,
    "stdevPeriod": "2009-07 ~ 2019-06",
    "computedAt": "2026-10-23"
  },
  "japan-export-control-c4": {
    "seriesId": "SPASTT01KRM661N",
    "unclear": true,
    "change": 5.964726,
    "stdev": 10.613743,
    "stdevPeriod": "2009-07 ~ 2019-06",
    "computedAt": "2026-10-23"
  }
};
