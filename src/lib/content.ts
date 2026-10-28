import "server-only";
import { createReader } from "@keystatic/core/reader";
import { cacheLife } from "next/cache";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const byOrder = <T extends { order: number | null }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0);

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
  return reader.singletons.home.readOrThrow();
}

export async function getMenuPage() {
  "use cache";
  cacheLife("max");
  return reader.singletons.menuPage.readOrThrow();
}

export async function getMilletsPage() {
  "use cache";
  cacheLife("max");
  return reader.singletons.milletsPage.readOrThrow();
}

export async function getMillets() {
  "use cache";
  cacheLife("max");
  const all = await reader.collections.millets.all();
  return all.map(({ slug, entry }) => ({ slug, ...entry })).sort(byOrder);
}

/** Menu sections in order, with each dish's tag slugs resolved to their bilingual labels. Unknown tags are dropped. */
export async function getMenu() {
  "use cache";
  cacheLife("max");
  const [categories, tags] = await Promise.all([reader.collections.menuCategories.all(), reader.collections.tags.all()]);
  const tagLabels = new Map(tags.map(({ slug, entry }) => [slug, entry.label]));
  return categories
    .map(({ slug, entry }) => ({
      slug,
      ...entry,
      items: entry.items.map((item) => ({
        ...item,
        tags: item.tags.flatMap((tag) => {
          const label = tagLabels.get(tag);
          return label ? [{ slug: tag, label }] : [];
        }),
      })),
    }))
    .sort(byOrder);
}

export type Settings = Awaited<ReturnType<typeof getSettings>>;
export type Ui = Awaited<ReturnType<typeof getUi>>;
export type Home = Awaited<ReturnType<typeof getHome>>;
export type Millet = Awaited<ReturnType<typeof getMillets>>[number];
export type MenuCategory = Awaited<ReturnType<typeof getMenu>>[number];
