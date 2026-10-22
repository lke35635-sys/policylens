// Design Ref: §5 TransmissionPlan, PLAN 9번 — 일본의 대한국 수출관리 운용 변경가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_JAPAN_EXPORT_CONTROL: TransmissionPlan = {
  "foreignPolicyId": "japan-export-control",
  "summary": {
    "sentences": [
      "일본이 2019년 반도체 소재 수출관리를 바꾼 뒤 한국 정부는 국산화와 해외 투자유치로 대응했다.",
      "한국은행은 이 일이 국내 성장과 물가에 미칠 영향을 살펴보겠다고 밝혔다.",
      "다만 실제 공급 차질이나 수입 감소를 말하는 공식 문장은 찾지 못했다.",
      "그래서 이 해설은 정부 대응을 설명한 자료가 중심이다."
    ],
    "sources": [
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2019.7.18)",
        "date": "2019-07-18",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10052834&programType=newsData&menuNo=200690",
        "checkedAt": "2026-10-23",
        "evidence": "이 과정에서 미·중 무역분쟁, 일본의 수출규제, 주요국의 경기와 통화정책 변화, 가계부채 증가세, 지정학적 리스크 등의 전개상황과 국내 성장 및 물가에 미치는 영향을 주의깊게 살펴볼 것이다."
      },
      {
        "institution": "산업통상자원부",
        "institutionType": "정부 부처",
        "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
        "date": "2019-09-19",
        "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
        "checkedAt": "2026-10-23",
        "evidence": "최근 일본 정부의 수출규제에 따라 정부는 소재·부품·장비 공급 안정성을 확보하기 위하여, 해당 산업별로 국산화에 적극 나서는 한편, 필요할 경우 해외 첨단기업 대상으로 M&A와 투자유치도 병행하여 진행"
      }
    ]
  },
  "channels": [
    {
      "id": "japan-export-control-c1",
      "name": "소재 공급 채널",
      "narrative": {
        "sentences": [
          "WTO 문서는 한국이 일본의 수출 제한 조치에 협의를 요청했다고 기록한다.",
          "대상은 불화폴리이미드, 레지스트, 불화수소와 관련 기술이다.",
          "WTO는 이 품목들이 주로 스마트폰, TV 디스플레이, 반도체 생산에 쓰인다고 설명한다.",
          "산업통상자원부는 공급 안정성을 위해 국산화(수입 소재를 국내에서 만드는 것)에 나선다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "WTO",
            "institutionType": "국제기구",
            "title": "DS590: Japan — Measures Related to the Exportation of Products and Technology to Korea",
            "date": "2023-04-11",
            "url": "https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds590_e.htm",
            "checkedAt": "2026-10-23",
            "evidence": "On 11 September 2019, Korea requested consultations with Japan regarding certain measures, including licensing policies and procedures, adopted by Japan allegedly restricting exports of fluorinated polyimide, resist polymers and hydrogen fluoride, and their related technologies destined for Korea."
          },
          {
            "institution": "WTO",
            "institutionType": "국제기구",
            "title": "DS590: Japan — Measures Related to the Exportation of Products and Technology to Korea",
            "date": "2023-04-11",
            "url": "https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds590_e.htm",
            "checkedAt": "2026-10-23",
            "evidence": "Those products are used primarily in the production of smartphones, TV displays and semiconductors."
          },
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "최근 일본 정부의 수출규제에 따라 정부는 소재·부품·장비 공급 안정성을 확보하기 위하여, 해당 산업별로 국산화에 적극 나서는 한편, 필요할 경우 해외 첨단기업 대상으로 M&A와 투자유치도 병행하여 진행"
          }
        ]
      },
      "steps": [
        {
          "id": "japan-export-control-c1-s1",
          "label": "3개 품목 수출 제한",
          "explanation": "일본이 한국행 불화폴리이미드·레지스트·불화수소 수출을 제한한 조치에 한국이 협의를 요청했다.",
          "source": {
            "institution": "WTO",
            "institutionType": "국제기구",
            "title": "DS590: Japan — Measures Related to the Exportation of Products and Technology to Korea",
            "date": "2023-04-11",
            "url": "https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds590_e.htm",
            "checkedAt": "2026-10-23",
            "evidence": "On 11 September 2019, Korea requested consultations with Japan regarding certain measures, including licensing policies and procedures, adopted by Japan allegedly restricting exports of fluorinated polyimide, resist polymers and hydrogen fluoride, and their related technologies destined for Korea."
          },
          "seriesId": "XTEXVA01JPM664S"
        },
        {
          "id": "japan-export-control-c1-s2",
          "label": "주력 제품의 소재",
          "explanation": "해당 품목은 주로 스마트폰, TV 디스플레이, 반도체 생산에 쓰인다.",
          "source": {
            "institution": "WTO",
            "institutionType": "국제기구",
            "title": "DS590: Japan — Measures Related to the Exportation of Products and Technology to Korea",
            "date": "2023-04-11",
            "url": "https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds590_e.htm",
            "checkedAt": "2026-10-23",
            "evidence": "Those products are used primarily in the production of smartphones, TV displays and semiconductors."
          },
          "seriesId": "XTEXVA01KRM667S"
        },
        {
          "id": "japan-export-control-c1-s3",
          "label": "공급안정 대응",
          "explanation": "정부는 소재·부품·장비 공급 안정성을 확보하려고 국산화에 나선다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "최근 일본 정부의 수출규제에 따라 정부는 소재·부품·장비 공급 안정성을 확보하기 위하여, 해당 산업별로 국산화에 적극 나서는 한편, 필요할 경우 해외 첨단기업 대상으로 M&A와 투자유치도 병행하여 진행"
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "XTEXVA01JPM664S",
          "XTEXVA01KRM667S"
        ]
      }
    },
    {
      "id": "japan-export-control-c2",
      "name": "소재부품 국산화·투자 채널",
      "narrative": {
        "sentences": [
          "산업통상자원부는 일본 수출규제에 정부가 국산화와 해외 투자유치를 병행한다고 밝혔다.",
          "독일에 이어 미국, 영국에서도 소재·부품·장비 투자 설명회를 열 예정이라고 한다.",
          "수출규제 3개 품목은 공장 신증설 등으로 연내 공급안정화를 계획한다고 한다."
        ],
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "최근 일본 정부의 수출규제에 따라 정부는 소재·부품·장비 공급 안정성을 확보하기 위하여, 해당 산업별로 국산화에 적극 나서는 한편, 필요할 경우 해외 첨단기업 대상으로 M&A와 투자유치도 병행하여 진행"
          },
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "산업부는 금번 독일 IR을 시작으로 미국(11월), 영국(20.上)에서도 소재·부품·장비기업 투자유치를 위한 IR을 진행할 예정이며"
          },
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "특히, 일본의 수출규제 3개 품목은 공장 신증설, 외투기업 투자 등으로 금년 중 완전한 공급안정화를 달성할 계획임을 밝혔다."
          }
        ]
      },
      "steps": [
        {
          "id": "japan-export-control-c2-s1",
          "label": "수출규제와 국산화",
          "explanation": "일본 수출규제에 정부가 국산화와 해외 기업 M&A·투자유치를 병행한다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "최근 일본 정부의 수출규제에 따라 정부는 소재·부품·장비 공급 안정성을 확보하기 위하여, 해당 산업별로 국산화에 적극 나서는 한편, 필요할 경우 해외 첨단기업 대상으로 M&A와 투자유치도 병행하여 진행"
          }
        },
        {
          "id": "japan-export-control-c2-s2",
          "label": "해외 투자유치 확대",
          "explanation": "독일 투자유치 이후 미국, 영국에서도 소재·부품·장비 투자유치 IR을 진행할 예정이다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "산업부, 소재·부품·장비 공급 안정성 확보 위해 독일기업 투자유치 본격 시동",
            "date": "2019-09-19",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162086/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "산업부는 금번 독일 IR을 시작으로 미국(11월), 영국(20.上)에서도 소재·부품·장비기업 투자유치를 위한 IR을 진행할 예정이며"
          }
        },
        {
          "id": "japan-export-control-c2-s3",
          "label": "국내 양산 착수",
          "explanation": "3개 품목은 공장 신증설과 외투기업 투자로 금년 중 공급안정화를 계획한다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "특히, 일본의 수출규제 3개 품목은 공장 신증설, 외투기업 투자 등으로 금년 중 완전한 공급안정화를 달성할 계획임을 밝혔다."
          }
        }
      ]
    },
    {
      "id": "japan-export-control-c3",
      "name": "대일 수입·공급선 채널",
      "narrative": {
        "sentences": [
          "산업통상자원부는 블랭크마스크가 대일본 수입 상위 20대 핵심 소부장 품목이라고 밝혔다.",
          "20대 품목은 국내생산 확대, 기술개발, 수입국 다변화 등을 추진 중이라고 한다.",
          "블랭크마스크가 양산되면 국내 공급안정성이 개선될 전망이라고 한다."
        ],
        "sources": [
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "블랭크마스크는 對일본 수입 상위 20대 핵심 소부장 품목에 해당됨"
          },
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "20대 품목은 ‘21년 공급안정성 확보 목표로 국내생산 확대, 기술개발(’19년 추경 650억원, ‘20년 1,165억원), 수입국 다변화 등을 계획대로 추진중에 있으며,"
          },
          {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "반도체 공정의 핵심소재인 블랭크마스크가 양산 되면, 국내 공급안정성이 개선될 전망이다."
          }
        ]
      },
      "steps": [
        {
          "id": "japan-export-control-c3-s1",
          "label": "일본 의존 품목",
          "explanation": "블랭크마스크는 對일본 수입 상위 20대 핵심 소부장 품목에 해당한다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "블랭크마스크는 對일본 수입 상위 20대 핵심 소부장 품목에 해당됨"
          },
          "seriesId": "XTIMVA01KRM667S"
        },
        {
          "id": "japan-export-control-c3-s2",
          "label": "수입국 다변화",
          "explanation": "20대 품목은 국내생산 확대, 기술개발, 수입국 다변화 등을 추진 중이다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "20대 품목은 ‘21년 공급안정성 확보 목표로 국내생산 확대, 기술개발(’19년 추경 650억원, ‘20년 1,165억원), 수입국 다변화 등을 계획대로 추진중에 있으며,"
          },
          "seriesId": "XTEXVA01JPM664S"
        },
        {
          "id": "japan-export-control-c3-s3",
          "label": "국내 공급 개선",
          "explanation": "블랭크마스크가 양산되면 국내 공급안정성이 개선될 전망이다.",
          "source": {
            "institution": "산업통상자원부",
            "institutionType": "정부 부처",
            "title": "SKC, 반도체용 하이엔드급 블랭크마스크 연내 양산 개시",
            "date": "2020-04-20",
            "url": "https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/162856/view?mno=&pageIndex=1",
            "checkedAt": "2026-10-23",
            "evidence": "반도체 공정의 핵심소재인 블랭크마스크가 양산 되면, 국내 공급안정성이 개선될 전망이다."
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "XTIMVA01KRM667S",
          "XTEXVA01JPM664S"
        ]
      }
    },
    {
      "id": "japan-export-control-c4",
      "name": "금융시장·환율 채널",
      "narrative": {
        "sentences": [
          "한국은행은 주가와 원/달러 환율이 일본의 수출규제 등에 영향받아 크게 등락했다고 밝혔다.",
          "금융통화위원회(기준금리를 정하는 기구)는 수출규제가 성장과 물가에 미치는 영향을 살펴보겠다고 했다.",
          "이 의결문은 영향의 크기를 숫자로 제시하지는 않았다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10052834&programType=newsData&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "주가와 원/달러 환율은 미·중 무역분쟁, 일본의 수출규제 등에 영향받으며 상당폭 등락하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10052834&programType=newsData&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "이 과정에서 미·중 무역분쟁, 일본의 수출규제, 주요국의 경기와 통화정책 변화, 가계부채 증가세, 지정학적 리스크 등의 전개상황과 국내 성장 및 물가에 미치는 영향을 주의깊게 살펴볼 것이다."
          }
        ]
      },
      "steps": [
        {
          "id": "japan-export-control-c4-s1",
          "label": "주가·환율 변동",
          "explanation": "주가와 원/달러 환율이 일본의 수출규제 등에 영향받으며 상당폭 등락했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10052834&programType=newsData&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "주가와 원/달러 환율은 미·중 무역분쟁, 일본의 수출규제 등에 영향받으며 상당폭 등락하였다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "japan-export-control-c4-s2",
          "label": "성장·물가 점검",
          "explanation": "금통위는 일본의 수출규제가 국내 성장과 물가에 미치는 영향을 살펴볼 것이라 했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10052834&programType=newsData&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "이 과정에서 미·중 무역분쟁, 일본의 수출규제, 주요국의 경기와 통화정책 변화, 가계부채 증가세, 지정학적 리스크 등의 전개상황과 국내 성장 및 물가에 미치는 영향을 주의깊게 살펴볼 것이다."
          },
          "seriesId": "SPASTT01KRM661N"
        }
      ],
      "chart": {
        "seriesIds": [
          "EXKOUS",
          "SPASTT01KRM661N"
        ]
      }
    }
  ]
};
