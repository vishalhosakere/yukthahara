import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { Home } from "@/lib/content";
import { T } from "@/components/ui/T";
import { HeroVideo } from "./HeroVideo";

export function Hero({ hero }: { hero: Home["hero"] }) {
  const video = hero.playVideo && hero.video && hero.image ? hero.video : null;
  const poster = video && hero.image ? getImageProps({ src: hero.image, alt: "", width: 1280, height: 720, quality: 60 }).props.src : null;

  return (
    <section className="hero" data-hero aria-labelledby="hero-title">
      <div className="hero-media">
        {hero.image && (
          <Image className="hero-img" src={hero.image} alt={hero.imageAlt} fill sizes="100vw" quality={60} loading="eager" fetchPriority="high" />
        )}
        {video && poster && <HeroVideo src={video} poster={poster} />}
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
          <Link className="btn btn--primary" href="/menu">
            <T v={hero.primaryCta} />
          </Link>
          <Link className="btn" href="#visit">
            <T v={hero.secondaryCta} />
          </Link>
        </div>
      </div>
    </section>
  );
}
