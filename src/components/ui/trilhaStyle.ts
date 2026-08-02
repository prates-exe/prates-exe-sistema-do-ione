import type { TrilhaSlug } from "@/lib/types/database.types";

export const TRILHA_STYLE: Record<
  TrilhaSlug,
  {
    nome: string;
    border: string;
    tint: string;
    tintVar: string;
    pill: string;
    badge: "dam" | "bd";
    solidBg: string;
    textOnSolid: string;
  }
> = {
  dam: {
    nome: "Desenvolvimento de Apps",
    border: "border-l-dam-500",
    tint: "bg-dam-50",
    tintVar: "var(--color-dam-50)",
    pill: "bg-dam-100 text-dam-700",
    badge: "dam",
    solidBg: "bg-dam-600",
    textOnSolid: "text-white",
  },
  bd: {
    nome: "Banco de Dados",
    border: "border-l-bd-500",
    tint: "bg-bd-50",
    tintVar: "var(--color-bd-50)",
    pill: "bg-bd-100 text-bd-700",
    badge: "bd",
    solidBg: "bg-bd-500",
    textOnSolid: "text-slate-900",
  },
};
