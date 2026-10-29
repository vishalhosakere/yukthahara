import { Fragment, type ReactNode } from "react";
import { splitHighlights } from "@/lib/highlight";
import type { Text } from "@/lib/i18n";

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
      {splitHighlights(line).map((part, i) => (i % 2 ? HIGHLIGHTS[highlight](part, i) : part))}
    </Fragment>
  ));
}

/**
 * A CMS string in the page's language. Kannada is wrapped for its typography (.kn); English that stands in for missing
 * Kannada is marked lang="en", so screen readers switch voice for it.
 */
export function T({ v, highlight }: { v: Text; highlight?: Highlight }) {
  const content = highlight ? rich(v.text, highlight) : v.text;
  if (v.lang === "kn") return <span className="kn">{content}</span>;
  if (v.fallback) return <span lang="en">{content}</span>;
  return <>{content}</>;
}
