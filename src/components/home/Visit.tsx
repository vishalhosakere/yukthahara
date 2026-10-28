import type { Home, Settings, Ui } from "@/lib/content";
import type { Bi } from "@/lib/i18n";
import { addressLine, mapsHref, telHref } from "@/lib/site";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

export function Visit({ visit, settings, ui, hours }: { visit: Home["visit"]; settings: Settings; ui: Ui; hours: Bi[] }) {
  const address = addressLine(settings.address);
  const maps = mapsHref(settings);
  return (
    <Reveal className="section band" id="visit">
      <div className="wrap visit">
        <div>
          <header className="section-head">
            <div className="rule" aria-hidden="true" />
            <p className="eyebrow">
              <T v={visit.eyebrow} />
            </p>
            <h2>
              <T v={settings.name} />
            </h2>
          </header>
          <dl className="vlines">
            <div className="vline">
              <dt>
                <T v={ui.labels.address} />
              </dt>
              <dd>
                <T v={address} />
              </dd>
            </div>
            <div className="vline">
              <dt>
                <T v={ui.labels.hours} />
              </dt>
              {hours.map((line, i) => (
                <dd key={i}>
                  <T v={line} />
                </dd>
              ))}
            </div>
          </dl>
          <div className="cta">
            {settings.phone && (
              <a className="btn btn--primary" href={telHref(settings.phone)}>
                <T v={ui.labels.call} />
              </a>
            )}
            <a className="btn" href={maps} target="_blank" rel="noopener noreferrer">
              <T v={ui.labels.directions} />
            </a>
          </div>
        </div>
        <a className="mapbox" href={maps} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <span className="mapbox-label">
            <T v={visit.mapLabel} /> ↗
          </span>
          <span className="mapbox-addr">
            <T v={address} />
          </span>
        </a>
      </div>
    </Reveal>
  );
}
