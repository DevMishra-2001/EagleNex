import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Check, Mail, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";

/* Contact options on the right — links yahan badalna */
const options = [
  { icon: Calendar, title: "Book a 30-min call", desc: "Pick a slot that suits you", href: "#", color: "from-violet-500 to-fuchsia-500" },
  { icon: MessageCircle, title: "Chat on WhatsApp", desc: "Quick questions, quick answers", href: "#", color: "from-emerald-400 to-cyan-500" },
  { icon: Mail, title: "hello@eaglenex.com", desc: "For detailed briefs & RFPs", href: "mailto:hello@eaglenex.com", color: "from-cyan-400 to-blue-500" },
];

const promises = ["Free consultation", "Reply within 24h", "NDA on request"];

export default function CTA() {
  const card = useRef(null);
  const [sent, setSent] = useState(false);

  // spotlight that follows the cursor (pure CSS variables, no re-render)
  const onMove = (e) => {
    const r = card.current.getBoundingClientRect();
    card.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container-x">
        <Reveal>
          {/* Animated gradient border */}
          <div className="relative overflow-hidden rounded-[2.5rem] p-px">
            <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#8b5cf6_60deg,#22d3ee_120deg,transparent_180deg,transparent_360deg)] opacity-70" />

            <div
              ref={card}
              onMouseMove={onMove}
              className="group relative overflow-hidden rounded-[calc(2.5rem-1px)] bg-ink-900 px-6 py-16 sm:px-12 lg:px-16 lg:py-20"
            >
              {/* background layers */}
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
              <div className="pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full bg-brand-violet/30 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[120px]" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at var(--mx) var(--my), rgba(139,92,246,0.15), transparent 45%)",
                }}
              />

              <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                {/* ---------- Left: pitch + form ---------- */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Taking new projects
                  </span>

                  <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
                    Got an idea? <br className="hidden sm:block" />
                    Let&apos;s make it <span className="accent pr-1">real.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-lg text-zinc-400">
                    Drop your email — we&apos;ll reply within 24 hours with a plan and a quote.
                  </p>

                  <div className="mt-9 max-w-lg">
                    <AnimatePresence mode="wait">
                      {sent ? (
                        <motion.div
                          key="done"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-emerald-200"
                        >
                          <Check className="h-5 w-5" /> Thanks! We&apos;ll be in touch within 24 hours.
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            setSent(true);
                          }}
                          className="flex flex-col gap-3 rounded-full transition sm:flex-row sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5 sm:backdrop-blur sm:focus-within:border-brand-violet/60 sm:focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]"
                        >
                          <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white placeholder:text-zinc-500 focus:outline-none sm:border-0 sm:bg-transparent"
                          />
                          <button
                            type="submit"
                            className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 font-semibold text-ink-950 transition hover:bg-zinc-200"
                          >
                            Get started
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-white transition-transform group-hover/btn:rotate-45">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                    {promises.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-cyan" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ---------- Right: contact options ---------- */}
                <div className="space-y-3">
                  <p className="mb-4 text-sm text-zinc-500">Prefer to talk directly?</p>
                  {options.map((o, i) => (
                    <motion.a
                      key={o.title}
                      href={o.href}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="group/opt flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${o.color} text-white shadow-lg`}>
                        <o.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-white">{o.title}</span>
                        <span className="block text-sm text-zinc-500">{o.desc}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover/opt:rotate-45 group-hover/opt:text-white" />
                    </motion.a>
                  ))}

                  {/* social proof */}
                  <div className="flex items-center gap-3 pt-4">
                    <div className="flex -space-x-2">
                      {["from-violet-500 to-fuchsia-500", "from-cyan-400 to-blue-500", "from-pink-500 to-orange-400"].map((g) => (
                        <span key={g} className={`h-8 w-8 rounded-full border-2 border-ink-900 bg-gradient-to-br ${g}`} />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400">
                      <span className="font-semibold text-white">100+ founders</span> already building with us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
