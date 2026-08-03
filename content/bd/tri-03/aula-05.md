---
titulo: "Views: salvando consultas que você usa sempre"
mes_numero: 3
numero_sequencial: 17
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 4 — Views: dando nome a uma consulta.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela pedidos_loja"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('pedidos_loja') WHERE name IN ('id','cliente','produto','valor','status')) = 5"
    dica: "CREATE TABLE pedidos_loja (id INTEGER PRIMARY KEY, cliente VARCHAR(80), produto VARCHAR(80), valor INT, status VARCHAR(20));"
  - descricao: "Cadastrar pelo menos 6 pedidos"
    sql: "SELECT (SELECT COUNT(*) FROM pedidos_loja) >= 6"
    dica: "Use um único INSERT com 6 conjuntos de valores."
  - descricao: "Ter pedidos com status diferentes (pago e pendente)"
    sql: "SELECT (SELECT COUNT(DISTINCT status) FROM pedidos_loja) >= 2"
    dica: "Use 'pago' em alguns e 'pendente' em outros."
  - descricao: "Criar a view pedidos_pendentes"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='pedidos_pendentes')"
    dica: "CREATE VIEW pedidos_pendentes AS SELECT * FROM pedidos_loja WHERE status = 'pendente';"
  - descricao: "A view deve devolver apenas pedidos pendentes"
    sql: "SELECT NOT EXISTS(SELECT 1 FROM pedidos_pendentes WHERE status <> 'pendente')"
    dica: "Confira o WHERE da sua view — ela não pode trazer pedidos já pagos."
  - descricao: "Criar a view total_por_cliente com o total gasto"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='total_por_cliente')"
    dica: "CREATE VIEW total_por_cliente AS SELECT cliente, SUM(valor) AS total FROM pedidos_loja GROUP BY cliente;"
quiz:
  titulo: "Quiz — Views"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é uma View em banco de dados?"
      opcoes:
        - { id: a, texto: "Uma cópia dos dados em outra tabela" }
        - { id: b, texto: "Um backup do banco" }
        - { id: c, texto: "Um tipo de índice" }
        - { id: d, texto: "Uma consulta salva com um nome, que pode ser usada como se fosse uma tabela" }
      resposta_correta: d
      explicacao: "A view guarda a CONSULTA, não os dados."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Uma View armazena os dados fisicamente?"
      opcoes:
        - { id: a, texto: "Só armazena a primeira linha" }
        - { id: b, texto: "Depende do tamanho da tabela" }
        - { id: c, texto: "Não — ela guarda a consulta e busca os dados atualizados a cada uso" }
        - { id: d, texto: "Sim, faz uma cópia de tudo" }
      resposta_correta: c
      explicacao: "Por isso a view nunca fica desatualizada."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual comando cria uma view?"
      opcoes:
        - { id: a, texto: "CREATE TABLE nome AS VIEW" }
        - { id: b, texto: "CREATE VIEW nome AS SELECT ..." }
        - { id: c, texto: "INSERT VIEW" }
        - { id: d, texto: "SELECT VIEW" }
      resposta_correta: b
      explicacao: "Depois do AS vem a consulta que a view representa."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Como se consulta uma view depois de criada?"
      opcoes:
        - { id: a, texto: "Com SELECT, exatamente como em uma tabela" }
        - { id: b, texto: "Com um comando especial chamado RUN VIEW" }
        - { id: c, texto: "Não é possível consultar" }
        - { id: d, texto: "Apenas com INSERT" }
      resposta_correta: a
      explicacao: "É essa a vantagem: quem usa nem precisa saber que é uma view."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Se você inserir um pedido pendente novo, o que acontece com a view de pendentes?"
      opcoes:
        - { id: a, texto: "Ele aparece automaticamente na próxima consulta à view" }
        - { id: b, texto: "É preciso recriar a view" }
        - { id: c, texto: "A view continua igual para sempre" }
        - { id: d, texto: "A view é apagada" }
      resposta_correta: a
      explicacao: "A view executa a consulta na hora, sempre sobre os dados atuais."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é a principal vantagem de usar views em relatórios recorrentes?"
      opcoes:
        - { id: a, texto: "Escrever a consulta complexa uma vez e reaproveitar por um nome simples" }
        - { id: b, texto: "Fazer backup automático" }
        - { id: c, texto: "Impedir que os dados sejam alterados" }
        - { id: d, texto: "Deixar o banco menor" }
      resposta_correta: a
      explicacao: "Se a regra do relatório mudar, você corrige a view em um lugar só."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual comando remove uma view?"
      opcoes:
        - { id: a, texto: "DROP VIEW nome;" }
        - { id: b, texto: "REMOVE VIEW nome;" }
        - { id: c, texto: "DELETE VIEW nome;" }
        - { id: d, texto: "DROP TABLE nome;" }
      resposta_correta: a
      explicacao: "E apagar a view NÃO apaga os dados das tabelas de origem."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Uma view pode ser criada a partir de um JOIN entre várias tabelas?"
      opcoes:
        - { id: a, texto: "Não, só de uma tabela" }
        - { id: b, texto: "Sim — é justamente aí que ela mais ajuda, escondendo a complexidade" }
        - { id: c, texto: "Só com no máximo duas tabelas" }
        - { id: d, texto: "Só em bancos NoSQL" }
      resposta_correta: b
      explicacao: "Quem usa a view faz um SELECT simples, sem precisar reescrever os JOINs."
