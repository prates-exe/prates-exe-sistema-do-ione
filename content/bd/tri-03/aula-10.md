---
titulo: "Projeto integrador 3: consultas e relatórios"
mes_numero: 3
numero_sequencial: 22
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Projeto Integrador — Parte 3: RELATORIOS
  -- Agora o banco vai responder perguntas de negocio.
criterios_validacao:
  - descricao: "Criar a view rel_locacoes_completo (relatório com nomes, não ids)"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rel_locacoes_completo')"
    dica: "CREATE VIEW rel_locacoes_completo AS SELECT c.nome AS cliente, j.titulo AS jogo, l.data_locacao AS data, l.dias * j.valor_diaria AS total FROM loc_locacoes l INNER JOIN loc_clientes c ON l.cliente_id = c.id INNER JOIN loc_jogos j ON l.jogo_id = j.id;"
  - descricao: "A view deve calcular o valor total (dias x diária)"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('rel_locacoes_completo') WHERE name = 'total')"
    dica: "Inclua uma coluna calculada: l.dias * j.valor_diaria AS total"
  - descricao: "Criar a view rel_ranking_clientes com o total gasto por cliente"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rel_ranking_clientes')"
    dica: "CREATE VIEW rel_ranking_clientes AS SELECT c.nome AS cliente, COUNT(*) AS locacoes, SUM(l.dias * j.valor_diaria) AS gasto FROM loc_locacoes l INNER JOIN loc_clientes c ON l.cliente_id=c.id INNER JOIN loc_jogos j ON l.jogo_id=j.id GROUP BY c.nome;"
  - descricao: "Criar a view rel_jogos_sem_locacao usando LEFT JOIN"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rel_jogos_sem_locacao')"
    dica: "CREATE VIEW rel_jogos_sem_locacao AS SELECT j.titulo FROM loc_jogos j LEFT JOIN loc_locacoes l ON l.jogo_id = j.id WHERE l.id IS NULL;"
  - descricao: "A view de jogos sem locação deve encontrar o jogo parado"
    sql: "SELECT (SELECT COUNT(*) FROM rel_jogos_sem_locacao) >= 1"
    dica: "Se veio vazia, confira se você deixou um jogo sem nenhuma locação na aula anterior."
quiz:
  titulo: "Quiz — Relatórios do projeto"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que um relatório deve mostrar nomes em vez de ids?"
      opcoes:
        - { id: a, texto: "Porque quem lê o relatório precisa entender a informação, e ids não significam nada para ele" }
        - { id: b, texto: "Porque ids não podem ser exibidos" }
        - { id: c, texto: "Porque nomes ocupam menos espaço" }
        - { id: d, texto: "Não faz diferença" }
      resposta_correta: a
      explicacao: "É exatamente para isso que fazemos o JOIN na hora da consulta."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Como calcular o valor total de uma locação?"
      opcoes:
        - { id: a, texto: "Multiplicando os dias pelo valor da diária do jogo, em uma coluna calculada" }
        - { id: b, texto: "Guardando o total em uma coluna fixa desde o início" }
        - { id: c, texto: "Não é possível calcular em SQL" }
        - { id: d, texto: "Somando dias e diária" }
      resposta_correta: a
      explicacao: "Calcular na consulta evita redundância e garante que o valor esteja sempre correto."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Quantos JOINs são necessários para mostrar cliente e jogo na mesma linha?"
      opcoes:
        - { id: a, texto: "Dois — da tabela de locações para clientes e para jogos" }
        - { id: b, texto: "Um só" }
        - { id: c, texto: "Nenhum" }
        - { id: d, texto: "Três" }
      resposta_correta: a
      explicacao: "Parte-se da associativa e liga-se aos dois lados."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para montar um ranking de clientes por gasto, o que se combina?"
      opcoes:
        - { id: a, texto: "JOIN, GROUP BY por cliente, SUM do valor e ORDER BY decrescente" }
        - { id: b, texto: "Apenas ORDER BY" }
        - { id: c, texto: "Apenas WHERE" }
        - { id: d, texto: "DELETE com WHERE" }
      resposta_correta: a
      explicacao: "Cada recurso resolve uma parte: juntar, agrupar, somar e ordenar."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual recurso encontra os jogos que nunca foram alugados?"
      opcoes:
        - { id: a, texto: "LEFT JOIN combinado com IS NULL" }
        - { id: b, texto: "INNER JOIN" }
        - { id: c, texto: "GROUP BY sozinho" }
        - { id: d, texto: "DROP TABLE" }
      resposta_correta: a
      explicacao: "O INNER JOIN esconderia exatamente esses jogos."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que colocar os relatórios em views em vez de reescrever as consultas?"
      opcoes:
        - { id: a, texto: "Para reaproveitar por um nome simples e corrigir a regra em um lugar só" }
        - { id: b, texto: "Para o banco ficar menor" }
        - { id: c, texto: "Porque consultas não podem ser repetidas" }
        - { id: d, texto: "Não há motivo" }
      resposta_correta: a
      explicacao: "É o principal uso de views em sistemas reais: relatórios recorrentes."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que uma coluna calculada como 'l.dias * j.valor_diaria AS total' faz?"
      opcoes:
        - { id: a, texto: "Cria uma coluna no RESULTADO, calculada na hora, sem existir na tabela" }
        - { id: b, texto: "Adiciona a coluna total na tabela permanentemente" }
        - { id: c, texto: "Apaga as colunas originais" }
        - { id: d, texto: "Dá erro" }
      resposta_correta: a
      explicacao: "Ela existe só no resultado da consulta — as tabelas continuam iguais."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual pergunta de negócio o relatório de 'jogos sem locação' responde?"
      opcoes:
        - { id: a, texto: "Quais produtos estão parados no estoque, sem gerar receita" }
        - { id: b, texto: "Quem é o melhor cliente" }
        - { id: c, texto: "Qual o faturamento total" }
        - { id: d, texto: "Quantos clientes existem" }
      resposta_correta: a
      explicacao: "É informação que orienta decisões: promover, remover ou substituir esses títulos."
