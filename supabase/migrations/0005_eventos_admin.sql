-- Sistema do Ione — log de ações administrativas sensíveis
-- Registra criação/remoção de turmas e alunos para auditoria: quem fez o
-- quê e quando. Só a professora pode ler ou escrever nessa tabela.
create table if not exists eventos_admin (
  id uuid primary key default gen_random_uuid(),
  professor_id uuid not null references profiles(id) on delete cascade,
  acao text not null,
  detalhes jsonb,
  criado_em timestamptz not null default now()
);

alter table eventos_admin enable row level security;

create policy "eventos_admin_professor_only" on eventos_admin
  for all using (is_professor()) with check (is_professor());
