---
titulo: "Revisão consolidada: DDL, DML e DQL em um script só"
mes_numero: 3
numero_sequencial: 13
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 1 do 3º trimestre — um script completo, do zero ao relatorio.
  -- Voce vai usar DDL, DML e DQL na mesma atividade.
criterios_validacao:
  - descricao: "DDL — criar a tabela biblioteca"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('biblioteca') WHERE name IN ('id','titulo','autor','ano','disponivel')) = 5"
    dica: "CREATE TABLE biblioteca (id INTEGER PRIMARY KEY, titulo VARCHAR(120), autor VARCHAR(80), ano INT, disponivel INT);"
  - descricao: "DML — cadastrar pelo menos 6 livros"
    sql: "SELECT (SELECT COUNT(*) FROM biblioteca) >= 6"
    dica: "Use um único INSERT com 6 conjuntos de valores separados por vírgula."
  - descricao: "DML — ter livros disponíveis (1) e emprestados (0)"
    sql: "SELECT (SELECT COUNT(DISTINCT disponivel) FROM biblioteca) >= 2"
    dica: "Use 1 para disponível e 0 para emprestado, misturando os dois."
  - descricao: "DML — corrigir o ano de um livro com UPDATE + WHERE"
    sql: "SELECT EXISTS(SELECT 1 FROM biblioteca WHERE ano = 1999)"
    dica: "UPDATE biblioteca SET ano = 1999 WHERE id = 1; — sempre com WHERE."
  - descricao: "DML — remover um livro específico (sobrando 5 ou mais)"
    sql: "SELECT (SELECT COUNT(*) FROM biblioteca) >= 5"
    dica: "DELETE FROM biblioteca WHERE id = 6; — remova apenas um."
  - descricao: "DQL — ter ao menos 2 autores diferentes para os relatórios"
    sql: "SELECT (SELECT COUNT(DISTINCT autor) FROM biblioteca) >= 2"
    dica: "Varie o autor entre os livros — o GROUP BY por autor só faz sentido assim."
quiz:
  titulo: "Quiz — Revisão consolidada"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual grupo de comandos define a estrutura do banco?"
      opcoes:
        - { id: a, texto: "DDL — com o CREATE TABLE" }
        - { id: b, texto: "DML — com o INSERT" }
        - { id: c, texto: "DQL — com o SELECT" }
        - { id: d, texto: "Nenhum" }
      resposta_correta: a
      explicacao: "DDL define a estrutura, DML mexe nos dados, DQL consulta."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é a ordem lógica de trabalho ao montar um banco?"
      opcoes:
        - { id: a, texto: "A ordem é indiferente" }
        - { id: b, texto: "Consultar, criar e depois inserir" }
        - { id: c, texto: "Criar a estrutura, inserir os dados e então consultar" }
        - { id: d, texto: "Inserir antes de criar a tabela" }
      resposta_correta: c
      explicacao: "Sem estrutura não há onde inserir; sem dados não há o que consultar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual comando remove linhas mantendo a tabela no banco?"
      opcoes:
        - { id: a, texto: "SELECT" }
        - { id: b, texto: "CREATE TABLE" }
        - { id: c, texto: "DELETE" }
        - { id: d, texto: "DROP TABLE" }
      resposta_correta: c
      explicacao: "DROP TABLE elimina a tabela inteira; DELETE só tira linhas."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual é o risco de um UPDATE sem WHERE?"
      opcoes:
        - { id: a, texto: "Não alterar nada" }
        - { id: b, texto: "Alterar todas as linhas da tabela de uma vez" }
        - { id: c, texto: "Apagar a tabela" }
        - { id: d, texto: "Criar linhas novas" }
      resposta_correta: b
      explicacao: "Sem filtro, o comando não tem limite — é um dos erros mais caros que existem."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual a ordem correta de escrita de uma consulta completa?"
      opcoes:
        - { id: a, texto: "SELECT, FROM, WHERE, GROUP BY, ORDER BY" }
        - { id: b, texto: "WHERE, SELECT, FROM, GROUP BY" }
        - { id: c, texto: "A ordem não importa" }
        - { id: d, texto: "FROM, SELECT, ORDER BY, WHERE" }
      resposta_correta: a
      explicacao: "Essa sequência é fixa em SQL e cai em prova."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Para contar quantos livros existem por autor, o que você usa?"
      opcoes:
        - { id: a, texto: "CREATE TABLE" }
        - { id: b, texto: "DELETE com WHERE" }
        - { id: c, texto: "Apenas ORDER BY" }
        - { id: d, texto: "COUNT com GROUP BY autor" }
      resposta_correta: d
      explicacao: "O GROUP BY separa por autor e o COUNT conta dentro de cada grupo."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que guardar 'disponivel' como 1 e 0 em vez de texto 'sim' e 'nao'?"
      opcoes:
        - { id: a, texto: "Porque texto não pode ser guardado" }
        - { id: b, texto: "Fica padronizado e evita variações de escrita como Sim, SIM, s, sim" }
        - { id: c, texto: "Não faz diferença nenhuma" }
        - { id: d, texto: "Porque números ocupam mais espaço" }
      resposta_correta: b
      explicacao: "Padronização é o que garante que os filtros funcionem sempre."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Antes de rodar um DELETE, qual é a prática segura?"
      opcoes:
        - { id: a, texto: "Apagar a tabela e recriar" }
        - { id: b, texto: "Nunca usar DELETE" }
        - { id: c, texto: "Rodar sem WHERE, é mais rápido" }
        - { id: d, texto: "Rodar um SELECT com o mesmo WHERE para conferir o que será afetado" }
      resposta_correta: d
      explicacao: "Conferir antes de alterar é a regra de ouro do trabalho com dados."
