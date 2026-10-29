import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { splitHighlights } from "./highlight";

const dir = join(process.cwd(), "assets/fonts");

// Read once at module load so the image routes can be prerendered. Satori can't shape Kannada, so share images are English.
const [display, mono] = await Promise.all([readFile(join(dir, "Bricolage-ExtraBold.ttf")), readFile(join(dir, "SpaceMono-Bold.ttf"))]);

export const brandFonts = [
  { name: "Display", data: display, weight: 800 as const, style: "normal" as const },
  { name: "Mono", data: mono, weight: 700 as const, style: "normal" as const },
];

export const BRAND = { ivory: "#F3ECDA", paper: "#FAF6EC", forest: "#253D2A", accent: "#A6552E", walnut: "#5B4636", ochre: "#E0A63C" };

/** A public/ image as a data URL, for embedding in ImageResponse. */
export async function publicImage(src: string | null) {
  "use cache";
  cacheLife("max");
  if (!src) return null;
  const data = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : src.endsWith(".webp") ? "image/webp" : "image/jpeg";
  return `data:${type};base64,${data.toString("base64")}`;
}

/** The brand's "y" on forest with a terracotta underline: the favicon and home-screen icon. */
export function brandMark(px: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.forest,
          color: BRAND.ivory,
          fontFamily: "Display",
          fontSize: px * 0.78,
          paddingBottom: px * 0.19,
          borderBottom: `${Math.round(px * 0.115)}px solid ${BRAND.accent}`,
        }}
      >
        y
      </div>
    ),
    { width: px, height: px, fonts: brandFonts },
  );
}

type Card = { eyebrow: string; headline: string; footer: { left: string; right: string }; photo: string | null };

/** A 1200×630 share card: eyebrow tag, the headline with its highlight stamped, the name and place, and a photo. */
export function shareCard({ eyebrow, headline, footer, photo }: Card) {
  const label = { fontFamily: "Mono", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" as const };
  // Long lines break after a comma ("The grains, / honestly."), and the type steps down for whatever is still long.
  const lines = headline.split("\n").flatMap((line) => (line.length > 16 && line.includes(", ") ? line.replace(", ", ",\n").split("\n") : [line]));
  const longest = Math.max(...lines.map((line) => line.replace(/\*/g, "").length));
  const size = longest <= 12 ? 104 : longest <= 16 ? 88 : 72;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BRAND.ivory, color: BRAND.forest, padding: 56, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex" }}>
            <span style={{ ...label, background: BRAND.forest, color: BRAND.ivory, padding: "10px 16px", boxShadow: `6px 6px 0 ${BRAND.accent}` }}>
              {eyebrow}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22, fontFamily: "Display", fontSize: size, lineHeight: 1, letterSpacing: -2, textTransform: "uppercase" }}>
                {splitHighlights(line).map((part, j) =>
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <span style={{ fontFamily: "Display", fontSize: 60, letterSpacing: -1, lineHeight: 1 }}>{footer.left}</span>
            <span style={{ ...label, color: BRAND.walnut, fontSize: 18 }}>{footer.right}</span>
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", width: 340, height: 518, border: `6px solid ${BRAND.forest}`, boxShadow: `14px 14px 0 ${BRAND.forest}`, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only. */}
            <img src={photo} alt="" width={340} height={518} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630, fonts: brandFonts },
  );
}
