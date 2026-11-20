import type { RelativePointer } from "@/types";

// Reads a CSS custom property from <html>, e.g. a next/font family variable
export function getCssVar(name: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// Pointer far outside any shape, so particle mouse-repel has no effect
export const POINTER_OUTSIDE: RelativePointer = { x: 9, y: 9, inside: false };

// Client point -> -1..1 coords inside `rect` (y up, like WebGL)
export function toRelativePointer(clientX: number, clientY: number, rect: DOMRect): RelativePointer {
  return {
    x: ((clientX - rect.left) / rect.width) * 2 - 1,
    y: -(((clientY - rect.top) / rect.height) * 2 - 1),
    inside: true,
  };
}

// Client point -> 0..1 coords inside `rect`
export function toUnitPointer(clientX: number, clientY: number, rect: DOMRect) {
  return { x: (clientX - rect.left) / rect.width, y: (clientY - rect.top) / rect.height };
}
