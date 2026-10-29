import type { MenuCategory, Settings } from "./content";
import { openingHoursSpecification } from "./hours";
import { HTML_LANG, localePath, pick, type Lang } from "./i18n";
import { absoluteUrl, mapsHref, phoneDigits } from "./site";

const MENU_ID = absoluteUrl("/menu#menu");

export function restaurantJsonLd(settings: Settings, menu: MenuCategory[], images: string[]) {
  const prices = menu.flatMap((c) => c.items.map((i) => i.price));
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: settings.name.en,
    alternateName: settings.name.kn || undefined,
    description: settings.seoDescription.en || undefined,
    slogan: settings.tagline.en || undefined,
    url: absoluteUrl("/"),
    image: images.length ? images.map(absoluteUrl) : undefined,
    telephone: settings.phone ? phoneDigits(settings.phone) : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street.en,
      addressLocality: settings.address.city.en,
      postalCode: settings.address.postalCode || undefined,
      addressRegion: settings.address.region || undefined,
      addressCountry: settings.address.country || undefined,
    },
    hasMap: mapsHref(settings),
    openingHoursSpecification: openingHoursSpecification(settings.hours),
    servesCuisine: settings.servesCuisine,
    hasMenu: { "@id": MENU_ID },
    acceptsReservations: settings.phone ? true : undefined,
    priceRange: prices.length ? `₹${Math.min(...prices)}–₹${Math.max(...prices)}` : undefined,
    sameAs: settings.social.length ? settings.social.map((s) => s.url) : undefined,
  };
}

/** The menu in the page's language. English is the canonical Menu the restaurant points to. */
export function menuJsonLd(settings: Settings, menu: MenuCategory[], lang: Lang, title: string) {
  const text = (bi: { en: string; kn: string }) => pick(bi, lang).text;
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": lang === "en" ? MENU_ID : absoluteUrl(`${localePath("/menu", lang)}#menu`),
    name: `${text(settings.name)} · ${title}`,
    url: absoluteUrl(localePath("/menu", lang)),
    inLanguage: HTML_LANG[lang],
    mainEntityOfPage: absoluteUrl(localePath("/menu", lang)),
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: text(category.title),
      hasMenuItem: category.items.map((item) => {
        const diets = [...new Set(item.tags.flatMap((t) => (t.diet !== "none" ? [`https://schema.org/${t.diet}`] : [])))];
        return {
          "@type": "MenuItem",
          name: text(item.name),
          description: text(item.description) || undefined,
          offers: { "@type": "Offer", price: String(item.price), priceCurrency: "INR" },
          suitableForDiet: diets.length ? diets : undefined,
        };
      }),
    })),
  };
}
