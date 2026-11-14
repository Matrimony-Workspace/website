"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, isLocale, type Locale } from "@/i18n/config";
import { Check } from "@/components/illustrations/Icons";
import { cn } from "@/lib/cn";

/** Remember the visitor's language for the proxy's next redirect (1 year). */
function saveLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

/** Globe icon left of the burger → dropdown of languages. Remembers the choice (cookie). */
export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    saveLocale(next);
    const parts = window.location.pathname.split("/");
    if (isLocale(parts[1])) parts[1] = next;
    else parts.splice(1, 0, next);
    window.location.assign(parts.join("/") + window.location.search + window.location.hash);
  };

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.ui.language}: ${LOCALE_LABELS[locale].label}`}
        className="flex h-8 items-center gap-1.5 rounded-full border border-current px-1.5 text-[13px] font-bold sm:h-10 sm:px-2.5 transition-colors hover:bg-current/10"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21M12 3C9.5 5.6 8.2 8.6 8.2 12s1.3 6.4 3.8 9" />
        </svg>
        <span className="hidden sm:inline">{LOCALE_LABELS[locale].hint}</span>
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t.ui.language}
          className="absolute end-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-mist p-1.5 text-ink shadow-[0_24px_50px_-20px_rgba(36,19,47,.45)]"
        >
          {LOCALES.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => choose(l)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-start text-[15px] font-semibold transition-colors",
                    active ? "bg-lilac text-violet" : "hover:bg-blush",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-6 w-8 place-items-center rounded-md bg-white text-[11px] font-bold text-ink/70">
                      {LOCALE_LABELS[l].hint}
                    </span>
                    {LOCALE_LABELS[l].label}
                  </span>
                  {active && <Check className="h-4 w-4" strokeWidth={2.6} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
