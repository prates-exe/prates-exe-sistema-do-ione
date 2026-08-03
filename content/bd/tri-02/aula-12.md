---
titulo: "Projeto integrador: modelando um sistema completo"
mes_numero: 2
numero_sequencial: 12
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 12 — projeto final do trimestre: sistema de uma clinica.
  -- Voce vai modelar, criar, popular e consultar. Siga os passos.
criterios_validacao:
  - descricao: "Criar a tabela pacientes (id, nome, nascimento)"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('pacientes') WHERE name IN ('id','nome','nascimento')) = 3"
    dica: "CREATE TABLE pacientes (id INTEGER PRIMARY KEY, nome VARCHAR(100), nascimento DATE);"
  - descricao: "Criar a tabela medicos (id, nome, especialidade)"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('medicos') WHERE name IN ('id','nome','especialidade')) = 3"
    dica: "CREATE TABLE medicos (id INTEGER PRIMARY KEY, nome VARCHAR(100), especialidade VARCHAR(60));"
  - descricao: "Criar a tabela associativa consultas com as duas FKs"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_foreign_key_list('consultas')) >= 2"
    dica: "CREATE TABLE consultas (id INTEGER PRIMARY KEY, paciente_id INT, medico_id INT, data_consulta DATE, valor INT, FOREIGN KEY (paciente_id) REFERENCES pacientes(id), FOREIGN KEY (medico_id) REFERENCES medicos(id));"
  - descricao: "A tabela consultas deve guardar data e valor (dados da relação)"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('consultas') WHERE name IN ('data_consulta','valor')) = 2"
    dica: "data_consulta e valor não pertencem ao paciente nem ao médico: pertencem à consulta."
  - descricao: "Cadastrar 4 pacientes e 3 médicos"
    sql: "SELECT (SELECT COUNT(*) FROM pacientes) >= 4 AND (SELECT COUNT(*) FROM medicos) >= 3"
    dica: "Insira 4 pacientes e 3 médicos antes de marcar as consultas."
  - descricao: "Cadastrar ao menos 8 consultas, com um médico atendendo vários pacientes"
    sql: "SELECT (SELECT COUNT(*) FROM consultas) >= 8 AND EXISTS(SELECT 1 FROM consultas GROUP BY medico_id HAVING COUNT(DISTINCT paciente_id) >= 2)"
    dica: "Marque 8 consultas, garantindo que pelo menos um médico atenda 2 pacientes diferentes."
  - descricao: "Corrigir o valor de uma consulta com UPDATE + WHERE"
    sql: "SELECT EXISTS(SELECT 1 FROM consultas WHERE valor = 250)"
    dica: "UPDATE consultas SET valor = 250 WHERE id = 1; — sempre com WHERE!"
