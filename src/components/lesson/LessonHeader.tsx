import { Badge } from "@/components/ui/Badge";
import { STATUS_AULA, normalizarStatus } from "@/lib/progress/status";

export function LessonHeader({
  titulo,
  duracaoMinutos,
  status,
}: {
  titulo: string;
  duracaoMinutos: number;
  status: string;
}) {
  const config = STATUS_AULA[normalizarStatus(status)];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h1 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {titulo}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">{duracaoMinutos} min</span>
        <Badge variant={config.badge}>{config.label}</Badge>
      </div>
    </div>
  );
}
