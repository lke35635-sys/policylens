// Design Ref: §5 Policy, PLAN 4번 — 통화정책 분야의 정책 연혁 (국내 3개 + 해외 짝 3개).
// 모든 항목은 2026-10-22에 공식 사이트 페이지를 직접 열어 확인한 것이다. 항목의 evidence는 그 출처 페이지에 그대로 있는 근거 문장이며,
// scripts/check-evidence.mjs가 출처 주소를 다시 열어 이 문장이 지금도 있는지 확인한다 (화면에는 보이지 않는다).
// 이 파일은 조사 결과를 옮겨 만든 것이므로 연혁 항목을 고칠 때는 출처 페이지를 다시 열어 확인한 뒤 evidence도 함께 고친다.
//
// 짝 (국내 ↔ 해외)
// - 한국은행 기준금리 ↔ 미국 연준 기준금리
// - 한국은행 위기 대응 유동성 공급 ↔ 미국 연준 양적완화·양적긴축
// - 한·중 통화스와프 ↔ 중국 인민은행 통화정책 (한국과 교역·금융 관계가 깊은 다른 나라로 중국을 골랐다)
//
// 주의할 점
// - 한국은행 기준금리: 한국은행 기준금리 추이표의 가장 오래된 기록(1999-05-06 콜금리 목표)을 최초 시행일로 쓴다. 현재 이름의 "기준금리"는 2008년 3월부터이며 정확한 일자는 확인하지 못해 연혁에는 2008-03-01로 적었다(월 단위 표기).
// - 추이표 근거 항목(1999-05-06, 2008-03-01, 2008-12-11)은 문서 날짜가 없는 표 페이지라 출처 날짜를 항목 날짜와 같게 두었다.
// - 위기 대응 유동성 공급: 보도자료 본문이 첨부파일뿐인 항목은 보도자료 제목에 있는 사실만 요약했다 (금액·한도는 확인하지 못해 넣지 않았다).
// - 미국 연준 기준금리: 최초 시행일 1994-02-04는 FOMC가 결정을 처음 공개한 성명의 날짜다 (이 성명에는 금리 수치가 없다).
// - 미국 연준 양적완화·긴축: 2025-12-10 항목은 양적완화가 아니라 은행 지급준비금 관리를 위한 단기 국채 매입이다.
import type { Policy } from "../../lib/corpus/types";

