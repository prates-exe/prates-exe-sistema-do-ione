"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CodeEditorBase } from "./CodeEditorBase";
import { TerminalShell } from "./TerminalShell";
import { ConsoleOutput } from "./ConsoleOutput";
import { ChecklistAtividade } from "./ChecklistAtividade";
import { useAutosave } from "./useAutosave";
import { validarCriteriosSaida, type ResultadoCriterio } from "@/lib/sqljs/validacao";
import type { CriterioValidacao, ResultadoExecucaoCodigo } from "@/lib/types/database.types";

const TEMPLATE_PADRAO = `class Main {
  public static void main(String[] args) {
    // escreva seu código aqui
    System.out.println("Olá, mundo!");
  }
}
`;

interface CodeTerminalProps {
  alunoId: string;
  mode: "exercicio" | "livre";
  aulaId?: string;
  templateInicial?: string | null;
  criterios?: CriterioValidacao[];
}

export function CodeTerminal({
  alunoId,
  mode,
  aulaId,
  templateInicial,
  criterios = [],
}: CodeTerminalProps) {
  const [supabase] = useState(() => createClient());
  const [carregando, setCarregando] = useState(true);
  const [valor, setValor] = useState("");
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoExecucaoCodigo | null>(null);
  const [erroServico, setErroServico] = useState<string | undefined>();
  const [checklist, setChecklist] = useState<ResultadoCriterio[]>([]);
  const primeiraExecucaoRef = useRef(false);

  const { status: saveStatus, scheduleSave, saveNow } = useAutosave(async (codigo: string) => {
    if (mode === "exercicio" && aulaId) {
      await supabase
        .from("code_sandbox_state")
        .upsert(
          { aluno_id: alunoId, aula_id: aulaId, codigo },
          { onConflict: "aluno_id,aula_id" }
        );
    } else {
      await supabase
        .from("code_playground_state")
        .upsert({ aluno_id: alunoId, codigo }, { onConflict: "aluno_id" });
    }
  });

  useEffect(() => {
    let cancelado = false;

    async function iniciar() {
      if (mode === "exercicio" && aulaId) {
        const { data } = await supabase
          .from("code_sandbox_state")
          .select("codigo, resultado_execucao")
          .eq("aluno_id", alunoId)
          .eq("aula_id", aulaId)
          .maybeSingle();
        if (cancelado) return;
        setValor(data?.codigo || templateInicial || TEMPLATE_PADRAO);
        setResultado(data?.resultado_execucao ?? null);
        if (data?.resultado_execucao && criterios.length > 0) {
          setChecklist(validarCriteriosSaida(data.resultado_execucao.stdout, criterios));
        }
      } else {
        const { data } = await supabase
          .from("code_playground_state")
          .select("codigo")
          .eq("aluno_id", alunoId)
          .maybeSingle();
        if (cancelado) return;
        setValor(data?.codigo || TEMPLATE_PADRAO);
      }
      setCarregando(false);
    }

    iniciar();
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alunoId, aulaId, mode]);

  function aoMudar(novoValor: string) {
    setValor(novoValor);
    scheduleSave(novoValor, 800);
  }

  async function executar() {
    if (rodando || !valor.trim()) return;
    setRodando(true);
    setErroServico(undefined);

    try {
      const res = await fetch("/api/executar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: valor }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErroServico(data.error ?? "Não foi possível executar o código.");
        setResultado(null);
      } else {
        const resultadoExecucao: ResultadoExecucaoCodigo = {
          stdout: data.stdout ?? "",
          stderr: data.stderr ?? "",
          exit_code: data.exitCode ?? null,
        };
        setResultado(resultadoExecucao);
        if (data.erroServico) setErroServico(data.erroServico);

        const novoChecklist =
          criterios.length > 0 ? validarCriteriosSaida(resultadoExecucao.stdout, criterios) : [];
        setChecklist(novoChecklist);
        const atividadeCompleta =
          resultadoExecucao.exit_code === 0 &&
          (criterios.length === 0 || novoChecklist.every((c) => c.atendido));

        if (mode === "exercicio" && aulaId) {
          await supabase.from("code_sandbox_state").upsert(
            {
              aluno_id: alunoId,
              aula_id: aulaId,
              codigo: valor,
              resultado_execucao: resultadoExecucao,
            },
            { onConflict: "aluno_id,aula_id" }
          );

          if (atividadeCompleta && !primeiraExecucaoRef.current) {
            primeiraExecucaoRef.current = true;
            await supabase.from("progresso_aulas").upsert(
              {
                aluno_id: alunoId,
                aula_id: aulaId,
                exercicio_completo: true,
              },
              { onConflict: "aluno_id,aula_id" }
            );
          }
        } else {
          await saveNow(valor);
        }
      }
    } catch {
      setErroServico("Não foi possível conectar ao serviço de execução. Tente novamente.");
    } finally {
      setRodando(false);
    }
  }

  if (carregando) {
    return (
      <div className="rounded-lg border border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        Carregando…
      </div>
    );
  }

  return (
    <TerminalShell
      title={mode === "exercicio" ? "Terminal de código — exercício" : "Terminal de código — prática livre"}
      onRun={executar}
      running={rodando}
      saveStatus={saveStatus}
      editor={
        <CodeEditorBase language="java" value={valor} onChange={aoMudar} onRunShortcut={executar} />
      }
      output={
        <>
          <ConsoleOutput resultado={resultado} erroServico={erroServico} />
          <ChecklistAtividade criterios={checklist} />
        </>
      }
    />
  );
}
