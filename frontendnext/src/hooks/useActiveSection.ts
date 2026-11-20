"use client";

import { useEffect, useState } from "react";

/** Id of the section currently crossing the middle of the viewport */
export function useActiveSection(ids: readonly string[], initial = ids[0]) {
  const [active, setActive] = useState(initial);
  const key = ids.join("|");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    key.split("|").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return active;
}
