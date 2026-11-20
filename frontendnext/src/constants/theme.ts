import type { Theme } from "@/types";

export const THEME_STORAGE_KEY = "eaglenex-theme";
export const THEMES: readonly Theme[] = ["dark", "light"];
export const DEFAULT_THEME: Theme = "dark";

// Runs in <head> before first paint so the saved theme never flashes
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
