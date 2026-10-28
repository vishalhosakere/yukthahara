import type { Metadata } from "next";
import { MenuSection } from "@/components/menu/MenuSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import { getMenu, getMenuPage, getSettings } from "@/lib/content";
import { menuJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page, menu] = await Promise.all([getSettings(), getMenuPage(), getMenu()]);
  const sections = menu.map((c) => c.title.en.toLowerCase()).join(", ");
  return pageMetadata({
    title: page.title.en,
    description: `${page.intro.en} Menu sections: ${sections}. ${settings.address.street.en}, ${settings.address.city.en}.`,
    path: "/menu",
    siteName: settings.name.en,
  });
}

export default async function MenuPage() {
  const [page, menu, settings] = await Promise.all([getMenuPage(), getMenu(), getSettings()]);
  return (
    <section className="section pagehead">
      <JsonLd data={menuJsonLd(settings, menu)} />
      <div className="wrap">
        <SectionHead as="h1" eyebrow={page.eyebrow} heading={page.title}>
          <p className="lead muted">
            <T v={page.intro} />
          </p>
        </SectionHead>
        <nav className="menu-nav" aria-label="Menu sections">
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
