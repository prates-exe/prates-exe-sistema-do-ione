import type { ButtonHTMLAttributes } from "react";

// Estilo "sticker": borda escura + sombra dura (sem desfoque) que encolhe no
// clique, como se o botão fosse pressionado. Sem isso os botões ficam
// planos demais para o público do ensino médio.
const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-900 font-heading font-semibold transition-all duration-100 shadow-[3px_3px_0_0_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#0f172a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  primary: "bg-brand-500 text-white",
  dam: "bg-dam-500 text-white",
  bd: "bg-bd-500 text-slate-900",
  secondary: "bg-white text-slate-900",
  ghost: "border-transparent text-slate-600 shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-slate-100",
  danger: "border-transparent text-red-600 shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-red-50",
} as const;

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props} />
  );
}
