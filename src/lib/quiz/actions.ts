"use server";

import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Pergunta sem o gabarito — é só isso que pode chegar ao navegador do aluno.
export interface PerguntaParaAluno {
  id: string;
  tipo: "multipla_escolha";
  enunciado: string;
  opcoes: { id: string; texto: string }[];
}

export interface QuizParaAluno {
  id: string;
  titulo: string;
  perguntas: PerguntaParaAluno[];
  notaMinimaAprovacao: number;
  tentativasAnteriores: { nota: number; concluida_em: string }[];
}

export async function getQuizParaAula(aulaId: string): Promise<QuizParaAluno | null> {
  const user = await requireAluno();
  const supabase = await createClient();

  // Confirma que o aluno tem acesso a essa aula (publicada + turma da trilha)
  // antes de usar o cliente admin para buscar o quiz (que tem o gabarito).
  const { data: aula } = await supabase
    .from("aulas")
    .select("id")
    .eq("id", aulaId)
    .maybeSingle();
  if (!aula) return null;

  const admin = createAdminClient();
  const { data: quiz } = await admin
    .from("quizzes")
    .select("id, titulo, perguntas, nota_minima_aprovacao")
    .eq("aula_id", aulaId)
    .maybeSingle();
  if (!quiz) return null;

  const { data: tentativas } = await supabase
    .from("quiz_tentativas")
    .select("nota, concluida_em")
    .eq("quiz_id", quiz.id)
    .eq("aluno_id", user.id)
    .order("concluida_em", { ascending: false });

  return {
    id: quiz.id,
    titulo: quiz.titulo,
    notaMinimaAprovacao: quiz.nota_minima_aprovacao,
    perguntas: quiz.perguntas.map((p) => ({
      id: p.id,
      tipo: p.tipo,
      enunciado: p.enunciado,
      opcoes: p.opcoes,
    })),
    tentativasAnteriores: tentativas ?? [],
  };
}

export type SubmeterQuizState =
  | { error: string }
  | { nota: number; acertos: number; total: number; aprovado: boolean }
  | undefined;

export async function submeterQuiz(
  aulaId: string,
  _prevState: SubmeterQuizState,
  formData: FormData
): Promise<SubmeterQuizState> {
  const user = await requireAluno();
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: quiz } = await admin
    .from("quizzes")
    .select("id, perguntas, nota_minima_aprovacao")
    .eq("aula_id", aulaId)
    .maybeSingle();

  if (!quiz) return { error: "Quiz não encontrado." };

  const respostas: Record<string, string> = {};
  let acertos = 0;
  for (const pergunta of quiz.perguntas) {
    const resposta = String(formData.get(pergunta.id) ?? "");
    respostas[pergunta.id] = resposta;
    if (resposta === pergunta.resposta_correta) acertos++;
  }

  const total = quiz.perguntas.length;
  const nota = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const aprovado = nota >= quiz.nota_minima_aprovacao;

  const { count } = await supabase
    .from("quiz_tentativas")
    .select("id", { count: "exact", head: true })
    .eq("quiz_id", quiz.id)
    .eq("aluno_id", user.id);

  await supabase.from("quiz_tentativas").insert({
    quiz_id: quiz.id,
    aluno_id: user.id,
    respostas,
    nota,
    acertos,
    total,
    tentativa_numero: (count ?? 0) + 1,
  });

  if (aprovado) {
    const { data: existente } = await supabase
      .from("progresso_aulas")
      .select("material_visualizado, exercicio_completo")
      .eq("aluno_id", user.id)
      .eq("aula_id", aulaId)
      .maybeSingle();

    await supabase.from("progresso_aulas").upsert(
      {
        aluno_id: user.id,
        aula_id: aulaId,
        quiz_completo: true,
        material_visualizado: existente?.material_visualizado ?? false,
        exercicio_completo: existente?.exercicio_completo ?? false,
        status:
          (existente?.material_visualizado ?? false) || (existente?.exercicio_completo ?? false)
            ? "concluida"
            : "em_andamento",
        concluida_em: new Date().toISOString(),
      },
      { onConflict: "aluno_id,aula_id" }
    );
  }

  return { nota, acertos, total, aprovado };
}
