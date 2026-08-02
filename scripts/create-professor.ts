// Cria a primeira conta de professor(a) — rode isso só uma vez, depois de
// configurar o Supabase. Não existe cadastro público no sistema por design,
// então essa é a única forma de criar o primeiro acesso.
//
// Uso: npm run create-professor -- "seu@email.com" "sua-senha" "Seu Nome"
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/lib/types/database.types";

const [email, senha, nome] = process.argv.slice(2);

if (!email || !senha || !nome) {
  console.error(
    'Uso: npm run create-professor -- "seu@email.com" "sua-senha" "Seu Nome"'
  );
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local antes de rodar este script."
  );
  process.exit(1);
}

const supabase = createClient<Database>(url, serviceKey);

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: { full_name: nome, role: "professor" },
  });

  if (error) {
    console.error("Erro ao criar professor(a):", error.message);
    process.exit(1);
  }

  console.log(`Professor(a) criado(a) com sucesso: ${data.user?.email}`);
  console.log("Já pode fazer login em /login com esse e-mail e senha.");
}

main();
