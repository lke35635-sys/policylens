// 자료집의 모든 출처 주소(원문·보관본·공식 사이트·통계 출처)를 열어 보고 깨진 링크를 찾는다 (PLAN 2번, DESIGN §10).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-links.mjs [--offline-test]
//   기본: 실제 자료집(src/data)의 주소를 인터넷으로 열어 확인한다 (인터넷 연결 필요).
//   --offline-test: 인터넷 없이, 가짜 응답으로 "깨진 링크를 제대로 가려내는지"만 시험한다.
// 깨진 링크가 있는데 보관본(archiveUrl)이 없으면 실패(종료 코드 1)이고, 보관본이 있으면 경고만 한다.
import { CORPUS } from "../src/data/index.ts";
import { checkLinks, collectLinks } from "../src/lib/corpus/links.ts";
import { EXAMPLE_CORPUS } from "./fixtures/example-corpus.ts";

const offlineTest = process.argv.includes("--offline-test");

// 실제로 주소를 여는 함수: 15초 안에 응답이 없으면 실패로 본다. 일부 사이트는 HEAD를 막아서 GET으로 연다.
// 일본 경제산업성(meti.go.jp)은 프로그램 접속을 막아(HTTP 403) 서버로는 열 수 없고, 국토교통부(molit.go.kr)는 프로그램 접속에 끝없이 이동 응답만 준다. 이 사이트들의 주소는 사람이 브라우저로 직접 열어 확인하고,
// 여기서는 403과 이동 횟수 초과만 통과로 본다 (404 등은 그대로 실패).
const BROWSER_ONLY_HOSTS = ["www.meti.go.jp", "www.molit.go.kr"];
async function realFetch(url) {
  const browserOnly = BROWSER_ONLY_HOSTS.includes(new URL(url).hostname);
  const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "PolicyLens-link-check" } }).catch((e) => {
    if (browserOnly && e.cause?.message === "redirect count exceeded") return { ok: true, status: 307 };
    throw e;
  });
  if (res.status === 403 && browserOnly) return { ok: true, status: res.status };
  return { ok: res.ok, status: res.status };
}

if (offlineTest) {
  let passed = 0;
  const failures = [];
  const check = async (name, fn) => {
    try {
      await fn();
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
  console.log("링크 점검 도구 자체 시험 (가짜 응답)");
  await check("가짜 자료집에서 주소를 빠짐없이 모은다 (중복은 한 번만 열어 본다)", async () => {
    const refs = collectLinks(EXAMPLE_CORPUS);
    expect(refs.length > 20, `모은 주소 ${refs.length}개`);
    const report = await checkLinks(refs, async () => ({ ok: true, status: 200 }));
    expect(report.broken.length === 0 && report.total <= refs.length, `깨진 ${report.broken.length}개, 서로 다른 주소 ${report.total}개`);
  });
  await check("404와 연결 실패를 깨진 링크로 가려낸다", async () => {
    const refs = collectLinks(EXAMPLE_CORPUS);
    const target = refs[0].url;
    const other = refs.find((r) => r.url !== target).url;
    const report = await checkLinks(refs, async (url) => {
      if (url === target) return { ok: false, status: 404 };
      if (url === other) throw new Error("연결 실패");
      return { ok: true, status: 200 };
    });
    const urls = report.broken.map((b) => b.url);
    expect(urls.includes(target) && urls.includes(other) && report.broken.length === 2, `깨진 링크 ${urls.length}개`);
    expect(report.broken.find((b) => b.url === target).status === "HTTP 404", "상태 표시");
  });
  await check("깨졌어도 보관본이 있는 출처는 archived로 표시한다", async () => {
    const corpus = structuredClone(EXAMPLE_CORPUS);
    const src = corpus.policies[0].history[0].sources[0];
    src.archiveUrl = "https://web.archive.org/web/2026/https://example.com/x";
    const refs = collectLinks(corpus);
    const report = await checkLinks(refs, async (url) => (url === src.url ? { ok: false, status: 404 } : { ok: true, status: 200 }));
    const b = report.broken.find((x) => x.url === src.url);
    expect(b && b.archived === true, "보관본 있음 표시가 없음");
  });
  await check("보관본 주소 자체가 깨지면 보관본이 있어도 해결로 보지 않는다", async () => {
    const corpus = structuredClone(EXAMPLE_CORPUS);
    const src = corpus.policies[0].history[0].sources[0];
    src.archiveUrl = "https://web.archive.org/web/2026/https://example.com/x";
    const report = await checkLinks(collectLinks(corpus), async (url) => (url === src.archiveUrl ? { ok: false, status: 500 } : { ok: true, status: 200 }));
    const b = report.broken.find((x) => x.url === src.archiveUrl);
    expect(b && b.archived === false, "보관본 깨짐이 해결로 처리됨");
  });
  console.log(`\n통과 ${passed}개, 실패 ${failures.length}개`);
  if (failures.length > 0) process.exitCode = 1;
  else console.log("링크 점검 도구 자체 시험 통과");
} else {
  const refs = collectLinks(CORPUS);
  console.log(`실제 자료집의 출처 주소 ${refs.length}개를 확인합니다...`);
  const report = await checkLinks(refs, realFetch);
  console.log(`서로 다른 주소 ${report.total}개 중 깨진 링크 ${report.broken.length}개`);
  let fatal = 0;
  for (const b of report.broken) {
    const tag = b.archived ? "경고(보관본 있음)" : "실패";
    if (!b.archived) fatal += 1;
    console.log(`  [${tag}] ${b.url} → ${b.status}\n      ${b.where.join(" / ")}`);
  }
  if (fatal > 0) {
    console.error(`\n보관본 없는 깨진 링크 ${fatal}개: 보관본을 병기하거나 다른 공식 출처로 바꿔 주세요.`);
    process.exitCode = 1;
  } else {
    console.log("링크 점검 통과");
  }
}
