// Design Ref: §5 TransmissionPlan, PLAN 9번 — 미국 관세 정책가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_US_TARIFFS: TransmissionPlan = {
  "foreignPolicyId": "us-tariffs",
  "summary": {
    "sentences": [
      "한국은행은 미국의 관세 부과가 무역, 금융, 불확실성의 세 경로로 한국 경제에 영향을 준다고 설명한다.",
      "관세협상이 큰 틀에서 타결된 뒤에도 성장률과 소비자물가 상승률을 낮추는 요인이라고 추정했다.",
      "아래에서는 세 경로에 물가 영향을 더해 네 갈래로 나누어 보여 준다."
    ],
    "sources": [
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화신용정책보고서(2025년 9월)",
        "date": "2025-09-11",
        "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
        "checkedAt": "2026-10-23",
        "evidence": "미국의 관세부과로 한국이 부담하는 경제적 영향은 크게 3가지 - ➀무역·➁금융·➂불확실성 - 경로를 통해 나타난다."
      },
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화신용정책보고서(2025년 9월)",
        "date": "2025-09-11",
        "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
        "checkedAt": "2026-10-23",
        "evidence": "미국과 주요국 간 관세협상이 큰 틀에서 타결되면서 미 관세정책의 전체적인 모습이 좀 더 명확해졌는데, 우리 경제에는 금년과 내년 성장률을 각각 0.45%p, 0.60%p, 소비자물가 상승률은 각각 0.15%p, 0.25%p 낮추는 요인으로 작용할 것으로 추정된다."
      }
    ]
  },
  "channels": [
    {
      "id": "us-tariffs-c1",
      "name": "수출(무역) 채널",
      "narrative": {
        "sentences": [
          "한국은행은 한국이 한·미 FTA 덕에 기존 관세율이 0%였고 철강·자동차 비중이 커 인상폭이 컸다고 한다.",
          "무역경로는 미 관세 때문에 교역이 위축되는 길이라고 설명한다.",
          "대미 수출 비중이 크고 관세율이 높은 금속·자동차·기계 업종의 타격이 컸다고 한다.",
          "무역경로는 올해와 내년 성장률을 각각 0.23%p, 0.34%p(퍼센트 수치의 차이) 낮추는 것으로 추정했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "EU, 일본과 달리 우리나라는 한·미 FTA에 따라 기존 관세율이 0%(EU와일본은 각각1.2%, 1.5%)였던 데다 품목관세(철강, 자동차) 노출도가 상대적으로 높아 관세 인상폭이 컸다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 미 관세로 교역이 위축되는 경로이다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "무역경로의 품목별 영향을 살펴보면, 대미 수출 비중이 크고 관세율이 높은 금속, 자동차, 기계 등의 업종에서 타격이 큰 것으로 나타났다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 올해와 내년 성장률을 각각 0.23%p, 0.34%p 낮추어 전체 영향의 1/2 정도를 차지하는 것으로 추정되었다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-tariffs-c1-s1",
          "label": "한국의 관세 인상폭",
          "explanation": "한국은 한·미 FTA로 기존 관세율이 0%였고 철강·자동차 노출도가 높아 인상폭이 컸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "EU, 일본과 달리 우리나라는 한·미 FTA에 따라 기존 관세율이 0%(EU와일본은 각각1.2%, 1.5%)였던 데다 품목관세(철강, 자동차) 노출도가 상대적으로 높아 관세 인상폭이 컸다."
          }
        },
        {
          "id": "us-tariffs-c1-s2",
          "label": "교역 위축",
          "explanation": "미 관세로 교역이 위축되는 경로를 무역경로라고 한다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 미 관세로 교역이 위축되는 경로이다."
          },
          "seriesId": "XTIMVA01KRM667S"
        },
        {
          "id": "us-tariffs-c1-s3",
          "label": "대미 수출 업종 타격",
          "explanation": "대미 수출 비중이 크고 관세율이 높은 금속·자동차·기계 업종의 타격이 컸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "무역경로의 품목별 영향을 살펴보면, 대미 수출 비중이 크고 관세율이 높은 금속, 자동차, 기계 등의 업종에서 타격이 큰 것으로 나타났다."
          },
          "seriesId": "XTEXVA01KRM667S"
        },
        {
          "id": "us-tariffs-c1-s4",
          "label": "성장률 하락",
          "explanation": "무역경로는 올해와 내년 성장률을 각각 0.23%p, 0.34%p 낮추는 것으로 추정된다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➀무역경로는 올해와 내년 성장률을 각각 0.23%p, 0.34%p 낮추어 전체 영향의 1/2 정도를 차지하는 것으로 추정되었다."
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "XTIMVA01KRM667S",
          "XTEXVA01KRM667S"
        ]
      }
    },
    {
      "id": "us-tariffs-c2",
      "name": "금융(미국 금리) 채널",
      "narrative": {
        "sentences": [
          "한국은행은 미 관세로 미국의 물가 상승압력이 생기면 미국 통화정책에 영향을 준다고 한다.",
          "그러면 연준의 통화정책이 더 긴축적(돈줄을 죄는 쪽)으로 운용되고 금융여건 완화가 늦어진다.",
          "이 금융경로는 내수 중심으로 올해와 내년 성장률을 각각 0.09%p, 0.10%p 낮춘다고 추정했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➁금융경로는 미 관세로 인한 미국의 물가 상승압력이 미국 통화정책에 영향을 주면서 금융여건 완화가 지연됨에 따라 실물경제가 영향받는 경로이다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "미 관세정책은 경제전망의 불확실성을 증대시키고 인플레이션 압력을 높임으로써 관세 인상 전에 비해 연준의 통화정책이 더 긴축 적으로 운용되도록 하며, 이는 글로벌 금융여건 완화 지연 등을 통해 성장에도 부정적 영향이 파급된다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➁금융경로를 통해서는 올해와 내년 성장률을 내수를 중심으로 각각 0.09%p, 0.10%p 낮추는 요인으로 작용하는 것으로 추정되었다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-tariffs-c2-s1",
          "label": "미국 물가 압력",
          "explanation": "미 관세가 미국의 물가 상승압력을 만들어 미국 통화정책에 영향을 준다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➁금융경로는 미 관세로 인한 미국의 물가 상승압력이 미국 통화정책에 영향을 주면서 금융여건 완화가 지연됨에 따라 실물경제가 영향받는 경로이다."
          },
          "seriesId": "FEDFUNDS"
        },
        {
          "id": "us-tariffs-c2-s2",
          "label": "연준 긴축 운용",
          "explanation": "인플레이션 압력이 높아져 연준 통화정책이 더 긴축적으로 운용되고 금융여건 완화가 지연된다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "미 관세정책은 경제전망의 불확실성을 증대시키고 인플레이션 압력을 높임으로써 관세 인상 전에 비해 연준의 통화정책이 더 긴축 적으로 운용되도록 하며, 이는 글로벌 금융여건 완화 지연 등을 통해 성장에도 부정적 영향이 파급된다."
          },
          "seriesId": "FEDFUNDS"
        },
        {
          "id": "us-tariffs-c2-s3",
          "label": "내수 성장 하락",
          "explanation": "금융경로는 내수를 중심으로 올해와 내년 성장률을 각각 0.09%p, 0.10%p 낮춘다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➁금융경로를 통해서는 올해와 내년 성장률을 내수를 중심으로 각각 0.09%p, 0.10%p 낮추는 요인으로 작용하는 것으로 추정되었다."
          },
          "seriesId": "KORLOLITOAASTSAM"
        }
      ],
      "chart": {
        "seriesIds": [
          "FEDFUNDS",
          "KORLOLITOAASTSAM"
        ]
      }
    },
    {
      "id": "us-tariffs-c3",
      "name": "불확실성(투자·소비) 채널",
      "narrative": {
        "sentences": [
          "한국은행은 관세를 둘러싼 불확실성이 높아지면 투자와 소비에 부정적 영향을 준다고 한다.",
          "무역 불확실성에 따른 경제활동 지연이 내년까지 성장을 누르는 요인이라고 설명한다.",
          "이 경로는 올해와 내년 성장률을 각각 0.13%p, 0.16%p 낮춘다고 추정했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➂불확실성경로는 관세를 둘러싼 불확실성이 크게 높아지면서 투자와 소비에 부정적 영향을 미치는 경로이다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "최근 미국과 주요국 간 관세협상 합의로 불확실성이 다소 완화되었으나 그간 크게 높아졌던 무역 불확실성에 따른 경제활동 지연이 올해뿐 아니라 내년까지 시차를 두고 성장의 하방압력으로 작용한다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➂불확실성경로는 올해와 내년 성장률을 각각 0.13%p, 0.16%p 낮추는 요인으로 작용한 것으로 나타났다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-tariffs-c3-s1",
          "label": "관세 불확실성 확대",
          "explanation": "관세를 둘러싼 불확실성이 높아지면 투자와 소비에 부정적 영향을 준다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➂불확실성경로는 관세를 둘러싼 불확실성이 크게 높아지면서 투자와 소비에 부정적 영향을 미치는 경로이다."
          },
          "seriesId": "SPASTT01KRM661N"
        },
        {
          "id": "us-tariffs-c3-s2",
          "label": "경제활동 지연",
          "explanation": "무역 불확실성에 따른 경제활동 지연이 내년까지 시차를 두고 성장을 누른다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "최근 미국과 주요국 간 관세협상 합의로 불확실성이 다소 완화되었으나 그간 크게 높아졌던 무역 불확실성에 따른 경제활동 지연이 올해뿐 아니라 내년까지 시차를 두고 성장의 하방압력으로 작용한다."
          }
        },
        {
          "id": "us-tariffs-c3-s3",
          "label": "성장률 하락",
          "explanation": "불확실성경로는 올해와 내년 성장률을 각각 0.13%p, 0.16%p 낮춘다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "➂불확실성경로는 올해와 내년 성장률을 각각 0.13%p, 0.16%p 낮추는 요인으로 작용한 것으로 나타났다."
          },
          "seriesId": "KORLOLITOAASTSAM"
        }
      ],
      "chart": {
        "seriesIds": [
          "SPASTT01KRM661N",
          "KORLOLITOAASTSAM"
        ]
      }
    },
    {
      "id": "us-tariffs-c4",
      "name": "물가 채널",
      "narrative": {
        "sentences": [
          "미국 소비자물가는 관세가 점차 전가(비용이 가격에 얹혀 넘어가는 것)되며 오르고 있다고 한다.",
          "한국은행은 공급망 교란과 환율 상승은 물가를 올리지만 경기 둔화 등의 하방압력이 더 크다고 분석했다.",
          "그 결과 미 관세정책이 국내 소비자물가 상승률을 각각 0.15%p, 0.25%p 낮출 것으로 추정했다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "우선 미국 소비자물가는 관세가 점차 전가되면서 상승세가 확대되고 있다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "이는 공급망 교란, 환율 상승 등이 상방압력으로 작용하지만 국내외 경기 둔화에 따른 수요측 하방압력과 국제유가 하락이 더 크게 영향을 미치기 때문으로 분석되었다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "물가 영향의 경우, 미국 관세정책이 금년과 내년 소비자물가 상승률을 각각 0.15%p, 0.25%p 낮추는 요인으로 작용할 것으로 추정되었다."
          }
        ]
      },
      "steps": [
        {
          "id": "us-tariffs-c4-s1",
          "label": "미국 관세 전가",
          "explanation": "미국 소비자물가는 관세가 점차 전가되면서 상승세가 확대되고 있다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "우선 미국 소비자물가는 관세가 점차 전가되면서 상승세가 확대되고 있다."
          }
        },
        {
          "id": "us-tariffs-c4-s2",
          "label": "상방·하방 압력",
          "explanation": "공급망 교란·환율 상승은 상방압력이나 경기 둔화와 유가 하락의 하방압력이 더 크다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "이는 공급망 교란, 환율 상승 등이 상방압력으로 작용하지만 국내외 경기 둔화에 따른 수요측 하방압력과 국제유가 하락이 더 크게 영향을 미치기 때문으로 분석되었다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "us-tariffs-c4-s3",
          "label": "국내 물가 영향",
          "explanation": "미 관세정책이 금년과 내년 소비자물가 상승률을 각각 0.15%p, 0.25%p 낮추는 요인이다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화신용정책보고서(2025년 9월)",
            "date": "2025-09-11",
            "url": "https://www.bok.or.kr/portal/bbs/B0000156/view.do?nttId=10093507&menuNo=200067",
            "checkedAt": "2026-10-23",
            "evidence": "물가 영향의 경우, 미국 관세정책이 금년과 내년 소비자물가 상승률을 각각 0.15%p, 0.25%p 낮추는 요인으로 작용할 것으로 추정되었다."
          }
        }
      ]
    }
  ]
};
