# Yuktaahara

Website for **Yuktaahara** (ಯುಕ್ತಾಹಾರ), a millet (siridhanya) restaurant in Mysore.
_Eat right, eat millets. · ಸರಿಯಾಗಿ ತಿನ್ನಿ, ಸಿರಿಧಾನ್ಯ ತಿನ್ನಿ._

Bilingual (English / Kannada), mobile-first, warm editorial "brutalist" design.
Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Keystatic (Git-based CMS) · Netlify.

## Run it

```bash
npm install
npm run dev          # http://127.0.0.1:4101, CMS at http://127.0.0.1:4101/keystatic
npm run build && npm start   # http://127.0.0.1:4111
npm run typecheck && npm run lint
```

Both servers bind to `127.0.0.1` only.

## Pages

| Route | What |
|---|---|
| `/` | Hero, how we cook, nutrition comparison, the five siridhanya, environment, Dr. Khadar Vali story, menu preview, visit |
| `/menu` | Full menu by section, prices, dietary/GI tags |
| `/millets` | Per-millet nutrition, what millets can and can't do, sources |
| `/lab/playground.html`, `/lab/logo-lab.html` | Internal design tools. Not linked, `noindex`, left out of the sitemap |

## Edit content

Everything visitors read lives in `content/` as YAML and is edited at `/keystatic`. Every text field is an English / Kannada pair; an empty Kannada field falls back to English.

| What | CMS section | File |
|---|---|---|
| Name, tagline, phone, address, opening hours, search title/description | Restaurant details | `content/settings.yaml` |
| Menu sections, dishes, prices (₹), tags per dish | Menu | `content/menu/*.yaml` |
| Dietary & GI tag labels (Vegan, Low GI…) | Dietary & GI tags | `content/tags/*.yaml` |
| Hero, how we cook, nutrition table, stats, story, menu tiles, visit | Home page | `content/home.yaml` |
| The five millets (cards on home, table on /millets) | The five millets | `content/millets/*.yaml` |
| Menu and millets page copy | Menu page, Millets page | `content/menu-page.yaml`, `content/millets-page.yaml` |
| Navigation and small labels | Navigation & labels | `content/ui.yaml` |

Headings and intros support `*asterisks*` to highlight words and Enter for a line break. Opening hours are entered once (days + 24-hour times); the site writes them out in both languages and gives them to Google.

The hero can play a short background video (Home page > Hero). It loads only after the page, never on data-saver or reduced-motion. It is **off**: the bundled `hero-field.mp4` is a stock wheat field, so swap in a millet clip before switching it on.

## Deploy (Netlify)

`netlify.toml` runs `npm run build` and publishes `.next`; Netlify detects Next.js and uses its Next.js runtime automatically.

The site URL is never hard-coded. `next.config.ts` inlines `NEXT_PUBLIC_SITE_URL` from Netlify's `URL` (production) or `DEPLOY_PRIME_URL` (previews), so canonicals, the sitemap, Open Graph and JSON-LD follow the `.netlify.app` domain today and the custom domain once it is set as primary. Deploy previews and branch deploys are `noindex` and their `robots.txt` disallows everything.

### Turn on editing in production

`/keystatic` returns 404 in production until one of these is configured (`src/proxy.ts`, plus a second check in the API route). Add the variables in Netlify > Site configuration > Environment variables, then redeploy.

- **Keystatic Cloud (recommended for the owner):** no GitHub account needed. Create a project at keystatic.cloud, connect `vishalhosakere/yukthahara`, invite the owner by email, then set `NEXT_PUBLIC_KEYSTATIC_STORAGE=cloud` and `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT=team/project`.
- **GitHub mode:** set `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` and `NEXT_PUBLIC_KEYSTATIC_REPO`, open `/keystatic` locally once to create the GitHub App, and copy `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to Netlify. Only repo collaborators can sign in. Set all of them together: GitHub mode without the secrets fails the build.

Either way, each save is a commit to `main`, which triggers a deploy (about a minute).

### Get it on Google

1. In Google Search Console, add a **URL-prefix** property for the live address (the `.netlify.app` URL can't use DNS verification).
2. Choose the **HTML tag** method and copy only the `content="…"` value into the Netlify variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Redeploy, then click Verify.
3. Submit `https://<site>/sitemap.xml` under Sitemaps, and use URL Inspection > Request indexing on `/`, `/menu` and `/millets`.
4. Link the site from Google Business Profile and the studio site. When a custom domain is added, make it primary in Netlify, redeploy, and add it as a new property.

See `.env.example` for every variable.

## Before launch

- [ ] Real phone number (`+91 00000 00000` is a placeholder, and it feeds the Call buttons and Google's structured data).
- [ ] Exact street address and a Google Maps link (Restaurant details).
- [ ] Real dishes and prices; the menu intro says they are placeholders.
- [ ] **All Kannada is draft and needs a native-speaker review.** New strings added in this version: "ದಾರಿ ತೋರಿಸಿ" (Get directions), "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ" (Open in Maps), "ಕಡಿಮೆ ಇದ್ದಷ್ಟು ಉತ್ತಮ" (Lower is better), "ಈ ಪುಟ ಸಿಗಲಿಲ್ಲ" (404).
- [ ] Real food photography: the two thali photos show white rice and wheat rotis, which contradicts "no rice, no wheat".
- [ ] A rights-cleared photo before showing Dr. Khadar Vali (never AI-generate his likeness).

## Notes

- Images in `public/media/` are royalty-free (Pexels / Pixabay, commercial use) and are resized and served as AVIF/WebP by `next/image`.
- Nutrition figures from IFCT 2017 / USDA; the site makes **no medical-cure claims** (see PLAN.md for the content stance).
- Fonts: Bricolage Grotesque, Archivo, Space Mono and Anek Kannada, self-hosted by `next/font`. Kannada loads only when Kannada is shown. `assets/fonts/` holds the TTFs used to draw the share image.

## Structure

```
content/                 CMS content (YAML)
keystatic.config.ts      CMS schema (bilingual en/kn pairs)
public/media/            photos and the optional hero video
public/lab/              internal design tools (noindex)
src/app/(site)/          public pages, their root layout, share image
src/app/keystatic/       CMS admin (separate root layout)
src/app/api/keystatic/   CMS API (gated)
src/proxy.ts             keeps the CMS closed unless it is gated
src/components/          layout, home sections, menu, millets, UI pieces
src/lib/                 cached content readers, hours, SEO, JSON-LD, fonts
```
