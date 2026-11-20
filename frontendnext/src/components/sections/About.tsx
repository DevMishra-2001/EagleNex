import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_STATS, PERKS } from "@/constants/content";
import { SECTION_IDS, SITE } from "@/constants/site";
import { cn } from "@/utils/cn";
import AboutVisual from "./AboutVisual";

export default function About() {
  return (
    <section id={SECTION_IDS.about} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-violet/15 blur-[140px]" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:grid-cols-[1.3fr_1fr] xl:gap-6">
        {/* 3D EagleNex orbit */}
        <Reveal className="lg:-ml-10">
          <AboutVisual />
        </Reveal>

        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow">Why {SITE.name}</span>
            <h2 className="section-title mt-5">
              Small team. <span className="accent">Sharp</span> focus. Big results.
            </h2>
            <p className="mt-5 leading-relaxed text-zinc-400">
              Designers, engineers and strategists working as one. We sweat the details so your
              product feels effortless — and your numbers keep going up.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {PERKS.map((p) => (
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
              {ABOUT_STATS.map((s, i) => (
                <div key={s.label} className={cn("pr-4", i > 0 && "sm:border-l sm:border-white/10 sm:pl-5")}>
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
