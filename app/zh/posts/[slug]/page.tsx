import { getAllSlugs } from "@/lib/posts";
import PostSeoSurface from "@/components/PostSeoSurface";
import { buildPostMetadata } from "@/lib/postSeo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildPostMetadata(slug, "zh");
}

export default async function ZhPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PostSeoSurface slug={slug} locale="zh" />;
}
