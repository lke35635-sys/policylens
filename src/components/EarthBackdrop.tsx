// 머리말 뒷배경: 우주에서 본 지구의 둥근 가장자리, 대기 빛, 별 (외부 파일 없이 SVG로 직접 그린 장식이다).
// 글자 뒤에 깔리므로 화면 읽기 프로그램에서는 숨기고(aria-hidden), 마우스·키보드 동작을 막지 않는다.

// 별 위치는 고정값이다 (화면을 다시 그려도 같은 모양이 되도록 난수를 쓰지 않는다)
const STARS: [number, number, number][] = [
  [60, 40, 1.2], [140, 90, 0.8], [220, 30, 1], [310, 120, 0.7], [380, 55, 1.3], [470, 25, 0.8], [540, 100, 1],
  [640, 45, 0.7], [720, 130, 1.1], [800, 35, 0.9], [880, 85, 1.2], [960, 20, 0.8], [1040, 110, 1], [1120, 60, 1.3],
  [180, 170, 0.7], [420, 160, 0.9], [610, 175, 0.7], [860, 165, 1], [1090, 175, 0.8], [30, 130, 0.9], [1170, 140, 0.7],
];

export function EarthBackdrop() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        {/* 바다: 가운데는 깊은 파랑, 가장자리는 밝은 하늘색 */}
        <radialGradient id="earth-ocean" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#0a4267" />
          <stop offset="55%" stopColor="#176191" />
          <stop offset="85%" stopColor="#3f8fb5" />
          <stop offset="100%" stopColor="#8cc9de" />
        </radialGradient>
        {/* 대기: 지구 둘레에 번지는 푸른 빛 */}
        <radialGradient id="earth-atmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="#6badc4" stopOpacity="0" />
          <stop offset="94%" stopColor="#6badc4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#bfe6f2" stopOpacity="0" />
        </radialGradient>
        <clipPath id="earth-clip">
          <circle cx="600" cy="780" r="560" />
        </clipPath>
        <filter id="earth-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* 별 */}
      <g fill="#ffffff">
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={0.55 + (r % 1) * 0.4} />
        ))}
      </g>

      {/* 대기 빛 */}
      <circle cx="600" cy="780" r="640" fill="url(#earth-atmosphere)" />

      {/* 지구 본체 */}
      <circle cx="600" cy="780" r="560" fill="url(#earth-ocean)" />

      {/* 대륙과 구름 (지구 안쪽에만 보이게 자른다) */}
      <g clipPath="url(#earth-clip)">
        <g fill="#2f8f6b" opacity="0.55">
          <path d="M150 330 C 200 360, 300 350, 360 380 C 420 410, 400 450, 330 470 C 250 490, 170 470, 150 420 Z" />
          <path d="M520 330 C 580 300, 680 310, 720 350 C 750 385, 700 410, 640 405 C 590 400, 540 380, 520 330 Z" />
          <path d="M820 380 C 880 350, 990 360, 1040 400 C 1080 435, 1020 470, 940 465 C 870 460, 800 430, 820 380 Z" />
        </g>
        <g fill="#ffffff" opacity="0.22" filter="url(#earth-soft)">
          <ellipse cx="260" cy="350" rx="130" ry="14" />
          <ellipse cx="600" cy="305" rx="160" ry="12" />
          <ellipse cx="930" cy="340" rx="140" ry="13" />
          <ellipse cx="450" cy="390" rx="110" ry="10" />
          <ellipse cx="780" cy="400" rx="120" ry="11" />
        </g>
        {/* 가장자리 안쪽 밝은 테두리: 둥근 느낌을 더한다 */}
        <circle cx="600" cy="780" r="560" fill="none" stroke="#bfe6f2" strokeOpacity="0.5" strokeWidth="3" />
      </g>
    </svg>
  );
}
