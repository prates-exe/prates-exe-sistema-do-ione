"use client";

import { useActionState } from "react";
import { login } from "@/lib/auth/actions";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-brand-600">Sistema do Ione</h1>
          <p className="mt-1 text-sm text-slate-500">Aplicativos e Banco de Dados.</p>
        </div>

        <Card className="overflow-hidden border-slate-900/20 shadow-[4px_4px_0_0_#0f172a1a]">
          <div className="h-1.5 bg-gradient-to-r from-dam-500 via-brand-500 to-bd-500" />
          <CardBody>
            <form action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="identifier">Usuário ou e-mail</Label>
                <Input id="identifier" name="identifier" autoComplete="username" required />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>

              {state?.error && (
                <p className="text-sm text-red-600" role="alert">
                  {state.error}
                </p>
              )}

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Entrando…" : "Entrar"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
