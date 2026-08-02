"use client";

import { useState } from "react";
import { Trash2, Type, TextCursorInput, SquareMousePointer } from "lucide-react";
import type { LayoutNode, TagSuportada } from "@/lib/android/layoutParser";

type TagArrastavel = Exclude<TagSuportada, "LinearLayout">;

const PALETA: { tag: TagArrastavel; label: string; Icon: typeof Type }[] = [
  { tag: "TextView", label: "TextView", Icon: Type },
  { tag: "EditText", label: "EditText", Icon: TextCursorInput },
  { tag: "Button", label: "Button", Icon: SquareMousePointer },
];

function larguraClasse(valor: string | undefined): string {
  if (valor === "match_parent") return "w-full";
  return "w-auto";
}

function orientacaoClasse(atributos: Record<string, string>): string {
  // Android de verdade: quando "orientation" não é definido, o padrão é
  // horizontal — mantemos esse mesmo comportamento (mesmo sendo uma pegadinha
  // clássica para quem está aprendendo).
  return atributos.orientation === "vertical" ? "flex-col" : "flex-row";
}

function ViewRenderer({
  node,
  texto,
  desabilitado,
  onMudarTexto,
  onClicar,
}: {
  node: LayoutNode;
  texto: string;
  desabilitado: boolean;
  onMudarTexto: (id: string, valor: string) => void;
  onClicar: (id: string, metodo: string) => void;
}) {
  if (node.tag === "EditText") {
    return (
      <input
        value={texto}
        placeholder={node.atributos.hint}
        onChange={(e) => node.id && onMudarTexto(node.id, e.target.value)}
        className={`rounded-md border border-slate-400 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none ${larguraClasse(node.atributos.layout_width)}`}
      />
    );
  }

  if (node.tag === "Button") {
    return (
      <button
        type="button"
        disabled={desabilitado}
        onClick={() =>
          node.id && node.atributos.onClick && onClicar(node.id, node.atributos.onClick)
        }
        className={`rounded-md border-2 border-slate-900 bg-brand-500 px-3 py-1.5 text-sm font-semibold text-white shadow-[2px_2px_0_0_#0f172a] transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 ${larguraClasse(node.atributos.layout_width)}`}
      >
        {texto}
      </button>
    );
  }

  return (
    <p className={`text-sm text-slate-800 ${larguraClasse(node.atributos.layout_width)}`}>
      {texto}
    </p>
  );
}

function NodeRenderer({
  node,
  estados,
  onMudarTexto,
  onClicar,
  desabilitado,
}: {
  node: LayoutNode;
  estados: Record<string, string>;
  onMudarTexto: (id: string, valor: string) => void;
  onClicar: (id: string, metodo: string) => void;
  desabilitado: boolean;
}) {
  if (node.tag === "LinearLayout") {
    return (
      <div
        className={`flex gap-2 ${orientacaoClasse(node.atributos)} ${larguraClasse(node.atributos.layout_width)}`}
      >
        {node.filhos.map((filho, i) => (
          <NodeRenderer
            key={filho.id ?? i}
            node={filho}
            estados={estados}
            onMudarTexto={onMudarTexto}
            onClicar={onClicar}
            desabilitado={desabilitado}
          />
        ))}
      </div>
    );
  }

  const texto = (node.id ? estados[node.id] : undefined) ?? node.atributos.text ?? "";
  return (
    <ViewRenderer
      node={node}
      texto={texto}
      desabilitado={desabilitado}
      onMudarTexto={onMudarTexto}
      onClicar={onClicar}
    />
  );
}

function Divisor({
  posicao,
  ativo,
  onEntrar,
  onSair,
  onSoltar,
}: {
  posicao: number;
  ativo: boolean;
  onEntrar: (posicao: number) => void;
  onSair: (posicao: number) => void;
  onSoltar: (e: React.DragEvent, posicao: number) => void;
}) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onEntrar(posicao);
      }}
      onDragLeave={() => onSair(posicao)}
      onDrop={(e) => onSoltar(e, posicao)}
      className={`-my-0.5 rounded transition-all ${
        ativo ? "h-6 border-2 border-dashed border-brand-500 bg-brand-50" : "h-2"
      }`}
    />
  );
}

