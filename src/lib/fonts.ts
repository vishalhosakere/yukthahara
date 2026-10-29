import { Anek_Kannada, Archivo, Bricolage_Grotesque, Space_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Labels and the hero eyebrow: small text that swaps in harmlessly, so it stays off the preload list.
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

/**
 * Fetched when Kannada text is on screen. Not preloaded even for Kannada pages: next/font's preloads apply site-wide,
 * and English readers shouldn't download a script they never see. It swaps in within the first paint or two.
 */
const kannada = Anek_Kannada({
  subsets: ["kannada"],
  variable: "--font-anek",
  display: "swap",
  preload: false,
});

export const fontVariables = [display.variable, body.variable, mono.variable, kannada.variable].join(" ");
