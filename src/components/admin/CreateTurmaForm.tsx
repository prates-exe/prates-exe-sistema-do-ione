"use client";

import { useActionState } from "react";
import { createTurma } from "@/lib/admin/actions";
import { Input, Select, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function CreateTurmaForm() {
  const [state, formAction, pending] = useActionState(createTurma, undefined);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <Label htmlFor="nome">Nome da turma</Label>
        <Input id="nome" name="nome" required placeholder="Ex.: BD - Turma 2026A" className="w-56" />
      </div>
      <div>
        <Label htmlFor="trilha_slug">Curso</Label>
        <Select id="trilha_slug" name="trilha_slug" required className="w-56">
          <option value="dam">Desenvolvimento de Aplicativos</option>
          <option value="bd">Banco de Dados</option>
        </Select>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Criando…" : "Criar turma"}
      </Button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="w-full text-sm text-emerald-700">{state.success}</p>}
    </form>
  );
}
