// n random floats in [0, 1)
export function randoms(n: number): Float32Array {
  const arr = new Float32Array(n);
  for (let k = 0; k < n; k++) arr[k] = Math.random();
  return arr;
}

// Random xyz points inside a sphere, the "scattered" state before assembling
export function scatter(n: number, radius = 4): Float32Array {
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

// In-place Fisher-Yates shuffle
export function shuffle<T>(list: T[]): T[] {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
