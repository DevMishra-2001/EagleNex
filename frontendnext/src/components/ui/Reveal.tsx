"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/constants/motion";

type RevealProps = { children: ReactNode; delay?: number; className?: string; y?: number };

/** Fades + slides children in when they scroll into view */
export default function Reveal({ children, delay = 0, className = "", y = 40 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
