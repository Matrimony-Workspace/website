import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getPosts } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { assertLocale } from "@/i18n/server";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">) {
  const lang = assertLocale((await params).lang);
  return buildMetadata({
    title: "Blog",
    description: "Guides and answers on <topic>. Replace with a 140–160 character description of the blog.",
    path: `/${lang}/blog`,
  });
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const lang = assertLocale((await params).lang);
  const TRAIL = [
    { name: "Home", path: `/${lang}` },
    { name: "Blog", path: `/${lang}/blog` },
  ];
  const posts = await getPosts();
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-10 pb-32">
      <Breadcrumbs trail={TRAIL} />
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <h2 className="text-xl font-semibold"><Link href={`/${lang}/blog/${p.slug}`}>{p.title}</Link></h2>
            <p className="opacity-80">{p.summary}</p>
            <time dateTime={p.updatedAt} className="text-sm opacity-60">Updated {p.updatedAt.slice(0, 10)}</time>
          </li>
        ))}
      </ul>
      <JsonLd data={graph(breadcrumbSchema(TRAIL))} />
    </div>
  );
}
