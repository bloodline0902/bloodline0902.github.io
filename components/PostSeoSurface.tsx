import { notFound } from "next/navigation";
import PostDeepLink from "@/components/PostDeepLink";
import { markdownExcerpt } from "@/lib/postExcerpt";
import { buildArticleJsonLd, resolvePost } from "@/lib/postSeo";
import type { Locale } from "@/lib/postBundle";

/**
 * Crawler-facing surface for one post in one locale. Humans are redirected into
 * the app immediately; only bots and non-JS clients ever read what is rendered here.
 */
export default function PostSeoSurface({ slug, locale }: { slug: string; locale: Locale }) {
  const resolved = resolvePost(slug, locale);
  if (!resolved) notFound();
  const { post } = resolved;
  const articleJsonLd = buildArticleJsonLd(slug, locale);
  const plainText = markdownExcerpt(post.content, post.content.length);
  const mobileTarget = locale === "en" ? `/mobile/posts/${slug}` : `/mobile/${locale}/posts/${slug}`;
  const deskTarget = locale === "en" ? `/desk?post=${slug}` : `/desk?post=${slug}&locale=${locale}`;

  return (
    <>
      {/* Redirect before React hydration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(window.innerWidth < 768 ? "${mobileTarget}" : "${deskTarget}");`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Full content for crawlers that don't execute JS */}
      <article aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <h1>{post.frontMatter.title}</h1>
        {post.frontMatter.description && <p>{post.frontMatter.description}</p>}
        <p>{plainText}</p>
      </article>
      <PostDeepLink slug={slug} locale={locale === "en" ? undefined : locale} />
    </>
  );
}
