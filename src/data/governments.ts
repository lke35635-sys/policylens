// Design Ref: §5 Government, PLAN 3번 — 정부(집권 시기) 표와 정부별 경제정책 기조 인용.
// 모든 출처는 2026-10-22에 실제 페이지를 열어 제목·날짜·이용 조건을 확인한 것이다. 인용 문장은 열어 본 페이지 글자와 한 글자도 다르지 않다.
//
// 읽는 법
// - quote(인용)가 있는 정부: 이용 조건(공공누리)이 확인돼 한 문장을 그대로 인용한다 (김대중, 이명박, 박근혜, 문재인, 윤석열, 이재명).
// - quote가 없는 정부: 노무현 정부. 「참여정부의 경제정책방향」(2003-06-11) 기록은 대통령기록관에 있지만 본문이 온라인에 공개돼 있지 않아 인용하지 않고 기록 링크만 둔다.
// - 박근혜 정부 인용의 이용 조건은 공공누리 제4유형(상업적 이용금지·변경금지)이다. 이 앱은 비영리 교육용이고 문장을 고치지 않고 그대로 인용하지만, 앱을 상업적으로 쓰게 되면 이 인용부터 다시 검토한다.
// - 문서 종류가 서로 다르다. 경제정책방향 문서 자체가 아닌 정부 발간·게시 자료도 있으며, 각 출처의 title에 그 종류를 적었다.
//   (예: 정책브리핑 정책뉴스는 정부가 경제정책방향·성장전략을 발표한 내용을 정리해 올린 글이다.)
// - 정부 기간은 대통령 임기 기준이며, 다음 정부 시작 전날까지로 이어 붙였다 (임기 중간에 대통령 직무가 정지된 기간의 권한대행 체제는 직전 정부에 포함한다).
//   박근혜 정부: 2017-03-10 파면 후 문재인 정부 취임(2017-05-10) 전까지 / 윤석열 정부: 2025-04-04 파면 후 이재명 정부 취임(2025-06-04) 전까지.
// 정부 이름은 일반적으로 쓰는 이름이며 평가나 우열을 뜻하지 않는다. 모든 정부를 같은 형식으로 다룬다.
import type { Government, Source } from "../lib/corpus/types";

const CHECKED = "2026-10-22"; // 출처 페이지를 직접 열어 확인한 날

// 정책브리핑 게시 자료의 이용 조건 문구 (텍스트에 한해 공공누리 제1유형)
const KOGL_1_TEXT = "공공누리 제1유형(출처표시), 텍스트에 한함";

const 김대중_경제대책: Source = {
  institution: "재정경제부 (대통령기록관 게시)",
  institutionType: "정부 부처",
  title: "한국경제의 구조조정 종합대책 - 지금까지의 추진상황과 앞으로의 추진계획 (제6차 경제대책)",
  date: "1998-05-20",
  url: "https://www.pa.go.kr/research/contents/policy/index.jsp?poMode=view&policySeq=214",
  checkedAt: CHECKED,
  license: "공공누리 제3유형(출처표시·변경금지)",
};

const 노무현_경제정책방향: Source = {
  institution: "대통령비서실 (대통령기록관 게시)",
  institutionType: "정부 부처",
  title: "참여정부의 경제정책방향 (제1회 국민경제자문회의 기록철, 기록건번호 1A00313181608998)",
  date: "2003-06-11",
  url: "https://www.pa.go.kr/View/1A00313181608998_I.do",
  checkedAt: CHECKED,
  license: "공공누리 제3유형(출처표시·변경금지)", // 기록 목록 페이지의 공공누리 표시. 문서 본문은 온라인에 공개돼 있지 않아 인용하지 않는다.
};

const 이명박_부처브리핑: Source = {
  institution: "정부 (정책브리핑 부처 브리핑)",
  institutionType: "정부 부처",
  title: "경제위기 극복을 위한 정부의 노력 - 글로벌 금융위기 1년 평가와 위기이후 과제 <2>",
  date: "2010-01-07",
  url: "https://www.korea.kr/briefing/policyBriefingView.do?newsId=148685818",
  checkedAt: CHECKED,
  license: KOGL_1_TEXT,
};

