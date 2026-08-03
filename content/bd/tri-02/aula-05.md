---
titulo: "INSERT INTO: cadastrando dados"
mes_numero: 2
numero_sequencial: 5
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 5 — inserindo dados.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela produtos"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('produtos') WHERE name IN ('id','nome','preco','quantidade')) = 4"
    dica: "CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome VARCHAR(100), preco INT, quantidade INT);"
  - descricao: "Inserir pelo menos 5 produtos"
    sql: "SELECT (SELECT COUNT(*) FROM produtos) >= 5"
    dica: "Use INSERT INTO produtos (id, nome, preco, quantidade) VALUES (...); uma vez para cada produto."
  - descricao: "Inserir vários produtos de uma vez só (usando VALUES com várias linhas)"
    sql: "SELECT (SELECT COUNT(*) FROM produtos) >= 8"
    dica: "Um único INSERT pode inserir várias linhas: VALUES (6,'A',10,5), (7,'B',20,3), (8,'C',30,1);"
quiz:
  titulo: "Quiz — INSERT INTO"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual comando adiciona um novo registro a uma tabela existente?"
      opcoes:
        - { id: a, texto: "INSERT INTO" }
        - { id: b, texto: "SELECT" }
        - { id: c, texto: "UPDATE" }
        - { id: d, texto: "CREATE TABLE" }
      resposta_correta: a
      explicacao: "CREATE TABLE cria a estrutura; INSERT INTO coloca os dados dentro dela."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Na sintaxe INSERT INTO produtos (nome, preco) VALUES ('Caderno', 15), o que é 'Caderno'?"
      opcoes:
        - { id: a, texto: "O nome da coluna" }
        - { id: b, texto: "O nome da tabela" }
        - { id: c, texto: "O valor que será gravado na coluna nome" }
        - { id: d, texto: "Um comentário" }
      resposta_correta: c
      explicacao: "A ordem dos VALUES segue exatamente a ordem das colunas listadas antes."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que valores de texto ficam entre aspas simples no INSERT?"
      opcoes:
        - { id: a, texto: "Aspas não são necessárias" }
        - { id: b, texto: "Para deixar o texto em negrito" }
        - { id: c, texto: "Para o banco saber que é texto, e não o nome de uma coluna" }
        - { id: d, texto: "Só por questão de estilo" }
      resposta_correta: c
      explicacao: "Sem aspas, o banco procuraria uma coluna com aquele nome e daria erro."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Números precisam de aspas no INSERT?"
      opcoes:
        - { id: a, texto: "Só se forem maiores que 100" }
        - { id: b, texto: "Não, números vão sem aspas" }
        - { id: c, texto: "Sim, sempre" }
        - { id: d, texto: "Só se a coluna for PK" }
      resposta_correta: b
      explicacao: "Texto vai entre aspas simples; números vão direto."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que acontece se a ordem dos VALUES não bater com a ordem das colunas listadas?"
      opcoes:
        - { id: a, texto: "A tabela é apagada" }
        - { id: b, texto: "Nada, a ordem não importa" }
        - { id: c, texto: "O banco corrige sozinho" }
        - { id: d, texto: "Os dados vão para as colunas erradas, ou o banco dá erro de tipo" }
      resposta_correta: d
      explicacao: "A correspondência é pela posição: a primeira coluna recebe o primeiro valor, e assim por diante."
    - id: q6
      tipo: multipla_escolha
      enunciado: "É possível inserir várias linhas com um único comando INSERT?"
      opcoes:
        - { id: a, texto: "Não, sempre é um INSERT por linha" }
        - { id: b, texto: "Sim, separando cada conjunto de valores por vírgula depois do VALUES" }
        - { id: c, texto: "Só em bancos NoSQL" }
        - { id: d, texto: "Só se a tabela estiver vazia" }
      resposta_correta: b
      explicacao: "VALUES (1,'A'), (2,'B'), (3,'C'); insere três linhas de uma vez."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Se você tentar inserir um registro com uma PK que já existe, o que acontece?"
      opcoes:
        - { id: a, texto: "O registro antigo é substituído" }
        - { id: b, texto: "A tabela é duplicada" }
        - { id: c, texto: "O banco aceita normalmente" }
        - { id: d, texto: "O banco recusa e mostra erro de violação de unicidade" }
      resposta_correta: d
      explicacao: "É a regra da chave primária protegendo a integridade dos dados."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Ao inserir um pedido que tem chave estrangeira para clientes, o que precisa ser feito antes?"
      opcoes:
        - { id: a, texto: "Nada, a ordem não importa" }
        - { id: b, texto: "Apagar a tabela clientes" }
        - { id: c, texto: "Cadastrar o cliente, porque a FK precisa apontar para um registro existente" }
        - { id: d, texto: "Inserir o pedido duas vezes" }
      resposta_correta: c
      explicacao: "A FK aponta para um registro que precisa existir de verdade."
