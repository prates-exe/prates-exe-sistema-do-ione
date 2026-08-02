import { LessonHeader } from "./LessonHeader";
import { MaterialPanel } from "./MaterialPanel";
import { QuizPanel } from "./QuizPanel";
import { SqlTerminal } from "@/components/sandbox/SqlTerminal";
import { CodeTerminal } from "@/components/sandbox/CodeTerminal";
import { AndroidTerminal } from "@/components/sandbox/AndroidTerminal";
import { getQuizParaAula } from "@/lib/quiz/actions";
import type { CriterioValidacao, TipoSandbox } from "@/lib/types/database.types";

interface AulaParaView {
  id: string;
  trilha_id: string;
  titulo: string;
  duracao_minutos: number;
  tipo_sandbox: TipoSandbox;
  conteudo_md: string;
  exercicio_inicial: string | null;
  layout_inicial: string | null;
  criterios_validacao: CriterioValidacao[];
}

export async function LessonView({
  aula,
  alunoId,
  status,
}: {
  aula: AulaParaView;
  alunoId: string;
  status: string;
}) {
  const quiz = await getQuizParaAula(aula.id);

  return (
    <div className="space-y-6">
      <LessonHeader titulo={aula.titulo} duracaoMinutos={aula.duracao_minutos} status={status} />
      <MaterialPanel aulaId={aula.id} conteudoMd={aula.conteudo_md} />

      {aula.tipo_sandbox === "sql" && (
        <SqlTerminal
          alunoId={alunoId}
          trilhaId={aula.trilha_id}
          mode="exercicio"
          aulaId={aula.id}
          exercicioInicial={aula.exercicio_inicial}
          criterios={aula.criterios_validacao}
        />
      )}

      {aula.tipo_sandbox === "code" && (
        <CodeTerminal
          alunoId={alunoId}
          mode="exercicio"
          aulaId={aula.id}
          templateInicial={aula.exercicio_inicial}
          criterios={aula.criterios_validacao}
        />
      )}

      {aula.tipo_sandbox === "android" && (
        <AndroidTerminal
          alunoId={alunoId}
          aulaId={aula.id}
          layoutInicial={aula.layout_inicial}
          activityInicial={aula.exercicio_inicial}
          criterios={aula.criterios_validacao}
        />
      )}

      {quiz && <QuizPanel aulaId={aula.id} quiz={quiz} />}
    </div>
  );
}
