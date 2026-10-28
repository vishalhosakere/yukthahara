import type { MenuCategory, Settings } from "./content";
import { openingHoursSpecification } from "./hours";
import { absoluteUrl } from "./site";

const DIETS: Record<string, string> = {
  "gluten-free": "https://schema.org/GlutenFreeDiet",
  vegan: "https://schema.org/VeganDiet",
};

const phoneDigits = (phone: string) => phone.replace(/[^\d+]/g, "");

export function restaurantJsonLd(settings: Settings, menu: MenuCategory[], image: string | null) {
  const prices = menu.flatMap((c) => c.items.map((i) => i.price));
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: settings.name.en,
    alternateName: settings.name.kn || undefined,
    description: settings.seoDescription || undefined,
    slogan: settings.tagline.en || undefined,
    url: absoluteUrl("/"),
    image: image ? [absoluteUrl(image)] : undefined,
    telephone: settings.phone ? phoneDigits(settings.phone) : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street.en,
      addressLocality: settings.address.city.en,
      postalCode: settings.address.postalCode || undefined,
      addressRegion: settings.address.region || undefined,
      addressCountry: settings.address.country || undefined,
    },
    openingHoursSpecification: openingHoursSpecification(settings.hours),
    servesCuisine: settings.servesCuisine,
    hasMenu: absoluteUrl("/menu"),
    priceRange: prices.length ? `₹${Math.min(...prices)}–₹${Math.max(...prices)}` : undefined,
  };
}

export function menuJsonLd(settings: Settings, menu: MenuCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": absoluteUrl("/menu#menu"),
    name: `${settings.name.en} menu`,
    url: absoluteUrl("/menu"),
    inLanguage: ["en", "kn"],
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: category.title.en,
      hasMenuItem: category.items.map((item) => {
        const diets = item.tags.flatMap((t) => (DIETS[t.slug] ? [DIETS[t.slug]] : []));
        return {
          "@type": "MenuItem",
          name: item.name.en,
          description: item.description.en || undefined,
          offers: { "@type": "Offer", price: String(item.price), priceCurrency: "INR" },
          suitableForDiet: diets.length ? diets : undefined,
        };
      }),
    })),
  };
}
