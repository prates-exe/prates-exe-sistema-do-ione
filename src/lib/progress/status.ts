import type { StatusProgresso } from "@/lib/types/database.types";

/**
 * Como cada estado de progresso é apresentado ao aluno.
 *
 * Fica em um arquivo só porque a lista de aulas e o cabeçalho da aula
 * mostravam rótulos diferentes para o mesmo estado. Mesmo motivo que levou a
 * regra de conclusão para dentro do banco (migração 0014): informação
 * duplicada acaba divergindo.
 *
 * Os quatro estados são calculados pelo gatilho `calcular_status_progresso`.
 * Resumindo: `iniciada` é "abriu e leu"; `em_andamento` é "entregou o quiz ou
 * o desafio, falta o outro". A separação existe porque antes as duas coisas
 * apareciam iguais na lista, e não dava para saber quem tinha só espiado.
 */
export const STATUS_AULA: Record<
  StatusProgresso,
  {
    label: string;
    badge: "neutral" | "info" | "success" | "warning";
    /** Cor do marcador circular na lista de aulas. */
    marcador: string;
  }
> = {
  nao_iniciada: {
    label: "Não iniciada",
    badge: "neutral",
    marcador: "bg-white text-slate-400",
  },
  iniciada: {
    label: "Iniciada",
    badge: "warning",
    marcador: "bg-amber-300 text-amber-950",
  },
  em_andamento: {
    label: "Em andamento",
    badge: "info",
    marcador: "bg-brand-500 text-white",
  },
  concluida: {
    label: "Concluída",
    badge: "success",
    marcador: "bg-emerald-500 text-white",
  },
};

/**
 * Converte o texto vindo do banco em um estado conhecido. Protege a interface
 * de uma linha antiga que ainda não passou pelo gatilho.
 */
export function normalizarStatus(status: string | null | undefined): StatusProgresso {
  return status && status in STATUS_AULA ? (status as StatusProgresso) : "nao_iniciada";
}
