import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { TrilhaSlug } from "@/lib/types/database.types";

const TITULOS: Record<TrilhaSlug, string> = {
  dam: "Desenvolvimento de Aplicativos",
  bd: "Banco de Dados",
};

const TIPO_SANDBOX_LABEL: Record<string, string> = {
  sql: "Terminal SQL",
  code: "Terminal de código",
  android: "Terminal Android",
  none: "Sem terminal",
};

export default async function CurriculoTrilhaPage({
  params,
}: {
  params: Promise<{ trilhaSlug: string }>;
}) {
  const { trilhaSlug } = await params;
  if (trilhaSlug !== "dam" && trilhaSlug !== "bd") notFound();

  const supabase = await createClient();
  const { data: trilha } = await supabase
    .from("trilhas")
    .select("id")
    .eq("slug", trilhaSlug)
    .single();
  if (!trilha) notFound();

  const { data: aulas } = await supabase
    .from("aulas")
    .select("id, titulo, mes_numero, numero_sequencial, tipo_sandbox, publicado")
    .eq("trilha_id", trilha.id)
    .order("mes_numero", { ascending: true })
    .order("semana_numero", { ascending: true })
    .order("numero_sequencial", { ascending: true });

  return (
    <div className="space-y-4">
      <PageHeader
        title={`Currículo — ${TITULOS[trilhaSlug]}`}
        subtitle={
          <>
            O conteúdo das aulas é escrito em arquivos Markdown (pasta{" "}
            <code className="rounded bg-slate-100 px-1">content/{trilhaSlug}</code>) e
            publicado com <code className="rounded bg-slate-100 px-1">npm run seed</code>.
          </>
        }
      />

      <Card className="overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Nº</th>
              <th className="px-4 py-2.5">Aula</th>
              <th className="px-4 py-2.5">Trimestre</th>
              <th className="px-4 py-2.5">Tipo</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {aulas?.map((aula) => (
              <tr key={aula.id} className="border-t border-slate-100">
                <td className="px-4 py-2.5 text-slate-500">{aula.numero_sequencial}</td>
                <td className="px-4 py-2.5 text-slate-900">{aula.titulo}</td>
                <td className="px-4 py-2.5 text-slate-600">{aula.mes_numero}º</td>
                <td className="px-4 py-2.5 text-slate-600">
                  {TIPO_SANDBOX_LABEL[aula.tipo_sandbox] ?? aula.tipo_sandbox}
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant={aula.publicado ? "success" : "neutral"}>
                    {aula.publicado ? "Publicada" : "Rascunho"}
                  </Badge>
                </td>
              </tr>
            ))}
            {aulas?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Nenhuma aula cadastrada ainda para esta trilha.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
