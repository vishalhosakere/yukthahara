import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavLink } from "@/components/layout/Header";
import { LANG_BOOT } from "@/components/layout/LangToggle";
import { getSettings, getUi } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { hoursLines } from "@/lib/hours";
import { INDEXABLE, SITE_URL, telHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: settings.seoTitle, template: `%s · ${settings.name.en}` },
    description: settings.seoDescription,
    applicationName: settings.name.en,
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    ...(google ? { verification: { google } } : {}),
    openGraph: { type: "website", locale: "en_IN", alternateLocale: ["kn_IN"], siteName: settings.name.en },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#F3ECDA",
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, ui] = await Promise.all([getSettings(), getUi()]);
  const hours = hoursLines(settings.hours);
  const links: NavLink[] = [
    { href: "/#practices", label: ui.nav.howWeCook },
    { href: "/menu", label: ui.nav.menu },
    { href: "/millets", label: ui.nav.millets },
    { href: "/#visit", label: ui.nav.visit },
  ];
  return (
    <html lang="en-IN" data-lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header
          name={settings.name}
          links={links}
          hours={hours}
          phoneHref={settings.phone ? telHref(settings.phone) : null}
          callLabel={ui.labels.call}
        />
        <main id="main">{children}</main>
        <Footer settings={settings} ui={ui} hours={hours} />
      </body>
    </html>
  );
}
