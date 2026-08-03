---
titulo: "INNER JOIN em novos cenários"
mes_numero: 3
numero_sequencial: 14
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 2 — reforcando o INNER JOIN com um cenario novo.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela med_setores"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('med_setores') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE med_setores (id INTEGER PRIMARY KEY, nome VARCHAR(60));"
  - descricao: "Criar a tabela med_exames com FK para med_setores"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('med_exames') WHERE \"table\"='med_setores')"
    dica: "CREATE TABLE med_exames (id INTEGER PRIMARY KEY, nome VARCHAR(80), preco INT, setor_id INT, FOREIGN KEY (setor_id) REFERENCES med_setores(id));"
  - descricao: "Cadastrar 3 setores"
    sql: "SELECT (SELECT COUNT(*) FROM med_setores) >= 3"
    dica: "Por exemplo: Laboratorio, Imagem e Cardiologia."
  - descricao: "Cadastrar 7 exames distribuídos entre os 3 setores"
    sql: "SELECT (SELECT COUNT(*) FROM med_exames) >= 7 AND (SELECT COUNT(DISTINCT setor_id) FROM med_exames) >= 3"
    dica: "Distribua os exames — cada setor precisa ter pelo menos um."
  - descricao: "Ter exames de preços variados (pelo menos 4 valores diferentes)"
    sql: "SELECT (SELECT COUNT(DISTINCT preco) FROM med_exames) >= 4"
    dica: "Varie os preços para os relatórios de soma e média ficarem interessantes."
quiz:
  titulo: "Quiz — INNER JOIN aplicado"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que a cláusula ON define em um JOIN?"
      opcoes:
        - { id: a, texto: "A condição que liga as duas tabelas, normalmente FK igual a PK" }
        - { id: b, texto: "A ordem do resultado" }
        - { id: c, texto: "O filtro de linhas" }
        - { id: d, texto: "Quais colunas serão exibidas" }
      resposta_correta: a
      explicacao: "Quem filtra é o WHERE; o ON define a ligação."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que usar apelidos de tabela, como med_exames e?"
      opcoes:
        - { id: a, texto: "Porque o SQL exige apelidos em JOIN" }
        - { id: b, texto: "Não há motivo" }
        - { id: c, texto: "Para encurtar a consulta e deixá-la mais legível" }
        - { id: d, texto: "Para renomear a tabela no banco" }
      resposta_correta: c
      explicacao: "e.nome é bem mais curto que med_exames.nome, e o significado continua claro."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Quando duas tabelas têm uma coluna com o mesmo nome, o que é obrigatório?"
      opcoes:
        - { id: a, texto: "Apagar uma das colunas" }
        - { id: b, texto: "Dizer de qual tabela vem, usando tabela.coluna ou o apelido" }
        - { id: c, texto: "Nada, o banco escolhe sozinho" }
        - { id: d, texto: "Renomear a coluna em uma das tabelas" }
      resposta_correta: b
      explicacao: "Sem isso o banco responde 'ambiguous column name'."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Como combinar JOIN com filtro por uma coluna da OUTRA tabela?"
      opcoes:
        - { id: a, texto: "Usando dois SELECT separados" }
        - { id: b, texto: "Fazendo o JOIN e usando WHERE com a coluna da tabela juntada" }
        - { id: c, texto: "Não é possível filtrar por outra tabela" }
        - { id: d, texto: "Usando DROP TABLE" }
      resposta_correta: b
      explicacao: "Depois do JOIN, todas as colunas das duas tabelas estão disponíveis para o WHERE."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que faz SELECT s.nome, COUNT(*) FROM exames e INNER JOIN setores s ON e.setor_id=s.id GROUP BY s.nome?"
      opcoes:
        - { id: a, texto: "Conta quantos setores existem" }
        - { id: b, texto: "Soma os preços" }
        - { id: c, texto: "Apaga os exames" }
        - { id: d, texto: "Conta quantos exames existem em cada setor" }
      resposta_correta: d
      explicacao: "O GROUP BY separa por setor e o COUNT conta dentro de cada grupo."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Em um JOIN com GROUP BY, qual coluna costuma ir no GROUP BY?"
      opcoes:
        - { id: a, texto: "A mesma coluna descritiva que aparece no SELECT junto com a função de agregação" }
        - { id: b, texto: "Qualquer uma, tanto faz" }
        - { id: c, texto: "Sempre a chave primária da tabela principal" }
        - { id: d, texto: "Sempre a coluna de preço" }
      resposta_correta: a
      explicacao: "Se você mostra s.nome e um COUNT, o agrupamento é por s.nome."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que acontece com um exame cujo setor_id aponta para um setor inexistente?"
      opcoes:
        - { id: a, texto: "Ele desaparece do resultado do INNER JOIN" }
        - { id: b, texto: "O comando dá erro" }
        - { id: c, texto: "O setor é criado automaticamente" }
        - { id: d, texto: "Aparece com o setor em branco" }
      resposta_correta: a
      explicacao: "O INNER JOIN exige correspondência dos dois lados — e é isso que o LEFT JOIN resolve."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é a ordem correta das cláusulas em uma consulta com JOIN, filtro e ordenação?"
      opcoes:
        - { id: a, texto: "SELECT, FROM, JOIN, ON, WHERE, GROUP BY, ORDER BY" }
        - { id: b, texto: "SELECT, WHERE, FROM, JOIN" }
        - { id: c, texto: "A ordem é livre" }
        - { id: d, texto: "FROM, SELECT, ORDER BY, WHERE" }
      resposta_correta: a
      explicacao: "Essa sequência é fixa e vale para qualquer consulta."
