// Design Ref: §5 Policy, PLAN 6번 — 재정·세제 분야의 정책 연혁 (국내 3개, 해외 짝 없음).
// 모든 항목은 2026-10-22에 공식 사이트 페이지를 직접 열어 확인한 것이다. 항목의 evidence는 그 출처 페이지에 그대로 있는 근거 문장이며,
// scripts/check-evidence.mjs가 출처 주소를 다시 열어 이 문장이 지금도 있는지 확인한다 (화면에는 보이지 않는다).
// 이 파일은 조사 결과를 옮겨 만든 것이므로 연혁 항목을 고칠 때는 출처 페이지를 다시 열어 확인한 뒤 evidence도 함께 고친다.
//
// 세 정책 모두 해외 짝이 없는 국내 단독 정책이다 (PRD: 해외 짝 없는 정책은 연혁만 단독으로 보인다).
//
// 주의할 점
// - 재정준칙: 한국에는 법으로 시행 중인 수치 재정준칙이 없다. 연혁은 국가재정법 제정(2006), 정부·국회 법안 제출·발의, 도입 추진 발표를 담는다.
//   최초 시행일 2007-01-01은 국가재정법 시행일이다 (재정준칙 자체의 시행일이 아니다). 정부 법안은 2024-05-29 임기만료로 폐기됐으나 항목에는 넣지 않았다.
// - 추가경정예산: 보도자료 본문이 첨부파일뿐이라 모든 항목이 제목 기준이다. 조사에서 2023~2024년, 2026년 추경은 확인하지 못했다. 최초 시행일 1998-07-21은 확인한 가장 오래된 자료의 날짜이며 제도의 시작일이 아니다.
//   출처 기관명은 사이트가 지금 쓰는 부처명(재정경제부)을 따랐다 (당시에는 다른 이름이었을 수 있다).
// - 종합부동산세: 모든 항목이 법제처 법령 개정본 기준(공포일)이다. 2018 9.13 대책, 2020 7.10 대책 같은 정부 발표 보도자료는 열어 확인하지 못해 넣지 않았다.
//   법령 개정본 안에서 확인되는 숫자·조문만 요약했다.
import type { Policy } from "../../lib/corpus/types";

