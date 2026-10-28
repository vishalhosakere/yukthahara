import type { Home } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stats } from "@/components/ui/Stats";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/ui/Reveal";

export function Environment({ section }: { section: Home["environment"] }) {
  return (
    <Reveal className="section band" id="environment">
      <div className="wrap">
        <SectionHead eyebrow={section.eyebrow} heading={section.heading}>
          <p className="lead">
            <T v={section.body} />
          </p>
        </SectionHead>
        <Stats stats={section.stats} />
      </div>
    </Reveal>
  );
}
