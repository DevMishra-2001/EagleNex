import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = { eyebrow: string; title: ReactNode; subtitle?: ReactNode };

/** Centred eyebrow + title (+ optional subtitle) used at the top of sections */
export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-5">{title}</h2>
      {subtitle && <p className="mt-5 text-zinc-400">{subtitle}</p>}
    </Reveal>
  );
}
