// Design Ref: §5 Policy, PLAN 7번 — 부동산·금융규제 분야의 정책 연혁 (국내 3개, 해외 짝 없음).
// 모든 항목은 2026-10-22에 공식 사이트 페이지를 직접 열어 확인한 것이다. 항목의 evidence는 그 출처 페이지에 그대로 있는 근거 문장이며,
// scripts/check-evidence.mjs가 출처 주소를 다시 열어 이 문장이 지금도 있는지 확인한다 (화면에는 보이지 않는다).
// 이 파일은 조사 결과를 옮겨 만든 것이므로 연혁 항목을 고칠 때는 출처 페이지를 다시 열어 확인한 뒤 evidence도 함께 고친다.
//
// 세 정책 모두 해외 짝이 없는 국내 단독 정책이다 (PRD: 해외 짝 없는 정책은 연혁만 단독으로 보인다).
//
// 주의할 점
// - LTV·DTI: LTV·DTI 도입일 자체를 말하는 문장은 허용 출처에서 찾지 못했다. 최초 시행일 2005-07-01은 확인한 가장 오래된 금융당국 자료(주택담보대출 취급방식 지도)의 날짜다.
//   2005~2007년 항목의 기관명은 당시 이름(금감위, 금융감독위원회)을 따랐다. 2017년 항목 근거 문장의 "투기과열지구투기지역", "LTVDTI"는 페이지 본문에 가운데점이 없는 글자 그대로다.
// - DSR: 최초 시행일 2018-10-31은 저축은행·여전업권 DSR 시범도입일이다 (은행권 관리지표 도입 발표 원문은 찾지 못했다). 2020~2022년 항목은 비어 있다.
// - 규제지역: 최초 시행일 2003-10-30은 확인한 가장 오래된 자료의 날짜이며 투기지역·투기과열지구 도입 시점이 아니다. 2017~2026년 항목은 정책브리핑(korea.kr) 정책뉴스이고
//   국토교통부 원문 보도자료는 본문이 첨부파일뿐이라 근거 문장을 뽑을 수 없었다. 법령(주택법, 소득세법 시행령) 연혁은 근거로 쓰지 못했다.
import type { Policy } from "../../lib/corpus/types";

