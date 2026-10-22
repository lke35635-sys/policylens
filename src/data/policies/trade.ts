// Design Ref: §5 Policy, PLAN 5번 — 무역·관세 분야의 정책 연혁 (국내 3개 + 해외 짝 3개).
// 모든 항목은 2026-10-22에 공식 사이트 페이지를 직접 열어 확인한 것이다. 항목의 evidence는 그 출처 페이지에 그대로 있는 근거 문장이며,
// scripts/check-evidence.mjs가 출처 주소를 다시 열어 이 문장이 지금도 있는지 확인한다 (화면에는 보이지 않는다).
// 이 파일은 조사 결과를 옮겨 만든 것이므로 연혁 항목을 고칠 때는 출처 페이지를 다시 열어 확인한 뒤 evidence도 함께 고친다.
//
// 짝 (국내 ↔ 해외)
// - 한국의 대미 관세 협상·대응 ↔ 미국 관세 정책
// - 수출 지원·무역금융 확대 대책 ↔ 미중 무역갈등 (한국 수출의 큰 상대국인 중국·미국 사이의 관세 갈등)
// - 소재·부품·장비(소부장) 경쟁력 강화 대책 ↔ 일본의 대한국 수출관리 운용 변경 (한국과 관계가 가장 깊은 다른 나라 정책으로 일본을 골랐다)
//
// 주의할 점
// - 보도자료 본문이 첨부파일뿐인 항목은 보도자료 제목에 있는 사실만 요약했고 요약 끝에 그 사실을 밝혔다.
// - 정책뉴스(korea.kr 기사) 출처는 부처 원문 보도자료가 첨부파일뿐이라 근거 문장을 뽑을 수 없어 대신 썼다.
// - 일본 수출관리 운용 변경: 2019년 두 항목은 법령 개정 목록의 날짜(공포·시행·각의)만 확인된다. 한국 관련 보도자료 원문은 사이트에서 열리지 않았다.
// - 일본 3월 17일 항목은 보도자료가 아니라 경제산업대신 기자회견 발언록이다 (정식 보도자료는 3월 16일이나 열리지 않았다).
// - 미국 관세 정책: 연방관보 게재 문서의 날짜는 대통령 서명일이다. 대중국 301조 관세는 미중 무역갈등 정책에 둔다.
// - 미중 무역갈등: 연방관보 항목의 날짜는 게재일이다. 중국 쪽 맞대응은 중국 정부 포털에 실린 신화통신 기사 1건만 확인했다.
// - 한국의 대미 관세 협상·대응: 2025-07-30 항목은 협상 타결일이고 문서 날짜는 7월 31일이다. 최초 시행일 2018-03-26은 미국 철강 관세 면제 협상 타결 브리핑 날짜다.
// - 수출 지원·무역금융 확대 대책: 이 정책을 모아 소개하는 정부 전용 페이지는 찾지 못해 정책브리핑 보도자료 목록을 공식 사이트로 썼다. 최초 시행일은 확인한 가장 오래된 항목의 날짜다.
import type { Policy } from "../../lib/corpus/types";

