import { SITE, SITE_URL } from "@/config/site";
import { absUrl, clip } from "@/lib/seo";
import type { Faq, Post } from "@/lib/content";

/**
 * schema.org JSON-LD builders. Stable @ids let nodes on different pages
 * reference the same Organization/WebSite entity (entity consolidation is
 * what answer engines use to decide who to cite).
 */
type Node = Record<string, unknown>;

export const ID = {
  org: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
};

export function organizationSchema(): Node {
  return {
    "@type": "Organization",
    "@id": ID.org,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: absUrl(SITE.logo),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs.length ? SITE.sameAs : undefined,
  };
}

export function websiteSchema(): Node {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { "@id": ID.org },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: absUrl(t.path) })),
  };
}

/** FAQPage — only for Q&As that are VISIBLE on the page (Google policy). */
export function faqSchema(faqs: Faq[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(post: Post): Node {
  const url = absUrl(`/en/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: clip(post.title, 110),
    description: post.summary,
    image: post.image ? [absUrl(post.image)] : [absUrl(SITE.ogImage.url)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ID.org },
    inLanguage: SITE.lang,
    keywords: post.tags.join(", "),
  };
}

/** Wrap nodes in one @graph document. */
export const graph = (...nodes: Node[]) => ({ "@context": "https://schema.org", "@graph": nodes });