export const REALESTATE_POLICIES: Policy[] = [
  {
    "id": "kr-ltv-dti",
    "scope": "domestic",
    "field": "부동산·금융규제",
    "name": "LTV·DTI(주택담보대출 규제)",
    "aliases": [
      "LTV",
      "DTI",
      "담보인정비율",
      "총부채상환비율",
      "loan-to-value",
      "debt-to-income",
      "주택담보대출 규제",
      "주택대출규제",
      "생애최초 LTV"
    ],
    "keywords": [
      "대출규제",
      "주택담보대출",
      "담보인정비율",
      "가계부채"
    ],
    "firstEffectiveDate": "2005-07-01",
    "asOf": "2023-03-02",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "금융위원회",
      "url": "https://www.fsc.go.kr/no010101"
    },
    "history": [
      {
        "id": "kr-ltv-dti-h1",
        "date": "2005-07-01",
        "title": "주택담보대출 리스크관리 강화방안",
        "summary": "금감위가 은행·보험·상호저축은행의 주택담보대출 취급방식을 7월 1일부터 지도하기로 했다.",
        "sources": [
          {
            "institution": "금감위",
            "institutionType": "정부 부처",
            "title": "부동산시장 불안정에 대응한 주택담보대출 리스크관리 강화방안",
            "date": "2005-07-01",
            "url": "https://www.fsc.go.kr/no010101/67315",
            "checkedAt": "2026-10-22",
            "evidence": "은행·보험·상호저축은행의 주택담보대출 취급방식에 대해 7.1일부터 다음과 같이 지도해 나가기로 함"
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-ltv-dti-h2",
        "date": "2007-07-20",
        "title": "주택담보대출 대책의 감독규정화",
        "summary": "금융감독위원회가 주택담보대출 리스크관리 강화대책을 감독규정에 규정하기로 했다.",
        "sources": [
          {
            "institution": "금융감독위원회",
            "institutionType": "정부 부처",
            "title": "주택담보대출관련 리스크관리 강화대책의 감독규정화",
            "date": "2007-07-23",
            "url": "https://www.fsc.go.kr/no010101/68468",
            "checkedAt": "2026-10-22",
            "evidence": "금융감독위원회는 주택담보대출 리스크관리 강화대책의 실효성을 제고하고 관련근거를 명확히 하기 위하여"
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-ltv-dti-h3",
        "date": "2009-08-20",
        "title": "제20차 부동산시장점검회의",
        "summary": "부동산시장점검회의가 수도권 LTV 하향조정 조치 이후의 주택시장 동향을 점검했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "제 20차 부동산시장점검회의 개최",
            "date": "2009-08-20",
            "url": "https://www.fsc.go.kr/no010101/69319",
            "checkedAt": "2026-10-22",
            "evidence": "주택 매매시장은 수도권 LTV 하향조정 조치와 계절적 비수기의 효과로 7월 중순이후 소강상태를 보이다가"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "kr-ltv-dti-h4",
        "date": "2011-03-22",
        "title": "DTI 자율적용 종료",
        "summary": "DTI 금융회사 자율적용 시한을 3월 말로 종료하기로 했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고] 주택거래 활성화를 위한 금융부문 대응방안",
            "date": "2011-03-22",
            "url": "https://www.fsc.go.kr/no010101/69903",
            "checkedAt": "2026-10-22",
            "evidence": "당초 예정대로 DTI 금융회사 자율적용 시한을 3월말로 종료하여"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "kr-ltv-dti-h5",
        "date": "2014-07-24",
        "title": "LTV·DTI 규제 합리화 시행 일정",
        "summary": "7월 24일 발표한 LTV·DTI 등 주택대출규제 합리화 과제를 8월 1일부터 시행할 예정이라고 알렸다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고]LTV·DTI 규제 합리화 방안 시행 일정",
            "date": "2014-07-27",
            "url": "https://www.fsc.go.kr/no010101/71211",
            "checkedAt": "2026-10-22",
            "evidence": "LTV·DTI 등 주택대출규제 합리화 과제는 금주중 관련 절차를 마무리하고 8. 1.(금)부터 시행될 예정임을 알려드리니"
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-ltv-dti-h6",
        "date": "2017-08-22",
        "title": "8.2 대책 후속 감독규정 개정",
        "summary": "투기과열지구·투기지역 소재 주택 담보대출에 LTV·DTI 각각 40%를 적용하는 감독규정 개정안을 의결했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고]「8.2 주택시장 안정화 방안」 관련 5개 감독규정 개정",
            "date": "2017-08-23",
            "url": "https://www.fsc.go.kr/no010101/72791",
            "checkedAt": "2026-10-22",
            "evidence": "투기과열지구투기지역 내 소재한 주택을 담보로 대출을 받는 경우, LTVDTI는 각각 40%가 적용됨"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-ltv-dti-h7",
        "date": "2019-12-23",
        "title": "주택시장 안정화 방안 후속 행정지도",
        "summary": "DSR 관리 강화, LTV 추가 강화 등에 대한 행정지도를 12월 23일부터 시행했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고] 「주택시장 안정화 방안」 금융부문 후속조치 시행- LTV 추가 강화 등에 대한 행정지도 및 FAQ 배포",
            "date": "2019-12-23",
            "url": "https://www.fsc.go.kr/no010101/74057",
            "checkedAt": "2026-10-22",
            "evidence": "DSR 관리 강화, LTV 추가 강화 등 여타 추진과제에 대한 행정지도를 금일(12.23.)부터 시행함을 알려드립니다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-ltv-dti-h8",
        "date": "2022-07-20",
        "title": "생애최초 LTV 80% 완화",
        "summary": "생애최초 주택구매자 LTV를 80%로 완화하는 등 대출규제를 정상화하기로 했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고] 실수요자의 ‘내집마련’지원과 불편해소를 위해 가계대출 규제를 합리적으로 개선하였습니다",
            "date": "2022-07-20",
            "url": "https://www.fsc.go.kr/no010101/78134",
            "checkedAt": "2026-10-22",
            "evidence": "생애최초 LTV 80% 완화 등 대출규제를 정상화하고, 그간 제기된 보완 필요사항 등을 반영하였습니다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-ltv-dti-h9",
        "date": "2023-03-02",
        "title": "다주택자 규제지역 주담대 허용",
        "summary": "다주택자의 규제지역 내 주택구입목적 주택담보대출 취급을 허용하는 개정안을 의결했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] ｢은행업 감독규정｣ 등 5개 규정 개정안 금융위원회 의결",
            "date": "2023-03-02",
            "url": "https://www.fsc.go.kr/no010101/79514",
            "checkedAt": "2026-10-22",
            "evidence": "다주택자의 규제지역 내 주택구입목적 주택담보대출 취급 허용"
          }
        ],
        "governmentId": "gov-yoon"
      }
    ]
  },
  {
    "id": "kr-dsr",
    "scope": "domestic",
    "field": "부동산·금융규제",
    "name": "DSR(총부채원리금상환비율) 규제",
    "aliases": [
      "DSR",
      "총부채원리금상환비율",
      "총체적상환능력심사제",
      "스트레스 DSR",
      "3단계 스트레스 DSR",
      "스트레스 금리",
      "Debt Service Ratio",
      "debt service ratio regulation",
      "가계부채 관리방안",
      "가계대출 규제"
    ],
    "keywords": [
      "대출규제",
      "가계부채",
      "스트레스 DSR",
      "원리금 상환"
    ],
    "firstEffectiveDate": "2018-10-31",
    "asOf": "2025-10-15",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "금융위원회",
      "url": "https://www.fsc.go.kr/no010101"
    },
    "history": [
      {
        "id": "kr-dsr-h1",
        "date": "2017-11-27",
        "title": "금융회사 여신심사 선진화 방안 발표",
        "summary": "新DTI와 DSR 도입으로 상환능력 중심의 여신 관행을 정착시키는 방안을 발표했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "「금융회사 여신심사 선진화 방안」발표",
            "date": "2017-11-27",
            "url": "https://www.fsc.go.kr/no010101/72911",
            "checkedAt": "2026-10-22",
            "evidence": "新DTI, DSR 도입으로 상환능력 중심의 선진화된 여신 관행 정착"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-dsr-h2",
        "date": "2018-10-22",
        "title": "저축은행·여전업권 DSR 시범도입",
        "summary": "저축은행·여전업권이 10월 31일부터 가계대출 차주의 DSR을 산출해 자율 활용하는 시범 도입을 발표했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "저축은행ㆍ여전업권 DSR 시범도입(여신심사가이드라인 도입)상호금융권 DSR·RTI 산정방식 개선",
            "date": "2018-10-22",
            "url": "https://www.fsc.go.kr/no010101/73369",
            "checkedAt": "2026-10-22",
            "evidence": "저축은행ㆍ여전사는 모든 유형의 신규 가계대출(주택담보대출, 신용대출 포함) 취급시 DSR을 산출하고 자율적 활용"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-dsr-h3",
        "date": "2019-05-30",
        "title": "제2금융권 DSR 관리지표 도입방안 논의",
        "summary": "가계부채관리점검회의에서 제2금융권 DSR 관리지표 도입방안을 논의했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "가계부채관리점검회의 개최 - 「제2금융권 DSR 관리지표 도입방안」 논의",
            "date": "2019-05-30",
            "url": "https://www.fsc.go.kr/no010101/73714",
            "checkedAt": "2026-10-22",
            "evidence": "상환능력 심사 체계를 완비하게 된다고 언급"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-dsr-h4",
        "date": "2023-12-27",
        "title": "스트레스 DSR 제도 도입 발표",
        "summary": "전 금융권 변동·혼합·주기형 대출에 미래 금리변동 위험을 반영하는 스트레스 DSR을 시행한다고 발표했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] 전 금융권의 변동·혼합·주기형 대출상품에 대하여 미래 금리변동위험을 반영하는 스트레스 DSR 제도가 시행됩니다.",
            "date": "2023-12-27",
            "url": "https://www.fsc.go.kr/no010101/81343",
            "checkedAt": "2026-10-22",
            "evidence": "스트레스 DSR 제도란, 변동금리 대출 등을 이용하는 차주가 대출 이용기간 중 금리 상승으로 인해 원리금 상환 부담이 상승할 가능성을 감안하여 DSR 산정시 일정수준의 가산금리(스트레스 금리)를 부과하는 제도이다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-dsr-h5",
        "date": "2024-02-26",
        "title": "은행권 주택담보대출 스트레스 DSR 시행",
        "summary": "은행권 주택담보대출에 스트레스 DSR을 시행하며 적용 스트레스 금리는 0.38%이다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도참고] 2.26일(월)부터 은행권 주택담보대출을 대상으로 스트레스 DSR이 시행됩니다.",
            "date": "2024-02-26",
            "url": "https://www.fsc.go.kr/no010101/81777",
            "checkedAt": "2026-10-22",
            "evidence": "적용되는 스트레스 금리는 0.38%이다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-dsr-h6",
        "date": "2024-06-25",
        "title": "하반기 스트레스 DSR 운용방향",
        "summary": "스트레스 DSR 2단계 조치를 9월 1일부터 시행할 계획이라고 밝혔다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] 하반기 스트레스 DSR 운용방향",
            "date": "2024-06-25",
            "url": "https://www.fsc.go.kr/no010101/82526",
            "checkedAt": "2026-10-22",
            "evidence": "금융당국은 관계기관과의 협의 등을 거쳐 9.1일부터 스트레스 DSR 2단계 조치를 시행할 계획이다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-dsr-h7",
        "date": "2024-08-21",
        "title": "2단계 스트레스 DSR 시행 확정",
        "summary": "가계부채 점검회의에서 9월 1일부터 2단계 스트레스 DSR을 시행하기로 했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] 최근 가계부채 증가세에 대응하여 상환능력 심사(DSR)중심의 일관된 가계부채 관리기조를 확립해나가겠습니다. - 가계부채 점검회의 개최 -",
            "date": "2024-08-21",
            "url": "https://www.fsc.go.kr/no010101/82931",
            "checkedAt": "2026-10-22",
            "evidence": "정부는 예고한대로 9월 1일부터 2단계 스트레스 DSR을 시행하기로 하였다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-dsr-h8",
        "date": "2025-05-20",
        "title": "3단계 스트레스 DSR 시행방안 확정",
        "summary": "3단계 스트레스 DSR의 스트레스 금리를 1.50%로 하되 지방 주담대는 0.75%를 적용한다고 발표했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] 3단계 스트레스 DSR 시행방안 확정․발표 - 5월 가계부채 점검회의 개최",
            "date": "2025-05-20",
            "url": "https://www.fsc.go.kr/no010101/84617",
            "checkedAt": "2026-10-22",
            "evidence": "스트레스 금리는 1.50%로 하되, 지방 주담대에 대해서는 현행과 동일한 0.75%의 스트레스 금리 적용"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-dsr-h9",
        "date": "2025-06-27",
        "title": "가계부채 관리 강화 방안",
        "summary": "대출만기를 30년 이내로 제한해 DSR 규제 우회를 방지하기로 했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "[보도자료] 「긴급 가계부채 점검회의」를 개최하여 수도권 중심의 「가계부채 관리 강화 방안」 발표",
            "date": "2025-06-27",
            "url": "https://www.fsc.go.kr/no010101/84824",
            "checkedAt": "2026-10-22",
            "evidence": "대출만기를 30년 이내로 제한하여 DSR 규제 우회를 방지하기로 하였다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-dsr-h10",
        "date": "2025-10-15",
        "title": "대출수요 관리 방안(전세대출 DSR 반영)",
        "summary": "전세대출의 이자상환분을 차주의 DSR에 반영하기로 했다.",
        "sources": [
          {
            "institution": "금융위원회",
            "institutionType": "정부 부처",
            "title": "「주택시장 안정화 대책」 관련 「긴급 가계부채 점검회의」 개최 - 주택시장 안정화를 위한 대출수요 관리 방안 발표",
            "date": "2025-10-15",
            "url": "https://www.fsc.go.kr/no010101/85432",
            "checkedAt": "2026-10-22",
            "evidence": "전세대출의 이자상환분을 차주의 DSR에 반영한다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ]
  },
  {
    "id": "kr-regulated-areas",
    "scope": "domestic",
    "field": "부동산·금융규제",
    "name": "규제지역 지정(투기과열지구·조정대상지역 등)",
    "aliases": [
      "규제지역",
      "조정대상지역",
      "투기과열지구",
      "투기지역",
      "청약조정지역",
      "조정지역",
      "토지거래허가구역",
      "부동산 규제지역 해제",
      "8.2 대책",
      "6.19 대책",
      "9.13 대책",
      "6.17 대책",
      "7.10 대책",
      "10.15 대책",
      "주택시장 안정화 대책"
    ],
    "keywords": [
      "부동산",
      "규제지역",
      "주택시장",
      "청약"
    ],
    "firstEffectiveDate": "2003-10-30",
    "asOf": "2026-06-30",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "국토교통부",
      "url": "https://www.molit.go.kr"
    },
    "history": [
      {
        "id": "kr-regulated-areas-h1",
        "date": "2003-10-30",
        "title": "주택시장 안정 종합대책(투기지역 담보인정비율)",
        "summary": "투기지역 내 아파트 신규 담보대출의 담보인정비율을 50%에서 40%로 낮추는 방안이 포함됐다.",
        "sources": [
          {
            "institution": "국정홍보처",
            "institutionType": "정부 부처",
            "title": "제3차 경제민생점검회의 안건-주택시장 안정 종합대책(요약)",
            "date": "2003-10-30",
            "url": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=50002088",
            "checkedAt": "2026-10-22",
            "evidence": "투기지역내 아파트(주상복합아파트 포함)를 담보로 하는 신규대출시 담보인정비율 현행 50% → 40%로 하향조정"
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-regulated-areas-h2",
        "date": "2017-08-02",
        "title": "8.2 대책 투기과열지구·투기지역 지정",
        "summary": "투기과열지구와 투기지역을 8월 3일자로 지정하고 효력이 발생하게 했다.",
        "sources": [
          {
            "institution": "국토교통부, 기획재정부",
            "institutionType": "정부 부처",
            "title": "서울·과천·세종 투기과열지구 지정",
            "date": "2017-08-02",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148840552",
            "checkedAt": "2026-10-22",
            "evidence": "투기과열지구, 투기지역 모두 3일자로 지정 및 효력이 발생한다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-regulated-areas-h3",
        "date": "2018-08-27",
        "title": "투기지역 4개구 추가 지정",
        "summary": "서울 종로·중구·동대문·동작구 4개 구를 투기지역으로 신규 지정하기로 했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "종로 등 서울 4개구 투기지역 지정…광명·하남은 과열지구",
            "date": "2018-08-27",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148853464",
            "checkedAt": "2026-10-22",
            "evidence": "서울에서 종로구, 중구, 동대문구, 동작구 등 4개 구가 부동산가격안정심의위의 심의를 거쳐 투기지역으로 신규 지정된다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-regulated-areas-h4",
        "date": "2020-06-17",
        "title": "6.17 대책 조정대상지역·투기과열지구 확대",
        "summary": "비규제지역으로 투기수요가 몰리는 것을 막으려고 조정대상지역과 투기과열지구를 대폭 확대했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "수도권·대전·청주 규제지역 묶고 대출규제 강화로 갭투자 차단",
            "date": "2020-06-17",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148873506",
            "checkedAt": "2026-10-22",
            "evidence": "정부는 비규제지역에 집중되는 투기수요의 유입을 차단하기 위해 조정대상지역과 투기과열지구를 대폭 확대했다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-regulated-areas-h5",
        "date": "2022-07-01",
        "title": "지방 투기과열지구 해제",
        "summary": "지방은 세종시를 제외한 나머지 지역을 투기과열지구에서 해제하기로 했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "대구 수성·대전 유성 등 6개 시군구 투기과열지구 해제",
            "date": "2022-07-01",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148903052",
            "checkedAt": "2026-10-22",
            "evidence": "이로써 지방은 세종시를 제외한 나머지 지역은 투기과열지구에서 해제된다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-regulated-areas-h6",
        "date": "2022-11-10",
        "title": "수도권 규제지역 추가 해제",
        "summary": "서울 전역과 과천·성남(분당·수정)·하남·광명 4곳만 2중 규제지역으로 남기고 해제하기로 했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "서울·과천·성남·하남·광명 빼고 부동산 규제지역 다 풀었다",
            "date": "2022-11-10",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148908107",
            "checkedAt": "2026-10-22",
            "evidence": "이에 따라 서울 전역과 과천, 성남(분당·수정), 하남, 광명 4곳만 투기과열지구·조정대상지역 등 2중 규제지역으로 남게 된다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-regulated-areas-h7",
        "date": "2023-01-03",
        "title": "2023년 업무보고 규제지역 전면 해제 추진",
        "summary": "서울 강남·서초·송파·용산을 제외한 전 지역을 규제지역에서 전면 해제하기로 했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "주택시장 연착륙 위해 규제 정상화…서민·취약계층 주거복지 강화",
            "date": "2023-01-03",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148910119",
            "checkedAt": "2026-10-22",
            "evidence": "이에 따라 서울 강남·서초·송파 및 용산을 제외한 전 지역이 규제지역에서 전면 해제된다."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-regulated-areas-h8",
        "date": "2025-10-15",
        "title": "10.15 주택시장 안정화 대책 규제지역 확대",
        "summary": "서울 21개 자치구 전체와 경기도 12개 지역을 새로 지정하기로 했다.",
        "sources": [
          {
            "institution": "관계부처 합동",
            "institutionType": "정부 부처",
            "title": "서울 전역·경기 12곳 투기과열지구·토지거래허가구역 지정",
            "date": "2025-10-15",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148950973",
            "checkedAt": "2026-10-22",
            "evidence": "그 외 서울 21개 자치구 전체와 경기도 12개 지역은 새로 지정한다."
          }
        ],
        "governmentId": "gov-lee-jm"
      },
      {
        "id": "kr-regulated-areas-h9",
        "date": "2026-06-30",
        "title": "동탄·기흥·구리 규제지역 추가 지정",
        "summary": "경기도 화성시 동탄구, 용인시 기흥구, 구리시 3곳을 투기과열지구 및 조정대상지역으로 신규 지정했다.",
        "sources": [
          {
            "institution": "국토교통부",
            "institutionType": "정부 부처",
            "title": "'동탄·기흥·구리' 3곳 투기과열지구·조정대상지역 지정",
            "date": "2026-06-30",
            "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148967354",
            "checkedAt": "2026-10-22",
            "evidence": "경기도 화성시 동탄구, 용인시 기흥구, 구리시 등 3곳을 투기과열지구 및 조정대상지역으로 신규 지정했다."
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ]
  }
];
