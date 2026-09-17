import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Duplicates canonical-layer content, so it stays out of the index. Declared
 *  here rather than on app/mobile/layout.tsx, because /mobile/ itself is a
 *  landing route that must stay indexable (openspec seo-metadata). */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
