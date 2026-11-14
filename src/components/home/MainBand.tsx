import Image from "next/image";
import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { PHOTOS } from "@/config/photos";
import { Rich } from "@/components/layout/Rich";
import { CountUp } from "@/components/motion/CountUp";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { ArrowRight } from "@/components/illustrations/Icons";
import {
  Arch,
  Bloom,
  Petal,
  Sparkle,
  Thread,
} from "@/components/illustrations/Shapes";
import { Bubbles, HeartKnot } from "@/components/illustrations/Doodles";

/** Main lilac band: petals, blooms and arches drift behind statement, cards, stats and CTAs. */
export function MainBand({ lang }: { lang: Locale }) {
  const { audiences: AUDIENCES, audienceIntro: AUDIENCE_INTRO, statement: STATEMENT, stats: STATS } = getContent(lang);
  return (
    <section className="relative overflow-hidden bg-lilac pb-20 lg:pb-28">
      {/* Decorative shapes — petals, blooms, arch, sparkles (scroll-driven drift + turn) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-orchid"
      >
        <div
          data-parallax="140"
          className="absolute -right-24 -top-28 w-[300px] lg:-right-10 lg:w-[420px]"
        >
          <Petal className="w-full rotate-[28deg]" />
        </div>
        <div
          data-parallax="90"
          className="absolute -left-40 top-[30%] w-[420px] opacity-70 lg:-left-32 lg:w-[560px]"
        >
          <Bloom className="w-full" />
        </div>
        <div
          data-parallax="120"
          className="absolute -right-16 top-[58%] w-[220px] lg:right-[4%] lg:w-[300px]"
        >
          <Arch className="w-full" />
        </div>
        <div
          data-parallax="70"
          className="absolute left-[8%] top-[78%] w-[160px] lg:w-[220px]"
        >
          <Petal className="w-full -rotate-[35deg]" />
        </div>
        <Sparkle className="absolute left-[12%] top-[6%] w-6 text-violet/40" />
        <Sparkle className="absolute right-[18%] top-[36%] w-4 text-rose" />
        <Sparkle className="absolute left-[46%] top-[62%] w-5 text-violet/30" />
        <Sparkle className="absolute right-[30%] top-[88%] w-6 text-rose/70" />
      </div>

      <div className="shell relative z-10">
        {/* Statement */}
        <HeartKnot className="absolute left-2 top-10 hidden w-24 text-violet lg:left-10 lg:block xl:left-24" />
        <p
          data-reveal
          className="mx-auto max-w-[900px] pt-16 text-center font-display text-[26px] font-bold leading-8 tracking-[-0.02em] lg:pt-24 lg:text-[40px] lg:leading-[47px]"
        >
          {STATEMENT}
        </p>

        {/* Who it's for (brief: hero row 2 cards) */}
        <div className="mx-auto mt-16 max-w-[1240px] lg:mt-24">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <h1
              data-reveal
              className="font-display text-[34px] font-semibold leading-[38px] tracking-[-0.02em] lg:text-[48px] lg:leading-[52px]"
            >
              <Rich text={AUDIENCE_INTRO.title} accentClassName="text-violet" />
            </h1>
            <p
              data-reveal
              className="text-[18px] leading-[27px] lg:text-[20px] lg:leading-[30px]"
            >
              {AUDIENCE_INTRO.body}
            </p>
          </div>
          {/* Odd cards sit up, even cards sit down (staggered rhythm) */}
          <ul className="mt-10 grid grid-cols-2 items-start gap-3 pb-10 sm:gap-5 lg:grid-cols-4 lg:pb-16">
            {AUDIENCES.map((a) => (
              <li
                key={a.label}
                data-reveal
                className="even:mt-10 [filter:drop-shadow(0_22px_26px_rgba(36,19,47,.16))] lg:even:mt-16"
              >
                <SmoothLink
                  href={a.href}
                  className="group block h-full isolate overflow-hidden [border-radius:50%_50%_28px_28px/34%_34%_28px_28px] [mask-image:linear-gradient(#000,#000)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5"
                >
                  <span className="relative block aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
                    <Image
                      src={PHOTOS[a.photo]}
                      alt={a.alt}
                      fill
                      sizes="(min-width:1024px) 300px, 50vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                    />
                  </span>
                  <span
                    className="block px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
                    style={{ background: a.bg, color: a.fg }}
                  >
                    <span className="block text-[13px] font-semibold leading-5 sm:text-[14px]">
                      {AUDIENCE_INTRO.explore}
                    </span>
                    <span className="mt-1 flex items-center gap-2 font-display text-[22px] font-semibold leading-7 tracking-[-0.02em] sm:text-[28px] sm:leading-8">
                      {a.label}
                      <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" />
                    </span>
                  </span>
                </SmoothLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Stats (value pillars live in <PillarRibbon/> under the hero) */}
      <div className="shell relative z-10">
        <Bubbles className="absolute right-4 top-16 hidden w-28 text-violet lg:block xl:right-16" />
        <ul className="mx-auto mt-24 grid max-w-[1000px] gap-10 text-center sm:grid-cols-3">
          {STATS.map((s) => (
            <li key={s.label} data-reveal>
              <CountUp
                to={s.value}
                suffix={s.suffix}
                className="block font-display text-[48px] font-bold leading-none tracking-[-0.03em] text-violet tabular-nums lg:text-[64px]"
              />
              <span className="mt-2 block text-[18px] leading-[25px]">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        <Thread className="mx-auto mt-14 block w-full max-w-[560px] text-violet/60" />
      </div>
    </section>
  );
}
