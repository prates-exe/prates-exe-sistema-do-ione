"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "salvando" | "salvo" | "erro";

// Salvamento automático com "descarga" garantida: o que estiver pendente é
// gravado quando o aluno sai da página, troca de aba ou navega para outra
// aula. Sem isso, tudo que ele digitou nos últimos segundos era perdido —
// que foi exatamente o problema relatado em sala.
export function useAutosave<T>(onSave: (value: T) => Promise<void>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guarda o que ainda não foi para o banco. Fica em ref (e não em estado)
  // porque precisa ser lido dentro de listeners e da limpeza do efeito.
  const pendenteRef = useRef<{ valor: T } | null>(null);
  // A função de salvar muda a cada render (depende de props); a ref garante
  // que os listeners sempre usem a versão atual sem serem recriados.
  const onSaveRef = useRef(onSave);
  useEffect(() => {
    onSaveRef.current = onSave;
  });

  const gravar = useCallback(async (valor: T) => {
    pendenteRef.current = null;
    setStatus("salvando");
    try {
      await onSaveRef.current(valor);
      setStatus("salvo");
    } catch {
      setStatus("erro");
    }
  }, []);

  const saveNow = useCallback(
    async (valor: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      await gravar(valor);
    },
    [gravar]
  );

  const scheduleSave = useCallback(
    (valor: T, delayMs: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      pendenteRef.current = { valor };
      timeoutRef.current = setTimeout(() => gravar(valor), delayMs);
    },
    [gravar]
  );

  useEffect(() => {
    // Grava o que estiver pendente antes de a página sumir. O
    // "visibilitychange" é o gancho mais confiável em celular, onde o
    // navegador pode encerrar a aba sem disparar mais nada.
    function descarregar() {
      const pendente = pendenteRef.current;
      if (!pendente) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      void gravar(pendente.valor);
    }

    function aoTrocarVisibilidade() {
      if (document.visibilityState === "hidden") descarregar();
    }

    window.addEventListener("pagehide", descarregar);
    document.addEventListener("visibilitychange", aoTrocarVisibilidade);

    return () => {
      window.removeEventListener("pagehide", descarregar);
      document.removeEventListener("visibilitychange", aoTrocarVisibilidade);
      // Ao trocar de aula (navegação interna), o componente é desmontado:
      // grava antes de sair.
      descarregar();
    };
  }, [gravar]);

  return { status, saveNow, scheduleSave };
}
