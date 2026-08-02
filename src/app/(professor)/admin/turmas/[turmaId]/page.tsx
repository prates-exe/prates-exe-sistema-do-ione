import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { removerAlunoDaTurma } from "@/lib/admin/actions";
import { CreateAlunoForm } from "@/components/admin/CreateAlunoForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default async function TurmaDetailPage({
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

  const { data: membros } = await supabase
    .from("turma_membros")
    .select("aluno_id")
    .eq("turma_id", turmaId);

  const alunoIds = membros?.map((m) => m.aluno_id) ?? [];
  const { data: perfis } =
    alunoIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", alunoIds)
      : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeader title={turma.nome} />

      <Card>
        <CardHeader>
          <h2 className="font-heading text-sm font-bold text-slate-900">Cadastrar novo aluno</h2>
        </CardHeader>
        <CardBody>
          <CreateAlunoForm turmaId={turma.id} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-sm font-bold text-slate-900">Alunos da turma</h2>
        </CardHeader>
        <ul className="divide-y divide-slate-100">
          {perfis?.map((perfil) => (
            <li key={perfil.id} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-slate-900">{perfil.full_name}</span>
              <form action={removerAlunoDaTurma.bind(null, turma.id, perfil.id)}>
                <button type="submit" className="text-xs text-red-600 hover:underline">
                  Remover da turma
                </button>
              </form>
            </li>
          ))}
          {perfis?.length === 0 && (
            <li className="px-5 py-6 text-center text-sm text-slate-500">
              Nenhum aluno cadastrado nesta turma ainda.
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
