import PostArchive from "@/components/PostArchive";
import { buildArchiveMetadata } from "@/lib/postSeo";

export const metadata = buildArchiveMetadata("zh");

export default function ZhPostsArchivePage() {
  return <PostArchive locale="zh" />;
}
