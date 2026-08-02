"use client";

import { useState } from "react";
import { Smartphone, Code2 } from "lucide-react";
import { AndroidTerminal } from "./AndroidTerminal";
import { CodeTerminal } from "./CodeTerminal";

// A prática livre tem duas frentes, porque o curso exige as duas: montar
// telas (Android) e treinar a lógica da linguagem (Java puro). Cada uma tem
// o seu próprio espaço salvo, então o aluno pode alternar sem perder nada.
export function PraticaAndroid({ alunoId }: { alunoId: string }) {
  const [aba, setAba] = useState<"android" | "java">("android");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setAba("android")}
          className={`flex items-center gap-2 rounded-xl border-2 border-slate-900 px-4 py-2 text-sm font-heading font-semibold transition-all ${
            aba === "android"
              ? "bg-dam-500 text-white shadow-[3px_3px_0_0_#0f172a]"
              : "bg-white text-slate-900 hover:-translate-y-0.5"
          }`}
        >
          <Smartphone className="h-4 w-4" />
          Montar telas (Android)
        </button>
        <button
          type="button"
          onClick={() => setAba("java")}
          className={`flex items-center gap-2 rounded-xl border-2 border-slate-900 px-4 py-2 text-sm font-heading font-semibold transition-all ${
            aba === "java"
              ? "bg-brand-500 text-white shadow-[3px_3px_0_0_#0f172a]"
              : "bg-white text-slate-900 hover:-translate-y-0.5"
          }`}
        >
          <Code2 className="h-4 w-4" />
          Treinar lógica (Java puro)
        </button>
      </div>

      <p className="text-sm text-slate-600">
        {aba === "android" ? (
          <>
            Monte a tela no modo <strong>Design</strong>, arrastando os componentes, e escreva a
            lógica no <strong>MainActivity.java</strong>. Depois clique em <strong>Testar</strong>{" "}
            para usar o app de verdade.
          </>
        ) : (
          <>
            Espaço para treinar a linguagem sem se preocupar com tela: variáveis, condições, laços,
            arrays e métodos.
          </>
        )}
      </p>

      {/* Os dois ficam montados o tempo todo (apenas escondidos) para que o
          conteúdo digitado não se perca ao alternar entre as abas. */}
      <div hidden={aba !== "android"}>
        <AndroidTerminal alunoId={alunoId} mode="livre" />
      </div>
      <div hidden={aba !== "java"}>
        <CodeTerminal alunoId={alunoId} mode="livre" />
      </div>
    </div>
  );
}
