import { requireAluno } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { NavBar } from "@/components/layout/NavBar";

export default async function AlunoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAluno();
  const supabase = await createClient();

  const { data: trilhas } = await supabase.rpc("aluno_trilhas", { p_aluno_id: user.id });
  const slugs = new Set(trilhas?.map((t) => t.slug));

  const links = [{ href: "/dashboard", label: "Minhas matérias" }];
  if (slugs.has("bd")) links.push({ href: "/praticar/sql", label: "Praticar SQL" });
  if (slugs.has("dam")) links.push({ href: "/praticar/codigo", label: "Praticar Android" });
  links.push({ href: "/perfil", label: "Meu perfil" });

  return (
    <div className="flex flex-1 flex-col">
      <NavBar
        fullName={user.nome_exibicao || user.full_name}
        avatarId={user.avatar_id}
        links={links}
      />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
