"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribeTheme, toggleTheme } from "@/stores/theme-store";

/** const { theme, isDark, toggleTheme, setTheme } = useTheme(); */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}
