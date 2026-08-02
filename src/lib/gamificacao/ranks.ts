export const PONTOS_POR_CONCLUIDA = 10;
export const PONTOS_POR_ANDAMENTO = 2;

export const RANKS = [
  { minimo: 0, nome: "Iniciante" },
  { minimo: 30, nome: "Aprendiz" },
  { minimo: 80, nome: "Estudioso" },
  { minimo: 150, nome: "Expert" },
  { minimo: 250, nome: "Mestre" },
] as const;

export type Rank = (typeof RANKS)[number];

export function calcularRank(pontos: number): { atual: Rank; proximo: Rank | null } {
  let atual: Rank = RANKS[0];
  let proximo: Rank | null = null;
  for (let i = 0; i < RANKS.length; i++) {
    if (pontos >= RANKS[i].minimo) atual = RANKS[i];
    else {
      proximo = RANKS[i];
      break;
    }
  }
  return { atual, proximo };
}

interface AulaComStatus {
  status: string;
}

export function calcularPontos(aulas: AulaComStatus[]): number {
  return aulas.reduce((total, aula) => {
    if (aula.status === "concluida") return total + PONTOS_POR_CONCLUIDA;
    if (aula.status === "em_andamento") return total + PONTOS_POR_ANDAMENTO;
    return total;
  }, 0);
}
