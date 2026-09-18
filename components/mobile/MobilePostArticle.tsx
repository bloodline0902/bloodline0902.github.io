import "highlight.js/styles/github.css";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import MobileShareButton from "@/components/mobile/MobileShareButton";
import { archivePath, getPostNeighbours, postPath } from "@/lib/postSeo";
import { normalizeTags } from "@/lib/utils";
import type { Locale } from "@/lib/postBundle";
import type { Post } from "@/lib/types";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

/** Which layer is rendering the article, which decides where its links go. */
export type ArticleSurface = "canonical" | "app";

/**
 * Footer link targets per surface. A canonical page whose only exits were
 * `/mobile/**` would have nothing but `noindex` to offer a crawler; an app
 * page linking out to canonical URLs would drop the reader out of the
 * interface they are using (openspec seo-metadata, post-pages).
 */
function footerLinks(surface: ArticleSurface, locale: Locale) {
  if (surface === "canonical") {
    return {
      archive: archivePath(locale),
      tag: (tag: string) => `/tags/#${encodeURIComponent(tag)}`,
      post: (target: string) => postPath(locale, target),
    };
  }
  return {
    archive: "/mobile/posts",
    tag: (tag: string) => `/mobile/tags/${encodeURIComponent(tag)}`,
    post: (target: string) =>
      locale === "en" ? `/mobile/posts/${target}` : `/mobile/zh/posts/${target}`,
  };
}

/** The mobile article view, shared by /mobile/posts/** and the post pages. */
export default function MobilePostArticle({
  post,
  slug,
  locale,
  surface,
}: {
  post: Post;
  slug: string;
  /** Which language this view reads as, so Share offers that canonical URL. */
  locale: Locale;
  /** Required so neither caller can silently inherit the other's link targets. */
  surface: ArticleSurface;
}) {
  const tags = normalizeTags(post.frontMatter.tags);
  const links = footerLinks(surface, locale);
  const { newer, older } = getPostNeighbours(slug, locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <article>
        <header className="space-y-1 border-b border-gray-200 pb-6 text-left dark:border-gray-700">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.frontMatter.date}>
                {formatDate(post.frontMatter.date)}
              </time>
            </dd>
          </dl>
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            {post.frontMatter.title}
          </h1>
        </header>

        <div className="prose prose-gray max-w-none py-8 dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="divide-y divide-gray-200 text-sm font-medium dark:divide-gray-700">
          {tags.length > 0 && (
            <div className="py-4">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={links.tag(tag)}
                    className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {(newer || older) && (
            <nav className="flex items-stretch justify-between gap-4 py-4 text-sm">
              {older ? (
                <Link
                  href={links.post(older.slug)}
                  className="flex-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Older
                  </span>
                  {older.title}
                </Link>
              ) : (
                <span className="flex-1" />
              )}
              {newer && (
                <Link
                  href={links.post(newer.slug)}
                  className="flex-1 text-right text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Newer
                  </span>
                  {newer.title}
                </Link>
              )}
            </nav>
          )}
          <div className="flex items-center justify-between py-8">
            <Link
              href={links.archive}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← All Posts
            </Link>
            <MobileShareButton
              path={postPath(locale, slug)}
              title={post.frontMatter.title}
            />
          </div>
        </footer>
      </article>
    </div>
  );
}
