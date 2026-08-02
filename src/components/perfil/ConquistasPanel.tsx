import { Trophy, Lock } from "lucide-react";
import type { Conquista } from "@/lib/perfil/conquistas";

export function ConquistasPanel({ conquistas }: { conquistas: Conquista[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {conquistas.map((conquista) => (
        <div
          key={conquista.id}
          className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-4 text-center ${
            conquista.desbloqueada
              ? "border-slate-900 bg-bd-50 shadow-[3px_3px_0_0_#0f172a]"
              : "border-dashed border-slate-300 bg-slate-50"
          }`}
        >
          {conquista.desbloqueada ? (
            <Trophy className="h-7 w-7 text-bd-600" />
          ) : (
            <Lock className="h-7 w-7 text-slate-300" />
          )}
          <p
            className={`font-heading text-xs font-bold ${
              conquista.desbloqueada ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {conquista.titulo}
          </p>
          <p className={`text-[11px] ${conquista.desbloqueada ? "text-slate-600" : "text-slate-400"}`}>
            {conquista.descricao}
          </p>
        </div>
      ))}
    </div>
  );
}
