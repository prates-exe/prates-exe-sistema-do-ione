"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marcarMaterialVisualizado } from "@/lib/progress/actions";

export function MaterialPanel({
  aulaId,
  conteudoMd,
}: {
  aulaId: string;
  conteudoMd: string;
}) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const marcadoRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !marcadoRef.current) {
          marcadoRef.current = true;
          marcarMaterialVisualizado(aulaId);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [aulaId]);

  return (
    <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.03] prose-headings:font-semibold prose-a:text-brand-600 prose-code:text-dam-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{conteudoMd}</ReactMarkdown>
      <div ref={sentinelRef} aria-hidden className="h-1" />
    </article>
  );
}
