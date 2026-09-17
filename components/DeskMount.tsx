"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT_PX } from "@/hooks/useMobile";
import type { Locale } from "@/lib/postBundle";

// Loaded only once the viewport proves to be desktop width, so a phone never
// downloads the window manager it would never show.
const DesktopShell = dynamic(() => import("@/components/DesktopShell"), {
  ssr: false,
});

/**
 * Mounts the macOS app into a post page, only at desktop width. CSS already
 * decides which block is visible; this only avoids running the window manager
 * on phones. Mounts on the first widening past the breakpoint and then stays
 * mounted, leaving CSS to hide it again (openspec post-pages).
 */
export default function DeskMount({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
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
  return <DesktopShell slug={slug} locale={locale} />;
}
