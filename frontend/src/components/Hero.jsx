import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroScene = lazy(() => import("./three/HeroScene"));

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.12 * i, duration: 0.9, ease } }),
};

const heroStats = [
  { value: "150+", label: "Products shipped" },
  { value: "12", label: "Countries" },
  { value: "4.9★", label: "Client rating" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-32">
      {/* Background */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-brand-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[520px] w-[520px] rounded-full bg-brand-cyan/15 blur-[140px]" />

      {/* 3D canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/40 to-transparent lg:from-ink-950/80 lg:via-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center">
        <div className="max-w-3xl">
          {/* Announcement badge */}
          <motion.a
            href="#services"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-sm text-zinc-300 backdrop-blur transition hover:border-white/20"
          >
            <span className="rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan px-2.5 py-0.5 text-xs font-semibold text-pure">
              New
            </span>
            AI-powered products, built in weeks
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-8 font-display text-[clamp(2.75rem,7vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
          >
            Digital products
            <br />
            that <span className="accent pr-2">soar.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-lg text-lg leading-relaxed text-zinc-400"
          >
            We design and build websites, apps and AI tools for brands that want to move fast — and
            look good doing it.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 font-semibold text-ink-950 transition hover:bg-zinc-200"
            >
              Start a project
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white transition hover:bg-white/5"
            >
              See our work <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="container-x relative z-10 pb-10 pt-16"
      >
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold tracking-tight text-white">{s.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
          <a href="#services" className="hidden items-center gap-3 text-sm text-zinc-500 md:flex">
            Scroll to explore
            <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="h-1.5 w-1 rounded-full bg-white"
              />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
