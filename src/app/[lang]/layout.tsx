import { Suspense } from "react";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, DM_Sans, Noto_Nastaliq_Urdu, Noto_Sans_Devanagari } from "next/font/google";
import { SITE, SITE_URL } from "@/config/site";
import { ROBOTS } from "@/lib/seo";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Ribbon } from "@/components/layout/Ribbon";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionController } from "@/components/motion/MotionController";
import { I18nProvider } from "@/i18n/client";
import { dictionaryFor } from "@/i18n/dictionary";
import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, isLocale } from "@/i18n/config";
import "../globals.css";

const sans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
// Native scripts — not preloaded; the browser fetches them only when a page uses those letters.
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });
const urdu = Noto_Nastaliq_Urdu({ variable: "--font-urdu", subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap", preload: false });

/** Prebuild every locale: /en, /hi, /ur. */
export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const OG_LOCALE = { en: "en_IN", hi: "hi_IN", ur: "ur_IN" } as const;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = dictionaryFor(locale);
  return {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} — ${t.meta.tagline}`, template: `%s | ${SITE.name}` },
  description: t.meta.description,
  applicationName: SITE.name,
  robots: ROBOTS,
  alternates: {
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
  openGraph: { type: "website", siteName: SITE.name, locale: OG_LOCALE[locale], url: `${SITE_URL}/${locale}`, images: [SITE.ogImage] },
  twitter: { card: "summary_large_image", site: SITE.twitter || undefined },
  formatDetection: { telephone: false },
  // verification: { google: "", other: { "msvalidate.01": "" } },
  };
}

export const viewport: Viewport = { themeColor: "#5B2A86", width: "device-width", initialScale: 1 };

/**
 * Runs before paint: enables motion styles (reveals start hidden only when JS
 * + motion are on) and hides a previously dismissed ribbon without a flash.
 * Fail-safe: if the app JS hasn't confirmed (`motion-ready`) within 4s — failed
 * chunk, blocked script, full dev disk — drop `motion` so no text stays hidden.
 */
const BOOT = `(function(){var d=document.documentElement;try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');if(localStorage.getItem('dc-ribbon')==='closed')d.classList.add('ribbon-closed')}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4000)})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaryFor(lang);
  return (
    <html lang={LOCALE_LABELS[lang].htmlLang} dir={LOCALE_LABELS[lang].dir} className={`${sans.variable} ${display.variable} ${deva.variable} ${urdu.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* beforeInteractive: injected into <head> and run before hydration */}
        <Script id="dc-boot" strategy="beforeInteractive">
          {BOOT}
        </Script>
        <I18nProvider locale={lang}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-mist">
          {t.ui.skip}
        </a>
        <Ribbon />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
        <SmoothScroll />
        {/* usePathname can suspend on fallback params under cacheComponents */}
        <Suspense fallback={null}>
          <MotionController />
        </Suspense>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        </I18nProvider>
      </body>
    </html>
  );
}
