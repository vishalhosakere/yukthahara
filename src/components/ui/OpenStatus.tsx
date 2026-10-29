"use client";

import { useSyncExternalStore } from "react";
import { dayName, formatTime, openState, type HoursRow } from "@/lib/hours";
import { fill, type Lang, type Text } from "@/lib/i18n";
import { T } from "./T";

type StatusLabels = { open: Text; closed: Text; until: Text; opensToday: Text; opensOn: Text };

// The current minute: stable between ticks, so the status re-renders only when it could have changed.
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 20_000);
  return () => clearInterval(id);
};
const minuteNow = () => Math.floor(Date.now() / 60_000);

/**
 * "Open now · until 10pm" or "Closed now · opens tomorrow 8am", in Mysuru time. The server can't know the visitor's
 * moment, so the static hours line renders first and the status replaces it once the page is running.
 */
export function OpenStatus({ hours, fallback, labels, lang, className = "" }: { hours: readonly HoursRow[]; fallback: Text; labels: StatusLabels; lang: Lang; className?: string }) {
  const minute = useSyncExternalStore(subscribe, minuteNow, () => 0);
  const state = minute ? openState(hours, new Date(minute * 60_000)) : null;

  let detail: Text | null = null;
  if (state?.open) detail = fill(labels.until, { time: formatTime(state.closes, lang) });
  else if (state?.opens) {
    const time = formatTime(state.opens.time, lang);
    detail = state.opens.day
      ? fill(labels.opensOn, { day: dayName(state.opens.day, state.opens.tomorrow, lang), time })
      : fill(labels.opensToday, { time });
  }

  return (
    <p className={`open-status ${className}`} data-state={state ? (state.open ? "open" : "closed") : undefined}>
      <span className="open-dot" aria-hidden="true" />
      {state ? (
        <>
          <b>
            <T v={state.open ? labels.open : labels.closed} />
          </b>
          {detail && (
            <>
              {" · "}
              <T v={detail} />
            </>
          )}
        </>
      ) : (
        <T v={fallback} />
      )}
    </p>
  );
}
