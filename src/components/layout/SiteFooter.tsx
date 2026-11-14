import { getContent } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { Logo } from "./Logo";
import { StoreBadges } from "./StoreBadges";
import { Year } from "./Year";
import { Bloom } from "@/components/illustrations/Shapes";

/**
 * Footer: violet, wordmark | contact | rose rule | small underlined links.
 * Plus the brief's "download app" and "schedule a free consultation".
 */
export function SiteFooter({ lang }: { lang: Locale }) {
  const { footer: FOOTER, menu: MENU } = getContent(lang);
  return (
    <footer className="relative z-10 overflow-hidden bg-violet pb-[45px] pt-10 text-mist">
      <Bloom className="pointer-events-none absolute -bottom-40 -right-32 w-[420px] text-violet-light/50" />
      <div className="shell relative">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_auto_1fr] md:gap-12">
          <div>
            <Logo className="text-[32px]" />
            <SmoothLink href={FOOTER.cta.href} className="btn mt-6 bg-rose text-ink">
              {FOOTER.cta.label}
            </SmoothLink>
          </div>

          <div id="get-app" className="scroll-mt-24 text-[16px] leading-5">
            <p className="font-bold">{FOOTER.contactTitle}</p>
            <address className="mt-4 not-italic">
              {FOOTER.contact.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`mailto:${FOOTER.email}`} className="mt-1 block underline underline-offset-4">
                {FOOTER.email}
              </a>
            </address>
            <p className="mt-6 font-bold">{FOOTER.appTitle}</p>
            <StoreBadges className="mt-3" />
          </div>

          {/* rose rule: vertical on desktop, horizontal on mobile */}
          <div className="h-px w-full bg-rose md:h-auto md:w-px" aria-hidden />

          <div className="grid grid-cols-2 gap-8 text-[14px] leading-5 md:grid-cols-1 lg:grid-cols-2">
            <nav aria-label="Footer">
              <ul className="space-y-3">
                {MENU.filter((m) => m.href !== "/#get-app").map((m) => (
                  <li key={m.href}>
                    <SmoothLink href={m.href} className="underline underline-offset-4 hover:decoration-2">
                      {m.label}
                    </SmoothLink>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Legal">
              <ul className="space-y-3">
                {FOOTER.legal.map((l) => (
                  <li key={l.href}>
                    <SmoothLink href={l.href} className="underline underline-offset-4 hover:decoration-2">
                      {l.label}
                    </SmoothLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-[14px] leading-5 text-mist/80 md:flex-row md:justify-between">
          <p>
            © <Year fallback={2026} /> {FOOTER.rights}
          </p>
          <p>{FOOTER.crisis}</p>
        </div>
      </div>
    </footer>
  );
}
