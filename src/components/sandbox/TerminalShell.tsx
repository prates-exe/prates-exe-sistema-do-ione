"use client";

import type { ReactNode } from "react";
import { Play, Check, Loader2, AlertCircle } from "lucide-react";
import type { SaveStatus } from "./useAutosave";

const SAVE_CONFIG: Record<SaveStatus, { label: string; icon: typeof Check | null; className: string }> = {
  idle: { label: "", icon: null, className: "" },
  salvando: { label: "Salvando…", icon: Loader2, className: "text-slate-400" },
  salvo: { label: "Salvo", icon: Check, className: "text-emerald-400" },
  erro: { label: "Falha ao salvar", icon: AlertCircle, className: "text-red-400" },
};

export function TerminalShell({
  title,
  onRun,
  running,
  saveStatus,
  extraActions,
  editor,
  output,
}: {
  title: string;
  onRun: () => void;
  running: boolean;
  saveStatus: SaveStatus;
  extraActions?: ReactNode;
  editor: ReactNode;
  output: ReactNode;
}) {
  const save = SAVE_CONFIG[saveStatus];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </span>
        <div className="flex items-center gap-3">
          {save.icon && (
            <span className={`flex items-center gap-1 text-xs ${save.className}`}>
              <save.icon className={`h-3.5 w-3.5 ${saveStatus === "salvando" ? "animate-spin" : ""}`} />
              {save.label}
            </span>
          )}
          {extraActions}
          <button
            type="button"
            onClick={onRun}
            disabled={running}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" />
            {running ? "Executando…" : "Executar (Ctrl+Enter)"}
          </button>
        </div>
      </div>
      <div>{editor}</div>
      <div className="border-t border-slate-200 bg-slate-50">{output}</div>
    </div>
  );
}
