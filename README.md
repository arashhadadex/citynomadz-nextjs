# City Nomadz — citynomadz.org

An independent field journal on the nomadic life. Slow travel, long stays, and
honest costs from the handful of countries we actually live in — Armenia and
Greece, written from lived experience.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript, Turbopack)
- **Tailwind CSS v4** — editorial design system (paper / ink / terracotta)
- **MDX** content via `content/**` + a generated import registry
- **framer-motion · GSAP ScrollTrigger · Lenis · lucide-react** for motion
- Deployed to **Cloudflare Workers** via OpenNext (static-assets cache)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Content lives in `content/destinations/*.mdx` and `content/posts/*.mdx`.
A pre-build script (`scripts/gen-content.mjs`) bundles every MDX file as raw
strings into `src/lib/content-registry.ts` — no runtime filesystem access,
which is required for Cloudflare Workers.

Add a post → drop a `.mdx` file into `content/posts/`, run `npm run build`.
Frontmatter: `title`, `date`, `country`, `excerpt`, `tags`, `published`.

## Cloudflare Workers (deploy)

```bash
npm run cf:build     # Next build + OpenNext adapt
npm run cf:preview   # build + populate static-assets cache + wrangler dev
npm run cf:deploy    # build + populate cache + wrangler deploy
```

First time:

```bash
npx wrangler login
```

The worker uses the **static-assets incremental cache** — every page is
prerendered at build time and shipped inside the Worker's static assets, so
MDX is never compiled at request time (Cloudflare Workers disallow `eval`).
No R2 bucket is required.

## Project layout

```
content/            MDX content (destinations, posts)
scripts/            content registry generator
src/app/            routes (/, /destinations, /journal, /about)
src/components/     layout, home, journal, ui primitives
src/lib/            site data, content loaders, MDX renderer, design tokens
wrangler.jsonc      Cloudflare worker config
open-next.config.ts OpenNext adapter config
```

© 2026 City Nomadz
