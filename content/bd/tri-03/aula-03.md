---
titulo: "LEFT JOIN: incluindo quem não tem par"
mes_numero: 3
numero_sequencial: 15
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 2 — a diferenca entre INNER JOIN e LEFT JOIN.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela turmas_escola"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('turmas_escola') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE turmas_escola (id INTEGER PRIMARY KEY, nome VARCHAR(60));"
  - descricao: "Criar a tabela estudantes_turma com FK para turmas_escola"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('estudantes_turma') WHERE \"table\"='turmas_escola')"
    dica: "CREATE TABLE estudantes_turma (id INTEGER PRIMARY KEY, nome VARCHAR(80), turma_id INT, FOREIGN KEY (turma_id) REFERENCES turmas_escola(id));"
  - descricao: "Cadastrar 4 turmas"
    sql: "SELECT (SELECT COUNT(*) FROM turmas_escola) >= 4"
    dica: "Insira 4 turmas, por exemplo 1A, 1B, 2A e 2B."
  - descricao: "Deixar uma turma VAZIA, sem nenhum estudante"
    sql: "SELECT EXISTS(SELECT 1 FROM turmas_escola WHERE id NOT IN (SELECT turma_id FROM estudantes_turma WHERE turma_id IS NOT NULL))"
    dica: "Cadastre estudantes em apenas 3 das 4 turmas — a quarta fica vazia de propósito."
  - descricao: "Cadastrar pelo menos 5 estudantes distribuídos nas turmas"
    sql: "SELECT (SELECT COUNT(*) FROM estudantes_turma) >= 5"
    dica: "Insira 5 estudantes, usando os ids das turmas que você criou."
quiz:
  titulo: "Quiz — LEFT JOIN"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre INNER JOIN e LEFT JOIN?"
      opcoes:
        - { id: a, texto: "O LEFT JOIN é mais rápido" }
        - { id: b, texto: "Não há diferença" }
        - { id: c, texto: "O INNER JOIN não usa ON" }
        - { id: d, texto: "O INNER só traz quem tem par nos dois lados; o LEFT traz tudo da tabela da esquerda, mesmo sem par" }
      resposta_correta: d
      explicacao: "Por isso o LEFT JOIN é a escolha certa quando você precisa ver também os que estão sem correspondência."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que aparece nas colunas da tabela da direita quando não há correspondência em um LEFT JOIN?"
      opcoes:
        - { id: a, texto: "A linha some do resultado" }
        - { id: b, texto: "NULL" }
        - { id: c, texto: "Texto vazio" }
        - { id: d, texto: "Zero" }
      resposta_correta: b
      explicacao: "NULL significa ausência de valor — é o sinal de que não houve par."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual tabela é a 'da esquerda' em: FROM turmas LEFT JOIN estudantes?"
      opcoes:
        - { id: a, texto: "As duas ao mesmo tempo" }
        - { id: b, texto: "Depende do ON" }
        - { id: c, texto: "estudantes" }
        - { id: d, texto: "turmas, a que aparece no FROM" }
      resposta_correta: d
      explicacao: "A da esquerda é sempre a do FROM; é dela que todas as linhas são preservadas."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para listar TODAS as turmas, inclusive as sem alunos, qual você usa?"
      opcoes:
        - { id: a, texto: "LEFT JOIN, partindo de turmas" }
        - { id: b, texto: "CREATE TABLE" }
        - { id: c, texto: "DELETE" }
        - { id: d, texto: "INNER JOIN" }
      resposta_correta: a
      explicacao: "O INNER JOIN esconderia justamente as turmas vazias."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Como encontrar exatamente as turmas SEM nenhum aluno?"
      opcoes:
        - { id: a, texto: "Apenas ORDER BY" }
        - { id: b, texto: "INNER JOIN com WHERE" }
        - { id: c, texto: "LEFT JOIN combinado com WHERE ... IS NULL" }
        - { id: d, texto: "Não é possível" }
      resposta_correta: c
      explicacao: "O LEFT traz todas; o IS NULL filtra só as que ficaram sem par."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que COUNT(*) dá resultado errado ao contar alunos por turma com LEFT JOIN?"
      opcoes:
        - { id: a, texto: "Não dá resultado errado" }
        - { id: b, texto: "Porque COUNT não funciona com JOIN" }
        - { id: c, texto: "Porque a linha da turma vazia existe, então COUNT(*) conta 1 em vez de 0" }
        - { id: d, texto: "Porque o LEFT JOIN duplica linhas" }
      resposta_correta: c
      explicacao: "A solução é contar uma coluna da tabela da direita, como COUNT(estudantes.id)."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que COUNT(estudantes.id) faz com valores NULL?"
      opcoes:
        - { id: a, texto: "Dá erro" }
        - { id: b, texto: "Ignora os NULL, contando apenas os valores reais" }
        - { id: c, texto: "Conta os NULL como se fossem zero" }
        - { id: d, texto: "Conta todos igualmente" }
      resposta_correta: b
      explicacao: "É justamente por isso que a turma vazia passa a aparecer com 0."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Em um relatório gerencial, por que ver os registros SEM par costuma ser importante?"
      opcoes:
        - { id: a, texto: "Porque é ali que estão os problemas: turmas vazias, produtos sem venda, clientes sem pedido" }
        - { id: b, texto: "Só por curiosidade" }
        - { id: c, texto: "Não é importante" }
        - { id: d, texto: "Porque deixa o relatório maior" }
      resposta_correta: a
      explicacao: "Muitas decisões dependem de enxergar exatamente o que está faltando."
