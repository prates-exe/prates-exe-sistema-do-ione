---
titulo: "ORDER BY e funções de agregação"
mes_numero: 2
numero_sequencial: 8
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 8 — ordenando resultados e resumindo dados.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela vendas"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('vendas') WHERE name IN ('id','vendedor','cidade','valor')) = 4"
    dica: "CREATE TABLE vendas (id INTEGER PRIMARY KEY, vendedor VARCHAR(80), cidade VARCHAR(80), valor INT);"
  - descricao: "Cadastrar pelo menos 8 vendas"
    sql: "SELECT (SELECT COUNT(*) FROM vendas) >= 8"
    dica: "Use um único INSERT com 8 conjuntos de valores separados por vírgula."
  - descricao: "As vendas devem estar distribuídas em pelo menos 2 cidades"
    sql: "SELECT (SELECT COUNT(DISTINCT cidade) FROM vendas) >= 2"
    dica: "Varie a cidade — o GROUP BY por cidade só faz sentido com mais de uma."
  - descricao: "As vendas devem ter pelo menos 3 vendedores diferentes"
    sql: "SELECT (SELECT COUNT(DISTINCT vendedor) FROM vendas) >= 3"
    dica: "Use pelo menos 3 nomes diferentes na coluna vendedor, repetindo alguns para o agrupamento ficar interessante."
quiz:
  titulo: "Quiz — ORDER BY e agregação"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Para que serve a cláusula ORDER BY?"
      opcoes:
        - { id: a, texto: "Organizar o resultado da consulta em uma ordem definida" }
        - { id: b, texto: "Filtrar quais linhas aparecem" }
        - { id: c, texto: "Criar uma tabela nova" }
        - { id: d, texto: "Apagar registros" }
      resposta_correta: a
      explicacao: "Quem filtra é o WHERE; quem ordena é o ORDER BY."
    - id: q2
      tipo: multipla_escolha
      enunciado: "A cláusula ORDER BY é obrigatória em toda consulta?"
      opcoes:
        - { id: a, texto: "Não — sem ela a consulta funciona, apenas sem garantia de ordem" }
        - { id: b, texto: "Sim, sempre" }
        - { id: c, texto: "Só em tabelas com mais de 100 linhas" }
        - { id: d, texto: "Só junto com DELETE" }
      resposta_correta: a
      explicacao: "Diferente do WHERE em um DELETE, o ORDER BY é totalmente opcional."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual palavra usamos para ordenar do maior para o menor?"
      opcoes:
        - { id: a, texto: "DESC" }
        - { id: b, texto: "ASC" }
        - { id: c, texto: "DOWN" }
        - { id: d, texto: "REVERSE" }
      resposta_correta: a
      explicacao: "ASC é crescente (padrão) e DESC é decrescente."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual função conta quantos registros existem?"
      opcoes:
        - { id: a, texto: "COUNT" }
        - { id: b, texto: "SUM" }
        - { id: c, texto: "AVG" }
        - { id: d, texto: "MAX" }
      resposta_correta: a
      explicacao: "COUNT conta, SUM soma, AVG calcula média, MAX e MIN pegam maior e menor."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual função calcula a MÉDIA de uma coluna numérica?"
      opcoes:
        - { id: a, texto: "AVG" }
        - { id: b, texto: "SUM" }
        - { id: c, texto: "COUNT" }
        - { id: d, texto: "MIN" }
      resposta_correta: a
      explicacao: "AVG vem de average, média em inglês."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Para que serve o GROUP BY?"
      opcoes:
        - { id: a, texto: "Agrupar as linhas por uma coluna, aplicando a função de agregação a cada grupo separadamente" }
        - { id: b, texto: "Ordenar os resultados" }
        - { id: c, texto: "Filtrar linhas" }
        - { id: d, texto: "Criar grupos de usuários do banco" }
      resposta_correta: a
      explicacao: "Em vez de um total único, o GROUP BY dá um total por categoria."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que a consulta SELECT cidade, SUM(valor) FROM vendas GROUP BY cidade; devolve?"
      opcoes:
        - { id: a, texto: "O total vendido em cada cidade, uma linha por cidade" }
        - { id: b, texto: "O total geral de todas as vendas, em uma linha só" }
        - { id: c, texto: "Todas as vendas, sem resumo" }
        - { id: d, texto: "Apenas a cidade com maior venda" }
      resposta_correta: a
      explicacao: "O GROUP BY cidade cria um grupo por cidade e a soma é feita dentro de cada grupo."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Quando SELECT, WHERE e ORDER BY aparecem juntos, qual é a ordem correta de escrita?"
      opcoes:
        - { id: a, texto: "SELECT colunas → FROM tabela → WHERE filtro → ORDER BY critério" }
        - { id: b, texto: "ORDER BY → WHERE → SELECT → FROM" }
        - { id: c, texto: "WHERE → SELECT → FROM → ORDER BY" }
        - { id: d, texto: "A ordem não importa" }
      resposta_correta: a
      explicacao: "Essa ordem é fixa em SQL e cai em prova com frequência."
