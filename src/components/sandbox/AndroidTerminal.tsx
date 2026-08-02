"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CodeEditorBase } from "./CodeEditorBase";
import { TerminalShell } from "./TerminalShell";
import { ConsoleOutput } from "./ConsoleOutput";
import { ChecklistAtividade } from "./ChecklistAtividade";
import { AndroidPreview } from "./AndroidPreview";
import { useAutosave } from "./useAutosave";
import { analisarLayout, type TagSuportada } from "@/lib/android/layoutParser";
import {
  criarNode,
  escreverLayout,
  inserirNode,
  moverNode,
  removerNode,
} from "@/lib/android/layoutWriter";
import { validarCriteriosSaida, type ResultadoCriterio } from "@/lib/sqljs/validacao";
import type { CriterioValidacao, ResultadoExecucaoAndroid } from "@/lib/types/database.types";

const TEMPLATE_XML_PADRAO = `<LinearLayout
    android:orientation="vertical"
    android:layout_width="match_parent">

    <TextView
        android:id="@+id/mensagem"
        android:text="Ola, mundo!" />

</LinearLayout>
`;

const TEMPLATE_JAVA_PADRAO = `class MainActivity extends Activity {
  protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.activity_main);
  }
}
`;

interface AndroidTerminalProps {
  alunoId: string;
  // "exercicio" salva por aula (android_sandbox_state) e marca progresso;
  // "livre" usa o espaço pessoal do aluno (android_playground_state).
  mode?: "exercicio" | "livre";
  aulaId?: string;
  layoutInicial?: string | null;
  activityInicial?: string | null;
  criterios?: CriterioValidacao[];
}

