import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { TRILHA_STYLE } from "@/components/ui/trilhaStyle";
import type { TrilhaSlug } from "@/lib/types/database.types";

export default async function ProgressoPage() {
  const supabase = await createClient();
  const [{ data: turmas }, { data: trilhas }] = await Promise.all([
    supabase.from("turmas").select("id, nome, trilha_id").order("nome"),
    supabase.from("trilhas").select("id, nome, slug"),
  ]);

  const trilhaPorId = new Map(trilhas?.map((t) => [t.id, t]));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Progresso das turmas"
        subtitle="Escolha uma turma para ver o progresso de cada aluno."
      />

      <div className="space-y-2">
        {turmas?.map((turma) => {
          const trilha = trilhaPorId.get(turma.trilha_id);
          const slug = (trilha?.slug ?? "bd") as TrilhaSlug;
          const estilo = TRILHA_STYLE[slug];
          return (
            <Link key={turma.id} href={`/admin/progresso/${turma.id}`} className="block">
              <Card
                className={`border-l-[6px] ${estilo.border} transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]`}
                style={{ backgroundColor: estilo.tintVar }}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <span className="text-sm font-semibold text-slate-900">{turma.nome}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${estilo.pill}`}>
                    {trilha?.nome}
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
        {turmas?.length === 0 && (
          <Card className="px-4 py-6 text-center text-sm text-slate-500">
            Nenhuma turma criada ainda.
          </Card>
        )}
      </div>
    </div>
  );
}
