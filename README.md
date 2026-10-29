# Yuktaahara

Website for **Yuktaahara** (ಯುಕ್ತಾಹಾರ), a millet (siridhanya) kitchen in Kuvempunagar, Mysuru.
_Eat right, eat millets. · ಸರಿಯಾಗಿ ತಿನ್ನಿ, ಸಿರಿಧಾನ್ಯ ತಿನ್ನಿ._

Two complete sites, English and Kannada, from one set of CMS content. Mobile-first, warm "brutalist" design.
Next.js 16 (App Router, Cache Components) · Keystatic (Git-based CMS) · Netlify.

## Run it

```bash
npm install
npm run dev                  # http://127.0.0.1:4101, CMS at /keystatic (see .env.example)
npm run build && npm start   # http://127.0.0.1:4111
npm run typecheck && npm run lint
```

Both servers bind to `127.0.0.1` only.

## Pages

| English | Kannada | What |
|---|---|---|
| `/` | `/kn` | Hero with open/closed status, menu at a glance, how we cook, the millet story, the five siridhanya, nutrition, environment, questions, visit |
| `/menu` | `/kn/menu` | Full menu by section, prices, dietary/GI tags |
| `/millets` | `/kn/millets` | Per-millet nutrition, what millets can and can't do, sources |

Each page exists in both languages with its own URL, `<html lang>`, title, description and share image, and the two point at each other (`hreflang`), so Google can show the Kannada page to Kannada searches. The language switch links to the same page in the other language and remembers the choice: a reader who picked Kannada lands on Kannada pages next time. Old `?lang=kn` links still work.

Share images (`/og/home`, `/og/menu`, `/og/millets`) are drawn from the CMS copy at build time. They are in English, because the image renderer can't shape Kannada script.

## Edit content

Everything visitors read lives in `content/` as YAML and is edited at `/keystatic`. Every text field is an English / Kannada pair; an empty Kannada field shows the English on the Kannada site until it is written.

| What | CMS section | File |
|---|---|---|
| Name, tagline, search title/description, phone, address, Maps link, opening hours, profile links | Restaurant details | `content/settings.yaml` |
| Menu sections (with an optional photo), dishes, prices (₹), tags, "show on the home page" | Menu | `content/menu/*.yaml` |
| Dietary & GI tags, and which diet each means for Google | Dietary & GI tags | `content/tags/*.yaml` |
| Home page sections, including the questions & answers | Home page | `content/home.yaml` |
| The five millets (cards on home, table on /millets) | The five millets | `content/millets/*.yaml` |
| Menu and millets page copy | Menu page, Millets page | `content/menu-page.yaml`, `content/millets-page.yaml` |
| Navigation, labels, open/closed wording, screen-reader labels, the 404 page | Navigation & labels | `content/ui.yaml` |

