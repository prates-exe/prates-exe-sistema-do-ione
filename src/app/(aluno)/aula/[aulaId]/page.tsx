import { notFound } from "next/navigation";
import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { LessonView } from "@/components/lesson/LessonView";

export default async function AulaPage({
  params,
}: {
  params: Promise<{ aulaId: string }>;
}) {
  const { aulaId } = await params;
  const user = await requireAluno();
  const supabase = await createClient();

  const [{ data: aula, error: aulaError }, { data: progresso }] = await Promise.all([
    supabase
      .from("aulas")
      .select(
        "id, trilha_id, titulo, duracao_minutos, tipo_sandbox, conteudo_md, exercicio_inicial, layout_inicial, criterios_validacao"
      )
      .eq("id", aulaId)
      .maybeSingle(),
    supabase
      .from("progresso_aulas")
      .select("status")
      .eq("aluno_id", user.id)
      .eq("aula_id", aulaId)
      .maybeSingle(),
  ]);

  if (aulaError) console.error("Erro ao buscar aula:", aulaError.message);
  if (!aula) notFound();

  return <LessonView aula={aula} alunoId={user.id} status={progresso?.status ?? "nao_iniciada"} />;
}
