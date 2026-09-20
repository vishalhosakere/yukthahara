# Yuktaahara

Website for **Yuktaahara** (ಯುಕ್ತಾಹಾರ) — a millet (siridhanya) restaurant in Mysore.
_Eat right, eat millets. · ಸರಿಯಾಗಿ ತಿನ್ನಿ, ಸಿರಿಧಾನ್ಯ ತಿನ್ನಿ._

A static, bilingual (English / Kannada) site with a warm, editorial "brutalist" design.

## Pages
- `index.html` — home: hero, **how we cook** (wood-pressed oils, iron/clay/brass, only siridhanya, palm jaggery), **nutrition comparison** (millet vs rice/wheat), the five siridhanya, C4/environment, Dr. Khadar Vali story, menu preview, visit.
- `menu.html` — sample menu (HTML, categorised, dietary/GI tags).
- `millets.html` — millet nutrition & sustainability, honestly sourced.
- `playground.html` — theme lab: try themes / palettes / font pairings live.
- `logo-lab.html` — drag-to-place tool for the logo flourish.

## Run
Static files — serve the folder and open in a browser:
```bash
python3 -m http.server 8770
# http://localhost:8770/
```

## Stack
Plain HTML/CSS/JS. Shared design system in `shared/site.css`, interactions in `shared/site.js`.
Bilingual via `.en` / `.kn` spans toggled by a language button. Fonts: Bricolage Grotesque + Archivo + Space Mono + Anek Kannada (Google Fonts).

## Notes
- Content is placeholder-level; **all Kannada is draft and needs a native-speaker review**.
- Images in `assets/media/` are royalty-free (Pexels / Pixabay, commercial use).
- Nutrition figures from IFCT 2017 / USDA; the site makes **no medical-cure claims** (millets support a balanced diet, not a treatment).
