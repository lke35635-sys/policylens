// 공식 통계를 개발 단계에 내려받아 src/data/series/ 파일로 고정한다 (PLAN 8번, DESIGN §3 ② 통계).
// 실행: node scripts/fetch-series.mjs [아이디 ...]   (인터넷 연결 필요, 키 필요 없음)
//   아이디를 주면 그 통계만 다시 받고, 안 주면 scripts/series-spec.mjs의 목록 전체를 받는다.
// 앱은 실행 중에 통계를 부르지 않는다. 통계를 새로 고치려면 이 스크립트를 다시 실행한다.
//
// 하는 일
// 1) FRED 시계열 페이지에서 통계 이름·원 출처·단위·갱신일을 읽어 목록(series-spec.mjs)에 적어 둔 것과 맞는지 확인한다. 다르면 그 통계에서 멈춘다.
// 2) FRED 자료(CSV)를 받아 값이 없는 달을 빼고, 단위를 줄이고(scale), 일·주 단위 자료는 월 평균을 낸다.
// 3) 출처(기관·종류·통계명·갱신일·주소·조회일)와 함께 파일로 쓴다. 파일은 이 스크립트가 만들므로 손으로 고치지 않는다.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ORGS, SERIES_SPEC, START } from "./series-spec.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "series");
const UA = { "user-agent": "Mozilla/5.0 PolicyLens-series-fetch" };
const MONTHS = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

const pad = (n) => String(n).padStart(2, "0");
const now = new Date();
const TODAY = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const THIS_MONTH = TODAY.slice(0, 7);

async function get(url) {
  let last;
  for (let i = 0; i < 3; i += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000), headers: UA });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw new Error(`${url} → ${last.message}`);
}

// FRED 시계열 페이지에서 이름·출처·단위·갱신일을 읽는다
function readMeta(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;?/g, " ")
    .replace(/\s+/g, " ");
  const between = (a, b) => {
    const i = text.indexOf(a);
    if (i < 0) return null;
    const j = text.indexOf(b, i + a.length);
    return j < 0 ? null : text.slice(i + a.length, j).trim();
  };
  const title = (html.match(/<title>\s*([\s\S]*?)\s*<\/title>/) || [])[1]?.replace(/\s*\|\s*FRED[\s\S]*$/, "").replace(/\s+/g, " ").trim() ?? null;
  const upd = text.match(/Updated: ([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4})/);
  return {
    title,
    source: between("Source:", "Release:") ?? between("Source:", "Units:"),
    units: between("Units:", "Frequency:"),
    updated: upd ? `${upd[3]}-${MONTHS[upd[1]]}-${pad(Number(upd[2]))}` : null,
  };
}

function periodOf(date, frequency) {
  const [y, m] = date.split("-");
  if (frequency === "monthly") return `${y}-${m}`;
  return `${y}-Q${Math.floor((Number(m) - 1) / 3) + 1}`;
}

// CSV(날짜,값) → [{ period, value }]  (값이 없는 줄은 뺀다. 일·주 단위는 월 평균, 진행 중인 달은 뺀다)
function toPoints(csv, spec) {
  const rows = csv.trim().split(/\r?\n/).slice(1).map((l) => l.split(","));
  const clean = rows.filter(([d, v]) => /^\d{4}-\d{2}-\d{2}$/.test(d) && v !== "." && v !== "" && Number.isFinite(Number(v)));
  let points;
  if (spec.rawFrequency) {
    const by = new Map();
    for (const [d, v] of clean) {
      const p = d.slice(0, 7);
      if (p >= THIS_MONTH) continue;
      const a = by.get(p) ?? [];
      a.push(Number(v));
      by.set(p, a);
    }
    points = [...by].map(([period, a]) => ({ period, value: a.reduce((s, x) => s + x, 0) / a.length }));
  } else {
    points = clean.map(([d, v]) => ({ period: periodOf(d, spec.frequency), value: Number(v) }));
  }
  const startKey = spec.frequency === "monthly" ? START : `${START.slice(0, 4)}-Q1`;
  return points
    .filter((p) => p.period >= startKey)
    .map((p) => ({ period: p.period, value: Number((p.value / spec.scale).toPrecision(10)) }));
}

