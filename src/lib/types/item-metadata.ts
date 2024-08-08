import type items from '../payload-example-items-metadata.json';

export type ItemMetadata = typeof items[keyof typeof items];