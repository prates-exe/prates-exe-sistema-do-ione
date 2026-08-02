-- Sistema do Ione — sandbox de Android (layout XML + Activity Java simulados)
-- Cada aluno tem seu próprio layout_xml e activity_java por aula, salvos
-- com autosave, no mesmo padrão do sandbox de código.
alter table aulas drop constraint if exists aulas_tipo_sandbox_check;
alter table aulas add constraint aulas_tipo_sandbox_check
  check (tipo_sandbox in ('sql', 'code', 'android', 'none'));

alter table aulas add column if not exists layout_inicial text;

create table if not exists android_sandbox_state (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  aula_id uuid not null references aulas(id) on delete cascade,
  layout_xml text not null default '',
  activity_java text not null default '',
  resultado_execucao jsonb,
  atualizado_em timestamptz not null default now(),
  unique (aluno_id, aula_id)
);

alter table android_sandbox_state enable row level security;

create policy "android_sandbox_state_select" on android_sandbox_state
  for select using (is_professor() or aluno_id = auth.uid());
create policy "android_sandbox_state_write_aluno" on android_sandbox_state
  for insert with check (aluno_id = auth.uid());
create policy "android_sandbox_state_update_aluno" on android_sandbox_state
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());

-- A descrição do mês 3 de DAM foi escrita antes do terminal Android existir
-- neste sistema — corrige a menção a "Android Studio de verdade".
update modulos set descricao = 'A partir daqui, o trabalho acontece no terminal Android deste sistema: layout XML e código Java reais, com uma prévia da tela ao vivo. Activities e Views.'
where numero = 3 and trilha_id in (select id from trilhas where slug = 'dam');
