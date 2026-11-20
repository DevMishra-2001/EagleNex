"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { toUnitPointer } from "@/utils/dom";

const SPRING = { stiffness: 200, damping: 20 };

/** 3D tilt-on-hover card with a cursor-following glow */
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), SPRING);
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), SPRING);
  const glow = useTransform(
    [x, y],
    ([gx, gy]: number[]) => `radial-gradient(400px circle at ${gx * 100}% ${gy * 100}%, rgba(139,92,246,0.18), transparent 40%)`,
  );

  const onMove = (e: MouseEvent) => {
    const p = toUnitPointer(e.clientX, e.clientY, ref.current!.getBoundingClientRect());
    x.set(p.x);
    y.set(p.y);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b/srgb from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl transition-colors hover:border-white/20",
          className,
        )}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div style={{ transform: "translateZ(40px)" }} className="relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
