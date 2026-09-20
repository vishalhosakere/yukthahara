/* Shared bilingual (English / Kannada) engine for all Yukthahara variants.
   Content is placeholder-level on purpose — swap for CMS-driven strings later.
   Usage: put data-i18n="key" on any text node; call YH.mountToggle(selector). */
(function (global) {
  const DICT = {
    en: {
      brand: "Yukthahara",
      nav_millets: "Siridhanya",
      nav_c4: "Why millets",
      nav_visit: "Visit",
      lang_btn: "ಕನ್ನಡ",
      kicker: "Guided by Dr. Khadar Vali · Mysore",
      hero_title: "Eat like the land remembers.",
      hero_sub: "A millet kitchen serving the five positive siridhanya grains — cooked slow, for modern wellbeing.",
      cta_menu: "Explore the menu",
      cta_visit: "Find us in Mysore",
      sec_millets_title: "The five siridhanya",
      sec_millets_sub: "Positive millets — the grains Dr. Khadar Vali calls medicine you can eat.",
      m_foxtail: "Foxtail · Navane",
      m_browntop: "Browntop · Korle",
      m_kodo: "Kodo · Harka",
      m_little: "Little · Same",
      m_barnyard: "Barnyard · Oodalu",
      sec_c4_title: "Kind to you. Kind to the earth.",
      sec_c4_sub: "Millets are C4 grasses — they fix more carbon on less water and thrive on rain alone.",
      stat_water: "less water than rice",
      stat_rain: "grown rainfed, no irrigation",
      stat_gi: "low glycemic index",
      nav_menu: "Menu",
      visit_hours: "Tue–Sun · 8am – 10pm",
      visit_addr: "Kuvempunagar, Mysore 570023",
      footer: "Yukthahara · Mysore, Karnataka"
    },
    kn: {
      brand: "ಯುಕ್ತಾಹಾರ",
      nav_millets: "ಸಿರಿಧಾನ್ಯ",
      nav_c4: "ಏಕೆ ಸಿರಿಧಾನ್ಯ",
      nav_visit: "ಭೇಟಿ",
      lang_btn: "English",
      kicker: "ಡಾ. ಖಾದರ್ ವಲಿ ಅವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ · ಮೈಸೂರು",
      hero_title: "ಭೂಮಿ ನೆನಪಿಟ್ಟಂತೆ ಉಣ್ಣಿ.",
      hero_sub: "ಪಂಚ ಸಿರಿಧಾನ್ಯಗಳ ಅಡುಗೆಮನೆ — ನಿಧಾನವಾಗಿ ಬೇಯಿಸಿದ, ಆಧುನಿಕ ಆರೋಗ್ಯಕ್ಕಾಗಿ.",
      cta_menu: "ಮೆನು ನೋಡಿ",
      cta_visit: "ಮೈಸೂರಿನಲ್ಲಿ ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ",
      sec_millets_title: "ಪಂಚ ಸಿರಿಧಾನ್ಯ",
      sec_millets_sub: "ಧನಾತ್ಮಕ ಸಿರಿಧಾನ್ಯ — ಡಾ. ಖಾದರ್ ವಲಿ ಅವರು ಔಷಧವೆಂದು ಕರೆಯುವ ಧಾನ್ಯಗಳು.",
      m_foxtail: "ನವಣೆ",
      m_browntop: "ಕೊರಲೆ",
      m_kodo: "ಹಾರಕ",
      m_little: "ಸಾಮೆ",
      m_barnyard: "ಊದಲು",
      sec_c4_title: "ನಿಮಗೂ ಒಳಿತು. ಭೂಮಿಗೂ ಒಳಿತು.",
      sec_c4_sub: "ಸಿರಿಧಾನ್ಯಗಳು ಸಿ4 ಹುಲ್ಲುಗಳು — ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ಹೆಚ್ಚು ಇಂಗಾಲ ಹಿಡಿದಿಟ್ಟು, ಮಳೆಯಿಂದಲೇ ಬೆಳೆಯುತ್ತವೆ.",
      stat_water: "ಅಕ್ಕಿಗಿಂತ ಕಡಿಮೆ ನೀರು",
      stat_rain: "ಮಳೆಯಾಶ್ರಿತ, ನೀರಾವರಿ ಇಲ್ಲ",
      stat_gi: "ಕಡಿಮೆ ಗ್ಲೈಸೆಮಿಕ್ ಸೂಚ್ಯಂಕ",
      nav_menu: "ಮೆನು",
      visit_hours: "ಮಂಗಳ–ಭಾನು · ಬೆ 8 – ರಾ 10",
      visit_addr: "ಕುವೆಂಪುನಗರ, ಮೈಸೂರು 570023",
      footer: "ಯುಕ್ತಾಹಾರ · ಮೈಸೂರು, ಕರ್ನಾಟಕ"
    }
  };

  const KEY = "yh-lang";
  function current() { return localStorage.getItem(KEY) || "en"; }

  function apply(lang) {
    const d = DICT[lang] || DICT.en;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      if (d[k] != null) el.textContent = d[k];
    });
    localStorage.setItem(KEY, lang);
    document.dispatchEvent(new CustomEvent("yh:lang", { detail: { lang } }));
  }

  function toggle() { apply(current() === "en" ? "kn" : "en"); }

  const YH = {
    dict: DICT,
    apply,
    toggle,
    current,
    init() { apply(current()); },
    mountToggle(el) {
      const btn = typeof el === "string" ? document.querySelector(el) : el;
      if (btn) btn.addEventListener("click", toggle);
    }
  };
  global.YH = YH;
  document.addEventListener("DOMContentLoaded", () => YH.init());
})(window);
