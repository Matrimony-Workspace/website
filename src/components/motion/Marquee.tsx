"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  /** Ease down to `slowScale` speed while hovered / touched / focused. */
  slowOnHover?: boolean;
  slowScale?: number;
  /**
   * Speed up with scroll velocity (and follow scroll direction), then ease
   * back to resting speed when scrolling stops.
   */
  scrollBoost?: boolean;
  /** Show a pause/play toggle (WCAG 2.2.2 for long-running motion). */
  pausable?: boolean;
  /** Marquees sharing a group pause/play together from one toggle. */
  group?: string;
  label?: string;
  className?: string;
  trackClassName?: string;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  slowOnHover = false,
  slowScale = 0.15,
  scrollBoost = false,
  pausable = false,
  group,
  label,
  className,
  trackClassName,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector("[data-track]");
        if (!track) return;
        const tw = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );
        tween.current = tw;

        let st: ScrollTrigger | undefined;
        if (scrollBoost) {
          let dir = 1;
          st = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (tw.paused()) return;
              const v = self.getVelocity(); // px/s
              dir = v < 0 ? -1 : 1;
              const boost = Math.min(Math.abs(v) / 220, 8); // up to ~9× speed
              gsap.to(tw, {
                timeScale: dir * (1 + boost),
                duration: 0.25,
                ease: "power2.out",
                overwrite: true,
                onComplete: () => {
                  gsap.to(tw, { timeScale: dir, duration: 1.2, ease: "power2.out", overwrite: true });
                },
              });
            },
          });
        }

        return () => {
          st?.kill();
          tween.current = null;
        };
      });
    },
    { scope: root, dependencies: [duration, reverse, scrollBoost] },
  );

  const setSpeed = (ts: number) => {
    if (!slowOnHover || !tween.current) return;
    gsap.to(tween.current, { timeScale: ts, duration: 0.9, ease: "power2.out", overwrite: true });
  };

  useEffect(() => {
    if (!group) return;
    const on = (e: Event) => {
      const { group: g, paused: p } = (e as CustomEvent<{ group: string; paused: boolean }>).detail;
      if (g !== group) return;
      setPaused(p);
      if (p) tween.current?.pause();
      else tween.current?.play();
    };
    window.addEventListener("marquee-pause", on);
    return () => window.removeEventListener("marquee-pause", on);
  }, [group]);

  const toggle = () => {
    const next = !paused;
    if (group) {
      window.dispatchEvent(new CustomEvent("marquee-pause", { detail: { group, paused: next } }));
      return;
    }
    if (next) tween.current?.pause();
    else tween.current?.play();
    setPaused(next);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={root}
        role={label ? "region" : undefined}
        aria-label={label}
        className="overflow-hidden motion-reduce:overflow-x-auto"
        onPointerEnter={() => setSpeed(slowScale)}
        onPointerLeave={() => setSpeed(1)}
        onFocus={() => setSpeed(slowScale)}
        onBlur={() => setSpeed(1)}
      >
        <div data-track className={cn("flex w-max will-change-transform", trackClassName)}>
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0 motion-reduce:hidden" aria-hidden inert>
            {children}
          </div>
        </div>
      </div>
      {pausable && (
        <button
          type="button"
          onClick={toggle}
          className="absolute -top-14 right-4 hidden h-10 w-10 items-center justify-center rounded-full border border-ink/30 bg-white text-ink transition hover:bg-ink hover:text-mist motion-safe:inline-flex sm:right-6 lg:right-8"
          aria-label={paused ? "Play stories" : "Pause stories"}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </div>
  );
}
