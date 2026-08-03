"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";
import { getAvatar } from "@/lib/perfil/avatares";
import { Logo } from "@/components/ui/Logo";

/**
 * Barra de navegação comum ao aluno e ao professor. Os links vêm de fora
 * porque cada papel enxerga um conjunto diferente de páginas.
 *
 * Layout em duas faixas em telas estreitas (celular do aluno) e uma só a
 * partir de `sm`. Antes os links quebravam em três ou quatro linhas e a barra
 * comia metade da tela do celular; agora eles ficam numa faixa própria que
 * rola na horizontal.
 */
export function NavBar({
  fullName,
  avatarId,
  links,
}: {
  fullName: string;
  avatarId?: string | null;
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  const avatar = avatarId !== undefined ? getAvatar(avatarId) : null;
  // Só o primeiro nome cabe no celular; o nome completo aparece no desktop.
  const primeiroNome = fullName.split(" ")[0];

  return (
    <header className="sticky top-0 z-30 border-b-2 border-slate-900 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link href="/" className="shrink-0" aria-label="Bitlab — início">
            <Logo size="sm" />
          </Link>

          {/* Links no desktop: ao lado da marca. */}
          <nav className="hidden flex-1 gap-1 sm:flex">
            {links.map((link) => (
              <NavLink key={link.href} {...link} ativo={pathname === link.href} />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 text-sm">
            {avatar && (
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 border-slate-900 ${avatar.bg} ${avatar.fg}`}
              >
                <avatar.Icon className="h-4 w-4" />
              </span>
            )}
            <span className="hidden text-slate-600 md:inline">{primeiroNome}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg px-2 py-1 font-semibold text-slate-500 hover:bg-slate-100 hover:text-brand-600"
              >
                Sair
              </button>
            </form>
          </div>
        </div>

        {/* Links no celular: faixa própria que rola na horizontal. */}
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 sm:hidden [scrollbar-width:none]">
          {links.map((link) => (
            <NavLink key={link.href} {...link} ativo={pathname === link.href} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, label, ativo }: { href: string; label: string; ativo: boolean }) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "page" : undefined}
      className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
        ativo
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}
