"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Muted, inline, looping clip (Pixabay, edited — see public/videos). Plays only
 * while on screen; reduced-motion users get the poster frame only.
 */
export function LoopVideo({ name, className, label }: { name: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("block h-full w-full object-cover", className)}
      src={`/videos/${name}.mp4`}
      poster={`/videos/${name}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
