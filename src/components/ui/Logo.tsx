/**
 * Marca do Bitlab.
 *
 * O símbolo é um prompt de terminal (`>_`) dentro de um selo quadrado, no
 * mesmo estilo "sticker" dos botões: borda escura grossa e sombra dura. É a
 * imagem que resume as duas matérias — em BD o aluno digita SQL num terminal,
 * em DAM ele digita Java. O losango amarelo no canto é o único enfeite, e
 * existe para o selo não ficar simétrico demais e sem graça.
 *
 * Desenhado à mão em SVG (nada de arquivo de imagem) porque assim ele herda
 * a cor do tema, fica nítido em qualquer tela e não custa uma requisição.
 */
export function Logo({
  size = "md",
  showWordmark = true,
}: {
  size?: "sm" | "md";
  showWordmark?: boolean;
}) {
  const selo = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const texto = size === "sm" ? "text-lg" : "text-2xl";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={`relative grid ${selo} shrink-0 place-items-center rounded-xl border-2 border-slate-900 bg-brand-500 shadow-[3px_3px_0_0_#0f172a]`}
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" aria-hidden>
          {/* seta do prompt */}
          <path
            d="M4 6l6 6-6 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* cursor */}
          <path d="M13 18h7" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rotate-45 rounded-[2px] border-2 border-slate-900 bg-bd-500" />
      </span>

      {showWordmark && (
        <span className={`font-heading ${texto} font-bold leading-none tracking-tight`}>
          <span className="text-slate-900">Bit</span>
          <span className="text-brand-600">lab</span>
        </span>
      )}
    </span>
  );
}
