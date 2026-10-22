// 검사 스크립트 전용 도우미: 앱 코드의 `import "./types"`처럼 확장자 없는 가져오기를
// Node가 `.ts` 파일로 찾을 수 있게 한다. 앱 빌드(Next.js)에는 쓰이지 않는다.
// 앱의 경로 별칭 `@/…` = `src/…`도 같은 방식으로 찾아 준다 (서버 주소 route.ts를 직접 시험하려고).
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const rest = specifier.slice(2);
    const file = /\.[cm]?[jt]sx?$/.test(rest) ? rest : `${rest}.ts`;
    return nextResolve(new URL(`../src/${file}`, import.meta.url).href, context);
  }
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
    const hasExtension = /\.[cm]?[jt]sx?$/.test(specifier);
    if (error?.code === "ERR_MODULE_NOT_FOUND" && isRelative && !hasExtension) {
      return nextResolve(`${specifier}.ts`, context);
    }
    throw error;
  }
}
