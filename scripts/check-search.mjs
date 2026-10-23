// 검색이 시험 검색어에 대해 알맞은 정책을 첫 결과로 돌려주는지 확인한다 (PLAN 11번, DESIGN §10 검색).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-search.mjs   (인터넷 필요 없음)
// 시험어 30개(국내 보기용 18개 + 해외 보기용 12개)의 90% 이상이 기대한 정책을 첫 결과로 내야 하고, 보기별 검색 범위(국내 보기에 해외 정책이 나오지 않음)도 지켜야 한다.
import { CORPUS } from "../src/data/index.ts";
import { searchPolicies } from "../src/lib/corpus/search.ts";

// [검색어, 기대하는 첫 결과 아이디] — 사용자가 실제로 칠 만한 말(이름, 줄임말, 영어, 띄어쓰기 다른 말)로 골랐다
const DOMESTIC = [
  ["기준금리", "bok-base-rate"], ["한은 금리", "bok-base-rate"], ["금통위", "bok-base-rate"],
  ["유동성 공급", "bok-liquidity-support"], ["통화스와프", "bok-china-swap"], ["한중 스와프", "bok-china-swap"],
  ["대미 관세 협상", "kr-us-tariff-negotiation"], ["관세", "kr-us-tariff-negotiation"], ["수출 지원", "kr-export-diversification"],
  ["무역금융", "kr-export-diversification"], ["소부장", "kr-somubujang"], ["소재 부품 장비", "kr-somubujang"],
  ["재정준칙", "kr-fiscal-rule"], ["추경", "kr-supplementary-budget"], ["종부세", "kr-comprehensive-real-estate-tax"],
  ["LTV", "kr-ltv-dti"], ["스트레스 DSR", "kr-dsr"], ["조정대상지역", "kr-regulated-areas"],
];
const FOREIGN = [
  ["Fed", "fed-funds-rate"], ["연준 금리", "fed-funds-rate"], ["FOMC", "fed-funds-rate"],
  ["양적완화", "fed-qe-qt"], ["QT", "fed-qe-qt"], ["테이퍼링", "fed-qe-qt"],
  ["인민은행", "pboc-monetary"], ["PBoC", "pboc-monetary"], ["미국 관세", "us-tariffs"],
  ["상호관세", "us-tariffs"], ["미중 무역전쟁", "us-china-trade-conflict"], ["일본 수출규제", "japan-export-control"],
];

let passed = 0;
const failures = [];
const check = (name, fn) => {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.log(`  ✗ ${name}\n      ${error.message}`);
  }
};
const expect = (c, m) => {
  if (!c) throw new Error(m);
};

const misses = [];
let hits = 0;
for (const [scope, list] of [["domestic", DOMESTIC], ["foreign", FOREIGN]]) {
  for (const [q, want] of list) {
    const first = searchPolicies(CORPUS.policies, q, scope)[0]?.policy.id;
    if (first === want) hits += 1;
    else misses.push(`[${scope}] "${q}" → ${first ?? "결과 없음"} (기대 ${want})`);
  }
}
const total = DOMESTIC.length + FOREIGN.length;

console.log("1) 시험 검색어");
check(`시험어 ${total}개 중 90% 이상이 첫 결과로 기대한 정책을 낸다`, () => expect(hits / total >= 0.9, `${hits}/${total}개. 틀린 것:\n        - ${misses.join("\n        - ")}`));
console.log(`  첫 결과 정답 ${hits}/${total}개 (${Math.round((hits / total) * 100)}%)${misses.length ? `, 틀린 것: ${misses.join("; ")}` : ""}`);

console.log("\n2) 검색 범위와 예외");
check("국내 보기 검색에 해외 정책이 나오지 않는다", () => {
  for (const q of ["연준", "미국 관세", "금리", "관세", "수출"]) {
    const bad = searchPolicies(CORPUS.policies, q, "domestic").filter((h) => h.policy.scope !== "domestic");
    expect(bad.length === 0, `"${q}"에서 해외 정책 ${bad.map((h) => h.policy.id)}`);
  }
});
check("해외 보기 검색에 국내 정책이 나오지 않는다", () => {
  for (const q of ["기준금리", "한은", "관세", "수출"]) {
    const bad = searchPolicies(CORPUS.policies, q, "foreign").filter((h) => h.policy.scope !== "foreign");
    expect(bad.length === 0, `"${q}"에서 국내 정책 ${bad.map((h) => h.policy.id)}`);
  }
});
check("자료집에 없는 말은 결과가 없다", () => expect(searchPolicies(CORPUS.policies, "비트코인", "domestic").length === 0, "결과가 나옴"));
check("빈 검색어는 결과가 없다", () => expect(searchPolicies(CORPUS.policies, "   ", "domestic").length === 0, "결과가 나옴"));
check("키워드가 여러 정책에 해당하면 모두 목록으로 낸다", () => expect(searchPolicies(CORPUS.policies, "금리", "domestic").length >= 2, "2개 미만"));
check("대소문자·띄어쓰기가 달라도 같은 결과를 낸다", () => {
  const a = searchPolicies(CORPUS.policies, "fomc", "foreign")[0]?.policy.id;
  const b = searchPolicies(CORPUS.policies, "소재부품장비", "domestic")[0]?.policy.id;
  expect(a === "fed-funds-rate" && b === "kr-somubujang", `${a}, ${b}`);
});

console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
if (failures.length > 0) {
  console.log("\n실패한 검사");
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
} else console.log("검색 검사 통과");
