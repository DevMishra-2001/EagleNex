import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

/** Sun / moon switch — light ↔ dark */
export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative flex h-11 w-[76px] items-center rounded-full border border-white/10 bg-white/5 p-1 transition-colors hover:border-white/20 ${className}`}
    >
      {/* track icons */}
      <Sun className="absolute left-3 h-4 w-4 text-amber-400/60" />
      <Moon className="absolute right-3 h-4 w-4 text-violet-300/60" />

      {/* sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`relative z-10 grid h-9 w-9 place-items-center rounded-full shadow-lg ${
          isDark
            ? "ml-auto bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-500/30"
            : "bg-gradient-to-br from-amber-300 to-orange-400 shadow-amber-400/40"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Moon className="h-4 w-4 text-pure" /> : <Sun className="h-4 w-4 text-pure" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
