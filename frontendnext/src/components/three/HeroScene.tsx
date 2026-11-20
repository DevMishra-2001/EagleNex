"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import { sampleHeroGlyph } from "@/utils/canvas-sampling";
import { blendingFor, damp } from "@/utils/three";
import { shuffle } from "@/utils/random";

const MAX_PARTICLES = 16000;
const WORLD_SIZE = 6;

// Eagle pixels -> particle targets, plus swirling galaxy-disc start positions
function buildEagleGeometry(size = 512) {
  const list = shuffle(sampleHeroGlyph(size)).slice(0, MAX_PARTICLES);
  const n = list.length;
  const target = new Float32Array(n * 3);
  const start = new Float32Array(n * 3);
  const rand = new Float32Array(n);
  const bright = new Float32Array(n);

  for (let k = 0; k < n; k++) {
    const [x, y, lum] = list[k];
    target[k * 3] = ((x - size / 2) / size) * WORLD_SIZE;
    target[k * 3 + 1] = (-(y - size / 2) / size) * WORLD_SIZE;
    target[k * 3 + 2] = (lum - 0.5) * 0.9 + (Math.random() - 0.5) * 0.25; // depth from shading

    const r = 3 + Math.random() * 7;
    const a = Math.random() * Math.PI * 2;
    start[k * 3] = Math.cos(a) * r;
    start[k * 3 + 1] = (Math.random() - 0.5) * 2.5;
    start[k * 3 + 2] = Math.sin(a) * r - 2;

    rand[k] = Math.random();
    bright[k] = lum;
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(target, 3));
  g.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
  g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  g.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
  return g;
}

const eagleVertex = /* glsl */ `
  attribute vec3 aStart;
  attribute float aRand;
  attribute float aBright;
  uniform float uTime;
  uniform float uProgress;
  uniform float uScroll;
  uniform vec3 uMouse;
  uniform float uSize;
  uniform float uLight; // 0 = dark theme, 1 = light theme
  varying vec3 vColor;
  varying float vAlpha;

  vec3 palette(float t) {
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vec3 cyan   = vec3(0.13, 0.83, 0.93);
    vec3 pink   = vec3(0.93, 0.28, 0.60);
    return t < 0.5 ? mix(violet, cyan, t * 2.0) : mix(cyan, pink, (t - 0.5) * 2.0);
  }

  void main() {
    // staggered assemble
    float delay = aRand * 0.45;
    float t = clamp((uProgress - delay) / 0.55, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);

    // swirl while travelling
    vec3 s = aStart;
    float ang = (1.0 - t) * 3.0 + uTime * 0.15 * (1.0 - t);
    s.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * s.xz;
    vec3 p = mix(s, position, t);

    // idle breathing
    p.x += sin(uTime * 0.9 + aRand * 40.0) * 0.015;
    p.y += cos(uTime * 0.8 + aRand * 30.0) * 0.015;
    p.z += sin(uTime * 1.2 + p.x * 1.5) * 0.06;

    // mouse repel
    vec2 d = p.xy - uMouse.xy;
    float dist = length(d);
    float force = smoothstep(1.3, 0.0, dist) * t;
    p.xy += normalize(d + 0.0001) * force * 0.7;
    p.z += force * 1.2;

    // disperse on scroll
    p += (aStart - position) * uScroll * 0.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aBright * 0.9 + force * 1.5) / -mv.z;

    vColor = palette(clamp(position.x / 6.0 + 0.5 + aRand * 0.15, 0.0, 1.0));
    // highlights go towards white on dark bg, towards a deeper tone on light bg
    vec3 hi = mix(vec3(1.0), vColor * 0.45, uLight);
    vColor = mix(vColor, hi, aBright * 0.45 + force * 0.5);
    vAlpha = (0.28 + aBright * 0.55) * (1.0 - uScroll * 0.85) * (1.0 + uLight * 0.7);
  }
`;
const eagleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function ParticleEagle() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, gl } = useThree();
  const { isDark } = useTheme();
  const wide = viewport.width > 9;

  const geometry = useMemo(() => buildEagleGeometry(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uSize: { value: 30 * Math.min(gl.getPixelRatio(), 2) },
      uLight: { value: 0 },
    }),
    [gl],
  );
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer, viewport: vp }, delta) => {
    const u = mat.current!.uniforms;
    const g = group.current!;
    u.uTime.value = clock.getElapsedTime();
    u.uProgress.value = Math.min(u.uProgress.value + delta * 0.45, 1);
    u.uLight.value = damp(u.uLight.value, isDark ? 0 : 1, 6, delta);

    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    u.uScroll.value = damp(u.uScroll.value, scroll, 6, delta);

    // pointer -> local space of the eagle
    mouseWorld.set((pointer.x * vp.width) / 2, (pointer.y * vp.height) / 2, 0);
    g.worldToLocal(mouseWorld);
    u.uMouse.value.lerp(mouseWorld, 0.15);

    g.rotation.y = damp(g.rotation.y, pointer.x * 0.35, 2.5, delta);
    g.rotation.x = damp(g.rotation.x, -pointer.y * 0.15, 2.5, delta);
  });

  return (
    <group ref={group} position={[wide ? viewport.width * 0.2 : 0, wide ? 0.2 : 0.8, 0]} scale={wide ? 1 : 0.7}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={mat}
          vertexShader={eagleVertex}
          fragmentShader={eagleFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blendingFor(isDark)}
        />
      </points>
      <HaloRing />
    </group>
  );
}

