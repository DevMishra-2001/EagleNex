"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

// Icon swap: hidden icon spins out first, visible one spins in after it (250ms each)
const ICON = "col-start-1 row-start-1 transition-[rotate,scale,opacity] duration-250";
const ICON_ON = "rotate-0 scale-100 opacity-100 delay-250";
const ICON_OFF = "rotate-90 scale-0 opacity-0 delay-0";

/** Sun / moon switch, light ↔ dark; looks are driven by data-theme so SSR never flashes */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex h-11 w-[76px] items-center rounded-full border border-white/10 bg-white/5 p-1 transition-colors hover:border-white/20",
        className,
      )}
    >
      {/* track icons */}
      <Sun className="absolute left-3 h-4 w-4 text-amber-400/60" />
      <Moon className="absolute right-3 h-4 w-4 text-violet-300/60" />

      {/* sliding knob */}
      <span className="relative z-10 grid h-9 w-9 translate-x-[30px] place-items-center rounded-full bg-linear-to-br/srgb from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 transition-[translate] duration-350 ease-[cubic-bezier(0.3,1.25,0.5,1)] light:translate-x-0 light:from-amber-300 light:to-orange-400 light:shadow-amber-400/40">
        <Moon className={cn(ICON, "h-4 w-4 text-pure", ICON_ON, "light:rotate-90 light:scale-0 light:opacity-0 light:delay-0")} />
        <Sun className={cn(ICON, "h-4 w-4 text-pure", ICON_OFF, "light:rotate-0 light:scale-100 light:opacity-100 light:delay-250")} />
      </span>
    </button>
  );
}
