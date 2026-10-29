import Link from "next/link";
import { T } from "@/components/ui/T";
import type { Lang, Text } from "@/lib/i18n";
import type { NavLink } from "@/lib/nav";
import { Brand } from "./Brand";
import { LangToggle } from "./LangToggle";

type Props = {
  lang: Lang;
  name: Text;
  copyrightName: string;
  homeHref: string;
  tagline: Text;
  links: NavLink[];
  address: Text;
  phone: string;
  phoneHref: string | null;
  hours: Text[];
  social: readonly { label: string; url: string }[];
  labels: { explore: Text; contact: Text; follow: Text; home: Text; newTab: Text };
};

export function Footer({ lang, name, copyrightName, homeHref, tagline, links, address, phone, phoneHref, hours, social, labels }: Props) {
  return (
    <footer className="site-footer">
      <div className="fgrid">
        <div className="fbrand">
          <Brand name={name} href={homeHref} homeLabel={labels.home} size="lg" />
          <p>
            <T v={tagline} />
          </p>
        </div>
        <nav aria-labelledby="footer-explore">
          <p className="eyebrow" id="footer-explore">
            <T v={labels.explore} />
          </p>
          <ul className="flinks">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <T v={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">
            <T v={labels.contact} />
          </p>
          <address className="fcontact">
            <span>
              <T v={address} />
            </span>
            {phoneHref && (
              <a href={phoneHref} className="flink">
                {phone}
              </a>
            )}
            {hours.map((line, i) => (
              <span key={i}>
                <T v={line} />
              </span>
            ))}
          </address>
          {social.length > 0 && (
            <>
              <p className="eyebrow fsocial-head">
                <T v={labels.follow} />
              </p>
              <ul className="flinks">
                {social.map((profile) => (
                  <li key={profile.url}>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer">
                      {profile.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only">
                        {" "}
                        (<T v={labels.newTab} />)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="fbot">
        <span>
          © {process.env.NEXT_PUBLIC_BUILD_YEAR} {copyrightName}
        </span>
        <LangToggle lang={lang} className="lang lang--footer" />
      </div>
    </footer>
  );
}
