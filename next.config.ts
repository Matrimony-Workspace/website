import type { NextConfig } from "next";

const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  /**
   * Classic ISR (export const revalidate + fetch tags). Cache Components is
   * off on purpose: with it, unlisted slugs can stream a fallback shell, and
   * crawlers should always get full HTML + a real 404 status on first hit.
   * Upgrade path: node_modules/next/dist/docs/01-app/02-guides/incremental-static-regeneration-cache-components.md
   */
  cacheComponents: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    // Belt and braces for staging/previews: header noindex covers non-HTML too.
    if (!indexable) security.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    return [{ source: "/:path*", headers: security }];
  },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
