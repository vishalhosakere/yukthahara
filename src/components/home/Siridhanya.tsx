import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stats } from "@/components/ui/Stats";
import { T } from "@/components/ui/T";
import type { Home, Millet } from "@/lib/content";
import { pick, type Lang, type Localized } from "@/lib/i18n";

type Props = { section: Localized<Home["siridhanya"]>; millets: Millet[]; lang: Lang; milletsHref: string };

/** Each card leads with the name a reader of the page knows: Foxtail / Navane in English, ನವಣೆ / Foxtail in Kannada. */
export function Siridhanya({ section, millets, lang, milletsHref }: Props) {
  return (
    <Reveal className="section" id="siridhanya" labelledBy="siridhanya-title">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} id="siridhanya-title" />
        <ul className="mgrid">
          {millets.map((millet) => {
            const english = { text: millet.name, lang: "en" as const, fallback: lang === "kn" };
            const local = pick(millet.localName, lang);
            const [name, aside] = lang === "kn" && local.lang === "kn" ? [local, english] : [english, pick(millet.localName, "en")];
            return (
              <li className="mcard" key={millet.slug}>
                <span className="seed" aria-hidden="true" />
                <h3 className="name">
                  <T v={name} />
                </h3>
                <p className="local">
                  <T v={aside} />
                </p>
                <p className="lat">{millet.latin}</p>
                <p className="mnote">
                  <T v={pick(millet.highlight, lang)} />
                </p>
              </li>
            );
          })}
        </ul>
        <Stats stats={section.stats} />
        <div className="cta">
          <Link className="btn" href={milletsHref}>
            <T v={section.cta} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
