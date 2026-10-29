import type { ReactNode } from "react";
import { T } from "@/components/ui/T";
import type { Millet } from "@/lib/content";
import { pick, type Lang, type Text } from "@/lib/i18n";

type Columns = { millet: Text; protein: Text; fibre: Text; iron: Text; gi: Text };

/** A table from 768px; below that each millet is a card with a 2×2 grid of figures. Both names are given in both languages. */
export function MilletTable({ millets, columns, lang }: { millets: Millet[]; columns: Columns; lang: Lang }) {
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
                { value: <T v={pick(gi, lang)} />, className: `gi gi--${giBand}` },
              ];
              const english = <span lang={lang === "kn" ? "en" : undefined}>{m.name}</span>;
              const kannada = m.localName.kn ? <span className="kn" lang={lang === "en" ? "kn" : undefined}>{m.localName.kn}</span> : null;
              const [first, second] = lang === "kn" && kannada ? [kannada, english] : [english, kannada];
              return (
                <tr key={m.slug}>
                  <th scope="row">
                    <span>
                      {first}
                      {second && <> · {second}</>}
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
