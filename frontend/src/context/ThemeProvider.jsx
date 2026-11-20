import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "eaglenex-theme";
const THEMES = ["dark", "light"];

/** Saved choice → else dark (site ka default look) */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (THEMES.includes(saved)) return saved;
  } catch {
    /* storage blocked — fall through */
  }
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // <html data-theme="..."> drives all CSS colour variables (see index.css)
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((t) => THEMES.includes(t) && setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
