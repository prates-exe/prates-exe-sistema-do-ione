import Link from "next/link";
import { Star, Trophy } from "lucide-react";
import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TRILHA_STYLE } from "@/components/ui/trilhaStyle";
import type { TrilhaSlug } from "@/lib/types/database.types";
import { calcularPontos, calcularRank } from "@/lib/gamificacao/ranks";

const STATUS_CONFIG: Record<string, { label: string; variant: "neutral" | "info" | "success" }> = {
  nao_iniciada: { label: "Não iniciada", variant: "neutral" },
  em_andamento: { label: "Em andamento", variant: "info" },
  concluida: { label: "Concluída", variant: "success" },
};

interface AulaDoDashboard {
  id: string;
  titulo: string;
  numero_sequencial: number;
  moduloTitulo: string;
  status: string;
}

function agruparPorModulo(aulas: AulaDoDashboard[]): { titulo: string; aulas: AulaDoDashboard[] }[] {
  const grupos: { titulo: string; aulas: AulaDoDashboard[] }[] = [];
  for (const aula of aulas) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.titulo === aula.moduloTitulo) {
      ultimo.aulas.push(aula);
    } else {
      grupos.push({ titulo: aula.moduloTitulo, aulas: [aula] });
    }
  }
  return grupos;
}

interface TurmaDoDashboard {
  id: string;
  nome: string;
  trilhaSlug: TrilhaSlug;
  aulas: AulaDoDashboard[];
}

export default async function DashboardPage() {
  const user = await requireAluno();
  const supabase = await createClient();

  // Uma única chamada ao banco (função aluno_dashboard) no lugar de até 4
  // consultas em sequência — cada uma delas soma o tempo de ida e volta até
  // o Supabase, e a diferença é bem perceptível na hora de trocar de página.
  const { data: linhas } = await supabase.rpc("aluno_dashboard", { p_aluno_id: user.id });

  if (!linhas || linhas.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Você ainda não foi adicionado a nenhuma turma. Fale com a professora.
      </p>
    );
  }

  const turmasPorId = new Map<string, TurmaDoDashboard>();
  for (const linha of linhas) {
    let turma = turmasPorId.get(linha.turma_id);
    if (!turma) {
      turma = { id: linha.turma_id, nome: linha.turma_nome, trilhaSlug: linha.trilha_slug, aulas: [] };
      turmasPorId.set(linha.turma_id, turma);
    }
    if (linha.aula_id) {
      turma.aulas.push({
        id: linha.aula_id,
        titulo: linha.aula_titulo!,
        numero_sequencial: linha.numero_sequencial!,
        moduloTitulo: linha.modulo_titulo ?? "Aulas",
        status: linha.status,
      });
    }
  }

  const turmas = [...turmasPorId.values()];
  const pontosTotais = turmas.reduce((total, t) => total + calcularPontos(t.aulas), 0);
  const rank = calcularRank(pontosTotais);
  const faltamProxRank = rank.proximo ? rank.proximo.minimo - pontosTotais : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-bd-500" />
            <span className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              {rank.atual.nome}
            </span>
          </div>
          <span className="font-heading text-2xl font-bold text-bd-500">{pontosTotais} pts</span>
        </div>
        {rank.proximo && (
          <p className="mt-1 text-xs text-slate-400">
            Faltam {faltamProxRank} pts para virar <strong>{rank.proximo.nome}</strong>
          </p>
        )}
      </div>

      {turmas.map((turma) => {
        const estilo = TRILHA_STYLE[turma.trilhaSlug];
        const concluidas = turma.aulas.filter((a) => a.status === "concluida").length;
        const totalAulas = turma.aulas.length;
        const percentual = totalAulas > 0 ? Math.round((concluidas / totalAulas) * 100) : 0;
        const completa = totalAulas > 0 && concluidas === totalAulas;

        return (
          <section key={turma.id}>
            <div className={`mb-4 rounded-2xl border-2 border-slate-900 px-5 py-4 ${estilo.solidBg}`}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${estilo.textOnSolid} opacity-80`}>
                    {estilo.nome}
                  </p>
                  <h1 className={`font-heading text-2xl font-bold ${estilo.textOnSolid}`}>
                    {turma.nome}
                  </h1>
                </div>
                <span className={`font-heading text-sm font-bold ${estilo.textOnSolid}`}>
                  {concluidas}/{totalAulas} aulas · {calcularPontos(turma.aulas)} pts
                </span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-slate-900 bg-white/40">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${percentual}%` }}
                />
              </div>
              {completa && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-3 py-2 text-sm font-bold text-slate-900">
                  <Trophy className="h-4 w-4 text-bd-600" />
                  Você completou {estilo.nome} até aqui!
                </div>
              )}
            </div>
            <div className="space-y-6">
              {agruparPorModulo(turma.aulas).map((grupo) => (
                <div key={`${turma.id}-${grupo.titulo}`} className="space-y-2">
                  <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500">
                    {grupo.titulo}
                  </h2>
                  {grupo.aulas.map((aula, indiceNoModulo) => {
                    const status = STATUS_CONFIG[aula.status] ?? STATUS_CONFIG.nao_iniciada;
                    return (
                      <Link key={aula.id} href={`/aula/${aula.id}`} className="block">
                        <Card
                          className={`border-l-[6px] ${estilo.border} transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]`}
                          style={{ backgroundColor: estilo.tintVar }}
                        >
                          <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                Aula {indiceNoModulo + 1} · {aula.titulo}
                              </p>
                            </div>
                            <Badge variant={status.variant}>
                              {aula.status === "concluida" && <Star className="h-3 w-3" />}
                              {status.label}
                            </Badge>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ))}
              {turma.aulas.length === 0 && (
                <Card className="px-4 py-6 text-center text-sm text-slate-500">
                  Nenhuma aula publicada ainda.
                </Card>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