---

## Começando o 3º trimestre

No trimestre passado você aprendeu SQL do zero: estrutura, dados, consultas, relacionamentos e
modelagem. Este trimestre é sobre **consolidar** e **aprofundar** — e terminar com um projeto
completo, documentado e apresentado.

A primeira aula é uma retomada prática. Nada de conteúdo novo: você vai escrever **um script
único** que passa pelos três grupos de comandos, exatamente como se faz em um trabalho real.

## O mapa completo do SQL

| Grupo | Significa | Comandos | Para quê |
|---|---|---|---|
| **DDL** | Definição de Dados | `CREATE TABLE`, `DROP TABLE` | montar a **estrutura** |
| **DML** | Manipulação de Dados | `INSERT`, `UPDATE`, `DELETE` | mexer no **conteúdo** |
| **DQL** | Consulta de Dados | `SELECT` | **extrair informação** |

A ordem de trabalho é sempre a mesma: **estrutura → dados → consultas**. Não existe inserir antes
de criar, nem consultar antes de inserir.

## DDL: a estrutura

```sql
CREATE TABLE biblioteca (
  id INTEGER PRIMARY KEY,
  titulo VARCHAR(120),
  autor VARCHAR(80),
  ano INT,
  disponivel INT
);
```

Repare na coluna `disponivel`: usamos `1` para disponível e `0` para emprestado, em vez de texto.
Isso **padroniza** o dado. Com texto, um cadastro escreveria "sim", outro "Sim", outro "S" — e
nenhum filtro funcionaria direito.

## DML: os dados

```sql
-- Cadastrar
INSERT INTO biblioteca (id, titulo, autor, ano, disponivel)
VALUES
  (1, 'Dom Casmurro', 'Machado de Assis', 1899, 1),
  (2, 'Memorias Postumas', 'Machado de Assis', 1881, 0);

-- Corrigir
UPDATE biblioteca SET ano = 1999 WHERE id = 1;

-- Remover
DELETE FROM biblioteca WHERE id = 6;
```

Lembre da regra de ouro: **`UPDATE` e `DELETE` sempre com `WHERE`**. E, na dúvida, teste o filtro
antes com um `SELECT`.

## DQL: as consultas

```sql
-- Tudo
SELECT * FROM biblioteca;

-- Filtrando
SELECT titulo, autor FROM biblioteca WHERE disponivel = 1;

-- Ordenando
SELECT * FROM biblioteca ORDER BY ano DESC;

-- Resumindo
SELECT autor, COUNT(*) FROM biblioteca GROUP BY autor;
```

## Atividade

Escreva **um script completo** no terminal, passando pelas três etapas.

**Passo 1 (DDL).** Crie a tabela `biblioteca` com `id` (PK), `titulo`, `autor`, `ano` e
`disponivel`.

**Passo 2 (DML).** Cadastre **6 livros**. Use **pelo menos 2 autores diferentes** e misture livros
disponíveis (`1`) e emprestados (`0`).

**Passo 3 (DML).** Corrija o ano do livro de `id = 1` para `1999`, usando `UPDATE` com `WHERE`.

**Passo 4 (DML).** Remova o livro de `id = 6` com `DELETE` e `WHERE`. Antes, rode o `SELECT` com o
mesmo filtro para conferir.

**Passo 5 (DQL).** Rode e observe cada consulta:

```sql
SELECT * FROM biblioteca;
SELECT titulo, autor FROM biblioteca WHERE disponivel = 1;
SELECT * FROM biblioteca ORDER BY ano;
SELECT autor, COUNT(*) FROM biblioteca GROUP BY autor;
```

Se você conseguir escrever esse script sem consultar as aulas anteriores, a base do trimestre
passado está sólida. Se travar em algum ponto, volte na aula correspondente antes de seguir — o
resto do trimestre depende disso.

## Desafio extra

1. Descubra quantos livros estão emprestados no momento (`COUNT` + `WHERE`).
2. Liste os autores que têm **mais de um** livro cadastrado (`GROUP BY` + `HAVING`).
3. Mostre o livro mais antigo e o mais recente do acervo (`MIN` e `MAX` na coluna `ano`).
