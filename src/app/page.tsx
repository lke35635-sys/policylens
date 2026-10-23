// Design Ref: §3.1 전체 배치 — 한 페이지(/), 위에서 아래로 ① 머리말 → ② 안내 띠 → ③ 보기 버튼 → ④ 검색창 → ⑤ 본문 → ⑥ 바닥.
// 서버 컴포넌트: 자료집을 읽어 클라이언트 컴포넌트(PolicyLensApp)에 전달한다. 요청마다 계산하지 않고, 검색어는 서버로 오지 않는다.
// ① 머리말은 화면 맨 위 가로 전체를 네이비색 그라데이션으로 채우고, 이름은 가운데 정렬하며 "Lens"의 s 오른쪽 대각선 위에 작은 돋보기를 얹는다.
import { CORPUS } from "@/data";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { NOTICE_TEXT } from "@/components/Notice";
import { PolicyLensApp } from "@/components/PolicyLensApp";
import { buildAllGraphs } from "@/lib/corpus/graph";

// s의 오른쪽 대각선 위에 얹는 작은 돋보기 (글자 크기에 맞춰 em 단위로 그린다)
function Magnifier() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-[78%] top-[-0.3em] h-[0.42em] w-[0.42em] text-sky-300" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
      <circle cx="10" cy="10" r="6.5" />
      <line x1="15" y1="15" x2="21.5" y2="21.5" />
    </svg>
  );
}

export default function Home() {
  // 경로별 그래프 자료(시행일 앞뒤 2년)는 서버에서 한 번 만들어 전달한다 (통계 전체를 브라우저에 보내지 않는다)
  const graphs = buildAllGraphs(CORPUS.policies, CORPUS.transmission, CORPUS.series);
  return (
    <div className="flex flex-1 flex-col bg-[#03193a]">
      {/* ① 머리말: 네이비 그라데이션 띠, 가운데 정렬 */}
      <header className="hero-gradient relative overflow-hidden px-4 pb-16 pt-14 text-center sm:pb-24 sm:pt-16">
        {/* 뒷배경: 지구 + 시차 구름·무지개 (장식) */}
        <HeroBackdrop />
        <div className="relative z-10 mx-auto flex min-h-[340px] flex-col items-center justify-center sm:min-h-[400px]">
        <h1 aria-label="PolicyLens" className="text-glow text-5xl font-bold tracking-tight text-white sm:text-6xl">
          <span aria-hidden="true">
            PolicyLen
            <span className="relative inline-block">
              s<Magnifier />
            </span>
          </span>
        </h1>
        <p className="liquid-glass mx-auto mt-5 w-fit max-w-full break-keep rounded-2xl px-6 py-3 text-base text-sky-100 sm:text-lg">
          경제정책의 변천과 해외 정책이 국내 경제에 번지는 경로를
          <br />
          공식 자료로 살펴보는 교육용 앱
        </p>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center">
        {/* 머리말과 같은 어두운 바탕 위에 흰 카드 하나로 내용을 담는다 */}
        <main className="flex w-full max-w-3xl flex-1 flex-col px-4 pb-6 pt-2">
          {/* ③ 보기 버튼 · ④ 검색창 · ⑤ 본문 · ⑥ 바닥 */}
          <div className="flex-1 rounded-2xl bg-white p-4 text-zinc-900 shadow-lg shadow-black/30 sm:p-6">
            <PolicyLensApp policies={CORPUS.policies} governments={CORPUS.governments} transmission={CORPUS.transmission} graphs={graphs} />
          </div>
        </main>

        {/* ② 안내 문구: 페이지 맨 아래, 어느 보기에서나 항상 보인다 (데스크톱에서는 한 줄) */}
        <div className="flex w-full justify-center px-4 pb-8">
          <p role="note" className="liquid-glass w-fit max-w-full break-keep rounded-2xl px-5 py-3 text-center text-xs leading-relaxed text-white/90 sm:whitespace-nowrap sm:text-[13px]">
            {NOTICE_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}
