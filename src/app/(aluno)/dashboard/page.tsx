import Link from "next/link";
import { Check, Play, Trophy } from "lucide-react";
import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TRILHA_STYLE } from "@/components/ui/trilhaStyle";
import type { TrilhaSlug } from "@/lib/types/database.types";
import { calcularPontos, calcularRank } from "@/lib/gamificacao/ranks";
import { STATUS_AULA, normalizarStatus } from "@/lib/progress/status";

interface AulaDoDashboard {
  id: string;
  titulo: string;
  numero_sequencial: number;
  moduloTitulo: string;
  status: string;
}

interface TurmaDoDashboard {
  id: string;
  nome: string;
  trilhaSlug: TrilhaSlug;
  aulas: AulaDoDashboard[];
}

/**
 * Agrupa as aulas por módulo preservando a ordem que veio do banco. Não usa
 * Map porque a ordem de exibição é a ordem da lista, e um módulo nunca
 * reaparece depois de terminado.
 */
function agruparPorModulo(aulas: AulaDoDashboard[]) {
  const grupos: { titulo: string; aulas: AulaDoDashboard[] }[] = [];
  for (const aula of aulas) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.titulo === aula.moduloTitulo) ultimo.aulas.push(aula);
    else grupos.push({ titulo: aula.moduloTitulo, aulas: [aula] });
  }
  return grupos;
}

/** A primeira aula não concluída — é para onde o botão "continuar" aponta. */
function proximaAula(turmas: TurmaDoDashboard[]) {
  for (const turma of turmas) {
    const aula = turma.aulas.find((a) => a.status !== "concluida");
    if (aula) return { turma, aula };
  }
  return null;
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
      <Card className="px-5 py-8 text-center">
        <p className="text-sm text-slate-600">
          Você ainda não foi adicionado a nenhuma turma. Fale com a professora.
        </p>
      </Card>
    );
  }

  const turmasPorId = new Map<string, TurmaDoDashboard>();
  for (const linha of linhas) {
    let turma = turmasPorId.get(linha.turma_id);
    if (!turma) {
      turma = {
        id: linha.turma_id,
        nome: linha.turma_nome,
        trilhaSlug: linha.trilha_slug,
        aulas: [],
      };
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
  const continuar = proximaAula(turmas);
  const primeiroNome = (user.nome_exibicao ?? user.full_name).split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Faixa de nível: o painel de recompensa fica no topo, antes das aulas. */}
      <section className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-4 shadow-[4px_4px_0_0_#0f172a] sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 shrink-0 text-bd-500" />
            <span className="font-heading text-lg font-bold text-white">{rank.atual.nome}</span>
          </div>
          <span className="font-heading text-2xl font-bold text-bd-500">{pontosTotais} pts</span>
        </div>

        <p className="mt-0.5 text-xs text-slate-400">{rank.atual.descricao}</p>

        {rank.proximo ? (
          <>
            <div
              className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-700"
              role="progressbar"
              aria-valuenow={rank.percentual}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso até o nível ${rank.proximo.nome}`}
            >
              <div
                className="h-full rounded-full bg-bd-500 transition-all duration-500"
                style={{ width: `${rank.percentual}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Faltam <strong className="text-white">{rank.faltam} pts</strong> para virar{" "}
              <strong className="text-white">{rank.proximo.nome}</strong>
            </p>
          </>
        ) : (
          <p className="mt-3 text-xs font-semibold text-bd-500">
            Nível máximo. Não tem mais para onde subir.
          </p>
        )}
      </section>

      {/* Atalho para retomar: evita o aluno ter que caçar onde parou. */}
      {continuar && (
        <Link href={`/aula/${continuar.aula.id}`} className="block">
          <Card className="flex items-center gap-3 px-4 py-3.5 transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-slate-900 bg-brand-500 text-white">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {continuar.aula.status === "nao_iniciada"
                  ? "Próxima aula"
                  : `Continue, ${primeiroNome}`}
              </span>
              <span className="block truncate font-heading text-sm font-bold text-slate-900">
                {continuar.aula.titulo}
              </span>
            </span>
          </Card>
        </Link>
      )}

      {turmas.map((turma) => {
        const estilo = TRILHA_STYLE[turma.trilhaSlug];
        const concluidas = turma.aulas.filter((a) => a.status === "concluida").length;
        const totalAulas = turma.aulas.length;
        const percentual = totalAulas > 0 ? Math.round((concluidas / totalAulas) * 100) : 0;
        const completa = totalAulas > 0 && concluidas === totalAulas;

        return (
          <section key={turma.id}>
            <div
              className={`mb-4 rounded-2xl border-2 border-slate-900 px-4 py-4 sm:px-5 ${estilo.solidBg}`}
            >
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${estilo.textOnSolid} opacity-80`}
                  >
                    {estilo.nome}
                  </p>
                  <h1
                    className={`font-heading text-xl font-bold sm:text-2xl ${estilo.textOnSolid}`}
                  >
                    {turma.nome}
                  </h1>
                </div>
                <span className={`font-heading text-sm font-bold ${estilo.textOnSolid}`}>
                  {concluidas}/{totalAulas} aulas · {calcularPontos(turma.aulas)} pts
                </span>
              </div>
              <div
                className="mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-slate-900 bg-white/40"
                role="progressbar"
                aria-valuenow={percentual}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Aulas concluídas em ${turma.nome}`}
              >
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${percentual}%` }}
                />
              </div>
              {completa && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-3 py-2 text-sm font-bold text-slate-900">
                  <Trophy className="h-4 w-4 shrink-0 text-bd-600" />
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
                  {grupo.aulas.map((aula, indiceNoModulo) => (
                    <AulaCard
                      key={aula.id}
                      aula={aula}
                      numero={indiceNoModulo + 1}
                      estilo={estilo}
                    />
                  ))}
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

/**
 * Cartão de uma aula na lista.
 *
 * O número da aula vira um marcador circular colorido pelo estado, e o estado
 * também aparece escrito à direita. Lido de cima a baixo, o conjunto forma
 * uma trilha em que dá para ver de longe até onde a pessoa chegou.
 *
 * Todas as aulas mostram o estado, inclusive "Não iniciada". Antes só as
 * aulas em andamento tinham etiqueta, e as outras ficavam sem marcador
 * nenhum — o que parecia falha da tela, não ausência de progresso.
 */
function AulaCard({
  aula,
  numero,
  estilo,
}: {
  aula: AulaDoDashboard;
  numero: number;
  estilo: (typeof TRILHA_STYLE)[TrilhaSlug];
}) {
  const status = normalizarStatus(aula.status);
  const config = STATUS_AULA[status];
  const concluida = status === "concluida";

  return (
    <Link href={`/aula/${aula.id}`} className="block">
      <Card
        className={`border-l-[6px] ${estilo.border} transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]`}
        style={{ backgroundColor: estilo.tintVar }}
      >
        <div className="flex items-center gap-3 px-3 py-3 sm:px-4">
          <span
            aria-hidden
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-slate-900 font-heading text-sm font-bold ${config.marcador}`}
          >
            {concluida ? <Check className="h-4 w-4" strokeWidth={3} /> : numero}
          </span>

          {/* Título e etiqueta na mesma linha quando cabe; no celular a
              etiqueta desce sozinha. Um elemento só, não duas cópias
              escondidas por CSS — leitor de tela leria o estado duas vezes. */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <p className="min-w-0 text-sm font-semibold text-slate-900">
              <span className="text-slate-500">Aula {numero} · </span>
              {aula.titulo}
            </p>
            <Badge variant={config.badge} className="shrink-0">
              {config.label}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
