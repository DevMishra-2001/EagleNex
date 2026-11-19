import { useId } from "react";
import { MARK_LAYERS, MARK_VIEWBOX } from "./eagleMark";

/** EagleNex eagle — same vector as /brand/svg/eaglenex-mark.svg */
export function EagleMark({ className = "h-9 w-9", mono }) {
  const id = useId();
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="120" y2="100">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id={`${id}hl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      {MARK_LAYERS.map((l, i) => {
        const fill = mono ?? (l.beak ? "#FBBF24" : l.light ? `url(#${id}hl)` : `url(#${id})`);
        return (
          <g key={i}>
            <path fill={fill} fillRule="evenodd" d={l.d} />
            {!mono && l.shade > 0 && <path fill="#0A0A14" opacity={l.shade} d={l.d} />}
          </g>
        );
      })}
    </svg>
  );
}

export default function Logo({ className = "" }) {
  return (
    <a href="#home" aria-label="EagleNex home" className={`group flex items-center gap-2.5 ${className}`}>
      <EagleMark className="h-9 w-14 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
      <span className="font-sans text-xl font-bold tracking-[-0.025em] text-white">EagleNex</span>
    </a>
  );
}
