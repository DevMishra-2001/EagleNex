"use client";

import { useEffect, useState } from "react";

/** true while the element with `id` is on screen; waits if it renders later */
export function useElementVisible(id: string, { rootMargin = "0px", threshold = 0 }: IntersectionObserverInit = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let raf = 0;
    const attach = () => {
      const el = document.getElementById(id);
      if (!el) {
        raf = requestAnimationFrame(attach);
        return;
      }
      observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin, threshold });
      observer.observe(el);
    };
    attach();
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [id, rootMargin, threshold]);

  return visible;
}