export const FISCAL_POLICIES: Policy[] = [
  {
    "id": "kr-fiscal-rule",
    "scope": "domestic",
    "field": "재정·세제",
    "name": "재정준칙(재정건전화 제도)",
    "aliases": [
      "재정준칙",
      "한국형 재정준칙",
      "재정규칙",
      "재정건전화법",
      "재정건전성 준칙",
      "국가재정법",
      "국가채무비율",
      "채무준칙",
      "수지준칙",
      "적자성채무비율",
      "fiscal rule",
      "fiscal rules",
      "Korean fiscal rule",
      "Fiscal Soundness Act"
    ],
    "keywords": [
      "재정",
      "국가채무",
      "재정수지",
      "국가재정법"
    ],
    "firstEffectiveDate": "2007-01-01",
    "asOf": "2026-09-29",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "법제처 국가법령정보센터",
      "url": "https://www.law.go.kr/법령/국가재정법"
    },
    "history": [
      {
        "id": "kr-fiscal-rule-h1",
        "date": "2006-10-04",
        "title": "국가재정법 공포",
        "summary": "국가재정법을 공포하고 예산회계법과 기금관리기본법을 폐지했다(2007년 1월 1일 시행).",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 국가재정법 | 국가법령정보센터",
            "date": "2006-10-04",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=283845&chrClsCd=010202&urlMode=lsInfoP&efYd=20260911&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "「예산회계법」 및 「기금관리기본법」은 이를 각각 폐지한다."
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-fiscal-rule-h2",
        "date": "2016-08-09",
        "title": "재정건전화법 제정안 입법예고",
        "summary": "「재정건전화법」 제정안을 입법예고했다(제목 기준).",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "「재정건전화법」 제정안 입법예고 | 보도·참고자료 | 재정경제부",
            "date": "2016-08-09",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000004947&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "「재정건전화법」 제정안 입법예고"
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-fiscal-rule-h3",
        "date": "2016-10-27",
        "title": "정부, 재정건전화법안 국회 제출",
        "summary": "국가채무비율을 100분의 45 이하로 유지하도록 하는 재정건전화법안(정부안)이 제출됐다.",
        "sources": [
          {
            "institution": "국회 의안정보시스템",
            "institutionType": "국회",
            "title": "[2002974] 재정건전화법안(정부) | 심사정보",
            "date": "2016-10-27",
            "url": "https://likms.assembly.go.kr/bill/bi/billDetailPage.do?billId=ARC_I1C6D1T0Z2N7W1L8G1W5G3Q4E7T0I9",
            "checkedAt": "2026-10-22",
            "evidence": "국내총생산 대비 국가채무총액의 비율을 100분의 45 이하로 유지하도록 함."
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-fiscal-rule-h4",
        "date": "2020-10-05",
        "title": "한국형 재정준칙 도입 추진 발표",
        "summary": "「한국형 재정준칙」 도입 추진 보도자료를 발표했다(제목 기준).",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "재정의 지속가능성 유지 위한 『한국형 재정준칙』 도입 추진 | 보도·참고자료 | 재정경제부",
            "date": "2020-10-05",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000048696&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "재정의 지속가능성 유지 위한 『한국형 재정준칙』 도입 추진"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-fiscal-rule-h5",
        "date": "2020-12-30",
        "title": "정부, 재정준칙 담은 국가재정법 개정안 제출",
        "summary": "구속력 있는 재정준칙의 법적 근거를 마련하는 국가재정법 개정안(정부안)이 제출됐다.",
        "sources": [
          {
            "institution": "국회 의안정보시스템",
            "institutionType": "국회",
            "title": "[2107025] 국가재정법 일부개정법률안(정부) | 심사정보",
            "date": "2020-12-30",
            "url": "https://likms.assembly.go.kr/bill/bi/billDetailPage.do?billId=ARC_D2T0F1N2Z3B0B1J1M1F7F5E8H4O6H1",
            "checkedAt": "2026-10-22",
            "evidence": "국가채무 및 통합재정수지에 대한 구속력 있는 규율로서의 재정준칙 도입에 관한 법적 근거를 마련하고"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-fiscal-rule-h6",
        "date": "2023-02-12",
        "title": "재정준칙 법제화 관련 전문가 면담",
        "summary": "영국 예산책임청 의장과 OECD 전문가가 재정준칙 법제화 필요성을 말했다는 보도자료다(제목 기준).",
        "sources": [
          {
            "institution": "기획재정부",
            "institutionType": "정부 부처",
            "title": "영국 예산책임청 의장, OECD 전문가 한국의 재정준칙 법제화 필요성 한 목소리 | 보도·참고자료 | 재정경제부",
            "date": "2023-02-12",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000062935&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "영국 예산책임청 의장, OECD 전문가 한국의 재정준칙 법제화 필요성 한 목소리"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-fiscal-rule-h7",
        "date": "2023-03-14",
        "title": "국회 재정준칙 도입 공청회",
        "summary": "재정준칙 도입에 관한 공청회를 국회에서 개최했다.",
        "sources": [
          {
            "institution": "국회 의안정보시스템",
            "institutionType": "국회",
            "title": "[2107025] 국가재정법 일부개정법률안(정부) | 심사정보",
            "date": "2023-03-14",
            "url": "https://likms.assembly.go.kr/bill/bi/billDetailPage.do?billId=ARC_D2T0F1N2Z3B0B1J1M1F7F5E8H4O6H1",
            "checkedAt": "2026-10-22",
            "evidence": "2023. 3.14. 재정준칙 도입에 관한 공청회 개최함."
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-fiscal-rule-h8",
        "date": "2024-06-17",
        "title": "재정건전화법안 발의(22대 국회)",
        "summary": "관리재정수지 적자를 국내총생산의 100분의 2 이하로 유지하도록 하는 재정건전화법안이 발의됐다.",
        "sources": [
          {
            "institution": "국회 의안정보시스템",
            "institutionType": "국회",
            "title": "[2200529] 재정건전화법안(송언석의원 등 12인) | 심사정보",
            "date": "2024-06-17",
            "url": "https://likms.assembly.go.kr/bill/bi/billDetailPage.do?billId=PRC_A2A4W0W6V1V1U0U9S4B9B1Z9A2Y7Z9",
            "checkedAt": "2026-10-22",
            "evidence": "관리재정수지의 적자는 국내총생산액의 100분의 2 이하로 유지하도록 함(안 제7조)"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-fiscal-rule-h9",
        "date": "2026-09-29",
        "title": "재정준칙 명시 국가재정법 개정안 발의",
        "summary": "채무준칙·수지준칙·적자성채무비율 준칙을 법률에 명시하는 국가재정법 개정안이 발의됐다.",
        "sources": [
          {
            "institution": "국회 의안정보시스템",
            "institutionType": "국회",
            "title": "[2221631] 국가재정법 일부개정법률안(김상훈의원 등 12인) | 심사정보",
            "date": "2026-09-29",
            "url": "https://likms.assembly.go.kr/bill/bi/billDetailPage.do?billId=PRC_K2J6H0I9G2H2O1P6N1M6M1L9L6T1U5",
            "checkedAt": "2026-10-22",
            "evidence": "이에 예산안ㆍ추가경정예산안 편성 및 국가재정운용계획 수립 시 준수하여야 할 채무준칙, 수지준칙 및 적자성채무비율 준칙을 법률에 명시하는 한편"
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ]
  },
  {
    "id": "kr-supplementary-budget",
    "scope": "domestic",
    "field": "재정·세제",
    "name": "추가경정예산(추경)",
    "aliases": [
      "추경",
      "추가경정예산",
      "추가경정예산안",
      "추경예산",
      "제1회 추가경정예산",
      "supplementary budget",
      "supplementary budget bill",
      "extra budget"
    ],
    "keywords": [
      "재정",
      "추경",
      "예산",
      "국회 의결"
    ],
    "firstEffectiveDate": "1998-07-21",
    "asOf": "2025-07-04",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "재정경제부",
      "url": "https://www.mofe.go.kr/nw/nes/nesdta.do?bbsId=MOSFBBS_000000000028&menuNo=4010100"
    },
    "history": [
      {
        "id": "kr-supplementary-budget-h1",
        "date": "1998-07-21",
        "title": "1998년도 제2회 추경안",
        "summary": "1998년도 제2회 추가경정예산(안)이 정부 보도·참고자료로 공개됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "1998년도 제2회 추가경정예산(안)",
            "date": "1998-07-21",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=OLD_220117&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "1998년도 제2회 추가경정예산(안)"
          }
        ],
        "governmentId": "gov-kim-dj"
      },
      {
        "id": "kr-supplementary-budget-h2",
        "date": "2003-10-02",
        "title": "2003년도 제2회 추경안 편성",
        "summary": "2003년도 제2회 추가경정예산(안) 편성이 정부 보도·참고자료로 공개됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "2003년도 제2회 추가경정예산(안) 편성",
            "date": "2003-10-02",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=OLD_221353&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "2003년도 제2회 추가경정예산(안) 편성"
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-supplementary-budget-h3",
        "date": "2009-04-30",
        "title": "2009년도 제1회 추경 국회의결",
        "summary": "2009년도 제1회 추가경정예산이 국회에서 의결됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "2009년도 제1회 추가경정예산 국회의결",
            "date": "2009-04-30",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=OLD_4002860&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "2009년도 제1회 추가경정예산 국회의결"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "kr-supplementary-budget-h4",
        "date": "2013-06-07",
        "title": "2013년 제1차 추경안(정부안)",
        "summary": "2013년 제1차 추가경정예산안(정부안)이 정부 보도·참고자료로 공개됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "'13년 제1차 추가경정예산안(정부안)",
            "date": "2013-06-07",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=OLD_4017354&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "'13년 제1차 추가경정예산안(정부안)"
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-supplementary-budget-h5",
        "date": "2015-07-24",
        "title": "2015년 메르스 추경 국회 확정",
        "summary": "메르스 극복과 민생안정을 위한 12조원 규모 추경예산이 국회에서 확정됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "메르스 극복 및 민생안정을 위한 12조원 규모의 추경예산 및 기금운용계획 변경 국회 확정",
            "date": "2015-07-24",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=OLD_4095474&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "메르스 극복 및 민생안정을 위한 12조원 규모의 추경예산 및 기금운용계획 변경 국회 확정"
          }
        ],
        "governmentId": "gov-park"
      },
      {
        "id": "kr-supplementary-budget-h6",
        "date": "2018-05-21",
        "title": "2018년 추경 국회 확정",
        "summary": "청년일자리 창출과 고용·산업 위기지역 지원을 위한 2018년 추경이 국회에서 확정됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "청년일자리 창출과 고용.산업 위기지역 지원을 위한 2018년 추가경정예산 국회 확정",
            "date": "2018-05-21",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000017410&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "청년일자리 창출과 고용.산업 위기지역 지원을 위한 2018년 추가경정예산 국회 확정"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-supplementary-budget-h7",
        "date": "2020-03-17",
        "title": "2020년 코로나19 추경 국회 확정",
        "summary": "코로나19 파급영향 최소화와 조기극복을 위한 2020년 추경안이 국회에서 확정됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "코로나19 파급영향 최소화와 조기극복을 위한 2020년 추가경정예산안 국회 확정",
            "date": "2020-03-17",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000032703&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "코로나19 파급영향 최소화와 조기극복을 위한 2020년 추가경정예산안 국회 확정"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-supplementary-budget-h8",
        "date": "2022-02-21",
        "title": "2022년도 제1회 추경 국회 확정",
        "summary": "2022년도 제1회 추가경정예산이 국회에서 확정됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "2022년도 제1회 추가경정예산 국회 확정",
            "date": "2022-02-21",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000058590&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "2022년도 제1회 추가경정예산 국회 확정"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-supplementary-budget-h9",
        "date": "2025-07-04",
        "title": "2025년 제2회 추경 국회 확정",
        "summary": "2025년 제2회 추가경정예산이 국회에서 확정됐다(제목 기준).",
        "sources": [
          {
            "institution": "재정경제부",
            "institutionType": "정부 부처",
            "title": "2025년 제2회 추가경정예산 국회 확정",
            "date": "2025-07-04",
            "url": "https://www.mofe.go.kr/nw/nes/detailNesDtaView.do?searchBbsId1=MOSFBBS_000000000028&searchNttId1=MOSF_000000000074371&menuNo=4010100",
            "checkedAt": "2026-10-22",
            "evidence": "2025년 제2회 추가경정예산 국회 확정"
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ]
  },
  {
    "id": "kr-comprehensive-real-estate-tax",
    "scope": "domestic",
    "field": "재정·세제",
    "name": "종합부동산세",
    "aliases": [
      "종부세",
      "종합부동산세",
      "종합부동산세법",
      "종부세법",
      "고액 부동산 보유세",
      "부동산 보유세",
      "주택분 종합부동산세",
      "토지분 종합부동산세",
      "공정시장가액비율",
      "comprehensive real estate holding tax",
      "comprehensive real estate tax",
      "CRET"
    ],
    "keywords": [
      "세제",
      "부동산 보유세",
      "종부세",
      "공시가격"
    ],
    "firstEffectiveDate": "2005-01-05",
    "asOf": "2025-12-23",
    "lastCheckedAt": "2026-10-22",
    "officialSite": {
      "institution": "법제처 국가법령정보센터",
      "url": "https://www.law.go.kr/법령/종합부동산세법"
    },
    "history": [
      {
        "id": "kr-comprehensive-real-estate-tax-h1",
        "date": "2005-01-05",
        "title": "종합부동산세법 제정",
        "summary": "고액 부동산 보유자에게 종합부동산세를 부과하는 종합부동산세법을 제정해 공포일부터 시행했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제7328호, 2005. 1. 5., 제정]",
            "date": "2005-01-05",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=66446&chrClsCd=010202&urlMode=lsInfoP&efYd=20050105&ancYnChk=",
            "checkedAt": "2026-10-22",
            "evidence": "이 법은 고액의 부동산 보유자에 대하여 종합부동산세를 부과하여 부동산보유에 대한 조세부담의 형평성을 제고하고, 부동산의 가격안정을 도모함으로써 지방재정의 균형발전과 국민경제의 건전한 발전에 이바지함을 목적으로 한다."
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h2",
        "date": "2005-12-31",
        "title": "주택분 과세표준 6억원 공제",
        "summary": "주택분 과세표준을 공시가격 합산액에서 6억원을 공제한 금액으로 정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제7836호, 2005. 12. 31., 일부개정]",
            "date": "2005-12-31",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=72530&chrClsCd=010202&urlMode=lsInfoP&efYd=20051231&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "주택에 대한 종합부동산세의 과세표준은 납세의무자별로 주택의 공시가격을 합산한 금액에서 6억원을 공제한 금액으로 한다."
          }
        ],
        "governmentId": "gov-roh"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h3",
        "date": "2008-12-26",
        "title": "헌법재판소 결정 후 조문 개정",
        "summary": "헌법재판소의 위헌 결정(2008-11-13)에 따라 종합부동산세법 조문을 개정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제9273호, 2008. 12. 26., 일부개정]",
            "date": "2008-12-26",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=90466&chrClsCd=010202&urlMode=lsInfoP&efYd=20081226&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "[2008. 12. 26. 법률 제9273호에 의하여 2008. 11. 13. 헌법재판소에서 위헌 결정된 이 조를 개정함.]"
          }
        ],
        "governmentId": "gov-lee-mb"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h4",
        "date": "2018-12-31",
        "title": "주택 수·조정대상지역별 구분",
        "summary": "3주택 이상 또는 조정대상지역 내 2주택 소유자를 구분해 적용하는 규정을 개정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제16109호, 2018. 12. 31., 일부개정, 시행 2019. 1. 1.]",
            "date": "2018-12-31",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=206318&chrClsCd=010202&urlMode=lsInfoP&efYd=20190101&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "납세의무자가 3주택 이상을 소유하거나, 조정대상지역 내 2주택을 소유한 경우"
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h5",
        "date": "2020-08-18",
        "title": "공제율 합계 100분의 80 범위",
        "summary": "공제율 합계 100분의 80의 범위에서 중복해 적용할 수 있도록 개정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제17478호, 2020. 8. 18., 일부개정, 시행 2021. 1. 1.]",
            "date": "2020-08-18",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=220955&chrClsCd=010202&urlMode=lsInfoP&efYd=20210101&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "이 경우 제6항과 제7항은 공제율 합계 100분의 80의 범위에서 중복하여 적용할 수 있다."
          }
        ],
        "governmentId": "gov-moon"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h6",
        "date": "2022-12-31",
        "title": "1세대 1주택자 공제 12억원",
        "summary": "1세대 1주택자의 주택분 공제를 12억원으로 개정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제19200호, 2022. 12. 31., 일부개정, 시행 2023. 1. 1.]",
            "date": "2022-12-31",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=247443&chrClsCd=010202&urlMode=lsInfoP&efYd=20230101&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "1. 대통령령으로 정하는 1세대 1주택자(이하 “1세대 1주택자”라 한다): 12억원"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h7",
        "date": "2023-04-18",
        "title": "공익법인등 세율 적용 개정",
        "summary": "공익법인등으로서 제1호에 해당하지 않는 경우 제1항 각 호의 세율을 적용하도록 했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제19342호, 2023. 4. 18., 일부개정]",
            "date": "2023-04-18",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=249983&chrClsCd=010202&urlMode=lsInfoP&efYd=20230418&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "2. 공익법인등으로서 제1호에 해당하지 아니하는 경우: 제1항 각 호에 따른 세율"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h8",
        "date": "2025-03-14",
        "title": "납부유예 요건 개정",
        "summary": "납부유예 요건에 해당 연도 주택분 종합부동산세액 100만원 초과를 두었다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제20779호, 2025. 3. 14., 일부개정]",
            "date": "2025-03-14",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=269879&chrClsCd=010202&urlMode=lsInfoP&efYd=20250314&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "4. 해당 연도의 주택분 종합부동산세액이 100만원을 초과할 것"
          }
        ],
        "governmentId": "gov-yoon"
      },
      {
        "id": "kr-comprehensive-real-estate-tax-h9",
        "date": "2025-12-23",
        "title": "신탁주택 소유 간주 규정 개정",
        "summary": "위탁자가 신탁주택을 소유한 것으로 보는 규정을 개정했다.",
        "sources": [
          {
            "institution": "법제처 국가법령정보센터",
            "institutionType": "정부 부처",
            "title": "법령 > 본문 > 종합부동산세법 | 국가법령정보센터 [법률 제21224호, 2025. 12. 23., 일부개정]",
            "date": "2025-12-23",
            "url": "https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=280417&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
            "checkedAt": "2026-10-22",
            "evidence": "이 경우 위탁자가 신탁주택을 소유한 것으로 본다. <신설 2020. 12. 29., 2025. 12. 23.>"
          }
        ],
        "governmentId": "gov-lee-jm"
      }
    ]
  }
];
