---
titulo: "SELECT e WHERE: consultando os dados"
mes_numero: 2
numero_sequencial: 7
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 7 — consultando com SELECT e filtrando com WHERE.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela filmes"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('filmes') WHERE name IN ('id','titulo','genero','ano','nota')) = 5"
    dica: "CREATE TABLE filmes (id INTEGER PRIMARY KEY, titulo VARCHAR(120), genero VARCHAR(40), ano INT, nota INT);"
  - descricao: "Cadastrar pelo menos 6 filmes"
    sql: "SELECT (SELECT COUNT(*) FROM filmes) >= 6"
    dica: "Use um único INSERT com 6 conjuntos de valores separados por vírgula."
  - descricao: "Ter filmes de pelo menos 2 gêneros diferentes (para os filtros fazerem sentido)"
    sql: "SELECT (SELECT COUNT(DISTINCT genero) FROM filmes) >= 2"
    dica: "Varie o gênero: alguns de 'Ação', outros de 'Comédia', por exemplo."
  - descricao: "Ter pelo menos um filme com nota maior que 8"
    sql: "SELECT EXISTS(SELECT 1 FROM filmes WHERE nota > 8)"
    dica: "Cadastre ao menos um filme com nota 9 ou 10, para praticar o filtro com maior que."
quiz:
  titulo: "Quiz — SELECT e WHERE"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual comando lê e devolve dados, sem alterar nada?"
      opcoes:
        - { id: a, texto: "DELETE" }
        - { id: b, texto: "INSERT" }
        - { id: c, texto: "SELECT" }
        - { id: d, texto: "UPDATE" }
      resposta_correta: c
      explicacao: "SELECT é o comando central da DQL. Ele só consulta — é totalmente seguro."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que o asterisco significa em SELECT * FROM filmes?"
      opcoes:
        - { id: a, texto: "Multiplique os valores" }
        - { id: b, texto: "Traga apenas a primeira coluna" }
        - { id: c, texto: "Traga todas as colunas da tabela" }
        - { id: d, texto: "Apague a tabela" }
      resposta_correta: c
      explicacao: "O * é um atalho para 'todas as colunas'."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Como trazer apenas as colunas titulo e ano da tabela filmes?"
      opcoes:
        - { id: a, texto: "SELECT * FROM titulo, ano;" }
        - { id: b, texto: "SELECT FROM filmes titulo, ano;" }
        - { id: c, texto: "SELECT titulo, ano FROM filmes;" }
        - { id: d, texto: "GET titulo, ano FROM filmes;" }
      resposta_correta: c
      explicacao: "Basta listar as colunas desejadas, separadas por vírgula, no lugar do asterisco."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Em SELECT * FROM filmes WHERE genero = 'Ação', o que o WHERE faz?"
      opcoes:
        - { id: a, texto: "Ordena os filmes por gênero" }
        - { id: b, texto: "Apaga os filmes de ação" }
        - { id: c, texto: "Cria uma coluna nova" }
        - { id: d, texto: "Filtra o resultado, trazendo só os filmes de ação" }
      resposta_correta: d
      explicacao: "O WHERE compara uma coluna com um valor e devolve só as linhas que atendem à condição."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual operador usamos para 'maior ou igual a' em SQL?"
      opcoes:
        - { id: a, texto: ">=" }
        - { id: b, texto: "MAIOR" }
        - { id: c, texto: "&gt;&gt;" }
        - { id: d, texto: "=>" }
      resposta_correta: a
      explicacao: "Os operadores são =, <>, <, >, <= e >=."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Como escrever um filtro que exige DUAS condições verdadeiras ao mesmo tempo?"
      opcoes:
        - { id: a, texto: "WHERE genero = 'Ação' AND ano > 2020" }
        - { id: b, texto: "WHERE genero = 'Ação' OR ano > 2020" }
        - { id: c, texto: "Não é possível ter duas condições" }
        - { id: d, texto: "WHERE genero = 'Ação' + ano > 2020" }
      resposta_correta: a
      explicacao: "AND exige as duas; OR aceita pelo menos uma."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual é a diferença entre AND e OR em um WHERE?"
      opcoes:
        - { id: a, texto: "OR só funciona com números" }
        - { id: b, texto: "AND apaga registros" }
        - { id: c, texto: "AND só traz linhas que atendem a todas as condições; OR traz as que atendem a pelo menos uma" }
        - { id: d, texto: "Não há diferença" }
      resposta_correta: c
      explicacao: "É a mesma lógica dos operadores lógicos que vocês veem em programação."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que rodar um SELECT antes de um DELETE é uma boa prática?"
      opcoes:
        - { id: a, texto: "Porque o SELECT mostra exatamente quais linhas seriam afetadas, sem alterar nada" }
        - { id: b, texto: "Porque o banco exige isso" }
        - { id: c, texto: "Não é uma boa prática" }
        - { id: d, texto: "Porque o SELECT apaga mais rápido" }
      resposta_correta: a
      explicacao: "É a regra de ouro que vimos na aula anterior — conferir antes de alterar."
