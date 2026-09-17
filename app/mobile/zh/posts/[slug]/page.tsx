import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import MobilePostArticle from "@/components/mobile/MobilePostArticle";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function getPostSafe(slug: string, locale: "zh" | "en") {
  try { return getPostBySlug(slug, locale); } catch { return null; }
}

export default async function MobileZhPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostSafe(slug, "zh") ?? getPostSafe(slug, "en");
  if (!post) notFound();

  return <MobilePostArticle post={post} slug={slug} />;
}
