// Design Ref: §5 TransmissionPlan, PLAN 9번 — 미국 연준 기준금리가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_FED_FUNDS_RATE: TransmissionPlan = {
  "foreignPolicyId": "fed-funds-rate",
  "summary": {
    "sentences": [
      "미국 연준(미국의 중앙은행)이 금리 기대를 바꾸면 한국의 환율과 금리, 주식시장도 영향을 받는다.",
      "한국은행은 연준의 금리 기대가 달러 강세와 원/달러 환율 상승에 영향을 줬다고 밝혔다.",
      "이 해설은 한국은행 결정문의 문장들을 순서대로 이은 것이다.",
      "한국은행이 원인과 결과를 한 문장으로 확정해 말한 것은 아니다."
    ],
    "sources": [
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2026.7.16)",
        "date": "2026-07-16",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
        "checkedAt": "2026-10-23",
        "evidence": "국제금융시장에서는 미 연준 금리인상 기대 및 중동상황의 변화 등에 영향받아 미 달러화가 강세를 보이고 국채금리는 상승하였다."
      },
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "통화정책방향(2025.1.16)",
        "date": "2025-01-16",
        "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
        "checkedAt": "2026-10-23",
        "evidence": "금융‧외환시장에서는 원/달러 환율이 국내 정치 불확실성 증대, 미 연준의 금리인하 속도 조절 가능성 등의 영향으로 큰 폭 상승하였다."
      }
    ]
  },
  "channels": [
    {
      "id": "fed-funds-rate-c1",
      "name": "환율 채널",
      "narrative": {
        "sentences": [
          "연준은 연방기금금리(미국 은행끼리 하루짜리 돈을 빌릴 때 금리)의 목표를 바꾼다.",
          "연준은 이 목표가 바뀌면 금융 여건 전반이 여러 경로로 영향받는다고 설명한다.",
          "한국은행은 연준 금리인상 기대 등에 영향받아 미 달러화가 강세를 보였다고 밝혔다.",
          "또 원/달러 환율(1달러를 사는 데 드는 원화)이 연준의 금리인하 속도 조절 가능성 등으로 크게 올랐다고 한다.",
          "한국은행은 높아진 환율이 물가를 올리는 요인으로 작용할 것으로 보인다고 설명했다."
        ],
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Monetary Policy: What Are Its Goals? How Does It Work?",
            "date": "2021-07-29",
            "url": "https://www.federalreserve.gov/monetarypolicy/monetary-policy-what-are-its-goals-how-does-it-work.htm",
            "checkedAt": "2026-10-23",
            "evidence": "Changes in the FOMC's target for the federal funds rate affect overall financial conditions through several channels."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준 금리인상 기대 및 중동상황의 변화 등에 영향받아 미 달러화가 강세를 보이고 국채금리는 상승하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "금융‧외환시장에서는 원/달러 환율이 국내 정치 불확실성 증대, 미 연준의 금리인하 속도 조절 가능성 등의 영향으로 큰 폭 상승하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 물가상승률은 낮은 수요압력 등으로 안정적인 흐름을 이어갈 것으로 예상되지만 높아진 환율이 상방요인으로 작용할 것으로 보이며, 국제유가 움직임, 국내외 경기 흐름 등과 관련한 불확실성이 커진 상황이다."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-funds-rate-c1-s1",
          "label": "연준 목표금리 변경",
          "explanation": "연준이 연방기금금리 목표를 바꾸면 금융 여건 전반이 여러 경로로 영향받는다.",
          "source": {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Monetary Policy: What Are Its Goals? How Does It Work?",
            "date": "2021-07-29",
            "url": "https://www.federalreserve.gov/monetarypolicy/monetary-policy-what-are-its-goals-how-does-it-work.htm",
            "checkedAt": "2026-10-23",
            "evidence": "Changes in the FOMC's target for the federal funds rate affect overall financial conditions through several channels."
          },
          "seriesId": "FEDFUNDS"
        },
        {
          "id": "fed-funds-rate-c1-s2",
          "label": "달러 강세",
          "explanation": "미 연준 금리인상 기대 등에 영향받아 미 달러화가 강세를 보였다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준 금리인상 기대 및 중동상황의 변화 등에 영향받아 미 달러화가 강세를 보이고 국채금리는 상승하였다."
          }
        },
        {
          "id": "fed-funds-rate-c1-s3",
          "label": "원/달러 환율 상승",
          "explanation": "원/달러 환율이 미 연준의 금리인하 속도 조절 가능성 등의 영향으로 큰 폭 상승했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "금융‧외환시장에서는 원/달러 환율이 국내 정치 불확실성 증대, 미 연준의 금리인하 속도 조절 가능성 등의 영향으로 큰 폭 상승하였다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "fed-funds-rate-c1-s4",
          "label": "물가 상방요인",
          "explanation": "높아진 환율은 물가의 상방요인으로 작용할 것으로 보인다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "앞으로 물가상승률은 낮은 수요압력 등으로 안정적인 흐름을 이어갈 것으로 예상되지만 높아진 환율이 상방요인으로 작용할 것으로 보이며, 국제유가 움직임, 국내외 경기 흐름 등과 관련한 불확실성이 커진 상황이다."
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "FEDFUNDS",
          "EXKOUS"
        ]
      }
    },
    {
      "id": "fed-funds-rate-c2",
      "name": "금리 채널",
      "narrative": {
        "sentences": [
          "연준은 장기 대출금리가 현재 정책금리뿐 아니라 앞으로의 통화정책 기대와도 관련된다고 설명한다.",
          "한국은행은 연준 금리인하 속도 등의 영향으로 달러 강세와 장기 국채금리 상승이 나타났다고 밝혔다.",
          "또 국고채금리(한국 정부 채권의 금리)도 국내외 통화정책 기대 변화 등으로 올랐다고 한다."
        ],
        "sources": [
          {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Monetary Policy: What Are Its Goals? How Does It Work?",
            "date": "2021-07-29",
            "url": "https://www.federalreserve.gov/monetarypolicy/monetary-policy-what-are-its-goals-how-does-it-work.htm",
            "checkedAt": "2026-10-23",
            "evidence": "The rates charged on longer-term loans are related to expectations of how monetary policy and the broader economy will evolve over the duration of the loans, not just to the current level of the federal funds rate."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "이에 영향받아 국제금융시장에서는 미 달러화가 강세 흐름을 지속하고 장기 국채금리가 상승하는 등 주요 가격변수의 변동성이 확대되었다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국고채금리는 국내외 통화정책 기대 변화 등에 영향받아 상승하였고, 주가는 AI 투자 관련 우려 부각, 외국인의 대규모 주식 순매도 등으로 높은 변동성을 보이면서 상당폭 조정되었다."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-funds-rate-c2-s1",
          "label": "연준 목표금리 변경",
          "explanation": "장기 대출금리는 현재 정책금리뿐 아니라 앞으로의 통화정책 기대와도 관련된다.",
          "source": {
            "institution": "미국 연방준비제도(Fed)",
            "institutionType": "해외 중앙은행",
            "title": "Monetary Policy: What Are Its Goals? How Does It Work?",
            "date": "2021-07-29",
            "url": "https://www.federalreserve.gov/monetarypolicy/monetary-policy-what-are-its-goals-how-does-it-work.htm",
            "checkedAt": "2026-10-23",
            "evidence": "The rates charged on longer-term loans are related to expectations of how monetary policy and the broader economy will evolve over the duration of the loans, not just to the current level of the federal funds rate."
          },
          "seriesId": "FEDFUNDS"
        },
        {
          "id": "fed-funds-rate-c2-s2",
          "label": "미 장기금리·달러 변동",
          "explanation": "연준 금리인하 속도 등 불확실성에 영향받아 달러 강세와 장기 국채금리 상승이 나타났다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2025.1.16)",
            "date": "2025-01-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=10089267&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "이에 영향받아 국제금융시장에서는 미 달러화가 강세 흐름을 지속하고 장기 국채금리가 상승하는 등 주요 가격변수의 변동성이 확대되었다."
          },
          "seriesId": "GS10"
        },
        {
          "id": "fed-funds-rate-c2-s3",
          "label": "국내 국고채금리",
          "explanation": "국고채금리는 국내외 통화정책 기대 변화 등에 영향받아 상승했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국고채금리는 국내외 통화정책 기대 변화 등에 영향받아 상승하였고, 주가는 AI 투자 관련 우려 부각, 외국인의 대규모 주식 순매도 등으로 높은 변동성을 보이면서 상당폭 조정되었다."
          }
        }
      ],
      "chart": {
        "seriesIds": [
          "FEDFUNDS",
          "GS10"
        ]
      }
    },
    {
      "id": "fed-funds-rate-c3",
      "name": "자본흐름·금융시장 채널",
      "narrative": {
        "sentences": [
          "한국은행은 연준 금리인상 기대로 미 달러화가 강세를 보이고 국채금리가 올랐다고 밝혔다.",
          "같은 문서는 원/달러 환율이 외국인 주식자금 유출과 달러 강세 등으로 높아졌다고 한다.",
          "또 주가는 외국인의 대규모 순매도(산 것보다 판 것이 많은 것) 등으로 조정을 받았다고 한다.",
          "한국은행은 높은 환율 변동성에 계속 유의해야 한다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준 금리인상 기대 및 중동상황의 변화 등에 영향받아 미 달러화가 강세를 보이고 국채금리는 상승하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율은 외국인 주식자금 유출, 미 달러화 강세 등으로 1,500원대 중반까지 높아졌다가 외환수급이 개선되면서 1,400원대 후반 수준으로 하락하였다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국고채금리는 국내외 통화정책 기대 변화 등에 영향받아 상승하였고, 주가는 AI 투자 관련 우려 부각, 외국인의 대규모 주식 순매도 등으로 높은 변동성을 보이면서 상당폭 조정되었다."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "금융안정 측면에서는 높은 환율 변동성과 수도권 주택가격 상승세 및 가계부채 증가세 확대에 계속 유의해야 하는 상황이다."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-funds-rate-c3-s1",
          "label": "연준 금리 기대 변화",
          "explanation": "미 연준 금리인상 기대에 영향받아 미 달러화가 강세를 보이고 국채금리가 상승했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국제금융시장에서는 미 연준 금리인상 기대 및 중동상황의 변화 등에 영향받아 미 달러화가 강세를 보이고 국채금리는 상승하였다."
          },
          "seriesId": "GS10"
        },
        {
          "id": "fed-funds-rate-c3-s2",
          "label": "외국인 자금 유출",
          "explanation": "원/달러 환율이 외국인 주식자금 유출, 미 달러화 강세 등으로 높아졌다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "원/달러 환율은 외국인 주식자금 유출, 미 달러화 강세 등으로 1,500원대 중반까지 높아졌다가 외환수급이 개선되면서 1,400원대 후반 수준으로 하락하였다."
          },
          "seriesId": "EXKOUS"
        },
        {
          "id": "fed-funds-rate-c3-s3",
          "label": "외국인 순매도·주가",
          "explanation": "주가는 외국인의 대규모 주식 순매도 등으로 높은 변동성을 보이며 조정되었다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "국고채금리는 국내외 통화정책 기대 변화 등에 영향받아 상승하였고, 주가는 AI 투자 관련 우려 부각, 외국인의 대규모 주식 순매도 등으로 높은 변동성을 보이면서 상당폭 조정되었다."
          },
          "seriesId": "SPASTT01KRM661N"
        },
        {
          "id": "fed-funds-rate-c3-s4",
          "label": "금융안정 유의",
          "explanation": "높은 환율 변동성에 계속 유의해야 하는 상황이다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "통화정책방향(2026.7.16)",
            "date": "2026-07-16",
            "url": "https://www.bok.or.kr/portal/bbs/P0000559/view.do?nttId=11062942&menuNo=200690",
            "checkedAt": "2026-10-23",
            "evidence": "금융안정 측면에서는 높은 환율 변동성과 수도권 주택가격 상승세 및 가계부채 증가세 확대에 계속 유의해야 하는 상황이다."
          },
          "seriesId": "TRESEGKRM052N"
        }
      ],
      "chart": {
        "seriesIds": [
          "GS10",
          "EXKOUS",
          "SPASTT01KRM661N"
        ]
      }
    }
  ]
};
