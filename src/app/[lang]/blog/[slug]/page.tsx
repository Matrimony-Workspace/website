import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/schema";
import { getPost, getPosts } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";

/**
 * ISR detail page — the template for every dynamic content route.
 *  - generateStaticParams: prebuild known slugs at build time
 *  - dynamicParams=true: new slugs render on first request, then cached
 *    (blocking: crawlers always get full HTML + a real 404 status)
 *  - revalidate: background regeneration window
 *  - on-demand: POST /api/revalidate { tags: ["post:<slug>"] }
 * getPost() is called in both generateMetadata and the page; fetch dedupes it.
 */
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  // For very large sites, return only the top N and let the rest build on demand.
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found", robots: { index: false } };
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/${lang}/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug, lang } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const trail = [
    { name: "Home", path: `/${lang}` },
    { name: "Blog", path: `/${lang}/blog` },
    { name: post.title, path: `/${lang}/blog/${post.slug}` },
  ];

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pt-10 pb-32">
      <Breadcrumbs trail={trail} />
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm opacity-60">
        By {post.author} · Updated <time dateTime={post.updatedAt}>{post.updatedAt.slice(0, 10)}</time>
      </p>

      {/* AEO: direct answer immediately under the H1. */}
      <p className="mt-6 text-lg font-medium">{post.summary}</p>

      <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.faqs && <FaqSection faqs={post.faqs} />}

      <JsonLd data={graph(articleSchema(post), breadcrumbSchema(trail))} />
    </article>
  );
}
