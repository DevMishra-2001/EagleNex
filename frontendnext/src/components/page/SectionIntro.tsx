import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

type SectionIntroProps = { eyebrow: string; title: ReactNode; text?: ReactNode; center?: boolean; className?: string };

/** Left-aligned (or centred) eyebrow + heading + paragraph for inner-page sections */
export default function SectionIntro({ eyebrow, title, text, center, className }: SectionIntroProps) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center", className)} y={24}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl leading-[1.1] font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-zinc-400">{text}</p>}
    </Reveal>
  );
}
