import type { LayoutNode, TagSuportada } from "./layoutParser";

// Ordem fixa dos atributos ao gerar o XML — o Android Studio também mantém
// uma ordem previsível, e isso evita que o arquivo do aluno mude de forma
// aleatória a cada componente arrastado.
const ORDEM_ATRIBUTOS = [
  "id",
  "layout_width",
  "layout_height",
  "orientation",
  "text",
  "hint",
  "onClick",
];

function escaparAtributo(valor: string): string {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ordenarChaves(atributos: Record<string, string>): string[] {
  const conhecidos = ORDEM_ATRIBUTOS.filter((k) => k in atributos);
  const resto = Object.keys(atributos)
    .filter((k) => !ORDEM_ATRIBUTOS.includes(k))
    .sort();
  return [...conhecidos, ...resto];
}

function serializarNode(node: LayoutNode, nivel: number, incluirNamespace: boolean): string {
  const indent = "    ".repeat(nivel);
  const chaves = ordenarChaves(node.atributos).filter((k) => k !== "xmlns:android");

  const linhasAtributos: string[] = [];
  if (incluirNamespace) {
    linhasAtributos.push(`xmlns:android="http://schemas.android.com/apk/res/android"`);
  }
  for (const chave of chaves) {
    linhasAtributos.push(`android:${chave}="${escaparAtributo(node.atributos[chave])}"`);
  }

  const atributosTexto = linhasAtributos
    .map((linha) => `\n${indent}    ${linha}`)
    .join("");

  if (node.filhos.length === 0) {
    return `${indent}<${node.tag}${atributosTexto} />`;
  }

  const filhos = node.filhos
    .map((filho) => serializarNode(filho, nivel + 1, false))
    .join("\n\n");

  return `${indent}<${node.tag}${atributosTexto}>\n\n${filhos}\n\n${indent}</${node.tag}>`;
}

export function escreverLayout(raiz: LayoutNode): string {
  return serializarNode(raiz, 0, true) + "\n";
}

const PADROES: Record<Exclude<TagSuportada, "LinearLayout">, () => Record<string, string>> = {
  TextView: () => ({ layout_width: "wrap_content", text: "Novo texto" }),
  EditText: () => ({ layout_width: "match_parent", hint: "Digite aqui", text: "" }),
  Button: () => ({ layout_width: "wrap_content", text: "Novo botão" }),
};

// Gera um id único no formato que o aluno veria no Android Studio
// (textView2, button3...), sem repetir nenhum já usado no layout.
function proximoId(base: string, usados: Set<string>): string {
  let n = 1;
  let candidato = base + n;
  while (usados.has(candidato)) {
    n++;
    candidato = base + n;
  }
  return candidato;
}

function coletarIds(node: LayoutNode, usados: Set<string>) {
  if (node.id) usados.add(node.id);
  node.filhos.forEach((filho) => coletarIds(filho, usados));
}

export function criarNode(
  tag: Exclude<TagSuportada, "LinearLayout">,
  raiz: LayoutNode
): LayoutNode {
  const usados = new Set<string>();
  coletarIds(raiz, usados);

  const baseId =
    tag === "TextView" ? "textView" : tag === "EditText" ? "editText" : "button";
  const id = proximoId(baseId, usados);

  const atributos: Record<string, string> = { id: `@+id/${id}`, ...PADROES[tag]() };
  if (tag === "Button") atributos.onClick = "aoClicar" + id.charAt(0).toUpperCase() + id.slice(1);

  return { tag, id, atributos, filhos: [] };
}

function clonar(node: LayoutNode): LayoutNode {
  return {
    tag: node.tag,
    id: node.id,
    atributos: { ...node.atributos },
    filhos: node.filhos.map(clonar),
  };
}

export function inserirNode(raiz: LayoutNode, novo: LayoutNode, posicao: number): LayoutNode {
  const copia = clonar(raiz);
  const indice = Math.max(0, Math.min(posicao, copia.filhos.length));
  copia.filhos.splice(indice, 0, novo);
  return copia;
}

export function removerNode(raiz: LayoutNode, id: string): LayoutNode {
  const copia = clonar(raiz);
  copia.filhos = copia.filhos.filter((filho) => filho.id !== id);
  return copia;
}

export function moverNode(raiz: LayoutNode, id: string, novaPosicao: number): LayoutNode {
  const copia = clonar(raiz);
  const atual = copia.filhos.findIndex((filho) => filho.id === id);
  if (atual === -1) return copia;
  const [node] = copia.filhos.splice(atual, 1);
  const destino = Math.max(0, Math.min(novaPosicao, copia.filhos.length));
  copia.filhos.splice(destino, 0, node);
  return copia;
}

export function atualizarAtributo(
  raiz: LayoutNode,
  id: string,
  chave: string,
  valor: string
): LayoutNode {
  const copia = clonar(raiz);
  const alvo = copia.filhos.find((filho) => filho.id === id);
  if (alvo) alvo.atributos[chave] = valor;
  return copia;
}
