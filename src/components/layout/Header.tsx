"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Bi } from "@/lib/i18n";
import { T } from "@/components/ui/T";
import { Brand } from "./Brand";
import { LangToggle } from "./LangToggle";

export type NavLink = { href: string; label: Bi };

type Props = {
  name: Bi;
  links: NavLink[];
  hours: Bi[];
  phoneHref: string | null;
  callLabel: Bi;
};

/** Transparent over the home hero, solid everywhere else; full-screen menu below 900px. */
export function Header({ name, links, hours, phoneHref, callLabel }: Props) {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = overHero ? document.querySelector("[data-hero]") : null;
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(entry.intersectionRatio < 0.35), { threshold: [0, 0.35, 1] });
    io.observe(hero);
    return () => io.disconnect();
  }, [overHero]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      burgerRef.current?.focus();
    };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpenOn(null);
  const solid = !overHero || pastHero;

  return (
    <>
      <header className="site-nav" data-solid={solid} data-open={open}>
        <Brand name={name} onClick={close} />
        <nav className="nav-links" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.href === pathname ? "page" : undefined}>
              <T v={link.label} />
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LangToggle />
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
            <span className="burger-bars" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="mobile-menu" ref={panelRef} className="mobile-menu" data-open={open} inert={!open}>
        <nav aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={close} aria-current={link.href === pathname ? "page" : undefined}>
              <T v={link.label} />
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          {hours.map((line, i) => (
            <p key={i}>
              <T v={line} />
            </p>
          ))}
          {phoneHref && (
            <a className="btn btn--primary" href={phoneHref}>
              <T v={callLabel} />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
