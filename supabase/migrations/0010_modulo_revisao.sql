-- Bitlab — módulo de revisão/reforço para a prova trimestral.
-- Criado à parte dos módulos 1-6 (que seguem o currículo do zero deste
-- sistema) porque este é conteúdo emergencial: revisão do 1º trimestre e
-- reforço compactado do 2º trimestre, baseado no material real da escola,
-- com prazo até 15/08.
insert into modulos (trilha_id, numero, titulo, descricao)
select id, 7, 'Revisão — Reforço para a prova trimestral',
  'Revisão do 1º trimestre e reforço compactado do 2º trimestre, preparando para a avaliação trimestral.'
from trilhas
where slug in ('dam', 'bd')
on conflict (trilha_id, numero) do nothing;
