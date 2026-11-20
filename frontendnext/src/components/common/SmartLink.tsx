"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useIsHome } from "@/hooks/useIsHome";
import { toHref } from "@/utils/links";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string; section?: string };

/** Scrolls to `section` on the home page, otherwise navigates to `href` (client-side for internal routes) */
export default function SmartLink({ href, section, ...props }: SmartLinkProps) {
  const isHome = useIsHome();
  if (isHome && section) return <a href={toHref(section)} {...props} />;
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
