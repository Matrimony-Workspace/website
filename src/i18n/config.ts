/** Supported locales. URLs: /en, /hi, /ur. Visiting / redirects (see src/proxy.ts). */
export const LOCALES = ["en", "hi", "ur"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (v: string | undefined | null): v is Locale => !!v && (LOCALES as readonly string[]).includes(v);

/** Switcher labels: each language named in its own script + a short code. */
export const LOCALE_LABELS: Record<Locale, { label: string; hint: string; htmlLang: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", hint: "EN", htmlLang: "en", dir: "ltr" },
  hi: { label: "हिन्दी", hint: "HI", htmlLang: "hi", dir: "ltr" },
  ur: { label: "اردو", hint: "UR", htmlLang: "ur", dir: "rtl" },
};

/** Prefix a locale-free internal href ("/#x", "/blog") with the locale. */
export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//")) return href; // external, mailto, #hash
  const seg = href.split(/[/?#]/)[1];
  if (isLocale(seg)) return href; // already prefixed
  return href === "/" ? `/${locale}` : href.startsWith("/#") ? `/${locale}${href.slice(1)}` : `/${locale}${href}`;
}
