import { NAV, SITE, SITE_URL } from "@/config/site";
import { absUrl } from "@/lib/seo";
import { getPosts } from "@/lib/content";

export const revalidate = 3600;

/**
 * llms.txt (llmstxt.org) — a Markdown map of the site for LLMs / answer
 * engines. Generated from the same data as the pages so it never goes stale.
 */
export async function GET() {
  const posts = await getPosts();
  const body = `# ${SITE.name}

> ${SITE.description}

Contact: ${SITE.email} · ${SITE.phone}

## Pages

${NAV.map((n) => `- [${n.label}](${absUrl(n.href)}): ${n.summary}`).join("\n")}

## Articles

${posts.map((p) => `- [${p.title}](${absUrl(`/en/blog/${p.slug}`)}): ${p.summary}`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
- [RSS feed](${SITE_URL}/rss.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
