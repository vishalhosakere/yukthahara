import type { Metadata } from "next";
import { Environment } from "@/components/home/Environment";
import { Hero } from "@/components/home/Hero";
import { MenuPreview } from "@/components/home/MenuPreview";
import { Nutrition } from "@/components/home/Nutrition";
import { Practices } from "@/components/home/Practices";
import { Siridhanya } from "@/components/home/Siridhanya";
import { Story } from "@/components/home/Story";
import { Visit } from "@/components/home/Visit";
import { JsonLd } from "@/components/ui/JsonLd";
import { getHome, getMenu, getMillets, getSettings, getUi } from "@/lib/content";
import { hoursLines } from "@/lib/hours";
import { restaurantJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return pageMetadata({
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    path: "/",
    siteName: settings.name.en,
  });
}

export default async function HomePage() {
  const [home, settings, ui, millets, menu] = await Promise.all([getHome(), getSettings(), getUi(), getMillets(), getMenu()]);
  return (
    <>
      <JsonLd data={restaurantJsonLd(settings, menu, home.hero.image)} />
      <Hero hero={home.hero} />
      <Practices practices={home.practices} />
      <Nutrition nutrition={home.nutrition} />
      <Siridhanya section={home.siridhanya} millets={millets} />
      <Environment section={home.environment} />
      <Story story={home.story} />
      <MenuPreview section={home.menuPreview} />
      <Visit visit={home.visit} settings={settings} ui={ui} hours={hoursLines(settings.hours)} />
    </>
  );
}
