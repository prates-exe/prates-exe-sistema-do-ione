import type { HTMLAttributes } from "react";

const VARIANTS = {
  neutral: "bg-slate-200 text-slate-700",
  success: "bg-emerald-500 text-white",
  warning: "bg-amber-400 text-amber-950",
  info: "bg-brand-500 text-white",
  dam: "bg-dam-500 text-white",
  bd: "bg-bd-500 text-slate-900",
} as const;

export function Badge({
  variant = "neutral",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof VARIANTS }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
