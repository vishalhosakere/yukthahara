import Link from "next/link";
import type { Bi } from "@/lib/i18n";
import { T } from "@/components/ui/T";

export function Brand({ name, size = "sm", onClick }: { name: Bi; size?: "sm" | "lg"; onClick?: () => void }) {
  return (
    <Link className={`brand brand--${size}`} href="/" onClick={onClick} aria-label={`${name.en} home`}>
      <span className="word">
        <T v={name} />
      </span>
      <svg className="twirl" viewBox="263 365 147 37" fill="currentColor" aria-hidden="true">
        <g transform="translate(0,518) scale(0.1,-0.1)">
          <path d="M4030 1503 c-28 -10 -62 -48 -85 -94 -22 -42 -94 -108 -152 -138 -33 -17 -34 -14 -13 22 20 32 28 107 12 107 -5 0 -19 -12 -33 -26 -19 -20 -24 -37 -25 -77 l0 -52 -55 -14 c-81 -20 -215 -1 -413 60 -269 83 -387 94 -513 47 -73 -27 -128 -96 -89 -111 9 -4 22 7 35 29 31 53 95 77 201 77 106 0 162 -12 370 -76 163 -50 167 -51 300 -51 130 -1 137 0 192 28 32 16 86 53 120 82 35 29 74 56 88 59 53 13 84 47 104 113 6 17 4 22 -11 21 -10 0 -25 -3 -33 -6z" />
          <path d="M3886 1471 c-22 -23 -30 -43 -34 -81 -5 -57 6 -64 37 -24 19 24 37 100 29 124 -2 6 -16 -3 -32 -19z" />
          <path d="M3904 1320 c-32 -13 -37 -28 -15 -39 30 -16 73 -13 103 7 22 14 25 21 16 30 -14 14 -73 15 -104 2z" />
          <path d="M3780 1230 c-13 -9 -13 -11 0 -20 35 -24 130 -24 130 0 0 26 -98 41 -130 20z" />
        </g>
      </svg>
    </Link>
  );
}
