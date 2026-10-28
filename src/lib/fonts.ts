import { Anek_Kannada, Archivo, Bricolage_Grotesque, Space_Mono } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const body = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Small labels only; not worth a preload on the critical path.
export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
  preload: false,
});

// Downloaded only when Kannada text is actually displayed.
export const kannada = Anek_Kannada({
  subsets: ["kannada"],
  variable: "--font-anek",
  display: "swap",
  preload: false,
});

export const fontVariables = [display.variable, body.variable, mono.variable, kannada.variable].join(" ");
