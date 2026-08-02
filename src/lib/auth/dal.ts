import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/types/database.types";

export interface CurrentUser {
  id: string;
  full_name: string;
  role: Role;
  nome_exibicao: string | null;
  avatar_id: string | null;
}

// Memoizado por render: várias chamadas na mesma requisição custam 1 leitura.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, role, nome_exibicao, avatar_id")
      .eq("id", data.claims.sub)
      .single();

    return profile;
  } catch {
    // Supabase ainda não configurado (.env.local vazio) ou fora do ar:
    // trata como "não logado" em vez de derrubar a página inteira.
    return null;
  }
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireProfessor(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== "professor") redirect("/dashboard");
  return user;
}

export async function requireAluno(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== "aluno") redirect("/admin");
  return user;
}
