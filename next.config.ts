import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  // Content (Keystatic reader) and share-image fonts/photos are read from disk; ship them with every server function.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*", "./assets/**/*", "./public/media/**/*"],
  },
  env: {
    // Netlify sets URL (primary domain), DEPLOY_PRIME_URL (this deploy) and CONTEXT during builds.
    NEXT_PUBLIC_SITE_URL: (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ?? "http://localhost:4101",
    NEXT_PUBLIC_DEPLOY_CONTEXT: process.env.CONTEXT ?? "local",
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu.html", destination: "/menu", permanent: true },
      { source: "/millets.html", destination: "/millets", permanent: true },
      { source: "/playground.html", destination: "/lab/playground.html", permanent: true },
      { source: "/logo-lab.html", destination: "/lab/logo-lab.html", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/lab/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/keystatic/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
