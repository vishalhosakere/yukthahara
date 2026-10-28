import Image from "next/image";
import Link from "next/link";
import type { Home } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

export function MenuPreview({ section }: { section: Home["menuPreview"] }) {
  return (
    <Reveal className="section" id="menu">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} />
        <ul className="tiles">
          {section.tiles.map((tile, i) => (
            <li key={i}>
              <Link className="tile" href={tile.category ? `/menu#${tile.category}` : "/menu"}>
                {tile.image && <Image src={tile.image} alt={tile.imageAlt} fill sizes="(min-width: 640px) 33vw, 78vw" />}
                <span className="cap">
                  <T v={tile.caption} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="cta">
          <Link className="btn btn--primary" href="/menu">
            <T v={section.cta} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
