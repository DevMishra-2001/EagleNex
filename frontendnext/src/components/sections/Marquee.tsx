import { Zap } from "lucide-react";
import { BRANDS } from "@/constants/content";

/** Trusted-by logo strip, list is doubled so the -50% loop is seamless */
export default function Marquee() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/50 py-10">
      <p className="mb-6 text-center text-sm text-zinc-500">Trusted by teams who ship fast</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-16">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-zinc-600 transition hover:text-white"
            >
              <Zap className="h-5 w-5" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
