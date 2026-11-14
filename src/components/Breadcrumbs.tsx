import Link from "next/link";

/** Visible breadcrumb trail. Pair with breadcrumbSchema() using the same trail. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm opacity-70 mb-6">
      <ol className="flex flex-wrap gap-1">
        {trail.map((t, i) => (
          <li key={t.path} className="flex gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {i === trail.length - 1 ? <span aria-current="page">{t.name}</span> : <Link href={t.path}>{t.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
