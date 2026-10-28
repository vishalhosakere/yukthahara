import type { ReactNode } from "react";
import type { Bi } from "@/lib/i18n";
import { T } from "./T";

export function SectionHead({ eyebrow, heading, as: Heading = "h2", children }: { eyebrow: Bi; heading: Bi; as?: "h1" | "h2"; children?: ReactNode }) {
  return (
    <header className="section-head">
      <div className="rule" aria-hidden="true" />
      <p className="eyebrow">
        <T v={eyebrow} />
      </p>
      <Heading>
        <T v={heading} highlight="em" />
      </Heading>
      {children}
    </header>
  );
}
