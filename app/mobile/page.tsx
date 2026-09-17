import type { Metadata } from "next";
import MobileAbout from "@/components/mobile/MobileAbout";

/** Landing route: `/` navigates here on the client, so a crawler files this
 *  route's metadata under `/`. It must carry the home page's signals. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function MobilePage() {
  return <MobileAbout />;
}
