import Image from "next/image";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import { getMenu, getMenuPage, getSettings, getUi, type MenuCategory } from "@/lib/content";
import { localize, pick, type Lang, type Localized } from "@/lib/i18n";
import { menuJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { addressLine } from "@/lib/site";

export async function menuMetadata(lang: Lang) {
  const [settings, page, menu] = await Promise.all([getSettings(), getMenuPage(), getMenu()]);
  const sections = menu.map((c) => pick(c.title, lang).text.toLowerCase()).join(", ");
  const where = addressLine(settings.address, lang, false).text;
  return pageMetadata({
    lang,
    path: "/menu",
    title: pick(page.title, lang).text,
    // The intro, then what's on and where: specific enough to stand alone as a search result.
    description: `${pick(page.intro, lang).text.split(/(?<=\.)\s/)[0]} ${sections}. ${where}.`,
    siteName: pick(settings.name, lang).text,
    share: { page: "menu", alt: `${settings.name.en}: ${page.title.en}` },
  });
}

function MenuSection({ category }: { category: Localized<MenuCategory> }) {
  return (
    <section className="menu-cat" id={category.slug} aria-labelledby={`${category.slug}-title`}>
      <h2 id={`${category.slug}-title`}>
        <T v={category.title} />
      </h2>
      {category.photo && (
        <figure className="menu-photo">
          <Image src={category.photo} alt={category.photoAlt.text} fill sizes="(min-width: 1200px) 1100px, 100vw" />
        </figure>
      )}
      <ul className="items">
        {category.items.map((item, i) => (
          <li className="item" key={i}>
            <h3 className="nm">
              <T v={item.name} />
            </h3>
            <p className="price">₹{item.price}</p>
            {item.description.text && (
              <p className="ds">
                <T v={item.description} />
              </p>
            )}
            {item.tags.length > 0 && (
              <ul className="tags">
                {item.tags.map((tag) => (
                  <li className="tag" key={tag.slug}>
                    <T v={tag.label} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function MenuPage({ lang }: { lang: Lang }) {
  const [rawPage, rawMenu, settings, rawUi] = await Promise.all([getMenuPage(), getMenu(), getSettings(), getUi()]);
  const page = localize(rawPage, lang);
  const menu = localize(rawMenu, lang);
  const ui = localize(rawUi, lang);
  return (
    <section className="section pagehead" aria-labelledby="menu-page-title">
      <JsonLd data={menuJsonLd(settings, rawMenu, lang, page.title.text)} />
      <div className="wrap">
        <SectionHead as="h1" eyebrow={page.eyebrow} heading={page.title} id="menu-page-title">
          <p className="lead muted">
            <T v={page.intro} />
          </p>
        </SectionHead>
        <nav className="menu-nav" aria-label={ui.a11y.menuSections.text}>
          {menu.map((category) => (
            <a key={category.slug} href={`#${category.slug}`}>
              <T v={category.title} />
            </a>
          ))}
        </nav>
        {menu.map((category) => (
          <MenuSection key={category.slug} category={category} />
        ))}
        <p className="disclaimer">
          <T v={page.disclaimer} />
        </p>
      </div>
    </section>
  );
}
