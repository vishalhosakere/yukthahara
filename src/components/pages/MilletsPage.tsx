import Image from "next/image";
import Link from "next/link";
import { SPLIT_IMAGE_SIZES } from "@/components/home/Story";
import { MilletTable } from "@/components/millets/MilletTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { rich, T } from "@/components/ui/T";
import { getMillets, getMilletsPage, getSettings } from "@/lib/content";
import { localePath, localize, pick, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function milletsMetadata(lang: Lang) {
  const [settings, page] = await Promise.all([getSettings(), getMilletsPage()]);
  return pageMetadata({
    lang,
    path: "/millets",
    title: pick(page.title, lang).text.replace(/\.$/, ""),
    description: `${pick(page.intro, lang).text} ${pick(page.tableHeading, lang).text}.`,
    siteName: pick(settings.name, lang).text,
    share: { page: "millets", alt: `${settings.name.en}: ${page.title.en}` },
  });
}

export async function MilletsPage({ lang }: { lang: Lang }) {
  const [rawPage, millets] = await Promise.all([getMilletsPage(), getMillets()]);
  const page = localize(rawPage, lang);
  const { honesty, environment, sources } = page;
  return (
    <>
      <section className="section pagehead" aria-labelledby="millets-page-title">
        <div className="wrap">
          <SectionHead as="h1" eyebrow={page.eyebrow} heading={page.title} id="millets-page-title">
            <p className="lead muted">
              <T v={page.intro} />
            </p>
          </SectionHead>
        </div>
      </section>

      <Reveal className="section" labelledBy="millets-table-title">
        <div className="wrap">
          <h2 id="millets-table-title">
            <T v={page.tableHeading} />
          </h2>
          <MilletTable millets={millets} columns={page.columns} lang={lang} />
          <p className="note">
            <T v={page.tableNote} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section" labelledBy="honesty-title">
        <div className="wrap">
          <div className="split">
            <div>
              <div className="rule" aria-hidden="true" />
              <h2 id="honesty-title">
                <T v={honesty.heading} />
              </h2>
              {honesty.points.map((point, i) => (
                <p className="point" key={i}>
                  <b>
                    <T v={point.lead} />
                  </b>{" "}
                  <T v={point.body} />
                </p>
              ))}
            </div>
            {honesty.image && (
              <figure className="figure">
                <Image src={honesty.image} alt={honesty.imageAlt.text} fill sizes={SPLIT_IMAGE_SIZES} />
              </figure>
            )}
          </div>
          <p className="disclaimer">
            <T v={page.disclaimer} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section band" labelledBy="planet-title">
        <div className="wrap">
          <SectionHead eyebrow={environment.eyebrow} heading={environment.heading} id="planet-title">
            <p className="lead">
              <T v={environment.body} />
            </p>
          </SectionHead>
          <p className="note">
            <T v={environment.sources} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section" labelledBy="sources-title">
        <div className="wrap">
          <div className="rule" aria-hidden="true" />
          <h2 className="eyebrow" id="sources-title">
            <T v={sources.eyebrow} />
          </h2>
          {/* The sources are titles of papers and tables: one list, the same on both pages. */}
          <p className="note sources" lang="en">
            {rich(sources.body, "i")}
          </p>
          <div className="cta">
            <Link className="btn btn--primary" href={localePath("/menu", lang)}>
              <T v={page.ctaMenu} />
            </Link>
            <Link className="btn" href={localePath("/", lang)}>
              <T v={page.ctaHome} />
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
