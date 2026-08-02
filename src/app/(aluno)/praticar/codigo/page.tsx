import { requireAluno } from "@/lib/auth/dal";
import { PraticaAndroid } from "@/components/sandbox/PraticaAndroid";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function PraticarAndroidPage() {
  const user = await requireAluno();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Praticar Android Studio"
        subtitle="Um espaço só seu para montar telas e treinar código, sem afetar as atividades das aulas."
      />
      <PraticaAndroid alunoId={user.id} />
    </div>
  );
}
