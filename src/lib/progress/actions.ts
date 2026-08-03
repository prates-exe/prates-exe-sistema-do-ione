"use server";

import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export async function marcarMaterialVisualizado(aulaId: string) {
  const user = await requireAluno();
  const supabase = await createClient();

  // Só registra que o material foi lido. O status da aula é calculado pelo
  // gatilho no banco (quiz + exercício) — ler o material sozinho nunca
  // conclui uma aula.
  const { data: existente } = await supabase
    .from("progresso_aulas")
    .select("primeira_visita_em")
    .eq("aluno_id", user.id)
    .eq("aula_id", aulaId)
    .maybeSingle();

  await supabase.from("progresso_aulas").upsert(
    {
      aluno_id: user.id,
      aula_id: aulaId,
      material_visualizado: true,
      primeira_visita_em: existente?.primeira_visita_em ?? new Date().toISOString(),
    },
    { onConflict: "aluno_id,aula_id" }
  );
}
