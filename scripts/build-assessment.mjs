// "뚜렷한 연관 없음" 판정을 개발 단계에 계산해 src/data/transmission/assessments.ts에 저장한다 (PLAN 10번, DESIGN §3 ②-2).
// 실행: node --no-warnings --import ./scripts/register-ts.mjs scripts/build-assessment.mjs
// 경로마다 그래프 지표 중 마지막 지표(정책에서 가장 멀리 있는 결과 쪽)를 골라, 정책 최초 시행일 기준으로 계산한다.
// 통계나 경로를 바꾸면 이 스크립트를 다시 실행한다. 저장된 값이 계산식과 맞는지는 scripts/check-assessment.mjs가 확인한다.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { computeAssessment } from "../src/lib/corpus/assessment.ts";
import { POLICIES_FOR_ASSESSMENT, SERIES_FOR_ASSESSMENT, TRANSMISSION_FOR_ASSESSMENT } from "./assessment-input.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "transmission", "assessments.ts");
const today = new Date();
const TODAY = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const entries = [];
for (const plan of TRANSMISSION_FOR_ASSESSMENT) {
  const policy = POLICIES_FOR_ASSESSMENT.find((p) => p.id === plan.foreignPolicyId);
  for (const channel of plan.channels) {
    if (!channel.chart) {
      console.log(`  - ${channel.id}: 그래프 없음 (연결 통계 없음)`);
      continue;
    }
    const seriesId = channel.chart.seriesIds[channel.chart.seriesIds.length - 1];
    const series = SERIES_FOR_ASSESSMENT.find((s) => s.id === seriesId);
    const a = computeAssessment(series, policy.firstEffectiveDate, TODAY);
    if (!a) {
      console.log(`  ✗ ${channel.id}: ${seriesId}의 시행 전후 12개월 또는 이전 통계가 모자라 판정하지 못했습니다`);
      process.exitCode = 1;
      continue;
    }
    entries.push([channel.id, a]);
    console.log(`  ✓ ${channel.id} (${policy.firstEffectiveDate}, ${seriesId}): 변화 ${a.change} / 표준편차 ${a.stdev} (${a.stdevPeriod}) → ${a.unclear ? "뚜렷한 연관 없음" : "변화가 표준편차보다 큼"}`);
  }
}
const header = [
  `// 이 파일은 scripts/build-assessment.mjs가 ${TODAY}에 만들었다. 손으로 고치지 않는다.`,
  "// 경로별 \"뚜렷한 연관 없음\" 판정 값 (계산식은 src/lib/corpus/assessment.ts). 화면은 이 값을 읽기만 한다.",
  `import type { Assessment } from "../../lib/corpus/types";`,
  "",
].join("\n");
const body = `export const ASSESSMENTS: Record<string, Assessment> = ${JSON.stringify(Object.fromEntries(entries), null, 2)};\n`;
writeFileSync(OUT, header + body, "utf8");
console.log(`\n${entries.length}개 경로의 판정을 저장했습니다.`);
