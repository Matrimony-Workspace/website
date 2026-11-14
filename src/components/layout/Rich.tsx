/** Renders `*word*` segments in an accent colour (sans-serif only — DESIGN.md). */
export function Rich({ text, accentClassName = "" }: { text: string; accentClassName?: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <span key={i} className={accentClassName}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
