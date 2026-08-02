-- Sistema do Ione — schema inicial
-- Rode este arquivo no SQL Editor do Supabase (Project > SQL Editor > New query),
-- depois 0002_rls_policies.sql e por fim 0003_seed_trilhas.sql, nessa ordem.

create extension if not exists "pgcrypto";

-- profiles espelha auth.users e guarda o papel (professor/aluno) e o nome
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('professor','aluno')) default 'aluno',
  created_at timestamptz not null default now()
);

-- Cria automaticamente uma linha em profiles quando um usuário é criado no Auth.
-- full_name e role vêm de raw_user_meta_data (definidos na criação do usuário).
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Sem nome'),
    coalesce(new.raw_user_meta_data ->> 'role', 'aluno')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- trilhas / modulos: os 2 cursos e seus 6 meses
create table if not exists trilhas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug in ('dam','bd')),
  nome text not null,
  descricao text,
  created_at timestamptz not null default now()
);

create table if not exists modulos (
  id uuid primary key default gen_random_uuid(),
  trilha_id uuid not null references trilhas(id) on delete cascade,
  numero int not null,
  titulo text not null,
  descricao text,
  unique (trilha_id, numero)
);

-- turmas / turma_membros
create table if not exists turmas (
  id uuid primary key default gen_random_uuid(),
  trilha_id uuid not null references trilhas(id),
  nome text not null,
  ativa boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists turma_membros (
  id uuid primary key default gen_random_uuid(),
  turma_id uuid not null references turmas(id) on delete cascade,
  aluno_id uuid not null references profiles(id) on delete cascade,
  criado_em timestamptz not null default now(),
  unique (turma_id, aluno_id)
);

-- aulas
create table if not exists aulas (
  id uuid primary key default gen_random_uuid(),
  trilha_id uuid not null references trilhas(id),
  modulo_id uuid not null references modulos(id),
  mes_numero int not null,
  semana_numero int not null,
  numero_sequencial int not null,
  titulo text not null,
  duracao_minutos int not null default 50,
  tipo_sandbox text not null check (tipo_sandbox in ('sql','code','none')),
  conteudo_md text not null default '',
  exercicio_inicial text,
  solucao_referencia text,
  publicado boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (trilha_id, numero_sequencial)
);

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists aulas_set_updated_at on aulas;
create trigger aulas_set_updated_at
  before update on aulas
  for each row execute function set_updated_at();

-- quizzes / tentativas
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  aula_id uuid not null references aulas(id) on delete cascade,
  titulo text not null,
  perguntas jsonb not null,
  nota_minima_aprovacao numeric not null default 60,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (aula_id)
);

drop trigger if exists quizzes_set_updated_at on quizzes;
create trigger quizzes_set_updated_at
  before update on quizzes
  for each row execute function set_updated_at();

create table if not exists quiz_tentativas (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  aluno_id uuid not null references profiles(id) on delete cascade,
  respostas jsonb not null,
  nota numeric not null,
  acertos int not null,
  total int not null,
  tentativa_numero int not null,
  concluida_em timestamptz not null default now()
);

-- sandbox SQL (um banco por aluno por trilha, separado em curso/livre)
create table if not exists sql_sandbox_state (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  trilha_id uuid not null references trilhas(id),
  contexto text not null check (contexto in ('curso','livre')) default 'curso',
  db_snapshot text,
  tamanho_bytes int,
  atualizado_em timestamptz not null default now(),
  unique (aluno_id, trilha_id, contexto)
);

create table if not exists sql_query_history (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  aula_id uuid references aulas(id),
  query_sql text not null,
  sucesso boolean not null,
  mensagem_erro text,
  executado_em timestamptz not null default now()
);

-- sandbox de código (Java, DAM meses 1-2)
create table if not exists code_sandbox_state (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  aula_id uuid not null references aulas(id) on delete cascade,
  codigo text not null default '',
  resultado_execucao jsonb,
  atualizado_em timestamptz not null default now(),
  unique (aluno_id, aula_id)
);

create table if not exists code_playground_state (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  codigo text not null default '',
  atualizado_em timestamptz not null default now(),
  unique (aluno_id)
);

-- progresso
create table if not exists progresso_aulas (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  aula_id uuid not null references aulas(id) on delete cascade,
  status text not null check (status in ('nao_iniciada','em_andamento','concluida')) default 'nao_iniciada',
  material_visualizado boolean not null default false,
  exercicio_completo boolean not null default false,
  quiz_completo boolean not null default false,
  primeira_visita_em timestamptz,
  concluida_em timestamptz,
  unique (aluno_id, aula_id)
);
