import Reveal from "@/components/ui/Reveal";
import type { ValueItem } from "@/types";
import { cn } from "@/utils/cn";

/** Grid of icon + title + text cards */
export default function FeatureGrid({ items, className }: { items: ValueItem[]; className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((v, i) => (
        <Reveal key={v.title} delay={i * 0.06} y={24}>
          <div className="glass h-full rounded-3xl p-7 transition-colors hover:border-white/20">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br/srgb from-brand-violet to-brand-cyan text-pure">
              <v.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">{v.title}</h3>
            <p className="mt-2 leading-relaxed text-zinc-400">{v.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
