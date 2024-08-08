import { dev } from "$app/environment";
import _items from "$lib/payload-example-items.json";
import _itemsMetadata from "$lib/payload-example-items-metadata.json";

export async function load() {
  // Dev
  const data = {
    items: _items,
    itemsMetadata: _itemsMetadata,
    api_url: "https://mapleheavenapi.netlify.app/",
  };

  // Prod
  if (!dev) {
    const res = await fetch(
      "https://storage.googleapis.com/owlrepo/v1/queries/search_item_index.json"
    );
    data.items = await res.json();
    const res2 = await fetch("https://mapleheavenapi.netlify.app/items.json");
    data.itemsMetadata = await res2.json();
  }

  return data;
}
