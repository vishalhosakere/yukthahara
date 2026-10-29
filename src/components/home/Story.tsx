import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized } from "@/lib/i18n";

export const SPLIT_IMAGE_SIZES = "(min-width: 1200px) 480px, (min-width: 820px) 45vw, 100vw";

export function Story({ story }: { story: Localized<Home["story"]> }) {
  return (
    <Reveal className="section" id="story" labelledBy="story-title">
      <div className="wrap split">
        <div>
          <SectionHead eyebrow={story.eyebrow} heading={story.heading} id="story-title" />
          <p className="story-body">
            <T v={story.body} />
          </p>
        </div>
        {story.image && (
          <figure className="figure">
            <Image src={story.image} alt={story.imageAlt.text} fill sizes={SPLIT_IMAGE_SIZES} />
          </figure>
        )}
      </div>
    </Reveal>
  );
}