---

## O banco começa a responder

Estrutura pronta, dados carregados. Agora vem a parte que justifica todo o resto: **transformar
dados em informação**.

Um banco de dados só tem valor quando responde às **perguntas do negócio**. Para a locadora, as
perguntas são:

1. Quais locações aconteceram, e quanto cada uma custou?
2. Quem são os melhores clientes?
3. Quais jogos rendem mais?
4. **Quais jogos estão parados, sem nunca terem sido alugados?**

Cada pergunta vira uma consulta — e cada consulta vira uma **view**, para poder ser reaproveitada.

## Relatório 1: a agenda completa

O problema: a tabela de locações guarda `cliente_id = 3` e `jogo_id = 5`. Ninguém entende isso.
O relatório precisa mostrar **nomes** — e é para isso que existem os JOINs.

```sql
CREATE VIEW rel_locacoes_completo AS
SELECT
  c.nome          AS cliente,
  j.titulo        AS jogo,
  l.data_locacao  AS data,
  l.dias * j.valor_diaria AS total
FROM loc_locacoes l
INNER JOIN loc_clientes c ON l.cliente_id = c.id
INNER JOIN loc_jogos    j ON l.jogo_id    = j.id;
```

Duas novidades importantes aqui:

**Apelidos de tabela.** Repare no `loc_locacoes l` — o `l` é um apelido curto que deixa a consulta
muito mais legível. Em vez de escrever `loc_locacoes.cliente_id`, escrevemos `l.cliente_id`. Isso
é padrão em consultas com JOIN.

**Coluna calculada.** `l.dias * j.valor_diaria AS total` cria uma coluna **que não existe em
nenhuma tabela** — ela é calculada na hora da consulta. Guardar o total em uma coluna fixa seria
redundância: se a diária mudar, o total ficaria errado.

## Relatório 2: ranking de clientes

```sql
CREATE VIEW rel_ranking_clientes AS
SELECT
  c.nome AS cliente,
  COUNT(*) AS locacoes,
  SUM(l.dias * j.valor_diaria) AS gasto
FROM loc_locacoes l
INNER JOIN loc_clientes c ON l.cliente_id = c.id
INNER JOIN loc_jogos    j ON l.jogo_id    = j.id
GROUP BY c.nome;
```

Aqui quatro recursos trabalham juntos: **JOIN** traz os nomes, **GROUP BY** agrupa por cliente,
**COUNT** conta as locações e **SUM** soma os valores.

Para usar:

```sql
SELECT * FROM rel_ranking_clientes ORDER BY gasto DESC;
```

## Relatório 3: o que está parado

Este é o mais valioso do ponto de vista de negócio — e o único que **exige `LEFT JOIN`**:

```sql
CREATE VIEW rel_jogos_sem_locacao AS
SELECT j.titulo
FROM loc_jogos j
LEFT JOIN loc_locacoes l ON l.jogo_id = j.id
WHERE l.id IS NULL;
```

Com `INNER JOIN`, esses jogos **nunca apareceriam** — e é justamente sobre eles que o dono da
locadora precisa decidir: promover, baixar o preço ou tirar do catálogo.

Repare como o caso extremo que você planejou na aula passada (deixar um jogo sem locação) agora
tem uma finalidade concreta.

## Atividade

**Passo 1.** Crie a view `rel_locacoes_completo`, com cliente, jogo, data e o **total calculado**
(dias × valor da diária). Use apelidos de tabela.

**Passo 2.** Consulte:

```sql
SELECT * FROM rel_locacoes_completo ORDER BY total DESC;
```

**Passo 3.** Crie a view `rel_ranking_clientes`, com nome, quantidade de locações e total gasto.

**Passo 4.** Descubra o melhor cliente:

```sql
SELECT * FROM rel_ranking_clientes ORDER BY gasto DESC;
```

**Passo 5.** Crie a view `rel_jogos_sem_locacao` com `LEFT JOIN` e `IS NULL`, e confira qual jogo
está parado.

**Passo 6.** Responda mais estas perguntas (não entram no checklist, mas fazem parte do projeto):

```sql
-- Faturamento por plataforma
SELECT j.plataforma, SUM(l.dias * j.valor_diaria) AS receita
FROM loc_locacoes l
INNER JOIN loc_jogos j ON l.jogo_id = j.id
GROUP BY j.plataforma
ORDER BY receita DESC;

-- Media de dias por locacao
SELECT AVG(dias) FROM loc_locacoes;

-- Clientes acima do gasto medio (subconsulta!)
SELECT cliente, gasto
FROM rel_ranking_clientes
WHERE gasto > (SELECT AVG(gasto) FROM rel_ranking_clientes);
```

Repare no último: você está usando uma **subconsulta sobre uma view**. Tudo que aprendeu se
combina.

## Desafio extra

1. Qual **jogo** deu mais receita? (JOIN + GROUP BY por título + SUM + ORDER BY)
2. Qual **cidade** tem os clientes que mais gastam?
3. Existe algum **cliente que nunca alugou**? Use `LEFT JOIN` + `IS NULL`, agora do lado dos
   clientes.
4. Crie uma view `rel_resumo_geral` com os números principais da locadora: total de clientes,
   total de jogos, total de locações e faturamento.
