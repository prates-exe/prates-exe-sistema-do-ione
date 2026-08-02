"use client";

import { useActionState, useState } from "react";
import { Check } from "lucide-react";
import { atualizarPerfil } from "@/lib/perfil/actions";
import { AVATARES } from "@/lib/perfil/avatares";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

export function PerfilForm({
  nomeExibicaoInicial,
  avatarIdInicial,
}: {
  nomeExibicaoInicial: string;
  avatarIdInicial: string;
}) {
  const [state, formAction, pending] = useActionState(atualizarPerfil, undefined);
  const [avatarSelecionado, setAvatarSelecionado] = useState(avatarIdInicial);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="nomeExibicao">Nome de exibição</Label>
        <Input
          id="nomeExibicao"
          name="nomeExibicao"
          defaultValue={nomeExibicaoInicial}
          maxLength={30}
          required
        />
        <p className="mt-1 text-xs text-slate-400">
          Como você aparece no site para você e para a professora. Seu usuário de login não muda.
        </p>
      </div>

      <div>
        <Label>Avatar</Label>
        <input type="hidden" name="avatarId" value={avatarSelecionado} />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {AVATARES.map((avatar) => {
            const selecionado = avatar.id === avatarSelecionado;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setAvatarSelecionado(avatar.id)}
                aria-label={avatar.label}
                aria-pressed={selecionado}
                className={`relative flex aspect-square items-center justify-center rounded-xl border-2 border-slate-900 transition-transform hover:-translate-y-0.5 ${avatar.bg} ${avatar.fg} ${
                  selecionado ? "ring-4 ring-brand-500 ring-offset-2" : ""
                }`}
              >
                <avatar.Icon className="h-6 w-6" />
                {selecionado && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900 bg-white">
                    <Check className="h-3 w-3 text-slate-900" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Salvando…" : "Salvar perfil"}
      </Button>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-emerald-600">Perfil atualizado.</p>}
    </form>
  );
}
