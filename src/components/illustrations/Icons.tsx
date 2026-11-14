import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const HEART_D =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.1c2.1-.2 4 .9 5.6 2.9 1.6-2 3.5-3.1 5.6-2.9 3.7.4 5.5 4.3 4 7.7C19.5 16.4 12 21 12 21z";
export const SPARKLE_D = "M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z";

export const ArrowRight = (p: P) => (
  <svg {...base} data-dir-icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base} data-dir-icon {...p}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base} data-dir-icon {...p}><path d="M9 6l6 6-6 6" /></svg>
);
export const Close = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Heart = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}><path d={HEART_D} fill="currentColor" /></svg>
);
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}><path d={SPARKLE_D} fill="currentColor" /></svg>
);
export const Check = (p: P) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Quote = (p: P) => (
  <svg viewBox="0 0 32 32" aria-hidden {...p}>
    <path fill="currentColor" d="M13 8C7.5 9.6 4 13.6 4 19.2V25h9v-9H8.6c.4-3 2.3-5 5.4-6.1L13 8zm15 0c-5.5 1.6-9 5.6-9 11.2V25h9v-9h-4.4c.4-3 2.3-5 5.4-6.1L28 8z" />
  </svg>
);

const PILLAR_PATHS: Record<string, string> = {
  shield: "M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z M9 12l2 2 4-4",
  lock: "M7 11V8a5 5 0 0110 0v3 M5 11h14v10H5z M12 15v2",
  gift: "M4 10h16v11H4z M2 7h20v3H2z M12 7v14 M12 7c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z",
  home: "M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-5h4v5",
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18z M15.5 8.5l-2 5-5 2 2-5 5-2z",
  spark: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5L18 18 M6 18l2.5-2.5 M15.5 8.5L18 6",
};

export const PillarIcon = ({ name, ...p }: P & { name: string }) => (
  <svg {...base} {...p}><path d={PILLAR_PATHS[name] ?? PILLAR_PATHS.spark} /></svg>
);

/** Apple / Google Play glyphs (Simple Icons, CC0). */
export const AppleGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
    />
  </svg>
);
export const PlayGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="#34A853" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z" />
    <path fill="#FBBC04" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" />
    <path fill="#4285F4" d="M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z" />
    <path fill="#EA4335" d="M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
);