- Headings and intros support `*asterisks*` to highlight words and Enter for a line break.
- Opening hours are entered once (days + 24-hour times). The site writes them out in both languages, shows "Open now · until 10pm" in Mysuru time, and gives them to Google.
- The Call buttons appear only once a phone number is entered. Until then "Get directions" is the main action.
- **Photos:** Keystatic names an uploaded file after its field (`/media/home/hero/image.jpg`) and deletes the entry's old files when it saves, so every page keeps its media in its own folder (`public/media/home`, `public/media/millets-page`, `public/media/menu/<section>`). Don't point two fields at the same file; upload it twice instead.
- **Safety net:** the build checks the content and fails on a broken edit (a dish tagged with a deleted tag, a photo path that doesn't exist). Netlify then keeps the last good version live, and the build log names the field to fix.
- The hero can play a short, silent background video (Home page > Hero). It loads only after the page, never on data-saver or reduced motion.

## Deploy (Netlify)

`netlify.toml` builds with Netlify's Next.js runtime, version-pinned in `package.json` (`@netlify/plugin-nextjs`). It must be declared because this Netlify site was created before it became a Next.js app; without it Netlify serves `.next` as plain files and every page 404s.

The site URL is never hard-coded: `next.config.ts` inlines `NEXT_PUBLIC_SITE_URL` from Netlify's `URL` (production) or `DEPLOY_PRIME_URL` (previews), so canonicals, the sitemap, Open Graph and JSON-LD follow the `.netlify.app` domain today and the custom domain once it's set as primary. Deploy previews and branch deploys send `noindex` (as a meta tag and an `X-Robots-Tag` header) and stay crawlable so search engines can read it.

Response headers are set in `next.config.ts`: a Content-Security-Policy that keeps every source on this site (the CMS also gets GitHub, Keystatic Cloud and its font), plus `Permissions-Policy`, `Referrer-Policy`, `X-Frame-Options`, `nosniff` and HSTS.

The "Powered by Netlify" badge in the corner is added by Netlify on its free plan, outside this code.

### Turn on editing in production

`/keystatic` returns 404 in production until one of these is configured (`src/proxy.ts`, plus a second check in the API route). Add the variables in Netlify > Site configuration > Environment variables, then redeploy.

- **Keystatic Cloud (recommended for the owner):** no GitHub account needed. Create a project at keystatic.cloud, connect `vishalhosakere/yukthahara`, invite the owner by email, then set `NEXT_PUBLIC_KEYSTATIC_STORAGE=cloud` and `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT=team/project`.
- **GitHub mode:** set `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` and `NEXT_PUBLIC_KEYSTATIC_REPO`, open `/keystatic` locally once to create the GitHub App, and copy `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to Netlify. Only repo collaborators can sign in. Set all of them together: GitHub mode without the secrets fails the build.

Either way, each save is a commit to `main`, which triggers a deploy (about a minute).

### Get it on Google

1. In Google Search Console, add a **URL-prefix** property for the live address (the `.netlify.app` URL can't use DNS verification).
2. Choose the **HTML tag** method and copy only the `content="…"` value into the Netlify variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Redeploy, then click Verify.
3. Submit `https://<site>/sitemap.xml` under Sitemaps (it lists both languages), and use URL Inspection > Request indexing on `/`, `/menu`, `/millets` and their `/kn` pages.
4. Link the site from Google Business Profile. When a custom domain is added, make it primary in Netlify, redeploy, and add it as a new property.

See `.env.example` for every variable.

## Before launch

Only the owner can provide these; everything else is ready.

- [ ] **Phone number** (Restaurant details). The Call buttons and "accepts reservations" in Google's data switch on when it's filled.
- [ ] **Exact street address and a Google Maps link** (Restaurant details), so Directions open on the right pin.
- [ ] **Real dishes and prices.** The menu page says the current ones are a sample.
- [ ] **Food photos of your own dishes**, one per menu section (Menu > section > Photo). The stock thali photos showed white rice and wheat rotis and a dosa, which contradict the menu, so they were removed.
- [ ] **A native Kannada speaker's read-through** of all Kannada copy, especially the newer strings: search titles and descriptions, photo descriptions, the questions & answers, the open/closed wording, and the screen-reader labels.
- [ ] A rights-cleared photo before showing Dr. Khadar Vali (never AI-generate his likeness).

## Notes

- Photos in `public/media/` are royalty-free (Pexels / Pixabay, commercial use); `next/image` resizes them and serves AVIF/WebP. The millet photos show pearl millet, used to illustrate millets generally, and their descriptions say so.
- Nutrition figures are from IFCT 2017 / USDA. The site makes **no medical-cure claims**; see `design/PLAN.md` for the content stance.
- Fonts: Bricolage Grotesque, Archivo, Space Mono and Anek Kannada, self-hosted by `next/font`. The browser fetches Kannada only when Kannada is on screen. `assets/fonts/` holds the TTFs used to draw the share images.
- Motion is CSS only and respects reduced motion: sections rise into place as they scroll in, the hero headline's highlight lands like a stamp, and pages cross-fade.
- `design/` holds the original plan and the logo and design playgrounds. They are not deployed.

## Structure

```
content/                 CMS content (YAML)
keystatic.config.ts      CMS schema (English / Kannada pairs)
public/media/            photos and the optional hero video, one folder per CMS entry
design/                  original plan and design playgrounds (not deployed)
src/app/(en)/            English site: root layout and pages
src/app/kn/              Kannada site: root layout and pages
src/app/og/[page]/       share images
src/app/keystatic/       CMS admin (its own root layout)
src/app/api/keystatic/   CMS API (gated)
src/proxy.ts             keeps the CMS closed unless it is gated
src/components/pages/    each page, shared by both languages
src/components/          layout, home sections, millets table, UI pieces
src/lib/                 content readers and checks, i18n, hours, SEO, JSON-LD, share images
```
