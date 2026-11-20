import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ChartBar,
  Check,
  Cloud,
  Code,
  Lightbulb,
  Palette,
  PenTool,
  Quote,
  Smartphone,
  Star,
  Target,
  Zap,
} from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Perspective from "./Perspective";
import Particle from "./Particle";

const OrbitScene = lazy(() => import("./three/OrbitScene"));

/* ------------------------------ Trusted-by marquee ------------------------------ */
const brands = ["Nova", "Quantum", "Skyline", "Vertex", "Pulse", "Orbit", "Zenith", "Apex"];

export function Marquee() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/50 py-10">
      <p className="mb-6 text-center text-sm text-zinc-500">
        Trusted by teams who ship fast
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-16">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-zinc-600 transition hover:text-white"
            >
              <Zap className="h-5 w-5" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Services ---------------------------------- */
const services = [
  { icon: Code, title: "Web Development", desc: "Blazing fast, SEO-ready websites and web apps built on modern stacks.", color: "from-violet-500 to-fuchsia-500" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-feel iOS & Android apps that users love to open every day.", color: "from-cyan-400 to-blue-500" },
  { icon: Brain, title: "AI Solutions", desc: "Chatbots, automation and AI integrations that save hours every week.", color: "from-pink-500 to-rose-500" },
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces crafted with intent — beautiful, intuitive and on-brand.", color: "from-amber-400 to-orange-500" },
  { icon: Cloud, title: "Cloud & DevOps", desc: "Scalable infrastructure, CI/CD and 99.9% uptime you can count on.", color: "from-emerald-400 to-teal-500" },
  { icon: ChartBar, title: "Digital Marketing", desc: "Data-driven growth campaigns that turn traffic into revenue.", color: "from-indigo-400 to-violet-500" },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title mt-5">
            Everything you need to <span className="accent">launch</span> and scale
          </h2>
          <p className="mt-5 text-zinc-400">
            Strategy, design, engineering and growth — one team, zero hand-offs.
          </p>
        </Reveal>

        <Perspective className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <TiltCard>
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg`}
                >
                  <s.icon className="h-7 w-7 text-pure" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{s.desc}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition group-hover:gap-3"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        </Perspective>
      </div>
    </section>
  );
}

/* ------------------------------- About + Stats ------------------------------- */
const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "100+", label: "Happy Clients" },
  { value: "12", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
];

const perks = ["Dedicated project manager", "Transparent weekly updates", "Post-launch support", "On-time delivery guarantee"];

/** Mounts the 3D canvas only once it's near the viewport, pauses it when off-screen */
function AboutVisual() {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "200px" });
  const visible = useInView(ref, { margin: "100px" });
  return (
    <div ref={ref} className="relative aspect-square w-full sm:aspect-[5/4]">
      <div className="pointer-events-none absolute inset-[25%] rounded-full bg-brand-violet/25 blur-[90px]" />
      {seen && (
        <Suspense fallback={null}>
          <OrbitScene active={visible} />
        </Suspense>
      )}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-violet/15 blur-[140px]" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
        {/* 3D EagleNex orbit */}
        <Reveal className="lg:-ml-10">
          <AboutVisual />
        </Reveal>

        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow">Why EagleNex</span>
            <h2 className="section-title mt-5">
              Small team. <span className="accent">Sharp</span> focus. Big results.
            </h2>
            <p className="mt-5 leading-relaxed text-zinc-400">
              Designers, engineers and strategists working as one. We sweat the details so your
              product feels effortless — and your numbers keep going up.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-zinc-300">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} className={`pr-4 ${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""}`}>
                  <p className="font-display text-3xl font-semibold tracking-tight text-white">{s.value}</p>
                  <p className="mt-1 text-sm leading-snug text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */
// emoji = particle shape shown for that step
const steps = [
  { icon: Lightbulb, emoji: "💡", title: "Discover", desc: "We dive deep into your goals, users and market." },
  { icon: PenTool, emoji: "✏️", title: "Design", desc: "Wireframes and stunning UI that tell your story." },
  { icon: Code, emoji: "💻", title: "Develop", desc: "Clean, scalable code with weekly demos." },
  { icon: Target, emoji: "🎯", title: "Launch & Grow", desc: "Go live, measure, optimize — and scale." },
];
const stepShapes = steps.map((s) => s.emoji);

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-advance through the steps while visible
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section id="process" ref={ref} className="relative py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title mt-5">
            From first call to <span className="accent">liftoff</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          {/* Morphing particle object */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="pointer-events-none absolute inset-[18%] rounded-full bg-brand-violet/20 blur-[90px]" />
            <span className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-xs text-zinc-500">
              STEP 0{active + 1} / 0{steps.length}
            </span>
            <Particle shapes={stepShapes} index={active} count={6000} className="h-full w-full" />
          </div>

          {/* Steps list */}
          <div className="space-y-3" onMouseLeave={() => setPaused(false)}>
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <button
                    onMouseEnter={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onClick={() => setActive(i)}
                    className={`group relative flex w-full items-start gap-5 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 ${
                      on
                        ? "border-white/15 bg-white/[0.06]"
                        : "border-transparent bg-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* progress bar for the active step */}
                    {on && !paused && (
                      <span
                        key={`bar-${active}`}
                        className="absolute bottom-0 left-0 h-px w-full origin-left animate-[grow_3.2s_linear] bg-gradient-to-r from-brand-violet to-brand-cyan"
                      />
                    )}
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                        on ? "bg-gradient-to-br from-brand-violet to-brand-cyan text-pure" : "bg-white/5 text-zinc-500"
                      }`}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="font-mono text-xs text-zinc-500">STEP 0{i + 1}</span>
                      <span
                        className={`mt-1 block font-display text-2xl font-semibold tracking-tight transition-colors ${
                          on ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`grid transition-all duration-500 ${
                          on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden text-zinc-400">{s.desc}</span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Testimonials -------------------------------- */
const testimonials = [
  { name: "Aarav Sharma", role: "Founder, Skyline Tech", text: "EagleNex rebuilt our platform in record time. Conversions jumped 3x in the first month. Absolute pros." },
  { name: "Priya Verma", role: "CMO, Nova Retail", text: "The design quality is world-class. Our customers keep complimenting the new app experience." },
  { name: "Rohan Mehta", role: "CTO, Pulse Health", text: "Reliable, transparent and technically brilliant. They feel like an extension of our own team." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title mt-5">
            Founders <span className="accent">love</span> working with us
          </h2>
        </Reveal>

        <Perspective className="mt-16" tilt={22}>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TiltCard>
                <Quote className="h-8 w-8 text-brand-violet" />
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 leading-relaxed text-zinc-300">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan font-display font-bold text-pure">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        </Perspective>
      </div>
    </section>
  );
}

