/**
 * Single source of truth for the site. Retargeting this boilerplate to a new
 * project = edit this file + .env. Every canonical, OG tag, sitemap entry,
 * JSON-LD node and llms.txt line is built from these values.
 */

/**
 * Canonical origin. No trailing slash. A staging deploy that forgets to set
 * this points at production, which is the safe failure (it never tells Google
 * to index the staging host).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/+$/, "");

/** Only production should be indexed. Previews/staging get noindex + Disallow. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const SITE = {
  name: "Divine Companion",
  legalName: "Divine Companion", // TODO: registered legal entity name
  tagline: "Relationship counselling that leads to your divine match",
  /** 140–160 chars. Used as default meta description and llms.txt summary. */
  description:
    "Free relationship and pre-marriage counselling, the Soul Compass personality test, workshops and webinars that guide you toward a lasting, divine match.",
  locale: "en_IN",
  lang: "en",
  email: "hello@example.com",
  phone: "+910000000000",
  address: {
    street: "Street",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "411001",
    country: "IN",
  },
  /** Social/profile URLs — lets search & answer engines reconcile the entity. */
  sameAs: [] as string[],
  twitter: "", // "@handle"
  ogImage: { url: "/og.png", width: 1200, height: 630 },
  logo: "/logo.png",
} as const;

/** Main nav — also used for llms.txt "Pages" section. */
export const NAV = [
  { href: "/en", label: "Home", summary: "Free counselling, the Soul Compass test, workshops, webinars and how matching works" },
  { href: "/en/blog", label: "Blog", summary: "Guides and articles" },
] as const;

/**
 * Data-fetch revalidate window (seconds). Route-level `export const revalidate`
 * must be a literal in each page file — Next can't read it from an import.
 */
export const REVALIDATE = 3600;

/**
 * Answer-engine crawlers, allowed by name. Several treat `User-agent: *` as
 * "not addressed to me", and *-Extended tokens are opt-out signals — an
 * explicit Allow is what makes the site quotable by ChatGPT, Claude,
 * Perplexity, Gemini/AI Overviews. Remove a line to withdraw consent.
 */
export const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
  "Amazonbot",
  "CCBot",
];
