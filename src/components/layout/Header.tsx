"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { T } from "@/components/ui/T";
import type { Lang, Text } from "@/lib/i18n";
import type { NavLink } from "@/lib/nav";
import { Brand } from "./Brand";
import { LangToggle } from "./LangToggle";

type Props = {
  lang: Lang;
  name: Text;
  homeHref: string;
  links: NavLink[];
  hours: Text[];
  phoneHref: string | null;
  labels: { call: Text; mainNav: Text; openMenu: Text; closeMenu: Text; home: Text };
};

const DESKTOP = "(min-width: 900px)";

/** Transparent over the home hero, solid everywhere else; a full-screen, modal menu below 900px. */
export function Header({ lang, name, homeHref, links, hours, phoneHref, labels }: Props) {
  const pathname = usePathname();
  const overHero = pathname === homeHref;
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
    // Modal: the page behind is out of reach (Tab included), and scrolling stays with the menu.
    const behind = [document.getElementById("main"), document.querySelector<HTMLElement>(".site-footer")];
    behind.forEach((node) => node && (node.inert = true));
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    const dismiss = (refocus: boolean) => {
      setOpenOn(null);
      if (refocus) burgerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss(true);
    // Turned to landscape on a tablet: the desktop nav takes over, so the menu must not keep the page locked.
    const wide = matchMedia(DESKTOP);
    const onWide = () => wide.matches && dismiss(false);
    addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      behind.forEach((node) => node && (node.inert = false));
      document.body.style.overflow = overflow;
      removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpenOn(null);
  const solid = !overHero || pastHero;

  return (
    <>
      <header className="site-nav" data-solid={solid} data-open={open}>
        <Brand name={name} href={homeHref} homeLabel={labels.home} onClick={close} />
        <nav className="nav-links" aria-label={labels.mainNav.text}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.href === pathname ? "page" : undefined}>
              <T v={link.label} />
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LangToggle lang={lang} />
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="sr-only">
              <T v={open ? labels.closeMenu : labels.openMenu} />
            </span>
            <span className="burger-bars" aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="mobile-menu" ref={panelRef} className="mobile-menu" data-open={open} inert={!open}>
        <nav aria-label={labels.mainNav.text}>
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={link.href === pathname ? "page" : undefined}
              style={{ "--i": i } as React.CSSProperties}
            >
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
              <T v={labels.call} />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
