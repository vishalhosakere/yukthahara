import type { MenuCategory } from "@/lib/content";
import { T } from "@/components/ui/T";

export function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section className="menu-cat" id={category.slug} aria-labelledby={`${category.slug}-title`}>
      <h2 id={`${category.slug}-title`}>
        <T v={category.title} />
      </h2>
      <ul className="items">
        {category.items.map((item, i) => (
          <li className="item" key={i}>
            <h3 className="nm">
              <T v={item.name} />
            </h3>
            <p className="price">₹{item.price}</p>
            {item.description.en && (
              <p className="ds">
                <T v={item.description} />
              </p>
            )}
            {item.tags.length > 0 && (
              <ul className="tags">
                {item.tags.map((tag) => (
                  <li className="tag" key={tag.slug}>
                    <T v={tag.label} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
