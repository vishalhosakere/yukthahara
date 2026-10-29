import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createReader } from "@keystatic/core/reader";
import { cacheLife } from "next/cache";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const byOrder = <T extends { order: number | null }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0);

/**
 * CMS edits commit straight to the live site, so a broken one fails the build instead: Netlify then keeps serving the
 * last good deploy, and the build log names the field to fix.
 */
function check(ok: boolean, problem: string): asserts ok {
  if (!ok) throw new Error(`Content problem: ${problem}`);
}

function checkMedia(path: string | null, where: string) {
  if (path) check(existsSync(join(process.cwd(), "public", path)), `${where} points to ${path}, which isn't in public/`);
}

export async function getSettings() {
  "use cache";
  cacheLife("max");
  return reader.singletons.settings.readOrThrow();
}

export async function getUi() {
  "use cache";
  cacheLife("max");
  return reader.singletons.ui.readOrThrow();
}

export async function getHome() {
  "use cache";
  cacheLife("max");
  const home = await reader.singletons.home.readOrThrow();
  checkMedia(home.hero.image, "Home › Hero photo");
  checkMedia(home.hero.video, "Home › Background video");
  checkMedia(home.story.image, "Home › Story photo");
  return home;
}

export async function getMenuPage() {
  "use cache";
  cacheLife("max");
  return reader.singletons.menuPage.readOrThrow();
}

export async function getMilletsPage() {
  "use cache";
  cacheLife("max");
  const page = await reader.singletons.milletsPage.readOrThrow();
  checkMedia(page.honesty.image, "Millets page › Photo");
  return page;
}

export async function getMillets() {
  "use cache";
  cacheLife("max");
  const all = await reader.collections.millets.all();
  return all.map(({ slug, entry }) => ({ slug, ...entry })).sort(byOrder);
}

/** Menu sections in order, each dish's tags resolved to their labels and diets. */
export async function getMenu() {
  "use cache";
  cacheLife("max");
  const [categories, tags] = await Promise.all([reader.collections.menuCategories.all(), reader.collections.tags.all()]);
  const tagsBySlug = new Map(tags.map(({ slug, entry }) => [slug, { slug, label: entry.label, diet: entry.diet }]));
  return categories
    .map(({ slug, entry }) => {
      checkMedia(entry.photo, `Menu › ${entry.key} › Photo`);
      return {
        slug,
        ...entry,
        items: entry.items.map((item) => ({
          ...item,
          tags: item.tags.map((tag) => {
            const found = tagsBySlug.get(tag);
            check(Boolean(found), `the dish "${item.name.en}" has the tag "${tag}", which no longer exists`);
            return found!;
          }),
        })),
      };
    })
    .sort(byOrder);
}

export type Settings = Awaited<ReturnType<typeof getSettings>>;
export type Ui = Awaited<ReturnType<typeof getUi>>;
export type Home = Awaited<ReturnType<typeof getHome>>;
export type Millet = Awaited<ReturnType<typeof getMillets>>[number];
export type MenuCategory = Awaited<ReturnType<typeof getMenu>>[number];
