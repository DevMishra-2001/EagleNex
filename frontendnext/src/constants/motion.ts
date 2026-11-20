import type { Variants } from "framer-motion";

// Shared "ease-out-expo" curve used by every entrance animation
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Blur + slide-up entrance; pass `custom={i}` to stagger
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.12 * i, duration: 0.9, ease: EASE_OUT },
  }),
};
