// 검사 스크립트 전용 도우미: 앱 코드의 `import "./types"`처럼 확장자 없는 가져오기를
// Node가 `.ts` 파일로 찾을 수 있게 한다. 앱 빌드(Next.js)에는 쓰이지 않는다.
export async function resolve(specifier, context, nextResolve) {
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
