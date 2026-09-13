import type { Metadata } from "next";
import type { ReactNode } from "react";
import DeviceGuard from "@/components/DeviceGuard";

/** Interaction layer: not part of the site's canonical surface (see openspec seo-metadata). */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function DeskLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black">
      <DeviceGuard />
      {children}
    </div>
  );
}
