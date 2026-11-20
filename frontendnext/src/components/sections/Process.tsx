"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "@/components/common/SectionHeading";
import LazyParticleShape from "@/components/three/LazyParticleShape";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/constants/content";
import { SECTION_IDS } from "@/constants/site";
import { cn } from "@/utils/cn";
import { pad2 } from "@/utils/format";

const STEP_MS = 3200;
const STEP_SHAPES = PROCESS_STEPS.map((s) => s.emoji);

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-advance through the steps while visible
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PROCESS_STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section id={SECTION_IDS.process} ref={ref} className="relative py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              From first call to <span className="accent">liftoff</span>
            </>
          }
        />

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          {/* Morphing particle object */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="pointer-events-none absolute inset-[18%] rounded-full bg-brand-violet/20 blur-[90px]" />
            <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-500">
              STEP {pad2(active + 1)} / {pad2(PROCESS_STEPS.length)}
            </span>
            <LazyParticleShape shapes={STEP_SHAPES} index={active} count={6000} className="h-full w-full" />
          </div>

          {/* Steps list */}
          <div className="space-y-3" onMouseLeave={() => setPaused(false)}>
            {PROCESS_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <button
                    onMouseEnter={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex w-full items-start gap-5 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500",
                      on ? "border-white/15 bg-white/[0.06]" : "border-transparent bg-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    {/* progress bar for the active step */}
                    {on && !paused && (
                      <span
                        key={`bar-${active}`}
                        className="absolute bottom-0 left-0 h-px w-full origin-left animate-[grow_3.2s_linear] bg-linear-to-r/srgb from-brand-violet to-brand-cyan"
                      />
                    )}
                    <span
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-500",
                        on ? "bg-linear-to-br/srgb from-brand-violet to-brand-cyan text-pure" : "bg-white/5 text-zinc-500",
                      )}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="font-mono text-xs text-zinc-500">STEP {pad2(i + 1)}</span>
                      <span
                        className={cn(
                          "mt-1 block font-display text-2xl font-semibold tracking-tight transition-colors",
                          on ? "text-white" : "text-zinc-500",
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-500",
                          on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden text-zinc-400">{s.desc}</span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
