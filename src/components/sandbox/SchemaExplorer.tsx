import type { TabelaInfo } from "@/lib/sqljs/engine";

export function SchemaExplorer({ tabelas }: { tabelas: TabelaInfo[] }) {
  return (
    <div className="w-48 shrink-0 border-l border-slate-200 bg-white p-4 text-xs">
      <p className="mb-3 font-semibold text-slate-700">Tabelas</p>
      {tabelas.length === 0 && <p className="text-slate-400">Nenhuma tabela ainda.</p>}
      <ul className="space-y-3">
        {tabelas.map((t) => (
          <li key={t.nome}>
            <p className="font-medium text-bd-700">{t.nome}</p>
            <ul className="ml-2 mt-0.5 text-slate-500">
              {t.colunas.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
