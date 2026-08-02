import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database.types";

// Cliente com a service-role key: ignora RLS por completo.
// Só pode ser importado por Server Actions/Route Handlers de administração
// (ex.: criar usuário de aluno). O `import "server-only"` acima faz o build
// falhar se algum componente cliente importar este arquivo por engano.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
