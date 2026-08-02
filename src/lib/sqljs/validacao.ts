import type { Database } from "sql.js";
import type { CriterioValidacao } from "@/lib/types/database.types";

export interface ResultadoCriterio {
  descricao: string;
  atendido: boolean;
  dica?: string;
}

export function validarCriteriosSql(
  db: Database,
  criterios: CriterioValidacao[]
): ResultadoCriterio[] {
  return criterios.map((criterio) => {
    if (!criterio.sql) return { descricao: criterio.descricao, atendido: false, dica: criterio.dica };
    try {
      const resultado = db.exec(criterio.sql);
      const valor = resultado[0]?.values?.[0]?.[0];
      const atendido = valor === 1 || valor === "1";
      return { descricao: criterio.descricao, atendido, dica: criterio.dica };
    } catch {
      return { descricao: criterio.descricao, atendido: false, dica: criterio.dica };
    }
  });
}

export function validarCriteriosSaida(
  stdout: string,
  criterios: CriterioValidacao[]
): ResultadoCriterio[] {
  return criterios.map((criterio) => ({
    descricao: criterio.descricao,
    atendido: criterio.contem ? stdout.includes(criterio.contem) : false,
    dica: criterio.dica,
  }));
}
