"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/postBundle";

/** Carries the arrival locale into the app so a reader who landed on a
 *  locale-specific URL keeps reading that locale (openspec language-switching). */
export default function PostDeepLink({ slug, locale }: { slug: string; locale?: Locale }) {
  const router = useRouter();

  useEffect(() => {
    const suffix = locale ? `&locale=${locale}` : "";
    router.replace(`/desk?post=${slug}${suffix}`);
  }, [slug, locale, router]);

  return null;
}
