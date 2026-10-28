import type { CSSProperties } from "react";
import type { Home } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

const amount = (value: string) => {
  const match = value.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

/** One table: a classic grid from 768px, a stack of per-nutrient bar cards below it. */
export function Nutrition({ nutrition }: { nutrition: Home["nutrition"] }) {
  const { columns } = nutrition;
  const heads = [columns.millet, columns.rice, columns.wheat];
  return (
    <Reveal className="section" id="nutrition">
      <div className="wrap">
        <SectionHead eyebrow={nutrition.eyebrow} heading={nutrition.heading} />
        <p className="table-unit">
          <T v={columns.nutrient} />
        </p>
        <div className="tablewrap">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">
                  <T v={columns.nutrient} />
                </th>
                {heads.map((head, i) => (
                  <th scope="col" key={i} className={i === 0 ? "ours" : undefined}>
                    <T v={head} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nutrition.rows.map((row, r) => {
                const values = [row.millet, row.rice, row.wheat];
                const amounts = values.map(amount);
                const max = Math.max(...amounts.map((a) => a ?? 0));
                return (
                  <tr key={r}>
                    <th scope="row">
                      <T v={row.label} />
                      {row.lowerIsBetter && (
                        <small className="lib">
                          <T v={nutrition.lowerIsBetter} />
                        </small>
                      )}
                    </th>
                    {values.map((value, i) => {
                      const a = amounts[i];
                      return (
                        <td key={i} className={i === 0 ? "ours" : "usual"}>
                          <span className="cell-label">
                            <T v={heads[i]} />
                          </span>
                          <span className="val">{value}</span>
                          {a !== null && max > 0 && (
                            <span className="bar" aria-hidden="true" style={{ "--w": `${Math.max((a / max) * 100, 3)}%` } as CSSProperties} />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="note">
          <T v={nutrition.note} />
        </p>
        <p className="disclaimer">
          <T v={nutrition.disclaimer} />
        </p>
      </div>
    </Reveal>
  );
}
