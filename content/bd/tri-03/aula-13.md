---
titulo: "Projeto integrador 5: documentação e apresentação"
mes_numero: 3
numero_sequencial: 25
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Projeto Integrador — Parte 5: DOCUMENTACAO
  -- Escreva aqui o script final do projeto, documentado do inicio ao fim.
  -- Use comentarios de secao, como mostra o material.
  --
  -- ============================================================
  -- PROJETO: Locadora de Jogos
  -- Autor(a):
  -- Data:
  -- ============================================================
criterios_validacao:
  - descricao: "Criar a view rel_resumo_geral com os números do projeto"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rel_resumo_geral')"
    dica: "CREATE VIEW rel_resumo_geral AS SELECT (SELECT COUNT(*) FROM loc_clientes) AS total_clientes, (SELECT COUNT(*) FROM loc_jogos) AS total_jogos, (SELECT COUNT(*) FROM loc_locacoes) AS total_locacoes;"
  - descricao: "O resumo deve trazer os três totais"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('rel_resumo_geral') WHERE name IN ('total_clientes','total_jogos','total_locacoes')) = 3"
    dica: "Use subconsultas dentro do SELECT, uma para cada total, com AS dando o nome de cada coluna."
  - descricao: "O resumo deve refletir os dados reais do banco"
    sql: "SELECT (SELECT total_clientes FROM rel_resumo_geral) = (SELECT COUNT(*) FROM loc_clientes)"
    dica: "Confira se a subconsulta de clientes aponta para a tabela loc_clientes."
quiz:
  titulo: "Quiz — Documentação e apresentação"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que documentar um projeto de banco de dados?"
      opcoes:
        - { id: a, texto: "Para deixar o arquivo maior" }
        - { id: b, texto: "Para que outra pessoa (ou você no futuro) entenda as decisões sem precisar adivinhar" }
        - { id: c, texto: "Só para cumprir exigência da escola" }
        - { id: d, texto: "Não é necessário documentar" }
      resposta_correta: b
      explicacao: "Um projeto sem documentação vira um enigma poucas semanas depois."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que um bom cabeçalho de script deve conter?"
      opcoes:
        - { id: a, texto: "Nada, cabeçalhos são desnecessários" }
        - { id: b, texto: "Nome do projeto, autor, data e uma descrição breve do que ele faz" }
        - { id: c, texto: "A senha do banco" }
        - { id: d, texto: "Apenas o nome do arquivo" }
      resposta_correta: b
      explicacao: "Quem abre o arquivo entende em cinco segundos do que se trata."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que documentar as DECISÕES de modelagem, e não só o resultado?"
      opcoes:
        - { id: a, texto: "Não é preciso" }
        - { id: b, texto: "Para ocupar mais linhas" }
        - { id: c, texto: "Porque o SQL exige" }
        - { id: d, texto: "Porque quem lê precisa entender por que o modelo ficou assim, para poder evoluí-lo" }
      resposta_correta: d
      explicacao: "Explicar por que a data ficou na locação evita que alguém 'conserte' errado depois."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Um script bem organizado deve poder ser executado como?"
      opcoes:
        - { id: a, texto: "De cima para baixo, do início ao fim, sem erros" }
        - { id: b, texto: "Em ordem aleatória" }
        - { id: c, texto: "Apenas por partes soltas" }
        - { id: d, texto: "De baixo para cima" }
      resposta_correta: a
      explicacao: "Estrutura, dados e consultas nessa ordem — é o que torna o projeto reproduzível."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que é o dicionário de dados de um projeto?"
      opcoes:
        - { id: a, texto: "A lista de usuários do banco" }
        - { id: b, texto: "O backup do banco" }
        - { id: c, texto: "Um glossário de comandos SQL" }
        - { id: d, texto: "A lista das tabelas e colunas, explicando o que cada uma guarda" }
      resposta_correta: d
      explicacao: "É o que permite entender o banco sem precisar abrir cada tabela."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Ao apresentar o projeto, o que é mais importante mostrar?"
      opcoes:
        - { id: a, texto: "As perguntas de negócio que o banco responde, com os relatórios funcionando" }
        - { id: b, texto: "O tempo que levou para fazer" }
        - { id: c, texto: "A quantidade de linhas de código" }
        - { id: d, texto: "Apenas as tabelas vazias" }
      resposta_correta: a
      explicacao: "Ninguém se impressiona com tabelas; as pessoas se impressionam com respostas úteis."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que vale a pena registrar as limitações e melhorias futuras do projeto?"
      opcoes:
        - { id: a, texto: "É proibido admitir limitações" }
        - { id: b, texto: "Enfraquece o trabalho" }
        - { id: c, texto: "Mostra consciência técnica e indica o caminho para a próxima versão" }
        - { id: d, texto: "Não tem utilidade" }
      resposta_correta: c
      explicacao: "Reconhecer o que ficou de fora é sinal de maturidade profissional, não de fraqueza."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que você aprendeu neste projeto, em resumo?"
      opcoes:
        - { id: a, texto: "O ciclo completo: modelar, criar, popular, manter, consultar e documentar" }
        - { id: b, texto: "Que bancos de dados são desnecessários" }
        - { id: c, texto: "Apenas a escrever CREATE TABLE" }
        - { id: d, texto: "Apenas a fazer consultas" }
      resposta_correta: a
      explicacao: "É exatamente esse ciclo que se repete em qualquer projeto profissional."
