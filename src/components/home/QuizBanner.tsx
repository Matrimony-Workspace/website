import Image from "next/image";
import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { Rich } from "@/components/layout/Rich";
import { PHOTOS } from "@/config/photos";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { HeartKnot } from "@/components/illustrations/Doodles";
import { Bloom, Petal, Sparkle } from "@/components/illustrations/Shapes";

/**
 * Final chapter before the footer: one emotional line ("We listen…"), then
 * one clear, free next step — take the Soul Compass personality quiz.
 */
export function QuizBanner({ lang }: { lang: Locale }) {
  const { closing: CLOSING_STATEMENT, quizCta: QUIZ_CTA, quizBanner: q } = getContent(lang);
  return (
    <section
      aria-labelledby="quiz-banner-title"
      className="bg-mist pb-24 pt-24 lg:pb-32 lg:pt-32"
    >
      <div className="shell">
        <p
          data-reveal
          className="mx-auto max-w-[900px] text-center font-display text-[26px] font-bold leading-8 tracking-[-0.02em] lg:text-[40px] lg:leading-[47px]"
        >
          {CLOSING_STATEMENT.text}
        </p>
        <p data-reveal className="mt-5 text-center">
          <SmoothLink
            href={CLOSING_STATEMENT.cta.href}
            className="text-link text-[18px] text-violet lg:text-[20px]"
          >
            {CLOSING_STATEMENT.cta.label} →
          </SmoothLink>
        </p>

        <div
          data-reveal
          className="relative mx-auto mt-16 grid max-w-[1180px] items-center lg:mt-20 gap-10 overflow-hidden rounded-[36px] bg-violet px-7 py-12 text-mist sm:px-12 lg:grid-cols-[1.618fr_1fr] lg:gap-16 lg:px-16 lg:py-16"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Bloom className="absolute -right-24 -top-28 w-[360px] text-violet-light/70" />
            <Petal className="absolute -bottom-20 left-[40%] w-[160px] rotate-[60deg] text-violet-light/50" />
            <Sparkle className="absolute left-[46%] top-10 w-5 text-rose" />
          </div>

          <div className="relative z-10 text-center lg:text-start">
            <p className="inline-flex items-center gap-2 rounded-full bg-mist/15 px-4 py-1.5 text-[14px] font-semibold leading-5">
              <Sparkle still className="h-3.5 w-3.5 text-rose" />
              {q.badge}
            </p>
            <h2
              id="quiz-banner-title"
              className="mt-5 font-display text-[34px] font-semibold leading-[38px] tracking-[-0.03em] lg:text-[52px] lg:leading-[56px]"
            >
              <Rich text={q.title} accentClassName="text-rose" />
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[18px] leading-[27px] text-mist/80 lg:mx-0 lg:text-[20px] lg:leading-[30px]">
              {q.body}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {q.chips.map(
                (c) => (
                  <li
                    key={c}
                    className="rounded-full bg-mist/15 px-3 py-1 text-[14px] font-semibold leading-5"
                  >
                    {c}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
              <SmoothLink href={QUIZ_CTA.href} className="btn bg-rose text-ink">
                <Sparkle still className="h-4 w-4" />
                {q.cta}
              </SmoothLink>
              <span className="text-[14px] text-mist/70">{QUIZ_CTA.meta}</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[300px]">
            <div className="mask-arch relative aspect-[1/1.618] overflow-hidden border-[6px] border-mist/20">
              <Image
                src={PHOTOS.heroCompass}
                alt={q.alt}
                fill
                sizes="300px"
                placeholder="blur"
                className="mask-arch object-cover object-[50%_60%]"
              />
            </div>
            <div className="absolute -left-6 bottom-10 rounded-2xl bg-mist px-4 py-3 text-ink shadow-[0_20px_40px_-20px_rgba(36,19,47,.6)] sm:-left-10">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">
                {q.resultLabel}
              </p>
              <p className="font-display text-[18px] font-bold">
                {q.resultValue}
              </p>
            </div>
            <HeartKnot className="absolute -right-4 -top-6 w-16 text-rose" />
          </div>
        </div>
      </div>
    </section>
  );
}
