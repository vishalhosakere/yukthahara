import type { Metadata } from "next";
import { STRIP_NETLIFY_HEAD } from "@/lib/netlify-head";
import "./globals.css";
import { LANG_BOOT } from "@/lib/lang-boot";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 · Page not found",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" data-lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${STRIP_NETLIFY_HEAD};${LANG_BOOT}` }} />
      </head>
      <body>
        <main id="main">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
