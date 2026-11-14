"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n/client";
import { PHOTOS } from "@/config/photos";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import {
  MatchListCard,
  MatchProfileCard,
  StoryCard,
  type StepKey,
} from "./StoryCards";
import { LoopVideo } from "@/components/motion/LoopVideo";
import { ReadyBanner } from "./ReadyBanner";
import { Bloom, Petal, Sparkle } from "@/components/illustrations/Shapes";
import { ChaiCups, Marigold } from "@/components/illustrations/Doodles";

/** Builds a card's micro-animation from its `data-a` parts. */
function cardTimeline(el: Element) {
  const tl = gsap.timeline({ paused: true });
  el.querySelectorAll<HTMLElement>("[data-a]").forEach((n, i) => {
    const at = i === 0 ? 0 : "-=0.25";
    const d = n.dataset;
    switch (d.a) {
      case "type":
        tl.fromTo(
          n,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(14)" },
          at,
        );
        break;
      case "fill":
        tl.fromTo(
          n,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          at,
        );
        break;
      case "fade":
        tl.fromTo(
          n,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power1.out" },
          at,
        );
        break;
      case "pop":
        tl.fromTo(
          n,
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)" },
          at,
        );
        break;
      case "rise":
        tl.fromTo(
          n,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
          at,
        );
        break;
      case "spin":
        tl.fromTo(
          n,
          { rotation: -150, transformOrigin: "50% 50%" },
          {
            rotation: Number(d.rot ?? 0),
            duration: 1.2,
            ease: "elastic.out(1, 0.45)",
          },
          at,
        );
        break;
      case "fan":
        tl.fromTo(
          n,
          { x: 0, rotation: 0, y: 30, autoAlpha: 0 },
          {
            x: Number(d.x ?? 0),
            rotation: Number(d.rot ?? 0),
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          at,
        );
        break;
    }
  });
  return tl;
}

const STEP_PHOTO: Partial<Record<StepKey, (typeof PHOTOS)[keyof typeof PHOTOS]>> = {
  account: PHOTOS.step1,
  call: PHOTOS.step3,
};

const tape =
  "polygon(2% 8%, 12% 0, 30% 6%, 52% 0, 70% 5%, 88% 0, 100% 10%, 98% 50%, 100% 92%, 84% 100%, 62% 94%, 40% 100%, 20% 95%, 4% 100%, 0 70%, 2% 40%)";

function TapeLabel({ n, className }: { n: number; className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-block -rotate-3 bg-petal px-5 py-2 font-display text-[15px] font-bold uppercase tracking-[0.08em]",
        className,
      )}
      style={{ clipPath: tape }}
    >
      {t.story.step} {n}
    </span>
  );
}

/** White-bordered "polaroid" frame for a looping clip. */
function Polaroid({
  name,
  label,
  className,
}: {
  name: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_30px_60px_-30px_rgba(36,19,47,.5)] ring-1 ring-ink/5",
        className,
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-xl">
        <LoopVideo name={name} label={label} />
      </div>
    </div>
  );
}

/**
 * Step 4 — Hotplate "You fulfill orders without the stress": text centred,
 * product cards and looping clips scattered around it (stacked on mobile).
 */
