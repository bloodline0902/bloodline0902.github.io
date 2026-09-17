"use client";

import { useEffect, useState } from "react";
import MacOSApp from "@/components/MacOSApp";
import PostIndexLoader from "@/components/PostIndexLoader";
import { MOBILE_BREAKPOINT_PX } from "@/hooks/useMobile";
import type { Locale } from "@/lib/postBundle";

/**
 * Mounts the macOS app into a post page, only at desktop width. CSS already
 * decides which block is visible; this only avoids running the window manager
 * on phones. Mounts on the first widening past the breakpoint and then stays
 * mounted, leaving CSS to hide it again (openspec post-pages).
 */
export default function DeskMount({ slug, locale }: { slug: string; locale: Locale }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const check = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT_PX) setMounted(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mounted]);

  if (!mounted) return null;
  return (
    <PostIndexLoader>
      <MacOSApp entry={{ slug, locale }} />
    </PostIndexLoader>
  );
}
