import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { executarJava } from "@/lib/execucao/client";
import { permitir } from "@/lib/rateLimit";

const LIMITE_EXECUCOES_POR_MINUTO = 10;

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  if (user.role !== "aluno") {
    return NextResponse.json({ error: "Só alunos podem executar código aqui." }, { status: 403 });
  }

  if (!permitir(`executar:${user.id}`, LIMITE_EXECUCOES_POR_MINUTO, 60_000)) {
    return NextResponse.json(
      { error: "Você executou código demais em pouco tempo. Espere um minuto e tente de novo." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const codigo = typeof body?.codigo === "string" ? body.codigo : "";
  if (!codigo.trim()) {
    return NextResponse.json({ error: "Escreva algum código antes de executar." }, { status: 400 });
  }

  const resultado = await executarJava(codigo);
  return NextResponse.json(resultado);
}
