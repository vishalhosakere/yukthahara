import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized } from "@/lib/i18n";

export function Practices({ practices }: { practices: Localized<Home["practices"]> }) {
  return (
    <Reveal className="section" id="practices" labelledBy="practices-title">
      <div className="wrap">
        <SectionHead eyebrow={practices.eyebrow} heading={practices.heading} id="practices-title" />
        <ol className="practices">
          {practices.items.map((item, i) => (
            <li className="pcard" key={i}>
              <span className="no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>
                <T v={item.title} />
              </h3>
              <p className="why">
                <T v={item.body} />
              </p>
              {item.nevers.length > 0 && (
                <ul className="nevers">
                  {item.nevers.map((never, j) => (
                    <li className="never" key={j}>
                      <T v={never} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <aside className="callout">
          <span className="ic" aria-hidden="true">
            !
          </span>
          <p>
            <b>
              <T v={practices.callout.title} />
            </b>{" "}
            <T v={practices.callout.body} />
          </p>
        </aside>
      </div>
    </Reveal>
  );
}
