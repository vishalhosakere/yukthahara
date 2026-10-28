import { Fragment, type ReactNode } from "react";
import { knOrEn, type Bi } from "@/lib/i18n";

type Highlight = "em" | "hit" | "mark" | "i";

const HIGHLIGHTS: Record<Highlight, (text: string, key: number) => ReactNode> = {
  em: (text, key) => (
    <span key={key} className="em">
      {text}
    </span>
  ),
  hit: (text, key) => (
    <span key={key} className="hit">
      {text}
    </span>
  ),
  mark: (text, key) => <mark key={key}>{text}</mark>,
  i: (text, key) => <i key={key}>{text}</i>,
};

/** CMS convention: *words* are highlighted, newlines become line breaks. */
export function rich(text: string, highlight: Highlight): ReactNode {
  return text.split("\n").map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/\*([^*\n]+)\*/).map((part, i) => (i % 2 ? HIGHLIGHTS[highlight](part, i) : part))}
    </Fragment>
  ));
}

/** Renders both languages; CSS shows the one selected on <html data-lang>. */
export function T({ v, highlight }: { v: Bi; highlight?: Highlight }) {
  const kn = knOrEn(v);
  return (
    <>
      <span className="en">{highlight ? rich(v.en, highlight) : v.en}</span>
      <span className="kn" lang="kn">
        {highlight ? rich(kn, highlight) : kn}
      </span>
    </>
  );
}