---

## O trabalho não termina no último SELECT

Você tem um banco modelado, criado, populado, mantido e com relatórios funcionando. Falta a etapa
que a maioria pula — e que faz toda a diferença: **documentar e apresentar**.

Um projeto que ninguém entende é um projeto que ninguém usa. E daqui a dois meses, "ninguém"
inclui **você**.

## O cabeçalho do script

Todo script profissional começa se identificando:

```sql
-- ============================================================
-- PROJETO: Sistema de Locadora de Jogos
-- Autor(a): Seu Nome
-- Turma: 2º ano - Banco de Dados
-- Data: 2026
--
-- DESCRICAO:
--   Banco para controle de emprestimo de jogos, com cadastro
--   de clientes, catalogo de jogos e registro de locacoes.
--   Gera relatorios de faturamento e de itens sem movimento.
-- ============================================================
```

Quem abre o arquivo entende em cinco segundos do que se trata.

## Documentando as decisões

Esta é a parte que separa um trabalho bom de um excelente. **Não documente o óbvio — documente o
porquê:**

```sql
-- ------------------------------------------------------------
-- MODELO DE DADOS
--
-- Entidades: clientes, jogos e locacoes.
--
-- Cardinalidade: um cliente aluga varios jogos e um jogo e
-- alugado por varios clientes (N:M). Por isso existe a tabela
-- associativa loc_locacoes.
--
-- DECISOES:
--  - data_locacao e dias ficam em loc_locacoes porque sao dados
--    da RELACAO, nao do cliente nem do jogo.
--  - valor_diaria fica em loc_jogos porque e caracteristica do
--    jogo; guardar na locacao repetiria o valor e geraria
--    redundancia.
--  - o valor total NAO e armazenado: e calculado nas consultas
--    (dias * valor_diaria), para nunca ficar desatualizado.
--  - telefones ficam em tabela separada porque um cliente pode
--    ter mais de um numero (1a Forma Normal).
-- ------------------------------------------------------------
```

Sem isso, alguém pode achar que você "esqueceu" de guardar o total e "consertar" — introduzindo
exatamente o problema que você evitou de propósito.

## O dicionário de dados

Uma tabela simples explicando cada coluna:

| Tabela | Coluna | Tipo | Descrição |
|---|---|---|---|
| loc_clientes | id | INTEGER | identificador único (PK) |
| loc_clientes | nome | VARCHAR(100) | nome completo do cliente |
| loc_clientes | cidade | VARCHAR(60) | cidade de residência |
| loc_jogos | valor_diaria | INT | valor cobrado por dia de aluguel |
| loc_locacoes | cliente_id | INT | FK para loc_clientes |
| loc_locacoes | dias | INT | quantidade de dias do aluguel |

Isso permite entender o banco inteiro **sem abrir uma tabela sequer**.

## Organizando o script final

O script completo deve rodar **de cima para baixo**, nesta ordem:

