/**
 * Draws an emoji / text on a hidden canvas and returns exactly `n`
 * particle positions (+ brightness) that trace its shape.
 */
const cache = new Map();

export function sampleEmoji(text, { n = 4000, worldSize = 4, size = 256 } = {}) {
  const key = `${text}|${n}|${worldSize}`;
  if (cache.has(key)) return cache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.font = `${size * 0.8}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji","Sora",sans-serif`;
  ctx.fillText(text, size / 2, size / 2 + size * 0.05);
  const data = ctx.getImageData(0, 0, size, size).data;

  const pts = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      if (data[i + 3] > 140) {
        const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
        pts.push(x, y, lum);
      }
    }
  }

  const count = pts.length / 3;
  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  for (let k = 0; k < n; k++) {
    if (count === 0) {
      // nothing rendered: small random cloud
      pos[k * 3] = (Math.random() - 0.5) * worldSize * 0.5;
      pos[k * 3 + 1] = (Math.random() - 0.5) * worldSize * 0.5;
      pos[k * 3 + 2] = (Math.random() - 0.5) * 0.5;
      bright[k] = 0.5;
      continue;
    }
    const j = Math.floor(Math.random() * count) * 3;
    const lum = pts[j + 2];
    pos[k * 3] = ((pts[j] + Math.random() - size / 2) / size) * worldSize;
    pos[k * 3 + 1] = (-(pts[j + 1] + Math.random() - size / 2) / size) * worldSize;
    pos[k * 3 + 2] = (lum - 0.5) * 0.7 + (Math.random() - 0.5) * 0.2;
    bright[k] = lum;
  }

  const result = { pos, bright };
  cache.set(key, result);
  return result;
}

/** Random points inside a sphere — the "scattered" state before assembling */
export function scatter(n, radius = 4) {
  const arr = new Float32Array(n * 3);
  for (let k = 0; k < n; k++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    arr[k * 3] = r * Math.sin(v) * Math.cos(u);
    arr[k * 3 + 1] = r * Math.sin(v) * Math.sin(u);
    arr[k * 3 + 2] = r * Math.cos(v);
  }
  return arr;
}

export function randoms(n) {
  const arr = new Float32Array(n);
  for (let k = 0; k < n; k++) arr[k] = Math.random();
  return arr;
}
