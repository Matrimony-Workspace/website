"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { scrollToTarget } from "./SmoothScroll";
import { useI18n } from "@/i18n/client";
import { localizeHref } from "@/i18n/config";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Locale-aware link: prefixes internal hrefs with the current locale ("/#x" →
 * "/hi#x") and smooth-scrolls to `#id` targets when already on that page.
 */
export function SmoothLink({ href: raw, onClick, ...rest }: Props) {
  const { locale } = useI18n();
  const href = localizeHref(raw, locale);
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        const i = href.indexOf("#");
        const path = i >= 0 ? href.slice(0, i) || "/" : href;
        if (path !== window.location.pathname) return;
        const target = i >= 0 ? document.getElementById(href.slice(i + 1)) : document.body;
        if (!target) return;
        e.preventDefault();
        if (i < 0) {
          scrollToTarget(document.body, 0);
          history.replaceState(null, "", path);
        } else {
          scrollToTarget(target);
          history.replaceState(null, "", href.slice(i));
        }
      }}
    />
  );
}
