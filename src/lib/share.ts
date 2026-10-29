import "server-only";
import { getHome, getMenu, getMenuPage, getMilletsPage, getSettings } from "./content";
import { publicImage, shareCard } from "./og";

export const SHARE_PAGES = ["home", "menu", "millets"] as const;
export type SharePage = (typeof SHARE_PAGES)[number];

export const isSharePage = (page: string): page is SharePage => (SHARE_PAGES as readonly string[]).includes(page);

/** Each page's share card, built from its own CMS copy. */
export async function shareImage(page: SharePage) {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);
  const footer = { left: settings.name.en, right: `${settings.address.street.en} · ${settings.address.city.en}` };
  if (page === "menu") {
    const [menuPage, menu] = await Promise.all([getMenuPage(), getMenu()]);
    return shareCard({
      eyebrow: menuPage.eyebrow.en,
      headline: `${menuPage.title.en}\n*${menu.reduce((n, c) => n + c.items.length, 0)} dishes*`,
      footer,
      photo: await publicImage(home.hero.image),
    });
  }
  if (page === "millets") {
    const milletsPage = await getMilletsPage();
    return shareCard({
      eyebrow: milletsPage.eyebrow.en,
      headline: milletsPage.title.en,
      footer,
      photo: await publicImage(milletsPage.honesty.image ?? home.hero.image),
    });
  }
  return shareCard({ eyebrow: home.hero.eyebrow.en, headline: home.hero.headline.en, footer, photo: await publicImage(home.hero.image) });
}
