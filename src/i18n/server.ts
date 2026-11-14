import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { dictionaryFor } from "./dictionary";

/**
 * Locale for Server Components comes from the route's own `params` and is
 * passed down explicitly (deterministic in dev and prod — we deliberately don't
 * rely on next/root-params, which can resolve to the first static param during
 * Cache Components' dev validation render).
 */
export function assertLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}

/** Localised copy for Server Components. */
export function getContent(lang: Locale) {
  return dictionaryFor(lang);
}