// Thin particle circle framing the eagle
function buildRingGeometry(n = 1400) {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 3.6 + (Math.random() - 0.5) * 0.12;
    arr[i * 3] = Math.cos(a) * r;
    arr[i * 3 + 1] = Math.sin(a) * r;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1 - 0.6;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  return g;
}

function HaloRing() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => buildRingGeometry(), []);
  const { isDark } = useTheme();
  useFrame((_, d) => {
    ref.current!.rotation.z += d * 0.08;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color={isDark ? "#67e8f9" : "#0891b2"}
        transparent
        opacity={isDark ? 0.5 : 0.6}
        depthWrite={false}
        blending={blendingFor(isDark)}
      />
    </points>
  );
}

const waveVertex = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vDist;
  void main() {
    vec3 p = position;
    p.z = sin(p.x * 0.35 + uTime * 0.9) * 0.45
        + cos(p.y * 0.45 + uTime * 0.7) * 0.35
        + sin((p.x + p.y) * 0.25 + uTime * 0.5) * 0.3;
    vHeight = p.z;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    gl_PointSize = (2.0 + p.z) * (18.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const waveFragment = /* glsl */ `
  varying float vHeight;
  varying float vDist;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = mix(vec3(0.55, 0.36, 0.96), vec3(0.13, 0.83, 0.93), smoothstep(-0.8, 0.8, vHeight));
    float fade = smoothstep(30.0, 8.0, vDist);
    gl_FragColor = vec4(col, (1.0 - d * 2.0) * fade * 0.7);
  }
`;

// Flat grid of points, animated into waves by the shader
function buildWaveGeometry(cols = 160, rows = 70, gap = 0.28) {
  const pts = new Float32Array(cols * rows * 3);
  let i = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      pts[i++] = (x - cols / 2) * gap;
      pts[i++] = (y - rows / 2) * gap;
      pts[i++] = 0;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  return g;
}

function ParticleWave() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => buildWaveGeometry(), []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const { isDark } = useTheme();
  useFrame(({ clock }) => {
    mat.current!.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geometry} rotation={[-Math.PI / 2.25, 0, 0]} position={[0, -3.6, -4]}>
      <shaderMaterial
        ref={mat}
        vertexShader={waveVertex}
        fragmentShader={waveFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={blendingFor(isDark)}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ParticleEagle />
      <ParticleWave />
    </Canvas>
  );
}