```sql
-- 1. ESTRUTURA
CREATE TABLE loc_clientes ...
CREATE TABLE loc_jogos ...
CREATE TABLE loc_locacoes ...
CREATE TABLE loc_telefones ...

-- 2. DADOS
INSERT INTO loc_clientes ...
INSERT INTO loc_jogos ...
INSERT INTO loc_locacoes ...

-- 3. RELATORIOS (VIEWS)
CREATE VIEW rel_locacoes_completo ...
CREATE VIEW rel_ranking_clientes ...
CREATE VIEW rel_jogos_sem_locacao ...

-- 4. CONSULTAS DE DEMONSTRACAO
SELECT * FROM rel_ranking_clientes ORDER BY gasto DESC;
```

Se qualquer pessoa puder rodar o seu arquivo do zero e obter o mesmo resultado, o projeto é
**reproduzível** — e isso é um critério real de qualidade profissional.

## Apresentando

Na hora de mostrar o trabalho, o erro comum é começar pelas tabelas. Ninguém se impressiona com
tabelas.

Comece pelas **perguntas que o banco responde**:

1. *"Quem são nossos melhores clientes?"* → mostre o ranking rodando.
2. *"Quais jogos estão parados?"* → mostre o relatório de itens sem locação.
3. *"Qual plataforma dá mais receita?"* → mostre o agrupamento.

Só **depois** explique como o modelo torna isso possível. As pessoas se interessam por
**respostas**, não por estruturas.

E termine com honestidade, registrando o que ficou de fora:

```sql
-- LIMITACOES E MELHORIAS FUTURAS:
--  - nao ha controle de estoque (quantas copias de cada jogo);
--  - a devolucao nao e registrada, apenas os dias previstos;
--  - nao ha calculo de multa por atraso.
```

Reconhecer limitações **não enfraquece** o trabalho — mostra que você entende o problema a fundo e
já sabe qual seria o próximo passo. É exatamente isso que se espera de um profissional.

## Atividade

**Passo 1.** Escreva o **cabeçalho** do projeto no terminal, em comentários: nome, autor, data e
descrição.

**Passo 2.** Escreva a seção **MODELO DE DADOS**, explicando as entidades, a cardinalidade e
**pelo menos três decisões** de modelagem com o motivo de cada uma.

**Passo 3.** Crie a view `rel_resumo_geral`, que traz os números principais do projeto em uma
única linha:

```sql
CREATE VIEW rel_resumo_geral AS
SELECT
  (SELECT COUNT(*) FROM loc_clientes)  AS total_clientes,
  (SELECT COUNT(*) FROM loc_jogos)     AS total_jogos,
  (SELECT COUNT(*) FROM loc_locacoes)  AS total_locacoes;
```

Repare: são **três subconsultas dentro do SELECT** — mais um uso do recurso da Aula 3.

**Passo 4.** Consulte o resumo:

```sql
SELECT * FROM rel_resumo_geral;
```

**Passo 5.** Escreva a seção de **LIMITAÇÕES E MELHORIAS FUTURAS**, com pelo menos três itens.

**Passo 6.** Monte a sua apresentação: escolha **três consultas** que melhor demonstram o valor do
banco e deixe-as no final do script, comentadas, prontas para rodar na frente da turma.

## Encerrando o ano

Olhe para trás um instante. Você começou sem saber o que era uma tabela. Agora você sabe:

- **modelar** um sistema a partir de uma descrição em português;
- **criar** a estrutura com tipos, chaves primárias e estrangeiras;
- **popular** e **manter** os dados com segurança;
- **consultar** com filtros, ordenação, agrupamento, JOINs e subconsultas;
- **organizar** relatórios em views;
- **documentar** e **apresentar** o resultado.

Esse é o ciclo completo de um projeto de banco de dados — o mesmo que se repete em qualquer
empresa. Parabéns pelo trabalho do ano.

## Desafio extra

1. Implemente uma das limitações que você listou. A mais interessante é o **controle de cópias**:
   uma tabela de exemplares, onde cada cópia física de um jogo é uma linha.
2. Crie uma view que mostre, para cada cliente, a **última locação** que ele fez.
3. Escreva o dicionário de dados completo do seu projeto, em comentários, com todas as tabelas e
   colunas.
