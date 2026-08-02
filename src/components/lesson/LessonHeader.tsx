import { Badge } from "@/components/ui/Badge";

const STATUS_CONFIG: Record<string, { label: string; variant: "neutral" | "info" | "success" }> = {
  nao_iniciada: { label: "Não iniciada", variant: "neutral" },
  em_andamento: { label: "Em andamento", variant: "info" },
  concluida: { label: "Concluída", variant: "success" },
};

export function LessonHeader({
  titulo,
  duracaoMinutos,
  status,
}: {
  titulo: string;
  duracaoMinutos: number;
  status: string;
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.nao_iniciada;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">{titulo}</h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">{duracaoMinutos} min</span>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
    </div>
  );
}
