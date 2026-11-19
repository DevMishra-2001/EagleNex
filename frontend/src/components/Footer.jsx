import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

/* ---------------------------------------------------------------
   Saara content yahin upar hai — sirf in arrays ko edit karo.
---------------------------------------------------------------- */
const linkColumns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "About us", href: "#about" },
    ],
  },
  {
    title: "How It Works",
    links: [
      { label: "Our Process", href: "#process" },
      { label: "Contact us", href: "#contact" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Services", href: "#services" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const contacts = [
  { icon: Phone, label: "Phone Number", value: "+91 00000 00000", href: "tel:+910000000000" },
  { icon: Mail, label: "Email Address", value: "hello@eaglenex.com", href: "mailto:hello@eaglenex.com" },
  { icon: MapPin, label: "Location", value: "Your office address, City, India", href: "#" },
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    d: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07",
  },
  {
    label: "Instagram",
    href: "#",
    d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    label: "X",
    href: "#",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "YouTube",
    href: "#",
    d: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-900">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-violet/60 to-transparent" />

      <div className="container-x pb-10 pt-20">
        {/* ---------- Top: logo + link columns ---------- */}
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <div>
            <Logo />
          </div>

          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-xl font-medium text-white">{col.title}</h4>
                <ul className="mt-5 space-y-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group relative inline-block text-lg text-zinc-400 transition hover:text-white"
                      >
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Divider ---------- */}
        <div className="mt-16 h-px w-full bg-white/10" />

        {/* ---------- Copyright + socials ---------- */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-zinc-300">
            © {new Date().getFullYear()} EagleNex. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full text-zinc-300 transition hover:-translate-y-1 hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ---------- Contact row ---------- */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              className={`group flex items-center gap-5 md:pr-8 ${
                i < contacts.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan transition group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10">
                <c.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-zinc-500">{c.label}</span>
                <span className="block text-lg text-zinc-200 transition group-hover:text-white">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        {/* ---------- About paragraphs ---------- */}
        <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-zinc-500">
          <p>
            EagleNex is a digital innovation studio that designs and engineers modern websites, mobile
            apps and AI-powered solutions for ambitious brands. We combine sharp strategy, bold design
            and reliable engineering to help businesses launch faster and grow with confidence.
          </p>
          <p>
            Our goal is to put world-class technology within reach of every business. Whether you&apos;re
            a startup shaping your first product or an established company scaling to new markets,
            our team works as an extension of yours — with transparent communication, on-time
            delivery and dedicated support long after launch. Every project is built with
            performance, security and scalability at its core.
          </p>
        </div>

        {/* ---------- Tagline ---------- */}
        <p className="mt-8 flex flex-wrap items-baseline gap-2 text-lg text-zinc-300">
          Vision for your ideas, wings for your
          <motion.span
            initial={{ opacity: 0, y: 10, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="accent inline-block text-3xl"
          >
            growth!
          </motion.span>
        </p>
      </div>
    </footer>
  );
}
