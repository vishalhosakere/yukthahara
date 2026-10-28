import { knDigits, type Bi } from "./i18n";
import type { Settings } from "./content";

const WEEK = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
type Day = (typeof WEEK)[number];

const EN: Record<Day, string> = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
const KN: Record<Day, string> = { mon: "ಸೋಮ", tue: "ಮಂಗಳ", wed: "ಬುಧ", thu: "ಗುರು", fri: "ಶುಕ್ರ", sat: "ಶನಿ", sun: "ಭಾನು" };
const SCHEMA: Record<Day, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

type Hours = Settings["hours"];

/** Consecutive days collapse into ranges: tue..sun -> "Tue–Sun"; two days stay a list. */
function formatDays(days: readonly Day[], names: Record<Day, string>, everyDay: string) {
  const sorted = WEEK.filter((d) => days.includes(d));
  if (sorted.length === 7) return everyDay;
  const runs: Day[][] = [];
  for (const day of sorted) {
    const run = runs.at(-1);
    if (run && WEEK.indexOf(day) === WEEK.indexOf(run[run.length - 1]) + 1) run.push(day);
    else runs.push([day]);
  }
  return runs
    .map((run) => (run.length > 2 ? `${names[run[0]]}–${names[run[run.length - 1]]}` : run.map((d) => names[d]).join(", ")))
    .join(", ");
}

function parse(time: string) {
  const [h, m] = time.split(":").map(Number);
  return { h: h || 0, m: m || 0 };
}

const formatTimeEn = (time: string) => {
  const { h, m } = parse(time);
  const hour12 = h % 12 || 12;
  return `${hour12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

/** Kannada clocks name the part of the day: ಬೆ (morning), ಮ (afternoon), ಸಂ (evening), ರಾ (night). */
const formatTimeKn = (time: string) => {
  const { h, m } = parse(time);
  const period = h >= 4 && h < 12 ? "ಬೆ" : h >= 12 && h < 16 ? "ಮ" : h >= 16 && h < 20 ? "ಸಂ" : "ರಾ";
  const hour12 = h % 12 || 12;
  return `${period} ${knDigits(`${hour12}${m ? `:${String(m).padStart(2, "0")}` : ""}`)}`;
};

export function hoursLines(hours: Hours): Bi[] {
  return hours
    .filter((row) => row.days.length && row.opens && row.closes)
    .map((row) => ({
      en: `${formatDays(row.days, EN, "Every day")} · ${formatTimeEn(row.opens)} – ${formatTimeEn(row.closes)}`,
      kn: `${formatDays(row.days, KN, "ಪ್ರತಿದಿನ")} · ${formatTimeKn(row.opens)} – ${formatTimeKn(row.closes)}`,
    }));
}

export function openingHoursSpecification(hours: Hours) {
  return hours
    .filter((row) => row.days.length && row.opens && row.closes)
    .map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: WEEK.filter((d) => row.days.includes(d)).map((d) => SCHEMA[d]),
      opens: row.opens,
      closes: row.closes,
    }));
}
