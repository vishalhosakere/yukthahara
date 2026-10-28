import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MilletTable } from "@/components/millets/MilletTable";
import { SectionHead } from "@/components/ui/SectionHead";
import { rich, T } from "@/components/ui/T";
import { getMillets, getMilletsPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getMilletsPage()]);
  return pageMetadata({
    title: page.title.en.replace(/\.$/, ""),
    description: `${page.intro.en} Protein, fibre, iron and glycemic index of the five siridhanya millets, with sources.`,
    path: "/millets",
    siteName: settings.name.en,
  });
}

export default async function MilletsPage() {
  const [page, millets] = await Promise.all([getMilletsPage(), getMillets()]);
  const { honesty, environment, sources } = page;
  return (
    <>
      <section className="section pagehead">
        <div className="wrap">
          <SectionHead as="h1" eyebrow={page.eyebrow} heading={page.title}>
            <p className="lead muted">
              <T v={page.intro} />
            </p>
          </SectionHead>
        </div>
      </section>

      <Reveal className="section">
        <div className="wrap">
          <h2>
            <T v={page.tableHeading} />
          </h2>
          <MilletTable millets={millets} columns={page.columns} />
          <p className="note">
            <T v={page.tableNote} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <div className="rule" aria-hidden="true" />
              <h2>
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
                <Image src={honesty.image} alt={honesty.imageAlt} fill sizes="(min-width: 820px) 45vw, 100vw" />
              </figure>
            )}
          </div>
          <p className="disclaimer">
            <T v={page.disclaimer} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section band">
        <div className="wrap">
          <SectionHead eyebrow={environment.eyebrow} heading={environment.heading}>
            <p className="lead">
              <T v={environment.body} />
            </p>
          </SectionHead>
          <p className="note">
            <T v={environment.sources} />
          </p>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="wrap">
          <div className="rule" aria-hidden="true" />
          <p className="eyebrow">
            <T v={sources.eyebrow} />
          </p>
          <p className="note sources">{rich(sources.body, "i")}</p>
          <div className="cta">
            <Link className="btn btn--primary" href="/menu">
              <T v={page.ctaMenu} />
            </Link>
            <Link className="btn" href="/">
              <T v={page.ctaHome} />
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
