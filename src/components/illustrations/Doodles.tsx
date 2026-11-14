import { cn } from "@/lib/cn";

/*
 * Light, single-line doodles (original drawings in the popular one-line style).
 * Stroke-only, `currentColor`, 1.75px. Always fully visible; they only drift with scroll.
 */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** A heart tied off with a loose thread. */
export function HeartKnot({ className, float }: { className?: string; float?: number }) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 140 170" className={cn("pointer-events-none", className)} aria-hidden>
      <path
        {...stroke}
        d="M70 104C30 78 14 52 28 34c12-15 32-12 42 6 10-18 30-21 42-6 14 18-2 44-42 70zm0 0c-2 14-14 20-24 28-12 10-6 26 8 22 12-4 10-20-2-20-14 0-22 14-18 30"
      />
    </svg>
  );
}

/** Two chai cups; the steam meets in a heart. */
export function ChaiCups({ className, float }: { className?: string; float?: number }) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 160 140" className={cn("pointer-events-none", className)} aria-hidden>
      <g {...stroke}>
        <path d="M14 92h46v10c0 18-46 18-46 0zm46 4c10 0 10 12 0 12M100 92h46v10c0 18-46 18-46 0zm0 4c-10 0-10 12 0 12" />
        <path d="M37 86c-8-10 8-16 0-28 0-12 14-18 22-8 2 3 3 6 3 9 0-3 1-6 3-9 8-10 22-4 22 8 0 16-25 28-25 28m35-22c8 10-8 16 0 28" />
      </g>
    </svg>
  );
}

/** Marigold bloom on a stem. */
export function Marigold({ className, float }: { className?: string; float?: number }) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 120 170" className={cn("pointer-events-none", className)} aria-hidden>
      <g {...stroke}>
        <path
          d="M60 22c6-10 18-6 16 4 10-4 18 6 10 14 10 2 10 16 0 18 8 8 0 18-10 14 2 10-10 14-16 4-6 10-18 6-16-4-10 4-18-6-10-14-10-2-10-16 0-18-8-8 0-18 10-14-2-10 10-14 16-4z"
        />
        <path d="M60 48c-6 0-8 8-2 10 6 2 10-6 4-10" />
        <path d="M60 76c2 30-4 56 0 90M60 120c-14-14-34-10-38 0 14 6 28 6 38 0z" />
      </g>
    </svg>
  );
}

/** Two speech bubbles sharing a small heart. */
export function Bubbles({ className, float }: { className?: string; float?: number }) {
  return (
    <svg data-float={float ?? ""} viewBox="0 0 170 130" className={cn("pointer-events-none", className)} aria-hidden>
      <g {...stroke}>
        <path d="M12 20c0-8 6-14 14-14h62c8 0 14 6 14 14v34c0 8-6 14-14 14H44l-18 16 2-16h-2c-8 0-14-6-14-14z" />
        <path d="M78 52h66c8 0 14 6 14 14v28c0 8-6 14-14 14h-2l2 16-18-16H92c-8 0-14-6-14-14" />
        <path d="M118 74c-4-6-12-3-10 3 1 4 10 9 10 9s9-5 10-9c2-6-6-9-10-3z" />
      </g>
    </svg>
  );
}
