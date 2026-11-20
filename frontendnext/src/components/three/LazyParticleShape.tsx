"use client";

import dynamic from "next/dynamic";
import { useLazyVisibility } from "@/hooks/useLazyVisibility";
import type { ParticleShapeProps } from "./ParticleShape";

const ParticleShape = dynamic(() => import("./ParticleShape"), { ssr: false });

/** Loads the particle canvas only near the viewport and pauses it when off-screen */
export default function LazyParticleShape({ className = "", ...props }: ParticleShapeProps & { className?: string }) {
  const { ref, seen, visible } = useLazyVisibility({ preload: "300px", keepAlive: "50px" });
  return (
    <div ref={ref} className={className}>
      {seen && <ParticleShape {...props} active={visible} />}
    </div>
  );
}
