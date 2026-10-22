// Design Ref: §5 TransmissionPlan, PLAN 9번 — 미중 무역갈등가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_US_CHINA_TRADE_CONFLICT: TransmissionPlan = {
  "foreignPolicyId": "us-china-trade-conflict",
  "summary": {
    "sentences": [
      "한국은행은 미·중 무역분쟁이 세계 교역과 국제 금융시장을 거쳐 국내 성장 전망과 환율, 주가에 영향을 준다고 밝혔다.",
      "2025년 관세 국면에서는 중국의 성장 둔화와 한국의 대미 수출 감소를 말한 문장이 있다.",
      "다만 한국은행은 미국의 301조 관세 자체가 한국에 준 효과를 한 문장으로 설명하지는 않았다.",
      "아래 해설은 서로 다른 시점의 한국은행 문장을 이은 것이다."
    ],
    "sources": [
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2019.10.16)",
        "date": "2019-10-16",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10054356",
        "checkedAt": "2026-10-23",
        "evidence": "앞으로 국내경제는 미·중 무역분쟁 지속, 지정학적 리스크 증대 등으로 지난 7월의 성장 전망경로를 하회할 것으로 예상된다."
      },
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2019.7.18)",
        "date": "2019-07-18",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10052834",
        "checkedAt": "2026-10-23",
        "evidence": "세계경제는 미·중 무역분쟁 등으로 교역이 위축되면서 성장세가 완만해지는 움직임을 지속하였다."
      }
    ]
  },
  "channels": [
    {
      "id": "us-china-trade-conflict-c1",
      "name": "세계 교역·성장 채널",
      "narrative": {
        "sentences": [
          "한국은행은 세계경제가 미·중 무역분쟁(관세 등으로 서로 무역을 막는 다툼) 등으로 교역이 위축됐다고 밝혔다.",
          "세계경제는 교역이 위축되면서 성장세 둔화가 지속됐다고 한다.",
          "국내경제도 미·중 무역분쟁 지속 등으로 지난 7월의 성장 전망경로를 밑돌 것으로 예상했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10052834",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 미·중 무역분쟁 등으로 교역이 위축되면서 성장세가 완만해지는 움직임을 지속하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.10.16)",
            "date": "2019-10-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10054356",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 교역이 위축되면서 성장세 둔화가 지속되었다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.10.16)",
            "date": "2019-10-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10054356",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 국내경제는 미·중 무역분쟁 지속, 지정학적 리스크 증대 등으로 지난 7월의 성장 전망경로를 하회할 것으로 예상된다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-china-trade-conflict-c1-s1",
          "label": "미·중 무역분쟁",
          "explanation": "미·중 무역분쟁 등으로 교역이 위축되었다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.7.18)",
            "date": "2019-07-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10052834",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 미·중 무역분쟁 등으로 교역이 위축되면서 성장세가 완만해지는 움직임을 지속하였다."
          },
          "seriesId": "XTEXVA01CNM667S"
        },
        {
          "id": "us-china-trade-conflict-c1-s2",
          "label": "세계 성장세 둔화",
          "explanation": "세계경제는 교역이 위축되면서 성장세 둔화가 지속되었다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.10.16)",
            "date": "2019-10-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10054356",
            "checkedAt": "2026-10-23",
            "evidence": "세계경제는 교역이 위축되면서 성장세 둔화가 지속되었다."
          },
          "seriesId": "XTEXVA01KRM667S"
        },
        {
          "id": "us-china-trade-conflict-c1-s3",
          "label": "국내 성장 전망 하향",
          "explanation": "미·중 무역분쟁 지속 등으로 국내 성장 전망경로를 하회할 것으로 예상된다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.10.16)",
            "date": "2019-10-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10054356",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 국내경제는 미·중 무역분쟁 지속, 지정학적 리스크 증대 등으로 지난 7월의 성장 전망경로를 하회할 것으로 예상된다."
          },
          "seriesId": "KORLOLITOAASTSAM"
        }
      ],
      "chart": {
        "seriesIds": [
          "XTEXVA01CNM667S",
          "XTEXVA01KRM667S",
          "KORLOLITOAASTSAM"
        ]
      }
    },
    {
      "id": "us-china-trade-conflict-c2",
      "name": "금융시장·환율 채널",
      "narrative": {
        "sentences": [
          "한국은행은 미·중 무역분쟁과 경기 둔화 우려로 주요국 국채금리와 주가가 크게 떨어졌다고 밝혔다.",
          "2018년에는 무역분쟁 심화 등으로 국내 주가가 크게 떨어지고 원/달러 환율이 상당폭 올랐다고 한다.",
          "2019년에는 무역분쟁 완화 기대 등으로 주가가 반등했다고 설명했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.8.30)",
            "date": "2019-08-30",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10053605",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미·중 무역분쟁 및 이에 따른 글로벌 경기 둔화 우려 등으로 주요국 국채금리와 주가가 큰 폭 하락하는 등 가격변수의 변동성이 확대되었다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2018.10.18)",
            "date": "2018-10-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10047750",
            "checkedAt": "2026-10-23",
            "evidence": "금융시장에서는 미·중 무역분쟁 심화, 글로벌 주가 급락 등으로 주가가 큰 폭 하락하고 원/달러 환율은 상당폭 상승하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.1.24)",
            "date": "2019-01-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10049718",
            "checkedAt": "2026-10-23",
            "evidence": "주가는 글로벌 경기둔화 우려로 하락한 후 미·중 무역분쟁 완화 기대 등으로 반등하였으며, 장기시장금리는 하락 후 소폭 등락하였다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-china-trade-conflict-c2-s1",
          "label": "무역분쟁·경기둔화 우려",
          "explanation": "미·중 무역분쟁 및 경기 둔화 우려로 주요국 국채금리·주가가 큰 폭 하락했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.8.30)",
            "date": "2019-08-30",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10053605",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미·중 무역분쟁 및 이에 따른 글로벌 경기 둔화 우려 등으로 주요국 국채금리와 주가가 큰 폭 하락하는 등 가격변수의 변동성이 확대되었다."
          },
          "seriesId": "GS10"
        },
        {
          "id": "us-china-trade-conflict-c2-s2",
          "label": "국내 주가·환율 변동",
          "explanation": "무역분쟁 심화 등으로 주가가 큰 폭 하락하고 원/달러 환율은 상당폭 상승했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2018.10.18)",
            "date": "2018-10-18",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10047750",
            "checkedAt": "2026-10-23",
            "evidence": "금융시장에서는 미·중 무역분쟁 심화, 글로벌 주가 급락 등으로 주가가 큰 폭 하락하고 원/달러 환율은 상당폭 상승하였다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "us-china-trade-conflict-c2-s3",
          "label": "완화 기대와 반등",
          "explanation": "무역분쟁 완화 기대 등으로 주가가 반등했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2019.1.24)",
            "date": "2019-01-24",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?menuNo=200690&nttId=10049718",
            "checkedAt": "2026-10-23",
            "evidence": "주가는 글로벌 경기둔화 우려로 하락한 후 미·중 무역분쟁 완화 기대 등으로 반등하였으며, 장기시장금리는 하락 후 소폭 등락하였다."
          },
          "seriesId": "SPASTT01KRM661N"
        }
      ],
      "chart": {
        "seriesIds": [
          "GS10",
          "EXKOUS",
          "SPASTT01KRM661N"
        ]
      }
    },
    {
      "id": "us-china-trade-conflict-c3",
      "name": "중국 성장·대미 수출 채널(2025년 관세 국면)",
      "narrative": {
        "sentences": [
          "한국은행은 무역경로를 미국 관세로 교역이 위축되는 경로라고 설명한다.",
          "중국은 대미 수출의존도는 낮지만 고율 관세로 성장 둔화폭이 큰 것으로 추정했다.",
          "또 한국의 대미 수출은 관세 영향 등으로 자동차·기계류·철강제품 중심으로 줄었다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 미 관세로 교역이 위축되는 경로이다"
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 대미 수출의존도는 낮지만 고율의 관세부과로 성장 둔화폭이 큰 것으로 추정되었다"
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "반면 대미 수출은 관세부과의 영향 등으로 자동차·기계류·철강제품을 중심으로 감소하였으며"
          }
        ]
      },
      "steps": [
        {
          "id": "us-china-trade-conflict-c3-s1",
          "label": "미국 관세 인상",
          "explanation": "무역경로는 미 관세로 교역이 위축되는 경로이다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 미 관세로 교역이 위축되는 경로이다"
          }
        },
        {
          "id": "us-china-trade-conflict-c3-s2",
          "label": "중국 성장 둔화",
          "explanation": "중국은 대미 수출의존도는 낮지만 고율의 관세부과로 성장 둔화폭이 큰 것으로 추정되었다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "중국은 대미 수출의존도는 낮지만 고율의 관세부과로 성장 둔화폭이 큰 것으로 추정되었다"
          },
          "seriesId": "XTEXVA01CNM667S"
        },
        {
          "id": "us-china-trade-conflict-c3-s3",
          "label": "대미 수출 감소",
          "explanation": "대미 수출은 관세부과의 영향 등으로 자동차·기계류·철강제품 중심으로 감소했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "반면 대미 수출은 관세부과의 영향 등으로 자동차·기계류·철강제품을 중심으로 감소하였으며"
          },
          "seriesId": "XTEXVA01KRM667S"
        }
      ],
      "chart": {
        "seriesIds": [
          "XTEXVA01CNM667S",
          "XTEXVA01KRM667S"
        ]
      }
    }
  ]
};
