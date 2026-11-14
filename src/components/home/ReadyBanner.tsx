"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/client";
import { PHOTOS } from "@/config/photos";
import { Rich } from "@/components/layout/Rich";
import { SmoothLink } from "@/components/motion/SmoothLink";
import { Bloom } from "@/components/illustrations/Shapes";

/** "Get ready for love" — closes the How-it-works journey with an invitation. */
export function ReadyBanner() {
  const { t } = useI18n();
  const READY = t.ready;
  return (
    <div
      data-reveal
      className="relative mx-auto mt-24 grid max-w-[1100px] overflow-hidden rounded-[32px] bg-violet text-mist md:grid-cols-2 lg:mt-32"
    >
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <p className="font-display text-[34px] font-bold leading-[38px] tracking-[-0.03em] lg:text-[44px] lg:leading-[48px]">
          <Rich text={READY.title} accentClassName="text-petal" />
        </p>
        <p className="mt-3 text-[18px] leading-[25px] text-mist/85">
          {READY.sub}
        </p>
        <div className="mt-7">
          <SmoothLink href={READY.cta.href} className="btn bg-rose text-ink">
            {READY.cta.label}
          </SmoothLink>
        </div>
      </div>
      <div className="relative min-h-[300px] md:min-h-[380px]">
        <Bloom className="absolute -right-24 -top-24 w-[340px] text-violet-light/60" />
        <Image
          src={PHOTOS.ready}
          alt={READY.alt}
          fill
          sizes="(min-width:768px) 550px, 100vw"
          placeholder="blur"
          className="mask-arch !inset-x-8 !top-8 !h-[calc(100%-2rem)] !w-[calc(100%-4rem)] object-cover"
        />
      </div>
    </div>
  );
}
