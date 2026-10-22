// Design Ref: §5 TransmissionPlan, PLAN 9번 — 중국 인민은행 통화정책가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_PBOC_MONETARY: TransmissionPlan = {
  "foreignPolicyId": "pboc-monetary",
  "summary": {
    "sentences": [
      "한국은행은 중국의 통화정책 기조와 경기 흐름이 국내 환율, 금융시장, 수출에 영향을 준다고 여러 번 밝혔다.",
      "다만 한국은행은 인민은행 정책이 한국 변수를 직접 움직였다고 한 문장으로 설명하지는 않았다.",
      "아래 해설은 서로 다른 시점의 한국은행 문장과 인민은행 공고를 이은 것이다.",
      "그래서 각 단계는 같은 요인을 말하는 별개 서술이며 인과를 확정한 것이 아니다."
    ],
    "sources": [
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화신용정책보고서(2026년 3월)",
        "date": "2026-03-12",
        "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
        "checkedAt": "2026-10-23",
        "evidence": "중국은 2025년 들어 통화정책 기조를 신중(prudent)에서 적절히 완화적(appropriately loose)으로 변경하는 등 완화적 통화정책을 유지하였다."
      },
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2025.4.17)",
        "date": "2025-04-17",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10090937",
        "checkedAt": "2026-10-23",
        "evidence": "원/달러 환율이 미국 관세정책 및 중국의 대응, 증권투자자금 유출입 등에 영향받으며 단기간에 큰 폭으로 상승하였다가 반락하였다."
      }
    ]
  },
  "channels": [
    {
      "id": "pboc-monetary-c1",
      "name": "금융시장·환율 채널",
      "narrative": {
        "sentences": [
          "인민은행은 2026년 10월 1년 LPR(대출 기준금리) 3.0%, 5년 초과 3.5%를 공고했다.",
          "한국은행은 중국의 경기부양책 등에 영향받아 장기 국채금리와 달러지수가 하락했다가 반등했다고 밝혔다.",
          "또 원/달러 환율(1달러를 사는 데 드는 원화)이 미국 관세정책과 중국의 대응 등으로 크게 오르내렸다고 한다.",
          "2024년에는 엔화·위안화 등 주변국 통화 약세의 영향이 더해져 환율이 올랐다고 설명했다."
        ],
        "sources": [
          {
            "institution": "중국 인민은행",
            "institutionType": "해외 중앙은행",
            "title": "Announcement on Loan Prime Rate (October 20, 2026)",
            "date": "2026-10-20",
            "url": "https://www.pbc.gov.cn/en/3688229/3688335/3730276/3883798/2026102014240299288/index.html",
            "checkedAt": "2026-10-23",
            "evidence": "the one-year LPR is 3.0% and the over-five-year LPR is 3.5%. The rates are effective until the next release."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2024.10.11)",
            "date": "2024-10-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10087410",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준의 금리인하 속도에 대한 기대 변화, 중동지역 리스크, 중국의 경기부양책 등에 영향받으며 장기 국채금리와 미 달러화 지수가 하락하였다가 반등하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.4.17)",
            "date": "2025-04-17",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10090937",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율이 미국 관세정책 및 중국의 대응, 증권투자자금 유출입 등에 영향받으며 단기간에 큰 폭으로 상승하였다가 반락하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2024.7.11)",
            "date": "2024-07-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10085698",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율은 엔화‧위안화 등 주변국 통화 약세의 영향이 더해지면서 상승하였다."
          }
        ]
      },
      "steps": [
        {
          "id": "pboc-monetary-c1-s1",
          "label": "인민은행 LPR 공고",
          "explanation": "인민은행 승인 아래 1년 LPR 3.0%, 5년 초과 LPR 3.5%가 공고되었다.",
          "source": {
            "institution": "중국 인민은행",
            "institutionType": "해외 중앙은행",
            "title": "Announcement on Loan Prime Rate (October 20, 2026)",
            "date": "2026-10-20",
            "url": "https://www.pbc.gov.cn/en/3688229/3688335/3730276/3883798/2026102014240299288/index.html",
            "checkedAt": "2026-10-23",
            "evidence": "the one-year LPR is 3.0% and the over-five-year LPR is 3.5%. The rates are effective until the next release."
          },
          "seriesId": "IR3TIB01CNM156N"
        },
        {
          "id": "pboc-monetary-c1-s2",
          "label": "국제 금리·달러 변동",
          "explanation": "중국의 경기부양책 등에 영향받아 장기 국채금리와 달러지수가 하락했다가 반등했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2024.10.11)",
            "date": "2024-10-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10087410",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준의 금리인하 속도에 대한 기대 변화, 중동지역 리스크, 중국의 경기부양책 등에 영향받으며 장기 국채금리와 미 달러화 지수가 하락하였다가 반등하였다."
          },
          "seriesId": "DTWEXBGS"
        },
        {
          "id": "pboc-monetary-c1-s3",
          "label": "국내 환율 변동",
          "explanation": "원/달러 환율이 미국 관세정책과 중국의 대응 등에 영향받아 크게 오르내렸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.4.17)",
            "date": "2025-04-17",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10090937",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율이 미국 관세정책 및 중국의 대응, 증권투자자금 유출입 등에 영향받으며 단기간에 큰 폭으로 상승하였다가 반락하였다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "pboc-monetary-c1-s4",
          "label": "원/달러 환율 영향",
          "explanation": "원/달러 환율은 엔화·위안화 등 주변국 통화 약세의 영향이 더해져 상승했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2024.7.11)",
            "date": "2024-07-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10085698",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율은 엔화‧위안화 등 주변국 통화 약세의 영향이 더해지면서 상승하였다."
          },
          "seriesId": "EXKOUS"
        }
      ],
      "chart": {
        "seriesIds": [
          "IR3TIB01CNM156N",
          "DTWEXBGS",
          "EXKOUS"
        ]
      }
    },
    {
      "id": "pboc-monetary-c2",
      "name": "성장 둔화·국내 파급 채널",
      "narrative": {
        "sentences": [
          "한국은행은 중국이 2025년 들어 통화정책 기조를 적절히 완화적으로 바꿨다고 설명한다.",
          "2023년 의결문은 중국의 회복세 약화 등으로 세계경제 성장세가 둔화될 전망이라고 밝혔다.",
          "같은 문서는 성장경로에 중국경제 향방과 국내 파급영향 관련 불확실성이 높다고 했다.",
          "한국은행은 또 중국경제 회복의 영향 등으로 국내경제가 점차 회복될 것으로 예상했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 2025년 들어 통화정책 기조를 신중(prudent)에서 적절히 완화적(appropriately loose)으로 변경하는 등 완화적 통화정책을 유지하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.8.24)",
            "date": "2023-08-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10079127",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 높아진 금리의 영향, 중국의 회복세 약화 등으로 성장세 둔화 흐름을 이어갈 것으로 전망된다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.8.24)",
            "date": "2023-08-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10079127",
            "checkedAt": "2026-10-23",
            "evidence": "금년 성장률은 1.4%로 지난 5월 전망치에 부합할 것으로 전망되지만, 향후 성장경로 상에는 중국경제 향방 및 국내 파급영향, 주요 선진국의 경기 흐름, IT 경기 반등 시기 등과 관련한 불확실성이 높은 상황이다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.4.11)",
            "date": "2023-04-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10076732",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 국내경제는 글로벌 경기 둔화, 그간의 금리인상 영향 등으로 상반기까지는 부진한 성장 흐름을 이어가겠으며, 하반기 이후에는 IT 경기부진 완화, 중국경제 회복의 영향 등으로 점차 회복될 것으로 예상된다."
          }
        ]
      },
      "steps": [
        {
          "id": "pboc-monetary-c2-s1",
          "label": "인민은행 완화 기조",
          "explanation": "중국은 2025년 들어 통화정책 기조를 적절히 완화적으로 바꿔 완화 기조를 유지했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 2025년 들어 통화정책 기조를 신중(prudent)에서 적절히 완화적(appropriately loose)으로 변경하는 등 완화적 통화정책을 유지하였다."
          },
          "seriesId": "IR3TIB01CNM156N"
        },
        {
          "id": "pboc-monetary-c2-s2",
          "label": "중국 회복세 약화",
          "explanation": "높아진 금리와 중국의 회복세 약화 등으로 세계경제 성장세가 둔화될 전망이다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.8.24)",
            "date": "2023-08-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10079127",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 높아진 금리의 영향, 중국의 회복세 약화 등으로 성장세 둔화 흐름을 이어갈 것으로 전망된다."
          },
          "seriesId": "XTEXVA01CNM667S"
        },
        {
          "id": "pboc-monetary-c2-s3",
          "label": "국내 성장 불확실성",
          "explanation": "성장경로에는 중국경제 향방과 국내 파급영향 관련 불확실성이 높다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.8.24)",
            "date": "2023-08-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10079127",
            "checkedAt": "2026-10-23",
            "evidence": "금년 성장률은 1.4%로 지난 5월 전망치에 부합할 것으로 전망되지만, 향후 성장경로 상에는 중국경제 향방 및 국내 파급영향, 주요 선진국의 경기 흐름, IT 경기 반등 시기 등과 관련한 불확실성이 높은 상황이다."
          },
          "seriesId": "KORLOLITOAASTSAM"
        },
        {
          "id": "pboc-monetary-c2-s4",
          "label": "국내경제 회복",
          "explanation": "국내경제는 하반기 이후 중국경제 회복의 영향 등으로 점차 회복될 것으로 예상된다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2023.4.11)",
            "date": "2023-04-11",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10076732",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 국내경제는 글로벌 경기 둔화, 그간의 금리인상 영향 등으로 상반기까지는 부진한 성장 흐름을 이어가겠으며, 하반기 이후에는 IT 경기부진 완화, 중국경제 회복의 영향 등으로 점차 회복될 것으로 예상된다."
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "IR3TIB01CNM156N",
          "XTEXVA01CNM667S",
          "KORLOLITOAASTSAM"
        ]
      }
    },
    {
      "id": "pboc-monetary-c3",
      "name": "교역·수출 채널",
      "narrative": {
        "sentences": [
          "한국은행은 중국이 2025년 들어 통화정책 기조를 적절히 완화적으로 바꿨다고 설명한다.",
          "중국은 내수 부진이 이어지고 수출 증가율도 낮아져 성장세가 둔화될 전망이라고 한다.",
          "한국의 수출은 중국·아세안·대만으로 반도체를 중심으로 늘었다고 한다.",
          "한국은행은 이 두 문장을 인과로 이어 설명하지는 않았다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 2025년 들어 통화정책 기조를 신중(prudent)에서 적절히 완화적(appropriately loose)으로 변경하는 등 완화적 통화정책을 유지하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 내수 부진이 지속되고 수출 증가율도 낮아지면서 성장세가 둔화될 것으로 전망된다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "지역별로는 중국‧아세안‧대만으로의 수출이 반도체를 중심으로 증가한 반면, 대미 수출은 자동차‧기계류‧철강 등 관세부과 품목을 중심으로 감소하였다."
          }
        ]
      },
      "steps": [
        {
          "id": "pboc-monetary-c3-s1",
          "label": "인민은행 완화 기조",
          "explanation": "중국은 2025년 들어 통화정책 기조를 적절히 완화적으로 바꿔 완화 기조를 유지했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 2025년 들어 통화정책 기조를 신중(prudent)에서 적절히 완화적(appropriately loose)으로 변경하는 등 완화적 통화정책을 유지하였다."
          },
          "seriesId": "IR3TIB01CNM156N"
        },
        {
          "id": "pboc-monetary-c3-s2",
          "label": "중국 성장 둔화 전망",
          "explanation": "중국은 내수 부진이 지속되고 수출 증가율도 낮아져 성장세가 둔화될 전망이다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 내수 부진이 지속되고 수출 증가율도 낮아지면서 성장세가 둔화될 것으로 전망된다."
          },
          "seriesId": "XTEXVA01CNM667S"
        },
        {
          "id": "pboc-monetary-c3-s3",
          "label": "한국의 대중국 수출",
          "explanation": "중국·아세안·대만으로의 수출은 반도체를 중심으로 증가했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2026년 3월)",
            "date": "2026-03-12",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?menuNo=200067&nttId=10096935",
            "checkedAt": "2026-10-23",
            "evidence": "지역별로는 중국‧아세안‧대만으로의 수출이 반도체를 중심으로 증가한 반면, 대미 수출은 자동차‧기계류‧철강 등 관세부과 품목을 중심으로 감소하였다."
          },
          "seriesId": "XTEXVA01KRM667S"
        }
      ],
      "chart": {
        "seriesIds": [
          "IR3TIB01CNM156N",
          "XTEXVA01CNM667S",
          "XTEXVA01KRM667S"
        ]
      }
    }
  ]
};
