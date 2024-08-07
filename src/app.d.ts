// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Item } from "./lib/types/item.type";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      items: Item[];
    }

    // interface PageState {}
    // interface Platform {}
  }
}

export {};
