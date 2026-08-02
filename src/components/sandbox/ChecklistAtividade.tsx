import { CheckCircle2, Circle, ArrowRight, PartyPopper } from "lucide-react";
import type { ResultadoCriterio } from "@/lib/sqljs/validacao";

export function ChecklistAtividade({ criterios }: { criterios: ResultadoCriterio[] }) {
  if (criterios.length === 0) return null;

  const completa = criterios.every((c) => c.atendido);
  const proximoPasso = criterios.find((c) => !c.atendido);

  return (
    <div className="border-t-2 border-slate-900 bg-white p-4">
      <p className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-slate-500">
        Checklist da atividade
      </p>
      <ul className="space-y-1.5">
        {criterios.map((c, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-sm ${
              c.atendido ? "text-slate-500 line-through decoration-emerald-500" : "text-slate-900"
            }`}
          >
            {c.atendido ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            ) : (
              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
            )}
            {c.descricao}
          </li>
        ))}
      </ul>

      {completa ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-bd-500 px-3 py-2 text-sm font-bold text-slate-900">
          <PartyPopper className="h-4 w-4" />
          Atividade completa!
        </div>
      ) : (
        proximoPasso?.dica && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border-2 border-slate-900 bg-brand-50 px-3 py-2 text-sm text-slate-800">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <span>
              <strong>Próximo passo:</strong> {proximoPasso.dica}
            </span>
          </div>
        )
      )}
    </div>
  );
}
