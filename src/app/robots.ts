import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

/**
 * Previews stay crawlable on purpose: their pages carry noindex, and a crawler has to be allowed in to read it.
 * A blanket Disallow would leave a linked preview URL indexable without its content.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
