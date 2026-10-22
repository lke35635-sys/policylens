// 계수 표와 과거 사례 표가 설계(DESIGN §4.5, §6)대로 채워졌는지 확인하는 검사 스크립트.
// 실행: node scripts/check-stress-data.mjs  (Node 24는 .ts 파일을 그대로 불러올 수 있다)
// 문제가 하나라도 있으면 종료 코드 1로 끝난다.
import { COEFFICIENTS } from "../src/lib/stress/coefficients.ts";
import { HISTORICAL_CASES, typicalShock } from "../src/lib/stress/history.ts";
import {
  ISSUE_TYPES,
  ISSUE_TYPE_LABEL,
  VARIABLE_KEYS,
  VARIABLE_META,
} from "../src/lib/stress/types.ts";

const errors = [];
const fail = (message) => errors.push(message);

function checkSource(where, source) {
  for (const key of ["institution", "title", "date", "url", "via"]) {
    if (typeof source?.[key] !== "string" || source[key].trim() === "") {
      fail(`${where}: 출처의 ${key} 값이 비어 있음`);
    }
  }
  if (typeof source?.url === "string" && !source.url.startsWith("https://")) {
    fail(`${where}: 출처 주소가 https://로 시작하지 않음`);
  }
}

// ── 계수 표 ──────────────────────────────────────────────────────
let sourced = 0;
let pending = 0;
const grid = [];

for (const type of ISSUE_TYPES) {
  const row = [ISSUE_TYPE_LABEL[type].padEnd(10, "　")];
  for (const variable of VARIABLE_KEYS) {
    const cell = COEFFICIENTS[type]?.[variable];
    const where = `계수 표 ${type}.${variable}`;

    if (!cell) {
      fail(`${where}: 칸이 없음`);
      row.push("?");
      continue;
    }

    if (cell.status === "pending") {
      pending += 1;
      if (!cell.note?.trim()) fail(`${where}: pending인데 note가 비어 있음`);
      row.push("-");
      continue;
    }

    sourced += 1;
    row.push("O");
    if (!(cell.min <= cell.max)) fail(`${where}: min이 max보다 큼`);
    if (cell.singleEstimate && cell.min !== cell.max) fail(`${where}: singleEstimate인데 min과 max가 다름`);
    if (!(cell.per?.value > 0)) fail(`${where}: 기준 충격 값이 0보다 커야 함`);
    if (cell.period !== VARIABLE_META[variable].period) fail(`${where}: 기간이 변수 정의와 다름`);
    if (!cell.assumption?.trim()) fail(`${where}: 계산 가정이 비어 있음`);
    if (!cell.sources?.length) fail(`${where}: 출처가 하나도 없음`);
    cell.sources?.forEach((source, i) => checkSource(`${where} 출처 ${i + 1}`, source));
  }
  grid.push(row);
}

// ── 과거 사례 표 ─────────────────────────────────────────────────
const seen = new Set();
for (const c of HISTORICAL_CASES) {
  const where = `과거 사례 ${c.id}`;
  if (seen.has(c.id)) fail(`${where}: id가 중복됨`);
  seen.add(c.id);
  if (!ISSUE_TYPES.includes(c.type)) fail(`${where}: 알 수 없는 유형 ${c.type}`);
  if (!(c.shock?.value > 0)) fail(`${where}: 충격 크기가 0보다 커야 함`);
  if (!c.sources?.length) fail(`${where}: 출처가 하나도 없음`);
  c.sources?.forEach((source, i) => checkSource(`${where} 출처 ${i + 1}`, source));
  for (const key of Object.keys(c.observed ?? {})) {
    if (!VARIABLE_KEYS.includes(key)) fail(`${where}: observed에 알 수 없는 변수 ${key}`);
  }
}

// ── 결과 출력 ────────────────────────────────────────────────────
console.log("계수 표 (O = 출처 확인됨, - = 출처 조사 필요)");
console.log(`${"유형".padEnd(10, "　")}  ${VARIABLE_KEYS.map((k) => VARIABLE_META[k].label).join(" | ")}`);
for (const row of grid) console.log(row.join("   "));
console.log(`\n계수 표: 전체 ${sourced + pending}칸 중 출처 확인 ${sourced}칸, 조사 필요 ${pending}칸`);

console.log(`\n과거 사례: ${HISTORICAL_CASES.length}건`);
for (const type of ISSUE_TYPES) {
  const typical = typicalShock(type);
  const text = typical ? `${typical.shock.value} (${typical.shock.unit})` : "사례 없음";
  console.log(`  ${ISSUE_TYPE_LABEL[type]}: 대표 충격 ${text}`);
}

if (errors.length > 0) {
  console.error(`\n문제 ${errors.length}개`);
  for (const message of errors) console.error(`  - ${message}`);
  process.exitCode = 1;
} else {
  console.log("\n구조 검사 통과: 30칸이 모두 있고, 확인된 칸은 모두 출처·가정·기간을 갖췄습니다.");
}
