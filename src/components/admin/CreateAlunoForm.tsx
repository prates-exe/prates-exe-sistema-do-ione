"use client";

import { useActionState } from "react";
import { createAluno } from "@/lib/admin/actions";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function CreateAlunoForm({ turmaId }: { turmaId: string }) {
  const [state, formAction, pending] = useActionState(createAluno, undefined);

  return (
    <div className="space-y-3">
      <form action={formAction} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="turma_id" value={turmaId} />
        <div>
          <Label htmlFor="full_name">Nome completo</Label>
          <Input id="full_name" name="full_name" required className="w-56" />
        </div>
        <div>
          <Label htmlFor="username">Usuário</Label>
          <Input id="username" name="username" required placeholder="ex.: joao.silva" className="w-56" />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Criando…" : "Criar aluno"}
        </Button>
      </form>

      {state && "error" in state && <p className="text-sm text-red-600">{state.error}</p>}

      {state && "success" in state && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          <p className="font-medium">Aluno criado. Anote e repasse esses dados agora — eles não aparecem de novo:</p>
          <p className="mt-1">
            Usuário: <span className="font-mono">{state.username}</span>
          </p>
          <p>
            Senha provisória: <span className="font-mono">{state.senha}</span>
          </p>
        </div>
      )}
    </div>
  );
}