---

## A consulta que você escreve toda semana

Imagine que, toda segunda-feira, você precisa do relatório de pedidos pendentes. Toda vez, você
reescreve a mesma consulta — com os mesmos filtros, os mesmos JOINs, os mesmos apelidos.

E se a consulta tiver 15 linhas com três JOINs? Reescrever é trabalhoso e propenso a erro.

A **View** resolve isso: ela é uma **consulta salva com um nome**, que passa a ser usada como se
fosse uma tabela.

## Criando uma view

```sql
CREATE VIEW pedidos_pendentes AS
SELECT * FROM pedidos_loja WHERE status = 'pendente';
```

Pronto. Agora, sempre que precisar do relatório:

```sql
SELECT * FROM pedidos_pendentes;
```

Simples assim. Quem consulta **nem precisa saber** que aquilo é uma view — para todos os efeitos,
funciona como uma tabela.

## O ponto mais importante: a view não guarda dados

Esta é a pergunta que mais confunde: *"a view faz uma cópia dos dados?"*

**Não.** A view guarda **a consulta**, não o resultado. Cada vez que você faz um `SELECT` nela, o
banco executa a consulta original **naquele momento**, sobre os dados atuais.

A consequência prática é excelente: **a view nunca fica desatualizada**. Se você cadastrar um
pedido pendente novo agora, ele já aparece na próxima consulta — sem recriar nada.

Se fosse uma cópia, você teria dois problemas: gastaria espaço em dobro e teria dados velhos.

## Views com agregação

Views ficam ainda mais úteis quando escondem cálculos:

```sql
CREATE VIEW total_por_cliente AS
SELECT cliente, SUM(valor) AS total
FROM pedidos_loja
GROUP BY cliente;
```

Agora qualquer pessoa consegue o total por cliente com uma consulta trivial:

```sql
SELECT * FROM total_por_cliente ORDER BY total DESC;
```

Repare: dá para usar `WHERE`, `ORDER BY` e até `JOIN` **em cima da view**, como em qualquer tabela.

## Views com JOIN: onde elas mais brilham

É aqui que a view mostra o seu valor de verdade:

```sql
CREATE VIEW relatorio_completo AS
SELECT
  pedidos_loja.id AS pedido,
  pedidos_loja.cliente AS cliente,
  pedidos_loja.produto AS produto,
  pedidos_loja.valor AS valor
FROM pedidos_loja
WHERE status = 'pago';
```

Em um sistema real essa consulta teria vários JOINs e dezenas de linhas. Com a view, todo mundo
usa `SELECT * FROM relatorio_completo` e a complexidade fica guardada em um lugar só.

E se a regra do relatório mudar? Você corrige **a view**, e todos os lugares que a usam passam a
ter a regra nova automaticamente.

## Removendo uma view

```sql
DROP VIEW pedidos_pendentes;
```

Importante: apagar a view **não apaga os dados**. As tabelas de origem continuam intactas — você
apagou apenas a consulta salva.

## Atividade

**Passo 1.** Crie a tabela `pedidos_loja` com `id` (PK), `cliente`, `produto`, `valor` e `status`.

**Passo 2.** Cadastre **6 pedidos**, misturando o status entre `'pago'` e `'pendente'`, e
repetindo alguns clientes (para o total por cliente ficar interessante).

**Passo 3.** Crie a view `pedidos_pendentes`, que traz apenas os pedidos com status `'pendente'`.

**Passo 4.** Consulte a view:

```sql
SELECT * FROM pedidos_pendentes;
```

**Passo 5.** Crie a view `total_por_cliente`, com o nome do cliente e a **soma** dos valores
(`SUM` + `GROUP BY`).

**Passo 6.** Faça o teste que prova que a view é viva: **cadastre um novo pedido pendente** e rode
de novo `SELECT * FROM pedidos_pendentes;` **sem tocar na view**. O pedido novo aparece sozinho.

**Passo 7.** Use a view como se fosse tabela:

```sql
SELECT * FROM total_por_cliente ORDER BY total DESC;
```

## Desafio extra

1. Crie uma view `pedidos_caros` com os pedidos acima de um certo valor, e depois consulte ela
   filtrando ainda mais com `WHERE`.
2. Combine com a aula passada: crie uma view que use uma **subconsulta**, mostrando os pedidos
   acima do valor médio.
3. Apague uma das views com `DROP VIEW` e confirme, com um `SELECT`, que a tabela original
   continua com todos os dados.
