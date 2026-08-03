"use client";

import { useActionState } from "react";
import { submeterQuiz, type QuizParaAluno } from "@/lib/quiz/actions";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/**
 * Formulário do quiz da aula.
 *
 * Duas coisas importam aqui, e as duas vieram de problema real em sala:
 *
 * 1. O gabarito nunca chega ao navegador. `quiz` é montado no servidor por
 *    `getQuizParaAula`, que remove o campo `resposta_correta` de cada
 *    pergunta. A correção acontece em `submeterQuiz` (Server Action).
 *
 * 2. O aluno que sai da aula e volta precisa ver onde parou. Por isso o
 *    componente recebe `respostasAnteriores` (o último envio) e remarca as
 *    alternativas, além de mostrar tentativas e melhor nota no cabeçalho.
 *    Antes disso a página reabria em branco e parecia que o trabalho tinha
 *    sumido.
 */
export function QuizPanel({ aulaId, quiz }: { aulaId: string; quiz: QuizParaAluno }) {
  const [state, formAction, pending] = useActionState(submeterQuiz.bind(null, aulaId), undefined);

  // Depois de enviar, vale o resultado que acabou de voltar do servidor;
  // enquanto isso, vale o histórico carregado com a página.
  const notaAtual = state && "nota" in state ? state.nota : quiz.melhorNota;
  const aprovado = state && "nota" in state ? state.aprovado : quiz.aprovado;
  const jaTentou = quiz.totalTentativas > 0 || (state && "nota" in state);

  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-base font-bold text-slate-900">{quiz.titulo}</h2>
        {jaTentou && (
          <span
            className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
              aprovado
                ? "border-emerald-700 bg-emerald-100 text-emerald-900"
                : "border-amber-700 bg-amber-100 text-amber-900"
            }`}
          >
            {aprovado ? "Quiz aprovado" : "Ainda não aprovado"} · melhor nota {notaAtual ?? 0}
          </span>
        )}
      </CardHeader>
      <CardBody>
        {jaTentou && (
          <p className="mb-4 text-xs text-slate-500">
            {quiz.totalTentativas === 0
              ? "Primeira tentativa registrada agora."
              : `${quiz.totalTentativas} ${
                  quiz.totalTentativas === 1 ? "tentativa enviada" : "tentativas enviadas"
                }. As alternativas abaixo já vêm marcadas com o que você respondeu da última vez — é
                  só ajustar o que quiser e enviar de novo.`}{" "}
            Nota mínima para aprovar: {quiz.notaMinimaAprovacao}.
          </p>
        )}

        <form action={formAction} className="space-y-6">
          {quiz.perguntas.map((pergunta, i) => {
            const respostaAnterior = quiz.respostasAnteriores[pergunta.id];
            return (
              <fieldset key={pergunta.id}>
                <legend className="text-sm font-medium text-slate-800">
                  {i + 1}. {pergunta.enunciado}
                </legend>
                <div className="mt-2 space-y-1.5">
                  {pergunta.opcoes.map((opcao) => (
                    <label
                      key={opcao.id}
                      className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name={pergunta.id}
                        value={opcao.id}
                        required
                        defaultChecked={respostaAnterior === opcao.id}
                        className="mt-0.5 accent-brand-600"
                      />
                      <span>{opcao.texto}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}

          <Button type="submit" disabled={pending}>
            {pending ? "Enviando…" : jaTentou ? "Enviar de novo" : "Enviar respostas"}
          </Button>

          {state && "error" in state && <p className="text-sm text-red-600">{state.error}</p>}

          {state && "nota" in state && (
            <p
              className={`rounded-xl border-2 p-3 text-sm ${
                state.aprovado
                  ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                  : "border-amber-700 bg-amber-50 text-amber-900"
              }`}
            >
              Nota: {state.nota} ({state.acertos}/{state.total} corretas) —{" "}
              {state.aprovado
                ? "quiz aprovado. Falta só terminar o desafio para concluir a aula."
                : "revise o material e tente de novo, quantas vezes precisar."}
            </p>
          )}
        </form>
      </CardBody>
    </Card>
  );
}