export const TRADE_POLICIES: Policy[] = [
  {
    "id": "us-tariffs",
    "scope": "foreign",
    "field": "무역·관세",
    "name": "미국 관세 정책",
    "aliases": [
      "미국 관세",
      "트럼프 관세",
      "상호관세",
      "철강 관세",
      "알루미늄 관세",
      "철강 알루미늄 관세",
      "232조",
      "자동차 관세",
      "IEEPA",
      "IEEPA 관세",
      "122조",
      "임시 수입 부과금",
      "US tariffs",
      "reciprocal tariffs",
      "Section 232",
      "Section 122",
      "Section 301",
      "Trump tariffs"
    ],
    "keywords": [
      "관세",
      "232조",
      "상호관세",
      "IEEPA",
      "미국"
    ],
    "firstEffectiveDate": "2018-03-08",
    "asOf": "2026-08-13",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "미국 관세국경보호청(CBP)",
      "url": "https://www.cbp.gov/trade/programs-administration/trade-remedies"
    },
    "history": [
      {
        "id": "us-tariffs-h1",
        "date": "2018-03-08",
        "title": "철강 232조 25% 관세",
        "summary": "수입 철강에 캐나다와 멕시코를 뺀 모든 나라에 25% 관세를 매기기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Adjusting Imports of Steel Into the United States",
            "date": "2018-03-08",
            "url": "https://www.federalregister.gov/documents/2018/03/15/2018-05478/adjusting-imports-of-steel-into-the-united-states",
            "checkedAt": "2026-10-22",
            "evidence": "I have decided to adjust the imports of steel articles by imposing a 25 percent ad valorem tariff on steel articles, as defined below, imported from all countries except Canada and Mexico."
          }
        ]
      },
      {
        "id": "us-tariffs-h2",
        "date": "2025-02-10",
        "title": "알루미늄 관세 25%로 인상",
        "summary": "알루미늄과 파생제품 관세율을 10%에서 25%로 올렸다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Adjusting Imports of Aluminum Into the United States",
            "date": "2025-02-10",
            "url": "https://www.federalregister.gov/documents/2025/02/18/2025-02832/adjusting-imports-of-aluminum-into-the-united-states",
            "checkedAt": "2026-10-22",
            "evidence": "I have determined that it is necessary and appropriate to adjust the tariff proclaimed by Proclamation 9704, as amended, and the tariff proclaimed by Proclamation 9980, as amended, to increase the tariff rate from 10 percent ad valorem to 25 percent ad valorem."
          }
        ]
      },
      {
        "id": "us-tariffs-h3",
        "date": "2025-03-26",
        "title": "자동차 232조 25% 관세",
        "summary": "지정한 수입 자동차와 자동차 부품에 25% 관세를 매기기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Adjusting Imports of Automobiles and Automobile Parts Into the United States",
            "date": "2025-03-26",
            "url": "https://www.federalregister.gov/documents/2025/04/03/2025-05930/adjusting-imports-of-automobiles-and-automobile-parts-into-the-united-states",
            "checkedAt": "2026-10-22",
            "evidence": "shall be subject to a 25 percent tariff with respect to goods entered for consumption or withdrawn from warehouse for consumption"
          }
        ]
      },
      {
        "id": "us-tariffs-h4",
        "date": "2025-04-02",
        "title": "상호관세 행정명령 발표",
        "summary": "모든 수입품에 10%의 추가 관세를 매기고 일부 나라는 더 높은 세율을 적용한다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Regulating Imports With a Reciprocal Tariff To Rectify Trade Practices That Contribute to Large and Persistent Annual United States Goods Trade Deficits",
            "date": "2025-04-02",
            "url": "https://www.federalregister.gov/documents/2025/04/07/2025-06063/regulating-imports-with-a-reciprocal-tariff-to-rectify-trade-practices-that-contribute-to-large-and",
            "checkedAt": "2026-10-22",
            "evidence": "all articles imported into the customs territory of the United States shall be, consistent with law, subject to an additional ad valorem rate of duty of 10 percent."
          }
        ]
      },
      {
        "id": "us-tariffs-h5",
        "date": "2025-04-09",
        "title": "상호관세 90일 유예",
        "summary": "부속서 나라들의 개별 상호관세를 90일 멈추고 대신 10% 추가 관세를 매긴다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Modifying Reciprocal Tariff Rates To Reflect Trading Partner Retaliation and Alignment",
            "date": "2025-04-09",
            "url": "https://www.federalregister.gov/documents/2025/04/15/2025-06462/modifying-reciprocal-tariff-rates-to-reflect-trading-partner-retaliation-and-alignment",
            "checkedAt": "2026-10-22",
            "evidence": "shall be, consistent with law, subject to an additional ad valorem rate of duty of 10 percent, subject to all applicable exceptions set forth in Executive Order 14257."
          }
        ]
      },
      {
        "id": "us-tariffs-h6",
        "date": "2025-06-03",
        "title": "철강·알루미늄 관세 50%",
        "summary": "철강·알루미늄과 파생제품 관세를 25%에서 50%로 올렸다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Adjusting Imports of Aluminum and Steel Into the United States",
            "date": "2025-06-03",
            "url": "https://www.federalregister.gov/documents/2025/06/09/2025-10524/adjusting-imports-of-aluminum-and-steel-into-the-united-states",
            "checkedAt": "2026-10-22",
            "evidence": "to increase the tariff rate for imports of steel articles and derivative steel articles, and aluminum articles and derivative aluminum articles, from 25 percent ad valorem to 50 percent ad valorem"
          }
        ]
      },
      {
        "id": "us-tariffs-h7",
        "date": "2025-07-31",
        "title": "상호관세율 재조정",
        "summary": "나라별 상호관세율을 부속서대로 다시 정하고 목록에 없는 나라는 10%를 적용한다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Further Modifying the Reciprocal Tariff Rates",
            "date": "2025-07-31",
            "url": "https://www.federalregister.gov/documents/2025/08/06/2025-15010/further-modifying-the-reciprocal-tariff-rates",
            "checkedAt": "2026-10-22",
            "evidence": "Goods of any foreign trading partner that is not listed in Annex I to this order will be subject to an additional ad valorem rate of duty of 10 percent pursuant to the terms of Executive Order 14257, as amended, unless otherwise expressly provided."
          }
        ]
      },
      {
        "id": "us-tariffs-h8",
        "date": "2026-02-20",
        "title": "IEEPA 추가 관세 종료",
        "summary": "IEEPA를 근거로 한 상호관세 등 추가 관세를 효력이 없게 하고 걷는 것도 멈추기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Ending Certain Tariff Actions",
            "date": "2026-02-20",
            "url": "https://www.federalregister.gov/documents/2026/02/25/2026-03832/ending-certain-tariff-actions",
            "checkedAt": "2026-10-22",
            "evidence": "shall no longer be in effect and, as soon as practicable, shall no longer be collected."
          },
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Imposing a Temporary Import Surcharge To Address Fundamental International Payments Problems",
            "date": "2026-02-20",
            "url": "https://www.federalregister.gov/documents/2026/02/25/2026-03824/imposing-a-temporary-import-surcharge-to-address-fundamental-international-payments-problems",
            "checkedAt": "2026-10-22",
            "evidence": "Accordingly, I impose, for a period of 150 days, a temporary import surcharge of 10 percent ad valorem, as described below, on articles imported into the United States, effective February 24, 2026."
          }
        ]
      },
      {
        "id": "us-tariffs-h9",
        "date": "2026-06-01",
        "title": "금속 파생제품 15% 범위 확대",
        "summary": "농기계와 주거용 냉난방 설비를 15%로 낮춘 관세 대상 파생제품에 넣었다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Further Adjusting the Tariff Regimes for Imports of Aluminum, Steel, and Copper Into the United States",
            "date": "2026-06-01",
            "url": "https://www.federalregister.gov/documents/2026/06/04/2026-11314/further-adjusting-the-tariff-regimes-for-imports-of-aluminum-steel-and-copper-into-the-united-states",
            "checkedAt": "2026-10-22",
            "evidence": "I determine that agricultural equipment and certain HVAC systems and components that are predominantly for residential use shall be included in the category of derivative products subject to the temporarily-reduced 15 percent ad valorem duty under Proclamation 11021."
          }
        ]
      },
      {
        "id": "us-tariffs-h10",
        "date": "2026-07-23",
        "title": "60개 경제 대상 301조 관세",
        "summary": "강제노동 제품 수입 금지 문제로 여러 나라에 301조 관세 10%나 12.5%를 매긴다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Actions by the United States in the Investigations Under Section 301 of the Trade Act of 1974 of the Acts, Policies, and Practices of 60 Economies Related to the Failure of Each Economy To Impose and Effectively Enforce a Prohibition on the Importation of Goods Produced With Forced Labor",
            "date": "2026-07-23",
            "url": "https://www.federalregister.gov/documents/2026/07/28/2026-15274/actions-by-the-united-states-in-the-investigations-under-section-301-of-the-trade-act-of-1974-of-the",
            "checkedAt": "2026-10-22",
            "evidence": "10 percent tariff rate: The Trade Representative shall impose a tariff of 10 percent on goods of Argentina, Bangladesh, Cambodia, Canada, Ecuador, El Salvador, Guatemala, Honduras, India, Indonesia, Jordan, Malaysia, Mexico, Pakistan, Sri Lanka, the United Kingdom, and Trinidad and Tobago."
          }
        ]
      },
      {
        "id": "us-tariffs-h11",
        "date": "2026-08-13",
        "title": "무인항공기 232조 관세",
        "summary": "무인항공기와 핵심 부품에 100%, 일부 무인항공기에는 25% 관세를 매기기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관(연방관보 게재)",
            "institutionType": "해외 정부 기관",
            "title": "Adjusting Imports of Unmanned Aircraft Systems and Unmanned Aircraft Systems Components Into the United States",
            "date": "2026-08-13",
            "url": "https://www.federalregister.gov/documents/2026/08/19/2026-16979/adjusting-imports-of-unmanned-aircraft-systems-and-unmanned-aircraft-systems-components-into-the",
            "checkedAt": "2026-10-22",
            "evidence": "100 percent for the UAS and UAS docking stations and critical components listed in Annex I to this proclamation, unless a lower rate of duty applies pursuant to clause (4) or (6) of this proclamation"
          }
        ]
      }
    ],
    "domesticPolicyId": "kr-us-tariff-negotiation"
  },
  {
    "id": "kr-us-tariff-negotiation",
    "scope": "domestic",
    "field": "무역·관세",
    "name": "한국의 대미 관세 협상·대응",
    "aliases": [
      "대미 관세 협상",
      "관세 협상",
      "한미 관세 합의",
      "한미 관세협상 타결",
      "상호관세 대응",
      "철강 쿼터",
      "철강 232조 면제",
      "한미 FTA 개정",
      "전략적 투자 MOU",
      "Korea US tariff negotiation"
    ],
    "keywords": [
      "관세",
      "한미 FTA",
      "통상협상",
      "철강",
      "자동차"
    ],
    "firstEffectiveDate": "2018-03-26",
    "asOf": "2026-08-11",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "산업통상부",
      "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c"
    },
    "history": [
      {
        "id": "kr-us-tariff-negotiation-h1",
        "date": "2018-03-26",
        "title": "철강 232조 면제·FTA 타결 브리핑",
        "summary": "미국 철강 관세에서 한국이 면제되고, 2017년 기준 74% 물량을 추가관세 없이 수출하기로 했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "미 철강 232조 조치 및 제3차 한미 FTA 개정 협상 관련 브리핑",
            "date": "2018-03-26",
            "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156260684",
            "checkedAt": "2026-10-22",
            "evidence": "철강협상에서는 한국이 처음으로 국가면제협상을 끝마쳤고, 2015년에서 2017년 3년 평균으로, 기준으로 해서 70% 쿼터를 받고, 2017년 기준으로 하면 이게 74%가 되겠습니다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-us-tariff-negotiation-h2",
        "date": "2018-09-27",
        "title": "한미 FTA 개정 결과문서 서명",
        "summary": "한미 FTA 개정협상 결과문서에 서명했다(본문이 첨부파일뿐이라 제목 기준).",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "(참고자료)한미 FTA 개정협상 결과문서 서명 - 보도자료",
            "date": "2018-09-27",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156296271",
            "checkedAt": "2026-10-22",
            "evidence": "(참고자료) 한미 FTA 개정협상 결과문서 서명"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-us-tariff-negotiation-h3",
        "date": "2018-12-10",
        "title": "한미 FTA 개정의정서 국회 통과",
        "summary": "한미 FTA 개정의정서 비준동의안이 국회를 통과했다(본문이 첨부파일뿐이라 제목 기준).",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "(참고자료)한미 FTA 개정의정서 비준동의안 국회 통과 - 보도자료",
            "date": "2018-12-10",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156307841",
            "checkedAt": "2026-10-22",
            "evidence": "(참고자료)한미 FTA 개정의정서 비준동의안 국회 통과"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-us-tariff-negotiation-h4",
        "date": "2025-04-14",
        "title": "미 상호관세 대응 협상단 구성",
        "summary": "미 상호관세에 대응해 산업부 장관 중심 협상단을 꾸리고 빠른 시일 내 방미를 추진하기로 했다.",
        "sources": [
          {
            "institution": "국무조정실",
            "institutionType": "정부 부처",
            "title": "정부, 미 상호관세 대응 협상단 구성…\"빠른 시일 내 방미 추진\" - 정책뉴스",
            "date": "2025-04-14",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148941755",
            "checkedAt": "2026-10-22",
            "evidence": "양국 간 협상을 위해 산업부 장관을 중심으로 협상단을 구성하고, 빠른 시일 내에 방미를 추진해 본격적인 협상에 착수하겠다"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-us-tariff-negotiation-h5",
        "date": "2025-07-30",
        "title": "한미 관세협상 타결",
        "summary": "한미 관세협상이 타결돼 상호관세와 자동차 232조 관세가 25%에서 15%로 낮아지기로 했다.",
        "sources": [
          {
            "institution": "산업통상자원부·기획재정부",
            "institutionType": "정부 부처",
            "title": "한미 관세협상 타결…상호관세 25%→15%, 자동차·부품 15% - 정책뉴스",
            "date": "2025-07-31",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148946888",
            "checkedAt": "2026-10-22",
            "evidence": "합의 내용에 따르면 미국은 우리나라에 대해 8월 1일부터 상호관세를 25%에서 15%로 낮추고, 우리 주력 수출품목인 자동차 232조 관세도 25%에서 15%로 낮추기로 했다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-us-tariff-negotiation-h6",
        "date": "2025-11-14",
        "title": "한미 전략적 투자 MOU 체결",
        "summary": "한미 정부가 3,500억 불 규모 전략적 투자에 관한 양해각서를 체결했다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "한미 관세 협상 팩트시트 및 MOU 관련 브리핑 - 부처 브리핑",
            "date": "2025-11-14",
            "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156728415",
            "checkedAt": "2026-10-22",
            "evidence": "3,500억 불 규모의 전략적 투자는 2,000억 불의 투자와 1,500억 불의 조선 협력 투자로 구성됩니다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-us-tariff-negotiation-h7",
        "date": "2026-02-23",
        "title": "미 IEEPA 판결 후 민관 대응",
        "summary": "미국 IEEPA 판결과 관세조치 변화에 민관이 긴밀히 소통하며 대응하기로 했다(본문이 첨부파일뿐이라 제목 기준).",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "(참고자료)美 IEEPA 판결 및 관세조치 변화 민관 긴밀한 소통으로 대응 - 보도자료",
            "date": "2026-02-23",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156745380",
            "checkedAt": "2026-10-22",
            "evidence": "(참고자료)美 IEEPA 판결 및 관세조치 변화 민관 긴밀한 소통으로 대응"
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-us-tariff-negotiation-h8",
        "date": "2026-07-24",
        "title": "미 강제노동 301조 관세 최종 발표 대응",
        "summary": "미국이 강제노동 301조 관세를 확정해 한국에는 MFN 관세와 합쳐 총 12.5%가 적용된다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "미 '강제노동 301조 관세' 최종 발표…한국·일본 등 12.5% - 정책뉴스",
            "date": "2026-07-24",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148968735",
            "checkedAt": "2026-10-22",
            "evidence": "우리나라엔 기존 최혜국대우(MFN) 관세율과 이번 추가 관세를 합해 총 12.5%의 관세율이 적용된다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-us-tariff-negotiation-h9",
        "date": "2026-08-11",
        "title": "폴리실리콘 232조 관세 대책회의",
        "summary": "정부가 미국의 폴리실리콘 232조 관세 발표에 맞춰 관계부처·업계 대책회의를 열었다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "산업부, 美 폴리실리콘 232조 관세 민관합동 대책회의 개최",
            "date": "2026-08-11",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/172098/view",
            "checkedAt": "2026-10-22",
            "evidence": "8.11(화) 16:30 대한상공회의소에서 박정성 통상차관보 주재로 관계부처·업계 대책회의를 개최하였다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ],
    "foreignPolicyId": "us-tariffs"
  },
  {
    "id": "us-china-trade-conflict",
    "scope": "foreign",
    "field": "무역·관세",
    "name": "미중 무역갈등(미국의 대중 관세와 중국의 맞대응)",
    "aliases": [
      "미중 무역전쟁",
      "미중 무역갈등",
      "대중 관세",
      "대중국 관세",
      "301조",
      "301조 관세",
      "중국 관세",
      "1단계 무역합의",
      "미중 1단계 합의",
      "제네바 휴전",
      "미중 관세 휴전",
      "상호관세 중국",
      "펜타닐 관세",
      "US China trade war",
      "Section 301 China tariffs",
      "Phase One",
      "US-China tariff truce",
      "Geneva joint statement"
    ],
    "keywords": [
      "관세",
      "301조",
      "미중",
      "무역합의",
      "중국"
    ],
    "firstEffectiveDate": "2018-07-06",
    "asOf": "2026-09-25",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "미국 무역대표부(USTR)",
      "url": "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions"
    },
    "history": [
      {
        "id": "us-china-trade-conflict-h1",
        "date": "2018-06-20",
        "title": "301조 첫 관세 부과 결정",
        "summary": "미국이 중국산 제품에 25% 추가 관세를 부과하고 2018년 7월 6일부터 적용하기로 했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Notice of Action and Request for Public Comment Concerning Proposed Determination of Action Pursuant to Section 301: China's Acts, Policies, and Practices Related to Technology Transfer, Intellectual Property, and Innovation",
            "date": "2018-06-20",
            "url": "https://www.federalregister.gov/documents/2018/06/20/2018-13248/notice-of-action-and-request-for-public-comment-concerning-proposed-determination-of-action-pursuant",
            "checkedAt": "2026-10-22",
            "evidence": "The additional duties set out in Annex A to this notice are applicable with respect to products that are entered for consumption, or withdrawn from warehouse for consumption, on or after July 6, 2018."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h2",
        "date": "2018-09-21",
        "title": "301조 3차 관세 부과",
        "summary": "미국이 중국산 제품에 2018년 9월 24일부터 10% 추가 관세를 매기고 2019년 1월 1일에 25%로 올리기로 했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Notice of Modification of Section 301 Action: China's Acts, Policies, and Practices Related to Technology Transfer, Intellectual Property, and Innovation",
            "date": "2018-09-21",
            "url": "https://www.federalregister.gov/documents/2018/09/21/2018-20610/notice-of-modification-of-section-301-action-chinas-acts-policies-and-practices-related-to",
            "checkedAt": "2026-10-22",
            "evidence": "On January 1, 2019, the rate of additional duty will increase to 25 percent ad valorem."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h3",
        "date": "2019-05-09",
        "title": "3차 관세 25%로 인상",
        "summary": "미국이 2018년 9월 조치 대상 중국산 제품의 추가 관세율을 2019년 5월 10일부터 25%로 올리기로 했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Notice of Modification of Section 301 Action: China's Acts, Policies, and Practices Related to Technology Transfer, Intellectual Property, and Innovation",
            "date": "2019-05-09",
            "url": "https://www.federalregister.gov/documents/2019/05/09/2019-09681/notice-of-modification-of-section-301-action-chinas-acts-policies-and-practices-related-to",
            "checkedAt": "2026-10-22",
            "evidence": "In light of the lack of progress in discussions with China, the President has directed the Trade Representative to increase the rate of additional duty to 25 percent."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h4",
        "date": "2020-01-15",
        "title": "1단계 무역합의 서명",
        "summary": "미국과 중국이 2020년 1월 15일 1단계 무역합의에 서명했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Phase One | United States Trade Representative",
            "date": "2020-01-15",
            "url": "https://ustr.gov/phase-one",
            "checkedAt": "2026-10-22",
            "evidence": "The United States and China signed an historic and enforceable agreement on a Phase One trade deal on January 15, 2020."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h5",
        "date": "2024-09-18",
        "title": "301조 4년 검토 관세 인상",
        "summary": "미국이 4년 재검토에 따라 중국산 전략 분야 제품에 301조 관세를 새로 매기거나 올리기로 했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Notice of Modification: China's Acts, Policies and Practices Related to Technology Transfer, Intellectual Property and Innovation",
            "date": "2024-09-18",
            "url": "https://www.federalregister.gov/documents/2024/09/18/2024-21217/notice-of-modification-chinas-acts-policies-and-practices-related-to-technology-transfer",
            "checkedAt": "2026-10-22",
            "evidence": "Tariff increases in 2024 are applicable with respect to products that are entered for consumption, or withdrawn from warehouse for consumption, on or after September 27, 2024."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h6",
        "date": "2025-02-01",
        "title": "합성마약 관련 10% 관세",
        "summary": "미국이 합성마약 공급망 문제를 이유로 중국산 제품에 10% 추가 관세를 2025년 2월 4일부터 부과하기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Imposing Duties to Address the Synthetic Opioid Supply Chain in the People's Republic of China",
            "date": "2025-02-01",
            "url": "https://www.whitehouse.gov/presidential-actions/2025/02/imposing-duties-to-address-the-synthetic-opioid-supply-chain-in-the-peoples-republic-of-china/",
            "checkedAt": "2026-10-22",
            "evidence": "shall be, consistent with law, subject to an additional 10 percent ad valorem rate of duty."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h7",
        "date": "2025-04-09",
        "title": "대중 상호관세 125%로 인상",
        "summary": "미국이 중국의 84% 보복관세 발표에 맞서 중국산 제품의 상호관세율을 84%에서 125%로 올렸다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Modifying Reciprocal Tariff Rates to Reflect Trading Partner Retaliation and Alignment",
            "date": "2025-04-09",
            "url": "https://www.whitehouse.gov/presidential-actions/2025/04/modifying-reciprocal-tariff-rates-to-reflect-trading-partner-retaliation-and-alignment/",
            "checkedAt": "2026-10-22",
            "evidence": "heading 9903.01.63 of the HTSUS shall be amended by deleting “84%” each place that it appears and by inserting “125%” in lieu thereof"
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h8",
        "date": "2025-05-12",
        "title": "제네바 공동성명 관세 유예",
        "summary": "미국과 중국이 추가 관세율 중 24%포인트를 90일간 멈추고 10%만 남기기로 공동성명에서 밝혔다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Joint Statement on U.S.-China Economic and Trade Meeting in Geneva",
            "date": "2025-05-12",
            "url": "https://www.whitehouse.gov/briefings-statements/2025/05/joint-statement-on-u-s-china-economic-and-trade-meeting-in-geneva/",
            "checkedAt": "2026-10-22",
            "evidence": "by suspending 24 percentage points of that rate for an initial period of 90 days, while retaining the remaining additional ad valorem rate of 10 percent on those articles"
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h9",
        "date": "2025-05-13",
        "title": "중국의 대미 추가 관세 유예 발표",
        "summary": "중국이 미국산 제품 추가 관세 중 24%포인트를 90일간 멈추고 10%만 남기기로 했다.",
        "sources": [
          {
            "institution": "중국 정부 포털(영문판, 신화통신 전재)",
            "institutionType": "해외 정부 기관",
            "title": "China to adjust tariffs on imported U.S. products on Wednesday",
            "date": "2025-05-13",
            "url": "https://english.www.gov.cn/news/202505/14/content_WS6823dad6c6d0868f4e8f283d.html",
            "checkedAt": "2026-10-22",
            "evidence": "China will modify accordingly the application of the additional ad valorem rate of duty on articles of the United States set forth in the Announcement of the Customs Tariff Commission of the State Council No. 4 of 2025, by suspending 24 percentage points of that rate for an initial period of 90 days, while retaining the remaining additional ad valorem rate of 10 percent on those articles."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h10",
        "date": "2025-11-04",
        "title": "마약 관련 관세 20%에서 10%",
        "summary": "미국이 중국산 제품의 합성마약 관련 추가 관세율을 2025년 11월 10일부터 20%에서 10%로 낮추기로 했다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Modifying Duties Addressing the Synthetic Opioid Supply Chain in the People's Republic of China",
            "date": "2025-11-04",
            "url": "https://www.whitehouse.gov/presidential-actions/2025/11/modifying-duties-addressing-the-synthetic-opioid-supply-chain-in-the-peoples-republic-of-china/",
            "checkedAt": "2026-10-22",
            "evidence": "the United States committed to, among other things, reduce the additional ad valorem rate of duty applicable under Executive Order 14195, as amended, from 20 percent to 10 percent, effective November 10, 2025."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h11",
        "date": "2026-02-20",
        "title": "IEEPA 추가 관세 종료",
        "summary": "미국이 국제비상경제권한법(IEEPA)에 따른 중국 등 대상 추가 관세의 효력을 없애고 징수를 멈추게 했다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Ending Certain Tariff Actions",
            "date": "2026-02-20",
            "url": "https://www.whitehouse.gov/presidential-actions/2026/02/ending-certain-tariff-actions/",
            "checkedAt": "2026-10-22",
            "evidence": "shall no longer be in effect and, as soon as practicable, shall no longer be collected."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h12",
        "date": "2026-07-28",
        "title": "강제노동 301조 12.5% 관세",
        "summary": "미국 무역대표부가 강제노동 수입금지 미비를 이유로 중국산 제품에 12.5% 관세를 2026년 7월 24일부터 적용했다.",
        "sources": [
          {
            "institution": "미국 무역대표부(USTR)",
            "institutionType": "해외 정부 기관",
            "title": "Notice of Actions in Section 301 Investigations of Acts, Policies, and Practices of Various Economies Related to the Failure of Each Economy To Impose and Effectively Enforce a Prohibition on the Importation of Goods Produced With Forced Labor",
            "date": "2026-07-28",
            "url": "https://www.federalregister.gov/documents/2026/07/28/2026-15181/notice-of-actions-in-section-301-investigations-of-acts-policies-and-practices-of-various-economies",
            "checkedAt": "2026-10-22",
            "evidence": "the Trade Representative has determined to impose 12.5 percent tariffs on products of China, except as provided in Annex I and Annex II, Part A, of this Notice."
          }
        ]
      },
      {
        "id": "us-china-trade-conflict-h13",
        "date": "2026-09-25",
        "title": "무역위원회 관세 우대 합의",
        "summary": "미국과 중국이 무역위원회에서 각각 300억 달러어치 비민감 품목의 관세 우대 권고에 합의했다.",
        "sources": [
          {
            "institution": "미국 백악관",
            "institutionType": "해외 정부 기관",
            "title": "Fact Sheet: President Donald J. Trump Advances a Fair and Reciprocal Relationship with China While Hosting Historic State Visit",
            "date": "2026-09-25",
            "url": "https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-advances-a-fair-and-reciprocal-relationship-with-china-while-hosting-historic-state-visit/",
            "checkedAt": "2026-10-22",
            "evidence": "Under the Board of Trade, the two countries reached consensus on recommendations for more favorable tariff treatment for $30 billion of non-sensitive goods in each direction."
          }
        ]
      }
    ],
    "domesticPolicyId": "kr-export-diversification"
  },
  {
    "id": "kr-export-diversification",
    "scope": "domestic",
    "field": "무역·관세",
    "name": "수출 지원·무역금융 확대 대책",
    "aliases": [
      "수출 다변화",
      "수출 지원",
      "수출활력 제고",
      "수출경쟁력 강화",
      "무역 지원",
      "무역금융 확대",
      "수출 지원 대책",
      "범부처 수출확대 방안",
      "수출전략회의",
      "비상수출대책",
      "관세 대응 지원",
      "통상변화대응법",
      "export diversification Korea"
    ],
    "keywords": [
      "수출",
      "무역금융",
      "수출 지원",
      "통상"
    ],
    "firstEffectiveDate": "2015-07-07",
    "asOf": "2026-10-22",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "정책브리핑(korea.kr)",
      "url": "https://www.korea.kr/briefing/pressReleaseList.do"
    },
    "history": [
      {
        "id": "kr-export-diversification-h1",
        "date": "2015-07-07",
        "title": "수출경쟁력 강화대책 브리핑",
        "summary": "중소·중견기업의 수출 어려움을 풀기 위해 무역금융을 약 16조 2,000억 원 늘려 공급하기로 했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "수출경쟁력강화대책 관련 - 부처 브리핑",
            "date": "2015-07-07",
            "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156063243",
            "checkedAt": "2026-10-22",
            "evidence": "정부는 중소·중견기업의 무역금융과 마케팅 등 수출애로 해소를 위해서 약 16조 2,000억 원의 무역금융을 확대 공급하고, 해외전시회 지원확대 대기업 해외유통망 활용 등 마케팅 지원도 강화할 계획입니다."
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-export-diversification-h2",
        "date": "2019-03-04",
        "title": "무역금융 총 235조원 공급",
        "summary": "무역금융을 15.3조원 늘려 총 235조원을 공급한다고 발표했다(제목 기준, 본문은 첨부파일뿐).",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "무역금융, 15.3조원 늘어난 총 235조원 공급 - 보도자료",
            "date": "2019-03-04",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156319798",
            "checkedAt": "2026-10-22",
            "evidence": "무역금융, 15.3조원 늘어난 총 235조원 공급"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-export-diversification-h3",
        "date": "2022-11-23",
        "title": "제1차 수출전략회의 개최",
        "summary": "제1차 수출전략회의를 열어 2026년까지 수출 5대 강국을 달성하기로 했다.",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "국가적 역량 결집으로 수출 5대 강국 달성…“수출위기 극복한다” - 정책뉴스",
            "date": "2022-11-23",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148908666",
            "checkedAt": "2026-10-22",
            "evidence": "이에 국가적 수출역량을 결집해 오는 2026년까지 수출 5대 강국을 달성하고자 23일 ‘제1차 수출전략회의’를 개최해 수출위기 극복을 통한 국민경제의 지속 성장을 추진하기로 했다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-export-diversification-h4",
        "date": "2025-02-18",
        "title": "무역금융 366조 원 공급",
        "summary": "수출기업의 자금을 돕기 위해 역대 최대 규모인 366조 원의 무역금융을 공급하기로 했다.",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "최상목 권한대행 \"무역금융 366조 원 공급…상반기 수출바우처 예산 90% 투입\" - 정책뉴스",
            "date": "2025-02-18",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148939737",
            "checkedAt": "2026-10-22",
            "evidence": "이와 함께 수출기업의 유동성 확보를 지원하기 위해 역대 최대 규모인 366조 원의 무역금융을 공급한다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-export-diversification-h5",
        "date": "2025-05-01",
        "title": "관세피해 기업 정책금융 25조",
        "summary": "관세 피해 수출기업에 25조 원 규모의 정책금융을 지원하기로 했다.",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "관세피해·수출기업에 25조 원 규모 정책금융 지원 - 정책뉴스",
            "date": "2025-05-01",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148942722",
            "checkedAt": "2026-10-22",
            "evidence": "정부가 관세피해·수출기업에 25조 원 규모의 정책금융을 지원한다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-export-diversification-h6",
        "date": "2026-02-25",
        "title": "범부처 수출확대·무역금융 혁신",
        "summary": "무역보험 275조 원을 공급하고 무역금융 187조 원을 2030년까지 공급하기로 했다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "민관 합동 K-수출 원팀 본격 가동 - 정책뉴스",
            "date": "2026-03-04",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148960219",
            "checkedAt": "2026-10-22",
            "evidence": "무역보험 275조 원 공급(역대 최대)"
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-export-diversification-h7",
        "date": "2026-10-22",
        "title": "통상변화대응법 지원대상 확대",
        "summary": "외국의 통상조치로 피해를 본 기업도 통상변화대응법의 지원 대상이 되고 판로 개척 지원이 추가됐다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "외국 통상조치 피해기업도 지원…개정 '통상변화대응법' 시행 - 정책뉴스",
            "date": "2026-10-22",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148974104",
            "checkedAt": "2026-10-22",
            "evidence": "앞으로 외국의 통상조치로 인한 피해기업도 통상변화대응법상 지원 대상이 되고, 판로 개척 지원도 새롭게 추가된다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ],
    "foreignPolicyId": "us-china-trade-conflict"
  },
  {
    "id": "kr-somubujang",
    "scope": "domestic",
    "field": "무역·관세",
    "name": "소재·부품·장비(소부장) 경쟁력 강화 대책",
    "aliases": [
      "소부장",
      "소재부품장비",
      "소재·부품·장비",
      "소부장 대책",
      "소재부품장비 경쟁력 강화대책",
      "소부장 특별법",
      "소재·부품·장비산업 특별조치법",
      "소부장 2.0",
      "소부장 기본계획",
      "소부장 특화단지",
      "일본 수출규제 대응"
    ],
    "keywords": [
      "소부장",
      "공급망",
      "일본 수출규제",
      "반도체 소재"
    ],
    "firstEffectiveDate": "2019-08-05",
    "asOf": "2026-08-06",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "정책브리핑(korea.kr)",
      "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=148866660"
    },
    "history": [
      {
        "id": "kr-somubujang-h1",
        "date": "2019-08-05",
        "title": "소부장 경쟁력 강화 대책 발표",
        "summary": "일본 수출규제에 대응해 소재·부품·장비(소부장) 경쟁력 강화 대책을 내놓고 7년간 약 7.8조 원 투자를 계획했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "소재부품장비 경쟁력 강화 대책 - 부처 브리핑",
            "date": "2019-08-05",
            "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156344320",
            "checkedAt": "2026-10-22",
            "evidence": "예타 면제 등을 통해 신속하게 R&D 사업비를 투입하는 등 7년간 약 7.8조 원의 대규모 투자를 계획하고 있습니다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-somubujang-h2",
        "date": "2019-12-29",
        "title": "소부장 특별법 국회 통과",
        "summary": "소재·부품·장비(소부장) 산업 경쟁력 강화를 위한 소부장 특별법이 국회를 통과했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "(참고자료) 소재부품장비산업 경쟁력강화를 위한 소부장 특별법 국회 통과 - 보도자료",
            "date": "2019-12-29",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156368805",
            "checkedAt": "2026-10-22",
            "evidence": "(참고자료) 소재부품장비산업 경쟁력강화를 위한 소부장 특별법 국회 통과"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-somubujang-h3",
        "date": "2020-03-24",
        "title": "소부장 특별조치법 4월 시행",
        "summary": "소재·부품·장비(소부장) 산업 특별조치법이 4월 1일 시행된다고 알렸다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "「소재·부품·장비산업 특별조치법」 4월1일 시행된다. - 보도자료",
            "date": "2020-03-24",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156381759",
            "checkedAt": "2026-10-22",
            "evidence": "「소재·부품·장비산업 특별조치법」 4월1일 시행된다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-somubujang-h4",
        "date": "2020-07-08",
        "title": "소부장 2.0 전략 발표",
        "summary": "관리 대상 품목을 대일 100대에서 글로벌 338개로 넓히는 소재·부품·장비(소부장) 2.0 전략을 발표했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "소부장 2.0 전략 - 부처 브리핑",
            "date": "2020-07-08",
            "url": "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156400404",
            "checkedAt": "2026-10-22",
            "evidence": "공급망 관리 정책 대상을 기존 대일 100대 품목에서 글로벌 차원의 338개 품목으로 확장하고"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-somubujang-h5",
        "date": "2022-10-18",
        "title": "새정부 소부장 정책방향 발표",
        "summary": "새 정부의 소재·부품·장비(소부장) 산업 정책방향을 발표했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "「새정부 소재·부품·장비산업 정책방향」 발표 - 보도자료",
            "date": "2022-10-18",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156531330",
            "checkedAt": "2026-10-22",
            "evidence": "「새정부 소재·부품·장비산업 정책방향」 발표"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-somubujang-h6",
        "date": "2024-04-03",
        "title": "소부장 특화단지 육성 방안",
        "summary": "소재·부품·장비(소부장) 특화단지를 초격차 기술과 공급망의 핵심기지로 육성한다고 발표했다.",
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "소부장 특화단지, 초격차 기술과 공급망의 핵심기지로 육성 - 보도자료",
            "date": "2024-04-03",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156623689",
            "checkedAt": "2026-10-22",
            "evidence": "소부장 특화단지, 초격차 기술과 공급망의 핵심기지로 육성"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-somubujang-h7",
        "date": "2025-10-23",
        "title": "소부장 기본계획(26~30) 수립",
        "summary": "소재·부품·장비(소부장) 기본계획을 세우고 특화단지를 2030년까지 10개 더 지정하기로 했다.",
        "sources": [
          {
            "institution": "산업통상부(구 산업통상자원부)",
            "institutionType": "정부 부처",
            "title": "새 정부 소재·부품·장비 기본계획 수립 < 보도·참고자료 < 보도자료 < 알림·뉴스 < 산업통상부",
            "date": "2025-10-23",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/171111/view",
            "checkedAt": "2026-10-22",
            "evidence": "소재·부품·장비 특화단지를 '30년까지 10개 추가 지정한다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-somubujang-h8",
        "date": "2026-08-06",
        "title": "소부장 협력모델 5건 승인",
        "summary": "소재·부품·장비(소부장) 신규 협력모델 5건을 승인했다.",
        "sources": [
          {
            "institution": "산업통상부",
            "institutionType": "정부 부처",
            "title": "슈퍼 을(乙) 기업 육성 및 협력체계 확대로 소부장 생태계 경쟁력 강화 < 보도·참고자료 < 보도자료 < 알림·뉴스 < 산업통상부",
            "date": "2026-08-06",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/172088/view",
            "checkedAt": "2026-10-22",
            "evidence": "산업통상부(장관 김정관, 이하 산업부)는 차세대 유리 패키지 기판 등 5건의 신규 소재·부품·장비(이하 소부장) 협력모델을 승인했다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ],
    "foreignPolicyId": "japan-export-control"
  },
  {
    "id": "japan-export-control",
    "scope": "foreign",
    "field": "무역·관세",
    "name": "일본의 대한국 수출관리 운용 변경",
    "aliases": [
      "일본 수출규제",
      "일본 수출 규제",
      "일본 경제보복",
      "화이트리스트 제외",
      "화이트리스트 복원",
      "그룹 A 복원",
      "불화수소 규제",
      "반도체 소재 규제",
      "반도체 소재 3개 품목 규제",
      "한일 수출관리 정책대화",
      "Japan export controls on Korea",
      "white list removal",
      "Japan Korea export control 2019",
      "Group A restoration"
    ],
    "keywords": [
      "수출규제",
      "불화수소",
      "화이트리스트",
      "일본"
    ],
    "firstEffectiveDate": "2019-07-04",
    "asOf": "2023-07-11",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "일본 경제산업성(METI)",
      "url": "https://www.meti.go.jp/policy/external_economy/export_control_korea/index.html"
    },
    "history": [
      {
        "id": "japan-export-control-h1",
        "date": "2019-07-01",
        "title": "통달 개정(7/1 공포, 7/4 시행)",
        "summary": "운용 통달 개정을 7월 1일에 공포하고 7월 4일에 시행했다.",
        "sources": [
          {
            "institution": "일본 경제산업성(METI)",
            "institutionType": "해외 정부 기관",
            "title": "安全保障貿易管理 Export Control 関係法令：改正情報",
            "date": "2019-07-01",
            "url": "https://www.meti.go.jp/policy/anpo/law09.html",
            "checkedAt": "2026-10-22",
            "evidence": "■通達改正　令和元年７月１日公布、７月４日施行"
          }
        ]
      },
      {
        "id": "japan-export-control-h2",
        "date": "2019-08-02",
        "title": "정령 개정 각의 결정(8/28 시행)",
        "summary": "수출무역관리령 개정 정령을 8월 2일 각의에서 결정해 8월 28일에 시행했다.",
        "sources": [
          {
            "institution": "일본 경제산업성(METI)",
            "institutionType": "해외 정부 기관",
            "title": "安全保障貿易管理 Export Control 関係法令：改正情報",
            "date": "2019-08-02",
            "url": "https://www.meti.go.jp/policy/anpo/law09.html",
            "checkedAt": "2026-10-22",
            "evidence": "■政令改正　令和元年８月２日閣議決定、８月７日公布、８月２８日施行"
          }
        ]
      },
      {
        "id": "japan-export-control-h3",
        "date": "2023-03-17",
        "title": "3개 품목 운용 재검토 발표",
        "summary": "불화수소 등 3개 품목의 수출관리 운용을 고치기로 했고, 화이트 국가 지정은 정하지 않았다고 밝혔다.",
        "sources": [
          {
            "institution": "일본 경제산업성(METI)",
            "institutionType": "해외 정부 기관",
            "title": "Press Conference by Minister Nishimura (Excerpt)",
            "date": "2023-03-17",
            "url": "https://www.meti.go.jp/english/speeches/press_conferences/2023/0317001.html",
            "checkedAt": "2026-10-22",
            "evidence": "As a result, we have decided to revise the export control operations for the three items, given the confirmation that the ROK has improved its initiative and effectiveness, and that the ROK has announced that it will withdraw its complaint to the WTO concerning Japan's export controls."
          }
        ]
      },
      {
        "id": "japan-export-control-h4",
        "date": "2023-06-27",
        "title": "한국을 별표 제3 국가에 추가 결정",
        "summary": "한국을 수출무역관리령 별표 제3 국가 목록에 추가하는 정령 개정을 각의에서 결정했다.",
        "sources": [
          {
            "institution": "일본 경제산업성(METI)",
            "institutionType": "해외 정부 기관",
            "title": "Cabinet Decision on the Cabinet Order to Partially Amend the Export Trade Control Order",
            "date": "2023-06-27",
            "url": "https://www.meti.go.jp/english/press/2023/0627_004.html",
            "checkedAt": "2026-10-22",
            "evidence": "The decision concerned the addition of the Republic of Korea (ROK) to the list of the countries in Appended Table 3 of the Export Order."
          }
        ]
      },
      {
        "id": "japan-export-control-h5",
        "date": "2023-07-11",
        "title": "일한 수출관리 정책대화·MOC 서명",
        "summary": "경제산업성과 한국 산업통상자원부가 협력 각서(MOC)에 서명했다.",
        "sources": [
          {
            "institution": "일본 경제산업성(METI)",
            "institutionType": "해외 정부 기관",
            "title": "Japan-Korea Export Control Policy Dialogue Held",
            "date": "2023-07-11",
            "url": "https://www.meti.go.jp/english/press/2023/0711_001.html",
            "checkedAt": "2026-10-22",
            "evidence": "and signed a Memorandum of Cooperation (MOC) which reflects the follow-up framework agreed upon through previous policy dialogues between the two countries."
          }
        ]
      }
    ],
    "domesticPolicyId": "kr-somubujang"
  }
];
