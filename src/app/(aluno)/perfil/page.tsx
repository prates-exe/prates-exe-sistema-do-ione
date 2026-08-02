import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PerfilForm } from "@/components/perfil/PerfilForm";
import { ConquistasPanel } from "@/components/perfil/ConquistasPanel";
import { AVATAR_PADRAO, getAvatar } from "@/lib/perfil/avatares";
import { calcularPontos, calcularRank } from "@/lib/gamificacao/ranks";
import { montarConquistas } from "@/lib/perfil/conquistas";
import { TRILHA_STYLE } from "@/components/ui/trilhaStyle";
import type { TrilhaSlug } from "@/lib/types/database.types";

export default async function PerfilPage() {
  const user = await requireAluno();
  const supabase = await createClient();

  const [{ data: authUser }, { data: linhas }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.rpc("aluno_dashboard", { p_aluno_id: user.id }),
  ]);

  const username = authUser.user?.email?.split("@")[0] ?? "";

  const porTurma = new Map<string, { slug: TrilhaSlug; aulas: { status: string }[] }>();
  for (const linha of linhas ?? []) {
    let turma = porTurma.get(linha.turma_id);
    if (!turma) {
      turma = { slug: linha.trilha_slug, aulas: [] };
      porTurma.set(linha.turma_id, turma);
    }
    if (linha.aula_id) turma.aulas.push({ status: linha.status });
  }

  const turmas = [...porTurma.values()];
  const pontosTotais = turmas.reduce((total, t) => total + calcularPontos(t.aulas), 0);
  const totalAulasConcluidas = turmas.reduce(
    (total, t) => total + t.aulas.filter((a) => a.status === "concluida").length,
    0
  );

  const trilhasUnicas = new Map<TrilhaSlug, { concluidas: number; total: number }>();
  for (const turma of turmas) {
    const atual = trilhasUnicas.get(turma.slug) ?? { concluidas: 0, total: 0 };
    atual.concluidas += turma.aulas.filter((a) => a.status === "concluida").length;
    atual.total += turma.aulas.length;
    trilhasUnicas.set(turma.slug, atual);
  }

  const conquistas = montarConquistas({
    pontosTotais,
    totalAulasConcluidas,
    trilhas: [...trilhasUnicas.entries()].map(([slug, dados]) => ({
      slug,
      nome: TRILHA_STYLE[slug].nome,
      completa: dados.total > 0 && dados.concluidas === dados.total,
    })),
  });

  const rank = calcularRank(pontosTotais);
  const avatarAtual = getAvatar(user.avatar_id);

  return (
    <div className="space-y-6">
      <PageHeader title="Meu perfil" subtitle="Personalize como você aparece no site." />

      <Card>
        <CardHeader className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 ${avatarAtual.bg} ${avatarAtual.fg}`}
          >
            <avatarAtual.Icon className="h-7 w-7" />
          </div>
          <div>
            <p className="font-heading text-base font-bold text-slate-900">
              {user.nome_exibicao || user.full_name}
            </p>
            <p className="text-xs text-slate-400">
              Usuário de login: {username} (não pode ser alterado)
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <PerfilForm
            nomeExibicaoInicial={user.nome_exibicao ?? user.full_name}
            avatarIdInicial={user.avatar_id ?? AVATAR_PADRAO}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-heading text-base font-bold text-slate-900">
            Conquistas — {pontosTotais} pts · {rank.atual.nome}
          </h2>
        </CardHeader>
        <CardBody>
          <ConquistasPanel conquistas={conquistas} />
        </CardBody>
      </Card>
    </div>
  );
}
