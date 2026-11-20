import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/** const { theme, isDark, toggleTheme, setTheme } = useTheme(); */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
