"use client";

import { useActionState } from "react";
import { submeterQuiz, type QuizParaAluno } from "@/lib/quiz/actions";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function QuizPanel({ aulaId, quiz }: { aulaId: string; quiz: QuizParaAluno }) {
  const [state, formAction, pending] = useActionState(
    submeterQuiz.bind(null, aulaId),
    undefined
  );

  return (
    <Card>
      <CardHeader>
        <h2 className="font-heading text-base font-bold text-slate-900">{quiz.titulo}</h2>
      </CardHeader>
      <CardBody>
        <form action={formAction} className="space-y-6">
          {quiz.perguntas.map((pergunta, i) => (
            <fieldset key={pergunta.id}>
              <legend className="text-sm font-medium text-slate-800">
                {i + 1}. {pergunta.enunciado}
              </legend>
              <div className="mt-2 space-y-1.5">
                {pergunta.opcoes.map((opcao) => (
                  <label
                    key={opcao.id}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      name={pergunta.id}
                      value={opcao.id}
                      required
                      className="accent-brand-600"
                    />
                    {opcao.texto}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <Button type="submit" disabled={pending}>
            {pending ? "Enviando…" : "Enviar respostas"}
          </Button>

          {state && "error" in state && <p className="text-sm text-red-600">{state.error}</p>}

          {state && "nota" in state && (
            <p
              className={`rounded-xl p-3 text-sm ${
                state.aprovado
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border border-amber-200 bg-amber-50 text-amber-900"
              }`}
            >
              Nota: {state.nota} ({state.acertos}/{state.total} corretas) —{" "}
              {state.aprovado ? "aprovado." : "tente de novo depois de rever o material."}
            </p>
          )}
        </form>

        {quiz.tentativasAnteriores.length > 0 && (
          <p className="mt-4 text-xs text-slate-400">
            Última tentativa: nota {quiz.tentativasAnteriores[0].nota}
          </p>
        )}
      </CardBody>
    </Card>
  );
}
