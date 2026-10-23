"use client";
// 히어로 뒷배경의 실제 지구 — NASA 위성 사진(낮 지도, 밤 도시 불빛 지도)을 구에 입혀 천천히 돌려 보여 준다.
// 라이브러리 없이 브라우저 기본 그래픽(WebGL)의 조각 셰이더 하나로 그린다: 화면 위쪽에 둥근 지평선이 걸린 큰 구를 만들고,
// 한반도·일본이 보이는 위도로 기울여 놓은 뒤 동쪽으로 천천히 자전시킨다. 밤 쪽에는 도시 불빛, 가장자리에는 푸른 대기 빛과 햇빛 번짐을 더한다.
// 이미지 출처: NASA Earth Observatory (공개 자료, 출처 표시). 파일은 public/earth/ 에 있고 실행 중에 외부 요청은 하지 않는다.
// 움직임: '동작 줄이기' 설정이면 한 장만 그리고 멈춘다. 화면 밖이거나 탭이 숨겨지면 그리지 않는다. WebGL을 쓸 수 없으면 아무것도 그리지 않고
// 부모(HeroBackdrop)가 대신 보여 주는 그림(SVG)이 남는다.
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uDpr;
uniform float uLon;   // 화면 가운데에 보이는 경도(0~1로 만든 값)
uniform float uTilt;  // 지구 자전축이 시청자에게서 멀어지는 각도
uniform float uTop;   // 구의 맨 위가 걸리는 높이(-1~1)
uniform sampler2D uDay;
uniform sampler2D uLights;
const float PI = 3.14159265;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag * 2.0 - uRes) / uRes.y;
  float asp = uRes.x / uRes.y;
  float R = clamp(asp * 1.5, 2.6, 7.0);
  vec2 c = vec2(0.0, uTop - R);
  vec2 d = p - c;
  float s = length(d) / R;
  float px = 2.0 / uRes.y / R;                       // 한 픽셀이 s에서 차지하는 크기
  float edge = clamp((1.0 - s) / px, 0.0, 1.0);      // 구의 가장자리를 부드럽게

  vec3 L = normalize(vec3(0.55, 0.5, -0.45));        // 햇빛 방향(위·오른쪽·뒤)

  // ---- 구 안쪽 ----
  vec4 inside = vec4(0.0);
  if (edge > 0.0) {
    float z = sqrt(max(1.0 - s * s, 0.0));
    vec3 n = vec3(d / R, z);
    float ca = cos(uTilt), sa = sin(uTilt);
    vec3 axis = vec3(0.0, ca, -sa);                  // 북극 방향
    vec3 z0 = vec3(0.0, sa, ca);
    float lat = asin(clamp(dot(n, axis), -1.0, 1.0));
    float lon = atan(n.x, dot(n, z0));
    float u = fract(lon / (2.0 * PI) + uLon);
    float v = lat / PI + 0.5;

    float ndl = dot(n, L);
    float day = smoothstep(0.05, 0.8, ndl);
    vec3 dayTex = texture2D(uDay, vec2(u, v)).rgb;
    vec3 lightsTex = texture2D(uLights, vec2(u, v)).rgb;
    float lum = clamp((lightsTex.r + lightsTex.g) * 0.5 - lightsTex.b * 0.3, 0.0, 1.0);
    vec3 city = vec3(1.0, 0.86, 0.58) * pow(lum, 0.8) * 2.4 * (1.0 - day * 0.85);

    vec3 surf = dayTex * vec3(0.14, 0.28, 0.60) * (0.7 + 1.3 * day) + dayTex * vec3(1.0, 0.96, 0.88) * day * 0.55;
    float fres = pow(1.0 - z, 2.6);
    vec3 rim = vec3(0.30, 0.58, 1.0) * fres * (0.55 + 1.3 * max(ndl, 0.0));
    float glare = pow(max(ndl, 0.0), 6.0) * pow(1.0 - z, 1.5) * 1.3;
    vec3 col = surf + city + rim + vec3(0.8, 0.9, 1.0) * glare;
    inside = vec4(col, 1.0);
  }

  // ---- 구 바깥: 대기 빛과 별 ----
  vec4 outside = vec4(0.0);
  if (edge < 1.0) {
    float h = max(s - 1.0, 0.0);
    vec2 dir = d / max(length(d), 0.0001);
    float sunSide = max(dot(dir, normalize(L.xy)), 0.0);
    float glow = exp(-h * 42.0) * (0.35 + 0.95 * sunSide);
    vec3 col = vec3(0.35, 0.62, 1.0) * glow;
    vec2 g = floor(frag / (uDpr * 3.0));
    float st = step(0.9965, hash(g)) * (0.4 + 0.6 * hash(g + 7.0));
    col += vec3(st) * (1.0 - clamp(glow * 2.0, 0.0, 1.0));
    float a = clamp(max(max(col.r, col.g), col.b), 0.0, 1.0);
    outside = vec4(col, a);
  }

  gl_FragColor = inside * edge + outside * (1.0 - edge);   // 투명도를 곱해 둔 색(premultiplied)으로 낸다
}
`;

// 초당 자전 각도(도). 한 바퀴에 약 3분 — 눈에 띄지만 천천히 돈다
const DEG_PER_SEC = 2.0;
const START_LON = 128; // 시작할 때 화면 가운데에 오는 경도(한반도 근처)
const TILT = (42 * Math.PI) / 180;

export function RealEarth({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false }) as WebGLRenderingContext | null;
    if (!gl) return; // WebGL을 쓸 수 없으면 부모가 보여 주는 SVG 지구가 남는다

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // 화면 전체를 덮는 삼각형 하나
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = (name: string) => gl.getUniformLocation(program, name);
    const uRes = uni("uRes");
    const uDpr = uni("uDpr");
    const uLon = uni("uLon");
    const uTilt = uni("uTilt");
    const uTop = uni("uTop");
    gl.uniform1i(uni("uDay"), 0);
    gl.uniform1i(uni("uLights"), 1);
    gl.uniform1f(uTilt, TILT);
    gl.uniform1f(uTop, -0.22);

    let disposed = false;
    let loaded = 0;
    let visible = true;
    let frame = 0;
    const start = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = 1;

    const draw = (now: number) => {
      const seconds = reduce ? 0 : (now - start) / 1000;
      const lonc = START_LON - DEG_PER_SEC * seconds; // 동쪽으로 자전하면 보이는 경도는 서쪽으로 흘러간다
      gl.uniform1f(uLon, (lonc + 180) / 360);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uDpr, dpr);
      if (loaded === 2) draw(performance.now());
    };

    const loop = (now: number) => {
      if (disposed) return;
      if (visible && document.visibilityState === "visible") draw(now);
      frame = requestAnimationFrame(loop);
    };

    const onTextureLoaded = () => {
      loaded += 1;
      if (loaded < 2 || disposed) return;
      resize();
      draw(performance.now());
      canvas.dataset.ready = "1";
      onReady?.();
      if (!reduce) frame = requestAnimationFrame(loop);
    };

    const loadTexture = (url: string, unit: number) => {
      const tex = gl.createTexture();
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        onTextureLoaded();
      };
      img.src = url;
    };
    loadTexture("/earth/earth_day.jpg", 0);
    loadTexture("/earth/earth_lights.jpg", 1);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
    });
    io.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [onReady]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
