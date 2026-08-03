---
titulo: "Chave estrangeira (FK): ligando tabelas"
mes_numero: 2
numero_sequencial: 4
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 4 — relacionando duas tabelas com chave estrangeira.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela clientes (o lado 'um' do relacionamento)"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('clientes') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome VARCHAR(100));"
  - descricao: "Criar a tabela pedidos com a chave estrangeira cliente_id"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('pedidos') WHERE name='cliente_id')"
    dica: "CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INT, valor INT, FOREIGN KEY (cliente_id) REFERENCES clientes(id));"
  - descricao: "A ligação (FOREIGN KEY) entre pedidos e clientes deve estar declarada"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('pedidos') WHERE \"table\"='clientes')"
    dica: "Não basta criar a coluna cliente_id: é preciso declarar FOREIGN KEY (cliente_id) REFERENCES clientes(id)."
  - descricao: "Cadastrar 2 clientes e pelo menos 3 pedidos ligados a eles"
    sql: "SELECT (SELECT COUNT(*) FROM clientes) >= 2 AND (SELECT COUNT(*) FROM pedidos) >= 3"
    dica: "Insira 2 clientes primeiro (o cliente precisa existir antes do pedido), depois 3 pedidos usando os ids deles."
quiz:
  titulo: "Quiz — Chave estrangeira e relacionamentos"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual é a finalidade da Chave Estrangeira (FK)?"
      opcoes:
        - { id: a, texto: "Identificar de forma única cada registro da própria tabela" }
        - { id: b, texto: "Impedir que a tabela seja excluída" }
        - { id: c, texto: "Ordenar os registros de uma consulta" }
        - { id: d, texto: "Criar a ligação entre duas tabelas, referenciando a chave primária de outra" }
      resposta_correta: d
      explicacao: "A FK é o que permite dizer que um pedido pertence a um cliente específico."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre PK e FK?"
      opcoes:
        - { id: a, texto: "A PK identifica o registro na própria tabela; a FK aponta para a PK de outra tabela" }
        - { id: b, texto: "A PK liga tabelas e a FK identifica registros" }
        - { id: c, texto: "Não há diferença" }
        - { id: d, texto: "A FK é sempre texto e a PK sempre número" }
      resposta_correta: a
      explicacao: "PK = identidade própria. FK = referência a outra tabela."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Em um sistema de loja, onde fica a chave estrangeira?"
      opcoes:
        - { id: a, texto: "Em nenhuma, FK é opcional e não se usa" }
        - { id: b, texto: "Em uma terceira tabela chamada FK" }
        - { id: c, texto: "Na tabela clientes, apontando para todos os pedidos" }
        - { id: d, texto: "Na tabela pedidos, apontando para o cliente dono do pedido" }
      resposta_correta: d
      explicacao: "A FK fica sempre no lado 'muitos': muitos pedidos pertencem a um cliente."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O relacionamento 'um cliente pode ter vários pedidos' é chamado de:"
      opcoes:
        - { id: a, texto: "0:0" }
        - { id: b, texto: "1:1 (um para um)" }
        - { id: c, texto: "1:N (um para muitos)" }
        - { id: d, texto: "N:N (muitos para muitos)" }
      resposta_correta: c
      explicacao: "Um do lado do cliente, muitos do lado dos pedidos."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que é cardinalidade?"
      opcoes:
        - { id: a, texto: "A ordem alfabética dos registros" }
        - { id: b, texto: "A quantidade de colunas de uma tabela" }
        - { id: c, texto: "O tamanho do banco em megabytes" }
        - { id: d, texto: "A definição de quantos registros de uma tabela se relacionam com quantos de outra" }
      resposta_correta: d
      explicacao: "1:1, 1:N e N:N são os tipos de cardinalidade."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Sem chaves estrangeiras, o que aconteceria com as tabelas de um banco?"
      opcoes:
        - { id: a, texto: "Funcionariam exatamente igual" }
        - { id: b, texto: "Seriam apagadas automaticamente" }
        - { id: c, texto: "Viravam uma planilha" }
        - { id: d, texto: "Ficariam isoladas, sem nenhum relacionamento entre si" }
      resposta_correta: d
      explicacao: "Sem FK não há como saber que um pedido pertence a determinado cliente."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Ao cadastrar um pedido para um cliente, o que precisa acontecer primeiro?"
      opcoes:
        - { id: a, texto: "O pedido precisa ser criado antes do cliente" }
        - { id: b, texto: "Tanto faz a ordem" }
        - { id: c, texto: "É preciso apagar a tabela clientes" }
        - { id: d, texto: "O cliente precisa já existir na tabela clientes" }
      resposta_correta: d
      explicacao: "A FK aponta para um registro existente. Sem o cliente cadastrado, não há para onde apontar."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Em uma escola, 'um aluno pode se matricular em vários cursos e um curso tem vários alunos' é um relacionamento:"
      opcoes:
        - { id: a, texto: "Não é um relacionamento" }
        - { id: b, texto: "1:1 (um para um)" }
        - { id: c, texto: "1:N (um para muitos)" }
        - { id: d, texto: "N:N (muitos para muitos)" }
      resposta_correta: d
      explicacao: "Muitos dos dois lados. Esse caso normalmente exige uma terceira tabela, chamada tabela associativa."
