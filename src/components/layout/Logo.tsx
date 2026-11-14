/** Wordmark only, like Relate's. Colour follows `currentColor`. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold leading-none tracking-[-0.03em] ${className}`}>
      Divine Companion
    </span>
  );
}
