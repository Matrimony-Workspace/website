import { SITE, SITE_URL } from "@/config/site";
import { absUrl } from "@/lib/seo";
import { getPosts } from "@/lib/content";

export const revalidate = 3600;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = absUrl(`/en/blog/${p.slug}`);
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name)}</title><link>${SITE_URL}</link><description>${esc(SITE.description)}</description><language>${SITE.lang}</language><atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