export function AndroidTerminal({
  alunoId,
  mode = "exercicio",
  aulaId,
  layoutInicial,
  activityInicial,
  criterios = [],
}: AndroidTerminalProps) {
  const [supabase] = useState(() => createClient());
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState<"xml" | "java">("xml");
  const [layoutXml, setLayoutXml] = useState("");
  const [activityJava, setActivityJava] = useState("");
  // Só guarda valores que o aluno digitou ou que vieram de uma execução —
  // os valores padrão (texto inicial de cada view) são derivados do XML a
  // cada render, sem precisar de efeito nem de estado duplicado.
  const [estadosOverride, setEstadosOverride] = useState<Record<string, string>>({});
  const [rodando, setRodando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoExecucaoAndroid | null>(null);
  const [erroServico, setErroServico] = useState<string | undefined>();
  const [checklist, setChecklist] = useState<ResultadoCriterio[]>([]);
  const [modoDesign, setModoDesign] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const primeiraExecucaoRef = useRef(false);

  const parseResult = useMemo(() => analisarLayout(layoutXml), [layoutXml]);

  const estados = useMemo(() => {
    const base: Record<string, string> = {};
    for (const view of parseResult.views) base[view.id] = view.textoInicial;
    return { ...base, ...estadosOverride };
  }, [parseResult.views, estadosOverride]);

  const { status: saveStatus, scheduleSave, saveNow } = useAutosave(
    async ({ layoutXml: xml, activityJava: java }: { layoutXml: string; activityJava: string }) => {
      if (mode === "exercicio" && aulaId) {
        await supabase
          .from("android_sandbox_state")
          .upsert(
            { aluno_id: alunoId, aula_id: aulaId, layout_xml: xml, activity_java: java },
            { onConflict: "aluno_id,aula_id" }
          );
      } else {
        await supabase
          .from("android_playground_state")
          .upsert(
            { aluno_id: alunoId, layout_xml: xml, activity_java: java },
            { onConflict: "aluno_id" }
          );
      }
    }
  );

  useEffect(() => {
    let cancelado = false;

    async function iniciar() {
      const consulta =
        mode === "exercicio" && aulaId
          ? supabase
              .from("android_sandbox_state")
              .select("layout_xml, activity_java, resultado_execucao")
              .eq("aluno_id", alunoId)
              .eq("aula_id", aulaId)
          : supabase
              .from("android_playground_state")
              .select("layout_xml, activity_java, resultado_execucao")
              .eq("aluno_id", alunoId);

      const { data } = await consulta.maybeSingle();
      if (cancelado) return;

      setLayoutXml(data?.layout_xml || layoutInicial || TEMPLATE_XML_PADRAO);
      setActivityJava(data?.activity_java || activityInicial || TEMPLATE_JAVA_PADRAO);
      if (data?.resultado_execucao) {
        setResultado(data.resultado_execucao);
        setEstadosOverride((prev) => ({ ...prev, ...data.resultado_execucao!.estados }));
      }
      setCarregando(false);
    }

    iniciar();
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alunoId, aulaId]);

  function aoMudarXml(novoValor: string) {
    setLayoutXml(novoValor);
    scheduleSave({ layoutXml: novoValor, activityJava }, 2000);
  }

  function aoMudarJava(novoValor: string) {
    setActivityJava(novoValor);
    scheduleSave({ layoutXml, activityJava: novoValor }, 2000);
  }

  function aoMudarTextoView(id: string, valor: string) {
    setEstadosOverride((prev) => ({ ...prev, [id]: valor }));
  }

  // O editor visual e o XML são a mesma coisa vista de dois jeitos: arrastar
  // um componente reescreve o XML, e editar o XML na mão muda a tela. É o
  // mesmo vaivém entre "Design" e "Code" do Android Studio.
  function aplicarNoLayout(transformar: (raiz: NonNullable<typeof parseResult.raiz>) => typeof parseResult.raiz) {
    if (!parseResult.raiz) return;
    const nova = transformar(parseResult.raiz);
    if (!nova) return;
    aoMudarXml(escreverLayout(nova));
  }

  function aoSoltarPaleta(tag: Exclude<TagSuportada, "LinearLayout">, posicao: number) {
    aplicarNoLayout((raiz) => inserirNode(raiz, criarNode(tag, raiz), posicao));
  }

  function aoMoverExistente(id: string, posicao: number) {
    aplicarNoLayout((raiz) => moverNode(raiz, id, posicao));
  }

  function aoRemoverView(id: string) {
    aplicarNoLayout((raiz) => removerNode(raiz, id));
    setSelecionado(null);
  }

  async function executar(evento: { viewId: string; metodo: string } | null) {
    if (rodando) return;
    setRodando(true);
    setErroServico(undefined);

    try {
      const views = parseResult.views.map((v) => ({
        id: v.id,
        tipo: v.tipo,
        texto: estados[v.id] ?? v.textoInicial,
      }));

      const res = await fetch("/api/executar-android", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityJava, views, evento }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErroServico(data.error ?? "Não foi possível executar.");
        return;
      }

      const resultadoExecucao: ResultadoExecucaoAndroid = {
        estados: data.estados ?? {},
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? "",
        exit_code: data.exitCode ?? null,
      };
      setResultado(resultadoExecucao);
      if (data.erroServico) setErroServico(data.erroServico);
      setEstadosOverride((prev) => ({ ...prev, ...resultadoExecucao.estados }));

      const saidaParaCriterios =
        Object.entries(resultadoExecucao.estados)
          .map(([id, valor]) => `${id}=${valor}`)
          .join("\n") + (resultadoExecucao.stdout ? `\n${resultadoExecucao.stdout}` : "");

      const novoChecklist =
        criterios.length > 0 ? validarCriteriosSaida(saidaParaCriterios, criterios) : [];
      setChecklist(novoChecklist);
      const atividadeCompleta =
        !resultadoExecucao.stderr &&
        (criterios.length === 0 || novoChecklist.every((c) => c.atendido));

      if (mode === "exercicio" && aulaId) {
        await supabase.from("android_sandbox_state").upsert(
          {
            aluno_id: alunoId,
            aula_id: aulaId,
            layout_xml: layoutXml,
            activity_java: activityJava,
            resultado_execucao: resultadoExecucao,
          },
          { onConflict: "aluno_id,aula_id" }
        );

        if (atividadeCompleta && !primeiraExecucaoRef.current) {
          primeiraExecucaoRef.current = true;
          await supabase.from("progresso_aulas").upsert(
            { aluno_id: alunoId, aula_id: aulaId, status: "em_andamento", exercicio_completo: true },
            { onConflict: "aluno_id,aula_id" }
          );
        }
      } else {
        await supabase.from("android_playground_state").upsert(
          {
            aluno_id: alunoId,
            layout_xml: layoutXml,
            activity_java: activityJava,
            resultado_execucao: resultadoExecucao,
          },
          { onConflict: "aluno_id" }
        );
      }
    } catch {
      setErroServico("Não foi possível conectar ao serviço de execução. Tente novamente.");
    } finally {
      setRodando(false);
    }
  }

  async function aoClicarBotao(viewId: string, metodo: string) {
    await saveNow({ layoutXml, activityJava });
    await executar({ viewId, metodo });
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
      title={
        mode === "exercicio"
          ? "Terminal Android — layout + activity"
          : "Android Studio — prática livre"
      }
      onRun={() => executar(null)}
      running={rodando}
      saveStatus={saveStatus}
      extraActions={
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setModoDesign(false)}
              className={`px-2.5 py-1 text-xs font-semibold ${
                !modoDesign ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Testar
            </button>
            <button
              type="button"
              onClick={() => setModoDesign(true)}
              className={`px-2.5 py-1 text-xs font-semibold ${
                modoDesign ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Design
            </button>
          </div>
          <div className="flex overflow-hidden rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setAba("xml")}
              className={`px-2.5 py-1 text-xs font-semibold ${
                aba === "xml" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              activity_main.xml
            </button>
            <button
              type="button"
              onClick={() => setAba("java")}
              className={`px-2.5 py-1 text-xs font-semibold ${
                aba === "java" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              MainActivity.java
            </button>
          </div>
        </div>
      }
      editor={
        aba === "xml" ? (
          <CodeEditorBase language="xml" value={layoutXml} onChange={aoMudarXml} onRunShortcut={() => executar(null)} />
        ) : (
          <CodeEditorBase language="java" value={activityJava} onChange={aoMudarJava} onRunShortcut={() => executar(null)} />
        )
      }
      output={
        <>
          <AndroidPreview
            raiz={parseResult.raiz}
            erro={parseResult.erro}
            estados={estados}
            onMudarTexto={aoMudarTextoView}
            onClicar={aoClicarBotao}
            desabilitado={rodando}
            modoDesign={modoDesign}
            selecionado={selecionado}
            onSelecionar={setSelecionado}
            onSoltarPaleta={aoSoltarPaleta}
            onMoverExistente={aoMoverExistente}
            onRemover={aoRemoverView}
          />
          <ConsoleOutput
            resultado={
              resultado
                ? { stdout: resultado.stdout, stderr: resultado.stderr, exit_code: resultado.exit_code }
                : null
            }
            erroServico={erroServico}
          />
          <ChecklistAtividade criterios={checklist} />
        </>
      }
    />
  );
}
