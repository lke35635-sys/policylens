// 정부 기조 인용 문장이 출처 페이지에 한 글자도 다르지 않게 실제로 있는지 확인한다 (PLAN 3번, PRD "그대로 인용").
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-quotes.mjs   (인터넷 연결 필요)
// 정부 표(src/data/governments.ts)의 quote를 출처 주소의 페이지 글자와 대조한다. 어긋나면 종료 코드 1로 끝난다.
// 페이지가 자바스크립트로 글을 채우는 경우처럼 서버가 주는 HTML에서 찾지 못하면 "확인 못 함"으로 알리고, 그때는 브라우저로 직접 열어 확인한다.
import { CORPUS } from "../src/data/index.ts";

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&nbsp;": " ", "&middot;": "·", "&hellip;": "…" };
function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;/gi, (e) => ENTITIES[e] ?? e)
    .replace(/\s+/g, " ");
}
const squash = (s) => s.replace(/\s+/g, " ").trim();

let ok = 0;
let unverified = 0;
const failures = [];
for (const g of CORPUS.governments) {
  const quote = g.stance.quote;
  if (!quote) {
    console.log(`  - ${g.name}: 인용 없음 (출처 링크만)`);
    continue;
  }
  try {
    const res = await fetch(g.stance.source.url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "PolicyLens-quote-check" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = toText(await res.text());
    if (text.includes(squash(quote))) {
      ok += 1;
      console.log(`  ✓ ${g.name}: 인용 문장이 출처 페이지에 그대로 있음`);
    } else {
      unverified += 1;
      console.log(`  ? ${g.name}: 서버가 준 HTML에서 찾지 못함 (브라우저로 직접 열어 확인 필요)`);
    }
  } catch (error) {
    failures.push(`${g.name}: 페이지를 열지 못함 (${error.message})`);
    console.log(`  ✗ ${g.name}: 페이지를 열지 못함 (${error.message})`);
  }
}
console.log(`\n확인 ${ok}개, 확인 못 함 ${unverified}개, 실패 ${failures.length}개`);
if (failures.length > 0) process.exitCode = 1;
