"use client";

import { useEffect, useMemo, useRef } from "react";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { keymap, EditorView } from "@codemirror/view";
import { sql, SQLite } from "@codemirror/lang-sql";
import { java } from "@codemirror/lang-java";
import { xml } from "@codemirror/lang-xml";
import { setDiagnostics, type Diagnostic } from "@codemirror/lint";

// CodeMirror no lugar do Monaco: os dois oferecem destaque de sintaxe e
// apontamento de erro, mas o CodeMirror é uma fração do tamanho (Monaco
// carrega recursos de IDE completa que não usamos aqui).
export interface EditorMarker {
  from: number;
  to: number;
  message: string;
}

const editorTheme = EditorView.theme({
  "&": { fontSize: "13px" },
  ".cm-scroller": { fontFamily: "var(--font-mono, monospace)" },
});

export function CodeEditorBase({
  language,
  value,
  onChange,
  height = "260px",
  markers = [],
  onRunShortcut,
}: {
  language: "sql" | "java" | "xml";
  value: string;
  onChange: (value: string) => void;
  height?: string;
  markers?: EditorMarker[];
  onRunShortcut?: () => void;
}) {
  const cmRef = useRef<ReactCodeMirrorRef | null>(null);

  const languageExtension = useMemo(() => {
    if (language === "sql") return sql({ dialect: SQLite });
    if (language === "xml") return xml();
    return java();
  }, [language]);

  const runKeymap = useMemo(
    () =>
      keymap.of([
        {
          key: "Mod-Enter",
          run: () => {
            onRunShortcut?.();
            return true;
          },
        },
      ]),
    [onRunShortcut]
  );

  useEffect(() => {
    const view = cmRef.current?.view;
    if (!view) return;

    const diagnostics: Diagnostic[] = markers
      .filter((m) => m.from >= 0 && m.to <= view.state.doc.length)
      .map((m) => ({ from: m.from, to: m.to, severity: "error", message: m.message }));

    view.dispatch(setDiagnostics(view.state, diagnostics));
  }, [markers]);

  return (
    <CodeMirror
      ref={cmRef}
      value={value}
      height={height}
      theme="dark"
      extensions={[languageExtension, runKeymap, editorTheme]}
      onChange={(v: string) => onChange(v)}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        autocompletion: true,
      }}
    />
  );
}
