// Design Ref: §5 TransmissionPlan, PLAN 9번 — 미국 연준 양적완화·양적긴축가 한국 경제에 번지는 전달경로와 글 해설.
// 단계의 설명(explanation)은 근거 문장(source.evidence)이 말하는 내용만 옮긴 것이고, 글 해설은 그 단계 설명을 이어 쓴 것이다. 근거 문장은 2026-10-23에 출처 페이지를 직접 열어 확인했다.
// 근거 문장은 scripts/check-evidence.mjs가 출처 페이지와 다시 대조한다 (화면에는 보이지 않는다).
import type { TransmissionPlan } from "../../lib/corpus/types";

export const TX_FED_QE_QT: TransmissionPlan = {
  "foreignPolicyId": "fed-qe-qt",
  "summary": {
    "sentences": [
      "연준이 국채를 대량으로 사들이는 양적완화(돈을 풀어 금리를 낮추는 정책)는 한국 금융시장에도 영향을 준다.",
      "연준 이사회는 선진국 통화정책이 바뀌면 신흥국으로 가는 자금 흐름과 통화, 자산 가격이 영향받는다고 설명했다.",
      "한국은행은 연준의 테이퍼링(자산매입을 줄이는 것) 전망이 국내 환율과 금리, 주가에 영향을 줬다고 밝혔다.",
      "이 해설은 연준 연설과 한국은행 결정문을 이은 것이며 두 문서가 직접 이어지지는 않는다."
    ],
    "sources": [
      {
        "institution": "미국 연방준비제도 이사회",
        "institutionType": "해외 중앙은행",
        "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
        "date": "2013-11-04",
        "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
        "checkedAt": "2026-10-23",
        "evidence": "Conversely, a tightening of advanced economy monetary policy in response to a stronger economy should lead these movements to reverse; that is, tightening should reduce capital flows to EMEs and diminish upward pressure on EME currencies and asset prices."
      },
      {
        "institution": "한국은행",
        "institutionType": "한국은행",
        "title": "Monetary Policy Decision(October 12, 2021)",
        "date": "2021-10-12",
        "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066940&menuNo=400423",
        "checkedAt": "2026-10-23",
        "evidence": "In domestic financial markets, long-term market interest rates and the Korean won to US dollar exchange rate have risen significantly while stock prices have fallen considerably, mainly driven by global financial market movements."
      }
    ]
  },
  "channels": [
    {
      "id": "fed-qe-qt-c1",
      "name": "장기금리 채널",
      "narrative": {
        "sentences": [
          "연준은 대규모 자산매입이 장기금리를 낮추고 자산가격을 올린다고 설명한다.",
          "연준은 정책 전망이 바뀌자 미 국채금리가 크게 올랐던 때를 설명했다.",
          "한국은행은 국내 장기 시장금리도 미 국채금리 상승의 영향으로 반등했다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "The second tool is large scale asset purchases, which likewise increase policy accommodation by reducing longer-term interest rates and raising asset prices."
          },
          {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "from May through August, U.S. Treasury yields rose substantially as market participants reassessed the future course of U.S. monetary policy."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(January 14, 2022)",
            "date": "2022-01-14",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10068514&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In domestic financial markets, long-term market interest rates fell due to concerns over the resurgence of COVID-19 but have rebounded affected by the rise in US Treasury yields."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-qe-qt-c1-s1",
          "label": "자산매입→장기금리↓",
          "explanation": "대규모 자산매입은 장기금리를 낮추고 자산가격을 올려 완화 효과를 낸다.",
          "source": {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "The second tool is large scale asset purchases, which likewise increase policy accommodation by reducing longer-term interest rates and raising asset prices."
          },
          "seriesId": "WALCL"
        },
        {
          "id": "fed-qe-qt-c1-s2",
          "label": "미 국채금리 상승",
          "explanation": "연준 정책 전망이 바뀌자 5~8월 미 국채금리가 크게 올랐다.",
          "source": {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "from May through August, U.S. Treasury yields rose substantially as market participants reassessed the future course of U.S. monetary policy."
          },
          "seriesId": "GS10"
        },
        {
          "id": "fed-qe-qt-c1-s3",
          "label": "국내 장기금리 반등",
          "explanation": "국내 장기 시장금리가 미 국채금리 상승의 영향으로 반등했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(January 14, 2022)",
            "date": "2022-01-14",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10068514&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In domestic financial markets, long-term market interest rates fell due to concerns over the resurgence of COVID-19 but have rebounded affected by the rise in US Treasury yields."
          },
          "seriesId": "IRLTLT01KRM156N"
        }
      ],
      "chart": {
        "seriesIds": [
          "WALCL",
          "GS10",
          "IRLTLT01KRM156N"
        ]
      }
    },
    {
      "id": "fed-qe-qt-c2",
      "name": "환율·자본흐름 채널",
      "narrative": {
        "sentences": [
          "연준 이사회는 테이퍼링 예상이 미국 금리와 시장 변동성을 높였다고 설명한다.",
          "그 결과 신흥국 채권·주식 펀드에서 매우 큰 자금 유출이 있었다고 한다.",
          "연준은 신흥국 채권금리가 오르고 많은 신흥국 통화가 약세를 보였다고 설명한다.",
          "한국은행은 원/달러 환율이 연준 정책 정상화 전망으로 크게 올랐다가 내렸다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "When anticipations of Fed tapering led to higher U.S. interest rates and higher market volatility, these trades may have been quickly unwound, engendering particularly sharp declines in EME exchange rates and asset prices."
          },
          {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "In response, EME bond and equity funds experienced very large outflows, as shown by the bars."
          },
          {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "EME yields rose as well, in some cases by more than those on Treasury securities, and many EME currencies depreciated."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(January 14, 2022)",
            "date": "2022-01-14",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10068514&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "The Korean won to US dollar exchange rate rose considerably, due mainly to the prospect of accelerating monetary policy normalization by the US Federal Reserve, but then decreased."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-qe-qt-c2-s1",
          "label": "테이퍼링 예상",
          "explanation": "연준 테이퍼링 예상이 미국 금리와 시장 변동성을 높였다.",
          "source": {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "When anticipations of Fed tapering led to higher U.S. interest rates and higher market volatility, these trades may have been quickly unwound, engendering particularly sharp declines in EME exchange rates and asset prices."
          },
          "seriesId": "GS10"
        },
        {
          "id": "fed-qe-qt-c2-s2",
          "label": "신흥국 자금 유출",
          "explanation": "그 결과 신흥국 채권·주식 펀드에서 매우 큰 자금 유출이 있었다.",
          "source": {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "In response, EME bond and equity funds experienced very large outflows, as shown by the bars."
          }
        },
        {
          "id": "fed-qe-qt-c2-s3",
          "label": "신흥국 통화 약세",
          "explanation": "신흥국 채권금리가 오르고 많은 신흥국 통화가 약세를 보였다.",
          "source": {
            "institution": "미국 연방준비제도 이사회",
            "institutionType": "해외 중앙은행",
            "title": "Speech by Governor Powell on advanced economy monetary policy and emerging market economies",
            "date": "2013-11-04",
            "url": "https://www.federalreserve.gov/newsevents/speech/powell20131104a.htm",
            "checkedAt": "2026-10-23",
            "evidence": "EME yields rose as well, in some cases by more than those on Treasury securities, and many EME currencies depreciated."
          }
        },
        {
          "id": "fed-qe-qt-c2-s4",
          "label": "원/달러 환율 상승",
          "explanation": "연준 정상화 전망으로 원/달러 환율이 크게 올랐다가 내렸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(January 14, 2022)",
            "date": "2022-01-14",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10068514&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "The Korean won to US dollar exchange rate rose considerably, due mainly to the prospect of accelerating monetary policy normalization by the US Federal Reserve, but then decreased."
          },
          "seriesId": "EXKOUS"
        }
      ],
      "chart": {
        "seriesIds": [
          "GS10",
          "EXKOUS"
        ]
      }
    },
    {
      "id": "fed-qe-qt-c3",
      "name": "금융시장(주가) 채널",
      "narrative": {
        "sentences": [
          "한국은행은 연준의 테이퍼링 가능성에 미 달러가 강세이고 신흥국 주가가 내렸다고 밝혔다.",
          "주요국 국채금리가 급등하고 달러가 강세, 주가가 하락했다고도 설명했다.",
          "국내 주가도 글로벌 금융시장 움직임의 영향으로 크게 내렸다고 밝혔다."
        ],
        "sources": [
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(August 26, 2021)",
            "date": "2021-08-26",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066202&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "The US dollar has strengthened and stock prices in emerging economies have fallen, due mainly to the possibility that the US Federal Reserve would start tapering its asset purchases within the year."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(October 12, 2021)",
            "date": "2021-10-12",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066940&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In global financial markets, government bond yields in major countries have increased steeply and the US dollar has strengthened while stock prices have fallen, amid growing concerns over the prospect of prolonged global inflation and the rising possibility of the US Federal Reserve’s tapering within the year."
          },
          {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(October 12, 2021)",
            "date": "2021-10-12",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066940&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In domestic financial markets, long-term market interest rates and the Korean won to US dollar exchange rate have risen significantly while stock prices have fallen considerably, mainly driven by global financial market movements."
          }
        ]
      },
      "steps": [
        {
          "id": "fed-qe-qt-c3-s1",
          "label": "테이퍼링 가능성",
          "explanation": "연준 테이퍼링 가능성에 미 달러가 강세이고 신흥국 주가가 내렸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(August 26, 2021)",
            "date": "2021-08-26",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066202&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "The US dollar has strengthened and stock prices in emerging economies have fallen, due mainly to the possibility that the US Federal Reserve would start tapering its asset purchases within the year."
          },
          "seriesId": "DTWEXBGS"
        },
        {
          "id": "fed-qe-qt-c3-s2",
          "label": "글로벌 금융시장 변동",
          "explanation": "주요국 국채금리가 급등하고 달러가 강세, 주가가 하락했다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(October 12, 2021)",
            "date": "2021-10-12",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066940&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In global financial markets, government bond yields in major countries have increased steeply and the US dollar has strengthened while stock prices have fallen, amid growing concerns over the prospect of prolonged global inflation and the rising possibility of the US Federal Reserve’s tapering within the year."
          }
        },
        {
          "id": "fed-qe-qt-c3-s3",
          "label": "국내 주가 하락",
          "explanation": "국내 주가가 글로벌 금융시장 움직임의 영향으로 크게 내렸다.",
          "source": {
            "institution": "한국은행",
            "institutionType": "한국은행",
            "title": "Monetary Policy Decision(October 12, 2021)",
            "date": "2021-10-12",
            "url": "https://www.bok.or.kr/eng/bbs/E0000634/view.do?nttId=10066940&menuNo=400423",
            "checkedAt": "2026-10-23",
            "evidence": "In domestic financial markets, long-term market interest rates and the Korean won to US dollar exchange rate have risen significantly while stock prices have fallen considerably, mainly driven by global financial market movements."
          },
          "seriesId": "SPASTT01KRM661N"
        }
      ],
      "chart": {
        "seriesIds": [
          "DTWEXBGS",
          "SPASTT01KRM661N"
        ]
      }
    }
  ]
};
