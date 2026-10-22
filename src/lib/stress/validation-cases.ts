// 이 파일은 scripts/fetch-validation-data.mjs가 공개 통계에서 내려받아 만든다. 직접 고치지 않는다.
// 방향 일치율 검증(PLAN 3번)에 쓰는 과거 사례이며, 충격 표의 과거 사례(history.ts)와 겹치지 않는다.
import type { ValidationCase } from "./types";

export const VALIDATION_META = {
  "generatedAt": "2026-10-22",
  "rule": "1991~2024년 중 연평균 유가 변동 폭이 큰 7개 연도와 연평균 원/달러 환율 변동 폭이 큰 3개 연도. 실제 변화는 그해 값에서 전년 값을 뺀 차이(%p)."
};

export const VALIDATION_CASES: ValidationCase[] = [
  {
    "id": "oil-1999",
    "type": "oil",
    "year": 1999,
    "name": "1999년 국제 유가 +40.8% (연평균, 전년 대비)",
    "shock": {
      "value": 40.76,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": 16.56,
        "unit": "%p",
        "note": "1999년 11.6% − 1998년 -4.9% (GDP 성장률)"
      },
      "cpi": {
        "value": -6.7,
        "unit": "%p",
        "note": "1999년 0.8% − 1998년 7.5% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2000",
    "type": "oil",
    "year": 2000,
    "name": "2000년 국제 유가 +52.6% (연평균, 전년 대비)",
    "shock": {
      "value": 52.58,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": -2.42,
        "unit": "%p",
        "note": "2000년 9.2% − 1999년 11.6% (GDP 성장률)"
      },
      "cpi": {
        "value": 1.45,
        "unit": "%p",
        "note": "2000년 2.3% − 1999년 0.8% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2005",
    "type": "oil",
    "year": 2005,
    "name": "2005년 국제 유가 +46.2% (연평균, 전년 대비)",
    "shock": {
      "value": 46.21,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": -0.83,
        "unit": "%p",
        "note": "2005년 4.4% − 2004년 5.2% (GDP 성장률)"
      },
      "cpi": {
        "value": -0.84,
        "unit": "%p",
        "note": "2005년 2.8% − 2004년 3.6% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2008",
    "type": "oil",
    "year": 2008,
    "name": "2008년 국제 유가 +36.2% (연평균, 전년 대비)",
    "shock": {
      "value": 36.22,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": -2.84,
        "unit": "%p",
        "note": "2008년 3% − 2007년 5.8% (GDP 성장률)"
      },
      "cpi": {
        "value": 2.14,
        "unit": "%p",
        "note": "2008년 4.7% − 2007년 2.5% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2015",
    "type": "oil",
    "year": 2015,
    "name": "2015년 국제 유가 -47.3% (연평균, 전년 대비)",
    "shock": {
      "value": -47.25,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": -0.29,
        "unit": "%p",
        "note": "2015년 2.9% − 2014년 3.2% (GDP 성장률)"
      },
      "cpi": {
        "value": -0.57,
        "unit": "%p",
        "note": "2015년 0.7% − 2014년 1.3% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2021",
    "type": "oil",
    "year": 2021,
    "name": "2021년 국제 유가 +61.9% (연평균, 전년 대비)",
    "shock": {
      "value": 61.85,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": 5.31,
        "unit": "%p",
        "note": "2021년 4.6% − 2020년 -0.7% (GDP 성장률)"
      },
      "cpi": {
        "value": 1.96,
        "unit": "%p",
        "note": "2021년 2.5% − 2020년 0.5% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "oil-2022",
    "type": "oil",
    "year": 2022,
    "name": "2022년 국제 유가 +38.2% (연평균, 전년 대비)",
    "shock": {
      "value": 38.18,
      "unit": "% 국제 유가 상승"
    },
    "observed": {
      "gdp": {
        "value": -1.89,
        "unit": "%p",
        "note": "2022년 2.7% − 2021년 4.6% (GDP 성장률)"
      },
      "cpi": {
        "value": 2.59,
        "unit": "%p",
        "note": "2022년 5.1% − 2021년 2.5% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: Dubai Crude 연평균 지수 (PCPS A.W00.POILDUB.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.POILDUB?observations=1",
        "via": "DBnomics API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "fx-1997",
    "type": "fx",
    "year": 1997,
    "name": "1997년 원/달러 환율 +18.1% (연평균, 전년 대비)",
    "shock": {
      "value": 18.08,
      "unit": "% 원/달러 환율 상승"
    },
    "observed": {
      "gdp": {
        "value": -1.71,
        "unit": "%p",
        "note": "1997년 6.3% − 1996년 8% (GDP 성장률)"
      },
      "cpi": {
        "value": -0.49,
        "unit": "%p",
        "note": "1997년 4.4% − 1996년 4.9% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "fx-1998",
    "type": "fx",
    "year": 1998,
    "name": "1998년 원/달러 환율 +47.7% (연평균, 전년 대비)",
    "shock": {
      "value": 47.72,
      "unit": "% 원/달러 환율 상승"
    },
    "observed": {
      "gdp": {
        "value": -11.22,
        "unit": "%p",
        "note": "1998년 -4.9% − 1997년 6.3% (GDP 성장률)"
      },
      "cpi": {
        "value": 3.07,
        "unit": "%p",
        "note": "1998년 7.5% − 1997년 4.4% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "fx-2008",
    "type": "fx",
    "year": 2008,
    "name": "2008년 원/달러 환율 +18.4% (연평균, 전년 대비)",
    "shock": {
      "value": 18.37,
      "unit": "% 원/달러 환율 상승"
    },
    "observed": {
      "gdp": {
        "value": -2.84,
        "unit": "%p",
        "note": "2008년 3% − 2007년 5.8% (GDP 성장률)"
      },
      "cpi": {
        "value": 2.14,
        "unit": "%p",
        "note": "2008년 4.7% − 2007년 2.5% (소비자물가 상승률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), Korea, Rep. (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      },
      {
        "institution": "세계은행",
        "title": "Inflation, consumer prices (annual %), Korea, Rep. (FP.CPI.TOTL.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/FP.CPI.TOTL.ZG?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  }
];
