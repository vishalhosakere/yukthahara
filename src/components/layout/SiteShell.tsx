import type { Metadata, Viewport } from "next";
import { ViewTransition, type ReactNode } from "react";
import "@/app/globals.css";
import { T } from "@/components/ui/T";
import { getSettings, getUi } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { hoursLines } from "@/lib/hours";
import { HTML_LANG, localePath, localize, pick, type Lang } from "@/lib/i18n";
import { KANNADA_REDIRECT } from "@/lib/lang-boot";
import { navLinks } from "@/lib/nav";
import { STRIP_NETLIFY_HEAD } from "@/lib/netlify-head";
import { addressLine, INDEXABLE, SITE_URL, telHref } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export async function siteMetadata(lang: Lang): Promise<Metadata> {
  const settings = await getSettings();
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const name = pick(settings.name, lang).text;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: pick(settings.seoTitle, lang).text, template: `%s · ${name}` },
    description: pick(settings.seoDescription, lang).text,
    applicationName: settings.name.en,
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    ...(google ? { verification: { google } } : {}),
  };
}

export const siteViewport: Viewport = {
  themeColor: "#F3ECDA",
};

/** The document for one language: <html lang> is set on the server, so every page is entirely in its language. */
export async function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [settings, rawUi] = await Promise.all([getSettings(), getUi()]);
  const ui = localize(rawUi, lang);
  const name = pick(settings.name, lang);
  const homeHref = localePath("/", lang);
  const hours = hoursLines(settings.hours, lang);
  const phoneHref = settings.phone ? telHref(settings.phone) : null;

  return (
    <html lang={HTML_LANG[lang]} data-lang={lang} className={fontVariables}>
      {/* eslint-disable-next-line @next/next/no-head-element -- root layout markup (App Router), rendered by app/(en) and app/kn. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: lang === "en" ? `${STRIP_NETLIFY_HEAD};${KANNADA_REDIRECT}` : STRIP_NETLIFY_HEAD }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          <T v={ui.a11y.skipLink} />
        </a>
        <Header
          lang={lang}
          name={name}
          homeHref={homeHref}
          links={navLinks(rawUi, lang, "header")}
          hours={hours}
          phoneHref={phoneHref}
          labels={{ call: ui.labels.call, mainNav: ui.a11y.mainNav, openMenu: ui.a11y.openMenu, closeMenu: ui.a11y.closeMenu, home: ui.a11y.home }}
        />
        <main id="main">
          {/* Page changes cross-fade; the header and footer stay put. */}
          <ViewTransition update="page" default="none">
            <div>{children}</div>
          </ViewTransition>
        </main>
        <Footer
          lang={lang}
          name={name}
          copyrightName={settings.name.en}
          homeHref={homeHref}
          tagline={pick(settings.tagline, lang)}
          links={navLinks(rawUi, lang, "footer")}
          address={addressLine(settings.address, lang, false)}
          phone={settings.phone}
          phoneHref={phoneHref}
          hours={hours}
          social={settings.social}
          labels={{ explore: ui.labels.explore, contact: ui.labels.contact, follow: ui.labels.follow, home: ui.a11y.home, newTab: ui.a11y.newTab }}
        />
      </body>
    </html>
  );
}
