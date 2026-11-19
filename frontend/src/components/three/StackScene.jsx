import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/** Thin rounded bar — used as fake "text lines" / chart bars on the panels */
function Bar({ w, h = 0.07, position, color = "#ffffff", opacity = 0.35 }) {
  return (
    <RoundedBox args={[w, h, 0.02]} radius={h / 2} smoothness={4} position={position}>
      <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
    </RoundedBox>
  );
}

/** A floating "app screen" panel */
function Panel({ accent, variant, ...props }) {
  return (
    <group {...props}>
      <RoundedBox args={[2.6, 1.7, 0.08]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          color="#141428"
          metalness={0.2}
          roughness={0.25}
          clearcoat={1}
          transparent
          opacity={0.92}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* glowing edge */}
      <RoundedBox args={[2.64, 1.74, 0.06]} radius={0.13} smoothness={6} position={[0, 0, -0.02]}>
        <meshBasicMaterial color={accent} transparent opacity={0.35} toneMapped={false} />
      </RoundedBox>

      <group position={[0, 0, 0.06]}>
        {/* header dot + title */}
        <mesh position={[-1.05, 0.58, 0]}>
          <circleGeometry args={[0.12, 32]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
        <Bar w={0.9} position={[-0.4, 0.62, 0]} opacity={0.7} />
        <Bar w={0.6} h={0.05} position={[-0.55, 0.5, 0]} opacity={0.3} />

        {variant === "chart" &&
          [0.35, 0.6, 0.45, 0.8, 0.55, 0.95, 0.7].map((h, i) => (
            <Bar key={i} w={0.16} h={h} position={[-0.9 + i * 0.3, -0.55 + h / 2, 0]} color={accent} opacity={0.85} />
          ))}

        {variant === "list" &&
          [0.15, -0.15, -0.45].map((y, i) => (
            <group key={i}>
              <mesh position={[-1.05, y, 0]}>
                <circleGeometry args={[0.08, 24]} />
                <meshBasicMaterial color={i === 0 ? accent : "#ffffff"} transparent opacity={i === 0 ? 1 : 0.3} toneMapped={false} />
              </mesh>
              <Bar w={1.5 - i * 0.25} position={[-0.15 - i * 0.12, y, 0]} />
            </group>
          ))}

        {variant === "stats" && (
          <>
            <Bar w={0.9} h={0.32} position={[-0.6, -0.05, 0]} color={accent} opacity={0.8} />
            <Bar w={0.9} h={0.32} position={[0.55, -0.05, 0]} opacity={0.18} />
            <Bar w={2.05} h={0.12} position={[0, -0.5, 0]} opacity={0.15} />
            <Bar w={1.3} h={0.12} position={[-0.37, -0.5, 0.005]} color={accent} opacity={0.9} />
          </>
        )}
      </group>
    </group>
  );
}

function Stack() {
  const ref = useRef();
  useFrame(({ pointer }, delta) => {
    const g = ref.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.55 + pointer.x * 0.3, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.35 - pointer.y * 0.2, 3, delta);
  });
  return (
    <group ref={ref} rotation={[0.35, -0.55, 0]}>
      <Float speed={1.6} floatIntensity={0.6} rotationIntensity={0.15}>
        <Panel accent="#22d3ee" variant="list" position={[-0.4, -1.1, -1.2]} />
      </Float>
      <Float speed={1.9} floatIntensity={0.6} rotationIntensity={0.15}>
        <Panel accent="#ec4899" variant="stats" position={[0.5, 1.2, -0.6]} />
      </Float>
      <Float speed={1.3} floatIntensity={0.8} rotationIntensity={0.2}>
        <Panel accent="#8b5cf6" variant="chart" position={[0, 0, 0.6]} />
      </Float>
    </group>
  );
}

export default function StackScene({ active = true }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#22d3ee" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ec4899" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>
      <Stack />
    </Canvas>
  );
}
