// 이 파일은 scripts/fetch-validation-data.mjs가 공개 통계에서 내려받아 만든다. 직접 고치지 않는다.
// 방향 일치율 검증(PLAN 3번)에 쓰는 과거 사례이며, 충격 표의 과거 사례(history.ts)와 겹치지 않는다.
import type { ValidationCase } from "./types";

export const VALIDATION_META = {
  "generatedAt": "2026-10-22",
  "rule": "1991~2024년 중 자료가 있는 해에서, 유가 변동 폭이 큰 7개 연도, 원/달러 환율 변동 폭이 큰 3개 연도, 미국 프라임레이트(연준 기준금리 대용) 변화가 큰 3개 연도(충격 표 사례와 겹치는 2022년 제외), 세계 경제성장률 변동 폭이 큰 3개 연도, 전체 원자재 가격 변동 폭이 큰 3개 연도. 실제 변화는 그해 값에서 전년 값을 뺀 차이(GDP·물가 %p, 환율은 변동률 %)."
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
      },
      "fx": {
        "value": -15.23,
        "unit": "%",
        "note": "1999년 1189.4원 / 1998년 1403.2원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": -4.97,
        "unit": "%",
        "note": "2000년 1130.4원 / 1999년 1189.4원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": -10.64,
        "unit": "%",
        "note": "2005년 1024.3원 / 2004년 1146.2원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 18.37,
        "unit": "%",
        "note": "2008년 1100.1원 / 2007년 929.4원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 7.42,
        "unit": "%",
        "note": "2015년 1131원 / 2014년 1052.8원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": -3.08,
        "unit": "%",
        "note": "2021년 1144원 / 2020년 1180.3원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 12.89,
        "unit": "%",
        "note": "2022년 1291.4원 / 2021년 1144원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 18.08,
        "unit": "%",
        "note": "1997년 949.9원 / 1996년 804.5원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 47.72,
        "unit": "%",
        "note": "1998년 1403.2원 / 1997년 949.9원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
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
      },
      "fx": {
        "value": 18.37,
        "unit": "%",
        "note": "2008년 1100.1원 / 2007년 929.4원 (연평균 원/달러 환율 변동률)"
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "policyRate-2001",
    "type": "policyRate",
    "year": 2001,
    "name": "2001년 미국 프라임레이트 9.23% → 6.92% (연평균, -231bp)",
    "shock": {
      "value": -231.17,
      "unit": "bp 연준 기준금리 인상폭"
    },
    "observed": {
      "gdp": {
        "value": -4.48,
        "unit": "%p",
        "note": "2001년 4.7% − 2000년 9.2% (GDP 성장률)"
      },
      "cpi": {
        "value": 1.81,
        "unit": "%p",
        "note": "2001년 4.1% − 2000년 2.3% (소비자물가 상승률)"
      },
      "fx": {
        "value": 14.19,
        "unit": "%",
        "note": "2001년 1290.8원 / 2000년 1130.4원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Lending interest rate (%), United States — 프라임레이트 (FR.INR.LEND). 연준 기준금리 대용",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/USA/indicator/FR.INR.LEND?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "policyRate-2002",
    "type": "policyRate",
    "year": 2002,
    "name": "2002년 미국 프라임레이트 6.92% → 4.68% (연평균, -225bp)",
    "shock": {
      "value": -224.67,
      "unit": "bp 연준 기준금리 인상폭"
    },
    "observed": {
      "gdp": {
        "value": 3.02,
        "unit": "%p",
        "note": "2002년 7.7% − 2001년 4.7% (GDP 성장률)"
      },
      "cpi": {
        "value": -1.3,
        "unit": "%p",
        "note": "2002년 2.8% − 2001년 4.1% (소비자물가 상승률)"
      },
      "fx": {
        "value": -3.04,
        "unit": "%",
        "note": "2002년 1251.6원 / 2001년 1290.8원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Lending interest rate (%), United States — 프라임레이트 (FR.INR.LEND). 연준 기준금리 대용",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/USA/indicator/FR.INR.LEND?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "policyRate-2008",
    "type": "policyRate",
    "year": 2008,
    "name": "2008년 미국 프라임레이트 8.05% → 5.09% (연평균, -296bp)",
    "shock": {
      "value": -296.25,
      "unit": "bp 연준 기준금리 인상폭"
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
      },
      "fx": {
        "value": 18.37,
        "unit": "%",
        "note": "2008년 1100.1원 / 2007년 929.4원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "Lending interest rate (%), United States — 프라임레이트 (FR.INR.LEND). 연준 기준금리 대용",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/USA/indicator/FR.INR.LEND?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "globalSlowdown-2010",
    "type": "globalSlowdown",
    "year": 2010,
    "name": "2010년 세계 경제성장률 -1.3% → 4.5% (-5.9%p 하락)",
    "shock": {
      "value": -5.85,
      "unit": "%p 세계 경제성장률 하락"
    },
    "observed": {
      "gdp": {
        "value": 6.16,
        "unit": "%p",
        "note": "2010년 7% − 2009년 0.8% (GDP 성장률)"
      },
      "cpi": {
        "value": 0.18,
        "unit": "%p",
        "note": "2010년 2.9% − 2009년 2.8% (소비자물가 상승률)"
      },
      "fx": {
        "value": -9.46,
        "unit": "%",
        "note": "2010년 1156.5원 / 2009년 1277.2원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), World (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "globalSlowdown-2020",
    "type": "globalSlowdown",
    "year": 2020,
    "name": "2020년 세계 경제성장률 2.7% → -2.9% (+5.6%p 하락)",
    "shock": {
      "value": 5.57,
      "unit": "%p 세계 경제성장률 하락"
    },
    "observed": {
      "gdp": {
        "value": -3.01,
        "unit": "%p",
        "note": "2020년 -0.7% − 2019년 2.3% (GDP 성장률)"
      },
      "cpi": {
        "value": 0.15,
        "unit": "%p",
        "note": "2020년 0.5% − 2019년 0.4% (소비자물가 상승률)"
      },
      "fx": {
        "value": 1.28,
        "unit": "%",
        "note": "2020년 1180.3원 / 2019년 1165.4원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), World (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "globalSlowdown-2021",
    "type": "globalSlowdown",
    "year": 2021,
    "name": "2021년 세계 경제성장률 -2.9% → 6.5% (-9.4%p 하락)",
    "shock": {
      "value": -9.37,
      "unit": "%p 세계 경제성장률 하락"
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
      },
      "fx": {
        "value": -3.08,
        "unit": "%",
        "note": "2021년 1144원 / 2020년 1180.3원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "세계은행",
        "title": "GDP growth (annual %), World (NY.GDP.MKTP.KD.ZG)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200&date=1989:2024",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "commoditySupply-2015",
    "type": "commoditySupply",
    "year": 2015,
    "name": "2015년 국제 원자재 가격(전체 지수) -31.8% (연평균, 전년 대비)",
    "shock": {
      "value": -31.81,
      "unit": "% 국제 원자재 가격 상승"
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
      },
      "fx": {
        "value": 7.42,
        "unit": "%",
        "note": "2015년 1131원 / 2014년 1052.8원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: All Commodity 연평균 지수 (PCPS A.W00.PALLFNF.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.PALLFNF?observations=1",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "commoditySupply-2021",
    "type": "commoditySupply",
    "year": 2021,
    "name": "2021년 국제 원자재 가격(전체 지수) +52.5% (연평균, 전년 대비)",
    "shock": {
      "value": 52.55,
      "unit": "% 국제 원자재 가격 상승"
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
      },
      "fx": {
        "value": -3.08,
        "unit": "%",
        "note": "2021년 1144원 / 2020년 1180.3원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: All Commodity 연평균 지수 (PCPS A.W00.PALLFNF.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.PALLFNF?observations=1",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  },
  {
    "id": "commoditySupply-2022",
    "type": "commoditySupply",
    "year": 2022,
    "name": "2022년 국제 원자재 가격(전체 지수) +33.7% (연평균, 전년 대비)",
    "shock": {
      "value": 33.69,
      "unit": "% 국제 원자재 가격 상승"
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
      },
      "fx": {
        "value": 12.89,
        "unit": "%",
        "note": "2022년 1291.4원 / 2021년 1144원 (연평균 원/달러 환율 변동률)"
      }
    },
    "sources": [
      {
        "institution": "IMF",
        "title": "Primary Commodity Prices: All Commodity 연평균 지수 (PCPS A.W00.PALLFNF.IX)",
        "date": "2025-07-16",
        "url": "https://api.db.nomics.world/v22/series/IMF/PCPS/A.W00.PALLFNF?observations=1",
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
      },
      {
        "institution": "세계은행",
        "title": "Official exchange rate (LCU per US$, period average), Korea, Rep. (PA.NUS.FCRF)",
        "date": "2026-10-08",
        "url": "https://api.worldbank.org/v2/country/KOR/indicator/PA.NUS.FCRF?format=json&per_page=200&date=1989:2024",
        "via": "세계은행 API 직접 조회 (조회일 2026-10-22)"
      }
    ]
  }
];
