---
titulo: "UPDATE e DELETE: alterar e apagar com segurança"
mes_numero: 2
numero_sequencial: 6
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 6 — UPDATE, DELETE e o perigo de esquecer o WHERE.
  -- Siga a atividade passo a passo. Preste MUITA atenção no passo 4.
criterios_validacao:
  - descricao: "Criar a tabela estoque"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('estoque') WHERE name IN ('id','produto','quantidade')) = 3"
    dica: "CREATE TABLE estoque (id INTEGER PRIMARY KEY, produto VARCHAR(100), quantidade INT);"
  - descricao: "Inserir 4 itens no estoque"
    sql: "SELECT (SELECT COUNT(*) FROM estoque) >= 4"
    dica: "Insira 4 linhas com INSERT INTO estoque (id, produto, quantidade) VALUES (...);"
  - descricao: "Alterar a quantidade de UM item para 99, usando UPDATE com WHERE"
    sql: "SELECT (SELECT COUNT(*) FROM estoque WHERE quantidade = 99) = 1"
    dica: "UPDATE estoque SET quantidade = 99 WHERE id = 1; — se mais de um item ficou com 99, você esqueceu o WHERE."
  - descricao: "Apagar UM item com DELETE + WHERE (devem sobrar 3)"
    sql: "SELECT (SELECT COUNT(*) FROM estoque) = 3"
    dica: "DELETE FROM estoque WHERE id = 4; — apague apenas um. Se a tabela ficou vazia, o WHERE foi esquecido."
  - descricao: "A tabela estoque deve continuar existindo (DELETE não apaga a tabela)"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='estoque')"
    dica: "Se a tabela sumiu, você usou DROP TABLE em vez de DELETE. Crie de novo e refaça o passo com DELETE."
quiz:
  titulo: "Quiz — UPDATE, DELETE e WHERE"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual comando altera informações de um registro que já existe?"
      opcoes:
        - { id: a, texto: "UPDATE" }
        - { id: b, texto: "CREATE TABLE" }
        - { id: c, texto: "INSERT INTO" }
        - { id: d, texto: "SELECT" }
      resposta_correta: a
      explicacao: "INSERT cria novo, UPDATE altera existente, DELETE remove."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual comando remove registros de dentro de uma tabela, mas MANTÉM a tabela no banco?"
      opcoes:
        - { id: a, texto: "SELECT" }
        - { id: b, texto: "CREATE TABLE" }
        - { id: c, texto: "DELETE" }
        - { id: d, texto: "DROP TABLE" }
      resposta_correta: c
      explicacao: "DELETE tira as linhas; a tabela continua existindo. DROP TABLE apaga a tabela inteira."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que acontece ao executar UPDATE sem a cláusula WHERE?"
      opcoes:
        - { id: a, texto: "Só a primeira linha é alterada" }
        - { id: b, texto: "Todas as linhas da tabela são alteradas de uma vez" }
        - { id: c, texto: "Nada acontece" }
        - { id: d, texto: "O banco pede confirmação antes" }
      resposta_correta: b
      explicacao: "Sem filtro, o comando não tem limite. É um dos erros mais caros que existem."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece ao executar DELETE FROM alunos; sem WHERE?"
      opcoes:
        - { id: a, texto: "Todos os alunos são apagados da tabela" }
        - { id: b, texto: "A tabela é apagada do banco" }
        - { id: c, texto: "Apenas o último aluno é apagado" }
        - { id: d, texto: "O banco recusa o comando" }
      resposta_correta: a
      explicacao: "Todas as linhas somem, mas a tabela (vazia) continua existindo."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é a prática recomendada antes de rodar um DELETE ou UPDATE arriscado?"
      opcoes:
        - { id: a, texto: "Nunca usar WHERE" }
        - { id: b, texto: "Rodar direto, é mais rápido" }
        - { id: c, texto: "Testar o mesmo filtro WHERE em um SELECT primeiro, para ver quais linhas seriam afetadas" }
        - { id: d, texto: "Apagar a tabela e recriar" }
      resposta_correta: c
      explicacao: "O SELECT mostra exatamente o que será afetado, sem alterar nada."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre DELETE e DROP TABLE?"
      opcoes:
        - { id: a, texto: "São exatamente a mesma coisa" }
        - { id: b, texto: "DELETE apaga o banco todo" }
        - { id: c, texto: "DELETE remove linhas e mantém a tabela; DROP TABLE elimina a tabela inteira, estrutura e tudo" }
        - { id: d, texto: "DROP TABLE só funciona em tabelas vazias" }
      resposta_correta: c
      explicacao: "DELETE é DML (mexe nos dados); DROP TABLE é DDL (mexe na estrutura)."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Na sintaxe UPDATE estoque SET quantidade = 10 WHERE id = 3, o que o WHERE está fazendo?"
      opcoes:
        - { id: a, texto: "Ordenando os resultados" }
        - { id: b, texto: "Apagando o registro 3" }
        - { id: c, texto: "Criando um registro novo com id 3" }
        - { id: d, texto: "Limitando a alteração apenas ao registro cujo id é 3" }
      resposta_correta: d
      explicacao: "O WHERE é o filtro que define quais linhas serão afetadas."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que o WHERE é considerado 'obrigatório na prática' em UPDATE e DELETE, mesmo sendo opcional na sintaxe?"
      opcoes:
        - { id: a, texto: "Porque deixa a consulta mais bonita" }
        - { id: b, texto: "Porque o banco não funciona sem ele" }
        - { id: c, texto: "Porque sem ele o comando afeta a tabela inteira, o que quase nunca é a intenção" }
        - { id: d, texto: "Porque acelera o banco" }
      resposta_correta: c
      explicacao: "A sintaxe permite omitir, mas omitir por engano já destruiu muitos bancos de dados reais."
