"use client";
// 히어로(PolicyLens 머리말) 뒷배경 — Serene 디자인 프롬프트의 시차(parallax) 연출을 이 앱에 맞게 옮긴 것이다.
// 구성: 지구(EarthBackdrop) 위에 왼쪽·오른쪽 구름과 무지개 띠가 스크롤에 따라 부드럽게 움직인다.
// 원래 프롬프트는 외부 주소의 구름·무지개 이미지를 쓰지만, 이 앱은 실행 중에 외부 요청을 하지 않으므로 같은 모양을 SVG로 직접 그렸다.
// 움직임: 머리말이 화면을 지나간 정도 progress(0~1)를 구해 목표 위치를 정하고, 매 프레임 현재 값이 목표로 천천히 따라가게(lerp) 한다.
// 변형은 translate3d로 GPU에서 처리하고, 화면 읽기 프로그램에는 숨기며, '동작 줄이기' 설정을 켠 사람에게는 움직이지 않고 고정된 모습만 보여 준다.
import { useEffect, useRef } from "react";
import { EarthBackdrop } from "./EarthBackdrop";

const clamp = (min: number, max: number, v: number): number => Math.min(max, Math.max(min, v));
const lerp = (current: number, target: number, factor: number): number => current + (target - current) * factor;

// 구름: 겹친 타원을 흐리게 번지게 해 솜 모양을 만든다
function CloudShape() {
  return (
    <svg viewBox="0 0 520 170" aria-hidden="true" focusable="false" className="h-auto w-full">
      <defs>
        <filter id="cloud-blur" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g fill="#ffffff" filter="url(#cloud-blur)">
        <ellipse cx="150" cy="105" rx="130" ry="38" opacity="0.55" />
        <ellipse cx="270" cy="85" rx="120" ry="48" opacity="0.6" />
        <ellipse cx="380" cy="110" rx="110" ry="34" opacity="0.5" />
        <ellipse cx="220" cy="120" rx="170" ry="26" opacity="0.4" />
      </g>
    </svg>
  );
}

// 무지개 띠: 넓은 반원 호 여러 겹을 파스텔 색으로 흐리게 그린다
function RainbowShape() {
  const bands = ["#ff9aa8", "#ffc78f", "#fff2a0", "#a7e8b5", "#9fd3ff", "#c4a8ff"];
  return (
    <svg viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="h-full w-full">
      <defs>
        <filter id="rainbow-blur" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g fill="none" strokeWidth="14" filter="url(#rainbow-blur)">
        {bands.map((color, i) => (
          <path key={color} d={`M-60 ${330 - i * 14} Q600 ${-120 + i * 14} 1260 ${330 - i * 14}`} stroke={color} opacity="0.55" />
        ))}
      </g>
    </svg>
  );
}

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rainbowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rainbow = rainbowRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !rainbow || !left || !right) return;

    // 현재 값 (처음엔 구름이 바깥에 있고 투명하다)
    const cur = { rainbowY: 120, cloudX: 200, cloudY: 0, opacity: 0 };
    const apply = () => {
      rainbow.style.transform = `translate3d(0, ${cur.rainbowY.toFixed(1)}px, 0)`;
      left.style.transform = `translate3d(${(-cur.cloudX).toFixed(1)}px, ${cur.cloudY.toFixed(1)}px, 0)`;
      right.style.transform = `translate3d(${cur.cloudX.toFixed(1)}px, ${cur.cloudY.toFixed(1)}px, 0) scaleX(-1)`;
      left.style.opacity = right.style.opacity = cur.opacity.toFixed(3);
    };
    // 목표 값: 스크롤 정도(progress)에서 정한다
    const target = () => {
      const rect = root.getBoundingClientRect();
      const progress = clamp(0, 1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      const inView = progress > 0.12 && progress < 0.92;
      return { rainbowY: 120 - progress * 280, cloudX: inView ? 0 : 200, cloudY: progress * -50 };
    };

    // 동작 줄이기: 움직임 없이 보기 좋은 모습으로 고정한다
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Object.assign(cur, { rainbowY: -20, cloudX: 0, cloudY: -25, opacity: 1 });
      apply();
      return;
    }

    let frame = 0;
    const tick = () => {
      const t = target();
      cur.rainbowY = lerp(cur.rainbowY, t.rainbowY, 0.06);
      cur.cloudX = lerp(cur.cloudX, t.cloudX, 0.04);
      cur.cloudY = lerp(cur.cloudY, t.cloudY, 0.04);
      cur.opacity = clamp(0, 1, 1 - cur.cloudX / 200); // 구름이 안쪽으로 올수록 또렷해진다
      apply();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <EarthBackdrop />
      {/* 무지개 띠 (글자를 가리지 않도록 글 뒤에 둔다) */}
      <div ref={rainbowRef} className="absolute inset-x-0 top-0 h-[55%] will-change-transform" style={{ opacity: 0.6 }}>
        <RainbowShape />
      </div>
      {/* 왼쪽 구름: 화면 밖에서 안쪽으로 들어온다 (좁은 화면에서는 숨김) */}
      <div ref={leftRef} className="absolute bottom-[18%] left-0 hidden w-[500px] will-change-transform sm:block md:w-[640px]" style={{ marginLeft: "-18%", opacity: 0 }}>
        <CloudShape />
      </div>
      {/* 오른쪽 구름: 같은 구름을 뒤집어 반대편에서 들어온다 */}
      <div ref={rightRef} className="absolute bottom-[26%] right-0 hidden w-[500px] will-change-transform sm:block md:w-[640px]" style={{ marginRight: "-22%", opacity: 0 }}>
        <CloudShape />
      </div>
    </div>
  );
}
