import { Environment } from "@/components/home/Environment";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { MenuGlance } from "@/components/home/MenuGlance";
import { Nutrition } from "@/components/home/Nutrition";
import { Practices } from "@/components/home/Practices";
import { Siridhanya } from "@/components/home/Siridhanya";
import { Story } from "@/components/home/Story";
import { Visit } from "@/components/home/Visit";
import { JsonLd } from "@/components/ui/JsonLd";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { getHome, getMenu, getMillets, getSettings, getUi } from "@/lib/content";
import { hoursLines } from "@/lib/hours";
import { localePath, localize, pick, type Lang } from "@/lib/i18n";
import { restaurantJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { addressLine, mapsHref, telHref } from "@/lib/site";

export async function homeMetadata(lang: Lang) {
  const settings = await getSettings();
  return pageMetadata({
    lang,
    path: "/",
    title: { absolute: pick(settings.seoTitle, lang).text },
    description: pick(settings.seoDescription, lang).text,
    siteName: pick(settings.name, lang).text,
    share: { page: "home", alt: `${settings.name.en}: ${settings.tagline.en}` },
  });
}

/**
 * A restaurant's front page, in the order a hungry visitor asks: what is it and is it open, what's to eat, how it's made,
 * why millets, and then where to find it.
 */
export async function HomePage({ lang }: { lang: Lang }) {
  const [rawHome, settings, rawUi, millets, rawMenu] = await Promise.all([getHome(), getSettings(), getUi(), getMillets(), getMenu()]);
  const home = localize(rawHome, lang);
  const ui = localize(rawUi, lang);
  const hours = hoursLines(settings.hours, lang);
  const menuHref = localePath("/menu", lang);
  const status = (className: string) =>
    hours.length > 0 && <OpenStatus hours={settings.hours} fallback={hours[0]} labels={ui.status} lang={lang} className={className} />;

  return (
    <>
      <JsonLd data={restaurantJsonLd(settings, rawMenu, [rawHome.hero.image, "/og/home"].filter((src): src is string => Boolean(src)))} />
      <Hero hero={home.hero} menuHref={menuHref} status={status("open-status--hero")} />
      <MenuGlance section={home.menuPreview} menu={localize(rawMenu, lang)} menuHref={menuHref} />
      <Practices practices={home.practices} />
      <Story story={home.story} />
      <Siridhanya section={home.siridhanya} millets={millets} lang={lang} milletsHref={localePath("/millets", lang)} />
      <Nutrition nutrition={home.nutrition} />
      <Environment section={home.environment} />
      <Faq faq={home.faq} />
      <Visit
        visit={home.visit}
        name={pick(settings.name, lang)}
        address={addressLine(settings.address, lang)}
        hours={hours}
        phoneHref={settings.phone ? telHref(settings.phone) : null}
        mapsHref={mapsHref(settings)}
        labels={{ ...ui.labels, newTab: ui.a11y.newTab }}
        status={status("open-status--visit")}
      />
    </>
  );
}
