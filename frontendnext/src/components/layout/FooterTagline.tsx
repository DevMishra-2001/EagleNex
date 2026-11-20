"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/constants/motion";

/** Closing line with the tilted "growth!" accent that drops in on view */
export default function FooterTagline() {
  return (
    <p className="mt-8 flex flex-wrap items-baseline gap-2 text-lg text-zinc-300">
      Vision for your ideas, wings for your
      <motion.span
        initial={{ opacity: 0, y: 10, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="accent inline-block text-3xl"
      >
        growth!
      </motion.span>
    </p>
  );
}
