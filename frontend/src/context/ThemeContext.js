import { createContext } from "react";

/**
 * Theme context — sirf context object yahan hai.
 * Provider: ./ThemeProvider.jsx   |   Hook: ../hooks/useTheme.js
 *
 * value: { theme: "dark" | "light", isDark: boolean, setTheme(theme), toggleTheme() }
 */
export const ThemeContext = createContext(null);
