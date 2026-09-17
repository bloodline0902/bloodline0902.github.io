import type { PostIndex } from "./types";

/** Static JSON from `scripts/generate-post-bodies.ts` (runs in `prebuild`). */
export function postBodyJsonUrl(index: PostIndex): string {
  return `/data/post-bodies/${index.bodyLocale}/${encodeURIComponent(index.slug)}.json`;
}

/** Site-wide post index, written by `scripts/generate-post-bodies.ts`. */
export const POST_INDEX_JSON_URL = "/data/post-index.json";
