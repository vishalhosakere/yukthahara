import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";

const dir = join(process.cwd(), "assets/fonts");

// Read once at module load so the image routes can be prerendered. Satori cannot shape Kannada, so share images are English.
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
