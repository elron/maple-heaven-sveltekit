import payload from "./lib/payload-example.json";

export type Payload = typeof payload;
export type Item = Payload[number];

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
