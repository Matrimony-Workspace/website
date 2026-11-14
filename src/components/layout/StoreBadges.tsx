import { AppleGlyph, PlayGlyph } from "@/components/illustrations/Icons";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { cn } from "@/lib/cn";

const STORES = [
  { key: "apple", top: "Download on the", name: "App Store", Glyph: AppleGlyph },
  { key: "play", top: "Get it on", name: "Google Play", Glyph: PlayGlyph },
] as const;

/**
 * App Store / Google Play. The app isn't live yet, so these link to the
 * "Get the app" block and carry a "Soon" tag. Swap `href` for store URLs at launch.
 */
export function StoreBadges({ variant = "full", className }: { variant?: "full" | "icons"; className?: string }) {
  if (variant === "icons") {
    return (
      <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
        {STORES.map(({ key, name, Glyph }) => (
          <SmoothLink
            key={key}
            href="/#get-app"
            aria-label={`${name} — coming soon`}
            className="grid h-7 w-7 place-items-center rounded-full border border-current transition-transform hover:-translate-y-0.5 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
          >
            <Glyph className={cn("h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]", key === "play" && "[&_path]:fill-current")} />
          </SmoothLink>
        ))}
      </div>
    );
  }
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {STORES.map(({ key, top, name, Glyph }) => (
        <SmoothLink
          key={key}
          href="/#get-app"
          aria-label={`${name} — coming soon`}
          className="relative inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-black px-3.5 pr-7 text-white transition-transform hover:-translate-y-0.5"
        >
          <Glyph className="h-6 w-6" />
          <span className="flex flex-col leading-none">
            <span className="text-[11px] opacity-80">{top}</span>
            <span className="font-display text-[17px] font-semibold">{name}</span>
          </span>
          <span className="absolute -right-2 -top-3 rounded-full bg-rose px-1.5 py-px font-display text-[9px] font-bold uppercase text-ink">
            Soon
          </span>
        </SmoothLink>
      ))}
    </div>
  );
}
