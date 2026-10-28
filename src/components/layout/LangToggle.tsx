"use client";

const STORAGE_KEY = "yh-lang";

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

/** Runs before first paint so a saved (or ?lang=kn) choice never flashes English first. */
export const LANG_BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=new URLSearchParams(location.search).get('lang');var l=(q==='kn'||q==='en')?q:localStorage.getItem('${STORAGE_KEY}');if(l==='kn'){d.dataset.lang='kn';d.lang='kn'}}catch(e){}})()`;
