export async function load() {
  const res = await fetch(
    "https://storage.googleapis.com/owlrepo/v1/queries/search_item_index.json"
  );
  const json = await res.json();
  return { items: json };
}
