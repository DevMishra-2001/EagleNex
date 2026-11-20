import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Crumb } from "@/utils/seo";
import Breadcrumbs from "./Breadcrumbs";

type PageHeroProps = { eyebrow: string; title: ReactNode; description?: ReactNode; crumbs: Crumb[]; children?: ReactNode };

/** Top banner for inner pages, same grid + glow backdrop as the home hero */
export default function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-0 -left-40 h-[460px] w-[460px] rounded-full bg-brand-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-brand-cyan/10 blur-[140px]" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <Reveal className="mt-8 max-w-4xl" y={24}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-semibold tracking-[-0.045em] text-white">
            {title}
          </h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{description}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
