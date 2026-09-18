import PostArchive from "@/components/PostArchive";
import { buildArchiveMetadata } from "@/lib/postSeo";

export const metadata = buildArchiveMetadata("en");

export default function PostsArchivePage() {
  return <PostArchive locale="en" />;
}