const wanted = process.argv.slice(2);
const specs = wanted.length > 0 ? SERIES_SPEC.filter((s) => wanted.includes(s.id)) : SERIES_SPEC;
if (specs.length === 0) {
  console.error("목록에 없는 아이디입니다.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

let failed = 0;
for (const spec of specs) {
  try {
    const url = `https://fred.stlouisfed.org/series/${spec.id}`;
    const meta = readMeta(await get(url));
    if (!meta.title || !meta.source || !meta.units || !meta.updated) throw new Error(`페이지에서 이름·출처·단위·갱신일을 읽지 못했습니다 (${JSON.stringify(meta)})`);
    if (!meta.source.includes(spec.fredSource)) throw new Error(`출처가 달라졌습니다: ${meta.source}`);
    if (!meta.units.includes(spec.fredUnits)) throw new Error(`단위가 달라졌습니다: ${meta.units}`);
    const orgKey = Object.keys(ORGS).find((k) => meta.source === k);
    if (!orgKey) throw new Error(`목록에 없는 원 기관입니다: ${meta.source}`);
    const org = ORGS[orgKey];

    const points = toPoints(await get(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${spec.id}`), spec);
    if (points.length < 24) throw new Error(`받은 값이 너무 적습니다 (${points.length}개)`);

    const series = {
      id: spec.id,
      name: spec.name,
      unit: spec.unit,
      frequency: spec.frequency,
      source: {
        institution: `${org.name} (FRED 경유)`,
        institutionType: org.type,
        title: meta.title,
        date: meta.updated,
        url,
        checkedAt: TODAY,
        license: "FRED를 거쳐 받은 원 기관 자료이며 원 기관의 이용 조건을 따른다. 출처를 표시한다",
      },
      points,
    };
    const header = [
      `// 이 파일은 scripts/fetch-series.mjs가 ${TODAY}에 만들었다. 손으로 고치지 않는다 (통계를 새로 고치려면 스크립트를 다시 실행한다).`,
      `// 원 자료: ${meta.title}, 단위 ${meta.units}${spec.scale !== 1 ? ` → ${spec.unit} (원래 값을 ${spec.scale.toLocaleString("en-US")}로 나눔)` : ""}${spec.rawFrequency ? `, ${spec.rawFrequency === "daily" ? "일별" : "주별"} 자료의 월 평균` : ""}.`,
      `import type { Series } from "../../lib/corpus/types";`,
      "",
    ].join("\n");
    const body = `export const SERIES_${spec.id}: Series = ${JSON.stringify({ ...series, points: undefined }, null, 2).replace(/\n}$/, `,\n  "points": ${JSON.stringify(points)}\n}`)};\n`;
    writeFileSync(join(OUT, `${spec.id}.ts`), header + body, "utf8");
    console.log(`  ✓ ${spec.id} ${points[0].period} ~ ${points[points.length - 1].period} (${points.length}개) ${meta.updated} 갱신`);
  } catch (e) {
    failed += 1;
    console.log(`  ✗ ${spec.id}: ${e.message}`);
  }
}

// 전체 목록을 받았을 때만 index.ts를 다시 만든다 (일부만 받을 때는 기존 index를 그대로 둔다)
if (wanted.length === 0 && failed === 0) {
  const lines = [
    "// 이 파일은 scripts/fetch-series.mjs가 만들었다. 손으로 고치지 않는다.",
    "// 개발 단계에 내려받아 고정한 공식 통계 (PLAN 8번). 목록과 단위는 scripts/series-spec.mjs에 있다.",
    `import type { Series } from "../../lib/corpus/types";`,
    ...SERIES_SPEC.map((s) => `import { SERIES_${s.id} } from "./${s.id}";`),
    "",
    `export const SERIES: Series[] = [${SERIES_SPEC.map((s) => `SERIES_${s.id}`).join(", ")}];`,
    "",
  ];
  writeFileSync(join(OUT, "index.ts"), lines.join("\n"), "utf8");
  console.log(`index.ts를 만들었습니다 (통계 ${SERIES_SPEC.length}개).`);
}
console.log(`\n받기 ${specs.length - failed}개 성공, ${failed}개 실패`);
if (failed > 0) process.exitCode = 1;
