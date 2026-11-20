import { getCssVar } from "./dom";

export const EMOJI_FONT_STACK = `"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"`;

// Display font family as resolved by next/font (falls back to the plain name)
export const displayFont = () => getCssVar("--font-sora", '"Sora"');

type GlyphOptions = { size: number; font: string; offsetY: number };

// Offscreen square canvas reused for every glyph draw
function createCanvas(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  return canvas.getContext("2d", { willReadFrequently: true })!;
}

// Draws centred white text and returns its RGBA pixels
function drawGlyph(ctx: CanvasRenderingContext2D, text: string, { size, font, offsetY }: GlyphOptions) {
  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = font;
  ctx.fillStyle = "#fff";
  ctx.fillText(text, size / 2, size / 2 + size * offsetY);
  return ctx.getImageData(0, 0, size, size).data;
}

// Rec. 601 luma of the pixel at byte offset i, 0..1
const luminance = (d: Uint8ClampedArray, i: number) => (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;

// Every `step`-th opaque pixel as [x, y, lum]
function opaquePixels(data: Uint8ClampedArray, size: number, step: number, alphaMin: number) {
  const pts: [number, number, number][] = [];
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const i = (y * size + x) * 4;
      if (data[i + 3] > alphaMin) pts.push([x, y, luminance(data, i)]);
    }
  }
  return pts;
}

// Rough count of opaque pixels (every 4th pixel) to detect a missing emoji glyph
function coverage(data: Uint8ClampedArray, alphaMin = 128) {
  let c = 0;
  for (let i = 3; i < data.length; i += 16) if (data[i] > alphaMin) c++;
  return c;
}

/** Hero eagle: opaque pixels of 🦅 (or "EN" if the system has no eagle emoji), size 512 / step 2 */
export function sampleHeroGlyph(size = 512) {
  const ctx = createCanvas(size);
  let data = drawGlyph(ctx, "🦅", { size, font: `${size * 0.82}px ${EMOJI_FONT_STACK},sans-serif`, offsetY: 0.04 });
  if (coverage(data) < 400) data = drawGlyph(ctx, "EN", { size, font: `800 ${size * 0.5}px ${displayFont()}, sans-serif`, offsetY: 0.04 });
  return opaquePixels(data, size, 2, 128);
}

export type EmojiSample = { pos: Float32Array; bright: Float32Array };

const emojiCache = new Map<string, EmojiSample>();

/** Exactly `n` particle positions (+ brightness) tracing an emoji / text, cached per input */
export function sampleEmoji(text: string, { n = 4000, worldSize = 4, size = 256 } = {}): EmojiSample {
  const key = `${text}|${n}|${worldSize}`;
  const cached = emojiCache.get(key);
  if (cached) return cached;

  const ctx = createCanvas(size);
  const data = drawGlyph(ctx, text, { size, font: `${size * 0.8}px ${EMOJI_FONT_STACK},${displayFont()},sans-serif`, offsetY: 0.05 });
  const pts = opaquePixels(data, size, 1, 140);

  const pos = new Float32Array(n * 3);
  const bright = new Float32Array(n);
  for (let k = 0; k < n; k++) {
    if (pts.length === 0) {
      // nothing rendered: small random cloud
      pos[k * 3] = (Math.random() - 0.5) * worldSize * 0.5;
      pos[k * 3 + 1] = (Math.random() - 0.5) * worldSize * 0.5;
      pos[k * 3 + 2] = (Math.random() - 0.5) * 0.5;
      bright[k] = 0.5;
      continue;
    }
    const [x, y, lum] = pts[Math.floor(Math.random() * pts.length)];
    pos[k * 3] = ((x + Math.random() - size / 2) / size) * worldSize;
    pos[k * 3 + 1] = (-(y + Math.random() - size / 2) / size) * worldSize;
    pos[k * 3 + 2] = (lum - 0.5) * 0.7 + (Math.random() - 0.5) * 0.2;
    bright[k] = lum;
  }

  const result = { pos, bright };
  emojiCache.set(key, result);
  return result;
}
