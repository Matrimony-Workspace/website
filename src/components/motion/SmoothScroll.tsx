"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "./useReducedMotion";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Buttery smooth scroll (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ lerp: 0.085, wheelMultiplier: 1, touchMultiplier: 1.15 });
    lenis = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

/** Smoothly scroll to an element (falls back to native when Lenis is off). */
export function scrollToTarget(el: HTMLElement, offset = -72) {
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}
