// 자료집의 근거 문장(evidence)이 출처 페이지에 지금도 그대로 있는지 다시 확인한다 (PLAN 4번, PRD "출처 100%·직접 열어 확인").
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-evidence.mjs   (인터넷 연결 필요)
// 정책 연혁 항목의 출처(source.evidence)를 출처 주소의 페이지 글자와 대조한다. 어긋나거나 페이지를 못 열면 종료 코드 1로 끝난다.
// 태그 사이에 끼는 공백과 줄바꿈 없는 공백(NBSP) 차이는 무시하고 글자만 비교한다. 페이지가 사이트 개편으로 바뀌면 여기서 걸린다.
import { CORPUS } from "../src/data/index.ts";

const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&nbsp;": " ", "&middot;": "·", "&hellip;": "…", "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”" };
const flat = (s) => s.replace(/[\u00a0\u2009\u202f]/g, " ").replace(/\s+/g, "");
function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;/gi, (e) => ENT[e] ?? e);
}

const cache = new Map();
function page(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000), headers: { "user-agent": "Mozilla/5.0 PolicyLens-evidence-check" } })
        .then(async (r) => (r.ok ? { text: flat(toText(await r.text())) } : { error: `HTTP ${r.status}` }))
        .catch((e) => ({ error: e.message })),
    );
  }
  return cache.get(url);
}

let ok = 0;
let nothing = 0;
const problems = [];
for (const p of CORPUS.policies) {
  for (const h of p.history) {
    for (const s of h.sources) {
      if (!s.evidence) {
        nothing += 1;
        continue;
      }
      const res = await page(s.url);
      const where = `${p.id} ${h.date} ${s.url}`;
      if (res.error) problems.push(`페이지를 열지 못함 (${res.error}): ${where}`);
      else if (res.text.includes(flat(s.evidence))) ok += 1;
      else problems.push(`근거 문장이 페이지에 없음: ${where}`);
    }
  }
}
console.log(`근거 문장 확인 ${ok}개, 근거 문장이 없는 출처 ${nothing}개, 문제 ${problems.length}개`);
for (const m of problems) console.log(`  - ${m}`);
if (problems.length > 0) process.exitCode = 1;
