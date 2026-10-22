// 이 파일은 scripts/fetch-observed-series.mjs가 IMF 국제금융통계(IFS)에서 내려받아 만든다. 직접 고치지 않는다.
// 시점별 그래프(PLAN 6번)의 "과거 실제" 구간에 쓰는 한국 월별 통계다.
import type { ObservedSeries, VariableKey } from "./types";

export const OBSERVED_META = {
  "generatedAt": "2026-10-22",
  "baseMonth": "2025-05",
  "pastMonths": 36,
  "note": "공개 서비스(DBnomics)에 올라온 가장 최근 자료 기준이라 오늘 날짜보다 오래됐을 수 있다. 앱이 실행 중에 통계를 부르지 않고 이 파일의 고정값을 쓴다."
};

export const OBSERVED_SERIES: Record<VariableKey, ObservedSeries> = {
  "gdp": {
    "variable": "gdp",
    "unit": "%",
    "derivation": "분기 실질 GDP(계절조정)의 전년 동기 대비 성장률. 같은 분기의 세 달에 같은 값",
    "points": [
      {
        "month": "2022-05",
        "value": 2.8391
      },
      {
        "month": "2022-06",
        "value": 2.8391
      },
      {
        "month": "2022-07",
        "value": 3.3493
      },
      {
        "month": "2022-08",
        "value": 3.3493
      },
      {
        "month": "2022-09",
        "value": 3.3493
      },
      {
        "month": "2022-10",
        "value": 1.3945
      },
      {
        "month": "2022-11",
        "value": 1.3945
      },
      {
        "month": "2022-12",
        "value": 1.3945
      },
      {
        "month": "2023-01",
        "value": 1.3692
      },
      {
        "month": "2023-02",
        "value": 1.3692
      },
      {
        "month": "2023-03",
        "value": 1.3692
      },
      {
        "month": "2023-04",
        "value": 1.1687
      },
      {
        "month": "2023-05",
        "value": 1.1687
      },
      {
        "month": "2023-06",
        "value": 1.1687
      },
      {
        "month": "2023-07",
        "value": 1.4589
      },
      {
        "month": "2023-08",
        "value": 1.4589
      },
      {
        "month": "2023-09",
        "value": 1.4589
      },
      {
        "month": "2023-10",
        "value": 2.3331
      },
      {
        "month": "2023-11",
        "value": 2.3331
      },
      {
        "month": "2023-12",
        "value": 2.3331
      },
      {
        "month": "2024-01",
        "value": 3.1671
      },
      {
        "month": "2024-02",
        "value": 3.1671
      },
      {
        "month": "2024-03",
        "value": 3.1671
      },
      {
        "month": "2024-04",
        "value": 2.2312
      },
      {
        "month": "2024-05",
        "value": 2.2312
      },
      {
        "month": "2024-06",
        "value": 2.2312
      },
      {
        "month": "2024-07",
        "value": 1.5282
      },
      {
        "month": "2024-08",
        "value": 1.5282
      },
      {
        "month": "2024-09",
        "value": 1.5282
      },
      {
        "month": "2024-10",
        "value": 1.111
      },
      {
        "month": "2024-11",
        "value": 1.111
      },
      {
        "month": "2024-12",
        "value": 1.111
      },
      {
        "month": "2025-01",
        "value": -0.2806
      },
      {
        "month": "2025-02",
        "value": -0.2806
      },
      {
        "month": "2025-03",
        "value": -0.2806
      },
      {
        "month": "2025-04",
        "value": 0.5531
      },
      {
        "month": "2025-05",
        "value": 0.5531
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "IFS: 한국 실질 GDP, 계절조정, 분기, 자국통화 (NGDP_R_SA_XDC)",
      "date": "2025-08-26",
      "url": "https://api.db.nomics.world/v22/series/IMF/IFS/Q.KR.NGDP_R_SA_XDC?observations=1",
      "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
    }
  },
  "cpi": {
    "variable": "cpi",
    "unit": "%",
    "derivation": "소비자물가지수의 전년 동월 대비 상승률",
    "points": [
      {
        "month": "2022-05",
        "value": 5.3405
      },
      {
        "month": "2022-06",
        "value": 6.0363
      },
      {
        "month": "2022-07",
        "value": 6.327
      },
      {
        "month": "2022-08",
        "value": 5.7226
      },
      {
        "month": "2022-09",
        "value": 5.4764
      },
      {
        "month": "2022-10",
        "value": 5.6217
      },
      {
        "month": "2022-11",
        "value": 5.0063
      },
      {
        "month": "2022-12",
        "value": 5.0173
      },
      {
        "month": "2023-01",
        "value": 4.9785
      },
      {
        "month": "2023-02",
        "value": 4.6576
      },
      {
        "month": "2023-03",
        "value": 4.1659
      },
      {
        "month": "2023-04",
        "value": 3.6881
      },
      {
        "month": "2023-05",
        "value": 3.3767
      },
      {
        "month": "2023-06",
        "value": 2.7262
      },
      {
        "month": "2023-07",
        "value": 2.3545
      },
      {
        "month": "2023-08",
        "value": 3.36
      },
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
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "IFS: 한국 소비자물가지수, 전 품목, 월별 (PCPI_IX)",
      "date": "2025-08-26",
      "url": "https://api.db.nomics.world/v22/series/IMF/IFS/M.KR.PCPI_IX?observations=1",
      "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
    }
  },
  "policyRate": {
    "variable": "policyRate",
    "unit": "%",
    "derivation": "정책금리 그대로",
    "points": [
      {
        "month": "2022-05",
        "value": 1.75
      },
      {
        "month": "2022-06",
        "value": 1.75
      },
      {
        "month": "2022-07",
        "value": 2.25
      },
      {
        "month": "2022-08",
        "value": 2.5
      },
      {
        "month": "2022-09",
        "value": 2.5
      },
      {
        "month": "2022-10",
        "value": 3
      },
      {
        "month": "2022-11",
        "value": 3.25
      },
      {
        "month": "2022-12",
        "value": 3.25
      },
      {
        "month": "2023-01",
        "value": 3.5
      },
      {
        "month": "2023-02",
        "value": 3.5
      },
      {
        "month": "2023-03",
        "value": 3.5
      },
      {
        "month": "2023-04",
        "value": 3.5
      },
      {
        "month": "2023-05",
        "value": 3.5
      },
      {
        "month": "2023-06",
        "value": 3.5
      },
      {
        "month": "2023-07",
        "value": 3.5
      },
      {
        "month": "2023-08",
        "value": 3.5
      },
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
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "IFS: 한국 정책금리(Monetary Policy-Related Interest Rate), 월별 (FPOLM_PA)",
      "date": "2025-08-26",
      "url": "https://api.db.nomics.world/v22/series/IMF/IFS/M.KR.FPOLM_PA?observations=1",
      "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
    }
  },
  "fx": {
    "variable": "fx",
    "unit": "원",
    "derivation": "원/달러 월평균 환율 그대로",
    "points": [
      {
        "month": "2022-05",
        "value": 1269.88
      },
      {
        "month": "2022-06",
        "value": 1277.35
      },
      {
        "month": "2022-07",
        "value": 1307.4
      },
      {
        "month": "2022-08",
        "value": 1318.44
      },
      {
        "month": "2022-09",
        "value": 1391.59
      },
      {
        "month": "2022-10",
        "value": 1426.66
      },
      {
        "month": "2022-11",
        "value": 1364.1
      },
      {
        "month": "2022-12",
        "value": 1296.22
      },
      {
        "month": "2023-01",
        "value": 1247.25
      },
      {
        "month": "2023-02",
        "value": 1270.74
      },
      {
        "month": "2023-03",
        "value": 1305.73
      },
      {
        "month": "2023-04",
        "value": 1320.01
      },
      {
        "month": "2023-05",
        "value": 1328.21
      },
      {
        "month": "2023-06",
        "value": 1296.71
      },
      {
        "month": "2023-07",
        "value": 1286.3
      },
      {
        "month": "2023-08",
        "value": 1318.47
      },
      {
        "month": "2023-09",
        "value": 1329.47
      },
      {
        "month": "2023-10",
        "value": 1350.69
      },
      {
        "month": "2023-11",
        "value": 1310.39
      },
      {
        "month": "2023-12",
        "value": 1303.98
      },
      {
        "month": "2024-01",
        "value": 1323.57
      },
      {
        "month": "2024-02",
        "value": 1331.74
      },
      {
        "month": "2024-03",
        "value": 1330.69
      },
      {
        "month": "2024-04",
        "value": 1367.83
      },
      {
        "month": "2024-05",
        "value": 1365.39
      },
      {
        "month": "2024-06",
        "value": 1380.13
      },
      {
        "month": "2024-07",
        "value": 1383.38
      },
      {
        "month": "2024-08",
        "value": 1354.15
      },
      {
        "month": "2024-09",
        "value": 1334.82
      },
      {
        "month": "2024-10",
        "value": 1361
      },
      {
        "month": "2024-11",
        "value": 1393.38
      },
      {
        "month": "2024-12",
        "value": 1434.42
      },
      {
        "month": "2025-01",
        "value": 1455.79
      },
      {
        "month": "2025-02",
        "value": 1445.56
      },
      {
        "month": "2025-03",
        "value": 1456.95
      },
      {
        "month": "2025-04",
        "value": 1444.31
      },
      {
        "month": "2025-05",
        "value": 1394.49
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "IFS: 원/달러 환율, 기간 평균, 월별 (ENDA_XDC_USD_RATE)",
      "date": "2025-08-26",
      "url": "https://api.db.nomics.world/v22/series/IMF/IFS/M.KR.ENDA_XDC_USD_RATE?observations=1",
      "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
    }
  },
  "kospi": {
    "variable": "kospi",
    "unit": "지수",
    "derivation": "주가지수 그대로 (IMF IFS의 한국 주가지수)",
    "points": [
      {
        "month": "2022-05",
        "value": 149.1736
      },
      {
        "month": "2022-06",
        "value": 140.4678
      },
      {
        "month": "2022-07",
        "value": 134.1021
      },
      {
        "month": "2022-08",
        "value": 140.73
      },
      {
        "month": "2022-09",
        "value": 132.4641
      },
      {
        "month": "2022-10",
        "value": 126.5808
      },
      {
        "month": "2022-11",
        "value": 137.2106
      },
      {
        "month": "2022-12",
        "value": 134.0164
      },
      {
        "month": "2023-01",
        "value": 134.0777
      },
      {
        "month": "2023-02",
        "value": 139.071
      },
      {
        "month": "2023-03",
        "value": 137.2106
      },
      {
        "month": "2023-04",
        "value": 143.2114
      },
      {
        "month": "2023-05",
        "value": 143.2761
      },
      {
        "month": "2023-06",
        "value": 147.5032
      },
      {
        "month": "2023-07",
        "value": 147.2467
      },
      {
        "month": "2023-08",
        "value": 145.4112
      },
      {
        "month": "2023-09",
        "value": 144.3766
      },
      {
        "month": "2023-10",
        "value": 135.7678
      },
      {
        "month": "2023-11",
        "value": 139.5597
      },
      {
        "month": "2023-12",
        "value": 144.9339
      },
      {
        "month": "2024-01",
        "value": 142.9446
      },
      {
        "month": "2024-02",
        "value": 149.2916
      },
      {
        "month": "2024-03",
        "value": 153.2174
      },
      {
        "month": "2024-04",
        "value": 151.7792
      },
      {
        "month": "2024-05",
        "value": 153.8338
      },
      {
        "month": "2024-06",
        "value": 155.974
      },
      {
        "month": "2024-07",
        "value": 159.4379
      },
      {
        "month": "2024-08",
        "value": 150.2888
      },
      {
        "month": "2024-09",
        "value": 147.203
      },
      {
        "month": "2024-10",
        "value": 147.3443
      },
      {
        "month": "2024-11",
        "value": 142.1273
      },
      {
        "month": "2024-12",
        "value": 138.6908
      },
      {
        "month": "2025-01",
        "value": 142.1103
      },
      {
        "month": "2025-02",
        "value": 146.359
      },
      {
        "month": "2025-03",
        "value": 146.7688
      },
      {
        "month": "2025-04",
        "value": 140.3106
      },
      {
        "month": "2025-05",
        "value": 148.7048
      }
    ],
    "source": {
      "institution": "IMF",
      "title": "IFS: 한국 주가지수(Equities index), 월별 (FPE_IX)",
      "date": "2025-08-26",
      "url": "https://api.db.nomics.world/v22/series/IMF/IFS/M.KR.FPE_IX?observations=1",
      "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
    }
  }
};
