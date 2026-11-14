import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand ISR webhook — call from the CMS/backend on save.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["posts", "post:my-slug"], "paths": ["/blog/my-slug"] }
 *
 * Secret-guarded: every call costs a render, so an open endpoint is a free
 * way to make the site rebuild in a loop. `revalidateTag(tag, "max")` is the
 * Next 16 form (stale-while-revalidate); the 1-arg form is deprecated.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: unknown; paths?: unknown };
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string") : [];
  const paths = Array.isArray(body.paths) ? body.paths.filter((p): p is string => typeof p === "string") : [];

  for (const t of tags) revalidateTag(t, "max");
  for (const p of paths) revalidatePath(p);

  return Response.json({ revalidated: true, tags, paths, at: Date.now() });
}
