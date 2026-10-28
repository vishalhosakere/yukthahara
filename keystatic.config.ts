import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Storage is chosen by env so the same schema serves every environment:
 * local files in development, GitHub (repo collaborators) or Keystatic Cloud (invited team, no GitHub account) in production.
 */
const storageKind = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;

const storage =
  storageKind === "github"
    ? ({ kind: "github", repo: (process.env.NEXT_PUBLIC_KEYSTATIC_REPO ?? "vishalhosakere/yukthahara") as `${string}/${string}` } as const)
    : storageKind === "cloud"
      ? ({ kind: "cloud" } as const)
      : ({ kind: "local" } as const);

const HIGHLIGHT_HELP = "Wrap words in *asterisks* to highlight them. Press Enter for a line break.";

/** Every visitor-facing string is an English / Kannada pair. An empty Kannada value falls back to English on the site. */
function bi(label: string, opts: { multiline?: boolean; description?: string; required?: boolean } = {}) {
  return fields.object(
    {
      en: fields.text({ label: "English", multiline: opts.multiline, validation: opts.required ? { isRequired: true } : undefined }),
      kn: fields.text({ label: "ಕನ್ನಡ (Kannada)", multiline: opts.multiline }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );
}

const image = (label: string, description?: string) =>
  fields.image({ label, description, directory: "public/media", publicPath: "/media/" });

const stat = () =>
  fields.object(
    {
      value: fields.text({ label: "Number", description: "Shown large, e.g. 6× or 200–300. A leading number counts up on screen." }),
      label: bi("Label"),
    },
    { layout: [12, 12] },
  );

const section = {
  eyebrow: bi("Small label above the heading"),
  heading: bi("Heading", { multiline: true, description: HIGHLIGHT_HELP }),
};

const days = [
  { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "sat" },
  { label: "Sunday", value: "sun" },
] as const;

const time = (label: string) =>
  fields.text({
    label,
    description: "24-hour time, e.g. 08:00 or 22:30",
    validation: { pattern: { regex: /^([01]\d|2[0-3]):[0-5]\d$/, message: "Use HH:MM, e.g. 08:00" } },
  });

export default config({
  storage,
  ...(storageKind === "cloud" ? { cloud: { project: process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT ?? "" } } : {}),
  ui: {
    brand: { name: "Yuktaahara" },
    navigation: {
      Restaurant: ["settings", "menuCategories", "tags"],
      Pages: ["home", "menuPage", "milletsPage", "millets"],
      "Site-wide": ["ui"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Restaurant details",
      path: "content/settings",
      schema: {
        name: bi("Restaurant name", { required: true }),
        tagline: bi("Tagline"),
        seoTitle: fields.text({ label: "Search result title (English)", validation: { isRequired: true } }),
        seoDescription: fields.text({ label: "Search result description (English)", multiline: true }),
        phone: fields.text({ label: "Phone number", description: "As it should appear, e.g. +91 98450 12345. Used for the Call buttons." }),
        address: fields.object(
          {
            street: bi("Street / area"),
            city: bi("City"),
            postalCode: fields.text({ label: "PIN code" }),
            region: fields.text({ label: "State", defaultValue: "Karnataka" }),
            country: fields.text({ label: "Country code", defaultValue: "IN" }),
          },
          { label: "Address" },
        ),
        mapUrl: fields.url({ label: "Google Maps link", description: "Optional. Without it the Directions button searches for the address." }),
        hours: fields.array(
          fields.object(
            {
              days: fields.multiselect({ label: "Days", options: days }),
              opens: time("Opens"),
              closes: time("Closes"),
            },
            { layout: [12, 6, 6] },
          ),
          {
            label: "Opening hours",
            description: "Shown on the site in both languages and given to Google.",
            itemLabel: (p) => `${p.fields.days.value.join(", ")} · ${p.fields.opens.value}–${p.fields.closes.value}`,
          },
        ),
        servesCuisine: fields.array(fields.text({ label: "Cuisine" }), {
          label: "Cuisine types (for Google)",
          itemLabel: (p) => p.value,
        }),
      },
    }),
    ui: singleton({
      label: "Navigation & labels",
      path: "content/ui",
      schema: {
        nav: fields.object(
          {
            home: bi("Home"),
            howWeCook: bi("How we cook"),
            menu: bi("Menu"),
            millets: bi("Millets"),
            visit: bi("Visit"),
          },
          { label: "Menu links" },
        ),
        labels: fields.object(
          {
            explore: bi("Footer: Explore"),
            contact: bi("Footer: Contact"),
            address: bi("Address"),
            hours: bi("Hours"),
            call: bi("Call button"),
            directions: bi("Directions button"),
          },
          { label: "Labels" },
        ),
      },
    }),
    home: singleton({
      label: "Home page",
      path: "content/home",
      schema: {
        hero: fields.object(
          {
            eyebrow: bi("Small label"),
            headline: bi("Headline", { multiline: true, description: HIGHLIGHT_HELP }),
            intro: bi("Intro", { multiline: true, description: "Wrap words in *asterisks* to highlight them." }),
            primaryCta: bi("Menu button"),
            secondaryCta: bi("Visit button"),
            image: image("Hero photo", "Portrait photos crop well on phones. Also used as the video's poster."),
            imageAlt: fields.text({ label: "Hero photo description (for screen readers)" }),
            video: fields.file({
              label: "Background video (optional)",
              description: "Short, silent MP4 under 3 MB. Loads only after the page, never on data-saver or reduced-motion. The included clip is a stock wheat field: swap in a millet clip before switching it on.",
              directory: "public/media",
              publicPath: "/media/",
            }),
            playVideo: fields.checkbox({ label: "Play the background video", defaultValue: false }),
          },
          { label: "Hero" },
        ),
        practices: fields.object(
          {
            ...section,
            items: fields.array(
              fields.object({
                title: bi("Title"),
                body: bi("Why", { multiline: true }),
                nevers: fields.array(bi("Never"), { label: "What we never use", itemLabel: (p) => p.fields.en.value }),
              }),
              { label: "Practices", itemLabel: (p) => p.fields.title.fields.en.value },
            ),
            callout: fields.object({ title: bi("Callout title"), body: bi("Callout text", { multiline: true }) }, { label: "Callout" }),
          },
          { label: "How we cook" },
        ),
        nutrition: fields.object(
          {
            ...section,
            columns: fields.object(
              { nutrient: bi("First column"), millet: bi("Millet column"), rice: bi("Rice column"), wheat: bi("Wheat column") },
              { label: "Column headings" },
            ),
            rows: fields.array(
              fields.object(
                {
                  label: bi("Nutrient"),
                  millet: fields.text({ label: "Millet value", description: "e.g. 8.0 g or ~53. The number sets the bar length." }),
                  rice: fields.text({ label: "Rice value" }),
                  wheat: fields.text({ label: "Wheat value" }),
                  lowerIsBetter: fields.checkbox({ label: "Lower is better (e.g. glycemic index)" }),
                },
                { layout: [12, 4, 4, 4, 12] },
              ),
              { label: "Rows", itemLabel: (p) => p.fields.label.fields.en.value },
            ),
            lowerIsBetter: bi("Note shown on 'lower is better' rows"),
            note: bi("Note under the table", { multiline: true }),
            disclaimer: bi("Health disclaimer", { multiline: true }),
          },
          { label: "Nutrition comparison" },
        ),
        siridhanya: fields.object(
          {
            ...section,
            stats: fields.array(stat(), { label: "Numbers", itemLabel: (p) => p.fields.value.value }),
            cta: bi("Button to the millets page"),
          },
          { label: "The five siridhanya", description: "The five millet cards come from 'The five millets'." },
        ),
        environment: fields.object(
          {
            ...section,
            body: bi("Text", { multiline: true }),
            stats: fields.array(stat(), { label: "Numbers", itemLabel: (p) => p.fields.value.value }),
          },
          { label: "Environment" },
        ),
        story: fields.object(
          {
            ...section,
            body: bi("Story", { multiline: true }),
            image: image("Photo"),
            imageAlt: fields.text({ label: "Photo description (for screen readers)" }),
          },
          { label: "Story" },
        ),
        menuPreview: fields.object(
          {
            ...section,
            tiles: fields.array(
              fields.object({
                image: image("Photo"),
                imageAlt: fields.text({ label: "Photo description (for screen readers)" }),
                caption: bi("Caption"),
                category: fields.relationship({ label: "Opens this menu section", collection: "menuCategories" }),
              }),
              { label: "Photo tiles", itemLabel: (p) => p.fields.caption.fields.en.value },
            ),
            cta: bi("Button"),
          },
          { label: "Menu preview" },
        ),
        visit: fields.object({ eyebrow: bi("Small label"), mapLabel: bi("Map card label") }, { label: "Visit" }),
      },
    }),
    menuPage: singleton({
      label: "Menu page",
      path: "content/menu-page",
      schema: {
        eyebrow: bi("Small label"),
        title: bi("Title"),
        intro: bi("Intro", { multiline: true }),
        disclaimer: bi("Note at the bottom", { multiline: true }),
      },
    }),
    milletsPage: singleton({
      label: "Millets page",
      path: "content/millets-page",
      schema: {
        eyebrow: bi("Small label"),
        title: bi("Title"),
        intro: bi("Intro", { multiline: true }),
        tableHeading: bi("Table heading"),
        columns: fields.object(
          { millet: bi("First column"), protein: bi("Protein"), fibre: bi("Fibre"), iron: bi("Iron"), gi: bi("Glycemic index") },
          { label: "Table columns" },
        ),
        tableNote: bi("Note under the table", { multiline: true }),
        honesty: fields.object(
          {
            heading: bi("Heading"),
            points: fields.array(fields.object({ lead: bi("Bold start"), body: bi("Text", { multiline: true }) }), {
              label: "Points",
              itemLabel: (p) => p.fields.lead.fields.en.value,
            }),
            image: image("Photo"),
            imageAlt: fields.text({ label: "Photo description (for screen readers)" }),
          },
          { label: "What millets can and can't do" },
        ),
        disclaimer: bi("Health disclaimer", { multiline: true }),
        environment: fields.object(
          { ...section, body: bi("Text", { multiline: true }), sources: bi("Sources line") },
          { label: "Environment" },
        ),
        sources: fields.object(
          { eyebrow: bi("Small label"), body: fields.text({ label: "Sources (same in both languages)", multiline: true }) },
          { label: "Sources" },
        ),
        ctaMenu: bi("Menu button"),
        ctaHome: bi("Home button"),
      },
    }),
  },
  collections: {
    menuCategories: collection({
      label: "Menu",
      slugField: "key",
      path: "content/menu/*",
      columns: ["key", "order"],
      schema: {
        key: fields.slug({
          name: { label: "Section name (for this list)", description: "e.g. Tiffins. Not shown on the site." },
          slug: { label: "Link anchor", description: "Used in links like /menu#tiffins" },
        }),
        order: fields.integer({ label: "Position on the menu", defaultValue: 0 }),
        title: bi("Section heading", { required: true }),
        items: fields.array(
          fields.object({
            name: bi("Dish", { required: true }),
            description: bi("Description", { multiline: true }),
            price: fields.integer({ label: "Price (₹)", validation: { isRequired: true, min: 0 } }),
            tags: fields.multiRelationship({ label: "Tags", collection: "tags" }),
          }),
          {
            label: "Dishes",
            description: "Drag to reorder.",
            itemLabel: (p) => `${p.fields.name.fields.en.value} · ₹${p.fields.price.value ?? "?"}`,
          },
        ),
      },
    }),
    tags: collection({
      label: "Dietary & GI tags",
      slugField: "key",
      path: "content/tags/*",
      schema: {
        key: fields.slug({ name: { label: "Tag (for this list)" } }),
        label: bi("Label on the menu", { required: true }),
      },
    }),
    millets: collection({
      label: "The five millets",
      slugField: "name",
      path: "content/millets/*",
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "English name", description: "e.g. Foxtail" } }),
        order: fields.integer({ label: "Position", defaultValue: 0 }),
        localName: bi("Local name", { description: "English: the romanised name (Navane). Kannada: ನವಣೆ" }),
        latin: fields.text({ label: "Botanical name" }),
        highlight: bi("One-line note"),
        nutrition: fields.object(
          {
            protein: fields.text({ label: "Protein" }),
            fibre: fields.text({ label: "Fibre" }),
            iron: fields.text({ label: "Iron" }),
            gi: bi("Glycemic index"),
            giBand: fields.select({
              label: "GI band",
              options: [
                { label: "Low", value: "low" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Not established", value: "unknown" },
              ],
              defaultValue: "unknown",
            }),
          },
          { label: "Per 100 g (raw)", layout: [4, 4, 4, 12, 12] },
        ),
      },
    }),
  },
});