---

## Tabelas isoladas não bastam

Na aula passada você aprendeu que a **chave primária** identifica um registro dentro da sua
própria tabela. Mas um sistema real precisa de mais que isso: precisa **relacionar** informações.

Pense em uma loja. Você tem uma tabela `clientes` e uma tabela `pedidos`. Como o banco sabe que o
pedido nº 47 é do cliente Maria, e não do João?

É aí que entra a **Chave Estrangeira** (*Foreign Key*, ou **FK**).

## O que a FK faz

A chave estrangeira **vive em uma tabela e aponta para a chave primária de outra**, criando a
ligação entre as duas.

```sql
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INT,
  valor INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

A última linha é a que importa. Ela se lê assim: *"a coluna `cliente_id` desta tabela referencia a
coluna `id` da tabela `clientes`"*.

Atenção a um detalhe que costuma confundir: **não basta criar a coluna `cliente_id`**. Sem a
linha `FOREIGN KEY ... REFERENCES ...`, ela seria apenas um número solto, sem nenhum significado
para o banco.

## PK e FK lado a lado

| | Chave Primária (PK) | Chave Estrangeira (FK) |
|---|---|---|
| Função | identifica o registro | liga a outra tabela |
| Onde fica | na própria tabela | na tabela do lado "muitos" |
| Pode repetir? | nunca | sim, pode |
| Pode ser nula? | nunca | às vezes sim |

Repare na terceira linha: a FK **pode repetir**, e isso é o esperado. Se a Maria fez cinco
pedidos, o `cliente_id` dela aparece cinco vezes na tabela `pedidos`.

## Cardinalidade: quantos para quantos

**Cardinalidade** é o nome técnico para "quantos registros de uma tabela se relacionam com quantos
da outra":

- **1:1 (um para um)** — cada pessoa tem um único CPF, e cada CPF pertence a uma única pessoa.
- **1:N (um para muitos)** — um cliente tem vários pedidos, mas cada pedido é de um único cliente.
  É o caso mais comum.
- **N:N (muitos para muitos)** — um aluno cursa várias disciplinas e cada disciplina tem vários
  alunos. Esse caso precisa de uma **terceira tabela** para funcionar (chamada tabela
  associativa), que vamos ver mais adiante.

Nos casos 1:N, a FK fica sempre no **lado "muitos"**. Ou seja, `cliente_id` fica em `pedidos`,
nunca o contrário.

## A ordem importa

Como a FK aponta para um registro que precisa **existir**, a ordem de cadastro importa:

1. Primeiro cadastre o **cliente**.
2. Só depois cadastre o **pedido** dele.

Se tentar inverter, você está mandando o pedido apontar para um cliente que não existe.

## Atividade

No terminal abaixo, monte o relacionamento completo:

**Passo 1.** Crie a tabela `clientes` com `id` (chave primária) e `nome`.

**Passo 2.** Crie a tabela `pedidos` com `id` (chave primária), `cliente_id` (a chave estrangeira)
e `valor`. Não esqueça da linha `FOREIGN KEY (cliente_id) REFERENCES clientes(id)`.

**Passo 3.** Cadastre **2 clientes** (lembre: os clientes primeiro!).

**Passo 4.** Cadastre **3 pedidos**, usando os ids dos clientes que você acabou de criar. Faça de
propósito um cliente ter mais de um pedido — assim você vê a FK se repetindo, que é o
comportamento normal em um relacionamento 1:N.

## Desafio extra

Desenhe (no papel ou como comentário no terminal) como ficariam as tabelas de um sistema de
biblioteca com `livros`, `alunos` e `emprestimos`. Onde ficariam as chaves estrangeiras? Qual é a
cardinalidade entre aluno e empréstimo?
