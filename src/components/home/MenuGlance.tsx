import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import type { Home, MenuCategory } from "@/lib/content";
import { fill, type Localized } from "@/lib/i18n";

type Props = { section: Localized<Home["menuPreview"]>; menu: Localized<MenuCategory>[]; menuHref: string };

/** The menu at a glance: each section with its featured dishes (or its first three) and their prices. */
export function MenuGlance({ section, menu, menuHref }: Props) {
  return (
    <Reveal className="section band" id="menu" labelledBy="menu-title">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} id="menu-title" />
        <ul className="glance">
          {menu.map((category) => {
            const featured = category.items.filter((item) => item.featured);
            const shown = featured.length ? featured : category.items.slice(0, 3);
            const href = `${menuHref}#${category.slug}`;
            return (
              <li key={category.slug} className="glance-card">
                {category.photo && (
                  <div className="glance-photo">
                    <Image src={category.photo} alt={category.photoAlt.text} fill sizes="(min-width: 1200px) 350px, (min-width: 900px) 30vw, (min-width: 640px) 46vw, 92vw" />
                  </div>
                )}
                <h3>
                  <Link href={href}>
                    <T v={category.title} />
                  </Link>
                </h3>
                <ul className="glance-items">
                  {shown.map((item, i) => (
                    <li key={i}>
                      <span className="nm">
                        <T v={item.name} />
                      </span>
                      <span className="leader" aria-hidden="true" />
                      <span className="price">₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                {category.items.length > shown.length && (
                  <Link className="glance-more" href={href}>
                    <T v={fill(section.more, { count: String(category.items.length) })} /> <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="cta">
          <Link className="btn btn--primary" href={menuHref}>
            <T v={section.cta} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
