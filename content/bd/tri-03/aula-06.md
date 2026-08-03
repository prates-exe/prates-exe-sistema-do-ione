---
titulo: "Boas práticas: escrevendo scripts SQL profissionais"
mes_numero: 3
numero_sequencial: 18
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 5 — reescrevendo um script bagunçado.
  -- Copie o script ruim do material e reescreva com boas praticas.
criterios_validacao:
  - descricao: "Criar a tabela cadastro_clientes com nomes claros"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('cadastro_clientes') WHERE name IN ('id','nome_completo','email','cidade')) = 4"
    dica: "Use nomes que se explicam: nome_completo, email, cidade — não n, e, c."
  - descricao: "Cadastrar pelo menos 4 clientes"
    sql: "SELECT (SELECT COUNT(*) FROM cadastro_clientes) >= 4"
    dica: "Insira 4 clientes com dados coerentes."
  - descricao: "Ter clientes de pelo menos 2 cidades"
    sql: "SELECT (SELECT COUNT(DISTINCT cidade) FROM cadastro_clientes) >= 2"
    dica: "Varie a cidade para os relatórios fazerem sentido."
  - descricao: "Criar a view relatorio_clientes_cidade"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='relatorio_clientes_cidade')"
    dica: "CREATE VIEW relatorio_clientes_cidade AS SELECT cidade, COUNT(*) AS total FROM cadastro_clientes GROUP BY cidade;"
quiz:
  titulo: "Quiz — Boas práticas em SQL"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que nomes de tabelas e colunas devem ser descritivos?"
      opcoes:
        - { id: a, texto: "Porque o script é lido muitas vezes, por você e por outras pessoas" }
        - { id: b, texto: "Não faz diferença" }
        - { id: c, texto: "Porque deixa a consulta mais rápida" }
        - { id: d, texto: "Porque nomes curtos não funcionam" }
      resposta_correta: a
      explicacao: "Um nome como 'n' obriga quem lê a adivinhar. 'nome_completo' se explica sozinho."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é a convenção mais comum para nomes em SQL?"
      opcoes:
        - { id: a, texto: "Cada um escolhe na hora, sem padrão" }
        - { id: b, texto: "Sempre com acentos e cedilha" }
        - { id: c, texto: "Tudo em MAIÚSCULO com espaços" }
        - { id: d, texto: "Tudo em minúsculo, com underscore separando palavras (snake_case)" }
      resposta_correta: d
      explicacao: "nome_completo, data_nascimento. Evite acentos, espaços e maiúsculas em nomes."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que evitar acentos e espaços em nomes de colunas?"
      opcoes:
        - { id: a, texto: "Porque deixam o banco maior" }
        - { id: b, texto: "Porque o SQL não aceita letras" }
        - { id: c, texto: "Não é preciso evitar" }
        - { id: d, texto: "Porque causam problemas de compatibilidade e obrigam a usar aspas o tempo todo" }
      resposta_correta: d
      explicacao: "Um nome como \"Data de Nascimento\" exige aspas em toda consulta. data_nascimento não."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual a vantagem de escrever as palavras-chave do SQL em MAIÚSCULO?"
      opcoes:
        - { id: a, texto: "Destaca visualmente os comandos e separa do que é nome de tabela ou coluna" }
        - { id: b, texto: "Faz a consulta rodar mais rápido" }
        - { id: c, texto: "Nenhuma vantagem" }
        - { id: d, texto: "É obrigatório, senão dá erro" }
      resposta_correta: a
      explicacao: "SELECT, FROM e WHERE em maiúsculo ficam evidentes no meio do script."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Para que servem comentários em um script SQL?"
      opcoes:
        - { id: a, texto: "Não existem comentários em SQL" }
        - { id: b, texto: "Aumentar o tamanho do arquivo" }
        - { id: c, texto: "Explicar a intenção de trechos que não são óbvios, e separar as seções do script" }
        - { id: d, texto: "Fazer o script rodar" }
      resposta_correta: c
      explicacao: "Em SQL o comentário de linha começa com dois hifens."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que quebrar uma consulta longa em várias linhas?"
      opcoes:
        - { id: a, texto: "Porque cada cláusula em sua linha torna a estrutura visível e o erro fácil de achar" }
        - { id: b, texto: "Porque o SQL exige uma linha por cláusula" }
        - { id: c, texto: "Não há motivo" }
        - { id: d, texto: "Para o arquivo ficar maior" }
      resposta_correta: a
      explicacao: "SELECT, FROM, WHERE e ORDER BY cada um em sua linha é o padrão profissional."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual é o problema de usar SELECT * em um relatório definitivo?"
      opcoes:
        - { id: a, texto: "Não há problema" }
        - { id: b, texto: "Traz colunas desnecessárias e quebra o relatório se a tabela mudar" }
        - { id: c, texto: "É proibido em SQL" }
        - { id: d, texto: "Não funciona em views" }
      resposta_correta: b
      explicacao: "Em testes o * é ótimo; em código definitivo, liste as colunas que você realmente quer."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é a ordem recomendada das seções em um script completo?"
      opcoes:
        - { id: a, texto: "Só as consultas importam" }
        - { id: b, texto: "Tudo misturado, sem ordem" }
        - { id: c, texto: "Consultas primeiro, tabelas depois" }
        - { id: d, texto: "Criação das tabelas, inserção dos dados e por fim as consultas" }
      resposta_correta: d
      explicacao: "Assim o script pode ser executado de cima para baixo por qualquer pessoa."
