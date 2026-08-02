import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Painel da professora" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/turmas">
          <Card
            className="border-l-[6px] border-l-brand-500 p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]"
            style={{ backgroundColor: "var(--color-brand-50)" }}
          >
            <p className="font-heading font-bold text-slate-900">Turmas e alunos</p>
            <p className="text-sm text-slate-600">Criar turmas, cadastrar alunos, gerenciar acessos.</p>
          </Card>
        </Link>
        <Link href="/admin/progresso">
          <Card
            className="border-l-[6px] border-l-dam-500 p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(15,23,42,0.15)]"
            style={{ backgroundColor: "var(--color-dam-50)" }}
          >
            <p className="font-heading font-bold text-slate-900">Progresso dos alunos</p>
            <p className="text-sm text-slate-600">Acompanhar aulas, exercícios e quizzes concluídos.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
