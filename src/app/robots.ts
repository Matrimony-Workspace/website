import type { MetadataRoute } from "next";
import { AI_BOTS, ALLOW_INDEXING, SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_BOTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
