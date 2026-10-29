import type { ReactNode } from "react";

type Props = { id?: string; className: string; labelledBy?: string; children: ReactNode };

/**
 * A section that rises into place as it scrolls into view. Pure CSS (a scroll-driven animation), so it never waits on
 * JavaScript: browsers without scroll timelines, print and reduced motion simply show it.
 */
export function Reveal({ id, className, labelledBy, children }: Props) {
  return (
    <section id={id} className={`${className} reveal`} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
