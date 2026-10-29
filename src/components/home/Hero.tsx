import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized } from "@/lib/i18n";
import { HeroVideo } from "./HeroVideo";

type Props = { hero: Localized<Home["hero"]>; menuHref: string; status: ReactNode };

export function Hero({ hero, menuHref, status }: Props) {
  const video = hero.playVideo && hero.video ? hero.video : null;
  return (
    <section className="hero" data-hero aria-labelledby="hero-title">
      <div className="hero-media">
        {hero.image && (
          <Image className="hero-img" src={hero.image} alt={hero.imageAlt.text} fill sizes="100vw" quality={60} loading="eager" fetchPriority="high" />
        )}
        {video && <HeroVideo src={video} />}
      </div>
      <div className="hero-copy">
        <p className="eyebrow eyebrow--block">
          <T v={hero.eyebrow} />
        </p>
        <h1 id="hero-title">
          <T v={hero.headline} highlight="hit" />
        </h1>
        <p className="sub">
          <T v={hero.intro} highlight="mark" />
        </p>
        <div className="cta">
          <Link className="btn btn--primary" href={menuHref}>
            <T v={hero.primaryCta} />
          </Link>
          <Link className="btn" href="#visit">
            <T v={hero.secondaryCta} />
          </Link>
        </div>
        {status}
      </div>
    </section>
  );
}
