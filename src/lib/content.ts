import "server-only";
import { REVALIDATE } from "@/config/site";

/**
 * Data layer. Swap the seed for your CMS/API — keep the function signatures.
 *
 * ISR contract:
 *  - every fetch carries `next.revalidate` (time-based) and `next.tags`
 *    (on-demand via POST /api/revalidate)
 *  - tag names: "posts" (any list) and "post:<slug>" (one item)
 *  - return null for 404 so the page can call notFound()
 */

export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  /** Answer-first: 40–60 words that directly answer the title's question. AEO engines quote this. */
  summary: string;
  /** Body as HTML from the CMS (sanitised upstream). */
  html: string;
  author: string;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  tags: string[];
  image?: string | null;
  faqs?: Faq[];
};

const API = (process.env.CMS_API_URL ?? "").replace(/\/+$/, "");

async function api<T>(path: string, tags: string[]): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: REVALIDATE, tags },
    headers: process.env.CMS_API_TOKEN ? { Authorization: `Bearer ${process.env.CMS_API_TOKEN}` } : undefined,
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CMS ${res.status} ${path}`); // throw → ISR keeps serving the last good page
  return res.json() as Promise<T>;
}

export async function getPosts(): Promise<Post[]> {
  if (!API) return SEED;
  return (await api<Post[]>("/posts", ["posts"])) ?? [];
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!API) return SEED.find((p) => p.slug === slug) ?? null;
  return api<Post>(`/posts/${encodeURIComponent(slug)}`, ["posts", `post:${slug}`]);
}

// ── Seed content (delete once a CMS is wired) ────────────────────────────────

const SEED: Post[] = [
  {
    slug: "what-is-isr",
    title: "What is Incremental Static Regeneration (ISR)?",
    summary:
      "Incremental Static Regeneration serves pre-built static HTML from cache and rebuilds a page in the background after a set interval or when content changes, so visitors and crawlers always get fast, fully rendered pages without a full site rebuild.",
    html: "<h2>How ISR works</h2><p>Pages are rendered at build time or on first request, cached, then regenerated in the background.</p><h2>Why it matters for SEO</h2><p>Crawlers receive complete HTML instantly, which improves indexing and Core Web Vitals.</p>",
    author: "Editorial Team",
    publishedAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-11-01T00:00:00.000Z",
    tags: ["nextjs", "isr", "seo"],
    faqs: [
      { q: "Does ISR hurt SEO?", a: "No. Crawlers receive fully rendered static HTML, the same as a static site." },
      { q: "How fast do updates go live?", a: "Instantly with on-demand revalidation, or within the revalidate window otherwise." },
    ],
  },
  {
    slug: "what-is-aeo",
    title: "What is Answer Engine Optimization (AEO)?",
    summary:
      "Answer Engine Optimization structures content so AI assistants like ChatGPT, Perplexity and Google AI Overviews can extract and cite it: direct answers first, clear headings phrased as questions, FAQ and schema markup, and crawler access for AI bots.",
    html: "<h2>Write answer-first</h2><p>Open each page with a direct 40–60 word answer.</p><h2>Expose structure</h2><p>Use JSON-LD, FAQ blocks and an llms.txt file.</p>",
    author: "Editorial Team",
    publishedAt: "2026-02-05T00:00:00.000Z",
    updatedAt: "2026-10-20T00:00:00.000Z",
    tags: ["aeo", "seo", "ai"],
  },
];
