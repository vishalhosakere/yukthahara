"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** A section that fades up once it scrolls into view. Without JS (no html.js) it is simply visible. */
export function Reveal({ id, className, children }: { id?: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`${className} reveal${shown ? " in" : ""}`}>
      {children}
    </section>
  );
}
