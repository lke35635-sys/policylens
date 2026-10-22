// 사용법: node --no-warnings --import ./scripts/register-ts.mjs scripts/check-stress-calculate.mjs
import { register } from "node:module";

register("./ts-resolve-hooks.mjs", import.meta.url);
