// Interpreta o XML de layout que o aluno escreve (subconjunto real da
// sintaxe do Android: LinearLayout, TextView, EditText, Button) para
// desenhar a prévia da tela e para saber quais views existem — os mesmos
// nomes de tag e atributos que existem no Android Studio de verdade.
export type TagSuportada = "LinearLayout" | "TextView" | "EditText" | "Button";

export interface LayoutNode {
  tag: TagSuportada;
  id?: string;
  atributos: Record<string, string>;
  filhos: LayoutNode[];
}

export interface ViewInfo {
  id: string;
  tipo: "TextView" | "EditText" | "Button";
  textoInicial: string;
  hint?: string;
  onClick?: string;
}

export interface ResultadoParseLayout {
  raiz: LayoutNode | null;
  views: ViewInfo[];
  erro?: string;
}

const TAGS_SUPORTADAS = new Set<string>(["LinearLayout", "TextView", "EditText", "Button"]);

function extrairId(valor: string | undefined): string | undefined {
  if (!valor) return undefined;
  const m = valor.match(/^@\+?id\/([a-zA-Z_][a-zA-Z0-9_]*)$/);
  return m ? m[1] : undefined;
}

function converterElemento(el: Element): LayoutNode | null {
  const tag = el.tagName;
  if (!TAGS_SUPORTADAS.has(tag)) return null;

  const atributos: Record<string, string> = {};
  for (const attr of Array.from(el.attributes)) {
    const nome = attr.name.replace(/^android:/, "");
    atributos[nome] = attr.value;
  }

  const filhos: LayoutNode[] = [];
  for (const filhoEl of Array.from(el.children)) {
    const convertido = converterElemento(filhoEl);
    if (convertido) filhos.push(convertido);
  }

  return {
    tag: tag as TagSuportada,
    id: extrairId(atributos.id),
    atributos,
    filhos,
  };
}

function coletarViews(node: LayoutNode, views: ViewInfo[]) {
  if (node.tag !== "LinearLayout" && node.id) {
    views.push({
      id: node.id,
      tipo: node.tag,
      textoInicial: node.atributos.text ?? "",
      hint: node.atributos.hint,
      onClick: node.atributos.onClick,
    });
  }
  node.filhos.forEach((filho) => coletarViews(filho, views));
}

// Todo layout Android real declara o namespace "android:" na tag raiz
// (xmlns:android="..."). Um parser XML estrito rejeita atributos android:xxx
// sem essa declaração — para não travar o aluno por esquecer uma linha de
// boilerplate que o próprio Android Studio gera sozinho, adicionamos aqui
// se estiver faltando.
const NAMESPACE_ANDROID = 'xmlns:android="http://schemas.android.com/apk/res/android"';

function garantirNamespace(xml: string): string {
  if (xml.includes("xmlns:android")) return xml;
  return xml.replace(/^(\s*<[A-Za-z][\w.]*)/, `$1 ${NAMESPACE_ANDROID}`);
}

export function analisarLayout(xml: string): ResultadoParseLayout {
  if (!xml.trim()) {
    return { raiz: null, views: [], erro: "O layout está vazio." };
  }

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(garantirNamespace(xml), "application/xml");
  } catch {
    return { raiz: null, views: [], erro: "Não foi possível interpretar o XML." };
  }

  if (doc.querySelector("parsererror")) {
    return {
      raiz: null,
      views: [],
      erro: "XML inválido — confira se todas as tags foram abertas e fechadas corretamente.",
    };
  }

  const raizEl = doc.documentElement;
  const raiz = converterElemento(raizEl);
  if (!raiz) {
    return {
      raiz: null,
      views: [],
      erro: `A tag raiz "${raizEl.tagName}" não é suportada aqui — use LinearLayout.`,
    };
  }

  const views: ViewInfo[] = [];
  coletarViews(raiz, views);

  return { raiz, views };
}
