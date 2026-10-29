import type { Metadata } from "next";
import { HTML_LANG, LANGS, localePath, OG_LOCALE, otherLang, type Lang } from "./i18n";
import type { SharePage } from "./share";

type PageMeta = {
  lang: Lang;
  /** The English path; the Kannada one is derived. */
  path: string;
  title: string | { absolute: string };
  description: string;
  siteName: string;
  share: { page: SharePage; alt: string };
};

/** Both language versions of a path, for hreflang. x-default is English: the root of the site. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LANGS.map((lang) => [HTML_LANG[lang], localePath(path, lang)])),
    "x-default": localePath(path, "en"),
  };
}

/**
 * Per-page metadata: canonical, hreflang alternates and a complete Open Graph block with its share image. Page-level
 * openGraph replaces the layout's wholesale, so nothing is left to inherit.
 */
export function pageMetadata({ lang, path, title, description, siteName, share }: PageMeta): Metadata {
  const ogTitle = typeof title === "string" ? `${title} · ${siteName}` : title.absolute;
  const url = localePath(path, lang);
  const images = [{ url: `/og/${share.page}`, width: 1200, height: 630, alt: share.alt }];
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[otherLang(lang)]],
      siteName,
      url,
      title: ogTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images },
  };
}
