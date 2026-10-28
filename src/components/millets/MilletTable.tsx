import type { ReactNode } from "react";
import type { Millet } from "@/lib/content";
import type { Bi } from "@/lib/i18n";
import { T } from "@/components/ui/T";

type Columns = { millet: Bi; protein: Bi; fibre: Bi; iron: Bi; gi: Bi };

/** A table from 768px; below that each millet is a card with a 2×2 grid of figures. */
export function MilletTable({ millets, columns }: { millets: Millet[]; columns: Columns }) {
  const cols = [columns.protein, columns.fibre, columns.iron, columns.gi];
  return (
    <>
      <p className="table-unit">
        <T v={columns.millet} />
      </p>
      <div className="tablewrap">
        <table className="compare mtable">
          <thead>
            <tr>
              <th scope="col">
                <T v={columns.millet} />
              </th>
              {cols.map((col, i) => (
                <th scope="col" key={i}>
                  <T v={col} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {millets.map((m) => {
              const { protein, fibre, iron, gi, giBand } = m.nutrition;
              const cells: { value: ReactNode; className?: string }[] = [
                { value: protein },
                { value: fibre },
                { value: iron },
                { value: <T v={gi} />, className: `gi gi--${giBand}` },
              ];
              return (
                <tr key={m.slug}>
                  <th scope="row">
                    <span className="mname">
                      {m.name} · <span lang="kn">{m.localName.kn}</span>
                    </span>
                    <i className="mlat">{m.latin}</i>
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className={cell.className}>
                      <span className="cell-label">
                        <T v={cols[i]} />
                      </span>
                      <span className="val">{cell.value}</span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
