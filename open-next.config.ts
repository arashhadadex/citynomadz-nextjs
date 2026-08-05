// OpenNext configuration for Cloudflare Workers (citynomadz.org)
//
// Every page on City Nomadz is fully prerendered at build time, so we use the
// static-assets incremental cache: prerendered HTML is shipped inside the
// Worker's static assets and served without any runtime computation or R2.
// Cloudflare Workers forbid dynamic code generation (`eval`), and MDX is
// compiled during the build — this guarantees pages never re-render MDX at
// request time.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
