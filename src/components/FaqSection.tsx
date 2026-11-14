import type { Faq } from "@/lib/content";
import { faqSchema, graph } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

/**
 * Visible FAQ + matching FAQPage schema in one component, so the markup can
 * never drift from what's on screen. Uses <details> — content stays in the
 * HTML (crawlable) and needs no client JS.
 */
export function FaqSection({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 id="faq" className="text-2xl font-semibold mb-4">{heading}</h2>
      {faqs.map((f) => (
        <details key={f.q} className="border-b py-3">
          <summary className="cursor-pointer font-medium">{f.q}</summary>
          <p className="mt-2 opacity-80">{f.a}</p>
        </details>
      ))}
      <JsonLd data={graph(faqSchema(faqs))} />
    </section>
  );
}
