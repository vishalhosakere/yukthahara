import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { T } from "@/components/ui/T";
import type { Home } from "@/lib/content";
import type { Localized } from "@/lib/i18n";

/** Native disclosure widgets: keyboard and screen-reader support for free, and one answer open at a time. */
export function Faq({ faq }: { faq: Localized<Home["faq"]> }) {
  if (!faq.items.length) return null;
  return (
    <Reveal className="section" id="faq" labelledBy="faq-title">
      <div className="wrap faq">
        <SectionHead eyebrow={faq.eyebrow} heading={faq.heading} id="faq-title" />
        <div className="qa-list">
          {faq.items.map((item, i) => (
            <details className="qa" name="faq" key={i}>
              <summary>
                <span className="qa-q">
                  <T v={item.question} />
                </span>
                <span className="qa-icon" aria-hidden="true" />
              </summary>
              <p className="qa-a">
                <T v={item.answer} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
