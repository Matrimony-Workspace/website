import Image from "next/image";
import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { PHOTOS } from "@/config/photos";
import { Rich } from "@/components/layout/Rich";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { Bubbles, Marigold } from "@/components/illustrations/Doodles";
import { Bloom, Petal, Sparkle } from "@/components/illustrations/Shapes";

/*
 * "Being single is the perfect time to grow" — a golden-ratio bento.
 *
 *   ┌──────────────────────┬──────────┐   container φ:1 (1.618)
 *   │ 1 know   (φ : 1)     │ 2 call   │   cols  φ : 1
 *   ├─────────────┬────────┤  (1 : φ) │   rows  1 : 1/φ
 *   │ 3 match φ:1 │ 4  1:1 │          │   row 2 col 1 → φ : 1 again
 *   └─────────────┴────────┴──────────┘
 *
 * Every card is a golden rectangle or a square. Below lg the grid relaxes to
 * stacked cards that keep golden aspect ratios where content allows.
 */

function Chip({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[13px] font-semibold leading-5 ${dark ? "bg-mist/15 text-mist" : "bg-white/70 text-ink"}`}
    >
      {children}
    </span>
  );
}

export function GrowBento({ lang }: { lang: Locale }) {
  const { bento: BENTO, grow: GROW } = getContent(lang);
  const { know, call, match, learn } = BENTO;
  return (
    <section
      aria-labelledby="grow-title"
      className="relative overflow-hidden bg-mist py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-lilac"
      >
        <Petal className="absolute -left-16 top-24 w-[220px] -rotate-[25deg]" />
        <Bloom className="absolute -right-28 bottom-10 w-[320px]" />
        <Sparkle className="absolute right-[18%] top-24 w-6 text-rose" />
      </div>

      <div className="shell relative z-10">
        <div className="mx-auto max-w-[820px] text-center">
          <p
            data-reveal
            className="inline-block rounded-full border border-ink/15 bg-white px-4 py-1.5 text-[15px] font-semibold leading-5"
          >
            {GROW.eyebrow}
          </p>
          <h2
            id="grow-title"
            data-reveal
            className="mt-5 font-display text-[34px] font-semibold leading-[38px] tracking-[-0.03em] lg:text-[56px] lg:leading-[60px]"
          >
            <Rich text={GROW.title} accentClassName="text-violet" />
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 max-w-[620px] text-[18px] leading-[27px] text-ink/75 lg:text-[20px] lg:leading-[30px]"
          >
            {GROW.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[1180px] lg:mt-20">
          <div className="grid gap-4 lg:aspect-[1.618/1] lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[1fr_0.618fr] lg:gap-5">
            {/* 1 — Know yourself (φ : 1) */}
            <article
              id={know.id}
              data-reveal
              className="relative grid scroll-mt-28 overflow-hidden rounded-[28px] bg-lilac p-7 sm:grid-cols-[1.618fr_1fr] sm:gap-6 lg:p-10"
            >
              <div className="relative z-10 flex flex-col">
                <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-violet">
                  {know.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[32px] font-semibold leading-[36px] tracking-[-0.03em] lg:text-[46px] lg:leading-[50px]">
                  {know.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[17px] leading-[26px] text-ink/75 lg:text-[19px] lg:leading-[29px]">
                  {know.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {know.chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
                <div className="mt-6 lg:mt-auto lg:pt-6">
                  <SmoothLink
                    href={know.cta.href}
                    className="btn bg-violet text-mist"
                  >
                    <Sparkle still className="h-4 w-4 text-rose" />
                    {know.cta.label}
                  </SmoothLink>
                </div>
              </div>
              <div className="mask-arch relative mt-6 hidden aspect-[1/1.618] overflow-hidden sm:mt-0 sm:block">
                <Image
                  src={PHOTOS[know.photo]}
                  alt={know.alt}
                  fill
                  sizes="(min-width:1024px) 280px, 40vw"
                  placeholder="blur"
                  className="mask-arch object-cover"
                />
              </div>
              <Marigold className="absolute -bottom-6 right-[36%] hidden w-16 text-violet/50 lg:block" />
            </article>

            {/* 2 — Free consultation call (1 : φ, tall) */}
            <article
              id={call.id}
              data-reveal
              className="relative flex scroll-mt-28 flex-col overflow-hidden rounded-[28px] bg-violet p-7 text-mist lg:row-span-2 lg:p-9"
            >
              <div className="mask-arch relative aspect-[1.618/1] w-full overflow-hidden lg:aspect-auto lg:flex-[1.618]">
                <Image
                  src={PHOTOS[call.photo]}
                  alt={call.alt}
                  fill
                  sizes="(min-width:1024px) 420px, 90vw"
                  placeholder="blur"
                  className="mask-arch object-cover"
                />
              </div>
              <div className="mt-6 flex flex-col lg:flex-1">
                <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-rose">
                  {call.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-[28px] font-semibold leading-[32px] tracking-[-0.03em] lg:text-[34px] lg:leading-[38px]">
                  {call.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[24px] text-mist/80">
                  {call.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {call.chips.map((c) => (
                    <Chip key={c} dark>
                      {c}
                    </Chip>
                  ))}
                </div>
                <div className="mt-6 lg:mt-auto lg:pt-5">
                  <SmoothLink
                    href={call.cta.href}
                    className="btn bg-rose text-ink"
                  >
                    {call.cta.label}
                  </SmoothLink>
                </div>
              </div>
            </article>

            {/* row 2, col 1 — splits again into φ : 1 */}
            <div className="grid gap-4 sm:grid-cols-[1.618fr_1fr] lg:gap-5">
              {/* 3 — Find partners (φ : 1) */}
              <article
                id={match.id}
                data-reveal
                className="relative flex scroll-mt-28 flex-col justify-between overflow-hidden rounded-[28px] bg-petal p-7 lg:p-8"
              >
                <div className="flex items-center">
                  {match.people.map((k, i) => (
                    <span
                      key={k}
                      className="relative -ml-3 h-12 w-12 overflow-hidden rounded-full border-[3px] border-petal first:ml-0 lg:h-14 lg:w-14"
                      style={{ zIndex: match.people.length - i }}
                    >
                      <Image
                        src={PHOTOS[k]}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                  <span className="ml-3 whitespace-nowrap rounded-full bg-violet px-2.5 py-1 text-[13px] font-semibold text-mist">
                    {match.harmony}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-[26px] font-semibold leading-[30px] tracking-[-0.03em] lg:text-[30px] lg:leading-[34px]">
                    {match.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[22px] text-ink/75">
                    {match.body}
                  </p>
                  <SmoothLink
                    href={match.cta.href}
                    className="text-link mt-3 inline-block text-[16px]"
                  >
                    {match.cta.label} →
                  </SmoothLink>
                </div>
              </article>

              {/* 4 — Webinars & workshops (1 : 1) */}
              <article
                id={learn.id}
                data-reveal
                className="relative flex aspect-[1.618/1] scroll-mt-28 flex-col justify-between overflow-hidden rounded-[28px] bg-blush p-7 sm:aspect-auto lg:p-8"
              >
                <span id="webinars" className="absolute -top-28" aria-hidden />
                <Bubbles className="absolute -right-3 -top-2 w-24 text-violet/70" />
                <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-[13px] font-semibold">
                  {learn.next}
                </span>
                <div>
                  <h3 className="font-display text-[26px] font-semibold leading-[30px] tracking-[-0.03em] lg:text-[28px] lg:leading-[32px]">
                    {learn.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-[22px] text-ink/75">
                    {learn.body}
                  </p>
                  <SmoothLink
                    href={learn.cta.href}
                    className="text-link mt-3 inline-block text-[16px]"
                  >
                    {learn.cta.label} →
                  </SmoothLink>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
