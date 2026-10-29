# Yukthahara — Website Plan (v1, for approval)

A millet (siridhanya) restaurant in Mysore, inspired by Dr. Khadar Vali. Bilingual English/Kannada.
Direction is **photography-led, warm, earthy, editorial, educational** — no particles, no tech gimmicks.
Synthesized from three research passes (design/UX, fact-checked nutrition/content, royalty-free media).

---

## 1. Direction — "Editorial Grain House"
A warm editorial storytelling scroll that reads like a beautifully printed food journal. Calm, grounded,
generous whitespace; dishes and millets are the heroes; education delivered as elegant modules, not lectures.
References that shaped it: mrspringmrsfresh (palette/warmth), Daylesford (credibility bands), Wildfarmed
(teach-the-philosophy), Brightland (editorial serif discipline), Gjelina (menu on its own page).

## 2. Palette (warm neutral base + earthy secondaries + ONE accent)
| Role | Name | Hex |
|---|---|---|
| Page background | Warm ivory | `#F3ECDA` |
| Cards / raised | Paper | `#FAF6EC` |
| Headings / primary btn / dark bands | Forest green | `#253D2A` |
| Footer / deepest bands | Deep forest | `#16281A` |
| Secondary fills / tags | Olive green | `#6E7150` |
| Body text on ivory | Walnut brown | `#5B4636` |
| **Single accent** — links, CTAs, stat highlights | Antique brass | `#B08D57` |
| Hairlines / muted UI | Stone/taupe | `#C9BEA9` |

Rules: ivory dominant; forest for structure/primary action; **brass is the only accent** (no second one).
Dark storytelling bands (C4 story, Khadar Vali) = forest with ivory text — palette inversion for rhythm.

## 3. Typography (all on Google Fonts; Kannada faces share the serif/sans register)
- **Display/headings EN:** Fraunces (warm editorial serif, ~600–700)
- **Display/headings KN:** Noto Serif Kannada
- **Body/UI EN:** Mulish (humanist, great for long reading + tables)
- **Body/UI KN:** Anek Kannada
- Eyebrows = tracked-out small-caps sans. No handwritten script (reads casual, not timeless).

## 4. Motion (tasteful, honors prefers-reduced-motion)
Scroll-reveal (fade + rise ~12–20px, once); sticky transparent→opaque condensing nav; hero = slow ken-burns
OR a short muted looping video with poster fallback; gentle card hover-lift; optional count-up on stats; optional
slow value-word marquee. No particles/WebGL/cursor tricks/autoplay-with-sound.

## 5. Information architecture — HYBRID
**Home (long-scroll story):** 1) Hero  2) Intro/brand statement  3) The Five Siridhanya (5 cards)
4) Nutrition + comparison ("the holistic choice")  5) Environmental / C4 story (dark band)
6) Dr. Khadar Vali + millet revolution (editorial story)  7) Menu preview → links to /menu
8) Visit/Contact (hours, address, map)  9) Footer (nav, hours, address, social, 2nd lang toggle).
**Dedicated pages:** `/menu` (full HTML menu — never a PDF), `/millets` (deep "Learn" content for SEO + depth).

---

## 6. Content spec (HONEST — this is the important part)

### The five siridhanya (names + one-line, review Kannada)
Foxtail (Navane, ನವಣೆ) · Browntop (Korle, ಕೊರಲೆ) · Kodo (Harka, ಹಾರಕ) · Little (Same, ಸಾಮೆ) · Barnyard (Oodalu, ಊದಲು).

### Nutrition — use **IFCT 2017** as primary source; footnote older values.
Representative high-confidence figures (per 100g raw): **Foxtail** — protein 12.3g, fiber 8.0g, iron 2.8mg,
calcium 31mg, GI 54.5 (low). Data confidence varies: **Browntop is data-poor** (absent from USDA/IFCT — mark
"indicative"); **little & barnyard iron and barnyard protein disagree ~8× across sources → publish RANGES, not single numbers.**

### Comparison table (per 100g; publish with the nuances)
| | Millet (foxtail) | White rice | Refined wheat (maida) | Whole wheat |
|---|---|---|---|---|
| Dietary fiber (g) | 8.0 | 1.3 | 2.7 | 13.1 |
| Protein (g) | 12.3 | 7.1 | 10.3 | 9.6 |
| Glycemic Index | ~52.7 (group mean) | ~71.7 | ~74.2 | — |
| Iron (mg) | 2.8 | 0.8 | 1.17 | 3.71 |
| Magnesium (mg) | 81 | 25 | 22 | 117 |
Nuances to show, not hide: millets clearly beat **polished rice & refined wheat**; **whole wheat matches/beats
millet on fiber & Mg**; fortified rice/bread narrows the micronutrient gap; low-GI applies to *minimally processed* millet only.

### Environment / C4 (sourced figures)
Rice needs ~1,200–2,000 mm/season vs pearl millet on ~200–300 mm; rice uses ~2–5× more water per kg than other
cereals; India rice irrigation footprint ~1,490 m³/t vs millets ~1/5–1/7. Short-season (barnyard 45–60 days),
drought/heat-tolerant, low-input. **Avoid** the popular "3,000–5,000 L/kg rice" figure (unverified); frame millet's
edge as "rainfed, low-irrigation" (true), not lowest total per-kg footprint.

