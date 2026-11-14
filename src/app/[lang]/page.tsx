import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { SHOW_GROW } from "@/config/home";
import { LOCALES } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionary";
import { assertLocale } from "@/i18n/server";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { PillarRibbon } from "@/components/home/PillarRibbon";
import { MainBand } from "@/components/home/MainBand";
import { GrowBento } from "@/components/home/GrowBento";
import { StorySteps } from "@/components/home/StorySteps";
import { Testimonials } from "@/components/home/Testimonials";
import { QuizBanner } from "@/components/home/QuizBanner";
import { QuizPill } from "@/components/home/QuizPill";

const HREFLANG: Record<string, string> = {
  ...Object.fromEntries(LOCALES.map((l) => [l === "en" ? "en-IN" : `${l}-IN`, `/${l}`])),
  "x-default": "/en",
};

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = assertLocale((await params).lang);
  const t = dictionaryFor(lang);
  const title = `${SITE.name} — ${t.meta.tagline}`;
  return {
    ...buildMetadata({ title, description: t.meta.description, path: `/${lang}`, languages: HREFLANG }),
    title: { absolute: title },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = assertLocale((await params).lang);
  return (
    <>
      <HeroCarousel />
      <PillarRibbon lang={lang} />
      <MainBand lang={lang} />
      {SHOW_GROW && <GrowBento lang={lang} />}
      <StorySteps />
      <Testimonials lang={lang} />
      <QuizBanner lang={lang} />
      <QuizPill />
    </>
  );
}
