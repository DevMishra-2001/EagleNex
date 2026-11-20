import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Process", id: "process" },
  { label: "Reviews", id: "testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Background change on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 ${
              scrolled
                ? "border border-white/10 bg-ink-950/70 py-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
                : "border border-transparent py-2"
            }`}
          >
            <Logo />

            {/* Center pill with sliding highlight */}
            <ul className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
              {links.map((l) => (
                <li key={l.id} className="relative">
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                  )}
                  <a
                    href={`#${l.id}`}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active === l.id ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
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
                <span
                  className={`absolute h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    open ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    open ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-semibold tracking-tight text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-6 w-6 text-zinc-500" />
                  </a>
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
