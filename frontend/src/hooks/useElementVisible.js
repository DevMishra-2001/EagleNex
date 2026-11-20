import { useEffect, useState } from "react";

/**
 * true jab tak `id` wala element screen par dikh raha hai.
 * Element baad me render ho (lazy section) tab bhi kaam karta hai.
 */
export function useElementVisible(id, { rootMargin = "0px", threshold = 0 } = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observer;
    let raf;
    const attach = () => {
      const el = document.getElementById(id);
      if (!el) {
        raf = requestAnimationFrame(attach); // wait until it exists
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
