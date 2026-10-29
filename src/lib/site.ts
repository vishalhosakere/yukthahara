import type { Settings } from "./content";
import { pick, type Lang, type Text } from "./i18n";

/** Inlined at build by next.config.ts from Netlify's URL / DEPLOY_PRIME_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4101").replace(/\/$/, "");

const DEPLOY_CONTEXT = process.env.NEXT_PUBLIC_DEPLOY_CONTEXT ?? "local";

/** Deploy previews and branch deploys must never be indexed; production (and local builds) may be. */
export const INDEXABLE = DEPLOY_CONTEXT !== "deploy-preview" && DEPLOY_CONTEXT !== "branch-deploy";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** The number as dialled: digits and a leading +. */
export const phoneDigits = (phone: string) => phone.replace(/[^\d+]/g, "");
export const telHref = (phone: string) => `tel:${phoneDigits(phone)}`;

export function addressLine(address: Settings["address"], lang: Lang, withPin = true): Text {
  const street = pick(address.street, lang);
  const city = pick(address.city, lang);
  const pin = withPin && address.postalCode ? ` ${address.postalCode}` : "";
  // Mixed languages read as English; a Kannada line needs both parts translated.
  const kannada = street.lang === "kn" && city.lang === "kn";
  return { text: `${street.text}, ${city.text}${pin}`, lang: kannada ? "kn" : "en", fallback: lang === "kn" && !kannada };
}

export function mapsHref(settings: Settings) {
  if (settings.mapUrl) return settings.mapUrl;
  const query = [settings.address.street.en, settings.address.city.en, settings.address.postalCode, settings.address.region]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings.name.en}, ${query}`)}`;
}