---

## Os dados mudam

Depois de cadastrar, a vida continua: preços mudam, um cliente corrige o telefone, um produto sai
de linha. Para isso existem os outros dois comandos da **DML**:

- `UPDATE` — **altera** registros que já existem.
- `DELETE` — **remove** registros.

## UPDATE: alterando

```sql
UPDATE estoque
SET quantidade = 45
WHERE id = 1;
```

Lendo em partes:

- `UPDATE estoque` — qual tabela.
- `SET quantidade = 45` — o que muda.
- `WHERE id = 1` — **quais linhas** serão afetadas.

Dá para alterar mais de uma coluna de uma vez, separando por vírgula:

```sql
UPDATE estoque
SET quantidade = 45, produto = 'Caderno grande'
WHERE id = 1;
```

## DELETE: removendo

```sql
DELETE FROM estoque
WHERE id = 4;
```

Repare em uma diferença importante: o `DELETE` **tira as linhas de dentro da tabela, mas a tabela
continua existindo** no banco, apenas com menos registros (ou vazia).

Quem elimina a tabela inteira — estrutura, colunas e tudo — é outro comando:

```sql
DROP TABLE estoque;
```

`DELETE` é DML (mexe nos dados). `DROP TABLE` é DDL (mexe na estrutura). Confundir os dois é um
erro grave, e é pergunta certa em prova.

## O erro mais caro da profissão

Tanto o `UPDATE` quanto o `DELETE` aceitam a cláusula `WHERE`, que funciona como um filtro dizendo
exatamente quais registros devem ser afetados.

**Quando esse filtro é esquecido, o comando não tem limite.**

```sql
UPDATE estoque SET quantidade = 0;
```

Esse comando zera a quantidade de **todos** os produtos da tabela.

```sql
DELETE FROM estoque;
```

Esse apaga **todos** os registros da tabela.

Não existe "desfazer" nem confirmação: o banco faz exatamente o que foi mandado. Casos reais de
empresas perdendo bases inteiras por causa de um `WHERE` esquecido não são raros.

## A regra de ouro para não errar

Antes de rodar um `UPDATE` ou `DELETE`, **teste o filtro em um `SELECT` primeiro**:

```sql
-- 1. Primeiro veja QUAIS linhas seriam afetadas:
SELECT * FROM estoque WHERE id = 4;

-- 2. Só depois, se estiver certo, execute de verdade:
DELETE FROM estoque WHERE id = 4;
```

O `SELECT` não altera nada — é totalmente seguro. Se ele retornar as linhas que você espera, o
`DELETE` com o mesmo `WHERE` vai atingir exatamente essas.

Outra prática comum é **escrever o `WHERE` primeiro** e só depois voltar e escrever o começo do
comando, para nunca correr o risco de executar pela metade.

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `estoque` com `id` (PK), `produto` (texto) e `quantidade` (número).

**Passo 2.** Cadastre **4 itens**.

**Passo 3.** Use `UPDATE` para mudar a quantidade de **apenas um** item para `99`. Use o `WHERE`
com o `id`. O checklist confere que **só um** item ficou com 99 — se você esquecer o `WHERE`,
todos ficarão, e o item não vai marcar.

**Passo 4.** Antes de apagar, treine a regra de ouro: rode primeiro um `SELECT` com o filtro que
pretende usar. Confira o resultado. Só então use `DELETE` para remover **apenas um** item.

Ao final devem sobrar **3 itens** e a tabela `estoque` deve continuar existindo.

## Desafio extra

Recrie a situação do erro clássico, com cuidado, para ver o efeito:

1. Crie uma tabela `rascunho` com 3 linhas quaisquer.
2. Rode `UPDATE rascunho SET ...` **sem** `WHERE` e veja todas as linhas mudarem.
3. Rode `DELETE FROM rascunho;` sem `WHERE` e veja a tabela ficar vazia.
4. Confirme com `SELECT * FROM rascunho;` que a **tabela ainda existe**, só que sem linhas.
5. Agora use `DROP TABLE rascunho;` e perceba a diferença: agora sim a tabela sumiu de vez.

Fazer isso de propósito, em uma tabela descartável, é a melhor forma de nunca mais confundir
`DELETE` com `DROP TABLE`.
