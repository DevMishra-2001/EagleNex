"use client";

import { useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useRelativePointer } from "@/hooks/useRelativePointer";
import { DEFAULT_PARTICLE_COLORS, Particles } from "./Particles";

export type ParticleShapeProps = {
  shapes: readonly string[];
  index?: number;
  count?: number;
  worldSize?: number;
  colors?: readonly string[];
  pulse?: boolean;
  active?: boolean;
};

/**
 * <ParticleShape shapes={["⚡"]} />               one shape
 * <ParticleShape shapes={["💡","💻"]} index={i} />  morphs when index changes
 */
export default function ParticleShape({
  shapes,
  index = 0,
  count = 4500,
  worldSize = 4,
  colors = DEFAULT_PARTICLE_COLORS,
  pulse = false,
  active = true,
}: ParticleShapeProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const mouse = useRelativePointer(wrap);
  // stable identities so shapes/colours aren't re-sampled every render
  const colorsKey = colors.join(",");
  const stableColors = useMemo(() => colorsKey.split(","), [colorsKey]);
  const shapesKey = shapes.join("|");
  const stableShapes = useMemo(() => shapesKey.split("|"), [shapesKey]);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles
          shapes={stableShapes}
          index={index}
          count={count}
          worldSize={worldSize}
          colors={stableColors}
          pulse={pulse}
          mouse={mouse}
          active={active}
        />
      </Canvas>
    </div>
  );
}
