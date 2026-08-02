import { RANKS } from "@/lib/gamificacao/ranks";

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  desbloqueada: boolean;
}

export function montarConquistas(params: {
  pontosTotais: number;
  totalAulasConcluidas: number;
  trilhas: { slug: string; nome: string; completa: boolean }[];
}): Conquista[] {
  const conquistas: Conquista[] = RANKS.map((rank) => ({
    id: `rank-${rank.nome}`,
    titulo: rank.nome,
    descricao: rank.minimo === 0 ? "Comece sua jornada" : `Alcance ${rank.minimo} pontos`,
    desbloqueada: params.pontosTotais >= rank.minimo,
  }));

  conquistas.push({
    id: "primeira-aula",
    titulo: "Primeiros passos",
    descricao: "Conclua sua primeira aula",
    desbloqueada: params.totalAulasConcluidas >= 1,
  });

  for (const trilha of params.trilhas) {
    conquistas.push({
      id: `trilha-${trilha.slug}`,
      titulo: `Mestre em ${trilha.nome}`,
      descricao: `Conclua todas as aulas publicadas de ${trilha.nome}`,
      desbloqueada: trilha.completa,
    });
  }

  return conquistas;
}
