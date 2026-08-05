import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load raw Markdown/MDX content as strings so it bundles into the Cloudflare
  // worker — no runtime filesystem access required. See scripts/gen-content.mjs.
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;