---

## Agora sim, os dados

Nas quatro primeiras aulas você montou a **estrutura**: tabelas, tipos, chave primária e chave
estrangeira. Tudo isso é DDL. Agora começa a **DML** (Linguagem de Manipulação de Dados) — os
comandos que mexem no conteúdo.

O primeiro deles é o `INSERT INTO`, que **adiciona registros novos**.

## A sintaxe

```sql
INSERT INTO produtos (id, nome, preco, quantidade)
VALUES (1, 'Caderno', 15, 50);
```

Lendo em partes:

- `INSERT INTO produtos` — em qual tabela vamos inserir.
- `(id, nome, preco, quantidade)` — **quais colunas** vamos preencher.
- `VALUES (1, 'Caderno', 15, 50)` — **os valores**, na mesma ordem das colunas.

A correspondência é **pela posição**: o primeiro valor vai para a primeira coluna listada, o
segundo para a segunda, e assim por diante. Se você trocar a ordem, os dados vão para o lugar
errado.

## Aspas: quando usar

Essa é a fonte de metade dos erros de iniciante:

- **Texto** vai entre **aspas simples**: `'Caderno'`
- **Números** vão **sem aspas**: `15`
- **Datas** vão entre aspas, no formato ano-mês-dia: `'2026-08-15'`

Por que o texto precisa de aspas? Porque sem elas o banco pensa que `Caderno` é o **nome de uma
coluna** e vai procurar uma coluna com esse nome — que não existe. O erro que aparece nesse caso é
justamente "no such column: Caderno".

## Inserindo várias linhas de uma vez

Cadastrar 20 produtos com 20 comandos separados é cansativo. Dá para fazer tudo em um comando só:

```sql
INSERT INTO produtos (id, nome, preco, quantidade)
VALUES
  (1, 'Caderno', 15, 50),
  (2, 'Caneta', 3, 200),
  (3, 'Mochila', 90, 12);
```

Cada conjunto de parênteses é uma linha nova. Repare que a vírgula separa os conjuntos, e o ponto
e vírgula só aparece no **final de tudo**.

## Erros comuns nesta aula

1. **Esquecer as aspas no texto** → "no such column".
2. **Quantidade de valores diferente da quantidade de colunas** → o banco reclama que o número de
   valores não bate.
3. **Repetir uma chave primária** → violação de unicidade (foi o que testamos na Aula 3).
4. **Inserir um pedido antes do cliente existir** → a chave estrangeira não encontra para onde
   apontar.

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `produtos` com:

- `id` — `INTEGER PRIMARY KEY`
- `nome` — `VARCHAR(100)`
- `preco` — `INT`
- `quantidade` — `INT`

**Passo 2.** Cadastre **5 produtos**, um comando `INSERT` de cada vez. Use produtos de uma
papelaria, uma loja de roupas, o que preferir — mas pense em preços e quantidades que façam
sentido.

**Passo 3.** Agora cadastre **mais 3 produtos usando um único comando `INSERT`**, com os três
conjuntos de valores separados por vírgula. No final você terá 8 produtos.

Confira o resultado com:

```sql
SELECT * FROM produtos;
```

## Desafio extra

Tente inserir um produto **de propósito errado** e leia a mensagem de erro em cada caso:

1. Esqueça as aspas no nome do produto.
2. Passe só 3 valores para 4 colunas.
3. Repita um `id` que já existe.

Saber reconhecer essas três mensagens vai te economizar muito tempo depois.