### Dr. Khadar Vali (neutral)
"Millet Man of India," Mysuru-based food-and-agriculture scientist, Padma Shri 2023; revived and named the five
Siridhanya "positive millets"; philosophy = food as medicine + natural farming. **Do NOT repeat the "worked at NASA"
claim (unsupported).** Portrait must be a rights-cleared/official photo (do not AI-generate a real person's face).

### ⛔ Health claims to AVOID (must not publish — misinformation + trust/legal risk)
No "cure/reverse diabetes, cancer, thyroid, PCOD, BP, kidney/liver disease"; no "cures in 4 steps / 6 months";
no per-organ millet claims; **don't call all five low-GI** (kodo 65.4 & little 64.2 are *intermediate*).
Thyroid especially: millets can be *goitrogenic* — never claim they treat thyroid disease.
### ✅ What we CAN say (well-supported)
High fiber; lower average GI than white rice/refined wheat; may **help manage** blood sugar / modest lipid & BP
improvements *as part of a balanced diet*; good iron & magnesium; gluten-free; water-efficient rainfed C4 crops;
"wholesome traditional grain." Attach a disclaimer to every health statement:
> *"Millets are a nutritious whole grain that can support a balanced diet; they are not a treatment or cure for any
> disease. Consult a qualified doctor before changing your diet to manage a medical condition."*

Honest downsides worth a small note on /millets: anti-nutrients (soak/ferment to mitigate); kodo mold-toxin risk (cite ICAR/IIMR).

---

## 7. Bilingual strings (CANDIDATES — must be native-reviewed before launch)
- Tagline (Khadar's): **Eat Right, Eat Millets** / **ಸಿರಿಧಾನ್ಯವೇ ನಮ್ಮ ಆಹಾರ**
- Hero line (kept, EN): **Eat like the land remembers.** — KN rendered as a noun phrase to avoid the bad imperative:
  candidate **ಭೂಮಿ ನೆನಪಿಟ್ಟ ಆಹಾರ** (flag for native review; the tagline can carry the Kannada hero instead).
- **ಉಣ್ಣಿ is removed everywhere** (slang/offensive, per client).
- Labels: Menu ಮೆನು · Visit ಭೇಟಿ · The five siridhanya ಪಂಚ ಸಿರಿಧಾನ್ಯ · Why millets ಸಿರಿಧಾನ್ಯ ಏಕೆ · Nutrition ಪೋಷಕಾಂಶ · Environment ಪರಿಸರ · Story ಕಥೆ.

## 8. Media
Downloaded (CC0, commercial, self-hostable) in `assets/media/`: `millet-field.jpg`, `millet-grains-raw.jpg`,
`millet-ears-golden-field.jpg`, `millet-dosa.jpg`, `south-indian-thali.jpg`, `thali-wooden-table.jpg`, `hero-field.mp4`.
Caveat: the dosa/thali shots are authentic South Indian food but NOT verified millet-made — fine as placeholders,
but real menu photography (or AI images below) is needed for accuracy.

### Gemini / Nano Banana Pro prompts (for gaps)
1. *Five siridhanya flat-lay:* "Overhead flat-lay of five small rustic bowls of raw Indian millets on warm ivory linen and dark wood, soft natural window light, shallow depth of field, earthy muted palette, editorial food photography, 4:5."
2. *Millet dosa:* "Crisp golden siridhanya (millet) dosa on a rustic ceramic plate with coconut chutney and sambar, warm ivory + olive table, natural side light, gentle steam, editorial South Indian food photography, 3:2."
3. *Millet bowl:* "Wholesome bowl of cooked foxtail millet with vegetables and herbs, stoneware, warm ivory background, olive napkin, brass spoon, soft daylight, top-down, cozy earthy mood, 1:1."
4. *Millet field hero:* "Golden foxtail millet field at golden hour, tall grain ears swaying, warm cinematic light, shallow depth, Karnataka farmland, editorial, 16:9."
5. *Ingredient still life:* "Rustic still life of millet grains spilling from a burlap sack onto dark wood with a brass bowl and dried millet spikes, warm low-key light, timeless mood, 3:2."
(Do NOT AI-generate Dr. Khadar Vali's likeness — supply a rights-cleared photo.)

## 9. Build approach (prototype)
Plain HTML/CSS/JS multi-page (`index.html` home, `menu.html`, `millets.html`), reusing/updating `shared/` for the new
palette, type, and corrected bilingual dictionary. Framework/monorepo refactor stays deferred until the look is locked.

## 10. Open decisions (need your call before building)
- Hero: single cinematic photo (ken-burns) vs short muted dish/field video loop?
- Confirm the honest content stance (celebrate real benefits, no disease-cure claims, disclaimer)?
- First build scope: home page only, or home + menu + millets together?
- AI images: will you generate from the prompts above, or build on the sourced placeholders for now?
