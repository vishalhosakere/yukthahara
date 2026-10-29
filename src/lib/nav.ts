import type { Ui } from "./content";
import { localePath, pick, type Lang, type Text } from "./i18n";

export type NavLink = { href: string; label: Text };

type NavKey = keyof Ui["nav"];

// One list for the header and the footer; each picks the links it shows.
const NAV: { key: NavKey; href: string; header: boolean; footer: boolean }[] = [
  { key: "home", href: "/", header: false, footer: true },
  { key: "menu", href: "/menu", header: true, footer: true },
  { key: "howWeCook", href: "/#practices", header: true, footer: false },
  { key: "millets", href: "/millets", header: true, footer: true },
  { key: "visit", href: "/#visit", header: true, footer: true },
];

export function navLinks(ui: Ui, lang: Lang, where: "header" | "footer"): NavLink[] {
  return NAV.filter((link) => link[where]).map((link) => ({ href: localePath(link.href, lang), label: pick(ui.nav[link.key], lang) }));
}
