import { getPostBySlug } from "@/lib/posts";
import { markdownExcerpt } from "@/lib/postExcerpt";
import type { Locale } from "@/lib/postBundle";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Post paths per locale. English sits at the root; other locales are prefixed. */
export function postPath(locale: Locale, slug: string) {
  return locale === "en" ? `/posts/${slug}/` : `/${locale}/posts/${slug}/`;
}

export function getPostSafe(slug: string, locale: Locale) {
  try {
    return getPostBySlug(slug, locale);
  } catch {
    return null;
  }
}

/** Resolve the body for a locale, falling back to the other one when untranslated. */
export function resolvePost(slug: string, locale: Locale) {
  const own = getPostSafe(slug, locale);
  const other = getPostSafe(slug, locale === "en" ? "zh" : "en");
  const post = own ?? other;
  return post ? { post, bodyLocale: (own ? locale : locale === "en" ? "zh" : "en") as Locale } : null;
}

/** Reciprocal hreflang set. Every post exists in both locales, so both are always listed. */
function languageAlternates(slug: string) {
  return {
    "en-US": postPath("en", slug),
    "zh-CN": postPath("zh", slug),
    "x-default": postPath("en", slug),
  };
}

export function buildPostMetadata(slug: string, locale: Locale): Metadata {
  const canonical = postPath(locale, slug);
  const resolved = resolvePost(slug, locale);
  if (!resolved) {
    return {
      title: "Post Not Found",
      description: "",
      robots: { index: false, follow: false },
      alternates: { canonical },
    };
  }
  const { post } = resolved;
  const description = post.frontMatter.description ?? markdownExcerpt(post.content, 160);
  const tags =
    typeof post.frontMatter.tags === "string"
      ? [post.frontMatter.tags]
      : (post.frontMatter.tags ?? []);
  return {
    title: post.frontMatter.title,
    description,
    alternates: { canonical, languages: languageAlternates(slug) },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.frontMatter.title,
      description,
      publishedTime: post.frontMatter.date,
      tags,
    },
    twitter: { card: "summary_large_image", title: post.frontMatter.title, description },
  };
}

export function buildArticleJsonLd(slug: string, locale: Locale) {
  const resolved = resolvePost(slug, locale);
  if (!resolved) return null;
  const { post, bodyLocale } = resolved;
  const url = `${SITE_URL}${postPath(locale, slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontMatter.title,
    description: post.frontMatter.description ?? "",
    datePublished: post.frontMatter.date,
    dateModified: post.frontMatter.date,
    mainEntityOfPage: url,
    url,
    inLanguage: bodyLocale === "en" ? "en-US" : "zh-CN",
    author: { "@type": "Person", name: "Tony Han" },
    publisher: { "@type": "Person", name: "Tony Han" },
    keywords:
      typeof post.frontMatter.tags === "string"
        ? [post.frontMatter.tags]
        : (post.frontMatter.tags ?? []),
  };
}
