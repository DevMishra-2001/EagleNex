import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type IconBadgeProps = { icon: LucideIcon; gradient: string; className?: string; iconClassName?: string };

/** Rounded square with a gradient fill and a white icon */
export default function IconBadge({ icon: Icon, gradient, className, iconClassName }: IconBadgeProps) {
  return (
    <span className={cn("grid place-items-center bg-linear-to-br/srgb shadow-lg", gradient, className)}>
      <Icon className={cn("text-pure", iconClassName)} />
    </span>
  );
}
