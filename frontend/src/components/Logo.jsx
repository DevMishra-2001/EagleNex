import { Bird } from "lucide-react";

// Placeholder logo — apna logo aane par sirf yeh component badal dena.
export default function Logo({ className = "" }) {
  return (
    <a href="#home" className={`group flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan transition-transform duration-500 group-hover:rotate-[20deg]">
        <Bird className="h-[18px] w-[18px] text-white" strokeWidth={2.2} />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">EagleNex</span>
    </a>
  );
}
