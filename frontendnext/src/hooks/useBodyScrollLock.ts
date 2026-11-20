"use client";

import { useEffect } from "react";

/** Locks page scroll while `locked` is true */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
  }, [locked]);
}
