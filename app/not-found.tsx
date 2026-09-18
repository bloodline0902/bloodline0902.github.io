import type { Metadata } from "next";
import { Macos404Alert } from "@/components/Macos404Alert";

export const metadata: Metadata = {
  // Bare title: the root layout's template appends the site name.
  title: "Page Not Found",
  description: "The requested page does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <Macos404Alert />;
}