---

## O que o INNER JOIN esconde

Na Aula 9 do trimestre passado você viu o `INNER JOIN` e descobriu uma coisa importante: ele só
traz as linhas que têm **correspondência dos dois lados**. O item sem categoria simplesmente
sumiu do relatório.

Naquele momento isso foi apresentado como um comportamento a entender. Agora vamos resolver o
problema, porque **muitas vezes é justamente o que está faltando que interessa**:

- turmas **sem** alunos matriculados;
- produtos que **nunca** foram vendidos;
- clientes que **nunca** fizeram um pedido.

Um relatório que esconde esses casos esconde exatamente os problemas que precisam de atenção.

## O LEFT JOIN

O `LEFT JOIN` traz **todas** as linhas da tabela da **esquerda**, tenham par ou não:

```sql
SELECT turmas_escola.nome, estudantes_turma.nome
FROM turmas_escola
LEFT JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id;
```

"Tabela da esquerda" é a que aparece no `FROM`. É dela que **nenhuma linha se perde**.

Quando não há correspondência, as colunas da tabela da direita vêm preenchidas com **`NULL`** —
que significa "ausência de valor".

## Comparando lado a lado

Com 4 turmas, sendo uma vazia:

**INNER JOIN** — a turma 2B não aparece:

| turma | estudante |
|---|---|
| 1A | Ana |
| 1A | Bruno |
| 1B | Carla |
| 2A | Diego |

**LEFT JOIN** — a turma 2B aparece, com `NULL`:

| turma | estudante |
|---|---|
| 1A | Ana |
| 1A | Bruno |
| 1B | Carla |
| 2A | Diego |
| 2B | *NULL* |

Essa linha com `NULL` é a informação mais valiosa do relatório: **existe uma turma sem nenhum
aluno**.

## Encontrando só os que não têm par

Se você quer **apenas** os casos sem correspondência, combine o `LEFT JOIN` com `IS NULL`:

```sql
SELECT turmas_escola.nome
FROM turmas_escola
LEFT JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id
WHERE estudantes_turma.id IS NULL;
```

Lendo: *"traga todas as turmas, junte os estudantes quando houver, e depois mostre só aquelas em
que não houve nenhum"*.

Esse padrão — `LEFT JOIN` + `IS NULL` — é um dos mais úteis do SQL. Guarde bem.

Atenção: para testar ausência usamos `IS NULL`, **não** `= NULL`. Em SQL, `NULL` não é igual a
nada, nem a si mesmo — por isso existe um operador próprio.

## A pegadinha do COUNT

Aqui está o erro mais comum ao contar com `LEFT JOIN`:

```sql
-- ERRADO: a turma vazia aparece com 1
SELECT turmas_escola.nome, COUNT(*)
FROM turmas_escola
LEFT JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id
GROUP BY turmas_escola.nome;
```

Por quê? Porque a **linha existe** no resultado (com `NULL` do lado direito), e `COUNT(*)` conta
linhas — então conta 1.

A correção é contar uma coluna **da tabela da direita**:

```sql
-- CERTO: a turma vazia aparece com 0
SELECT turmas_escola.nome, COUNT(estudantes_turma.id) AS total
FROM turmas_escola
LEFT JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id
GROUP BY turmas_escola.nome;
```

O `COUNT` de uma coluna **ignora os `NULL`**. Como a turma vazia só tem `NULL` ali, o resultado é
0 — que é a verdade.

## Atividade

**Passo 1.** Crie a tabela `turmas_escola` com `id` (PK) e `nome`.

**Passo 2.** Crie a tabela `estudantes_turma` com `id` (PK), `nome` e `turma_id` (FK para
`turmas_escola`).

**Passo 3.** Cadastre **4 turmas** (por exemplo 1A, 1B, 2A e 2B).

**Passo 4.** Cadastre **5 estudantes**, distribuídos em **apenas 3** das turmas. Uma turma fica
**vazia de propósito** — é ela que vai revelar a diferença entre os dois JOINs.

**Passo 5.** Rode as duas consultas e **conte as linhas de cada uma**:

```sql
-- INNER JOIN
SELECT turmas_escola.nome AS turma, estudantes_turma.nome AS aluno
FROM turmas_escola
INNER JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id;

-- LEFT JOIN
SELECT turmas_escola.nome AS turma, estudantes_turma.nome AS aluno
FROM turmas_escola
LEFT JOIN estudantes_turma ON estudantes_turma.turma_id = turmas_escola.id;
```

A turma vazia aparece só na segunda, com `NULL` no lugar do aluno.

**Passo 6.** Descubra **qual** turma está vazia, usando `LEFT JOIN` com `IS NULL`.

**Passo 7.** Faça a contagem correta de alunos por turma, usando
`COUNT(estudantes_turma.id)`. Depois troque por `COUNT(*)` e veja a turma vazia aparecer
erradamente com 1.

## Desafio extra

1. Inverta a lógica: liste todos os **estudantes**, inclusive os que ainda não foram alocados em
   nenhuma turma (cadastre um com `turma_id` nulo primeiro).
2. Monte um relatório com as turmas ordenadas da **mais cheia para a mais vazia**.
3. Pense: em uma loja, que pergunta de negócio o `LEFT JOIN` + `IS NULL` responderia sobre
   produtos e vendas?
