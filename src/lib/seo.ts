import type { Metadata } from "next";

type PageMeta = { title: string | { absolute: string }; description: string; path: string; siteName: string };

/** Per-page metadata: a canonical (resolved against metadataBase) and a complete Open Graph block, since page-level openGraph replaces the layout's. */
export function pageMetadata({ title, description, path, siteName }: PageMeta): Metadata {
  const ogTitle = typeof title === "string" ? `${title} · ${siteName}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      alternateLocale: ["kn_IN"],
      siteName,
      url: path,
      title: ogTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}
