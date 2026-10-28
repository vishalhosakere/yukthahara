"use client";

import { LANG_STORAGE_KEY as STORAGE_KEY } from "@/lib/lang-boot";

function toggleLanguage() {
  const root = document.documentElement;
  const next = root.dataset.lang === "kn" ? "en" : "kn";
  root.dataset.lang = next;
  root.lang = next === "kn" ? "kn" : "en-IN";
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
}

export function LangToggle({ className = "lang" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={toggleLanguage}>
      <span className="en" lang="kn">
        ಕನ್ನಡ
      </span>
      <span className="kn" lang="en">
        English
      </span>
    </button>
  );
}
