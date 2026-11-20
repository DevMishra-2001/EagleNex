"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ORBIT_CHIPS } from "@/constants/content";
import { useRelativePointer } from "@/hooks/useRelativePointer";
import { useTheme } from "@/hooks/useTheme";
import type { OrbitChip, RelativePointer } from "@/types";
import { damp } from "@/utils/three";
import { DEFAULT_PARTICLE_COLORS, Particles } from "./Particles";

// Orbit shape: a tilted ellipse (same formula for chips and the drawn path)
const RX = 3.1;
const RY = 0.9;
const RZ = 1.9;
const orbitPoint = (a: number, target: THREE.Vector3) => target.set(Math.cos(a) * RX, Math.sin(a) * RY, Math.sin(a) * RZ);

const EAGLE = ["🦅"];

function OrbitPath({ scale = 1, opacity = 0.35, color = "#67e8f9" }) {
  // THREE.Line via <primitive>, since <line> is the SVG element in JSX typings
  const line = useMemo(() => {
    const v = new THREE.Vector3();
    const pts = Array.from({ length: 129 }, (_, i) => orbitPoint((i / 128) * Math.PI * 2, v).clone().multiplyScalar(scale));
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts));
  }, [scale]);
  return (
    <primitive object={line}>
      <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} />
    </primitive>
  );
}

// A light pulse travelling along the orbit
function Comet({ speed = 0.5, offset = 0, color = "#ffffff", scale = 1 }) {
  const ref = useRef<THREE.Mesh>(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    orbitPoint(clock.getElapsedTime() * speed + offset, v);
    ref.current!.position.copy(v).multiplyScalar(scale);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Chip({ chip, index, total }: { chip: OrbitChip; index: number; total: number }) {
  const group = useRef<THREE.Group>(null);
  const el = useRef<HTMLDivElement>(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  const base = (index / total) * Math.PI * 2;
  const Icon = chip.icon;

  useFrame(({ clock }) => {
    orbitPoint(base + clock.getElapsedTime() * 0.22, v);
    group.current!.position.copy(v);
    // subtle depth cue, chips stay readable even at the back
    const depth = (v.z / RZ + 1) / 2;
    if (el.current) {
      el.current.style.opacity = String(0.75 + depth * 0.25);
      el.current.style.transform = `scale(${0.88 + depth * 0.2})`;
    }
  });

  return (
    <group ref={group}>
      <Html center zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
        <div
          ref={el}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-ink-900/80 py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-full"
            style={{ background: chip.color, boxShadow: `0 0 18px ${chip.color}` }}
          >
            <Icon className="h-3.5 w-3.5 text-pure" />
          </span>
          {chip.label}
        </div>
      </Html>
    </group>
  );
}

function Scene({ mouse, active }: { mouse: RefObject<RelativePointer>; active: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { isDark } = useTheme();
  // shrink the orbit so the chips (≈0.9 units wide) never leave the canvas
  const fit = Math.min(1, (viewport.width / 2 - 0.9) / RX, (viewport.height / 2 - 0.4) / (RX * 0.55));
  useFrame((_, delta) => {
    const m = mouse.current;
    const g = tilt.current!;
    g.rotation.x = damp(g.rotation.x, 0.15 + (m.inside ? -m.y * 0.25 : 0), 3, delta);
    g.rotation.y = damp(g.rotation.y, m.inside ? m.x * 0.35 : 0, 3, delta);
  });

  return (
    <group ref={tilt} rotation={[0.15, 0, -0.12]} scale={fit}>
      {/* EagleNex core */}
      <group scale={0.75}>
        <Particles
          shapes={EAGLE}
          index={0}
          count={5000}
          worldSize={4}
          colors={DEFAULT_PARTICLE_COLORS}
          pulse={false}
          mouse={mouse}
          active={active}
        />
      </group>

      <OrbitPath color={isDark ? "#67e8f9" : "#0891b2"} opacity={isDark ? 0.35 : 0.45} />
      <OrbitPath scale={1.25} opacity={isDark ? 0.15 : 0.25} color={isDark ? "#c4b5fd" : "#7c3aed"} />
      <Comet speed={0.6} color={isDark ? "#67e8f9" : "#0891b2"} />
      <Comet speed={-0.4} offset={2} color={isDark ? "#f0abfc" : "#c026d3"} scale={1.25} />

      {ORBIT_CHIPS.map((c, i) => (
        <Chip key={c.label} chip={c} index={i} total={ORBIT_CHIPS.length} />
      ))}
    </group>
  );
}

/** Services orbiting the EagleNex particle core */
export default function OrbitScene({ active = true }: { active?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const mouse = useRelativePointer(wrap);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse} active={active} />
      </Canvas>
    </div>
  );
}
