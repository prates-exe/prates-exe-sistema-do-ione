import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { SqlTerminal } from "@/components/sandbox/SqlTerminal";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function PraticarSqlPage() {
  const user = await requireAluno();
  const supabase = await createClient();

  const { data: trilhaId } = await supabase.rpc("trilha_do_aluno", {
    p_aluno_id: user.id,
    p_slug: "bd",
  });

  if (!trilhaId) {
    return (
      <p className="text-sm text-slate-500">
        Você precisa estar em uma turma de Banco de Dados para praticar SQL livremente.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Prática livre de SQL"
        subtitle="Um espaço só seu para testar comandos SQL sem afetar as atividades das aulas."
      />
      <SqlTerminal alunoId={user.id} trilhaId={trilhaId} mode="livre" />
    </div>
  );
}
