import { requireProfessor } from "@/lib/auth/dal";
import { NavBar } from "@/components/layout/NavBar";

export default async function ProfessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireProfessor();

  return (
    <div className="flex flex-1 flex-col">
      <NavBar
        fullName={user.full_name}
        links={[
          { href: "/admin/turmas", label: "Turmas" },
          { href: "/admin/curriculo/dam", label: "Currículo DAM" },
          { href: "/admin/curriculo/bd", label: "Currículo BD" },
          { href: "/admin/progresso", label: "Progresso" },
        ]}
      />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
