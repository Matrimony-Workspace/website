"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/client";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { prefersReducedMotion } from "@/components/motion/useReducedMotion";
import { ArrowRight, Close } from "@/components/illustrations/Icons";
import { StoreBadges } from "./StoreBadges";
import { Bloom } from "@/components/illustrations/Shapes";

/** Off-canvas menu: violet panel from the right, slow bloom top-right. */
export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const MENU = t.menu;
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: "visible" })
        .fromTo(q("[data-backdrop]"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .fromTo(q("[data-panel]"), { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: "expo.out" }, 0)
        .from(q("[data-menu-item]"), { x: 40, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" }, 0.15);
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    const speed = prefersReducedMotion() ? 20 : 1;
    if (open) {
      t.timeScale(speed).play();
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      window.setTimeout(() => root.current?.querySelector<HTMLElement>("[data-panel] button")?.focus(), 60);
    } else if (t.progress() > 0) {
      t.timeScale(speed * 1.6).reverse();
    }
  }, [open]);

  /** Unlock scrolling synchronously so a link's smooth-scroll isn't swallowed by a stopped Lenis. */
  const close = () => {
    getLenis()?.start();
    document.body.style.overflow = "";
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key !== "Tab" || !root.current) return;
    const f = [...root.current.querySelectorAll<HTMLElement>("[data-panel] a[href], [data-panel] button")];
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.ui.menu}
      inert={!open}
      onKeyDown={onKeyDown}
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest("a")) close();
      }}
      className="invisible fixed inset-0 z-[60]"
    >
      <div data-backdrop className="absolute inset-0 bg-ink/50" onClick={close} aria-hidden />
      <div
        data-panel
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto overflow-x-hidden bg-violet text-mist sm:w-[384px]"
      >
        <Bloom className="absolute -right-28 -top-28 w-[300px] text-violet-light" />
        <div className="relative flex h-[var(--header-h)] shrink-0 items-center justify-end px-6">
          <button type="button" onClick={close} aria-label={t.ui.closeMenu} className="p-1 transition-transform hover:rotate-90">
            <Close className="h-8 w-8" strokeWidth={2.2} />
          </button>
        </div>
        <nav aria-label="Main" className="relative px-10">
          <ul>
            {MENU.map((item) => (
              <li key={item.href}>
                <SmoothLink
                  href={item.href}
                  data-menu-item
                  className="group flex items-center justify-between py-5 font-display text-[26px] font-semibold leading-8 tracking-[-0.02em]"
                >
                  {item.label}
                  <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </SmoothLink>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-item className="relative mt-auto px-10 pb-10 pt-12">
          <SmoothLink href="/#free-consultation" className="btn bg-rose text-ink">
            {t.ui.bookFree}
          </SmoothLink>
          <p className="mt-8 text-[14px] leading-5 text-mist/80">{t.ui.appSoon}</p>
          <StoreBadges className="mt-3" />
        </div>
      </div>
    </div>
  );
}
