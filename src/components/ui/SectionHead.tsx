import type { ReactNode } from "react";
import type { Text } from "@/lib/i18n";
import { T } from "./T";

type Props = { eyebrow: Text; heading: Text; as?: "h1" | "h2"; id?: string; children?: ReactNode };

export function SectionHead({ eyebrow, heading, as: Heading = "h2", id, children }: Props) {
  return (
    <header className="section-head">
      <div className="rule" aria-hidden="true" />
      <p className="eyebrow">
        <T v={eyebrow} />
      </p>
      <Heading id={id}>
        <T v={heading} highlight="em" />
      </Heading>
      {children}
    </header>
  );
}
