export type Bi = { en: string; kn: string };

/** Kannada copy falls back to English until it has been written. */
export const knOrEn = (text: Bi) => text.kn.trim() || text.en;

const KN_DIGITS = "೦೧೨೩೪೫೬೭೮೯";
export const knDigits = (s: string) => s.replace(/\d/g, (d) => KN_DIGITS[Number(d)]);
