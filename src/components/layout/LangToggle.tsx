"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTML_LANG, localePath, otherLang, type Lang } from "@/lib/i18n";
import { LANG_STORAGE_KEY } from "@/lib/lang-boot";

const NAMES: Record<Lang, string> = { en: "English", kn: "ಕನ್ನಡ" };

function remember(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }
}

/** A link to this page in the other language, named in that language. The choice is remembered for later visits. */
export function LangToggle({ lang, className = "lang" }: { lang: Lang; className?: string }) {
  const pathname = usePathname();
  const to = otherLang(lang);
  return (
    <Link className={className} href={localePath(pathname, to)} hrefLang={HTML_LANG[to]} lang={HTML_LANG[to]} onClick={() => remember(to)}>
      <span className={to === "kn" ? "kn" : undefined}>{NAMES[to]}</span>
    </Link>
  );
}
