import type { MetadataRoute } from "next";
import { LANGS, localePath } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

/** Every public page in both languages, each listing its counterpart. The CMS (/keystatic, /api) stays out. */
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/millets", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([hreflang, url]) => [hreflang, absoluteUrl(url)]));
    return LANGS.map((lang) => ({ url: absoluteUrl(localePath(path, lang)), changeFrequency: "monthly" as const, priority, alternates: { languages } }));
  });
}
