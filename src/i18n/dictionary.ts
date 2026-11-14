import en from "./content/en";
import hi from "./content/hi";
import ur from "./content/ur";
import type { Locale } from "./config";
import type { Content, Overrides } from "./types";

/** Merge overrides onto the English base (arrays merge by index). */
function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    const o = over as unknown[];
    return base.map((item, i) => merge(item, o[i])) as T;
  }
  if (typeof base === "object" && base !== null) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
    return out as T;
  }
  return over as T;
}

const OVERRIDES: Record<Locale, Overrides | null> = { en: null, hi, ur };
const cache = new Map<Locale, Content>();

export function dictionaryFor(locale: Locale): Content {
  let d = cache.get(locale);
  if (!d) {
    d = OVERRIDES[locale] ? merge(en, OVERRIDES[locale]) : en;
    cache.set(locale, d);
  }
  return d;
}
