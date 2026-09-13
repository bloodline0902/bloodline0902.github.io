import type { Metadata } from "next";
import BootClient from "@/components/BootClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function BootPage() {
  return <BootClient />;
}
