// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Item } from "./lib/types/item.type";
import { ItemMetadata } from "./lib/types/item-metadata.type";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      items: Item[];
      itemsMetadata: Record<string, ItemMetadata>;
      api_url: string;
    }

    // interface PageState {}
    // interface Platform {}
  }
}

export {};
