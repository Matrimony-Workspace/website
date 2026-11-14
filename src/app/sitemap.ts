import type { MetadataRoute } from "next";
import { NAV } from "@/config/site";
import { LOCALES } from "@/i18n/config";
import { absUrl } from "@/lib/seo";
import { getPosts } from "@/lib/content";

export const revalidate = 3600;

/**
 * lastModified must be the real content date — a fake "now" on every build
 * teaches Google to ignore it. >50k URLs: switch to generateSitemaps().
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latest = posts.reduce((d, p) => (p.updatedAt > d ? p.updatedAt : d), "1970-01-01");
  return [
    // Home in every language, each listing its hreflang alternates
    ...LOCALES.map((l) => ({
      url: absUrl(`/${l}`),
      lastModified: latest,
      alternates: { languages: Object.fromEntries(LOCALES.map((x) => [x, absUrl(`/${x}`)])) },
    })),
    ...NAV.filter((n) => n.href !== "/en").map((n) => ({ url: absUrl(n.href), lastModified: latest })),
    ...posts.map((p) => ({ url: absUrl(`/en/blog/${p.slug}`), lastModified: p.updatedAt })),
  ];
}
