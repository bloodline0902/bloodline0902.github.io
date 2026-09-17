/**
 * Writes `public/data/post-bodies/{zh|en}/{slug}.json` for lazy-loading in PostApp,
 * and `public/data/post-index.json` so post pages can load the index on demand
 * instead of embedding it (openspec post-pages).
 * Run via `pnpm prebuild` before `next build`.
 */
import fs from "fs";
import path from "path";
import { getAllPosts, getPostIndexBundle } from "../lib/posts";
import type { Locale } from "../lib/postBundle";

const OUT = path.join(process.cwd(), "public/data/post-bodies");
const INDEX_OUT = path.join(process.cwd(), "public/data/post-index.json");

function writeBodies(locale: Locale) {
  const posts = getAllPosts(locale);
  const dir = path.join(OUT, locale);
  fs.mkdirSync(dir, { recursive: true });
  for (const p of posts) {
    const file = path.join(dir, `${p.slug}.json`);
    fs.writeFileSync(
      file,
      JSON.stringify({
        slug: p.slug,
        frontMatter: p.frontMatter,
        content: p.content,
      }),
    );
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
writeBodies("zh");
writeBodies("en");
fs.writeFileSync(INDEX_OUT, JSON.stringify(getPostIndexBundle()));

console.log("Wrote post body JSON to", OUT);
console.log("Wrote post index JSON to", INDEX_OUT);
