"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One controller for declarative scroll motion, so section markup can stay
 * server-rendered. Re-runs on route change (lives in the root layout):
 *  - [data-reveal]   rise + fade in, batched with stagger
 *  - [data-scale-in] circle photos: scale 0.92 → 1 + fade
 *  - [data-draw]     SVG path (pathLength="1") draws with scroll — the Divine Thread
 *  - [data-float]    shapes/doodles: scroll-scrubbed drift + rotation
 *  - [data-parallax] decorative drift, value = px of travel
 */
export function MotionController() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.classList.add("motion-ready");

      // Web fonts change line heights after first paint — re-measure triggers once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        ScrollTrigger.batch("[data-scale-in]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, scale: 1, duration: 1.1, stagger: 0.1, ease: "expo.out", overwrite: true }),
        });

        gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
          gsap.to(p, {
            strokeDashoffset: 0,
            ease: "none",
            // clamp() keeps paths near the page end fully drawable at max scroll
            scrollTrigger: { trigger: p.closest("svg") ?? p, start: "clamp(top 85%)", end: "clamp(bottom 45%)", scrub: 1 },
          });
        });

        // Floating shapes & doodles: drift + turn with scroll, varied per element for depth.
        gsap.utils.toArray<SVGElement>("[data-float]").forEach((el, i) => {
          const dir = i % 2 ? 1 : -1;
          const travel = Number(el.dataset.float) || 60 + (i % 4) * 30;
          const turn = (10 + (i % 3) * 12) * dir;
          gsap.fromTo(
            el,
            { y: travel / 2, rotation: -turn / 2, scale: 0.94 },
            {
              y: -travel / 2,
              rotation: turn / 2,
              scale: 1.04,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 1.2 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const d = Number(el.dataset.parallax) || 60;
          gsap.fromTo(
            el,
            { y: -d / 2 },
            { y: d / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
