import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Content tilts in 3D (rotateX) and straightens as it scrolls into view.
 * Wrap any grid/section with it for a scroll-driven 3D feel.
 */
export default function Perspective({ children, className = "", tilt = 28 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const rotateX = useTransform(p, [0, 1], [tilt, 0]);
  const scale = useTransform(p, [0, 1], [0.88, 1]);
  const opacity = useTransform(p, [0, 0.5], [0.3, 1]);

  return (
    <div ref={ref} style={{ perspective: 1400 }} className={className}>
      <motion.div style={{ rotateX, scale, opacity, transformOrigin: "50% 100%" }}>{children}</motion.div>
    </div>
  );
}