export const MONETARY_POLICIES: Policy[] = [
  {
    "id": "bok-base-rate",
    "scope": "domestic",
    "field": "통화",
    "name": "한국은행 기준금리",
    "aliases": [
      "기준금리",
      "정책금리",
      "콜금리",
      "콜금리 목표",
      "한은 금리",
      "금통위 금리",
      "BOK base rate",
      "Bank of Korea base rate"
    ],
    "keywords": [
      "금리",
      "통화정책",
      "금융통화위원회",
      "물가안정"
    ],
    "firstEffectiveDate": "1999-05-06",
    "asOf": "2026-10-22",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "한국은행",
      "url": "https://www.bok.or.kr/portal/singl/baseRate/progress.do?dataSeCd=01&menuNo=200656"
    },
    "history": [
      {
        "id": "bok-base-rate-h1",
        "date": "1999-05-06",
        "title": "콜금리 목표 4.75% 기록",
        "summary": "한국은행 기준금리 추이표에서 가장 오래된 항목으로, 1999년 5월 6일 콜금리 목표가 4.75%로 기록되었다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행 기준금리 추이(목록)",
            "date": "1999-05-06",
            "url": "https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643",
            "checkedAt": "2026-10-22",
            "evidence": "1999\t05월 06일\t4.75"
          }
        ],
        "governmentId": "gov-kim-dj"
      },
      {
        "id": "bok-base-rate-h2",
        "date": "2008-03-01",
        "title": "기준금리 체계로 전환",
        "summary": "한국은행은 2008년 2월까지 콜금리 목표를 쓰고 2008년 3월부터 한국은행 기준금리를 쓴다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행 기준금리 추이(목록)",
            "date": "2008-03-01",
            "url": "https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643",
            "checkedAt": "2026-10-22",
            "evidence": "2008년 2월 까지는 콜금리 목표, 2008년 3월부터는 한국은행 기준금리"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "bok-base-rate-h3",
        "date": "2008-12-11",
        "title": "기준금리 1%p 인하",
        "summary": "기준금리가 2008년 11월 7일 4.00%에서 2008년 12월 11일 3.00%로 낮아졌다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행 기준금리 추이(목록)",
            "date": "2008-12-11",
            "url": "https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643",
            "checkedAt": "2026-10-22",
            "evidence": "2008\t12월 11일\t3.00"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "bok-base-rate-h4",
        "date": "2020-03-17",
        "title": "기준금리 0.5%p 인하",
        "summary": "기준금리를 1.25%에서 0.75%로 0.5%p 내렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "기준금리 0.5%p 인하 등 경제·금융 안정화 조치 실시",
            "date": "2020-03-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10057023&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 2020년 3월 17일부터 다음 통화정책방향 결정시까지 한국은행 기준금리를 1.25%에서 0.75%로 0.5%p 하향 조정하여 통화정책을 운용하기로 하였음"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-base-rate-h5",
        "date": "2021-08-26",
        "title": "기준금리 인상으로 전환",
        "summary": "기준금리를 0.50%에서 0.75%로 올렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2021.8.26)",
            "date": "2021-08-26",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10066201&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 0.50%에서 0.75%로 상향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-base-rate-h6",
        "date": "2022-10-12",
        "title": "기준금리 2.50%에서 3.00%로",
        "summary": "기준금리를 2.50%에서 3.00%로 올렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2022.10.12)",
            "date": "2022-10-12",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10073227&menuNo=200788",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 2.50%에서 3.00%로 상향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "bok-base-rate-h7",
        "date": "2024-10-11",
        "title": "기준금리 인하로 전환",
        "summary": "기준금리를 3.50%에서 3.25%로 내렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2024.10.11)",
            "date": "2024-10-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10087410&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 3.50% 수준에서 3.25%로 하향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "bok-base-rate-h8",
        "date": "2025-05-29",
        "title": "기준금리 2.50%로 인하",
        "summary": "기준금리를 2.75%에서 2.50%로 내렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.5.29)",
            "date": "2025-05-29",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10091639&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 2.75% 수준에서 2.50%로 하향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "bok-base-rate-h9",
        "date": "2026-07-16",
        "title": "기준금리 인상으로 전환",
        "summary": "기준금리를 2.50%에서 2.75%로 0.25%p 올렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 2.50% 수준에서 2.75%로 상향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "bok-base-rate-h10",
        "date": "2026-08-27",
        "title": "기준금리 3.00%로 인상",
        "summary": "기준금리를 2.75%에서 3.00%로 0.25%p 올렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.8.27)",
            "date": "2026-08-27",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11064191&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 2.75% 수준에서 3.00%로 상향 조정하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "bok-base-rate-h11",
        "date": "2026-10-22",
        "title": "기준금리 3.00% 동결",
        "summary": "인상이 두 차례 이어진 뒤 기준금리를 3.00%로 유지하기로 했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.10.22)",
            "date": "2026-10-22",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11065823&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "금융통화위원회는 다음 통화정책방향 결정시까지 한국은행 기준금리를 현재의 3.00% 수준에서 유지하여 통화정책을 운용하기로 하였다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ],
    "foreignPolicyId": "fed-funds-rate"
  },
  {
    "id": "fed-funds-rate",
    "scope": "foreign",
    "field": "통화",
    "name": "미국 연준 기준금리",
    "aliases": [
      "연준 기준금리",
      "미국 기준금리",
      "연방기금금리",
      "연방기금금리 목표 범위",
      "FOMC",
      "연방공개시장위원회",
      "연준 금리 결정",
      "Fed rate",
      "Fed funds rate",
      "federal funds rate",
      "FOMC statement",
      "미 연준 금리"
    ],
    "keywords": [
      "금리",
      "연준",
      "FOMC",
      "달러",
      "미국"
    ],
    "firstEffectiveDate": "1994-02-04",
    "asOf": "2026-09-16",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "미국 연방준비제도(Fed)",
      "url": "https://www.federalreserve.gov/monetarypolicy/openmarket.htm"
    },
    "history": [
      {
        "id": "fed-funds-rate-h1",
        "date": "1998-09-29",
        "title": "금리 인하 전환",
        "summary": "연방기금금리가 1/4%p 내려 약 5와 1/4%가 될 것으로 보고 통화정책을 완화했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FRB: Press Release -- FOMC statement -- September 29, 1998",
            "date": "1998-09-29",
            "url": "https://www.federalreserve.gov/boarddocs/press/general/1998/19980929/",
            "checkedAt": "2026-10-22",
            "evidence": "The Federal Open Market Committee decided today to ease the stance of monetary policy slightly, expecting the federal funds rate to decline 1/4 percentage point to around 5-1/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h2",
        "date": "2001-01-03",
        "title": "목표금리 0.5%p 인하",
        "summary": "연방기금금리 목표를 50bp 내려 6%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FRB: Press Release -- FOMC statement and Board discount rate action -- January 3, 2001",
            "date": "2001-01-03",
            "url": "https://www.federalreserve.gov/boarddocs/press/general/2001/20010103/",
            "checkedAt": "2026-10-22",
            "evidence": "The Federal Open Market Committee decided today to lower its target for the federal funds rate by 50 basis points to 6 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h3",
        "date": "2004-06-30",
        "title": "금리 인상 전환",
        "summary": "연방기금금리 목표를 25bp 올려 1과 1/4%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FRB: Press Release--FOMC statement and Board discount rate action--June 30, 2004",
            "date": "2004-06-30",
            "url": "https://www.federalreserve.gov/boarddocs/press/monetary/2004/20040630/default.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Federal Open Market Committee decided today to raise its target for the federal funds rate by 25 basis points to 1-1/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h4",
        "date": "2007-09-18",
        "title": "0.5%p 인하, 인하 전환",
        "summary": "연방기금금리 목표를 50bp 내려 4와 3/4%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - FOMC statement",
            "date": "2007-09-18",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20070918a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Federal Open Market Committee decided today to lower its target for the federal funds rate 50 basis points to 4-3/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h5",
        "date": "2008-12-16",
        "title": "처음 0~0.25%로 하향",
        "summary": "연방기금금리 목표 범위를 0에서 1/4%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - FOMC statement",
            "date": "2008-12-16",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20081216b.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Federal Open Market Committee decided today to establish a target range for the federal funds rate of 0 to 1/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h6",
        "date": "2015-12-16",
        "title": "제로금리 후 첫 인상",
        "summary": "연방기금금리 목표 범위를 1/4~1/2%로 올렸다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2015-12-16",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20151216a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "Given the economic outlook, and recognizing the time it takes for policy actions to affect future economic outcomes, the Committee decided to raise the target range for the federal funds rate to 1/4 to 1/2 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h7",
        "date": "2020-03-15",
        "title": "다시 0~0.25%로 하향",
        "summary": "연방기금금리 목표 범위를 0에서 1/4%로 낮췄다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2020-03-15",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20200315a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In light of these developments, the Committee decided to lower the target range for the federal funds rate to 0 to 1/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h8",
        "date": "2022-03-16",
        "title": "제로금리 후 인상 재개",
        "summary": "연방기금금리 목표 범위를 1/4~1/2%로 올리고 앞으로도 올리는 것이 적절하다고 밝혔다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2022-03-16",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20220316a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In support of these goals, the Committee decided to raise the target range for the federal funds rate to 1/4 to 1/2 percent and anticipates that ongoing increases in the target range will be appropriate."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h9",
        "date": "2024-09-18",
        "title": "0.5%p 인하, 인하 전환",
        "summary": "연방기금금리 목표 범위를 1/2%p 내려 4와 3/4~5%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2024-09-18",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20240918a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In light of the progress on inflation and the balance of risks, the Committee decided to lower the target range for the federal funds rate by 1/2 percentage point to 4-3/4 to 5 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h10",
        "date": "2025-09-17",
        "title": "금리 인하 재개",
        "summary": "연방기금금리 목표 범위를 1/4%p 내려 4~4와 1/4%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2025-09-17",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20250917a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In support of its goals and in light of the shift in the balance of risks, the Committee decided to lower the target range for the federal funds rate by 1/4 percentage point to 4 to 4‑1/4 percent."
          }
        ]
      },
      {
        "id": "fed-funds-rate-h11",
        "date": "2026-09-16",
        "title": "금리 인상 전환(최근)",
        "summary": "연방기금금리 목표 범위를 1/4%p 올려 3과 3/4~4%로 정했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve Board - Federal Reserve issues FOMC statement",
            "date": "2026-09-16",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Committee decided to raise the target range for the federal funds rate by 1/4 percentage point to 3-3/4 to 4 percent, in support of the Federal Reserve's dual mandate."
          }
        ]
      }
    ],
    "domesticPolicyId": "bok-base-rate"
  },
  {
    "id": "bok-liquidity-support",
    "scope": "domestic",
    "field": "통화",
    "name": "한국은행 위기 대응 유동성 공급",
    "aliases": [
      "한은 유동성 공급",
      "RP 매입",
      "전액공급방식 RP",
      "한도 없는 RP",
      "금융중개지원대출",
      "단기금융시장 안정화 조치",
      "공개시장운영",
      "시장안정화 조치",
      "BOK liquidity support",
      "BOK RP purchase"
    ],
    "keywords": [
      "유동성",
      "RP",
      "위기 대응",
      "시장안정",
      "금융위기"
    ],
    "firstEffectiveDate": "1998-09-16",
    "asOf": "2024-12-04",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "한국은행",
      "url": "https://www.bok.or.kr/portal/main/contents.do?menuNo=201707"
    },
    "history": [
      {
        "id": "bok-liquidity-support-h1",
        "date": "1998-09-16",
        "title": "장기금리 안정 자금지원",
        "summary": "국채 인수로 자금이 부족한 금융기관을 1개월 이상 RP매입으로 돕기로 하였다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "장기금리 안정을 위한 자금지원 실시(9.16)",
            "date": "1998-09-16",
            "url": "https://www.bok.or.kr/portal/bbs/B0000502/view.do?nttId=3233&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "국채인수에 따라 일시적으로 자금사정이 어려워진 금융기관에 대하여는 장기물(1개월 이상) RP매입을 통하여 자금을 지원하는 한편"
          }
        ],
        "governmentId": "gov-kim-dj"
      },
      {
        "id": "bok-liquidity-support-h2",
        "date": "2008-10-27",
        "title": "공개시장조작 대상증권 확대",
        "summary": "한국은행이 공개시장조작 대상증권을 은행채와 일부 특수채까지 넓혔다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행 기준금리 인하 및 공개시장조작 대상증권 확대(2008. 10. 27)",
            "date": "2008-10-27",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=144751&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "공개시장조작 대상증권을 은행채 및 일부 특수채까지 확대하였음"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "bok-liquidity-support-h3",
        "date": "2020-02-27",
        "title": "금융중개지원대출 한도 확대",
        "summary": "한국은행이 코로나19 피해업체 지원을 위해 금융중개지원대출 한도를 늘렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행, 코로나19 피해업체에 대한 금융지원을 위해 금융중개지원대출 한도 확대",
            "date": "2020-02-27",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10056717&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "한국은행, 코로나19 피해업체에 대한 금융지원을 위해 금융중개지원대출 한도 확대"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-liquidity-support-h4",
        "date": "2020-03-26",
        "title": "전액공급방식 유동성 지원",
        "summary": "한국은행이 전액공급방식의 유동성 지원제도를 도입하는 등 금융안정방안을 실시했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "[보도자료] 한국은행, 전액공급방식의 유동성 지원제도 도입 등 금융안정방안 실시",
            "date": "2020-03-26",
            "url": "https://www.bok.or.kr/portal/bbs/B0000502/view.do?nttId=10057197&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "한국은행, 전액공급방식의 유동성 지원제도 도입 등 금융안정방안 실시"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-liquidity-support-h5",
        "date": "2020-07-22",
        "title": "전액공급방식 RP매입 종료",
        "summary": "한국은행이 전액공급방식 RP매입을 끝냈다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한국은행, 전액공급방식 RP매입 종료",
            "date": "2020-07-22",
            "url": "https://www.bok.or.kr/portal/bbs/B0000502/view.do?nttId=10059413&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "한국은행, 전액공급방식 RP매입 종료"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-liquidity-support-h6",
        "date": "2022-10-27",
        "title": "단기금융시장 안정화 조치",
        "summary": "한국은행이 단기금융시장 안정화 조치를 시행했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "[보도자료]한국은행, 단기금융시장 안정화 조치 시행",
            "date": "2022-10-27",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10073499&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "한국은행, 단기금융시장 안정화 조치 시행"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "bok-liquidity-support-h7",
        "date": "2023-01-13",
        "title": "단기금융시장 조치 연장",
        "summary": "한국은행이 단기금융시장 안정화 조치를 연장해 시행하기로 했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "[보도자료] 단기금융시장 안정화 조치 연장 시행",
            "date": "2023-01-13",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10074981&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "단기금융시장 안정화 조치 연장 시행"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "bok-liquidity-support-h8",
        "date": "2024-12-04",
        "title": "시장안정화 조치 실시",
        "summary": "금융통화위원회가 임시 회의를 열어 시장안정화 조치를 적극 시행하기로 했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "금융·외환시장 점검 및 시장안정화 조치 실시",
            "date": "2024-12-04",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10088403&menuNo=200690",
            "checkedAt": "2026-10-22",
            "evidence": "시장안정화 조치를 적극 시행하기로 하였음"
          }
        ],
        "governmentId": "gov-yoon"
      }
    ],
    "foreignPolicyId": "fed-qe-qt"
  },
  {
    "id": "fed-qe-qt",
    "scope": "foreign",
    "field": "통화",
    "name": "미국 연준 양적완화·양적긴축",
    "aliases": [
      "양적완화",
      "QE",
      "양적긴축",
      "QT",
      "테이퍼링",
      "연준 대차대조표",
      "연준 보유 자산 축소",
      "대규모 자산매입",
      "Fed balance sheet",
      "quantitative easing",
      "quantitative tightening",
      "balance sheet runoff",
      "asset purchases",
      "taper"
    ],
    "keywords": [
      "유동성",
      "양적완화",
      "대차대조표",
      "자산매입",
      "연준"
    ],
    "firstEffectiveDate": "2008-11-25",
    "asOf": "2025-12-10",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "미국 연방준비제도(Fed)",
      "url": "https://www.federalreserve.gov/monetarypolicy/policytools.htm"
    },
    "history": [
      {
        "id": "fed-qe-qt-h1",
        "date": "2008-11-25",
        "title": "주택증권 매입 프로그램 시작",
        "summary": "연준이 주택담보증권을 최대 5,000억 달러까지 사들이는 프로그램을 시작하기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve announces it will initiate a program to purchase the direct obligations of housing-related government-sponsored enterprises and mortgage-backed securities backed by Fannie Mae, Freddie Mac, and Ginnie Mae",
            "date": "2008-11-25",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20081125b.htm",
            "checkedAt": "2026-10-22",
            "evidence": "Purchases of up to $500 billion in MBS will be conducted by asset managers selected via a competitive process with a goal of beginning these purchases before year-end."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h2",
        "date": "2009-03-18",
        "title": "장기 국채 매입 확대",
        "summary": "연준이 장기 국채를 최대 3,000억 달러 사들이기로 하고 주택담보증권 매입도 늘렸다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FOMC statement",
            "date": "2009-03-18",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20090318a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "Moreover, to help improve conditions in private credit markets, the Committee decided to purchase up to $300 billion of longer-term Treasury securities over the next six months."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h3",
        "date": "2010-11-03",
        "title": "국채 6,000억 달러 추가 매입",
        "summary": "연준이 장기 국채를 6,000억 달러 더 사들이기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FOMC statement",
            "date": "2010-11-03",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20101103a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In addition, the Committee intends to purchase a further $600 billion of longer-term Treasury securities by the end of the second quarter of 2011, a pace of about $75 billion per month."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h4",
        "date": "2012-09-13",
        "title": "주택증권 월 400억 달러 매입",
        "summary": "연준이 주택담보증권을 매달 400억 달러씩 추가로 사들이기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2012-09-13",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20120913a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "To support a stronger economic recovery and to help ensure that inflation, over time, is at the rate most consistent with its dual mandate, the Committee agreed today to increase policy accommodation by purchasing additional agency mortgage-backed securities at a pace of $40 billion per month."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h5",
        "date": "2013-12-18",
        "title": "자산 매입 속도 축소 시작",
        "summary": "연준이 자산을 사들이는 속도를 조금 줄이기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2013-12-18",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20131218a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In light of the cumulative progress toward maximum employment and the improvement in the outlook for labor market conditions, the Committee decided to modestly reduce the pace of its asset purchases."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h6",
        "date": "2014-10-29",
        "title": "자산 매입 프로그램 종료",
        "summary": "연준이 자산을 사들이는 프로그램을 이달에 끝내기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2014-10-29",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20141029a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "Accordingly, the Committee decided to conclude its asset purchase program this month."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h7",
        "date": "2017-06-14",
        "title": "보유 자산 축소 계획 발표",
        "summary": "연준이 보유 자산을 줄이는 방법을 밝혔고 국채는 월 60억 달러 한도에서 시작한다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "FOMC issues addendum to the Policy Normalization Principles and Plans",
            "date": "2017-06-14",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20170614c.htm",
            "checkedAt": "2026-10-22",
            "evidence": "For payments of principal that the Federal Reserve receives from maturing Treasury securities, the Committee anticipates that the cap will be $6 billion per month initially and will increase in steps of $6 billion at three-month intervals over 12 months until it reaches $30 billion per month."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h8",
        "date": "2019-07-31",
        "title": "보유 자산 축소 조기 종료",
        "summary": "연준이 보유 자산을 줄이는 일을 8월에 끝내기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2019-07-31",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20190731a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Committee will conclude the reduction of its aggregate securities holdings in the System Open Market Account in August, two months earlier than previously indicated."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h9",
        "date": "2020-03-15",
        "title": "코로나 대응 대규모 자산 매입",
        "summary": "연준이 국채 5,000억 달러와 주택담보증권 2,000억 달러 이상을 사들이기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2020-03-15",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20200315a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "To support the smooth functioning of markets for Treasury securities and agency mortgage-backed securities that are central to the flow of credit to households and businesses, over coming months the Committee will increase its holdings of Treasury securities by at least $500 billion and its holdings of agency mortgage-backed securities by at least $200 billion."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h10",
        "date": "2021-11-03",
        "title": "자산 매입 축소(테이퍼링) 시작",
        "summary": "연준이 자산을 사들이는 속도를 국채 월 100억, 주택담보증권 월 50억 달러 줄이기 시작했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2021-11-03",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20211103a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "In light of the substantial further progress the economy has made toward the Committee's goals since last December, the Committee decided to begin reducing the monthly pace of its net asset purchases by $10 billion for Treasury securities and $5 billion for agency mortgage-backed securities."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h11",
        "date": "2022-05-04",
        "title": "보유 자산 축소 세부 계획",
        "summary": "연준이 보유 자산 줄이기 계획을 밝혔고 국채는 월 300억 달러 한도에서 시작해 600억으로 늘린다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Plans for Reducing the Size of the Federal Reserve's Balance Sheet",
            "date": "2022-05-04",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20220504b.htm",
            "checkedAt": "2026-10-22",
            "evidence": "For Treasury securities, the cap will initially be set at $30 billion per month and after three months will increase to $60 billion per month."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h12",
        "date": "2025-03-19",
        "title": "자산 축소 속도 늦춤",
        "summary": "연준이 보유 국채를 줄이는 속도를 월 250억에서 50억 달러 한도로 늦추기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2025-03-19",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20250319a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "Beginning in April, the Committee will slow the pace of decline of its securities holdings by reducing the monthly redemption cap on Treasury securities from $25 billion to $5 billion."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h13",
        "date": "2025-10-29",
        "title": "보유 자산 축소 종료 결정",
        "summary": "연준이 보유 자산을 줄이는 일을 12월 1일에 끝내기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2025-10-29",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20251029a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Committee decided to conclude the reduction of its aggregate securities holdings on December 1."
          }
        ]
      },
      {
        "id": "fed-qe-qt-h14",
        "date": "2025-12-10",
        "title": "단기 국채 매입 시작 결정",
        "summary": "연준이 은행의 지급준비금을 충분히 유지하려고 단기 국채를 사들이기 시작하기로 했다.",
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Federal Reserve issues FOMC statement",
            "date": "2025-12-10",
            "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20251210a.htm",
            "checkedAt": "2026-10-22",
            "evidence": "The Committee judges that reserve balances have declined to ample levels and will initiate purchases of shorter-term Treasury securities as needed to maintain an ample supply of reserves on an ongoing basis."
          }
        ]
      }
    ],
    "domesticPolicyId": "bok-liquidity-support"
  },
  {
    "id": "bok-china-swap",
    "scope": "domestic",
    "field": "통화",
    "name": "한·중 통화스와프",
    "aliases": [
      "한중 통화스와프",
      "한·중 통화스와프",
      "한중 통화스왑",
      "한중 스와프",
      "원/위안 통화스왑",
      "Korea China currency swap",
      "BOK PBoC swap",
      "KRW CNY swap"
    ],
    "keywords": [
      "통화스와프",
      "중국",
      "위안화",
      "외환"
    ],
    "firstEffectiveDate": "2002-06-24",
    "asOf": "2025-11-03",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "한국은행",
      "url": "https://www.bok.or.kr/portal/main/contents.do?menuNo=201135"
    },
    "history": [
      {
        "id": "bok-china-swap-h1",
        "date": "2002-06-24",
        "title": "한중 원/위안 통화스왑 최초 서명",
        "summary": "서로 필요할 때 상대에게 20억 달러에 해당하는 돈을 빌려주기로 하는 약속을 처음 맺었다.",
        "sources": [
          {
            "institution": "중국 인민은행",
            "institutionType": "해외 중앙은행",
            "title": "The Central Banks of China and Korea Signed Currency Swap Agreement",
            "date": "2002-06-24",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/4048359/2025080817550930784/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "According to the agreement, the PBC and BOK shall make available to each other convertible currencies equivalent to US$ 2 billion when necessary as a supplement to financial assistance provided by the international financial institutions to overcome balance of payments difficulties and maintain financial stability."
          }
        ],
        "governmentId": "gov-kim-dj"
      },
      {
        "id": "bok-china-swap-h2",
        "date": "2008-12-12",
        "title": "한중 통화스와프 신규 설정 발표",
        "summary": "서로 자국 돈을 맡기고 상대 돈을 빌릴 수 있는 약속을 1,800억 위안/38조 원 한도, 3년 기간으로 맺는다고 발표했다.",
        "sources": [
          {
            "institution": "중국 인민은행",
            "institutionType": "해외 중앙은행",
            "title": "The People’s Bank of China and the Bank of Korea have agreed to establish a Swap Arrangement",
            "date": "2008-12-12",
            "url": "https://www.pbc.gov.cn/english/130721/2025080815063260302/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "This newfacility will support the provision of liquidity in amounts of up to 180billion RMB/ 38 trillion KRW."
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "bok-china-swap-h3",
        "date": "2011-10-26",
        "title": "한중 통화스와프 2배 확대",
        "summary": "서로 자국 돈을 맡기고 상대 돈을 빌릴 수 있는 약속의 규모를 38조 원에서 64조 원(3,600억 위안)으로 2배 늘렸다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "한-중 통화스왑 확대체결 (정책뉴스, 한국은행 기자설명회)",
            "date": "2011-10-26",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148721015",
            "checkedAt": "2026-10-22",
            "evidence": "오늘 한국은행과 중국인민은행은 통화스와프(Swap) 계약 규모를 현행 1,800억 위안, 38조 원에서 그 2배인 3,600억 위안, 64조 원으로 확대하기로 계약을 갱신했습니다."
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "bok-china-swap-h4",
        "date": "2020-10-22",
        "title": "한중 스왑 70조원으로 확대·연장",
        "summary": "서로 자국 돈을 맡기고 상대 돈을 빌릴 수 있는 약속을 64조 원에서 70조 원(4,000억 위안)으로 늘리고 5년 연장했다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Korea-China Currency Swap Renewal",
            "date": "2020-10-22",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10060832&menuNo=400069",
            "checkedAt": "2026-10-22",
            "evidence": "The Bank of Korea and the People’s Bank of China renew the Korean Won-Chinese Yuan Bilateral Currency Swap Arrangement and enlarge its size from 64 trillion KRW/360 billion RMB to 70 trillion KRW/400 billion RMB."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "bok-china-swap-h5",
        "date": "2025-11-03",
        "title": "한중 통화스왑 5년 갱신",
        "summary": "서로 자국 돈을 맡기고 상대 돈을 빌릴 수 있는 약속을 2025년 11월 1일부터 2030년 10월 31일까지 5년으로 다시 맺었다.",
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Bank of Korea and the People's Bank of China Renew the Bilateral Currency Swap Arrangement",
            "date": "2025-11-03",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10094381&menuNo=400423",
            "checkedAt": "2026-10-22",
            "evidence": "The effective period is five years from November 1, 2025 to October 31, 2030 and could be extended by agreement between the two sides."
          },
          {
            "institution": "중국 인민은행",
            "institutionType": "해외 중앙은행",
            "title": "PBOC and BOK Renew Bilateral Currency Swap Agreement",
            "date": "2025-11-03",
            "url": "https://www.pbc.gov.cn/en/3688241/3688636/3688657/2025120610020728292/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "The size of the agreement is RMB400 billion (KRW70 trillion)."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ],
    "foreignPolicyId": "pboc-monetary"
  },
  {
    "id": "pboc-monetary",
    "scope": "foreign",
    "field": "통화",
    "name": "중국 인민은행 통화정책",
    "aliases": [
      "중국 통화정책",
      "인민은행",
      "중국 중앙은행",
      "PBoC",
      "PBOC",
      "People's Bank of China",
      "중국 기준금리",
      "중국 정책금리",
      "7일 역환매 금리",
      "LPR",
      "대출우대금리",
      "지급준비율",
      "중국 지준율",
      "RRR",
      "PSL"
    ],
    "keywords": [
      "금리",
      "지급준비율",
      "중국",
      "위안화"
    ],
    "firstEffectiveDate": "2019-08-20",
    "asOf": "2026-09-29",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "중국 인민은행(PBoC)",
      "url": "https://www.pbc.gov.cn/en/3688229/index.html"
    },
    "history": [
      {
        "id": "pboc-monetary-h1",
        "date": "2019-08-20",
        "title": "LPR(대출우대금리) 개혁",
        "summary": "대출우대금리(LPR)를 시장 운용금리에 가산하는 방식으로 바꿔 2019년 8월 20일 처음 발표했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBC Official Answers Press Questions on Improving Loan Prime Rate (LPR) Formation Mechanism",
            "date": "2019-08-20",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/4048311/2025080817513493191/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "The LPR under the former mechanism will be suspended for a day on August 19, 2019, and the new LPR will be released for the first time on August 20."
          }
        ]
      },
      {
        "id": "pboc-monetary-h2",
        "date": "2020-03-13",
        "title": "중소·포용금융 지준율 인하",
        "summary": "대출 지원 기준을 채운 은행의 지급준비율(은행이 중앙은행에 맡겨야 하는 돈의 비율)을 3월 16일 0.5~1%포인트 낮추기로 했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBC Scheduled to Conduct Targeted RRR Cuts on March 16, Releasing RMB550 Billion Long-term Funds",
            "date": "2020-03-13",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/4048269/2025092319414887065/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "the People' Bank of China (PBC) has decided to implement targeted Required Reserve Ratio (RRR) cuts for inclusive finance on March 16, 2020, lowering the RRR for banks that meet assessment criteria by 0.5 to 1 percentage point."
          }
        ]
      },
      {
        "id": "pboc-monetary-h3",
        "date": "2023-03-17",
        "title": "2023년 3월 지급준비율 인하",
        "summary": "은행이 중앙은행에 맡겨야 하는 돈의 비율(지급준비율)을 2023년 3월 27일 0.25%포인트 낮추기로 했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBOC to Cut Required Reserve Ratio for Financial Institutions on March 27, 2023",
            "date": "2023-03-17",
            "url": "https://www.pbc.gov.cn/en/3688229/3688335/3730270/2025112115010786890/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "is scheduled to cut the required reserve ratio (RRR) for financial institutions by 0.25 percentage points (excluding those that have already implemented an RRR of 5 percent) on March 27, 2023."
          }
        ]
      },
      {
        "id": "pboc-monetary-h4",
        "date": "2024-01-24",
        "title": "2024년 2월 지급준비율 인하",
        "summary": "은행이 중앙은행에 맡겨야 하는 돈의 비율(지급준비율)을 2024년 2월 5일부터 0.5%포인트 낮추기로 했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBOC to Cut RRR and Interest Rates on Central Bank Lending and Discounts",
            "date": "2024-01-24",
            "url": "https://www.pbc.gov.cn/en/3688229/3688335/3730270/2025112115010743638/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "the People’s Bank of China (PBOC) is set to cut the required reserve ratio (RRR) for financial institutions by 0.5 percentage points (excluding the financial institutions that have already implemented an RRR of 5 percent), which will be effective from February 5, 2024."
          }
        ]
      },
      {
        "id": "pboc-monetary-h5",
        "date": "2024-09-24",
        "title": "대규모 통화완화 패키지 발표",
        "summary": "은행이 맡기는 돈의 비율을 0.5%포인트 낮추고 7일 역환매 금리를 1.7%에서 1.5%로 내리기로 했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "SCIO Holds Press Conference on Providing Financial Support for High-quality Economic Development",
            "date": "2024-09-24",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/5188125/2025112114573374594/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "As for the central bank policy rates, we will lower the 7-day reverse repo rate by 0.2 percentage points from the current 1.7 percent to 1.5 percent."
          }
        ]
      },
      {
        "id": "pboc-monetary-h6",
        "date": "2025-05-07",
        "title": "2025년 5월 금융정책 패키지",
        "summary": "은행이 맡기는 돈의 비율을 0.5%포인트, 정책금리를 0.1%포인트 낮추는 정책 꾸러미를 발표했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "SCIO Holds Press Conference on Launching Financial Policy Package to Stabilize the Market and Expectations",
            "date": "2025-05-07",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/5552468/2025092319411692666/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "First, regarding the reduction of the RRR, we will lower the RRR by 0.5 percentage points this time, releasing approximately RMB1 trillion in long-term liquidity to the financial market."
          }
        ]
      },
      {
        "id": "pboc-monetary-h7",
        "date": "2026-01-15",
        "title": "2026년 1월 재대출 금리 인하",
        "summary": "중앙은행이 은행에 빌려주는 대출과 재할인 금리를 1월 19일부터 0.25%포인트 낮추기로 했다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBOC to Cut Central Bank Lending and Central Bank Discount Rates",
            "date": "2026-01-15",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/2026/2026011909531579224/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "the central bank lending and central bank discount rates by 0.25 percentage points, effective from January 19, 2026."
          }
        ]
      },
      {
        "id": "pboc-monetary-h8",
        "date": "2026-09-29",
        "title": "통화정책 수단 조정(PSL 금리 인하)",
        "summary": "중앙은행이 정책은행에 빌려주는 담보보완대출(PSL) 금리를 1.75%에서 1.5%로 내렸다.",
        "sources": [
          {
            "institution": "중국 인민은행(PBoC)",
            "institutionType": "해외 중앙은행",
            "title": "PBOC Adjusts and Improves Several Monetary Policy Tools",
            "date": "2026-09-29",
            "url": "https://www.pbc.gov.cn/en/3688110/3688172/2026/2026093015565447786/index.html",
            "checkedAt": "2026-10-22",
            "evidence": "The one-year PSL rate has been lowered from 1.75 percent to 1.5 percent, giving policy banks stronger incentives to support the real economy and serve national strategies."
          }
        ]
      }
    ],
    "domesticPolicyId": "bok-china-swap"
  }
];
