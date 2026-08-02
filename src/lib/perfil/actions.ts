"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { AVATARES } from "./avatares";

const schema = z.object({
  nomeExibicao: z
    .string()
    .trim()
    .min(2, "Use pelo menos 2 letras.")
    .max(30, "Máximo de 30 letras."),
  avatarId: z.string().refine((id) => AVATARES.some((a) => a.id === id), {
    message: "Escolha um avatar da lista.",
  }),
});

export type AtualizarPerfilState = { error?: string; ok?: boolean } | undefined;

export async function atualizarPerfil(
  _prevState: AtualizarPerfilState,
  formData: FormData
): Promise<AtualizarPerfilState> {
  const user = await requireAluno();

  const parsed = schema.safeParse({
    nomeExibicao: formData.get("nomeExibicao"),
    avatarId: formData.get("avatarId"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      nome_exibicao: parsed.data.nomeExibicao,
      avatar_id: parsed.data.avatarId,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Não foi possível salvar. Tente novamente." };
  }

  revalidatePath("/perfil");
  revalidatePath("/dashboard");
  return { ok: true };
}
