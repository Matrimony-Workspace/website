import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/*
 * Decorative background shapes — the wedding vocabulary (petal, bloom,
 * mandap arch, sparkle) in place of plain circles. Purely visual: aria-hidden.
 * Colour comes from `currentColor` (set a text-* class).
 */

type P = { className?: string; style?: CSSProperties; /** px of scroll drift */ float?: number };

export function Petal({ className, style, float }: P) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 100 160" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <path d="M50 0C94 40 94 120 50 160 6 120 6 40 50 0Z" fill="currentColor" />
    </svg>
  );
}

/** Eight-petal bloom (marigold / lotus read). */
export function Bloom({ className, style, float }: P) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 200 200" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <g fill="currentColor">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} cx="100" cy="100" rx="34" ry="92" transform={`rotate(${r} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

/** Mandap / temple arch silhouette. */
export function Arch({ className, style, float, outline = false }: P & { outline?: boolean }) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 180 240" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <path
        d="M6 240V96C6 46 46 6 90 6s84 40 84 90v144"
        fill={outline ? "none" : "currentColor"}
        stroke={outline ? "currentColor" : "none"}
        strokeWidth={outline ? 3 : 0}
      />
    </svg>
  );
}

/** `still` = UI use (buttons, marquee): no scroll drift. */
export function Sparkle({ className, style, float, still }: P & { still?: boolean }) {
  return (
    <svg data-float={still ? undefined : (float ?? "")} viewBox="0 0 24 24" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
    </svg>
  );
}

/** A loose thread with a love-knot loop. */
export function Thread({ className, style, float }: P) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 600 140" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <path
        d="M2 110C90 120 150 40 230 60c60 15 40 70 0 58-40-12-10-80 60-82 90-3 150 90 308 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
