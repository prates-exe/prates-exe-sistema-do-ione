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
  /** Quantas vezes o aluno já enviou este quiz. */
  totalTentativas: number;
  /** Maior nota já obtida, para o aluno ver de onde partiu. */
  melhorNota: number | null;
  /** Se a melhor nota atingiu a nota mínima. */
  aprovado: boolean;
  /**
   * As respostas do último envio, no formato { idDaPergunta: idDaOpcao }.
   * Servem para remarcar as alternativas quando o aluno volta à aula — sem
   * isso ele reabria a página com o formulário em branco, sem saber o que
   * tinha respondido.
   */
  respostasAnteriores: Record<string, string>;
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
    .select("nota, respostas, concluida_em")
    .eq("quiz_id", quiz.id)
    .eq("aluno_id", user.id)
    .order("concluida_em", { ascending: false });

  const historico = tentativas ?? [];
  const melhorNota = historico.length > 0 ? Math.max(...historico.map((t) => t.nota)) : null;

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
    totalTentativas: historico.length,
    melhorNota,
    aprovado: melhorNota !== null && melhorNota >= quiz.nota_minima_aprovacao,
    // A primeira do array é a mais recente (a consulta ordena decrescente).
    respostasAnteriores: historico[0]?.respostas ?? {},
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
    // Marca apenas o quiz. Quem decide se a aula está concluída é o gatilho
    // calcular_status_progresso no banco, que exige quiz E exercício — a
    // regra fica em um lugar só, e não espalhada por cada tela.
    await supabase.from("progresso_aulas").upsert(
      { aluno_id: user.id, aula_id: aulaId, quiz_completo: true },
      { onConflict: "aluno_id,aula_id" }
    );
  }

  return { nota, acertos, total, aprovado };
}
