// 실제 OpenAI를 한 번 불러 이슈 찾기를 시험한다 (돈이 조금 든다). 직접 지어 쓴 짧은 가상 기사만 보낸다.
// 실행: node --env-file=.env --no-warnings --import ./scripts/register-ts.mjs scripts/try-openai.mjs
// 키 값은 출력하지 않는다.
import { extractIssues } from "../src/lib/ai/extract-issues.ts";

const article = `[가상 기사] 국제 유가가 중동 정세 불안으로 하루 만에 8% 올라 배럴당 100달러를 넘어섰다. 정유·항공업계는 비용 부담이 커질 것이라며 긴장하고 있다.
한편 원/달러 환율은 달러 강세 영향으로 1,450원대까지 올랐고, 수입 물가 상승 우려가 커졌다. 전문가들은 한국은행이 기준금리 결정에서 물가와 환율을 함께 고려해야 할 것이라고 전했다.
이와 별개로 한 프로야구 구단이 신인 선수 계약을 발표했고, 인기 아이돌 그룹이 새 앨범을 냈다. 이 소식은 경제와는 무관하다.
또 주요국이 첨단 반도체 장비의 수출 통제를 확대하기로 하면서 국내 반도체 업계의 공급망 불안이 커지고 있다.`;

console.log("OPENAI_API_KEY 설정 여부:", process.env.OPENAI_API_KEY ? "있음" : "없음");
const started = Date.now();
try {
  const { issues, overflow } = await extractIssues(article);
  console.log(`성공 (${((Date.now() - started) / 1000).toFixed(1)}초), 이슈 ${issues.length}개, 넘침 ${overflow}`);
  for (const i of issues) console.log(`- [${i.id}] ${i.title}\n    ${i.excerpt.slice(0, 80).replace(/\n/g, " ")}…`);
} catch (error) {
  console.log(`실패: ${error.code ?? error.name} (${((Date.now() - started) / 1000).toFixed(1)}초)`);
  process.exitCode = 1;
}
