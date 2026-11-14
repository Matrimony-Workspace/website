import Image from "next/image";
import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { PHOTOS } from "@/config/photos";
import { Marquee } from "@/components/motion/Marquee";
import { HeartKnot } from "@/components/illustrations/Doodles";
import { Petal, Sparkle } from "@/components/illustrations/Shapes";

/** Blush stories band: left-aligned h2, arch-topped photo cards, slow-on-hover marquee. */
export function Testimonials({ lang }: { lang: Locale }) {
  const { testimonials: TESTIMONIALS, testimonialsUi: ui } = getContent(lang);
  return (
    <section
      aria-labelledby="stories-title"
      className="relative overflow-hidden bg-blush pb-24 lg:pb-32"
    >
      <div className="h-2 bg-rose" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-petal"
      >
        <Petal className="absolute -right-12 top-10 w-[220px] rotate-[24deg]" />
        <Petal className="absolute left-[38%] -bottom-24 w-[200px] -rotate-[60deg]" />
        <Sparkle className="absolute right-[24%] top-24 w-5 text-rose" />
      </div>
      <div className="shell relative z-10 mt-16 lg:mt-20">
        <HeartKnot className="absolute -top-4 right-6 hidden w-20 text-violet md:block lg:right-24" />
        <h2
          id="stories-title"
          data-reveal
          className="font-display text-[30px] font-semibold leading-9 tracking-[-0.02em] lg:text-[40px] lg:leading-[47px]"
        >
          {ui.title}
        </h2>
        <p data-reveal className="mt-3 max-w-xl text-[18px] leading-[25px]">
          {ui.hint}
        </p>
      </div>

      <div className="relative z-10 mt-20" data-reveal>
        <Marquee
          duration={70}
          slowOnHover
          pausable
          group="stories"
          label={ui.label}
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.names}
              className="mx-4 w-[280px] shrink-0 sm:w-[340px] lg:mx-5 lg:w-[368px]"
            >
              <div className="relative aspect-[368/320] overflow-hidden rounded-t-[160px]">
                <Image
                  src={PHOTOS[t.photo]}
                  alt=""
                  fill
                  sizes="368px"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <p className="font-display text-[24px] font-semibold leading-7 tracking-[-0.02em] lg:text-[28px] lg:leading-8">
                  {t.names}
                </p>
                <p className="mt-1 text-[14px] font-semibold leading-5 text-ink/70">
                  {t.city} · {t.tag}
                </p>
              </figcaption>
              <blockquote className="mt-3 text-[16px] leading-6">
                “{t.quote}”
              </blockquote>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