---

## Organizando o resultado

Na aula anterior você aprendeu a **filtrar** com `WHERE`. Agora vamos **organizar** e **resumir**.

O `ORDER BY` coloca o resultado em uma ordem definida:

```sql
SELECT * FROM vendas
ORDER BY valor;
```

Por padrão a ordem é **crescente** (do menor para o maior). Para inverter, use `DESC`:

```sql
SELECT * FROM vendas
ORDER BY valor DESC;
```

- `ASC` — crescente (é o padrão, pode omitir).
- `DESC` — decrescente.

Diferente do `WHERE` em um `DELETE`, o `ORDER BY` é **opcional**: sem ele a consulta funciona
normalmente, apenas sem garantia de ordem.

## A ordem de escrita é fixa

Quando as cláusulas aparecem juntas, a ordem **sempre** é esta:

```sql
SELECT colunas          -- 1. o que trazer
FROM tabela             -- 2. de onde
WHERE condicao          -- 3. filtro
ORDER BY coluna;        -- 4. ordenação
```

Trocar essa ordem gera erro de sintaxe. Vale memorizar — cai em prova.

## Resumindo dados: funções de agregação

Às vezes não queremos ver as linhas, e sim um **resumo** delas. Para isso existem as **funções de
agregação**:

| Função | O que faz | Exemplo |
|---|---|---|
| `COUNT()` | conta registros | quantas vendas foram feitas |
| `SUM()` | soma valores | total vendido |
| `AVG()` | calcula a média | ticket médio |
| `MAX()` | maior valor | maior venda |
| `MIN()` | menor valor | menor venda |

```sql
SELECT COUNT(*) FROM vendas;       -- quantas vendas existem
SELECT SUM(valor) FROM vendas;     -- total vendido
SELECT AVG(valor) FROM vendas;     -- média por venda
SELECT MAX(valor) FROM vendas;     -- a maior venda
SELECT MIN(valor) FROM vendas;     -- a menor venda
```

Repare: cada uma dessas consultas devolve **uma única linha**, com o resumo de toda a tabela.

## GROUP BY: um resumo por categoria

Um total geral é útil, mas normalmente queremos saber **por categoria**: quanto cada vendedor
vendeu, quanto foi vendido em cada cidade. É aí que entra o `GROUP BY`:

```sql
SELECT cidade, SUM(valor)
FROM vendas
GROUP BY cidade;
```

Essa consulta devolve **uma linha por cidade**, com o total de cada uma. O `GROUP BY` separa as
linhas em grupos e aplica a função de agregação **dentro de cada grupo**.

Outros exemplos úteis:

```sql
-- Quantas vendas cada vendedor fez:
SELECT vendedor, COUNT(*)
FROM vendas
GROUP BY vendedor;

-- Média de venda por cidade, da maior para a menor:
SELECT cidade, AVG(valor)
FROM vendas
GROUP BY cidade
ORDER BY AVG(valor) DESC;
```

A regra prática: **a coluna que aparece no `GROUP BY` é a mesma que você lista no `SELECT`, junto
com a função de agregação**.

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `vendas` com:

- `id` — `INTEGER PRIMARY KEY`
- `vendedor` — `VARCHAR(80)`
- `cidade` — `VARCHAR(80)`
- `valor` — `INT`

**Passo 2.** Cadastre **8 vendas**, usando **pelo menos 2 cidades** e **pelo menos 3 vendedores
diferentes**. Repita alguns vendedores de propósito — é isso que torna o agrupamento
interessante.

**Passo 3.** Rode e observe o resultado de cada consulta:

1. Todas as vendas ordenadas por valor, da maior para a menor.
2. O total geral vendido (`SUM`).
3. A média das vendas (`AVG`).
4. A maior e a menor venda (`MAX` e `MIN`).
5. O total vendido **por cidade** (`GROUP BY cidade`).
6. A quantidade de vendas **por vendedor** (`GROUP BY vendedor`).

Compare o resultado do item 2 (uma linha só) com o do item 5 (uma linha por cidade). Entender essa
diferença é o objetivo principal da aula.

## Desafio extra

Monte uma consulta que responda: *"qual vendedor teve a maior média de valor por venda?"*. Você vai
precisar combinar `AVG`, `GROUP BY` e `ORDER BY ... DESC` na mesma consulta.

Depois pense: como você faria para trazer só as cidades cujo total vendido passou de um certo
valor? (Essa resposta usa uma cláusula nova, o `HAVING` — pesquise e experimente.)
