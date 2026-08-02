"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  createDatabase,
  exportDatabaseToBase64,
  listarTabelas,
  type Database,
  type QueryExecResult,
  type TabelaInfo,
} from "@/lib/sqljs/engine";
import { analisarErroSql, type ErroSqlAnalisado } from "@/lib/sqljs/errorParser";
import { validarCriteriosSql, type ResultadoCriterio } from "@/lib/sqljs/validacao";
import { CodeEditorBase, type EditorMarker } from "./CodeEditorBase";
import { TerminalShell } from "./TerminalShell";
import { ResultsTable } from "./ResultsTable";
import { SchemaExplorer } from "./SchemaExplorer";
import { ChecklistAtividade } from "./ChecklistAtividade";
import { useAutosave } from "./useAutosave";
import type { CriterioValidacao, SandboxContexto } from "@/lib/types/database.types";

interface SqlTerminalProps {
  alunoId: string;
  trilhaId: string;
  mode: "exercicio" | "livre";
  aulaId?: string;
  exercicioInicial?: string | null;
  criterios?: CriterioValidacao[];
}

export function SqlTerminal({
  alunoId,
  trilhaId,
  mode,
  aulaId,
  exercicioInicial,
  criterios = [],
}: SqlTerminalProps) {
  const contexto: SandboxContexto = mode === "exercicio" ? "curso" : "livre";

  const dbRef = useRef<Database | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [valor, setValor] = useState("");
  const [rodando, setRodando] = useState(false);
  const [resultados, setResultados] = useState<QueryExecResult[] | null>(null);
  const [erro, setErro] = useState<ErroSqlAnalisado | null>(null);
  const [markers, setMarkers] = useState<EditorMarker[]>([]);
  const [tabelas, setTabelas] = useState<TabelaInfo[]>([]);
  const [checklist, setChecklist] = useState<ResultadoCriterio[]>([]);

  const [supabase] = useState(() => createClient());

  const { status: saveStatus, saveNow } = useAutosave(async (db: Database) => {
    const snapshot = exportDatabaseToBase64(db);
    await supabase.from("sql_sandbox_state").upsert(
      {
        aluno_id: alunoId,
        trilha_id: trilhaId,
        contexto,
        db_snapshot: snapshot,
        tamanho_bytes: snapshot.length,
      },
      { onConflict: "aluno_id,trilha_id,contexto" }
    );
  });

  // O texto ainda não executado também é salvo no banco (não só no
  // navegador): assim o aluno não perde o que estava digitando ao recarregar
  // a página ou trocar de computador no laboratório.
  const { scheduleSave: agendarSalvarRascunho } = useAutosave(async (texto: string) => {
    await supabase.from("sql_sandbox_state").upsert(
      { aluno_id: alunoId, trilha_id: trilhaId, contexto, rascunho: texto },
      { onConflict: "aluno_id,trilha_id,contexto" }
    );
  });

  useEffect(() => {
    let cancelado = false;

    async function iniciar() {
      const { data: row } = await supabase
        .from("sql_sandbox_state")
        .select("db_snapshot, rascunho")
        .eq("aluno_id", alunoId)
        .eq("trilha_id", trilhaId)
        .eq("contexto", contexto)
        .maybeSingle();

      const db = await createDatabase(row?.db_snapshot);

      if (!row?.db_snapshot && exercicioInicial) {
        try {
          db.exec(exercicioInicial);
        } catch {
          // Se o script inicial falhar, o aluno começa com o banco vazio mesmo.
        }
      }

      if (cancelado) {
        db.close();
        return;
      }

      dbRef.current = db;
      setTabelas(listarTabelas(db));
      if (criterios.length > 0) setChecklist(validarCriteriosSql(db, criterios));
      setValor(row?.rascunho ?? (row?.db_snapshot ? "" : exercicioInicial ?? ""));
      setCarregando(false);
    }

    iniciar();

    return () => {
      cancelado = true;
      dbRef.current?.close();
      dbRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alunoId, trilhaId, contexto, aulaId]);

  function aoMudarValor(novoValor: string) {
    setValor(novoValor);
    agendarSalvarRascunho(novoValor, 1500);
  }

  useEffect(() => {
    function aoOcultar() {
      if (document.visibilityState === "hidden" && dbRef.current) {
        saveNow(dbRef.current);
      }
    }
    document.addEventListener("visibilitychange", aoOcultar);
    return () => document.removeEventListener("visibilitychange", aoOcultar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function executar() {
    const db = dbRef.current;
    if (!db || rodando || !valor.trim()) return;

    setRodando(true);
    try {
      const res = db.exec(valor);
      setResultados(res);
      setErro(null);
      setMarkers([]);
      setTabelas(listarTabelas(db));

      const novoChecklist = criterios.length > 0 ? validarCriteriosSql(db, criterios) : [];
      setChecklist(novoChecklist);
      const atividadeCompleta = criterios.length === 0 || novoChecklist.every((c) => c.atendido);

      await Promise.all([
        saveNow(db),
        supabase.from("sql_query_history").insert({
          aluno_id: alunoId,
          aula_id: aulaId ?? null,
          query_sql: valor,
          sucesso: true,
        }),
        mode === "exercicio" && aulaId
          ? supabase.from("progresso_aulas").upsert(
              {
                aluno_id: alunoId,
                aula_id: aulaId,
                status: "em_andamento",
                exercicio_completo: atividadeCompleta,
              },
              { onConflict: "aluno_id,aula_id" }
            )
          : Promise.resolve(),
      ]);
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : String(e);
      const analisado = analisarErroSql(mensagem, valor);
      setErro(analisado);
      setResultados(null);
      if (analisado.intervalo) {
        setMarkers([
          { from: analisado.intervalo.de, to: analisado.intervalo.ate, message: analisado.amigavel },
        ]);
      } else {
        setMarkers([]);
      }

      await supabase.from("sql_query_history").insert({
        aluno_id: alunoId,
        aula_id: aulaId ?? null,
        query_sql: valor,
        sucesso: false,
        mensagem_erro: mensagem,
      });
    } finally {
      setRodando(false);
    }
  }

  async function reiniciarBancoLivre() {
    if (mode !== "livre") return;
    dbRef.current?.close();
    const db = await createDatabase(null);
    dbRef.current = db;
    setResultados(null);
    setErro(null);
    setMarkers([]);
    setTabelas([]);
    await saveNow(db);
  }

  if (carregando) {
    return (
      <div className="rounded-lg border border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        Carregando o banco de dados…
      </div>
    );
  }

  return (
    <TerminalShell
      title={mode === "exercicio" ? "Terminal SQL — exercício" : "Terminal SQL — prática livre"}
      onRun={executar}
      running={rodando}
      saveStatus={saveStatus}
      extraActions={
        mode === "livre" ? (
          <button
            type="button"
            onClick={reiniciarBancoLivre}
            className="rounded border border-slate-500 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
          >
            Recomeçar banco
          </button>
        ) : undefined
      }
      editor={
        <CodeEditorBase
          language="sql"
          value={valor}
          onChange={aoMudarValor}
          onRunShortcut={executar}
          markers={markers}
        />
      }
      output={
        <>
          <div className="flex">
            <div className="flex-1">
              <ResultsTable resultados={resultados} erro={erro} />
            </div>
            <SchemaExplorer tabelas={tabelas} />
          </div>
          <ChecklistAtividade criterios={checklist} />
        </>
      }
    />
  );
}
