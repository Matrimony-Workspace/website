import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { Marquee } from "@/components/motion/Marquee";
import { Sparkle } from "@/components/illustrations/Shapes";

/**
 * Wavy ribbon that tucks under the hero photo and carries the value pillars
 * (layered waves: a translucent petal crest, the solid ribbon, a lilac lip
 * that melts into the next band).
 */
export function PillarRibbon({ lang }: { lang: Locale }) {
  const { pillars: PILLARS, pillarsLabel } = getContent(lang);
  return (
    <section
      aria-label={pillarsLabel}
      className="relative z-10 -mt-16 h-[170px] lg:-mt-24 lg:h-[230px]"
    >
      <svg
        viewBox="0 0 1440 230"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <path
          d="M0 34C330 -6 820 92 1440 12V62C900 112 420 30 0 76Z"
          fill="#F9C6D8"
          opacity="0.55"
        />
        <path
          d="M0 58C380 18 900 112 1440 34V176C1010 226 470 140 0 200Z"
          fill="#F9C6D8"
        />
        <path d="M0 214C420 156 980 242 1440 186V230H0Z" fill="#EBE0FB" />
        <path
          d="M0 200C470 140 1010 226 1440 176V196C990 236 440 160 0 218Z"
          fill="#FBF8FE"
          opacity="0.7"
        />
      </svg>
      <div className="absolute inset-x-0 top-[44%] -translate-y-1/2 lg:top-[48%]">
        <Marquee duration={40} scrollBoost label={pillarsLabel}>
          {PILLARS.map((p) => (
            <span
              key={p}
              className="mx-6 inline-flex items-center gap-12 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink lg:mx-9 lg:text-[30px]"
            >
              {p}
              <Sparkle still className="h-4 w-4 text-violet" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
