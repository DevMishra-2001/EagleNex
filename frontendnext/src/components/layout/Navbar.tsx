"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartLink from "@/components/common/SmartLink";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/constants/content";
import type { NavLink } from "@/types";
import { SECTION_IDS } from "@/constants/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useElementVisible } from "@/hooks/useElementVisible";
import { useIsHome } from "@/hooks/useIsHome";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";

const NAV_IDS = NAV_LINKS.flatMap((l) => (l.section ? [l.section] : []));

// Route that owns a nav item on inner pages (e.g. /services/web-development -> Services)
const matchesRoute = (pathname: string, href: string) => href !== "/" && !href.includes("#") && pathname.startsWith(href);
const BAR = "absolute h-0.5 w-5 rounded bg-white transition-all duration-300";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const isHome = useIsHome();
  const activeSection = useActiveSection(NAV_IDS);
  const isActive = (l: NavLink) => (isHome ? l.section === activeSection : matchesRoute(pathname, l.href));
  // header slides away as soon as the footer's top edge enters the viewport
  const hidden = useElementVisible(SECTION_IDS.footer) && !open;
  useBodyScrollLock(open);

  return (
    <>
      <header
        aria-hidden={hidden}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "py-3" : "py-5",
          hidden ? "pointer-events-none -translate-y-[130%] opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <div className="container-x">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full pr-2 pl-4 transition-all duration-500",
              scrolled
                ? "border border-white/10 bg-ink-950/70 py-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
                : "border border-transparent py-2",
            )}
          >
            <Logo />

            {/* Center pill with sliding highlight */}
            <ul className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.label} className="relative">
                  {isActive(l) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                  )}
                  <SmartLink
                    href={l.href}
                    section={l.section}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(l) ? "text-white" : "text-zinc-400 hover:text-white",
                    )}
                  >
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Animated hamburger */}
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              >
                <span className={cn(BAR, open ? "rotate-45" : "-translate-y-1.5")} />
                <span className={cn(BAR, open ? "-rotate-45" : "translate-y-1.5")} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950/95 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <SmartLink
                    href={l.href}
                    section={l.section}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-semibold tracking-tight text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-6 w-6 text-zinc-500" />
                  </SmartLink>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
              <span className="font-medium text-zinc-300">Appearance</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
