"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { dictionaryFor } from "./dictionary";
import type { Content } from "./types";

const Ctx = createContext<{ locale: Locale; t: Content }>({ locale: DEFAULT_LOCALE, t: dictionaryFor(DEFAULT_LOCALE) });

/** Provides the locale to Client Components; the dictionary is resolved client-side (no big prop payload). */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <Ctx.Provider value={{ locale, t: dictionaryFor(locale) }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
