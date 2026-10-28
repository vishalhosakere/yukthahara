import Link from "next/link";
import type { Settings, Ui } from "@/lib/content";
import type { Bi } from "@/lib/i18n";
import { addressLine, telHref } from "@/lib/site";
import { T } from "@/components/ui/T";
import { Brand } from "./Brand";
import { LangToggle } from "./LangToggle";

export function Footer({ settings, ui, hours }: { settings: Settings; ui: Ui; hours: Bi[] }) {
  const explore = [
    { href: "/", label: ui.nav.home },
    { href: "/menu", label: ui.nav.menu },
    { href: "/millets", label: ui.nav.millets },
    { href: "/#visit", label: ui.nav.visit },
  ];
  return (
    <footer className="site-footer">
      <div className="fgrid">
        <div className="fbrand">
          <Brand name={settings.name} size="lg" />
          <p>
            <T v={settings.tagline} />
          </p>
        </div>
        <div>
          <p className="eyebrow">
            <T v={ui.labels.explore} />
          </p>
          <ul className="flinks">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <T v={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">
            <T v={ui.labels.contact} />
          </p>
          <address className="fcontact">
            <span>
              <T v={addressLine(settings.address, false)} />
            </span>
            {settings.phone && (
              <a href={telHref(settings.phone)} className="flink">
                {settings.phone}
              </a>
            )}
            {hours.map((line, i) => (
              <span key={i}>
                <T v={line} />
              </span>
            ))}
          </address>
        </div>
      </div>
      <div className="fbot">
        <span>
          © {process.env.NEXT_PUBLIC_BUILD_YEAR} {settings.name.en}
        </span>
        <LangToggle className="lang lang--footer" />
      </div>
    </footer>
  );
}
