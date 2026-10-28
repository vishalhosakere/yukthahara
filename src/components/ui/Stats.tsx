import type { Bi } from "@/lib/i18n";
import { CountUp } from "./CountUp";
import { T } from "./T";

/** A leading number counts up when its section scrolls in ("6×", "54"); ranges like "200–300" stay static. */
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

export function Stats({ stats }: { stats: readonly { value: string; label: Bi }[] }) {
  return (
    <dl className="stats">
      {stats.map((stat, i) => (
        <div className="stat" key={i}>
          <dt className="big">
            <StatValue value={stat.value} />
          </dt>
          <dd className="lbl">
            <T v={stat.label} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
