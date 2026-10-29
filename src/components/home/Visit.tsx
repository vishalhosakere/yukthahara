import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized, Text } from "@/lib/i18n";

type Props = {
  visit: Localized<Home["visit"]>;
  name: Text;
  address: Text;
  hours: Text[];
  phoneHref: string | null;
  mapsHref: string;
  labels: { address: Text; hours: Text; call: Text; directions: Text; newTab: Text };
  status: ReactNode;
};

export function Visit({ visit, name, address, hours, phoneHref, mapsHref, labels, status }: Props) {
  const newTab = (
    <span className="sr-only">
      {" "}
      (<T v={labels.newTab} />)
    </span>
  );
  return (
    <Reveal className="section band" id="visit" labelledBy="visit-title">
      <div className="wrap visit">
        <div>
          <header className="section-head">
            <div className="rule" aria-hidden="true" />
            <p className="eyebrow">
              <T v={visit.eyebrow} />
            </p>
            <h2 id="visit-title">
              <T v={name} />
            </h2>
          </header>
          {status}
          <dl className="vlines">
            <div className="vline">
              <dt>
                <T v={labels.address} />
              </dt>
              <dd>
                <T v={address} />
              </dd>
            </div>
            <div className="vline">
              <dt>
                <T v={labels.hours} />
              </dt>
              {hours.map((line, i) => (
                <dd key={i}>
                  <T v={line} />
                </dd>
              ))}
            </div>
          </dl>
          <div className="cta">
            {phoneHref && (
              <a className="btn btn--primary" href={phoneHref}>
                <T v={labels.call} />
              </a>
            )}
            <a className={`btn${phoneHref ? "" : " btn--primary"}`} href={mapsHref} target="_blank" rel="noopener noreferrer">
              <T v={labels.directions} />
              {newTab}
            </a>
          </div>
        </div>
        <a className="mapbox" href={mapsHref} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <span className="mapbox-label">
            <T v={visit.mapLabel} /> <span aria-hidden="true">↗</span>
            {newTab}
          </span>
          <span className="mapbox-addr">
            <T v={address} />
          </span>
        </a>
      </div>
    </Reveal>
  );
}
