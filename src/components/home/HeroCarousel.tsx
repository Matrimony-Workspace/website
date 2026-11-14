"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useI18n } from "@/i18n/client";
import { LOCALE_LABELS } from "@/i18n/config";
import { PHOTOS } from "@/config/photos";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { ChevronLeft, ChevronRight } from "@/components/illustrations/Icons";

const DELAY = 7000;

/** Split into user-perceived characters so Devanagari conjuncts / Urdu ligatures never render half-typed. */
const seg = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
const graphemes = (str: string) => (seg ? [...seg.segment(str)].map((g) => g.segment) : Array.from(str));
const TYPE_MS = 42;

/**
 * Relate hero: full-bleed photo, white headline that types itself with a caret,
 * white sub-line. Ours rotates (brief: autoplay carousel, dots + chevrons).
 */
export function HeroCarousel() {
  const { t, locale } = useI18n();
  const rtl = LOCALE_LABELS[locale].dir === "rtl";
  const HERO_SLIDES = t.heroSlides;
  const reduce = useReducedMotion();
  const [plugins] = useState(() => [
    Autoplay({
      delay: DELAY,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  ]);
  const [viewport, api] = useEmblaCarousel(
    { loop: true, duration: 30, direction: rtl ? "rtl" : "ltr" },
    plugins,
  );
  const [selected, setSelected] = useState(0);
  const [typed, setTyped] = useState<number | null>(null); // null = show full text (SSR / reduced motion)
  const [held, setHeld] = useState(false);
  const [cycle, setCycle] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const play = useCallback((i: number) => {
    window.clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return setTyped(null);
    const total = graphemes(HERO_SLIDES[i].typed).length;
    let n = 0;
    setTyped(0);
    timer.current = window.setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= total) window.clearInterval(timer.current);
    }, TYPE_MS);
    const el = slidesRef.current[i];
    if (el) {
      gsap.fromTo(
        el.querySelectorAll("[data-anim]"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: total * (TYPE_MS / 1000) * 0.6,
          overwrite: true,
        },
      );
      gsap.fromTo(
        el.querySelector("img"),
        { scale: 1.08 },
        { scale: 1, duration: 7, ease: "none", overwrite: true },
      );
    }
  }, [HERO_SLIDES]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const i = api.selectedScrollSnap();
      setSelected(i);
      setCycle((c) => c + 1);
      play(i);
    };
    api.on("select", onSelect);
    const raf = requestAnimationFrame(() => play(0));
    return () => {
      api.off("select", onSelect);
      cancelAnimationFrame(raf);
      window.clearInterval(timer.current);
    };
  }, [api, play]);

  useEffect(() => {
    const ap = api?.plugins().autoplay;
    if (!ap) return;
    if (reduce) ap.stop();
    else ap.play();
  }, [api, reduce]);

  const resume = () => {
    setHeld(false);
    setCycle((c) => c + 1);
  };

  return (
    <div
      data-hero-overlay
      className="relative z-10 bg-ink"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.ui.highlights}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && resume()}
      onFocus={() => setHeld(true)}
      onBlur={(e) =>
        !e.currentTarget.contains(e.relatedTarget as Node) && resume()
      }
    >
      <div ref={viewport} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {HERO_SLIDES.map((s, i) => {
            const chars = graphemes(s.typed);
            const shown = i === selected && typed !== null ? chars.slice(0, typed).join("") : s.typed;
            const rest = i === selected && typed !== null ? chars.slice(typed).join("") : "";
            return (
              <div
                key={s.typed}
                ref={(el) => {
                  slidesRef.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${HERO_SLIDES.length}`}
                inert={i !== selected}
                className="relative h-[620px] min-w-0 shrink-0 grow-0 basis-full overflow-hidden sm:h-[640px] lg:h-[min(84vh,760px)] lg:min-h-[640px]"
              >
                <Image
                  src={PHOTOS[s.photo]}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  placeholder="blur"
                  className="object-cover"
                  style={{ objectPosition: s.focus }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,19,47,.62)_0%,rgba(36,19,47,.25)_55%,rgba(36,19,47,0)_80%)] max-lg:bg-[linear-gradient(0deg,rgba(36,19,47,.75)_0%,rgba(36,19,47,.2)_60%,rgba(36,19,47,.35)_100%)]" />
                <div className="shell relative flex h-full flex-col justify-end pb-40 pt-[var(--header-h)] text-mist lg:justify-center lg:pb-24">
                  <p
                    className="max-w-[13ch] font-display text-[40px] font-semibold leading-[44px] tracking-[-0.03em] sm:text-[52px] sm:leading-[56px] lg:text-[64px] lg:leading-[68px]"
                    aria-label={s.typed}
                  >
                    <span aria-hidden>
                      {shown}
                      <span className="caret" />
                      {/* reserves the untyped remainder so the layout doesn't jump */}
                      <span className="invisible">
                        {rest}
                      </span>
                    </span>
                  </p>
                  <p
                    data-anim
                    className="mt-6 font-display text-[24px] font-semibold leading-[30px] tracking-[-0.02em] sm:text-[34px] sm:leading-[40px] lg:mt-10 lg:text-[46px] lg:leading-[54px]"
                  >
                    {s.sub}
                  </p>
                  <div data-anim className="mt-6 lg:mt-8">
                    <SmoothLink
                      href={s.cta.href}
                      className="btn bg-rose text-ink"
                    >
                      {s.cta.label}
                    </SmoothLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* controls: chevron · dots · chevron */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 lg:bottom-[120px]">
        <div className="shell flex items-center gap-4 text-mist">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label={t.ui.prev}
            className="grid h-11 w-11 place-items-center rounded-full border border-mist/70 transition hover:bg-mist hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label={t.ui.choose}>
            {HERO_SLIDES.map((s, i) => {
              const active = i === selected;
              return (
                <button
                  key={s.typed}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`${t.ui.goTo} ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "relative h-2.5 overflow-hidden rounded-full transition-all duration-500",
                    active
                      ? "w-12 bg-mist/35"
                      : "w-2.5 bg-mist/60 hover:bg-mist",
                  )}
                >
                  {active && (
                    <span
                      key={cycle}
                      className="absolute inset-0 origin-left rounded-full bg-mist"
                      style={{
                        animation: reduce
                          ? "none"
                          : `dot-progress ${DELAY}ms linear forwards`,
                        animationPlayState: held ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label={t.ui.next}
            className="grid h-11 w-11 place-items-center rounded-full border border-mist/70 transition hover:bg-mist hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
