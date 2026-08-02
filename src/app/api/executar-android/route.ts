import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { executarJava } from "@/lib/execucao/client";
import { montarCodigoAndroid, type ViewDescriptor, type EventoClique } from "@/lib/android/stub";
import { permitir } from "@/lib/rateLimit";

const LIMITE_EXECUCOES_POR_MINUTO = 10;
const ESTADO_PREFIXO = "__ESTADO__";

function extrairEstado(stdout: string): { estados: Record<string, string>; resto: string } {
  const linhas = stdout.split("\n");
  const indiceEstado = linhas.findIndex((l) => l.startsWith(ESTADO_PREFIXO));
  if (indiceEstado === -1) return { estados: {}, resto: stdout };

  const linhaEstado = linhas[indiceEstado].slice(ESTADO_PREFIXO.length);
  const resto = linhas.filter((_, i) => i !== indiceEstado).join("\n");

  try {
    const estados = JSON.parse(linhaEstado);
    if (estados && typeof estados === "object") return { estados, resto };
  } catch {
    // ignora — mostrado como stdout normal
  }
  return { estados: {}, resto: stdout };
}

function validarViews(input: unknown): ViewDescriptor[] | null {
  if (!Array.isArray(input)) return null;
  const tiposValidos = new Set(["TextView", "EditText", "Button"]);
  const views: ViewDescriptor[] = [];
  for (const item of input) {
    if (
      typeof item?.id !== "string" ||
      typeof item?.texto !== "string" ||
      !tiposValidos.has(item?.tipo)
    ) {
      return null;
    }
    views.push({ id: item.id, tipo: item.tipo, texto: item.texto });
  }
  return views;
}

function validarEvento(input: unknown): EventoClique | null | undefined {
  if (input === null || input === undefined) return null;
  if (typeof (input as { viewId?: unknown }).viewId !== "string") return undefined;
  if (typeof (input as { metodo?: unknown }).metodo !== "string") return undefined;
  const { viewId, metodo } = input as { viewId: string; metodo: string };
  return { viewId, metodo };
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }
  if (user.role !== "aluno") {
    return NextResponse.json({ error: "Só alunos podem executar código aqui." }, { status: 403 });
  }

  if (!permitir(`executar-android:${user.id}`, LIMITE_EXECUCOES_POR_MINUTO, 60_000)) {
    return NextResponse.json(
      { error: "Você executou código demais em pouco tempo. Espere um minuto e tente de novo." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const activityJava = typeof body?.activityJava === "string" ? body.activityJava : "";
  const views = validarViews(body?.views);
  const evento = validarEvento(body?.evento);

  if (!activityJava.trim() || !views) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }
  if (evento === undefined) {
    return NextResponse.json({ error: "Evento inválido." }, { status: 400 });
  }

  const codigo = montarCodigoAndroid({ views, activityJava, evento });
  const resultado = await executarJava(codigo);
  const { estados, resto } = extrairEstado(resultado.stdout);

  return NextResponse.json({
    estados,
    stdout: resto,
    stderr: resultado.stderr,
    exitCode: resultado.exitCode,
    erroServico: resultado.erroServico,
  });
}
