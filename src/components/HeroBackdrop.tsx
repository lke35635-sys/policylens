"use client";
// 히어로(PolicyLens 머리말) 뒷배경 — 실제 지구(RealEarth)를 깐다. 구름·무지개 장식은 뺐다.
// WebGL을 쓸 수 없는 환경에서는 RealEarth가 아무것도 그리지 않으므로, 코드로 그린 지구(EarthBackdrop, SVG)가 대신 보인다.
// RealEarth가 그리기 시작하면(data-ready) SVG 지구는 숨긴다.
import { EarthBackdrop } from "./EarthBackdrop";
import { RealEarth } from "./RealEarth";

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [&:has(canvas[data-ready='1'])_.earth-fallback]:hidden">
      <div className="earth-fallback absolute inset-0">
        <EarthBackdrop />
      </div>
      <RealEarth />
    </div>
  );
}
