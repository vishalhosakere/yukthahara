import type { Lang, Text } from "./i18n";

export const WEEK = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof WEEK)[number];
export type HoursRow = { days: readonly Day[]; opens: string; closes: string };

const SHORT: Record<Lang, Record<Day, string>> = {
  en: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" },
  kn: { mon: "ಸೋಮ", tue: "ಮಂಗಳ", wed: "ಬುಧ", thu: "ಗುರು", fri: "ಶುಕ್ರ", sat: "ಶನಿ", sun: "ಭಾನು" },
};
const FULL: Record<Lang, Record<Day, string>> = {
  en: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
  kn: { mon: "ಸೋಮವಾರ", tue: "ಮಂಗಳವಾರ", wed: "ಬುಧವಾರ", thu: "ಗುರುವಾರ", fri: "ಶುಕ್ರವಾರ", sat: "ಶನಿವಾರ", sun: "ಭಾನುವಾರ" },
};
const EVERY_DAY: Record<Lang, string> = { en: "Every day", kn: "ಪ್ರತಿದಿನ" };
const TOMORROW: Record<Lang, string> = { en: "tomorrow", kn: "ನಾಳೆ" };

const filled = (hours: readonly HoursRow[]) => hours.filter((row) => row.days.length && row.opens && row.closes);

/**
 * Consecutive days collapse into ranges, including across the end of the week: tue..sun → "Tue–Sun",
 * sat, sun, mon → "Sat–Mon". Two days stay a list.
 */
function formatDays(days: readonly Day[], lang: Lang) {
  const open = WEEK.map((d) => days.includes(d));
  if (open.every(Boolean)) return EVERY_DAY[lang];
  // Start just after a closed day, so a run that wraps past Sunday stays in one piece.
  const start = open.findIndex((isOpen, i) => isOpen && !open[(i + 6) % 7]);
  const runs: Day[][] = [];
  for (let k = 0; k < 7; k++) {
    const i = (start + k) % 7;
    if (!open[i]) continue;
    const run = runs.at(-1);
    if (run && open[(i + 6) % 7] && k > 0) run.push(WEEK[i]);
    else runs.push([WEEK[i]]);
  }
  const names = SHORT[lang];
  return runs.map((run) => (run.length > 2 ? `${names[run[0]]}–${names[run.at(-1)!]}` : run.map((d) => names[d]).join(", "))).join(", ");
}

const parse = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return { h: h || 0, m: m || 0 };
};
const minutesOf = (time: string) => {
  const { h, m } = parse(time);
  return h * 60 + m;
};
const pad = (m: number) => (m ? `:${String(m).padStart(2, "0")}` : "");

/** 8am, 10:30pm; in Kannada the part of the day in full, ಬೆಳಿಗ್ಗೆ 8. Western digits match prices elsewhere on the site. */
export function formatTime(time: string, lang: Lang) {
  const { h, m } = parse(time);
  const hour12 = h % 12 || 12;
  if (lang === "en") return `${hour12}${pad(m)}${h < 12 ? "am" : "pm"}`;
  const period = h >= 4 && h < 12 ? "ಬೆಳಿಗ್ಗೆ" : h >= 12 && h < 16 ? "ಮಧ್ಯಾಹ್ನ" : h >= 16 && h < 20 ? "ಸಂಜೆ" : "ರಾತ್ರಿ";
  return `${period} ${hour12}${pad(m)}`;
}

export function hoursLines(hours: readonly HoursRow[], lang: Lang): Text[] {
  return filled(hours).map((row) => ({
    text: `${formatDays(row.days, lang)} · ${formatTime(row.opens, lang)} – ${formatTime(row.closes, lang)}`,
    lang,
    fallback: false,
  }));
}

/** The kitchen's clock: what day and minute it is in Mysuru, wherever the visitor is. */
function mysuruNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEK.indexOf(get("weekday").toLowerCase().slice(0, 3) as Day);
  return { day, minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenState =
  | { open: true; closes: string }
  | { open: false; opens: { time: string; day: Day | null; tomorrow: boolean } | null };

/** Open or closed right now, with the next change. A closing time at or before the opening time runs past midnight. */
export function openState(hours: readonly HoursRow[], now = new Date()): OpenState {
  const rows = filled(hours);
  const { day, minute } = mysuruNow(now);
  for (const row of rows) {
    const opens = minutesOf(row.opens);
    const closes = minutesOf(row.closes);
    const overnight = closes <= opens;
    const today = row.days.includes(WEEK[day]);
    const yesterday = row.days.includes(WEEK[(day + 6) % 7]);
    if (today && minute >= opens && (overnight || minute < closes)) return { open: true, closes: row.closes };
    if (overnight && yesterday && minute < closes) return { open: true, closes: row.closes };
  }
  for (let ahead = 0; ahead < 8; ahead++) {
    const d = WEEK[(day + ahead) % 7];
    const next = rows
      .filter((row) => row.days.includes(d) && (ahead > 0 || minutesOf(row.opens) > minute))
      .sort((a, b) => minutesOf(a.opens) - minutesOf(b.opens))[0];
    if (next) return { open: false, opens: { time: next.opens, day: ahead === 0 ? null : d, tomorrow: ahead === 1 } };
  }
  return { open: false, opens: null };
}

export const dayName = (day: Day, tomorrow: boolean, lang: Lang) => (tomorrow ? TOMORROW[lang] : FULL[lang][day]);

const SCHEMA_DAY: Record<Day, string> = FULL.en;

export function openingHoursSpecification(hours: readonly HoursRow[]) {
  return filled(hours).map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEK.filter((d) => row.days.includes(d)).map((d) => SCHEMA_DAY[d]),
    opens: row.opens,
    closes: row.closes,
  }));
}
