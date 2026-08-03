-- Bitlab — a revisão precisa aparecer primeiro na lista do aluno
-- (é o que ele deve fazer agora) e as divisões por trimestre precisam ficar
-- visíveis, não escondidas atrás de um "Mês 7" genérico.
--
-- Divide o módulo único de revisão em dois, com números negativos para que
-- ordenem antes do Mês 1 sem precisar renumerar nada que já existe.
update modulos
set numero = -2, titulo = 'Revisão — 1º Trimestre',
    descricao = 'Revisão do 1º trimestre, para reforçar a base antes da prova.'
where numero = 7 and trilha_id in (select id from trilhas where slug in ('dam', 'bd'));

insert into modulos (trilha_id, numero, titulo, descricao)
select id, -1, 'Revisão — 2º Trimestre',
  'Reforço compactado do 2º trimestre, preparando para a avaliação trimestral.'
from trilhas
where slug in ('dam', 'bd')
on conflict (trilha_id, numero) do nothing;

-- A ordenação antes considerava só numero_sequencial, que é global por
-- trilha — por isso a revisão (sequencial 13-16) sempre aparecia depois do
-- Mês 1 (sequencial 1-12), mesmo pertencendo a um módulo anterior. Agora
-- ordena primeiro por mês, depois por semana e sequencial dentro do mês.
-- Precisa dropar antes de recriar porque a coluna modulo_titulo é nova —
-- Postgres não deixa um "create or replace" mudar o formato do retorno.
drop function if exists aluno_dashboard(uuid);

create function aluno_dashboard(p_aluno_id uuid)
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
  modulo_titulo text,
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
    m.titulo as modulo_titulo,
    coalesce(pa.status, 'nao_iniciada') as status
  from turma_membros tm
  join turmas t on t.id = tm.turma_id
  join trilhas tr on tr.id = t.trilha_id
  left join aulas a on a.trilha_id = tr.id and a.publicado = true
  left join modulos m on m.id = a.modulo_id
  left join progresso_aulas pa on pa.aula_id = a.id and pa.aluno_id = tm.aluno_id
  where tm.aluno_id = p_aluno_id
  order by t.nome, a.mes_numero, a.semana_numero, a.numero_sequencial;
$$;

grant execute on function aluno_dashboard(uuid) to authenticated;
