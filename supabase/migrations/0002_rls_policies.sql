-- Sistema do Ione — Row Level Security
-- Rode depois de 0001_init_schema.sql

-- helper: is_professor() — SECURITY DEFINER evita recursão de policy em profiles
create or replace function is_professor()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'professor'
  );
$$;

create or replace function is_membro_turma(p_trilha_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from turma_membros tm
    join turmas t on t.id = tm.turma_id
    where tm.aluno_id = auth.uid()
      and t.trilha_id = p_trilha_id
  );
$$;

alter table profiles enable row level security;
alter table trilhas enable row level security;
alter table modulos enable row level security;
alter table turmas enable row level security;
alter table turma_membros enable row level security;
alter table aulas enable row level security;
alter table quizzes enable row level security;
alter table quiz_tentativas enable row level security;
alter table sql_sandbox_state enable row level security;
alter table sql_query_history enable row level security;
alter table code_sandbox_state enable row level security;
alter table code_playground_state enable row level security;
alter table progresso_aulas enable row level security;

-- profiles
create policy "profiles_select_own_or_professor" on profiles
  for select using (id = auth.uid() or is_professor());

-- trilhas / modulos — leitura para todos autenticados, escrita só professor
create policy "trilhas_select_all" on trilhas
  for select using (auth.uid() is not null);
create policy "trilhas_write_professor" on trilhas
  for all using (is_professor()) with check (is_professor());

create policy "modulos_select_all" on modulos
  for select using (auth.uid() is not null);
create policy "modulos_write_professor" on modulos
  for all using (is_professor()) with check (is_professor());

-- turmas
create policy "turmas_select_professor_or_membro" on turmas
  for select using (
    is_professor()
    or exists (
      select 1 from turma_membros tm
      where tm.turma_id = turmas.id and tm.aluno_id = auth.uid()
    )
  );
create policy "turmas_write_professor" on turmas
  for all using (is_professor()) with check (is_professor());

-- turma_membros
create policy "turma_membros_select_professor_or_proprio" on turma_membros
  for select using (is_professor() or aluno_id = auth.uid());
create policy "turma_membros_write_professor" on turma_membros
  for all using (is_professor()) with check (is_professor());

-- aulas — aluno só vê aulas publicadas da trilha da sua turma
create policy "aulas_select_professor" on aulas
  for select using (is_professor());
create policy "aulas_select_aluno_publicada" on aulas
  for select using (publicado = true and is_membro_turma(trilha_id));
create policy "aulas_write_professor" on aulas
  for all using (is_professor()) with check (is_professor());

-- quizzes: só professor lê/escreve direto na tabela. O conteúdo sem gabarito
-- chega ao aluno via Server Action (lib/quiz/actions.ts).
create policy "quizzes_professor_only" on quizzes
  for all using (is_professor()) with check (is_professor());

-- quiz_tentativas: aluno insere e lê as próprias, sem editar/apagar depois de
-- enviado; professor só lê (acompanhamento).
create policy "quiz_tentativas_select" on quiz_tentativas
  for select using (is_professor() or aluno_id = auth.uid());
create policy "quiz_tentativas_insert_aluno" on quiz_tentativas
  for insert with check (aluno_id = auth.uid());

-- sandbox SQL
create policy "sql_sandbox_state_select" on sql_sandbox_state
  for select using (is_professor() or aluno_id = auth.uid());
create policy "sql_sandbox_state_write_aluno" on sql_sandbox_state
  for insert with check (aluno_id = auth.uid());
create policy "sql_sandbox_state_update_aluno" on sql_sandbox_state
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());

create policy "sql_query_history_select" on sql_query_history
  for select using (is_professor() or aluno_id = auth.uid());
create policy "sql_query_history_insert_aluno" on sql_query_history
  for insert with check (aluno_id = auth.uid());

-- sandbox de código
create policy "code_sandbox_state_select" on code_sandbox_state
  for select using (is_professor() or aluno_id = auth.uid());
create policy "code_sandbox_state_write_aluno" on code_sandbox_state
  for insert with check (aluno_id = auth.uid());
create policy "code_sandbox_state_update_aluno" on code_sandbox_state
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());

create policy "code_playground_state_select" on code_playground_state
  for select using (is_professor() or aluno_id = auth.uid());
create policy "code_playground_state_write_aluno" on code_playground_state
  for insert with check (aluno_id = auth.uid());
create policy "code_playground_state_update_aluno" on code_playground_state
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());

-- progresso_aulas
create policy "progresso_aulas_select" on progresso_aulas
  for select using (is_professor() or aluno_id = auth.uid());
create policy "progresso_aulas_write_aluno" on progresso_aulas
  for insert with check (aluno_id = auth.uid());
create policy "progresso_aulas_update_aluno" on progresso_aulas
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());