quiz:
  titulo: "Quiz — Fechamento do trimestre"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual é a ordem correta de trabalho ao montar um banco do zero?"
      opcoes:
        - { id: a, texto: "A ordem não importa" }
        - { id: b, texto: "Consultar, inserir, criar as tabelas e depois modelar" }
        - { id: c, texto: "Inserir os dados antes de criar as tabelas" }
        - { id: d, texto: "Modelar as tabelas, criar com DDL, popular com DML e então consultar com DQL" }
      resposta_correta: d
      explicacao: "Sem estrutura não há onde inserir; sem dados não há o que consultar."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Em um sistema de clínica, o valor e a data pertencem a qual tabela?"
      opcoes:
        - { id: a, texto: "À tabela pacientes" }
        - { id: b, texto: "A nenhuma, não devem ser guardados" }
        - { id: c, texto: "À tabela consultas, porque são dados da relação entre paciente e médico" }
        - { id: d, texto: "À tabela medicos" }
      resposta_correta: c
      explicacao: "Um paciente não tem 'uma data'; a consulta é que tem. Esse raciocínio é a essência da modelagem."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Um médico atende vários pacientes e um paciente consulta vários médicos. Qual é a cardinalidade?"
      opcoes:
        - { id: a, texto: "N:M, resolvida com uma tabela associativa" }
        - { id: b, texto: "Não há relacionamento" }
        - { id: c, texto: "1:1" }
        - { id: d, texto: "1:N com FK em pacientes" }
      resposta_correta: a
      explicacao: "Muitos dos dois lados sempre exige a terceira tabela."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Quais grupos de comandos SQL você usa ao construir e usar um banco?"
      opcoes:
        - { id: a, texto: "Apenas DDL" }
        - { id: b, texto: "Apenas DQL" }
        - { id: c, texto: "DDL para a estrutura, DML para os dados e DQL para as consultas" }
        - { id: d, texto: "HTML, CSS e JavaScript" }
      resposta_correta: c
      explicacao: "CREATE TABLE (DDL), INSERT/UPDATE/DELETE (DML), SELECT (DQL)."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Para saber quanto cada médico faturou, quais recursos você combina?"
      opcoes:
        - { id: a, texto: "Somente ORDER BY" }
        - { id: b, texto: "Apenas CREATE TABLE" }
        - { id: c, texto: "Apenas DELETE" }
        - { id: d, texto: "INNER JOIN com GROUP BY e SUM" }
      resposta_correta: d
      explicacao: "JOIN traz o nome, GROUP BY agrupa por médico e SUM soma os valores."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Antes de rodar um UPDATE que corrige um valor, qual é a prática segura?"
      opcoes:
        - { id: a, texto: "Rodar sem WHERE, é mais rápido" }
        - { id: b, texto: "Rodar um SELECT com o mesmo WHERE para conferir quais linhas serão afetadas" }
        - { id: c, texto: "Apagar a tabela e recriar" }
        - { id: d, texto: "Nunca usar UPDATE" }
      resposta_correta: b
      explicacao: "A regra de ouro da Aula 6: conferir antes de alterar."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que separar pacientes e médicos em tabelas diferentes, em vez de uma tabela 'pessoas' única?"
      opcoes:
        - { id: a, texto: "Porque o SQL não permite mais de 3 colunas" }
        - { id: b, texto: "Porque tabelas grandes não funcionam" }
        - { id: c, texto: "Porque têm atributos e papéis diferentes no sistema, como especialidade e data de nascimento" }
        - { id: d, texto: "Não há motivo, é indiferente" }
      resposta_correta: c
      explicacao: "Cada tabela trata de um assunto, com os atributos que fazem sentido para ele."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que caracteriza um bom modelo de banco de dados?"
      opcoes:
        - { id: a, texto: "Nenhuma chave estrangeira" }
        - { id: b, texto: "O menor número possível de tabelas" }
        - { id: c, texto: "Sem redundância, com relacionamentos claros e cada tabela tratando de um assunto" }
        - { id: d, texto: "Todos os dados em uma tabela só, para facilitar" }
      resposta_correta: c
      explicacao: "É a soma de tudo que você aprendeu neste trimestre."
---

## Fechando o trimestre

Este é o projeto final. Aqui você não aprende um comando novo: você **usa tudo** o que viu nas
onze aulas anteriores, na ordem em que um profissional trabalharia de verdade.

O cenário: **o sistema de uma clínica**.

## O caminho completo de um projeto

Todo projeto de banco de dados segue a mesma sequência:

| Etapa | O que se faz | Comandos |
|---|---|---|
| 1. Modelar | decidir quais tabelas existem e como se ligam | (papel e lápis) |
| 2. Criar | montar a estrutura | `CREATE TABLE` (DDL) |
| 3. Popular | cadastrar os dados | `INSERT` (DML) |
| 4. Manter | corrigir e remover | `UPDATE`, `DELETE` (DML) |
| 5. Consultar | extrair informação | `SELECT`, `JOIN`, `GROUP BY` (DQL) |

Pular a etapa 1 é o erro mais caro de todos: consertar um modelo ruim depois que já existem dados
é muito mais trabalhoso do que pensar dez minutos antes.

## Etapa 1: modelando a clínica

Vamos pensar juntos.

**Quais são os assuntos?** Pacientes, médicos e consultas. Três assuntos, três tabelas.

**Por que pacientes e médicos são tabelas separadas?** Porque têm atributos diferentes: o médico
tem uma **especialidade**; o paciente tem uma **data de nascimento**. Juntar os dois numa tabela
"pessoas" deixaria metade das colunas vazias em cada linha.

