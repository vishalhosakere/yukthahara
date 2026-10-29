import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stats } from "@/components/ui/Stats";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized } from "@/lib/i18n";

export function Environment({ section }: { section: Localized<Home["environment"]> }) {
  return (
    <Reveal className="section band" id="environment" labelledBy="environment-title">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading} id="environment-title">
          <p className="lead">
            <T v={section.body} />
          </p>
        </SectionHead>
        <Stats stats={section.stats} />
      </div>
    </Reveal>
  );
}
