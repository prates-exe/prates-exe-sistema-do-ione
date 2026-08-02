import "server-only";

// Executa código Java em serviços públicos e gratuitos, sem chave nem conta.
//
// São dois provedores: o Wandbox como principal e o Compiler Explorer
// (godbolt.org) como reserva. O Wandbox já saiu do ar por horas seguidas
// ("OCI runtime error"), derrubando junto todos os exercícios de Java — com
// a reserva, a aula continua funcionando sozinha nesses casos.
//
// Observação válida para os dois: a classe principal do aluno NÃO pode ser
// `public` (use `class Main`, não `public class Main`). Os dois serviços
// salvam o código com um nome de arquivo fixo, e o Java só exige que o nome
// do arquivo bata com o da classe quando ela é `public`.
const WANDBOX_COMPILE_URL = "https://wandbox.org/api/compile.json";
const WANDBOX_COMPILER = "openjdk-jdk-22+36";

const GODBOLT_COMPILE_URL = "https://godbolt.org/api/compiler/java2100/compile";

const TIMEOUT_MS = 15_000;

export interface ResultadoExecucao {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  erroServico?: string;
}

interface WandboxResponse {
  status?: string;
  compiler_error?: string;
  compiler_output?: string;
  program_output?: string;
  program_error?: string;
}

interface GodboltLinha {
  text?: string;
}

interface GodboltResponse {
  code?: number;
  didExecute?: boolean;
  stdout?: GodboltLinha[];
  stderr?: GodboltLinha[];
  execResult?: {
    code?: number;
    stdout?: GodboltLinha[];
    stderr?: GodboltLinha[];
  };
}

function juntarLinhas(linhas: GodboltLinha[] | undefined): string {
  return (linhas ?? []).map((l) => l.text ?? "").join("\n");
}

async function postarComTimeout(url: string, body: unknown, headers: Record<string, string>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

// O Wandbox responde 200 mesmo quando o sandbox dele falha por dentro; nesse
// caso o erro vem no corpo (status 126 + "OCI runtime error"). Tratamos isso
// como indisponibilidade para acionar a reserva, e não como erro do aluno.
function wandboxIndisponivel(data: WandboxResponse): boolean {
  const mensagem = `${data.compiler_error ?? ""}${data.program_error ?? ""}`;
  return mensagem.includes("OCI runtime error") || mensagem.includes("Resource temporarily unavailable");
}

async function executarNoWandbox(codigo: string): Promise<ResultadoExecucao | null> {
  try {
    const res = await postarComTimeout(
      WANDBOX_COMPILE_URL,
      { code: codigo, compiler: WANDBOX_COMPILER },
      {}
    );
    if (!res.ok) return null;

    const data = (await res.json()) as WandboxResponse;
    if (wandboxIndisponivel(data)) return null;

    return {
      stdout: data.program_output ?? "",
      stderr: [data.compiler_error, data.program_error].filter(Boolean).join("\n"),
      exitCode: data.status !== undefined ? Number(data.status) : null,
    };
  } catch {
    return null;
  }
}

// O Godbolt roda a JVM em um ambiente sem locale UTF-8, então acentos saem
// como "?" na saída padrão. Como o curso é todo em português, injetamos uma
// classe auxiliar que troca o System.out por um em UTF-8 antes do programa
// rodar. O bloco `static` executa no carregamento da classe, ou seja, antes
// do main do aluno — e o código dele não precisa mudar nada.
const FORCAR_UTF8 = `
class __Utf8 {
  static {
    try {
      System.setOut(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, "UTF-8"));
    } catch (java.io.UnsupportedEncodingException e) {
      // segue com a saída padrão
    }
  }
}
`;

function prepararParaGodbolt(codigo: string): string {
  // Só faz sentido injetar se o aluno tiver uma classe Main com main; caso
  // contrário deixamos como está para o erro de compilação chegar limpo.
  if (!/\bstatic\s+void\s+main\s*\(/.test(codigo)) return codigo;
  return `${FORCAR_UTF8}\n${codigo.replace(
    /(\bstatic\s+void\s+main\s*\([^)]*\)\s*(?:throws[^{]*)?\{)/,
    "$1\n    new __Utf8();"
  )}`;
}

async function executarNoGodbolt(codigo: string): Promise<ResultadoExecucao | null> {
  try {
    const res = await postarComTimeout(
      GODBOLT_COMPILE_URL,
      {
        source: prepararParaGodbolt(codigo),
        lang: "java",
        options: {
          userArguments: "",
          executeParameters: {},
          compilerOptions: { executorRequest: true },
          filters: { execute: true },
        },
      },
      { Accept: "application/json" }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as GodboltResponse;

    // Erro de compilação: o código do aluno nem chegou a rodar.
    if (!data.didExecute) {
      const erroCompilacao = juntarLinhas(data.stderr);
      return {
        stdout: "",
        stderr: erroCompilacao || "Não foi possível compilar o código.",
        exitCode: data.code ?? 1,
      };
    }

    // O Godbolt às vezes devolve a saída em execResult.stdout e às vezes no
    // stdout de primeiro nível, deixando o outro como lista vazia — por isso
    // escolhemos o que realmente tem conteúdo, e não o primeiro definido.
    const saida = juntarLinhas(data.execResult?.stdout) || juntarLinhas(data.stdout);
    const erro = juntarLinhas(data.execResult?.stderr) || juntarLinhas(data.stderr);

    return {
      stdout: saida,
      stderr: erro,
      exitCode: data.execResult?.code ?? data.code ?? 0,
    };
  } catch {
    return null;
  }
}

export async function executarJava(codigo: string): Promise<ResultadoExecucao> {
  const resultado = (await executarNoWandbox(codigo)) ?? (await executarNoGodbolt(codigo));

  if (resultado) return resultado;

  return {
    stdout: "",
    stderr: "",
    exitCode: null,
    erroServico:
      "Os serviços gratuitos que executam Java estão fora do ar no momento. " +
      "Seu código foi salvo — tente executar de novo daqui a pouco.",
  };
}
