-- Sistema do Ione — seed das trilhas e módulos (meses)
-- Rode depois de 0002_rls_policies.sql. Idempotente (on conflict do nothing).

insert into trilhas (slug, nome, descricao) values
  ('dam', 'Desenvolvimento de Aplicativos', 'Curso de 6 meses: interface do Android Studio, fundamentos de Java e desenvolvimento de apps Android do zero.'),
  ('bd',  'Banco de Dados', 'Curso de 6 meses: modelagem e SQL do zero, com terminal de banco de dados embutido.')
on conflict (slug) do nothing;

insert into modulos (trilha_id, numero, titulo, descricao)
select t.id, m.numero, m.titulo, m.descricao
from trilhas t
join (values
  (1, 'Mês 1 — Interface do Android Studio e primeiros passos em Java', 'Instalação, projetos, layouts básicos; variáveis, tipos e operadores em Java.'),
  (2, 'Mês 2 — Lógica de programação em Java', 'Condicionais, laços de repetição, métodos, listas — ainda com editor de código embutido.'),
  (3, 'Mês 3 — Primeiro app Android real', 'A partir daqui, o trabalho acontece no Android Studio de verdade. Activities e Views.'),
  (4, 'Mês 4 — Navegação e dados no app', 'Múltiplas telas, Intents, passagem de dados entre telas.'),
  (5, 'Mês 5 — Persistência e listas', 'RecyclerView, salvar dados localmente.'),
  (6, 'Mês 6 — Projeto final', 'Aplicação completa integrando os conceitos do curso.')
) as m(numero, titulo, descricao) on true
where t.slug = 'dam'
on conflict (trilha_id, numero) do nothing;

insert into modulos (trilha_id, numero, titulo, descricao)
select t.id, m.numero, m.titulo, m.descricao
from trilhas t
join (values
  (1, 'Mês 1 — Fundamentos: tabelas, inserção e consulta', 'CREATE TABLE, INSERT, SELECT, WHERE, ORDER BY no terminal SQL.'),
  (2, 'Mês 2 — Filtros e funções', 'Operadores lógicos, funções de agregação, GROUP BY.'),
  (3, 'Mês 3 — Relacionamentos', 'Chaves primárias e estrangeiras, JOINs.'),
  (4, 'Mês 4 — Atualização e integridade', 'UPDATE, DELETE, constraints, transações.'),
  (5, 'Mês 5 — Modelagem de banco de dados', 'Modelo entidade-relacionamento, normalização.'),
  (6, 'Mês 6 — Projeto final', 'Modelagem e construção de um banco de dados completo.')
) as m(numero, titulo, descricao) on true
where t.slug = 'bd'
on conflict (trilha_id, numero) do nothing;
