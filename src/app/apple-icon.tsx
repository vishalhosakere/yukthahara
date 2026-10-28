import { ImageResponse } from "next/og";
import { BRAND, brandFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.forest, color: BRAND.ivory, fontFamily: "Display", fontSize: 140, paddingBottom: 34, borderBottom: `20px solid ${BRAND.accent}` }}>
        y
      </div>
    ),
    { ...size, fonts: brandFonts },
  );
}
