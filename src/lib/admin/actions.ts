"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireProfessor } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { STUDENT_EMAIL_DOMAIN } from "@/lib/auth/constants";
import { registrarEventoAdmin } from "@/lib/admin/eventos";
import type { TrilhaSlug } from "@/lib/types/database.types";

function generateTempPassword() {
  return randomBytes(9).toString("base64url"); // ~12 caracteres
}

export type ActionState = { error?: string; success?: string } | undefined;

export async function createTurma(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const professor = await requireProfessor();

  const nome = String(formData.get("nome") ?? "").trim();
  const trilhaSlug = String(formData.get("trilha_slug") ?? "") as TrilhaSlug;

  if (!nome || (trilhaSlug !== "dam" && trilhaSlug !== "bd")) {
    return { error: "Preencha o nome da turma e escolha o curso." };
  }

  const supabase = await createClient();
  const { data: trilha } = await supabase
    .from("trilhas")
    .select("id")
    .eq("slug", trilhaSlug)
    .single();

  if (!trilha) {
    return { error: "Curso não encontrado." };
  }

  const { error } = await supabase
    .from("turmas")
    .insert({ nome, trilha_id: trilha.id });

  if (error) {
    return { error: "Não foi possível criar a turma." };
  }

  await registrarEventoAdmin(professor.id, "criar_turma", { nome, trilha_slug: trilhaSlug });
  revalidatePath("/admin/turmas");
  return { success: "Turma criada." };
}

export type CriarAlunoState =
  | { error: string }
  | { success: true; username: string; senha: string }
  | undefined;

export async function createAluno(
  _prevState: CriarAlunoState,
  formData: FormData
): Promise<CriarAlunoState> {
  const professor = await requireProfessor();

  const fullName = String(formData.get("full_name") ?? "").trim();
  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "");
  const turmaId = String(formData.get("turma_id") ?? "");

  if (!fullName || !username || !turmaId) {
    return { error: "Preencha nome, usuário e escolha a turma." };
  }

  const email = `${username}@${STUDENT_EMAIL_DOMAIN}`;
  const senha = generateTempPassword();
  const admin = createAdminClient();

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: "aluno" },
  });

  if (createError || !created.user) {
    if (createError?.code === "email_exists") {
      return { error: "Esse nome de usuário já está em uso." };
    }
    return { error: "Não foi possível criar o aluno." };
  }

  const { error: membroError } = await admin
    .from("turma_membros")
    .insert({ turma_id: turmaId, aluno_id: created.user.id });

  if (membroError) {
    return { error: "Aluno criado, mas não foi possível vincular à turma." };
  }

  await registrarEventoAdmin(professor.id, "criar_aluno", { username, turma_id: turmaId });
  revalidatePath(`/admin/turmas/${turmaId}`);
  return { success: true, username, senha };
}

export async function removerAlunoDaTurma(turmaId: string, alunoId: string) {
  const professor = await requireProfessor();
  const supabase = await createClient();
  await supabase
    .from("turma_membros")
    .delete()
    .eq("turma_id", turmaId)
    .eq("aluno_id", alunoId);
  await registrarEventoAdmin(professor.id, "remover_aluno_da_turma", { turma_id: turmaId, aluno_id: alunoId });
  revalidatePath(`/admin/turmas/${turmaId}`);
}
