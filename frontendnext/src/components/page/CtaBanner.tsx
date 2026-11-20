import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/constants/site";

type CtaBannerProps = { title?: string; text?: string; href?: string; label?: string };

/** Compact closing call-to-action for inner pages */
export default function CtaBanner({
  title = "Have a project in mind?",
  text = "Tell us what you're building — we'll reply within 24 hours with a plan and a quote.",
  href = ROUTES.contact,
  label = "Start a project",
}: CtaBannerProps) {
  return (
    <section className="relative py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 px-6 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-brand-violet/25 blur-[120px]" />
            <div className="relative max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-zinc-400">{text}</p>
            </div>
            <Link
              href={href}
              className="group relative mt-8 inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 font-semibold text-ink-950 transition hover:bg-zinc-200 lg:mt-0"
            >
              {label}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
