import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CreateTurmaForm } from "@/components/admin/CreateTurmaForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TRILHA_STYLE } from "@/components/ui/trilhaStyle";
import type { TrilhaSlug } from "@/lib/types/database.types";

export default async function TurmasPage() {
  const supabase = await createClient();
  const [{ data: turmas }, { data: trilhas }] = await Promise.all([
    supabase
      .from("turmas")
      .select("id, nome, ativa, trilha_id")
      .order("created_at", { ascending: false }),
    supabase.from("trilhas").select("id, nome, slug"),
  ]);

  const trilhaPorId = new Map(trilhas?.map((t) => [t.id, t]));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Turmas"
        subtitle="Crie turmas e depois cadastre os alunos dentro de cada uma."
      />

      <Card>
        <CardBody>
          <CreateTurmaForm />
        </CardBody>
      </Card>

      <div className="space-y-2">
        {turmas?.map((turma) => {
          const trilha = trilhaPorId.get(turma.trilha_id);
          const slug = (trilha?.slug ?? "bd") as TrilhaSlug;
          const estilo = TRILHA_STYLE[slug];
          return (
            <Link key={turma.id} href={`/admin/turmas/${turma.id}`} className="block">
              <Card
                className={`border-l-[6px] ${estilo.border} transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]`}
                style={{ backgroundColor: estilo.tintVar }}
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{turma.nome}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${estilo.pill}`}>
                      {trilha?.nome}
                    </span>
                  </div>
                  {!turma.ativa && <Badge variant="neutral">inativa</Badge>}
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
