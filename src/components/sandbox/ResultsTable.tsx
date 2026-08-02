import type { QueryExecResult } from "@/lib/sqljs/engine";
import type { ErroSqlAnalisado } from "@/lib/sqljs/errorParser";

export function ResultsTable({
  resultados,
  erro,
  mensagemVazio,
}: {
  resultados: QueryExecResult[] | null;
  erro: ErroSqlAnalisado | null;
  mensagemVazio?: string;
}) {
  if (erro) {
    return (
      <div className="space-y-1.5 p-4 text-sm">
        <p className="font-medium text-red-700">Erro ao executar</p>
        <p className="text-red-700">{erro.amigavel}</p>
        {erro.posicao && (
          <p className="text-xs text-red-500">
            Linha {erro.posicao.linha}, coluna {erro.posicao.coluna}
          </p>
        )}
        <pre className="mt-2 overflow-x-auto rounded-lg bg-red-50 p-2.5 text-xs text-red-800">
          {erro.bruto}
        </pre>
      </div>
    );
  }

  if (!resultados || resultados.length === 0) {
    return (
      <p className="p-4 text-sm text-slate-500">
        {mensagemVazio ?? "Comando executado com sucesso (sem linhas para mostrar)."}
      </p>
    );
  }

  return (
    <div className="max-h-72 space-y-4 overflow-auto p-3">
      {resultados.map((res, i) => (
        <div key={i} className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50">
              <tr>
                {res.columns.map((c) => (
                  <th key={c} className="px-3 py-2 font-medium text-slate-600">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {res.values.map((row, r) => (
                <tr key={r} className="border-t border-slate-100">
                  {row.map((v, ci) => (
                    <td key={ci} className="px-3 py-2 text-slate-800">
                      {v === null ? <span className="italic text-slate-400">NULL</span> : String(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
