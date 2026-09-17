"use client";

import { useEffect, useLayoutEffect } from "react";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import SleepOverlay from "./SleepOverlay";
import Login from "./Login";
import MacDesktop from "./desktop/MacDesktop";
import type { Locale } from "@/lib/postBundle";

/** A post to open on arrival. Present when the app is mounted from a post page. */
export type DesktopEntry = { slug: string; locale: Locale };

export default function MacOSApp({ entry }: { entry?: DesktopEntry }) {
  const { initDark, initLocale, systemPhase, setSystemPhase } = useStore(
    useShallow((s) => ({
      initDark: s.initDark,
      initLocale: s.initLocale,
      systemPhase: s.systemPhase,
      setSystemPhase: s.setSystemPhase,
    })),
  );

  // Run before paint so useWallpaper() picks up the correct dark value on first frame.
  useLayoutEffect(() => {
    initDark();
    // A reader arriving on a post URL goes straight to the desktop; the login
    // screen belongs to the boot flow at / (openspec post-pages).
    if (entry) setSystemPhase("desktop");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initLocale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMacDesktop = systemPhase === "desktop";

  return (
    <>
      {showMacDesktop ? <MacDesktop entry={entry} /> : <Login />}

      {/* Sleep overlay */}
      {systemPhase === "sleep" && (
        <div className="fixed inset-0 z-99999">
          <SleepOverlay setSystemPhase={setSystemPhase} />
        </div>
      )}
    </>
  );
}
