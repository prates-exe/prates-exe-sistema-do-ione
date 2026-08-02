"use server";

import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export async function marcarMaterialVisualizado(aulaId: string) {
  const user = await requireAluno();
  const supabase = await createClient();

  const { data: existente } = await supabase
    .from("progresso_aulas")
    .select("status, primeira_visita_em")
    .eq("aluno_id", user.id)
    .eq("aula_id", aulaId)
    .maybeSingle();

  await supabase.from("progresso_aulas").upsert(
    {
      aluno_id: user.id,
      aula_id: aulaId,
      material_visualizado: true,
      status: existente?.status === "concluida" ? "concluida" : "em_andamento",
      primeira_visita_em: existente?.primeira_visita_em ?? new Date().toISOString(),
    },
    { onConflict: "aluno_id,aula_id" }
  );
}
