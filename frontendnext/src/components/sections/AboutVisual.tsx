"use client";

import dynamic from "next/dynamic";
import { useLazyVisibility } from "@/hooks/useLazyVisibility";

const OrbitScene = dynamic(() => import("@/components/three/OrbitScene"), { ssr: false });

/** Mounts the 3D orbit only once it's near the viewport, pauses it when off-screen */
export default function AboutVisual() {
  const { ref, seen, visible } = useLazyVisibility({ preload: "200px", keepAlive: "100px" });
  return (
    <div ref={ref} className="relative aspect-square w-full sm:aspect-[5/4]">
      <div className="pointer-events-none absolute inset-[25%] rounded-full bg-brand-violet/25 blur-[90px]" />
      {seen && <OrbitScene active={visible} />}
    </div>
  );
}
