/**
 * Pontuação e níveis.
 *
 * Os níveis usam as unidades de armazenamento (bit, byte, kB, MB, GB, TB)
 * em vez dos "Iniciante / Aprendiz / Expert" de sempre. Duas razões: são
 * termos que os alunos vão encontrar na matéria de qualquer jeito, então o
 * jogo ensina de lambuja; e a escada é óbvia — ninguém precisa explicar que
 * megabyte é mais que kilobyte.
 *
 * Os limites sobem de forma acelerada, mas não tanto quanto as unidades de
 * verdade (que multiplicam por 1024). O que vale é a sensação de que subir
 * de nível fica mais raro conforme o curso avança.
 */

export const PONTOS_POR_CONCLUIDA = 10;
export const PONTOS_POR_ANDAMENTO = 2;

export const RANKS = [
  { minimo: 0, nome: "Bit", descricao: "Todo mundo começa com um bit" },
  { minimo: 30, nome: "Byte", descricao: "Oito bits — já dá para escrever uma letra" },
  { minimo: 80, nome: "Kilobyte", descricao: "Cabe um programa pequeno inteiro" },
  { minimo: 150, nome: "Megabyte", descricao: "Já é tamanho de app de celular" },
  { minimo: 250, nome: "Gigabyte", descricao: "Tamanho de banco de dados de verdade" },
  { minimo: 400, nome: "Terabyte", descricao: "Você terminou o curso" },
] as const;

export type Rank = (typeof RANKS)[number];

export interface ProgressoRank {
  atual: Rank;
  proximo: Rank | null;
  /** Quantos pontos faltam para o próximo nível (0 quando já é o último). */
  faltam: number;
  /** Quanto do caminho até o próximo nível já foi andado, de 0 a 100. */
  percentual: number;
}

export function calcularRank(pontos: number): ProgressoRank {
  let atual: Rank = RANKS[0];
  let proximo: Rank | null = null;

  for (const rank of RANKS) {
    if (pontos >= rank.minimo) {
      atual = rank;
    } else {
      proximo = rank;
      break;
    }
  }

  if (!proximo) {
    // Último nível: a barra fica cheia em vez de dividir por zero.
    return { atual, proximo: null, faltam: 0, percentual: 100 };
  }

  const faixa = proximo.minimo - atual.minimo;
  const andado = pontos - atual.minimo;
  return {
    atual,
    proximo,
    faltam: proximo.minimo - pontos,
    percentual: Math.round((andado / faixa) * 100),
  };
}

interface AulaComStatus {
  status: string;
}

/**
 * Só pontua quem entregou alguma coisa. Aula apenas aberta ("iniciada") vale
 * zero de propósito: pontuar a leitura transformaria rolar a página em uma
 * forma de subir de nível sem fazer o trabalho.
 */
export function calcularPontos(aulas: AulaComStatus[]): number {
  return aulas.reduce((total, aula) => {
    if (aula.status === "concluida") return total + PONTOS_POR_CONCLUIDA;
    if (aula.status === "em_andamento") return total + PONTOS_POR_ANDAMENTO;
    return total;
  }, 0);
}
