export const LANGS = ["en", "kn"] as const;
export type Lang = (typeof LANGS)[number];

/** A CMS string pair. An empty Kannada value falls back to English on the site. */
export type Bi = { en: string; kn: string };

/** A string resolved for one page. `fallback` marks English shown on a Kannada page because the Kannada isn't written yet. */
export type Text = { text: string; lang: Lang; fallback: boolean };

export const HTML_LANG: Record<Lang, string> = { en: "en-IN", kn: "kn-IN" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_IN", kn: "kn_IN" };

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "kn" : "en");

export function pick(bi: Bi, lang: Lang): Text {
  if (lang === "kn" && bi.kn.trim()) return { text: bi.kn, lang: "kn", fallback: false };
  return { text: bi.en, lang: "en", fallback: lang === "kn" };
}

/** Every Bi in a value replaced by its Text for `lang`; everything else is left as it is. */
export type Localized<T> = T extends Bi
  ? Text
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

const isBi = (value: object): value is Bi => {
  const keys = Object.keys(value);
  return keys.length === 2 && keys.includes("en") && keys.includes("kn") && Object.values(value).every((v) => typeof v === "string");
};

export function localize<T>(value: T, lang: Lang): Localized<T> {
  if (Array.isArray(value)) return value.map((item) => localize(item, lang)) as Localized<T>;
  if (value && typeof value === "object") {
    if (isBi(value)) return pick(value, lang) as Localized<T>;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)])) as Localized<T>;
  }
  return value as Localized<T>;
}

/** Fills {name} placeholders, e.g. "until {time}". */
export const fill = (template: Text, values: Record<string, string>): Text => ({
  ...template,
  text: template.text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match),
});

/**
 * The same page in `lang`. English lives at the root and Kannada under /kn: /menu ↔ /kn/menu, /#visit ↔ /kn#visit.
 * Accepts a path with a hash or query.
 */
export function localePath(path: string, lang: Lang) {
  const stripped = path.replace(/^\/kn(?=[/#?]|$)/, "");
  const bare = stripped.startsWith("/") ? stripped : `/${stripped}`;
  if (lang === "en") return bare;
  if (bare === "/") return "/kn";
  return /^\/[#?]/.test(bare) ? `/kn${bare.slice(1)}` : `/kn${bare}`;
}