**Qual é a cardinalidade entre paciente e médico?** Um médico atende vários pacientes, e um
paciente pode consultar vários médicos. É **N:M** — e você já sabe que isso exige uma **tabela
associativa** (Aula 10).

**Onde ficam a data e o valor da consulta?** Essa é a pergunta mais importante do projeto.

- A data não é do paciente (ele tem várias consultas, em datas diferentes).
- A data não é do médico (ele atende em vários dias).
- A data é **da consulta**.

Então `data_consulta` e `valor` ficam na **tabela associativa**. Como você viu na Aula 10, uma
tabela associativa pode (e costuma) ter dados próprios — são os dados **da relação**.

## O modelo final

```sql
CREATE TABLE pacientes (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  nascimento DATE
);

CREATE TABLE medicos (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  especialidade VARCHAR(60)
);

CREATE TABLE consultas (
  id INTEGER PRIMARY KEY,
  paciente_id INT,
  medico_id INT,
  data_consulta DATE,
  valor INT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
  FOREIGN KEY (medico_id) REFERENCES medicos(id)
);
```

Repare como cada decisão do trimestre aparece aqui: tipos adequados (Aula 2), chave primária
(Aula 3), chaves estrangeiras (Aula 4), tabela associativa (Aula 10) e ausência de redundância
(Aula 11).

## Atividade

**Passo 1.** Crie a tabela `pacientes` com `id` (PK), `nome` e `nascimento` (tipo `DATE`).

**Passo 2.** Crie a tabela `medicos` com `id` (PK), `nome` e `especialidade`.

**Passo 3.** Crie a tabela `consultas` com `id` (PK), `paciente_id`, `medico_id`,
`data_consulta`, `valor` e as **duas** chaves estrangeiras.

**Passo 4.** Cadastre **4 pacientes** e **3 médicos**.

**Passo 5.** Marque **8 consultas**, garantindo que **pelo menos um médico atenda 2 pacientes
diferentes**. Datas vão entre aspas, no formato `'2026-08-15'`.

**Passo 6.** Um valor foi lançado errado. Corrija a consulta de `id = 1` para `250`, usando
`UPDATE` **com `WHERE`**. Antes, rode o `SELECT` com o mesmo filtro para conferir — a regra de
ouro da Aula 6.

**Passo 7.** Agora extraia informação. Rode cada uma destas consultas e leia o resultado:

```sql
-- Agenda completa, com nomes em vez de ids
SELECT pacientes.nome AS paciente, medicos.nome AS medico,
       consultas.data_consulta AS data, consultas.valor AS valor
FROM consultas
INNER JOIN pacientes ON consultas.paciente_id = pacientes.id
INNER JOIN medicos ON consultas.medico_id = medicos.id
ORDER BY consultas.data_consulta;

-- Quanto cada medico faturou
SELECT medicos.nome AS medico, SUM(consultas.valor) AS faturamento
FROM consultas
INNER JOIN medicos ON consultas.medico_id = medicos.id
GROUP BY medicos.nome
ORDER BY faturamento DESC;

-- Quantas consultas cada paciente ja fez
SELECT pacientes.nome AS paciente, COUNT(*) AS total
FROM consultas
INNER JOIN pacientes ON consultas.paciente_id = pacientes.id
GROUP BY pacientes.nome;
```

Essa última parte é o objetivo real de um banco de dados: **transformar dados guardados em
informação útil**.

## Desafio extra

1. Descubra o **valor médio** das consultas por especialidade (`AVG` + `GROUP BY`).
2. Liste apenas as consultas acima de R$ 200, ordenadas da mais cara para a mais barata.
3. Um paciente cancelou. Apague **apenas** as consultas dele, com `DELETE` e `WHERE`, e confirme
   que os outros pacientes continuam intactos.
4. **Modele no papel** (e implemente se der tempo): a clínica quer registrar quais **exames**
   foram pedidos em cada consulta. Uma consulta pode pedir vários exames, e o mesmo tipo de exame
   pode ser pedido em várias consultas. Que cardinalidade é essa? Quantas tabelas novas você
   precisa?
