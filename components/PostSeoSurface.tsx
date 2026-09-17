import { notFound } from "next/navigation";
import DeskMount from "@/components/DeskMount";
import MobileFloatingControls from "@/components/mobile/MobileFloatingControls";
import MobilePostArticle from "@/components/mobile/MobilePostArticle";
import { buildArticleJsonLd, resolvePost } from "@/lib/postSeo";
import type { Locale } from "@/lib/postBundle";

/**
 * A post rendered in place at its own URL, for readers and crawlers alike.
 * Nothing here navigates away: the indexed URL is the one the reader stays on
 * (openspec post-pages, seo-metadata).
 *
 * Both interfaces are server-rendered and CSS picks one by width, so first
 * paint needs no client decision. Below 768px the article is real, visible
 * content; from 768px the macOS app mounts with this post open.
 */
export default function PostSeoSurface({ slug, locale }: { slug: string; locale: Locale }) {
  const resolved = resolvePost(slug, locale);
  if (!resolved) notFound();
  const { post } = resolved;
  const articleJsonLd = buildArticleJsonLd(slug, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Below md: the mobile article. The root <body> does not scroll, so this
          shell supplies its own scrolling container, as /mobile's layout does. */}
      <div className="relative flex h-screen flex-col bg-white text-gray-900 md:hidden dark:bg-gray-950 dark:text-gray-100">
        <main className="flex-1 overflow-y-auto">
          <MobilePostArticle post={post} slug={slug} locale={locale} />
        </main>
        <MobileFloatingControls />
      </div>

      {/* From md: the macOS app, mounted after hydration. */}
      <div className="hidden min-h-screen bg-black md:block">
        <DeskMount slug={slug} locale={locale} />
      </div>
    </>
  );
}
