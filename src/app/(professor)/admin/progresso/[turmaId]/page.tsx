import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default async function ProgressoTurmaPage({
  params,
}: {
  params: Promise<{ turmaId: string }>;
}) {
  const { turmaId } = await params;
  const supabase = await createClient();

  const { data: turma } = await supabase
    .from("turmas")
    .select("id, nome, trilha_id")
    .eq("id", turmaId)
    .single();
  if (!turma) notFound();

  const [{ data: membros }, { data: aulasPublicadas }] = await Promise.all([
    supabase.from("turma_membros").select("aluno_id").eq("turma_id", turmaId),
    supabase.from("aulas").select("id").eq("trilha_id", turma.trilha_id).eq("publicado", true),
  ]);

  const alunoIds = membros?.map((m) => m.aluno_id) ?? [];
  const aulaIds = aulasPublicadas?.map((a) => a.id) ?? [];
  const totalAulas = aulaIds.length;

  const [{ data: perfis }, { data: progresso }] = await Promise.all([
    alunoIds.length > 0
      ? supabase.from("profiles").select("id, full_name").in("id", alunoIds)
      : Promise.resolve({ data: [] as { id: string; full_name: string }[] }),
    alunoIds.length > 0 && aulaIds.length > 0
      ? supabase
          .from("progresso_aulas")
          .select("aluno_id, status, quiz_completo, exercicio_completo")
          .in("aluno_id", alunoIds)
          .in("aula_id", aulaIds)
      : Promise.resolve({
          data: [] as {
            aluno_id: string;
            status: string;
            quiz_completo: boolean;
            exercicio_completo: boolean;
          }[],
        }),
  ]);

  const porAluno = new Map<
    string,
    { concluidas: number; quizzesAprovados: number; exerciciosFeitos: number }
  >();
  for (const p of progresso ?? []) {
    const atual =
      porAluno.get(p.aluno_id) ?? { concluidas: 0, quizzesAprovados: 0, exerciciosFeitos: 0 };
    if (p.status === "concluida") atual.concluidas++;
    if (p.quiz_completo) atual.quizzesAprovados++;
    if (p.exercicio_completo) atual.exerciciosFeitos++;
    porAluno.set(p.aluno_id, atual);
  }

  return (
    <div className="space-y-4">
      <PageHeader title={turma.nome} subtitle={`${totalAulas} aulas publicadas nesta trilha.`} />

      <Card className="overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Aluno</th>
              <th className="px-4 py-2.5">Aulas concluídas</th>
              <th className="px-4 py-2.5">Quizzes aprovados</th>
              <th className="px-4 py-2.5">Exercícios feitos</th>
            </tr>
          </thead>
          <tbody>
            {perfis?.map((perfil) => {
              const dados =
                porAluno.get(perfil.id) ??
                { concluidas: 0, quizzesAprovados: 0, exerciciosFeitos: 0 };
              const pct = totalAulas > 0 ? Math.round((dados.concluidas / totalAulas) * 100) : 0;
              return (
                <tr key={perfil.id} className="border-t border-slate-100">
                  <td className="px-4 py-2.5 text-slate-900">{perfil.full_name}</td>
                  <td className="px-4 py-2.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs">
                        {dados.concluidas}/{totalAulas}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {dados.quizzesAprovados} / {totalAulas}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {dados.exerciciosFeitos} / {totalAulas}
                  </td>
                </tr>
              );
            })}
            {perfis?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  Nenhum aluno nesta turma ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
