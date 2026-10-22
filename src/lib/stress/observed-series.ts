// 이 파일은 scripts/fetch-observed-series.mjs가 각 기관(IMF, BIS, OECD·FRED)의 최신 자료에서 내려받아 만든다. 직접 고치지 않는다.
// 시점별 그래프(PLAN 6번)의 "과거 실제" 구간에 쓰는 한국 월별 통계다.
import type { ObservedSeries, VariableKey } from "./types";

export const OBSERVED_META = {
  "generatedAt": "2026-10-22",
  "baseMonth": "2026-09",
  "pastMonths": 36,
  "gdpLastQuarter": "2026-Q2",
  "note": "각 기관이 공개한 가장 최근 월까지의 자료다. 앱은 실행 중에 통계를 부르지 않고 이 파일의 고정값을 쓴다. 새 자료를 쓰려면 스크립트를 다시 실행한다."
};

export const OBSERVED_SERIES: Record<VariableKey, ObservedSeries> = {
  "gdp": {
    "variable": "gdp",
    "unit": "%",
    "derivation": "OECD 분기 실질 GDP의 전년 동기 대비 성장률(계절조정). 같은 분기의 세 달에 같은 값이고, 아직 발표되지 않은 분기의 달은 마지막 발표 분기(2026-Q2)의 값을 유지",
    "points": [
      {
        "month": "2023-09",
        "value": 1.4665
      },
      {
        "month": "2023-10",
        "value": 2.6181
      },
      {
        "month": "2023-11",
        "value": 2.6181
      },
      {
        "month": "2023-12",
        "value": 2.6181
      },
      {
        "month": "2024-01",
        "value": 3.4279
      },
      {
        "month": "2024-02",
        "value": 3.4279
      },
      {
        "month": "2024-03",
        "value": 3.4279
      },
      {
        "month": "2024-04",
        "value": 2.5683
      },
      {
        "month": "2024-05",
        "value": 2.5683
      },
      {
        "month": "2024-06",
        "value": 2.5683
      },
      {
        "month": "2024-07",
        "value": 1.6533
      },
      {
        "month": "2024-08",
        "value": 1.6533
      },
      {
        "month": "2024-09",
        "value": 1.6533
      },
      {
        "month": "2024-10",
        "value": 1.1543
      },
      {
        "month": "2024-11",
        "value": 1.1543
      },
      {
        "month": "2024-12",
        "value": 1.1543
      },
      {
        "month": "2025-01",
        "value": -0.0325
      },
      {
        "month": "2025-02",
        "value": -0.0325
      },
      {
        "month": "2025-03",
        "value": -0.0325
      },
      {
        "month": "2025-04",
        "value": 0.7692
      },
      {
        "month": "2025-05",
        "value": 0.7692
      },
      {
        "month": "2025-06",
        "value": 0.7692
      },
      {
        "month": "2025-07",
        "value": 2.0851
      },
      {
        "month": "2025-08",
        "value": 2.0851
      },
      {
        "month": "2025-09",
        "value": 2.0851
      },
      {
        "month": "2025-10",
        "value": 1.7339
      },
      {
        "month": "2025-11",
        "value": 1.7339
      },
      {
        "month": "2025-12",
        "value": 1.7339
      },
      {
        "month": "2026-01",
        "value": 3.7755
      },
      {
        "month": "2026-02",
        "value": 3.7755
      },
      {
        "month": "2026-03",
        "value": 3.7755
      },
      {
        "month": "2026-04",
        "value": 3.7593
      },
      {
        "month": "2026-05",
        "value": 3.7593
      },
      {
        "month": "2026-06",
        "value": 3.7593
      },
      {
        "month": "2026-07",
        "value": 3.7593
      },
      {
        "month": "2026-08",
        "value": 3.7593
      },
      {
        "month": "2026-09",
        "value": 3.7593
      }
    ],
    "source": {
      "institution": "OECD (FRED 경유)",
      "title": "Real GDP for Korea, 전년 동기 대비 증가율, 계절조정, 분기 (KORGDPRQPSMEI)",
      "date": "2026-10-22",
      "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=KORGDPRQPSMEI",
      "via": "FRED 직접 조회 (조회일 2026-10-22)"
    }
  },
  "cpi": {
    "variable": "cpi",
    "unit": "%",
    "derivation": "IMF 소비자물가지수(전 품목)의 전년 동월 대비 상승률",
    "points": [
      {
        "month": "2023-09",
        "value": 3.7034
      },
      {
        "month": "2023-10",
        "value": 3.7651
      },
      {
        "month": "2023-11",
        "value": 3.3098
      },
      {
        "month": "2023-12",
        "value": 3.1759
      },
      {
        "month": "2024-01",
        "value": 2.8164
      },
      {
        "month": "2024-02",
        "value": 3.127
      },
      {
        "month": "2024-03",
        "value": 3.1035
      },
      {
        "month": "2024-04",
        "value": 2.925
      },
      {
        "month": "2024-05",
        "value": 2.6725
      },
      {
        "month": "2024-06",
        "value": 2.4109
      },
      {
        "month": "2024-07",
        "value": 2.5519
      },
      {
        "month": "2024-08",
        "value": 2.0128
      },
      {
        "month": "2024-09",
        "value": 1.595
      },
      {
        "month": "2024-10",
        "value": 1.2536
      },
      {
        "month": "2024-11",
        "value": 1.5264
      },
      {
        "month": "2024-12",
        "value": 1.9338
      },
      {
        "month": "2025-01",
        "value": 2.2444
      },
      {
        "month": "2025-02",
        "value": 2.0214
      },
      {
        "month": "2025-03",
        "value": 2.0535
      },
      {
        "month": "2025-04",
        "value": 2.0788
      },
      {
        "month": "2025-05",
        "value": 1.9018
      },
      {
        "month": "2025-06",
        "value": 2.1697
      },
      {
        "month": "2025-07",
        "value": 2.0941
      },
      {
        "month": "2025-08",
        "value": 1.6675
      },
      {
        "month": "2025-09",
        "value": 2.102
      },
      {
        "month": "2025-10",
        "value": 2.3803
      },
      {
        "month": "2025-11",
        "value": 2.4476
      },
      {
        "month": "2025-12",
        "value": 2.3149
      },
      {
        "month": "2026-01",
        "value": 2.005
      },
      {
        "month": "2026-02",
        "value": 1.9986
      },
      {
        "month": "2026-03",
        "value": 2.1584
      },
      {
        "month": "2026-04",
        "value": 2.5692
      },
      {
        "month": "2026-05",
        "value": 3.1392
      },
      {
        "month": "2026-06",
        "value": 3.164
      },
      {
        "month": "2026-07",
        "value": 2.7892
      },
      {
        "month": "2026-08",
        "value": 3.0915
      },
      {
        "month": "2026-09",
        "value": 2.8789
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "소비자물가지수(CPI), 한국, 전 품목, 월별 (IMF.STA CPI)",
      "date": "2026-10-22",
      "url": "https://api.imf.org/external/sdmx/2.1/data/IMF.STA,CPI/KOR.CPI._T.IX.M?startPeriod=2022-01",
      "via": "IMF 데이터 서비스 직접 조회 (조회일 2026-10-22)"
    }
  },
  "policyRate": {
    "variable": "policyRate",
    "unit": "%",
    "derivation": "한국은행 기준금리 그대로 (월말 기준)",
    "points": [
      {
        "month": "2023-09",
        "value": 3.5
      },
      {
        "month": "2023-10",
        "value": 3.5
      },
      {
        "month": "2023-11",
        "value": 3.5
      },
      {
        "month": "2023-12",
        "value": 3.5
      },
      {
        "month": "2024-01",
        "value": 3.5
      },
      {
        "month": "2024-02",
        "value": 3.5
      },
      {
        "month": "2024-03",
        "value": 3.5
      },
      {
        "month": "2024-04",
        "value": 3.5
      },
      {
        "month": "2024-05",
        "value": 3.5
      },
      {
        "month": "2024-06",
        "value": 3.5
      },
      {
        "month": "2024-07",
        "value": 3.5
      },
      {
        "month": "2024-08",
        "value": 3.5
      },
      {
        "month": "2024-09",
        "value": 3.5
      },
      {
        "month": "2024-10",
        "value": 3.25
      },
      {
        "month": "2024-11",
        "value": 3
      },
      {
        "month": "2024-12",
        "value": 3
      },
      {
        "month": "2025-01",
        "value": 3
      },
      {
        "month": "2025-02",
        "value": 2.75
      },
      {
        "month": "2025-03",
        "value": 2.75
      },
      {
        "month": "2025-04",
        "value": 2.75
      },
      {
        "month": "2025-05",
        "value": 2.5
      },
      {
        "month": "2025-06",
        "value": 2.5
      },
      {
        "month": "2025-07",
        "value": 2.5
      },
      {
        "month": "2025-08",
        "value": 2.5
      },
      {
        "month": "2025-09",
        "value": 2.5
      },
      {
        "month": "2025-10",
        "value": 2.5
      },
      {
        "month": "2025-11",
        "value": 2.5
      },
      {
        "month": "2025-12",
        "value": 2.5
      },
      {
        "month": "2026-01",
        "value": 2.5
      },
      {
        "month": "2026-02",
        "value": 2.5
      },
      {
        "month": "2026-03",
        "value": 2.5
      },
      {
        "month": "2026-04",
        "value": 2.5
      },
      {
        "month": "2026-05",
        "value": 2.5
      },
      {
        "month": "2026-06",
        "value": 2.5
      },
      {
        "month": "2026-07",
        "value": 2.75
      },
      {
        "month": "2026-08",
        "value": 3
      },
      {
        "month": "2026-09",
        "value": 3
      }
    ],
    "source": {
      "institution": "BIS",
      "title": "중앙은행 정책금리: 한국은행 기준금리, 월말 (WS_CBPOL)",
      "date": "2026-10-22",
      "url": "https://stats.bis.org/api/v1/data/WS_CBPOL/M.KR?startPeriod=2022-01&format=csv",
      "via": "BIS 데이터 서비스 직접 조회 (조회일 2026-10-22)"
    }
  },
  "fx": {
    "variable": "fx",
    "unit": "원",
    "derivation": "원/달러 월평균 환율 그대로 (미 연준 H.10)",
    "points": [
      {
        "month": "2023-09",
        "value": 1334.237
      },
      {
        "month": "2023-10",
        "value": 1351.5071
      },
      {
        "month": "2023-11",
        "value": 1308.154
      },
      {
        "month": "2023-12",
        "value": 1304.3945
      },
      {
        "month": "2024-01",
        "value": 1325.9119
      },
      {
        "month": "2024-02",
        "value": 1331.3345
      },
      {
        "month": "2024-03",
        "value": 1331.6752
      },
      {
        "month": "2024-04",
        "value": 1367.8555
      },
      {
        "month": "2024-05",
        "value": 1364.7241
      },
      {
        "month": "2024-06",
        "value": 1379.0526
      },
      {
        "month": "2024-07",
        "value": 1382.0473
      },
      {
        "month": "2024-08",
        "value": 1351.4436
      },
      {
        "month": "2024-09",
        "value": 1330.6985
      },
      {
        "month": "2024-10",
        "value": 1362.3691
      },
      {
        "month": "2024-11",
        "value": 1395.02
      },
      {
        "month": "2024-12",
        "value": 1439.9967
      },
      {
        "month": "2025-01",
        "value": 1452.1919
      },
      {
        "month": "2025-02",
        "value": 1444.7932
      },
      {
        "month": "2025-03",
        "value": 1458.3452
      },
      {
        "month": "2025-04",
        "value": 1439.7777
      },
      {
        "month": "2025-05",
        "value": 1391.4376
      },
      {
        "month": "2025-06",
        "value": 1364.6775
      },
      {
        "month": "2025-07",
        "value": 1379.2959
      },
      {
        "month": "2025-08",
        "value": 1388.999
      },
      {
        "month": "2025-09",
        "value": 1392.9052
      },
      {
        "month": "2025-10",
        "value": 1423.0795
      },
      {
        "month": "2025-11",
        "value": 1459.8789
      },
      {
        "month": "2025-12",
        "value": 1465.355
      },
      {
        "month": "2026-01",
        "value": 1455.496
      },
      {
        "month": "2026-02",
        "value": 1447.2858
      },
      {
        "month": "2026-03",
        "value": 1490.5177
      },
      {
        "month": "2026-04",
        "value": 1483.7977
      },
      {
        "month": "2026-05",
        "value": 1488.396
      },
      {
        "month": "2026-06",
        "value": 1529.4619
      },
      {
        "month": "2026-07",
        "value": 1486.0132
      },
      {
        "month": "2026-08",
        "value": 1403.2186
      },
      {
        "month": "2026-09",
        "value": 1359.209
      }
    ],
    "source": {
      "institution": "미 연준 H.10 (FRED 경유)",
      "title": "원/달러 환율, 월평균 (EXKOUS)",
      "date": "2026-10-22",
      "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXKOUS",
      "via": "FRED 직접 조회 (조회일 2026-10-22)"
    }
  },
  "kospi": {
    "variable": "kospi",
    "unit": "지수",
    "derivation": "OECD 주가지수(2015=100) 그대로. 코스피 포인트와 단위가 다르다",
    "points": [
      {
        "month": "2023-09",
        "value": 126.1101
      },
      {
        "month": "2023-10",
        "value": 119.3082
      },
      {
        "month": "2023-11",
        "value": 122.2631
      },
      {
        "month": "2023-12",
        "value": 127.3208
      },
      {
        "month": "2024-01",
        "value": 125.5239
      },
      {
        "month": "2024-02",
        "value": 130.7407
      },
      {
        "month": "2024-03",
        "value": 134.0924
      },
      {
        "month": "2024-04",
        "value": 133.0378
      },
      {
        "month": "2024-05",
        "value": 134.698
      },
      {
        "month": "2024-06",
        "value": 136.4975
      },
      {
        "month": "2024-07",
        "value": 139.6777
      },
      {
        "month": "2024-08",
        "value": 131.6546
      },
      {
        "month": "2024-09",
        "value": 128.8299
      },
      {
        "month": "2024-10",
        "value": 128.9984
      },
      {
        "month": "2024-11",
        "value": 124.5125
      },
      {
        "month": "2024-12",
        "value": 121.395
      },
      {
        "month": "2025-01",
        "value": 124.5563
      },
      {
        "month": "2025-02",
        "value": 128.2198
      },
      {
        "month": "2025-03",
        "value": 128.453
      },
      {
        "month": "2025-04",
        "value": 122.921
      },
      {
        "month": "2025-05",
        "value": 129.8586
      },
      {
        "month": "2025-06",
        "value": 145.7188
      },
      {
        "month": "2025-07",
        "value": 157.5476
      },
      {
        "month": "2025-08",
        "value": 158.4023
      },
      {
        "month": "2025-09",
        "value": 166.6949
      },
      {
        "month": "2025-10",
        "value": 186.5662
      },
      {
        "month": "2025-11",
        "value": 199.5063
      },
      {
        "month": "2025-12",
        "value": 203.5815
      },
      {
        "month": "2026-01",
        "value": 237.6905
      },
      {
        "month": "2026-02",
        "value": 276.7081
      },
      {
        "month": "2026-03",
        "value": 276.3034
      },
      {
        "month": "2026-04",
        "value": 301.3875
      },
      {
        "month": "2026-05",
        "value": 379.009
      },
      {
        "month": "2026-06",
        "value": 421.8348
      },
      {
        "month": "2026-07",
        "value": 347.6898
      },
      {
        "month": "2026-08",
        "value": 330.6228
      },
      {
        "month": "2026-09",
        "value": 341.5358
      }
    ],
    "source": {
      "institution": "OECD (FRED 경유)",
      "title": "한국 주가지수, 2015=100, 월별 (SPASTT01KRM661N)",
      "date": "2026-10-22",
      "url": "https://fred.stlouisfed.org/graph/fredgraph.csv?id=SPASTT01KRM661N",
      "via": "FRED 직접 조회 (조회일 2026-10-22)"
    }
  }
};
