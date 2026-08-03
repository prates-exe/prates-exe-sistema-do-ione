-- Bitlab — prática livre de Android.
-- Mesmo padrão do code_playground_state: um espaço por aluno, sem vínculo
-- com aula nenhuma, para ele treinar layout e Activity à vontade.
create table if not exists android_playground_state (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references profiles(id) on delete cascade,
  layout_xml text not null default '',
  activity_java text not null default '',
  resultado_execucao jsonb,
  atualizado_em timestamptz not null default now(),
  unique (aluno_id)
);

alter table android_playground_state enable row level security;

create policy "android_playground_state_select" on android_playground_state
  for select using (is_professor() or aluno_id = auth.uid());
create policy "android_playground_state_write_aluno" on android_playground_state
  for insert with check (aluno_id = auth.uid());
create policy "android_playground_state_update_aluno" on android_playground_state
  for update using (aluno_id = auth.uid()) with check (aluno_id = auth.uid());
