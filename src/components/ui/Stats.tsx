import type { Text } from "@/lib/i18n";
import { CountUp } from "./CountUp";
import { T } from "./T";

/** A leading number counts up when it scrolls in ("6×", "54"); ranges like "200–300" stay static. */
function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      <CountUp value={match[1]} />
      {match[2]}
    </>
  );
}

/** Each stat reads as one phrase, number first: "6× the fibre of white rice". */
export function Stats({ stats }: { stats: readonly { value: string; label: Text }[] }) {
  return (
    <ul className="stats">
      {stats.map((stat, i) => (
        <li className="stat" key={i}>
          <span className="big">
            <StatValue value={stat.value} />
          </span>{" "}
          <span className="lbl">
            <T v={stat.label} />
          </span>
        </li>
      ))}
    </ul>
  );
}
