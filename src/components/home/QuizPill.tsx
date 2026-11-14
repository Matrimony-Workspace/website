"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { Sparkle } from "@/components/illustrations/Shapes";

/**
 * Mobile-only floating "Discover your love type" pill (the header has no room
 * for it below md). Appears after the hero, tucks away when the footer arrives.
 */
export function QuizPill() {
  const { t } = useI18n();
  const QUIZ_CTA = t.quizCta;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-overlay]");
    const footer = document.querySelector("footer");
    let pastHero = false;
    let atFooter = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === footer) atFooter = e.isIntersecting;
      }
      setShow(pastHero && !atFooter);
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-4 z-30 flex justify-center transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <SmoothLink
        href={QUIZ_CTA.href}
        tabIndex={show ? 0 : -1}
        className="inline-flex items-center gap-2 rounded-full bg-violet py-3 pl-4 pr-5 font-display text-[16px] font-bold text-mist shadow-[0_18px_40px_-14px_rgba(36,19,47,.6)]"
      >
        <Sparkle still className="h-4 w-4 text-rose" />
        {QUIZ_CTA.label}
        <span className="font-sans text-[12px] font-medium text-mist/70">
          {t.ui.min15}
        </span>
      </SmoothLink>
    </div>
  );
}