function DesignCanvas({
  raiz,
  selecionado,
  onSelecionar,
  onSoltarPaleta,
  onMoverExistente,
}: {
  raiz: LayoutNode;
  selecionado: string | null;
  onSelecionar: (id: string | null) => void;
  onSoltarPaleta: (tag: TagArrastavel, posicao: number) => void;
  onMoverExistente: (id: string, posicao: number) => void;
}) {
  const [alvoSolta, setAlvoSolta] = useState<number | null>(null);

  function processarSolta(e: React.DragEvent, posicao: number) {
    e.preventDefault();
    e.stopPropagation();
    setAlvoSolta(null);
    const tagNova = e.dataTransfer.getData("application/x-nova-view");
    if (tagNova) {
      onSoltarPaleta(tagNova as TagArrastavel, posicao);
      return;
    }
    const idExistente = e.dataTransfer.getData("application/x-mover-view");
    if (idExistente) onMoverExistente(idExistente, posicao);
  }

  const entrar = (posicao: number) => setAlvoSolta(posicao);
  const sair = (posicao: number) =>
    setAlvoSolta((atual) => (atual === posicao ? null : atual));

  return (
    <div
      className="flex min-h-72 flex-col"
      onClick={() => onSelecionar(null)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => processarSolta(e, raiz.filhos.length)}
    >
      <Divisor
        posicao={0}
        ativo={alvoSolta === 0}
        onEntrar={entrar}
        onSair={sair}
        onSoltar={processarSolta}
      />
      {raiz.filhos.map((filho, i) => (
        <div key={filho.id ?? i}>
          <div
            draggable
            onDragStart={(e) => {
              if (filho.id) e.dataTransfer.setData("application/x-mover-view", filho.id);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelecionar(filho.id ?? null);
            }}
            className={`cursor-move rounded-lg border-2 border-dashed p-1.5 transition-colors ${
              selecionado === filho.id
                ? "border-brand-500 bg-brand-50"
                : "border-transparent hover:border-slate-300"
            }`}
          >
            <div className="pointer-events-none">
              <ViewRenderer
                node={filho}
                texto={filho.atributos.text ?? ""}
                desabilitado
                onMudarTexto={() => {}}
                onClicar={() => {}}
              />
            </div>
          </div>
          <Divisor
            posicao={i + 1}
            ativo={alvoSolta === i + 1}
            onEntrar={entrar}
            onSair={sair}
            onSoltar={processarSolta}
          />
        </div>
      ))}
      {raiz.filhos.length === 0 && (
        <p className="py-8 text-center text-xs text-slate-400">
          Arraste um componente da paleta para cá
        </p>
      )}
    </div>
  );
}

export function AndroidPreview({
  raiz,
  erro,
  estados,
  onMudarTexto,
  onClicar,
  desabilitado = false,
  modoDesign = false,
  selecionado = null,
  onSelecionar,
  onSoltarPaleta,
  onMoverExistente,
  onRemover,
}: {
  raiz: LayoutNode | null;
  erro?: string;
  estados: Record<string, string>;
  onMudarTexto: (id: string, valor: string) => void;
  onClicar: (id: string, metodo: string) => void;
  desabilitado?: boolean;
  modoDesign?: boolean;
  selecionado?: string | null;
  onSelecionar?: (id: string | null) => void;
  onSoltarPaleta?: (tag: TagArrastavel, posicao: number) => void;
  onMoverExistente?: (id: string, posicao: number) => void;
  onRemover?: (id: string) => void;
}) {
  const designAtivo = modoDesign && raiz !== null && !erro;

  return (
    <div className="flex flex-wrap items-start justify-center gap-4 bg-slate-100 p-6">
      {designAtivo && (
        <div className="w-40 shrink-0">
          <p className="mb-2 font-heading text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Paleta
          </p>
          <div className="space-y-1.5">
            {PALETA.map((item) => (
              <div
                key={item.tag}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("application/x-nova-view", item.tag)
                }
                className="flex cursor-grab items-center gap-2 rounded-lg border-2 border-slate-900 bg-white px-2.5 py-2 text-xs font-semibold text-slate-900 shadow-[2px_2px_0_0_#0f172a] active:cursor-grabbing"
              >
                <item.Icon className="h-3.5 w-3.5 text-brand-600" />
                {item.label}
              </div>
            ))}
          </div>
          {selecionado && (
            <button
              type="button"
              onClick={() => onRemover?.(selecionado)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-red-600 bg-white px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Excluir
            </button>
          )}
          <p className="mt-3 text-[11px] leading-snug text-slate-500">
            Arraste para a tela. Clique em um componente para selecionar, arraste para
            reordenar.
          </p>
        </div>
      )}

      <div className="w-72 overflow-hidden rounded-[2rem] border-2 border-slate-900 bg-white shadow-[4px_4px_0_0_#0f172a]">
        <div className="flex justify-center border-b-2 border-slate-900 bg-slate-900 py-1.5">
          <div className="h-1.5 w-16 rounded-full bg-slate-700" />
        </div>
        <div className="min-h-80 p-4">
          {erro && <p className="text-sm text-red-600">{erro}</p>}
          {!erro && raiz && designAtivo && (
            <DesignCanvas
              raiz={raiz}
              selecionado={selecionado}
              onSelecionar={onSelecionar ?? (() => {})}
              onSoltarPaleta={onSoltarPaleta ?? (() => {})}
              onMoverExistente={onMoverExistente ?? (() => {})}
            />
          )}
          {!erro && raiz && !designAtivo && (
            <NodeRenderer
              node={raiz}
              estados={estados}
              onMudarTexto={onMudarTexto}
              onClicar={onClicar}
              desabilitado={desabilitado}
            />
          )}
        </div>
      </div>
    </div>
  );
}