---

## Guardar por guardar não serve de nada

Um banco de dados só tem utilidade se você consegue **recuperar** a informação depois. É para isso
que existe o terceiro grupo de comandos, a **DQL** (Linguagem de Consulta de Dados), com um
comando central: o `SELECT`.

A boa notícia: o `SELECT` **não altera nada**. Ele apenas lê e devolve. Você pode testar à vontade
sem medo de estragar os dados.

## A consulta mais simples

```sql
SELECT * FROM filmes;
```

O asterisco significa **"todas as colunas"**. Esse comando traz a tabela inteira.

Se você só precisa de algumas colunas, liste elas:

```sql
SELECT titulo, ano FROM filmes;
```

Em tabelas grandes, pedir só o que você precisa é mais rápido e mais organizado.

## Filtrando com WHERE

Raramente queremos a tabela inteira. O `WHERE` recorta o resultado:

```sql
SELECT * FROM filmes
WHERE genero = 'Ação';
```

Só os filmes de ação aparecem. Repare que o texto vai entre **aspas simples**, igual no `INSERT`.

## Os operadores de comparação

| Operador | Significa | Exemplo |
|---|---|---|
| `=` | igual a | `WHERE ano = 2024` |
| `<>` | diferente de | `WHERE genero <> 'Terror'` |
| `>` | maior que | `WHERE nota > 8` |
| `<` | menor que | `WHERE ano < 2000` |
| `>=` | maior ou igual | `WHERE nota >= 7` |
| `<=` | menor ou igual | `WHERE ano <= 2010` |

## Combinando condições: AND e OR

Quando um filtro só não basta, combinamos condições:

```sql
-- As DUAS condições precisam ser verdadeiras:
SELECT * FROM filmes
WHERE genero = 'Ação' AND ano > 2020;

-- PELO MENOS UMA precisa ser verdadeira:
SELECT * FROM filmes
WHERE genero = 'Ação' OR genero = 'Comédia';
```

- `AND` — exige **todas** as condições.
- `OR` — aceita **pelo menos uma**.

É a mesma lógica dos operadores lógicos da programação. Uma dica prática: quando você usa `AND`, o
resultado tende a **diminuir** (o filtro fica mais exigente); quando usa `OR`, tende a
**aumentar**.

## Um detalhe que confunde

Cuidado ao misturar `AND` e `OR` na mesma consulta. Assim como na matemática, existe uma ordem de
precedência — o `AND` é avaliado antes do `OR`. Quando tiver dúvida, **use parênteses** para
deixar explícito:

```sql
SELECT * FROM filmes
WHERE (genero = 'Ação' OR genero = 'Comédia') AND nota >= 8;
```

Sem os parênteses, o resultado seria diferente.

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `filmes` com:

- `id` — `INTEGER PRIMARY KEY`
- `titulo` — `VARCHAR(120)`
- `genero` — `VARCHAR(40)`
- `ano` — `INT`
- `nota` — `INT` (de 0 a 10)

**Passo 2.** Cadastre **6 filmes** de sua escolha, usando um único `INSERT`. Use **pelo menos 2
gêneros diferentes** e garanta que **pelo menos um filme tenha nota maior que 8**.

**Passo 3.** Agora pratique as consultas (essas não entram no checklist, mas rode todas para ver
o resultado):

1. Todos os filmes: `SELECT * FROM filmes;`
2. Só título e ano de todos.
3. Só os filmes de um gênero específico.
4. Só os filmes com nota maior que 8.
5. Filmes de um gênero **e** com nota alta, usando `AND`.
6. Filmes de dois gêneros diferentes, usando `OR`.

Observe como o número de linhas do resultado muda a cada filtro.

## Desafio extra

Monte uma consulta que responda: *"quais filmes lançados a partir de 2020 têm nota maior ou igual
a 8?"*. Depois monte outra usando parênteses para responder: *"quais filmes são de ação ou comédia
e ao mesmo tempo têm nota acima de 7?"*.
