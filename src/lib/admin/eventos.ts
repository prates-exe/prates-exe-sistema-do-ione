import "server-only";
import { createClient } from "@/lib/supabase/server";

// Log de auditoria das ações administrativas sensíveis (criar/remover
// turmas e alunos). Falhas ao gravar o log nunca devem impedir a ação em
// si — por isso os erros são só ignorados aqui.
export async function registrarEventoAdmin(
  professorId: string,
  acao: string,
  detalhes?: Record<string, unknown>
) {
  const supabase = await createClient();
  await supabase.from("eventos_admin").insert({
    professor_id: professorId,
    acao,
    detalhes: detalhes ?? null,
  });
}
