import Image from "next/image";
import type { ReactNode } from "react";
import { PHOTOS } from "@/config/photos";
import { cn } from "@/lib/cn";
import { Check, HEART_D } from "@/components/illustrations/Icons";
import { useI18n } from "@/i18n/client";

/*
 * Floating product cards for the story steps (Hotplate "The Experience").
 * Markup is the FINAL state (no-JS / reduced-motion see it complete).
 * `data-a` parts are animated in order by StorySteps:
 *   type | fill | fade | pop | rise | spin (data-rot) | fan (data-rot, data-x)
 */

export type StepKey = "account" | "compass" | "call" | "match";

/** Step 4 ("match") uses the scattered finale layout instead — see StorySteps. */

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[380px] rounded-2xl border border-ink/10 bg-white p-6 text-start text-ink shadow-[0_30px_60px_-34px_rgba(36,19,47,.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-[12px] font-semibold uppercase tracking-wider text-ink/50">
    {children}
  </p>
);

function Toast({ children }: { children: ReactNode }) {
  return (
    <div
      data-a="pop"
      className="mt-4 flex items-center gap-2.5 rounded-xl bg-violet px-3.5 py-3 text-[15px] leading-5 text-mist"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose text-ink">
        <Check className="h-4 w-4" strokeWidth={2.6} />
      </span>
      {children}
    </div>
  );
}

export function StoryCard({ k }: { k: StepKey }) {
  const { t } = useI18n();
  const c = t.story.cards;
  if (k === "account")
    return (
      <Card>
        <p className="font-display text-[22px] font-semibold leading-7">
          {c.account.title}
        </p>
        <p className="mt-1 text-[15px] leading-5 text-ink/60">
          {c.account.sub}
        </p>
        <div className="mt-5 space-y-3 text-[16px]">
          <div>
            <Label>{c.account.name}</Label>
            <div className="mt-1 rounded-lg border border-ink/15 bg-mist px-3 py-2.5">
              <span data-a="type" className="inline-block whitespace-nowrap">
                Ananya Rao
              </span>
            </div>
          </div>
          <div>
            <Label>{c.account.mobile}</Label>
            <div className="mt-1 rounded-lg border border-ink/15 bg-mist px-3 py-2.5">
              <span data-a="type" className="inline-block whitespace-nowrap">
                +91 98765 •••21
              </span>
            </div>
          </div>
          <div>
            <Label>{c.account.looking}</Label>
            <div className="mt-1.5 flex gap-2 text-[14px] font-semibold">
              <span className="relative overflow-hidden rounded-full border border-ink/15 px-3 py-1.5">
                <span data-a="fade" className="absolute inset-0 bg-rose" />
                <span className="relative">{c.account.self}</span>
              </span>
              <span className="rounded-full border border-ink/15 px-3 py-1.5 text-ink/60">
                {c.account.child}
              </span>
            </div>
          </div>
        </div>
        <div
          data-a="rise"
          className="mt-5 rounded-full bg-violet py-2.5 text-center font-display text-[16px] font-bold text-mist"
        >
          {c.account.cont}
        </div>
        <Toast>{c.account.done}</Toast>
      </Card>
    );

  if (k === "compass")
    return (
      <Card>
        <div className="flex items-center justify-between">
          <p className="font-display text-[16px] font-bold">{c.compass.title}</p>
          <p className="text-[14px] text-ink/50">7 / 24</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div
            data-a="fill"
            className="h-full w-[30%] origin-left rounded-full bg-rose"
          />
        </div>
        <p className="mt-5 font-display text-[22px] font-semibold leading-7">
          {c.compass.question}
        </p>
        <ul className="mt-4 space-y-2 text-[15px]">
          {c.compass.options.map((o, i) => (
            <li
              key={o}
              className="relative flex items-center justify-between overflow-hidden rounded-lg border border-ink/12 px-3 py-2.5"
            >
              {i === 0 && (
                <span data-a="fade" className="absolute inset-0 bg-blush" />
              )}
              <span className="relative">{o}</span>
              {i === 0 && (
                <span
                  data-a="pop"
                  className="relative grid h-5 w-5 place-items-center rounded-full bg-violet text-mist"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-4">
          <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden>
            <circle cx="50" cy="50" r="46" fill="#F9C6D8" />
            <g data-a="spin" data-rot="28">
              <path d="M50 14 L57 50 L43 50 Z" fill="#5B2A86" />
              <path d="M50 86 L57 50 L43 50 Z" fill="#24132F" opacity="0.35" />
            </g>
            <circle cx="50" cy="50" r="5" fill="#5B2A86" />
          </svg>
          <div className="flex flex-wrap gap-1.5 text-[13px] font-semibold">
            {c.compass.traits.map((tr) => (
              <span
                key={tr}
                data-a="pop"
                className="rounded-full bg-violet px-2.5 py-1 text-mist"
              >
                {tr}
              </span>
            ))}
          </div>
        </div>
      </Card>
    );

  if (k === "call")
    return (
      <Card>
        <p className="font-display text-[22px] font-semibold leading-7">
          {c.call.title}
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-mist p-3">
          <Image
            src={PHOTOS.pCounsellor}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-[16px] font-bold">Sara Thomas</p>
            <p className="text-[13px] leading-4 text-ink/60">
              {c.call.role}
            </p>
          </div>
        </div>
        <span
          data-a="pop"
          className="mt-3 inline-block rounded-full bg-petal px-3 py-1 text-[13px] font-semibold"
        >
          {c.call.badge}
        </span>
        <div className="mt-4 grid grid-cols-4 gap-1.5 text-center">
          {c.call.days.map((d, i) => [d, String(14 + i)]).map(([d, n], i) => (
            <span
              key={d}
              className="relative overflow-hidden rounded-lg border border-ink/12 py-2"
            >
              {i === 2 && (
                <span data-a="fade" className="absolute inset-0 bg-violet" />
              )}
              <span
                className={cn(
                  "relative block text-[12px]",
                  i === 2 ? "text-mist/70" : "text-ink/50",
                )}
              >
                {d}
              </span>
              <span
                className={cn(
                  "relative block font-display text-[18px] font-bold",
                  i === 2 && "text-mist",
                )}
              >
                {n}
              </span>
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[14px] font-semibold">
          {["10:00 am", "11:30 am", "4:00 pm", "6:30 pm"].map((t, i) => (
            <span
              key={t}
              className="relative overflow-hidden rounded-lg border border-ink/12 py-2"
            >
              {i === 2 && (
                <span data-a="fade" className="absolute inset-0 bg-rose" />
              )}
              <span className="relative">{t}</span>
            </span>
          ))}
        </div>
        <Toast>{c.call.done}</Toast>
      </Card>
    );

  return null;
}

/* ── Step 4 finale pieces (Hotplate "You fulfill orders" layout) ───────── */

const MATCH_ROWS = [
  { score: 92, photo: PHOTOS.pArjun },
  { score: 88, photo: PHOTOS.pRohan },
  { score: 85, photo: PHOTOS.pKabir },
];

export function MatchListCard() {
  const { t } = useI18n();
  const l = t.story.cards.list;
  const rows = MATCH_ROWS.map((r, i) => ({ ...r, ...t.story.cards.people[i] }));
  return (
    <div className="w-[300px] rounded-2xl border border-ink/10 bg-white p-3 text-start text-ink shadow-[0_30px_60px_-34px_rgba(36,19,47,.45)]">
      <div className="flex items-center justify-between border-b border-ink/10 px-2 pb-3 pt-1">
        <p className="font-display text-[17px] font-semibold">{l.me}</p>
        <p className="text-[14px]">{l.heading}</p>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-mist p-2.5">
        <div className="flex justify-between px-1 text-[12px] font-semibold text-ink/60">
          <span>{l.week}</span>
          <span>{l.harmony}</span>
        </div>
        {rows.map((m) => (
          <div
            key={m.name}
            data-a="rise"
            className="flex items-center gap-2.5 rounded-lg border border-ink/10 bg-white p-2"
          >
            <Image
              src={m.photo}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[14px] font-semibold leading-4">
                {m.name}
              </p>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-ink/10">
                <div
                  data-a="fill"
                  className="h-full origin-left rounded-full bg-rose"
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
            <span className="text-[13px] font-semibold tabular-nums">
              {m.score}%
            </span>
          </div>
        ))}
        <div className="rounded-lg bg-violet py-2 text-center text-[14px] font-semibold text-mist">
          {l.view}
        </div>
      </div>
    </div>
  );
}

export function MatchProfileCard() {
  const { t } = useI18n();
  const p = t.story.cards.profile;
  return (
    <div className="w-[330px] rounded-2xl border border-ink/10 bg-white text-start text-ink shadow-[0_30px_60px_-34px_rgba(36,19,47,.45)]">
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="font-display text-[18px] font-semibold">{t.story.cards.people[0].name}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2 py-0.5 text-[12px] font-bold text-white">
          <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
            <path d={HEART_D} fill="currentColor" />
          </svg>
          92%
        </span>
      </div>
      <div className="mt-1 flex justify-between px-5 pb-4 text-[13px] text-ink/60">
        <span>{p.city}</span>
        <span>{p.meta}</span>
      </div>
      <div className="border-t border-ink/10 p-3">
        <div
          data-a="pop"
          className="flex gap-2.5 rounded-xl bg-petal/60 p-3 text-[13px] leading-[18px]"
        >
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <rect x="4" y="5" width="16" height="15" rx="2" />
            <path d="M8 3v4M16 3v4M8 11h8M8 15h5" />
          </svg>
          <span>{p.note}</span>
        </div>
        <ul className="mt-3 space-y-3 px-2 text-[14px]">
          <li className="flex items-start justify-between gap-3">
            <span className="flex gap-2">
              <span className="text-ink/50">1</span>
              <span className="text-ink/45 line-through">
                {p.todo1}
              </span>
            </span>
            <span
              data-a="pop"
              className="grid h-5 w-5 shrink-0 place-items-center rounded bg-violet text-mist"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </li>
          <li className="flex items-start justify-between gap-3">
            <span className="flex gap-2">
              <span className="text-ink/50">2</span>
              <span>{p.todo2}</span>
            </span>
            <span className="h-5 w-5 shrink-0 rounded border border-ink/25" />
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3 text-[13px] text-ink/60">
        <span>{p.intro}</span>
        <span className="rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-mist">
          {p.matched}
        </span>
      </div>
    </div>
  );
}
