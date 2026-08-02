// Lê o conteúdo de /content e grava (upsert) em aulas + quizzes no Supabase.
// Rode com: npm run seed
// Precisa de NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local.
import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import type {
  CriterioValidacao,
  Database,
  PerguntaQuiz,
  TipoSandbox,
  TrilhaSlug,
} from "../src/lib/types/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local antes de rodar o seed."
  );
  process.exit(1);
}

const supabase = createClient<Database>(url, serviceKey);

interface FrontmatterQuizPergunta {
  id: string;
  tipo: "multipla_escolha";
  enunciado: string;
  opcoes: { id: string; texto: string }[];
  resposta_correta: string;
  explicacao?: string;
}

interface Frontmatter {
  titulo: string;
  // mes_numero guarda o número do TRIMESTRE (o nome da coluna no banco é
  // antigo, de quando o curso era organizado por mês). semana_numero não é
  // mais usado no currículo — as aulas são numeradas em sequência dentro do
  // trimestre — mas a coluna existe e continua sendo preenchida.
  mes_numero: number;
  semana_numero?: number;
  numero_sequencial: number;
  duracao_minutos?: number;
  tipo_sandbox: TipoSandbox;
  exercicio_inicial?: string;
  layout_inicial?: string;
  publicado?: boolean;
  criterios_validacao?: CriterioValidacao[];
  quiz?: {
    titulo: string;
    nota_minima_aprovacao?: number;
    perguntas: FrontmatterQuizPergunta[];
  };
}

const CONTENT_DIR = path.join(__dirname, "..", "content");

async function main() {
  for (const slug of ["dam", "bd"] as TrilhaSlug[]) {
    const trilhaDir = path.join(CONTENT_DIR, slug);
    if (!fs.existsSync(trilhaDir)) continue;

    const { data: trilha, error: trilhaError } = await supabase
      .from("trilhas")
      .select("id")
      .eq("slug", slug)
      .single();

    if (trilhaError || !trilha) {
      console.error(
        `Trilha "${slug}" não encontrada. Rode as migrations 0001, 0002 e 0003 antes do seed.`
      );
      continue;
    }

    const { data: modulos } = await supabase
      .from("modulos")
      .select("id, numero")
      .eq("trilha_id", trilha.id);
    const moduloPorNumero = new Map(modulos?.map((m) => [m.numero, m.id]));

    const mesDirs = fs
      .readdirSync(trilhaDir)
      .filter((d) => fs.statSync(path.join(trilhaDir, d)).isDirectory());

    // Guarda quais aulas ainda existem em /content. As que sumiram (por terem
    // sido substituídas ou removidas do currículo) são despublicadas no fim,
    // para não continuarem aparecendo para o aluno.
    const sequenciaisNoDisco: number[] = [];

    for (const mesDir of mesDirs) {
      const arquivos = fs
        .readdirSync(path.join(trilhaDir, mesDir))
        .filter((f) => f.endsWith(".md"))
        .sort();

      for (const arquivo of arquivos) {
        const raw = fs.readFileSync(path.join(trilhaDir, mesDir, arquivo), "utf-8");
        const { data, content } = matter(raw);
        const fm = data as Frontmatter;

        sequenciaisNoDisco.push(fm.numero_sequencial);

        const moduloId = moduloPorNumero.get(fm.mes_numero);
        if (!moduloId) {
          console.warn(
            `Módulo mes_numero=${fm.mes_numero} não encontrado para ${slug}/${mesDir}/${arquivo}, pulando.`
          );
          continue;
        }

        const { data: aula, error: aulaError } = await supabase
          .from("aulas")
          .upsert(
            {
              trilha_id: trilha.id,
              modulo_id: moduloId,
              mes_numero: fm.mes_numero,
              semana_numero: fm.semana_numero ?? 1,
              numero_sequencial: fm.numero_sequencial,
              titulo: fm.titulo,
              duracao_minutos: fm.duracao_minutos ?? 50,
              tipo_sandbox: fm.tipo_sandbox,
              conteudo_md: content.trim(),
              exercicio_inicial: fm.exercicio_inicial ?? null,
              layout_inicial: fm.layout_inicial ?? null,
              publicado: fm.publicado ?? false,
              criterios_validacao: fm.criterios_validacao ?? [],
            },
            { onConflict: "trilha_id,numero_sequencial" }
          )
          .select("id")
          .single();

        if (aulaError || !aula) {
          console.error(`Erro ao gravar aula ${slug}/${mesDir}/${arquivo}:`, aulaError?.message);
          continue;
        }

        console.log(`✓ ${slug}/${mesDir}/${arquivo} -> aula ${aula.id}`);

        if (fm.quiz) {
          const perguntas: PerguntaQuiz[] = fm.quiz.perguntas.map((p) => ({
            id: p.id,
            tipo: p.tipo,
            enunciado: p.enunciado,
            opcoes: p.opcoes,
            resposta_correta: p.resposta_correta,
            explicacao: p.explicacao,
          }));

          const { error: quizError } = await supabase.from("quizzes").upsert(
            {
              aula_id: aula.id,
              titulo: fm.quiz.titulo,
              perguntas,
              nota_minima_aprovacao: fm.quiz.nota_minima_aprovacao ?? 60,
            },
            { onConflict: "aula_id" }
          );
          if (quizError) console.error("  Erro ao gravar quiz:", quizError.message);
        }
      }
    }

    if (sequenciaisNoDisco.length > 0) {
      const { data: removidas } = await supabase
        .from("aulas")
        .update({ publicado: false })
        .eq("trilha_id", trilha.id)
        .eq("publicado", true)
        .not("numero_sequencial", "in", `(${sequenciaisNoDisco.join(",")})`)
        .select("numero_sequencial, titulo");

      for (const aula of removidas ?? []) {
        console.log(`- despublicada (saiu do currículo): ${slug} aula ${aula.numero_sequencial} — ${aula.titulo}`);
      }
    }
  }
}

main().then(() => {
  console.log("Seed concluído.");
  process.exit(0);
});
