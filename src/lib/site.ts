import type { Bi } from "./i18n";
import type { Settings } from "./content";

/** Inlined at build by next.config.ts from Netlify's URL / DEPLOY_PRIME_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4101").replace(/\/$/, "");

const DEPLOY_CONTEXT = process.env.NEXT_PUBLIC_DEPLOY_CONTEXT ?? "local";

/** Deploy previews and branch deploys must never be indexed; production (and local builds) may be. */
export const INDEXABLE = DEPLOY_CONTEXT !== "deploy-preview" && DEPLOY_CONTEXT !== "branch-deploy";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function addressLine(address: Settings["address"], withPin = true): Bi {
  const pin = withPin && address.postalCode ? ` ${address.postalCode}` : "";
  return {
    en: `${address.street.en}, ${address.city.en}${pin}`,
    kn: `${address.street.kn || address.street.en}, ${address.city.kn || address.city.en}${pin}`,
  };
}

export function mapsHref(settings: Settings) {
  if (settings.mapUrl) return settings.mapUrl;
  const query = [settings.address.street.en, settings.address.city.en, settings.address.postalCode, settings.address.region]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings.name.en}, ${query}`)}`;
}
