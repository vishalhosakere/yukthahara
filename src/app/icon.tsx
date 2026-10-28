import { ImageResponse } from "next/og";
import { BRAND, brandFonts } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.forest, color: BRAND.ivory, fontFamily: "Display", fontSize: 52, paddingBottom: 12, borderBottom: `8px solid ${BRAND.accent}` }}>
        y
      </div>
    ),
    { ...size, fonts: brandFonts },
  );
}
