import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";

/** Accessible accordion built on <details>, works without JavaScript */
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02]">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold text-white">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="mt-3 leading-relaxed text-zinc-400">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
