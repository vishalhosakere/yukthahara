import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Every public page. The CMS (/keystatic, /api) and the internal tools (/lab) are deliberately left out. */
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/millets", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority }));
}