function Finale({
  n,
  title,
  bullets,
}: {
  n: number;
  title: string;
  bullets: readonly string[];
}) {
  const { t } = useI18n();
  const c = t.story.clips;
  const abs = "lg:absolute";
  return (
    <div data-finale className="relative lg:h-[940px]">
      <div
        data-reveal
        className="relative z-10 mx-auto max-w-[440px] text-center lg:pt-[250px] lg:text-start"
      >
        <TapeLabel n={n} className="lg:ml-[62%]" />
        <h3 className="mt-4 font-display text-[30px] font-semibold leading-[34px] tracking-[-0.03em] lg:text-[44px] lg:leading-[48px]">
          {title}
        </h3>
        <ul className="mx-auto mt-5 max-w-md list-disc space-y-2 pl-5 text-start text-[18px] leading-[25px] text-ink/75">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap items-start justify-center gap-6 lg:mt-0 lg:block">
        <div data-parallax="40" className={cn(abs, "lg:left-0 lg:top-[90px]")}>
          <div data-piece>
            <MatchListCard />
          </div>
        </div>
        <div
          data-parallax="90"
          className={cn(abs, "lg:left-[60px] lg:top-[600px]")}
        >
          <div data-piece>
            <Polaroid
              name="wedding-knot"
              label={c.knot}
              className="h-[250px] w-[200px] -rotate-2"
            />
          </div>
        </div>
        <div
          data-parallax="70"
          className={cn(abs, "lg:right-[110px] lg:top-[30px]")}
        >
          <div data-piece>
            <Polaroid
              name="walking-hands"
              label={c.walk}
              className="h-[280px] w-[210px] rotate-2"
            />
          </div>
        </div>
        <div
          data-parallax="50"
          className={cn(abs, "lg:right-0 lg:top-[440px]")}
        >
          <div data-piece>
            <MatchProfileCard />
          </div>
        </div>
        <div
          data-parallax="110"
          className={cn(abs, "relative lg:left-[40%] lg:top-[650px]")}
        >
          <div data-piece className="relative">
            <Polaroid
              name="laughing-couple"
              label={c.laugh}
              className="h-[225px] w-[300px]"
            />
            <div className="absolute -bottom-6 left-1/2 flex w-[270px] -translate-x-1/2 items-start gap-2 lg:-left-[200px] lg:bottom-6 lg:translate-x-0">
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rose text-white shadow">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4 5h16v11H8l-4 4z" />
                </svg>
              </span>
              <p className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[14px] leading-5 shadow-[0_20px_40px_-24px_rgba(36,19,47,.5)]">
                <span className="font-semibold">{t.story.chat.from}</span>
                <br />
                {t.story.chat.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hand-drawn connector. Draws itself with scroll (scrubbed in StorySteps):
 * the line traces first, the arrowhead appears only when the line reaches it.
 * `flip` mirrors it so it always points at the next step's card.
 */
function Arrow({ flip }: { flip?: boolean }) {
  const line = {
    fill: "none",
    stroke: "#5B2A86",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  return (
    <>
      <svg
        data-arrow
        viewBox="0 0 1000 170"
        className={cn(
          "mx-auto hidden h-auto w-full max-w-[1000px] lg:block",
          flip && "-scale-x-100",
        )}
        aria-hidden
      >
        <path
          data-arrow-line
          pathLength={1000}
          {...line}
          d="M300 6 C 296 70, 330 120, 430 118 C 560 115, 640 70, 700 92 C 760 114, 772 140, 760 160"
        />
        <path
          data-arrow-head
          pathLength={1000}
          {...line}
          d="M744 146 L760 163 L776 144"
        />
      </svg>
      <svg
        data-arrow
        viewBox="0 0 60 110"
        className="mx-auto block h-24 w-14 lg:hidden"
        aria-hidden
      >
        <path
          data-arrow-line
          pathLength={1000}
          {...line}
          d="M30 4 C 8 30, 52 52, 30 78 C 22 88, 28 96, 30 102"
        />
        <path
          data-arrow-head
          pathLength={1000}
          {...line}
          d="M22 94 L30 104 L38 94"
        />
      </svg>
    </>
  );
}

export function StorySteps() {
  const { t } = useI18n();
  const STEPS = t.story.steps;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-step]", root.current)
          .forEach((step) => {
            const card = step.querySelector("[data-card]");
            const photo = step.querySelector("[data-photo]");
            const tl = card ? cardTimeline(card) : null;
            gsap.set(card, { y: 50, autoAlpha: 0 });
            if (photo)
              gsap.set(photo, { scale: 0.6, rotate: -12, autoAlpha: 0 });
            ScrollTrigger.create({
              trigger: step,
              start: "top 72%",
              once: true,
              onEnter: () => {
                gsap.to(card, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.9,
                  ease: "power3.out",
                });
                if (photo)
                  gsap.to(photo, {
                    scale: 1,
                    rotate: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "back.out(1.6)",
                    delay: 0.35,
                  });
                tl?.delay(0.4).play();
              },
            });
          });

        const finale = root.current?.querySelector("[data-finale]");
        if (finale) {
          const pieces = finale.querySelectorAll("[data-piece]");
          const tls = [...finale.querySelectorAll("[data-piece]")].map((p) =>
            cardTimeline(p),
          );
          gsap.set(pieces, { y: 60, autoAlpha: 0, scale: 0.92 });
          ScrollTrigger.create({
            trigger: finale,
            start: "top 70%",
            once: true,
            onEnter: () => {
              gsap.to(pieces, {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 1,
                stagger: 0.12,
                ease: "back.out(1.3)",
              });
              tls.forEach((t, j) => t.delay(0.5 + j * 0.12).play());
            },
          });
        }
      });
    },
    { scope: root },
  );

  // Arrows: draw from their own on-screen position, every frame. No trigger
  // measuring/refreshing and no dependency on the scroll library, so it behaves
  // the same in every browser. Progress eases toward the target (lerp), so the
  // line keeps visibly tracing after a fast trackpad flick.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const arrows = [...el.querySelectorAll<SVGSVGElement>("[data-arrow]")].map(
      (svg) => {
        const line = svg.querySelector<SVGPathElement>("[data-arrow-line]")!;
        const head = svg.querySelector<SVGPathElement>("[data-arrow-head]")!;
        for (const p of [line, head]) {
          p.style.strokeDasharray = "1000";
          p.style.strokeDashoffset = "1000";
        }
        return { svg, line, head, cur: 0 };
      },
    );
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      for (const a of arrows) {
        const r = a.svg.getBoundingClientRect();
        if (!r.width) continue; // the hidden (other-breakpoint) variant
        // 0 when the arrow's top is at 90% of the viewport, 1 when it reaches 30%
        const target = clamp((vh * 0.9 - r.top) / (vh * 0.6));
        a.cur += (target - a.cur) * 0.07;
        if (Math.abs(target - a.cur) < 0.0005) a.cur = target;
        const lineP = clamp(a.cur / 0.82); // line first…
        const headP = clamp((a.cur - 0.82) / 0.18); // …then the arrowhead
        a.line.style.strokeDashoffset = String(Math.round(1000 * (1 - lineP)));
        a.head.style.strokeDashoffset = String(Math.round(1000 * (1 - headP)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={root}
      id="how-it-works"
      aria-labelledby="story-title"
      className="relative scroll-mt-20 overflow-hidden bg-lilac py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-orchid"
      >
        <Bloom className="absolute -left-40 top-24 w-[380px]" />
        <Petal className="absolute -right-16 top-[38%] w-[200px] rotate-[30deg]" />
        <Petal className="absolute -left-10 top-[70%] w-[160px] -rotate-[20deg]" />
        <Sparkle className="absolute right-[12%] top-20 w-6 text-rose" />
        <Sparkle className="absolute left-[20%] top-[55%] w-4 text-violet/40" />
      </div>
      <div className="shell relative z-10">
        <div className="text-center">
          <p
            data-reveal
            className="inline-block rounded-full border border-ink/15 bg-mist px-4 py-1.5 text-[15px] font-semibold leading-5"
          >
            {t.story.eyebrow}
          </p>
          <div className="relative">
            <ChaiCups className="absolute -top-6 right-0 hidden w-32 text-violet lg:block xl:right-16" />
            <Marigold className="absolute -top-2 left-0 hidden w-20 text-violet lg:block xl:left-20" />
          </div>
          <h2
            id="story-title"
            data-reveal
            className="mt-5 font-display text-[36px] font-semibold leading-[40px] tracking-[-0.03em] lg:text-[56px] lg:leading-[60px]"
          >
            {t.story.title}
          </h2>
        </div>

        <ol className="mx-auto mt-16 max-w-[1100px] lg:mt-24">
          {STEPS.map((s, i) => {
            const photo = STEP_PHOTO[s.key as StepKey];
            const flip = i % 2 === 1;
            return (
              <li key={s.key}>
                {s.key === "match" ? (
                  <Finale n={i + 1} title={s.title} bullets={s.bullets} />
                ) : (
                  <div
                    data-step
                    className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
                  >
                    {/* text */}
                    <div
                      data-reveal
                      className={cn(
                        "text-center lg:text-start",
                        flip && "lg:order-2",
                      )}
                    >
                      <TapeLabel n={i + 1} />
                      <h3 className="mt-4 font-display text-[30px] font-semibold leading-[34px] tracking-[-0.03em] lg:text-[44px] lg:leading-[48px]">
                        {s.title}
                      </h3>
                      <ul className="mx-auto mt-5 max-w-md list-disc space-y-2 pl-5 text-start text-[18px] leading-[25px] text-ink/75 lg:mx-0">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    {/* visual */}
                    <div
                      className={cn(
                        "relative flex justify-center",
                        flip && "lg:order-1",
                      )}
                    >
                      <div data-card className="flex w-full justify-center">
                        <StoryCard k={s.key as StepKey} />
                      </div>
                      {photo && (
                        <div
                          data-photo
                          className={cn(
                            "absolute -top-10 h-32 w-24 overflow-hidden mask-arch border-[6px] border-lilac sm:h-44 sm:w-32",
                            flip ? "-left-1 sm:left-0" : "-right-1 sm:right-0",
                          )}
                        >
                          <Image
                            src={photo}
                            alt={t.story.photoAlts[s.key as "account" | "call"]}
                            fill
                            sizes="144px"
                            className="mask-arch object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {i < STEPS.length - 1 && (
                  <div className="py-8 lg:py-4">
                    {/* points toward the next step's card */}
                    <Arrow flip={!flip} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <ReadyBanner />
      </div>
    </section>
  );
}