const 박근혜_정책포커스: Source = {
  institution: "기획재정부 (정책브리핑 정책포커스)",
  institutionType: "정부 부처",
  title: "튼튼하고 역동적으로…경제 주요 성과 - 박근혜정부 3년…변화와 혁신, 도약의 길",
  date: "2016-02-26",
  url: "https://www.korea.kr/news/policyFocusView.do?newsId=148809962&pkgId=49500646",
  checkedAt: CHECKED,
  license: "공공누리 제4유형(출처표시·상업적 이용금지·변경금지), 텍스트에 한함",
};

const 문재인_정부업무보고: Source = {
  institution: "고용노동부 (정책브리핑 부처 브리핑, 이성기 차관 모두발언)",
  institutionType: "정부 부처",
  title: "'소득주도 성장과 국민의 삶의 질 향상' 2018년 정부업무보고 (고용노동부 등 5개 부처 합동)",
  date: "2018-01-18",
  url: "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156249243",
  checkedAt: CHECKED,
  license: KOGL_1_TEXT,
};

const 윤석열_경제정책방향: Source = {
  institution: "기획재정부 (정책브리핑 게시)",
  institutionType: "정부 부처",
  title: "자유롭고 공정한 시장경제…저성장 극복과 성장-복지 선순환 (「새 정부 경제정책방향」 발표, 정책뉴스)",
  date: "2022-06-16",
  url: "https://www.korea.kr/news/policyNewsView.do?newsId=148902588",
  checkedAt: CHECKED,
  license: KOGL_1_TEXT,
};

const 이재명_경제성장전략: Source = {
  institution: "대통령실 (정책브리핑 게시)",
  institutionType: "정부 부처",
  title: "새 정부 경제 청사진 발표…AI·초혁신경제로 '잠재성장률 3%' 달성 (「새정부 경제성장전략」 발표, 정책뉴스)",
  date: "2025-08-22",
  url: "https://www.korea.kr/news/policyNewsView.do?newsId=148948040",
  checkedAt: CHECKED,
  license: KOGL_1_TEXT,
};

export const GOVERNMENTS: Government[] = [
  {
    id: "gov-kim-dj",
    name: "김대중 정부",
    president: "김대중",
    start: "1998-02-25",
    end: "2003-02-24",
    stance: { quote: "구조개혁을 통해 민주주의와 시장경제가 발전하고 경제위기를 극복", source: 김대중_경제대책 },
  },
  {
    id: "gov-roh",
    name: "노무현 정부",
    president: "노무현",
    start: "2003-02-25",
    end: "2008-02-24",
    stance: { source: 노무현_경제정책방향 },
  },
  {
    id: "gov-lee-mb",
    name: "이명박 정부",
    president: "이명박",
    start: "2008-02-25",
    end: "2013-02-24",
    stance: { quote: "감세와 정부지출 확대를 통해 성장모멘텀을 유지하는 데 재정정책의 초점을 두었다.", source: 이명박_부처브리핑 },
  },
  {
    id: "gov-park",
    name: "박근혜 정부",
    president: "박근혜",
    start: "2013-02-25",
    end: "2017-05-09",
    stance: { quote: "그동안 기획재정부는 경제혁신 3개년계획을 중심으로 우리 경제를 튼튼하고 역동적으로 개선하고자 노력해왔습니다.", source: 박근혜_정책포커스 },
  },
  {
    id: "gov-moon",
    name: "문재인 정부",
    president: "문재인",
    start: "2017-05-10",
    end: "2022-05-09",
    stance: { quote: "그만큼 문재인정부의 국정철학인 '사람중심 경제'를 실현하기 위해 '소득주도 성장'이 갖는 의미가 크다는 것을 말하는 것입니다.", source: 문재인_정부업무보고 },
  },
  {
    id: "gov-yoon",
    name: "윤석열 정부",
    president: "윤석열",
    start: "2022-05-10",
    end: "2025-06-03",
    stance: { quote: "자유롭고 공정한 시장경제…저성장 극복과 성장-복지 선순환", source: 윤석열_경제정책방향 },
  },
  {
    id: "gov-lee-jm",
    name: "이재명 정부",
    president: "이재명",
    start: "2025-06-04",
    end: null,
    stance: { quote: "인공지능(AI)과 초혁신산업 등 경제 대혁신을 통해 '진짜성장'을 이루겠다는 구상이다.", source: 이재명_경제성장전략 },
  },
];
