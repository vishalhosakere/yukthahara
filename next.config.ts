import type { NextConfig } from "next";

const production = process.env.NODE_ENV === "production";
// Netlify sets CONTEXT during builds: previews and branch deploys must never be indexed.
const indexable = process.env.CONTEXT !== "deploy-preview" && process.env.CONTEXT !== "branch-deploy";

/**
 * Same-origin everything. Scripts allow 'unsafe-inline' because Next.js streams its page data in inline scripts on
 * prerendered pages, where a per-request nonce isn't possible; the rest of the policy still pins every source to this
 * site, forbids framing, plugins and <base> hijacks. Dev adds 'unsafe-eval' for Fast Refresh.
 */
type Sources = { connect?: string[]; img?: string[]; style?: string[]; font?: string[] };

const csp = (extra: Sources = {}) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}`,
    ["style-src 'self' 'unsafe-inline'", ...(extra.style ?? [])].join(" "),
    ["img-src 'self' data: blob:", ...(extra.img ?? [])].join(" "),
    ["font-src 'self'", ...(extra.font ?? [])].join(" "),
    ["connect-src 'self'", ...(extra.connect ?? [])].join(" "),
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(production ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  // No includeSubDomains: the owner's domain may host other services this site knows nothing about.
  ...(production ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
];

// The CMS talks to GitHub (or Keystatic Cloud) from the browser, and its interface loads Inter from Google Fonts.
const cmsCsp = csp({
  connect: ["https://api.github.com", "https://api.keystatic.cloud", "https://*.keystatic.cloud"],
  img: ["https://avatars.githubusercontent.com", "https://*.githubusercontent.com", "https://*.keystatic.net"],
  style: ["https://fonts.googleapis.com"],
  font: ["https://fonts.gstatic.com"],
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  // The Keystatic reader reads content/ from disk on the server; share images also read fonts and photos.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
    "/og/**": ["./assets/fonts/**/*", "./public/media/**/*"],
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
    // Addresses from the original static site.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu.html", destination: "/menu", permanent: true },
      { source: "/millets.html", destination: "/millets", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Later entries override earlier ones for the same header.
      { source: "/keystatic/:path*", headers: [{ key: "Content-Security-Policy", value: cmsCsp }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/keystatic", headers: [{ key: "Content-Security-Policy", value: cmsCsp }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/keystatic/:path*", headers: [{ key: "Content-Security-Policy", value: cmsCsp }] },
      ...(indexable ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
    ];
  },
};

export default nextConfig;
