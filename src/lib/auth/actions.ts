"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STUDENT_EMAIL_DOMAIN } from "@/lib/auth/constants";
import { permitir } from "@/lib/rateLimit";

const LIMITE_TENTATIVAS = 5;
const JANELA_MS = 5 * 60_000;

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const identifier = String(formData.get("identifier") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!identifier || !password) {
    return { error: "Preencha usuário/e-mail e senha." };
  }

  if (!permitir(`login:${identifier.toLowerCase()}`, LIMITE_TENTATIVAS, JANELA_MS)) {
    return { error: "Muitas tentativas para este usuário. Espere alguns minutos e tente de novo." };
  }

  const email = identifier.includes("@")
    ? identifier
    : `${identifier}@${STUDENT_EMAIL_DOMAIN}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Usuário ou senha inválidos." };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
