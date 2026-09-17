import type { Metadata } from "next";
import { getPostIndexBundle } from "@/lib/posts";
import HomeClient from "@/components/HomeClient";

/** Landing route: `/` navigates here on the client, so a crawler files this
 *  route's metadata under `/`. It must carry the home page's signals. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function DeskPage() {
  const postIndexBundle = getPostIndexBundle();
  return <HomeClient postIndexBundle={postIndexBundle} />;
}
