import KeystaticApp from "./keystatic";

// The CMS is a client-only app; navigations into it needn't be instant.
export const instant = false;

export const metadata = { title: "Yuktaahara CMS", robots: { index: false, follow: false } };

export default function KeystaticLayout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
