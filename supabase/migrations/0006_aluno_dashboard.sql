-- Bitlab — junta em uma única consulta tudo que o painel do aluno
-- precisa (turmas, aulas publicadas e progresso). Antes disso, a mesma tela
-- fazia até 4 consultas separadas ao banco, uma esperando a outra terminar
-- para começar — cada uma soma o tempo de ida e volta até o Supabase, e
-- juntas deixavam a troca de página visivelmente lenta.
create or replace function aluno_dashboard(p_aluno_id uuid)
returns table (
  turma_id uuid,
  turma_nome text,
  trilha_id uuid,
  trilha_slug text,
  aula_id uuid,
  aula_titulo text,
  mes_numero int,
  semana_numero int,
  numero_sequencial int,
  status text
)
language sql
stable
as $$
  select
    t.id as turma_id,
    t.nome as turma_nome,
    tr.id as trilha_id,
    tr.slug as trilha_slug,
    a.id as aula_id,
    a.titulo as aula_titulo,
    a.mes_numero,
    a.semana_numero,
    a.numero_sequencial,
    coalesce(pa.status, 'nao_iniciada') as status
  from turma_membros tm
  join turmas t on t.id = tm.turma_id
  join trilhas tr on tr.id = t.trilha_id
  left join aulas a on a.trilha_id = tr.id and a.publicado = true
  left join progresso_aulas pa on pa.aula_id = a.id and pa.aluno_id = tm.aluno_id
  where tm.aluno_id = p_aluno_id
  order by t.nome, a.numero_sequencial;
$$;

grant execute on function aluno_dashboard(uuid) to authenticated;

-- Mesma ideia para o menu (NavBar): antes eram 3 consultas em sequência só
-- para saber em quais trilhas o aluno está, toda vez que ele troca de
-- página (o layout roda de novo a cada navegação).
create or replace function aluno_trilhas(p_aluno_id uuid)
returns table (slug text)
language sql
stable
as $$
  select distinct tr.slug
  from turma_membros tm
  join turmas t on t.id = tm.turma_id
  join trilhas tr on tr.id = t.trilha_id
  where tm.aluno_id = p_aluno_id;
$$;

grant execute on function aluno_trilhas(uuid) to authenticated;

-- Usado nas páginas de prática livre (SQL e Java): antes eram 3 consultas em
-- sequência só para achar o id da trilha à qual o aluno pertence.
create or replace function trilha_do_aluno(p_aluno_id uuid, p_slug text)
returns uuid
language sql
stable
as $$
  select tr.id
  from turma_membros tm
  join turmas t on t.id = tm.turma_id
  join trilhas tr on tr.id = t.trilha_id
  where tm.aluno_id = p_aluno_id and tr.slug = p_slug
  limit 1;
$$;

grant execute on function trilha_do_aluno(uuid, text) to authenticated;
