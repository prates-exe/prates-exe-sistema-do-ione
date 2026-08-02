---
titulo: "Subconsultas: uma pergunta dentro da outra"
mes_numero: 3
numero_sequencial: 16
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 3 — subconsultas (subqueries) dentro do WHERE.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela funcionarios_emp"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('funcionarios_emp') WHERE name IN ('id','nome','setor','salario')) = 4"
    dica: "CREATE TABLE funcionarios_emp (id INTEGER PRIMARY KEY, nome VARCHAR(80), setor VARCHAR(40), salario INT);"
  - descricao: "Cadastrar pelo menos 6 funcionários"
    sql: "SELECT (SELECT COUNT(*) FROM funcionarios_emp) >= 6"
    dica: "Use um único INSERT com 6 conjuntos de valores."
  - descricao: "Ter salários variados (pelo menos 4 valores diferentes)"
    sql: "SELECT (SELECT COUNT(DISTINCT salario) FROM funcionarios_emp) >= 4"
    dica: "Varie os salários — a subconsulta com média só faz sentido assim."
  - descricao: "Ter funcionários em pelo menos 2 setores"
    sql: "SELECT (SELECT COUNT(DISTINCT setor) FROM funcionarios_emp) >= 2"
    dica: "Use pelo menos dois setores diferentes, como Vendas e TI."
  - descricao: "Existir alguém acima da média salarial (para a consulta ter resultado)"
    sql: "SELECT EXISTS(SELECT 1 FROM funcionarios_emp WHERE salario > (SELECT AVG(salario) FROM funcionarios_emp))"
    dica: "Com salários variados isso acontece naturalmente — confira se você não cadastrou todos iguais."
quiz:
  titulo: "Quiz — Subconsultas"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é uma subconsulta (subquery)?"
      opcoes:
        - { id: a, texto: "Uma consulta escrita dentro de outra, cujo resultado é usado pela consulta principal" }
        - { id: b, texto: "Uma consulta que roda duas vezes" }
        - { id: c, texto: "Um tipo de tabela" }
        - { id: d, texto: "Um comando para apagar dados" }
      resposta_correta: a
      explicacao: "A subconsulta é resolvida primeiro; seu resultado alimenta a consulta de fora."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que não podemos escrever WHERE salario > AVG(salario) diretamente?"
      opcoes:
        - { id: a, texto: "Porque funções de agregação não podem ser usadas dentro do WHERE" }
        - { id: b, texto: "Porque AVG não existe" }
        - { id: c, texto: "Porque salario é texto" }
        - { id: d, texto: "Pode sim, sem problema" }
      resposta_correta: a
      explicacao: "O WHERE filtra linha a linha, antes da agregação acontecer. Por isso a média precisa vir de uma subconsulta."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual operador usamos quando a subconsulta devolve VÁRIOS valores?"
      opcoes:
        - { id: a, texto: "IN" }
        - { id: b, texto: "=" }
        - { id: c, texto: ">" }
        - { id: d, texto: "LIKE" }
      resposta_correta: a
      explicacao: "O = só funciona com um valor único; para uma lista, usa-se IN."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece se usar = com uma subconsulta que devolve várias linhas?"
      opcoes:
        - { id: a, texto: "Dá erro ou resultado incorreto, porque = espera um único valor" }
        - { id: b, texto: "Funciona normalmente" }
        - { id: c, texto: "A subconsulta é ignorada" }
        - { id: d, texto: "O banco escolhe o primeiro valor" }
      resposta_correta: a
      explicacao: "Regra prática: um valor usa =, vários valores usam IN."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Em SELECT nome FROM func WHERE salario > (SELECT AVG(salario) FROM func), o que roda primeiro?"
      opcoes:
        - { id: a, texto: "A subconsulta, calculando a média" }
        - { id: b, texto: "A consulta de fora" }
        - { id: c, texto: "As duas ao mesmo tempo" }
        - { id: d, texto: "Depende do banco" }
      resposta_correta: a
      explicacao: "Primeiro o banco descobre a média, depois compara cada salário com esse número."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre resolver algo com subconsulta e com JOIN?"
      opcoes:
        - { id: a, texto: "O JOIN combina colunas das duas tabelas no resultado; a subconsulta serve para filtrar, sem trazer as colunas da outra" }
        - { id: b, texto: "São exatamente iguais" }
        - { id: c, texto: "Subconsulta não pode usar duas tabelas" }
        - { id: d, texto: "JOIN não funciona com WHERE" }
      resposta_correta: a
      explicacao: "Se você precisa MOSTRAR dados da outra tabela, use JOIN. Se só precisa FILTRAR, a subconsulta é mais direta."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que NOT IN faz em uma subconsulta?"
      opcoes:
        - { id: a, texto: "Traz os registros que NÃO estão na lista devolvida pela subconsulta" }
        - { id: b, texto: "Inverte a ordem do resultado" }
        - { id: c, texto: "Apaga os registros da lista" }
        - { id: d, texto: "Não existe em SQL" }
      resposta_correta: a
      explicacao: "É outra forma de responder 'quem está sem par', junto com o LEFT JOIN + IS NULL."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que uma subconsulta deixa a consulta mais legível em casos como 'acima da média'?"
      opcoes:
        - { id: a, texto: "Porque expressa a pergunta do jeito que ela é pensada, sem precisar calcular a média à parte antes" }
        - { id: b, texto: "Porque usa menos letras" }
        - { id: c, texto: "Porque é sempre mais rápida" }
        - { id: d, texto: "Não deixa mais legível" }
      resposta_correta: a
      explicacao: "Sem ela, você teria que rodar uma consulta, anotar o número e escrever outra na mão."
