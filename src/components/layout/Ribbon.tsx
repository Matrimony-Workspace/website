"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/client";
import { gsap } from "@/lib/gsap";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { prefersReducedMotion } from "@/components/motion/useReducedMotion";
import { Close } from "@/components/illustrations/Icons";

export function Ribbon() {
  const { t } = useI18n();
  const RIBBON = t.ribbon;
  const ref = useRef<HTMLDivElement>(null);
  const close = () => {
    try {
      localStorage.setItem("dc-ribbon", "closed");
    } catch {}
    const done = () => document.documentElement.classList.add("ribbon-closed");
    if (!ref.current || prefersReducedMotion()) return done();
    gsap.to(ref.current, { height: 0, duration: 0.45, ease: "power3.inOut", onComplete: done });
  };
  return (
    <div ref={ref} className="ribbon relative z-50 overflow-hidden bg-violet text-mist">
      <div className="shell flex min-h-10 items-center justify-center py-2 pr-12 text-center text-[15px] leading-5">
        <p>
          {RIBBON.text}{" "}
          <SmoothLink href={RIBBON.cta.href} className="text-link text-petal">
            {RIBBON.cta.label}
          </SmoothLink>
        </p>
        <button
          type="button"
          onClick={close}
          aria-label={t.ui.dismiss}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center sm:right-4"
        >
          <Close className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