---

## Retomando o INNER JOIN

No trimestre passado você aprendeu a juntar tabelas com `INNER JOIN`. Esta aula é de **reforço**:
o mesmo conceito, aplicado a um cenário novo, para o raciocínio ficar automático.

O cenário agora é uma **clínica de exames**: cada exame pertence a um setor.

## Relembrando a estrutura

```sql
SELECT e.nome, e.preco, s.nome
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id;
```

Três pontos que valem revisar:

**1. A cláusula `ON` é a ligação.** Ela diz **como** as tabelas se conectam — quase sempre no
formato **FK = PK**. Não confunda com o `WHERE`, que **filtra linhas**; o `ON` **liga tabelas**.

**2. Os apelidos encurtam.** Repare no `med_exames e` — o `e` é um apelido. Em vez de
`med_exames.setor_id`, escrevemos `e.setor_id`. Em consultas com duas ou três tabelas, isso muda
completamente a legibilidade.

**3. O prefixo é obrigatório quando há ambiguidade.** As duas tabelas têm uma coluna `nome`. Sem
dizer de qual delas se trata, o banco responde *"ambiguous column name"*.

E use `AS` para deixar o relatório claro:

```sql
SELECT
  e.nome  AS exame,
  e.preco AS valor,
  s.nome  AS setor
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id;
```

## Combinando com filtro

Depois do JOIN, **todas as colunas das duas tabelas** estão disponíveis. Isso permite filtrar por
uma coluna da tabela juntada:

```sql
-- Exames de um setor especifico
SELECT e.nome AS exame, e.preco AS valor
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
WHERE s.nome = 'Laboratorio';
```

Repare: o filtro usa `s.nome`, que vem da **outra** tabela. Sem o JOIN, isso seria impossível em
uma consulta só.

## Combinando com agregação

Aqui o JOIN mostra todo o seu valor — relatórios gerenciais:

```sql
-- Quantos exames por setor
SELECT s.nome AS setor, COUNT(*) AS total
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
GROUP BY s.nome;

-- Faturamento potencial por setor
SELECT s.nome AS setor, SUM(e.preco) AS total
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
GROUP BY s.nome
ORDER BY total DESC;
```

A regra do `GROUP BY` continua a mesma: a coluna descritiva que aparece no `SELECT` junto com a
função de agregação é a que vai no agrupamento.

## A ordem das cláusulas

Vale fixar de vez, porque cai em prova:

```sql
SELECT   -- o que trazer
FROM     -- tabela principal
JOIN     -- tabela a juntar
ON       -- como ligar
WHERE    -- filtro
GROUP BY -- agrupamento
ORDER BY -- ordenação
```

## Atividade

**Passo 1.** Crie a tabela `med_setores` com `id` (PK) e `nome`.

**Passo 2.** Crie a tabela `med_exames` com `id` (PK), `nome`, `preco`, `setor_id` e a
**`FOREIGN KEY`** apontando para `med_setores(id)`.

**Passo 3.** Cadastre **3 setores** (por exemplo Laboratorio, Imagem e Cardiologia).

**Passo 4.** Cadastre **7 exames**, distribuídos entre os três setores, com **preços variados**
(pelo menos 4 valores diferentes).

**Passo 5.** Rode e observe cada consulta:

```sql
-- Relatorio completo com apelidos
SELECT e.nome AS exame, e.preco AS valor, s.nome AS setor
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
ORDER BY s.nome, e.nome;

-- Filtrando por setor
SELECT e.nome AS exame
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
WHERE s.nome = 'Laboratorio';

-- Quantos exames por setor
SELECT s.nome AS setor, COUNT(*) AS total
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
GROUP BY s.nome;

-- Faturamento potencial por setor
SELECT s.nome AS setor, SUM(e.preco) AS total
FROM med_exames e
INNER JOIN med_setores s ON e.setor_id = s.id
GROUP BY s.nome
ORDER BY total DESC;
```

**Passo 6.** Escreva sozinho, sem copiar: uma consulta que mostre **o exame mais caro de cada
setor** (dica: `MAX` com `GROUP BY`).

## Desafio extra

1. Calcule a **média de preço** por setor e ordene do mais caro para o mais barato.
2. Mostre apenas os setores que têm **mais de 2 exames** (use `HAVING` depois do `GROUP BY`).
3. Cadastre um exame com `setor_id` apontando para um setor que **não existe** (por exemplo 99).
   Rode o relatório completo de novo e conte as linhas. Onde foi parar esse exame? Guarde essa
   observação — a próxima aula resolve exatamente isso.
