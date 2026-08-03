/**
 * Redistribui a alternativa correta dos quizzes.
 *
 * MOTIVO: as aulas foram escritas com a alternativa certa sempre em primeiro
 * lugar. Nas 424 perguntas do curso, `resposta_correta` era "a" em todas —
 * ou seja, marcar "a" oito vezes tirava 100 sem ler nada. Um aluno chegou a
 * gabaritar exatamente assim.
 *
 * COMO: para cada pergunta, os TEXTOS das alternativas giram entre as letras
 * a/b/c/d, e `resposta_correta` passa a apontar para a letra que ficou com o
 * texto certo. O deslocamento vem de um hash do enunciado somado aos textos
 * ordenados — dados que não mudam quando as alternativas giram. Por isso
 * rodar o script duas vezes dá exatamente o mesmo resultado (é idempotente),
 * e não fica embaralhando o curso a cada execução.
 *
 * Rode com: npx tsx scripts/embaralhar-quiz.ts
 * Depois: npm run seed
 */
import fs from "node:fs";
import path from "node:path";

const RAIZ_CONTEUDO = path.join(process.cwd(), "content");
const LETRAS = ["a", "b", "c", "d"] as const;

/** Hash estável (FNV-1a). O `crypto` nativo serviria, mas isto basta e não importa nada. */
function hash(texto: string): number {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function listarAulas(dir: string): string[] {
  const encontrados: string[] = [];
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const caminho = path.join(dir, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...listarAulas(caminho));
    else if (entrada.name.endsWith(".md")) encontrados.push(caminho);
  }
  return encontrados;
}

const LINHA_OPCAO = /^(\s*)- \{ id: ([a-d]), texto: "((?:[^"\\]|\\.)*)" \}$/;
const LINHA_CORRETA = /^(\s*)resposta_correta: "?([a-d])"?\s*$/;
const LINHA_ENUNCIADO = /^\s*enunciado: "((?:[^"\\]|\\.)*)"\s*$/;

let totalPerguntas = 0;
const distribuicao: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

for (const arquivo of listarAulas(RAIZ_CONTEUDO)) {
  const bruto = fs.readFileSync(arquivo, "utf8");
  // O repositório roda no Windows com core.autocrlf=true, então os arquivos
  // podem estar com CRLF. Sem separar isso, o "\r" sobra no fim de cada
  // linha e todas as expressões regulares ancoradas em $ deixam de casar.
  const quebra = bruto.includes("\r\n") ? "\r\n" : "\n";
  const linhas = bruto.split(/\r?\n/);
  let enunciadoAtual = "";
  let inicioOpcoes = -1;
  let opcoes: { indentacao: string; texto: string }[] = [];

  for (let i = 0; i < linhas.length; i++) {
    const enunciado = LINHA_ENUNCIADO.exec(linhas[i]);
    if (enunciado) {
      enunciadoAtual = enunciado[1];
      opcoes = [];
      inicioOpcoes = -1;
      continue;
    }

    const opcao = LINHA_OPCAO.exec(linhas[i]);
    if (opcao) {
      if (inicioOpcoes === -1) inicioOpcoes = i;
      opcoes.push({ indentacao: opcao[1], texto: opcao[3] });
      continue;
    }

    const correta = LINHA_CORRETA.exec(linhas[i]);
    if (!correta || opcoes.length !== LETRAS.length) continue;

    const textoCorreto = opcoes[LETRAS.indexOf(correta[2] as (typeof LETRAS)[number])].texto;

    // A saída precisa depender só do CONJUNTO de alternativas, nunca da
    // ordem em que elas estão agora. Se dependesse da ordem atual, rodar o
    // script duas vezes giraria duas vezes, e o curso mudaria a cada
    // execução. Por isso parte-se sempre da ordem alfabética.
    const canonicas = [...opcoes.map((o) => o.texto)].sort();
    const semente = hash(enunciadoAtual + canonicas.join("|"));
    const deslocamento = semente % LETRAS.length;

    const girados = new Array<string>(LETRAS.length);
    canonicas.forEach((texto, j) => {
      girados[(j + deslocamento) % LETRAS.length] = texto;
    });

    girados.forEach((texto, j) => {
      linhas[inicioOpcoes + j] = `${opcoes[j].indentacao}- { id: ${LETRAS[j]}, texto: "${texto}" }`;
    });

    const novaLetra = LETRAS[girados.indexOf(textoCorreto)];
    linhas[i] = `${correta[1]}resposta_correta: ${novaLetra}`;

    totalPerguntas++;
    distribuicao[novaLetra]++;
    opcoes = [];
    inicioOpcoes = -1;
  }

  fs.writeFileSync(arquivo, linhas.join(quebra));
}

console.log(`${totalPerguntas} perguntas processadas.`);
console.log("Distribuição da alternativa correta:", distribuicao);
