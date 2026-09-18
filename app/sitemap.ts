import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

/** Required for `output: "export"` (Next 15+) */
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tags/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    /** The archives carry every post link, so they are the site's crawl hubs
     *  (openspec post-archive). */
    { url: `${SITE_URL}/posts/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/zh/posts/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  /** Both locales are canonical-layer URLs: each serves a language the other does
   *  not (openspec seo-metadata). Interaction-layer routes stay out. */
  const postRoutes: MetadataRoute.Sitemap = getAllPosts("zh").flatMap((post) => {
    const lastModified = post.frontMatter.date ? new Date(post.frontMatter.date) : now;
    return [`/posts/${post.slug}/`, `/zh/posts/${post.slug}/`].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  });

  return [...staticRoutes, ...postRoutes];
}
