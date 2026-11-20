import * as THREE from "three";

// Frame-rate independent easing towards a target
export const damp = THREE.MathUtils.damp;

// Glowing additive blend on dark backgrounds, normal blend on light ones
export const blendingFor = (isDark: boolean) => (isDark ? THREE.AdditiveBlending : THREE.NormalBlending);
