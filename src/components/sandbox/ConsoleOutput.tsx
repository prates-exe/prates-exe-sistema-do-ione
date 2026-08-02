import type { ResultadoExecucaoCodigo } from "@/lib/types/database.types";

export function ConsoleOutput({
  resultado,
  erroServico,
}: {
  resultado: ResultadoExecucaoCodigo | null;
  erroServico?: string;
}) {
  if (erroServico) {
    return <p className="p-4 text-sm text-red-600">{erroServico}</p>;
  }

  if (!resultado) {
    return <p className="p-4 text-sm text-slate-500">Execute o código para ver o resultado aqui.</p>;
  }

  return (
    <div className="max-h-72 overflow-auto p-4 font-mono text-xs">
      {resultado.stdout && (
        <pre className="whitespace-pre-wrap text-slate-800">{resultado.stdout}</pre>
      )}
      {resultado.stderr && (
        <pre className="whitespace-pre-wrap text-red-700">{resultado.stderr}</pre>
      )}
      {!resultado.stdout && !resultado.stderr && <p className="text-slate-500">(sem saída)</p>}
    </div>
  );
}