---

## O script que ninguém entende

Você já sabe escrever SQL que **funciona**. Agora vamos falar de SQL que **outras pessoas
conseguem ler** — inclusive você daqui a um mês.

Compare estes dois scripts. Os dois fazem **exatamente a mesma coisa**:

```sql
create table cli(i int primary key,n varchar(100),e varchar(100),c varchar(50));
insert into cli values(1,'Ana Silva','ana@email.com','Teofilo Otoni');
select c,count(*) from cli group by c;
```

```sql
-- Cadastro de clientes da loja
CREATE TABLE cadastro_clientes (
  id            INTEGER PRIMARY KEY,
  nome_completo VARCHAR(100),
  email         VARCHAR(100),
  cidade        VARCHAR(50)
);

INSERT INTO cadastro_clientes (id, nome_completo, email, cidade)
VALUES (1, 'Ana Silva', 'ana@email.com', 'Teofilo Otoni');

-- Quantos clientes por cidade
SELECT cidade, COUNT(*) AS total
FROM cadastro_clientes
GROUP BY cidade;
```

O segundo é mais longo. E é infinitamente melhor.

## Regra 1: nomes que se explicam

`i`, `n`, `e`, `c` obrigam quem lê a adivinhar. `id`, `nome_completo`, `email`, `cidade` se
explicam sozinhos.

A convenção mais usada em SQL é o **snake_case**: tudo minúsculo, com underscore separando as
palavras.

```
nome_completo      data_nascimento      valor_total
```

**Evite acentos, espaços e maiúsculas** nos nomes. Um nome como `"Data de Nascimento"` obriga você
a usar aspas em **toda** consulta e costuma dar problema ao trocar de banco.

## Regra 2: palavras-chave em maiúsculo

Escrever os comandos do SQL em MAIÚSCULO e os seus nomes em minúsculo cria um contraste visual que
ajuda muito:

```sql
SELECT nome_completo, cidade
FROM cadastro_clientes
WHERE cidade = 'Teofilo Otoni';
```

Fica evidente o que é comando e o que é nome. Não é obrigatório — o SQL funciona igual — mas é o
padrão profissional.

## Regra 3: uma cláusula por linha

Consultas longas em uma linha só são ilegíveis. Cada cláusula na sua linha:

```sql
SELECT cidade, COUNT(*) AS total
FROM cadastro_clientes
WHERE cidade <> ''
GROUP BY cidade
ORDER BY total DESC;
```

A estrutura fica visível de relance, e quando dá erro você identifica na hora **qual parte** está
com problema.

## Regra 4: liste as colunas no que for definitivo

O `SELECT *` é ótimo para explorar e testar. Mas em um relatório definitivo ou em uma view, liste
as colunas:

```sql
-- Explorando: tudo bem
SELECT * FROM cadastro_clientes;

-- Relatório definitivo: melhor assim
SELECT nome_completo, email FROM cadastro_clientes;
```

Motivo: se alguém adicionar uma coluna nova na tabela, o `SELECT *` passa a trazer dados que o
relatório não esperava.

## Regra 5: comente as seções

Em SQL, o comentário de linha começa com **dois hifens**:

```sql
-- ============================================
-- Estrutura
-- ============================================
CREATE TABLE ...

-- ============================================
-- Dados iniciais
-- ============================================
INSERT INTO ...
```

Comente a **intenção**, não o óbvio. `-- cria a tabela` em cima de um `CREATE TABLE` não ajuda;
`-- Clientes ativos, usado no relatório mensal` ajuda muito.

## Regra 6: ordem lógica do script

Um bom script pode ser executado **de cima para baixo** por qualquer pessoa, na ordem:

1. **Estrutura** — todos os `CREATE TABLE`.
2. **Dados** — os `INSERT`.
3. **Manutenção** — `UPDATE` e `DELETE`, se houver.
4. **Consultas e views** — o que extrai informação.

Misturar as seções faz o script quebrar quando alguém tenta rodar do início.

## Atividade

Sua tarefa é **reescrever o script ruim** aplicando todas as regras.

**Passo 1.** Crie a tabela `cadastro_clientes` com `id`, `nome_completo`, `email` e `cidade` —
usando indentação, palavras-chave em maiúsculo e nomes claros.

**Passo 2.** Cadastre **4 clientes**, de **pelo menos 2 cidades diferentes**, com o `INSERT`
listando as colunas explicitamente.

**Passo 3.** Crie a view `relatorio_clientes_cidade`, com a cidade e o total de clientes,
formatada em várias linhas.

**Passo 4.** Organize tudo com comentários de seção separando estrutura, dados e consultas.

O checklist confere a estrutura e os nomes. A **formatação** não dá para verificar
automaticamente — mas é justamente ela que a professora vai olhar, e é o que vai diferenciar o
seu projeto final.

## Desafio extra

1. Pegue o script ruim do começo da aula, copie no terminal e reescreva **linha por linha** com as
   boas práticas. Compare os dois lado a lado.
2. Escreva uma consulta com `JOIN`, `WHERE`, `GROUP BY` e `ORDER BY` seguindo todas as regras de
   formatação.
3. Revise os scripts que você escreveu nas aulas anteriores. Quantas das seis regras você já
   estava seguindo sem perceber?
