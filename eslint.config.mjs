import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // We intentionally use raw <img> for static SVG artwork served from /public —
    // next/image optimization is not needed for local SVGs.
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build artifacts and generated files — not source:
    ".open-next/**",
    ".wrangler/**",
    "content/**",
    "src/lib/content-registry.ts",
  ]),
]);

export default eslintConfig;
