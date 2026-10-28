import Image from "next/image";
import type { Home } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

export function Story({ story }: { story: Home["story"] }) {
  return (
    <Reveal className="section" id="story">
      <div className="wrap split">
        <div>
          <SectionHead eyebrow={story.eyebrow} heading={story.heading} />
          <p className="story-body">
            <T v={story.body} />
          </p>
        </div>
        {story.image && (
          <figure className="figure">
            <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 820px) 45vw, 100vw" />
          </figure>
        )}
      </div>
    </Reveal>
  );
}
