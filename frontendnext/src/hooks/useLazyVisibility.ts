"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

type Margin = UseInViewOptions["margin"];

/** `seen` flips once the element nears the viewport (mount heavy stuff), `visible` tracks it live (pause when off-screen) */
export function useLazyVisibility<T extends HTMLElement = HTMLDivElement>({
  preload = "300px",
  keepAlive = "50px",
}: { preload?: Margin; keepAlive?: Margin } = {}) {
  const ref = useRef<T>(null);
  const seen = useInView(ref, { once: true, margin: preload });
  const visible = useInView(ref, { margin: keepAlive });
  return { ref, seen, visible };
}
