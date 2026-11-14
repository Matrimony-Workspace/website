import type { Metadata } from "next";
import { ALLOW_INDEXING, SITE, SITE_URL } from "@/config/site";

export const absUrl = (path = "/") => (path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);

/**
 * `max-snippet: -1` + `max-image-preview: large` let search/answer engines quote
 * a full paragraph and show a large card — the difference between being cited
 * and being a bare link.
 */
export const ROBOTS: Metadata["robots"] = ALLOW_INDEXING
  ? {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    }
  : { index: false, follow: false };

/** Trim to a clean snippet length on a word boundary. */
export function clip(text: string | null | undefined, max = 160) {
  const t = (text ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max * 0.6))}…`;
}

/**
 * Per-page metadata: canonical, OG, Twitter. Title gets the layout's
 * "%s | Brand" template automatically.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** hreflang alternates, e.g. { en: "/en", hi: "/hi", "x-default": "/en" } */
  languages?: Record<string, string>;
}): Metadata {
  const url = absUrl(opts.path);
  const description = clip(opts.description);
  const images = [opts.image ? { url: absUrl(opts.image) } : { ...SITE.ogImage, url: absUrl(SITE.ogImage.url) }];
  return {
    title: opts.title,
    description,
    alternates: {
      canonical: url,
      languages: opts.languages
        ? Object.fromEntries(Object.entries(opts.languages).map(([k, v]) => [k, absUrl(v)]))
        : undefined,
    },
    // Omit the key unless overriding: `robots: undefined` would wipe the layout's directives.
    ...(opts.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: opts.type ?? "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title: opts.title,
      description,
      images,
      ...(opts.type === "article" && { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime }),
    },
    twitter: { card: "summary_large_image", title: opts.title, description, images: images.map((i) => i.url) },
  };
}
