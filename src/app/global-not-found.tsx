import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { T } from "@/components/ui/T";
import { getUi } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { localePath, localize, type Lang } from "@/lib/i18n";
import { STRIP_NETLIFY_HEAD } from "@/lib/netlify-head";

export const metadata: Metadata = {
  title: "404 · Page not found · ಪುಟ ಸಿಗಲಿಲ್ಲ",
  robots: { index: false, follow: true },
};

/** A lost visitor may read either language, so the page speaks both, each side leading back into its own site. */
export default async function GlobalNotFound() {
  const ui = await getUi();
  // English carries the page's heading; the Kannada side is its counterpart, one level down.
  const side = (lang: Lang, Heading: "h1" | "h2") => {
    const copy = localize(ui.notFound, lang);
    return (
      <div className="notfound-side" lang={lang === "kn" ? "kn-IN" : undefined}>
        <p className="eyebrow">
          <T v={copy.eyebrow} />
        </p>
        <Heading className="notfound-heading">
          <T v={copy.heading} highlight="em" />
        </Heading>
        <div className="cta">
          <Link className="btn btn--primary" href={localePath("/", lang)}>
            <T v={copy.home} />
          </Link>
          <Link className="btn" href={localePath("/menu", lang)}>
            <T v={copy.menu} />
          </Link>
        </div>
      </div>
    );
  };
  return (
    <html lang="en-IN" data-lang="en" className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: STRIP_NETLIFY_HEAD }} />
      </head>
      <body>
        <main id="main" className="section pagehead notfound">
          <div className="wrap notfound-sides">
            {side("en", "h1")}
            {side("kn", "h2")}
          </div>
        </main>
      </body>
    </html>
  );
}
