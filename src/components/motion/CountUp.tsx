"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const o = { v: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(o, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(o.v)}${suffix}`;
        },
      });
      return () => {
        el.textContent = `${to}${suffix}`;
      };
    });
  });
  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
