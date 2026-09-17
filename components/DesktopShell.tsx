"use client";

import MacOSApp from "@/components/MacOSApp";
import PostIndexLoader from "@/components/PostIndexLoader";
import type { Locale } from "@/lib/postBundle";

/**
 * The macOS window manager plus the post index it needs. Kept in its own module
 * so `DeskMount` can pull it in through `next/dynamic`, keeping it out of the
 * post route's first load on phones that will never render it.
 */
export default function DesktopShell({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  return (
    <PostIndexLoader>
      <MacOSApp entry={{ slug, locale }} />
    </PostIndexLoader>
  );
}
