import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY } from "@/constants/theme";
import type { Theme } from "@/types";

// Source of truth is <html data-theme>, set before paint by THEME_INIT_SCRIPT

const listeners = new Set<() => void>();

export const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme);

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export const getServerTheme = (): Theme => DEFAULT_THEME;

export function setTheme(theme: Theme) {
  if (!isTheme(theme) || theme === getTheme()) return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage blocked, theme still applies for this visit
  }
  listeners.forEach((l) => l());
}

export const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");
