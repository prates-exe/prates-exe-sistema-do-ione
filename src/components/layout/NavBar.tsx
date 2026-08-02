"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth/actions";
import { getAvatar } from "@/lib/perfil/avatares";

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

  return (
    <header className="border-b-2 border-slate-900 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="font-heading mr-4 text-lg font-bold text-brand-600">
            Sistema do Ione
          </Link>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          {avatar && (
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg border-2 border-slate-900 ${avatar.bg} ${avatar.fg}`}
            >
              <avatar.Icon className="h-4 w-4" />
            </span>
          )}
          <span className="hidden sm:inline">{fullName}</span>
          <form action={logout}>
            <button type="submit" className="font-semibold text-slate-500 hover:text-brand-600">
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
