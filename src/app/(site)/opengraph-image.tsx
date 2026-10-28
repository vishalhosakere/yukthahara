import { ImageResponse } from "next/og";
import { getHome, getSettings } from "@/lib/content";
import { BRAND, brandFonts, publicImage } from "@/lib/og";

export const alt = "Yuktaahara, a millet kitchen in Mysore: Eat right, eat millets.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);
  const photo = await publicImage(home.hero.image);
  const lines = home.hero.headline.en.split("\n");
  const label = { fontFamily: "Mono", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" as const };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BRAND.ivory, color: BRAND.forest, padding: 56, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex" }}>
            <span style={{ ...label, background: BRAND.forest, color: BRAND.ivory, padding: "10px 16px", boxShadow: `6px 6px 0 ${BRAND.accent}` }}>
              {home.hero.eyebrow.en}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: "Display", fontSize: 104, lineHeight: 1, letterSpacing: -2, textTransform: "uppercase" }}>
                {line.split(/\*([^*]+)\*/).map((part, j) =>
                  j % 2 ? (
                    <span key={j} style={{ background: BRAND.accent, color: BRAND.ivory, padding: "4px 16px 8px", transform: "rotate(-1.6deg)", boxShadow: `8px 8px 0 ${BRAND.forest}` }}>
                      {part}
                    </span>
                  ) : (
                    part.trim() && <span key={j}>{part.trim()}</span>
                  ),
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Display", fontSize: 60, letterSpacing: -1, lineHeight: 1 }}>{settings.name.en}</span>
            <span style={{ ...label, color: BRAND.walnut, fontSize: 18 }}>
              {settings.address.street.en} · {settings.address.city.en}
            </span>
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", width: 340, height: 518, border: `6px solid ${BRAND.forest}`, boxShadow: `14px 14px 0 ${BRAND.forest}`, overflow: "hidden" }}>
            <img src={photo} alt="" width={340} height={518} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    { ...size, fonts: brandFonts },
  );
}
