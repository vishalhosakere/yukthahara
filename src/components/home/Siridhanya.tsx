import Link from "next/link";
import type { Home, Millet } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stats } from "@/components/ui/Stats";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

export function Siridhanya({ section, millets }: { section: Home["siridhanya"]; millets: Millet[] }) {
  return (
    <Reveal className="section" id="siridhanya">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} />
        <ul className="mgrid">
          {millets.map((millet) => (
            <li className="mcard" key={millet.slug}>
              <span className="seed" aria-hidden="true" />
              <h3 className="name">
                <span className="en">{millet.name}</span>
                <span className="kn" lang="kn">
                  {millet.localName.kn || millet.name}
                </span>
              </h3>
              <p className="local">
                <span className="en">{millet.localName.en}</span>
                <span className="kn" lang="en">{millet.name}</span>
              </p>
              <p className="lat">{millet.latin}</p>
              <p className="mnote">
                <T v={millet.highlight} />
              </p>
            </li>
          ))}
        </ul>
        <Stats stats={section.stats} />
        <div className="cta">
          <Link className="btn" href="/millets">
            <T v={section.cta} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
