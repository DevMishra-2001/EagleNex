import CurrentYear from "@/components/common/CurrentYear";
import SmartLink from "@/components/common/SmartLink";
import Logo from "@/components/ui/Logo";
import { CONTACTS, FOOTER_COLUMNS, SOCIALS } from "@/constants/content";
import { SECTION_IDS, SITE } from "@/constants/site";
import { cn } from "@/utils/cn";
import FooterTagline from "./FooterTagline";

export default function Footer() {
  // id="site-footer" is watched by the Navbar: header slides away once the footer starts
  return (
    <footer id={SECTION_IDS.footer} className="relative border-t border-white/5 bg-ink-900">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r/srgb from-transparent via-brand-violet/60 to-transparent" />

      <div className="container-x pt-20 pb-10">
        {/* Top: logo + link columns */}
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <div>
            <Logo />
          </div>

          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-xl font-medium text-white">{col.title}</h4>
                <ul className="mt-5 space-y-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href} section={l.section} className="group relative inline-block text-lg text-zinc-400 transition hover:text-white">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r/srgb from-brand-violet to-brand-cyan transition-all duration-300 group-hover:w-full" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 h-px w-full bg-white/10" />

        {/* Copyright + socials */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-zinc-300">
            © <CurrentYear /> {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
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

        {/* Contact row */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
          {CONTACTS.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              className={cn("group flex items-center gap-5 md:pr-8", i < CONTACTS.length - 1 && "md:border-r md:border-white/10")}
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

        {/* About paragraphs */}
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

        <FooterTagline />
      </div>
    </footer>
  );
}
