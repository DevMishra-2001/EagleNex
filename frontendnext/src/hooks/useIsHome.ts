"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/site";

/** true on the landing page, where nav links scroll to sections instead of changing route */
export const useIsHome = () => usePathname() === ROUTES.home;
