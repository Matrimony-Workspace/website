"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { Logo } from "./Logo";
import { StoreBadges } from "./StoreBadges";
import { MenuOverlay } from "./MenuOverlay";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Header: 80px, wordmark centred, language switcher + burger right (store icons left — brief).
 * Transparent + white over a hero photo; white bar once scrolled (see globals.css).
 */
export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header sticky top-0 z-40 h-[var(--header-h)] text-[color:var(--hdr-fg)] transition-[background-color,color] duration-500",
          scrolled && "is-scrolled",
        )}
      >
        <div className="shell grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
          <StoreBadges variant="icons" className="justify-self-start" />
          <SmoothLink href="/" aria-label={t.ui.home} className="justify-self-center">
            <Logo className="text-[18px] sm:text-[28px] lg:text-[32px]" />
          </SmoothLink>
          <div className="flex items-center gap-2.5 justify-self-end sm:gap-4 lg:gap-6">
          <LanguageSwitcher />
          <button
            ref={burger}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={t.ui.openMenu}
            className="group p-1"
          >
            <svg viewBox="0 0 39 26" className="h-[22px] w-[33px] lg:h-[26px] lg:w-[39px]" aria-hidden>
              <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M2 2h35" />
                <path d="M2 13h35" className="origin-right transition-transform duration-300 group-hover:scale-x-75" />
                <path d="M2 24h35" />
              </g>
            </svg>
          </button>
          </div>
        </div>
      </header>
      <MenuOverlay
        open={open}
        onClose={() => {
          setOpen(false);
          burger.current?.focus();
        }}
      />
    </>
  );
}
