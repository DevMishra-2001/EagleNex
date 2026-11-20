"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { RelativePointer } from "@/types";
import { POINTER_OUTSIDE, toRelativePointer } from "@/utils/dom";

/** Tracks the pointer over `target` in -1..1 coords without re-rendering */
export function useRelativePointer(target: RefObject<HTMLElement | null>) {
  const pointer = useRef<RelativePointer>(POINTER_OUTSIDE);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const move = (e: PointerEvent) => (pointer.current = toRelativePointer(e.clientX, e.clientY, el.getBoundingClientRect()));
    const leave = () => (pointer.current = POINTER_OUTSIDE);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [target]);

  return pointer;
}
