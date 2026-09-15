import type { StateCreator } from "zustand";
import { enterFullScreen, exitFullScreen } from "@/lib/screen";
import type { Locale } from "@/lib/postBundle";

const LOCALE_STORAGE_KEY = "tony-blog-locale";
const DARK_STORAGE_KEY = "tony-blog-dark";

export type SystemPhase = "desktop" | "login" | "sleep";

export interface SystemSlice {
  dark: boolean;
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  fullscreen: boolean;
  systemPhase: SystemPhase;
  locale: Locale;
  /** Locale carried in by a deep link. Overrides `locale` for post bodies only
   *  and is never persisted (openspec language-switching). */
  viewLocale: Locale | null;
  toggleDark: () => void;
  initDark: () => void;
  setBrightness: (v: number) => void;
  setVolume: (v: number) => void;
  toggleWIFI: () => void;
  toggleBluetooth: () => void;
  toggleAirdrop: () => void;
  toggleFullScreen: (v: boolean) => void;
  setSystemPhase: (p: SystemPhase) => void;
  shutdown: () => void;
  sleep: () => void;
  restart: () => void;
  setLocale: (l: Locale) => void;
  initLocale: () => void;
  setViewLocale: (l: Locale) => void;
  clearViewLocale: () => void;
}

export const createSystemSlice: StateCreator<SystemSlice> = (set) => ({
  dark: false,
  brightness: 80,
  volume: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false,
  systemPhase: "login",
  locale: "en",
  viewLocale: null,
  setSystemPhase: (p) => set({ systemPhase: p }),
  shutdown: () => {
    localStorage.removeItem("desktopDate");
    localStorage.setItem("shutdown", "1");
    window.location.replace("/");
  },
  sleep: () => set({ systemPhase: "sleep" }),
  restart: () => {
    localStorage.removeItem("desktopDate");
    window.location.replace("/");
  },
  toggleDark: () =>
    set((state) => {
      const next = !state.dark;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(DARK_STORAGE_KEY, next ? "1" : "0");
      }
      return { dark: next };
    }),
  initDark: () =>
    set(() => {
      const stored = typeof localStorage !== "undefined"
        ? localStorage.getItem(DARK_STORAGE_KEY)
        : null;
      const dark = stored !== null
        ? stored === "1"
        : typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", dark);
      }
      return { dark };
    }),
  setBrightness: (v) => set({ brightness: v }),
  setVolume: (v) => set({ volume: v }),
  toggleWIFI: () => set((s) => ({ wifi: !s.wifi })),
  toggleBluetooth: () => set((s) => ({ bluetooth: !s.bluetooth })),
  toggleAirdrop: () => set((s) => ({ airdrop: !s.airdrop })),
  toggleFullScreen: (v) =>
    set(() => {
      if (typeof document !== "undefined") {
        v ? enterFullScreen() : exitFullScreen();
      }
      return { fullscreen: v };
    }),
  setLocale: (l) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    }
    // An explicit choice supersedes whatever a deep link asked for.
    set({ locale: l, viewLocale: null });
  },
  setViewLocale: (l) => set({ viewLocale: l }),
  clearViewLocale: () => set({ viewLocale: null }),
  initLocale: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === "zh" || saved === "en") {
      set({ locale: saved });
    }
  },
});
