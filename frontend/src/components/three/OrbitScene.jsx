import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Brain, ChartBar, Cloud, Code, Palette, Smartphone } from "lucide-react";
import * as THREE from "three";
import { Particles } from "./ParticleShape";
import { useTheme } from "../../hooks/useTheme";

/* Services orbiting the EagleNex core — edit labels/icons here */
const chips = [
  { label: "Web", icon: Code, color: "#8b5cf6" },
  { label: "Mobile", icon: Smartphone, color: "#22d3ee" },
  { label: "AI", icon: Brain, color: "#ec4899" },
  { label: "Design", icon: Palette, color: "#f59e0b" },
  { label: "Cloud", icon: Cloud, color: "#10b981" },
  { label: "Growth", icon: ChartBar, color: "#6366f1" },
];

// Orbit shape: a tilted ellipse (same formula used for chips and the drawn path)
const RX = 3.1;
const RY = 0.9;
const RZ = 1.9;
const orbitPoint = (a, target) => target.set(Math.cos(a) * RX, Math.sin(a) * RY, Math.sin(a) * RZ);

function OrbitPath({ scale = 1, opacity = 0.35, color = "#67e8f9" }) {
  const geometry = useMemo(() => {
    const pts = [];
    const v = new THREE.Vector3();
    for (let i = 0; i <= 128; i++) pts.push(orbitPoint((i / 128) * Math.PI * 2, v).clone().multiplyScalar(scale));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [scale]);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

/* A light pulse travelling along the orbit */
function Comet({ speed = 0.5, offset = 0, color = "#ffffff", scale = 1 }) {
  const ref = useRef();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    orbitPoint(clock.getElapsedTime() * speed + offset, v);
    ref.current.position.copy(v).multiplyScalar(scale);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Chip({ chip, index, total }) {
  const group = useRef();
  const el = useRef();
  const v = useMemo(() => new THREE.Vector3(), []);
  const base = (index / total) * Math.PI * 2;
  const Icon = chip.icon;

  useFrame(({ clock }) => {
    orbitPoint(base + clock.getElapsedTime() * 0.22, v);
    group.current.position.copy(v);
    // subtle depth cue — chips stay readable even at the back
    const depth = (v.z / RZ + 1) / 2; // 0 back … 1 front
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
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-ink-900/80 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
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

function Scene({ mouse, active }) {
  const tilt = useRef();
  const { viewport } = useThree();
  const { isDark } = useTheme();
  // shrink the orbit so the chips (≈0.9 units wide) never leave the canvas
  const fit = Math.min(1, (viewport.width / 2 - 0.9) / RX, (viewport.height / 2 - 0.4) / (RX * 0.55));
  useFrame((_, delta) => {
    const m = mouse.current;
    const g = tilt.current;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.15 + (m.inside ? -m.y * 0.25 : 0), 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, m.inside ? m.x * 0.35 : 0, 3, delta);
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
          colors={CORE_COLORS}
          pulse={false}
          mouse={mouse}
          active={active}
        />
      </group>

      <OrbitPath color={isDark ? "#67e8f9" : "#0891b2"} opacity={isDark ? 0.35 : 0.45} />
      <OrbitPath scale={1.25} opacity={isDark ? 0.15 : 0.25} color={isDark ? "#c4b5fd" : "#7c3aed"} />
      <Comet speed={0.6} color={isDark ? "#67e8f9" : "#0891b2"} />
      <Comet speed={-0.4} offset={2} color={isDark ? "#f0abfc" : "#c026d3"} scale={1.25} />

      {chips.map((c, i) => (
        <Chip key={c.label} chip={c} index={i} total={chips.length} />
      ))}
    </group>
  );
}

const EAGLE = ["🦅"];
const CORE_COLORS = ["#8b5cf6", "#22d3ee", "#ec4899"];

export default function OrbitScene({ active = true }) {
  const wrap = useRef(null);
  const mouse = useRef({ x: 9, y: 9, inside: false });

  useEffect(() => {
    const el = wrap.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -(((e.clientY - r.top) / r.height) * 2 - 1),
        inside: true,
      };
    };
    const leave = () => (mouse.current = { x: 9, y: 9, inside: false });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

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
