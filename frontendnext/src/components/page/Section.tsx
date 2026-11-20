import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionProps = { children: ReactNode; className?: string; id?: string };

/** Standard vertical rhythm + container for inner-page sections */
export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
