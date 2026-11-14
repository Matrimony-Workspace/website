@AGENTS.md

# Next.js ISR + SEO/AEO boilerplate

Next 16 App Router, TS, Tailwind v4. Distilled from Pronttera sites: Tijarah (metadata/JSON-LD helpers), Frostique (robots AI-bot list, llms.txt, rss), Khansaab (on-demand revalidate webhook).

## Start a new site
1. Copy this folder (skip `node_modules`, `.next`, `.git`), `npm i`.
2. Edit `src/config/site.ts` (brand, description, address, sameAs, NAV) — the ONLY place brand data lives.
3. `.env` from `.env.example`. `NEXT_PUBLIC_ALLOW_INDEXING=true` on production only.
4. Wire CMS in `src/lib/content.ts` (keep signatures; delete SEED). Add `public/og.png` (1200×630) + `public/logo.png`.
5. New content type = copy `src/app/blog/` and add `getX/getXs` + schema builder.

## Map
- `config/site.ts` SITE_URL, SITE, NAV, REVALIDATE, AI_BOTS
- `lib/seo.ts` `buildMetadata()` (canonical/OG/twitter), `ROBOTS`, `clip()`, `absUrl()`
- `lib/schema.ts` Organization, WebSite, BreadcrumbList, FAQPage, BlogPosting, `graph()`; stable `@id`s
- `lib/content.ts` data layer: fetch with `next: { revalidate, tags }`; tags `posts`, `post:<slug>`; null → 404
- `components/` JsonLd (escaped), Breadcrumbs, FaqSection (visible FAQ + schema together)
- `app/` layout (metadataBase, title template, Org+WebSite JSON-LD), blog/[slug] (ISR template), sitemap, robots, llms.txt, rss.xml, manifest, api/revalidate

## Rules (don't break)
- ISR = classic: `export const revalidate = <literal>` + `generateStaticParams` + `dynamicParams = true`. `cacheComponents: false` deliberately (crawlers get full HTML + real 404). Route `revalidate` must be a literal, not an import.
- `revalidateTag(tag, "max")` — two-arg form (1-arg deprecated in 16). Webhook: `POST /api/revalidate`, `Authorization: Bearer $REVALIDATE_SECRET`, body `{tags, paths}`.
- `params` is a Promise; type pages with `PageProps<"/route/[x]">` (generated on build/dev).
- Never put `canonical` in layout; every page calls `buildMetadata({path})`. Never pass `robots: undefined` (wipes layout robots).
- FAQ schema only for Q&As visible on the page. Sitemap `lastModified` = real content date, never `new Date()`.
- AEO: answer-first 40–60 word summary under every H1; question-style H2s; keep AI_BOTS allowed; llms.txt generated from data.
- Non-prod: robots Disallow + `X-Robots-Tag: noindex` header (next.config) driven by ALLOW_INDEXING.

## Verify
`NEXT_PUBLIC_ALLOW_INDEXING=true npm run build` → routes show Revalidate 1h; check `.next/server/app/*.html` for canonical, robots, ld+json. Test schema at search.google.com/test/rich-results.
