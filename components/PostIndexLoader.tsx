"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { PostIndexBundle } from "@/lib/types";
import { PostIndexProvider } from "@/contexts/PostIndexContext";
import { POST_INDEX_JSON_URL } from "@/lib/postBodyUrl";

/**
 * Fetches the post index and provides it once loaded, so post pages need not
 * embed ~100 KB of it. Consumers read the context synchronously as before
 * (openspec post-pages).
 */
export default function PostIndexLoader({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<PostIndexBundle | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(POST_INDEX_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json() as Promise<PostIndexBundle>;
      })
      .then((data) => {
        if (!cancelled) setBundle(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-sm text-gray-400">
        Could not load posts.
      </div>
    );
  }
  if (!bundle) return <div className="h-screen w-screen bg-black" />;
  return <PostIndexProvider value={bundle}>{children}</PostIndexProvider>;
}