---

## Uma pergunta que depende de outra

Considere esta pergunta: *"quais funcionários ganham acima da média da empresa?"*

Para responder, você precisa de **duas informações**:

1. Qual é a média salarial.
2. Quem ganha mais que isso.

Sem recursos novos, você faria em duas etapas: rodaria `SELECT AVG(salario) FROM funcionarios;`,
anotaria o número (digamos 3200) e escreveria `SELECT nome FROM funcionarios WHERE salario >
3200;`.

Funciona — mas fica **desatualizado** assim que alguém for contratado, e obriga você a fazer o
trabalho manual toda vez.

A **subconsulta** resolve isso: é uma consulta escrita **dentro** de outra.

## A sintaxe

```sql
SELECT nome, salario
FROM funcionarios_emp
WHERE salario > (SELECT AVG(salario) FROM funcionarios_emp);
```

O que está entre parênteses é a **subconsulta**. O banco resolve ela **primeiro**, descobre a
média, e só então usa esse valor para filtrar linha por linha.

A grande vantagem: a consulta **sempre reflete os dados atuais**, sem nenhum trabalho manual.

## Por que não dá para escrever direto

Uma dúvida natural: por que não simplesmente `WHERE salario > AVG(salario)`?

Porque o `WHERE` funciona **linha a linha**, antes de qualquer agregação acontecer. Quando o banco
está avaliando a linha da Ana, ele ainda não calculou média nenhuma. Funções como `AVG`, `SUM` e
`COUNT` **não podem** aparecer dentro do `WHERE`.

A subconsulta contorna isso porque ela é uma consulta **separada e completa**, resolvida antes.

## Um valor ou vários: = e IN

Subconsultas podem devolver **um único valor** ou **uma lista**. O operador muda conforme o caso.

**Um valor** — use os operadores de comparação normais:

```sql
WHERE salario > (SELECT AVG(salario) FROM funcionarios_emp)
WHERE salario = (SELECT MAX(salario) FROM funcionarios_emp)
```

**Vários valores** — use `IN`:

```sql
SELECT nome
FROM funcionarios_emp
WHERE setor IN (SELECT setor FROM funcionarios_emp WHERE salario > 5000);
```

Se você usar `=` com uma subconsulta que devolve várias linhas, o banco reclama: `=` espera um
valor só. A regra prática é simples: **um valor usa `=`, vários valores usam `IN`**.

## O NOT IN

O `NOT IN` inverte a lógica, trazendo quem **não está** na lista:

```sql
SELECT nome
FROM turmas_escola
WHERE id NOT IN (SELECT turma_id FROM estudantes_turma WHERE turma_id IS NOT NULL);
```

Repare: isso responde a **mesma pergunta** da aula passada (turmas sem alunos), agora por outro
caminho. `LEFT JOIN + IS NULL` e `NOT IN` resolvem o mesmo problema — é bom conhecer os dois.

## Subconsulta ou JOIN?

Como escolher entre os dois? A pergunta é: **você precisa mostrar dados da outra tabela?**

- **Sim** → use `JOIN`. Ele combina as colunas das duas no resultado.
- **Não, só preciso filtrar** → use **subconsulta**. Ela é mais direta e mais legível.

## Atividade

**Passo 1.** Crie a tabela `funcionarios_emp` com `id` (PK), `nome`, `setor` e `salario`.

**Passo 2.** Cadastre **6 funcionários**, com **salários variados** (pelo menos 4 valores
diferentes) e **pelo menos 2 setores**.

**Passo 3.** Descubra a média salarial:

```sql
SELECT AVG(salario) FROM funcionarios_emp;
```

**Passo 4.** Agora, sem anotar o número, liste quem ganha **acima da média** usando uma
subconsulta:

```sql
SELECT nome, salario
FROM funcionarios_emp
WHERE salario > (SELECT AVG(salario) FROM funcionarios_emp);
```

**Passo 5.** Descubra quem ganha o **maior salário** da empresa, usando `MAX` em uma subconsulta.

**Passo 6.** Teste o efeito ao vivo: cadastre um funcionário com salário bem alto e **rode de novo
a consulta do passo 4**, sem alterar nada nela. Repare que o resultado mudou sozinho — porque a
média foi recalculada. É exatamente isso que a subconsulta garante.

## Desafio extra

1. Liste os funcionários que ganham **abaixo** da média.
2. Use `IN` para listar todos os funcionários que trabalham em setores onde existe **alguém**
   ganhando mais de 5000.
3. Responda com `NOT IN`: quais setores **não têm** ninguém acima da média?
4. Compare: escreva a consulta do desafio 2 usando `JOIN` em vez de subconsulta. Qual das duas
   ficou mais fácil de ler?
