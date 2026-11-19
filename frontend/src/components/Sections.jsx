import { Suspense, lazy, useRef } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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

const StackScene = lazy(() => import("./three/StackScene"));

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
      <div className="container-x">
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
                  <s.icon className="h-7 w-7 text-white" />
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
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-xl">
      <div className="pointer-events-none absolute inset-[20%] rounded-full bg-brand-violet/25 blur-[90px]" />
      {seen && (
        <Suspense fallback={null}>
          <StackScene active={visible} />
        </Suspense>
      )}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-violet/15 blur-[140px]" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* Real 3D floating app screens */}
        <Reveal>
          <AboutVisual />
        </Reveal>

        <div>
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

          <div className="mt-12 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6">
                  <p className="font-display text-4xl font-semibold tracking-tight text-white">{s.value}</p>
                  <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */
const steps = [
  { icon: Lightbulb, title: "Discover", desc: "We dive deep into your goals, users and market." },
  { icon: PenTool, title: "Design", desc: "Wireframes and stunning UI that tell your story." },
  { icon: Code, title: "Develop", desc: "Clean, scalable code with weekly demos." },
  { icon: Target, title: "Launch & Grow", desc: "Go live, measure, optimize — and scale." },
];

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title mt-5">
            From first call to <span className="accent">liftoff</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center">
                <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand-cyan/40" />
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-800 ring-1 ring-white/10">
                  <s.icon className="h-6 w-6 text-brand-cyan" />
                </span>
              </div>
              <p className="mt-6 font-mono text-xs text-zinc-500">STEP 0{i + 1}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-zinc-400">{s.desc}</p>
            </Reveal>
          ))}
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
      <div className="container-x">
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
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan font-display font-bold text-white">
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

/* ------------------------------------ CTA ------------------------------------ */
export function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-violet/30 via-ink-800 to-brand-cyan/20 px-6 py-20 text-center sm:px-16">
            <div className="grid-bg pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-violet/40 blur-[100px]" />
            <div className="relative">
              <span className="eyebrow">
                Free consultation
              </span>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                Got an idea? Let&apos;s make it <span className="accent">real.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-zinc-300">
                Drop your email — we&apos;ll reply within 24 hours with a plan and a quote.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-10 flex max-w-lg flex-col gap-3 rounded-full sm:flex-row sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5 sm:backdrop-blur"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white placeholder:text-zinc-500 focus:outline-none sm:border-0 sm:bg-transparent"
                />
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink-950 transition hover:bg-zinc-200">
                  Get Started <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
