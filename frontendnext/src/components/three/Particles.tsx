"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import type { RelativePointer } from "@/types";
import { sampleEmoji } from "@/utils/canvas-sampling";
import { randoms, scatter } from "@/utils/random";
import { blendingFor, damp } from "@/utils/three";

const vertex = /* glsl */ `
  attribute vec3 aFrom;
  attribute float aBrightFrom;
  attribute float aBright;
  attribute float aRand;
  uniform float uTime;
  uniform float uProgress;
  uniform float uPulse;
  uniform vec2 uMouse;
  uniform float uSize;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uLight; // 0 = dark theme, 1 = light theme
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float delay = aRand * 0.4;
    float t = clamp((uProgress - delay) / 0.6, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);

    // arc outward mid-flight for a nicer morph
    vec3 p = mix(aFrom, position, t);
    p += normalize(position + aFrom + 0.001) * sin(t * 3.14159) * 0.6 * (aRand - 0.3);

    // idle shimmer
    p.x += sin(uTime * 1.1 + aRand * 40.0) * 0.012;
    p.y += cos(uTime * 0.9 + aRand * 30.0) * 0.012;
    p.z += sin(uTime * 1.3 + p.x * 2.0) * 0.05;

    // heartbeat (optional)
    float beat = pow(abs(sin(uTime * 2.4)), 10.0) * uPulse;
    p.xy *= 1.0 + beat * 0.12;

    // mouse repel
    vec2 d = p.xy - uMouse;
    float force = smoothstep(0.9, 0.0, length(d)) * t;
    p.xy += normalize(d + 0.0001) * force * 0.5;
    p.z += force * 0.8;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float b = mix(aBrightFrom, aBright, t);
    gl_PointSize = uSize * (0.6 + b * 0.9 + force * 1.4) / -mv.z;

    float g = clamp(position.x / 4.0 + 0.5 + aRand * 0.2 - 0.1, 0.0, 1.0);
    vColor = g < 0.5 ? mix(uC1, uC2, g * 2.0) : mix(uC2, uC3, (g - 0.5) * 2.0);
    vec3 hi = mix(vec3(1.0), vColor * 0.45, uLight);
    vColor = mix(vColor, hi, b * 0.4 + force * 0.5 + beat * 0.3);
    vAlpha = (0.3 + b * 0.55) * (1.0 + uLight * 0.7);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, d) * vAlpha);
  }
`;

export const DEFAULT_PARTICLE_COLORS = ["#8b5cf6", "#22d3ee", "#ec4899"] as const;

export type ParticlesProps = {
  shapes: readonly string[];
  index: number;
  count: number;
  worldSize: number;
  colors: readonly string[];
  pulse: boolean;
  mouse: RefObject<RelativePointer>;
  active: boolean;
};

/** Particle cloud that assembles into `shapes[index]` and morphs when `index` changes */
export function Particles({ shapes, index, count, worldSize, colors, pulse, mouse, active }: ParticlesProps) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const started = useRef(false);
  const { isDark } = useTheme();

  const targets = useMemo(() => shapes.map((s) => sampleEmoji(s, { n: count, worldSize })), [shapes, count, worldSize]);

  const { geometry, uniforms } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(targets[0].pos.slice(), 3));
    g.setAttribute("aFrom", new THREE.BufferAttribute(scatter(count, worldSize), 3));
    g.setAttribute("aBright", new THREE.BufferAttribute(targets[0].bright.slice(), 1));
    g.setAttribute("aBrightFrom", new THREE.BufferAttribute(new Float32Array(count).fill(0.3), 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(randoms(count), 1));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    return {
      geometry: g,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPulse: { value: pulse ? 1 : 0 },
        uMouse: { value: new THREE.Vector2(99, 99) },
        uSize: { value: 20 * dpr },
        uC1: { value: new THREE.Color(colors[0]) },
        uC2: { value: new THREE.Color(colors[1]) },
        uC3: { value: new THREE.Color(colors[2]) },
        uLight: { value: 0 },
      },
    };
  }, [targets, count, worldSize, colors, pulse]);

  // Morph to a new shape whenever `index` changes
  const prevIndex = useRef(index);
  useEffect(() => {
    if (prevIndex.current === index) return;
    const attrs = geometry.attributes as Record<"position" | "aFrom" | "aBright" | "aBrightFrom", THREE.BufferAttribute>;
    (attrs.aFrom.array as Float32Array).set(attrs.position.array);
    (attrs.aBrightFrom.array as Float32Array).set(attrs.aBright.array);
    (attrs.position.array as Float32Array).set(targets[index].pos);
    (attrs.aBright.array as Float32Array).set(targets[index].bright);
    Object.values(attrs).forEach((a) => (a.needsUpdate = true));
    mat.current!.uniforms.uProgress.value = 0;
    prevIndex.current = index;
  }, [index, geometry, targets]);

  useFrame(({ clock }, delta) => {
    const u = mat.current!.uniforms;
    const g = group.current!;
    const t = clock.getElapsedTime();
    u.uTime.value = t;
    if (active) started.current = true;
    if (started.current) u.uProgress.value = Math.min(u.uProgress.value + delta * 0.7, 1);
    u.uLight.value = damp(u.uLight.value, isDark ? 0 : 1, 6, delta);

    const m = mouse.current;
    u.uMouse.value.x += (m.x * worldSize * 0.75 - u.uMouse.value.x) * 0.2;
    u.uMouse.value.y += (m.y * worldSize * 0.75 - u.uMouse.value.y) * 0.2;

    g.rotation.y = damp(g.rotation.y, Math.sin(t * 0.5) * 0.35 + (m.inside ? m.x * 0.4 : 0), 3, delta);
    g.rotation.x = damp(g.rotation.x, m.inside ? -m.y * 0.25 : 0, 3, delta);
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={mat}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blendingFor(isDark)}
        />
      </points>
    </group>
  );
}
