import { archivePath, getArchivePosts, postPath } from "@/lib/postSeo";
import type { Locale } from "@/lib/postBundle";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * The canonical-layer post archive, one per locale. Unpaginated on purpose:
 * 97 entries fit on one page, and pagination is a common source of duplicate
 * canonicals (openspec post-archive).
 */
export default function PostArchive({ locale }: { locale: Locale }) {
  const posts = getArchivePosts(locale);
  const other: Locale = locale === "en" ? "zh" : "en";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-2 text-2xl font-bold text-white">Posts</h1>
        <p className="mb-8 text-sm text-gray-400">
          Every post, newest first.{" "}
          <a
            href={archivePath(other)}
            className="text-gray-300 underline underline-offset-2 transition-colors hover:text-blue-400"
          >
            {other === "zh" ? "中文" : "English"}
          </a>
        </p>

        <ul className="space-y-1.5">
          {posts.map((post) => (
            <li key={post.slug} className="flex items-baseline gap-3 text-sm">
              <span className="shrink-0 text-gray-500 tabular-nums">
                {formatDate(post.frontMatter.date)}
              </span>
              <a
                href={postPath(locale, post.slug)}
                className="text-gray-300 transition-colors hover:text-blue-400"
              >
                {post.frontMatter.title}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm">
          <a
            href="/tags/"
            className="text-gray-400 transition-colors hover:text-blue-400"
          >
            Browse by tag →
          </a>
        </p>
      </div>
    </div>
  );
}
