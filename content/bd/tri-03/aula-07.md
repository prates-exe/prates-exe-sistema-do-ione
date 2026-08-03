---
titulo: "Revisão geral: JOIN, subconsultas e Views juntos"
mes_numero: 3
numero_sequencial: 19
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 7 — consolidando tudo antes do Projeto Integrador.
  -- Um cenario, quatro recursos: JOIN, LEFT JOIN, subconsulta e View.
criterios_validacao:
  - descricao: "Criar a tabela rev_editoras"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('rev_editoras') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE rev_editoras (id INTEGER PRIMARY KEY, nome VARCHAR(80));"
  - descricao: "Criar a tabela rev_livros com FK para rev_editoras"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('rev_livros') WHERE \"table\"='rev_editoras')"
    dica: "CREATE TABLE rev_livros (id INTEGER PRIMARY KEY, titulo VARCHAR(120), preco INT, editora_id INT, FOREIGN KEY (editora_id) REFERENCES rev_editoras(id));"
  - descricao: "Cadastrar 4 editoras, sendo uma SEM nenhum livro"
    sql: "SELECT (SELECT COUNT(*) FROM rev_editoras) >= 4 AND EXISTS(SELECT 1 FROM rev_editoras WHERE id NOT IN (SELECT editora_id FROM rev_livros WHERE editora_id IS NOT NULL))"
    dica: "Cadastre 4 editoras mas use só 3 nos livros — a quarta fica vazia para o LEFT JOIN."
  - descricao: "Cadastrar pelo menos 8 livros com preços variados"
    sql: "SELECT (SELECT COUNT(*) FROM rev_livros) >= 8 AND (SELECT COUNT(DISTINCT preco) FROM rev_livros) >= 4"
    dica: "Varie os preços para a subconsulta com média fazer sentido."
  - descricao: "Criar a view rev_catalogo juntando livro e editora"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rev_catalogo')"
    dica: "CREATE VIEW rev_catalogo AS SELECT l.titulo AS livro, l.preco AS preco, e.nome AS editora FROM rev_livros l INNER JOIN rev_editoras e ON l.editora_id = e.id;"
  - descricao: "Criar a view rev_editoras_sem_livro com LEFT JOIN"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='rev_editoras_sem_livro')"
    dica: "CREATE VIEW rev_editoras_sem_livro AS SELECT e.nome FROM rev_editoras e LEFT JOIN rev_livros l ON l.editora_id = e.id WHERE l.id IS NULL;"
  - descricao: "A view de editoras sem livro deve encontrar a editora vazia"
    sql: "SELECT (SELECT COUNT(*) FROM rev_editoras_sem_livro) >= 1"
    dica: "Se veio vazia, confira se você realmente deixou uma editora sem nenhum livro."
quiz:
  titulo: "Quiz — Revisão geral"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Quando usar INNER JOIN em vez de LEFT JOIN?"
      opcoes:
        - { id: a, texto: "Apenas com três ou mais tabelas" }
        - { id: b, texto: "Quando quer ver os registros sem par" }
        - { id: c, texto: "Quando você só quer os registros que têm correspondência nos dois lados" }
        - { id: d, texto: "Sempre, o LEFT JOIN é inútil" }
      resposta_correta: c
      explicacao: "Para ver quem NÃO tem par, o certo é o LEFT JOIN."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual combinação encontra registros sem correspondência?"
      opcoes:
        - { id: a, texto: "ORDER BY com DESC" }
        - { id: b, texto: "GROUP BY com HAVING" }
        - { id: c, texto: "INNER JOIN com WHERE" }
        - { id: d, texto: "LEFT JOIN com WHERE ... IS NULL" }
      resposta_correta: d
      explicacao: "É um dos padrões mais úteis do SQL."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Quando uma subconsulta é a melhor escolha?"
      opcoes:
        - { id: a, texto: "Apenas em views" }
        - { id: b, texto: "Nunca, o JOIN sempre é melhor" }
        - { id: c, texto: "Quando você só precisa FILTRAR por um valor calculado, sem mostrar colunas da outra tabela" }
        - { id: d, texto: "Sempre que houver duas tabelas" }
      resposta_correta: c
      explicacao: "Se você precisa MOSTRAR dados da outra tabela, o JOIN é o caminho."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que não se pode usar AVG() diretamente dentro do WHERE?"
      opcoes:
        - { id: a, texto: "Porque AVG só funciona com JOIN" }
        - { id: b, texto: "Porque o WHERE filtra linha a linha, antes da agregação acontecer" }
        - { id: c, texto: "Pode usar normalmente" }
        - { id: d, texto: "Porque AVG não existe" }
      resposta_correta: b
      explicacao: "Por isso a média precisa vir de uma subconsulta."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que uma View armazena?"
      opcoes:
        - { id: a, texto: "Uma cópia dos dados" }
        - { id: b, texto: "A consulta, não os dados — por isso está sempre atualizada" }
        - { id: c, texto: "Apenas a primeira linha do resultado" }
        - { id: d, texto: "O backup da tabela" }
      resposta_correta: b
      explicacao: "A cada SELECT na view, a consulta original é executada de novo."
    - id: q6
      tipo: multipla_escolha
      enunciado: "É possível fazer uma subconsulta sobre uma View?"
      opcoes:
        - { id: a, texto: "Só em bancos NoSQL" }
        - { id: b, texto: "Não, views não aceitam consultas" }
        - { id: c, texto: "Sim — a view é usada como se fosse uma tabela" }
        - { id: d, texto: "Só com INNER JOIN" }
      resposta_correta: c
      explicacao: "É isso que permite combinar os recursos e simplificar consultas complexas."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Em um relatório, por que colocar a consulta em uma View?"
      opcoes:
        - { id: a, texto: "Para impedir alterações nos dados" }
        - { id: b, texto: "Para reaproveitar por um nome simples e corrigir a regra em um lugar só" }
        - { id: c, texto: "Não há vantagem" }
        - { id: d, texto: "Para deixar o banco menor" }
      resposta_correta: b
      explicacao: "É o principal uso de views: relatórios recorrentes."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual a ordem de trabalho ao construir um relatório do zero?"
      opcoes:
        - { id: a, texto: "Criar a view primeiro e testar depois" }
        - { id: b, texto: "Criar a view sem testar" }
        - { id: c, texto: "Escrever e testar a consulta, e só depois transformá-la em view" }
        - { id: d, texto: "Não é preciso testar" }
      resposta_correta: c
      explicacao: "Uma view criada com consulta errada só esconde o erro atrás de um nome bonito."
---

## Antes de começar o projeto

Nas aulas anteriores você aprendeu quatro recursos avançados, um de cada vez. Agora vamos usar
**todos juntos**, em um cenário só — porque é assim que eles aparecem em um projeto real.

Se você conseguir fazer esta aula com tranquilidade, está pronto para o Projeto Integrador que
começa na próxima.

O cenário: uma **livraria**, com livros que pertencem a editoras.

## O mapa dos quatro recursos

Antes de praticar, vale ter clareza sobre **quando usar cada um**:

| Recurso | Use quando... |
|---|---|
| **INNER JOIN** | quer juntar tabelas e só interessam os que têm par nos dois lados |
| **LEFT JOIN** | quer **todos** de um lado, inclusive os **sem** correspondência |
| **Subconsulta** | precisa **filtrar** por um valor calculado, sem mostrar a outra tabela |
| **View** | vai **repetir** aquela consulta muitas vezes |

A pergunta que resolve a dúvida entre JOIN e subconsulta é sempre a mesma: **preciso mostrar
colunas da outra tabela?** Se sim, JOIN. Se é só para filtrar, subconsulta.

## Os padrões que valem memorizar

**Catálogo com nomes em vez de ids:**

```sql
SELECT l.titulo AS livro, l.preco AS preco, e.nome AS editora
FROM rev_livros l
INNER JOIN rev_editoras e ON l.editora_id = e.id;
```

**Quem está sem par:**

```sql
SELECT e.nome
FROM rev_editoras e
LEFT JOIN rev_livros l ON l.editora_id = e.id
WHERE l.id IS NULL;
```

**Acima da média (subconsulta):**

```sql
SELECT titulo, preco
FROM rev_livros
WHERE preco > (SELECT AVG(preco) FROM rev_livros);
```

Lembre por que a subconsulta é necessária aqui: o `WHERE` filtra **linha a linha**, antes de
qualquer agregação. Escrever `WHERE preco > AVG(preco)` não funciona.

**Contagem correta com LEFT JOIN:**

```sql
SELECT e.nome AS editora, COUNT(l.id) AS total
FROM rev_editoras e
LEFT JOIN rev_livros l ON l.editora_id = e.id
GROUP BY e.nome;
```

Atenção ao `COUNT(l.id)` e não `COUNT(*)` — senão a editora vazia aparece com 1 em vez de 0.

## Combinando tudo

Os recursos se encaixam. Dá para fazer uma **subconsulta sobre uma view**:

```sql
CREATE VIEW rev_catalogo AS
SELECT l.titulo AS livro, l.preco AS preco, e.nome AS editora
FROM rev_livros l
INNER JOIN rev_editoras e ON l.editora_id = e.id;

-- Agora a view é usada como se fosse tabela:
SELECT livro, preco
FROM rev_catalogo
WHERE preco > (SELECT AVG(preco) FROM rev_catalogo);
```

Repare como a segunda consulta ficou **simples de ler**, mesmo fazendo um JOIN por baixo. É
exatamente para isso que as views existem.

## A ordem de trabalho

Uma recomendação prática para o projeto: **escreva e teste a consulta primeiro; só depois
transforme em view**.

Criar a view direto, sem testar, esconde um eventual erro atrás de um nome bonito — e você só
descobre quando o relatório final sair errado.

## Atividade

**Passo 1.** Crie a tabela `rev_editoras` com `id` (PK) e `nome`.

**Passo 2.** Crie a tabela `rev_livros` com `id` (PK), `titulo`, `preco`, `editora_id` e a
**FK** para `rev_editoras`.

**Passo 3.** Cadastre **4 editoras**, mas use apenas **3 delas** nos livros. A quarta fica
**sem nenhum livro**, de propósito — é ela que o `LEFT JOIN` vai revelar.

**Passo 4.** Cadastre **8 livros** com **preços variados** (pelo menos 4 valores diferentes).

**Passo 5.** Crie a view `rev_catalogo`, com título, preço e nome da editora (`INNER JOIN`).

**Passo 6.** Crie a view `rev_editoras_sem_livro`, usando `LEFT JOIN` + `IS NULL`. Consulte-a e
confirme que a editora vazia aparece.

**Passo 7.** Rode as consultas de fechamento:

```sql
-- Livros acima do preco medio (subconsulta sobre a view)
SELECT livro, preco
FROM rev_catalogo
WHERE preco > (SELECT AVG(preco) FROM rev_catalogo);

-- Quantos livros por editora, incluindo a que tem zero
SELECT e.nome AS editora, COUNT(l.id) AS total
FROM rev_editoras e
LEFT JOIN rev_livros l ON l.editora_id = e.id
GROUP BY e.nome
ORDER BY total DESC;
```

Se as duas rodarem e fizerem sentido para você, os quatro recursos estão dominados.

## Desafio extra

1. Descubra qual editora tem o **maior faturamento potencial** (soma dos preços dos livros dela).
2. Liste os livros da editora **com mais títulos**, usando uma subconsulta para descobrir qual é.
3. Compare: escreva a consulta do passo 7 (livros acima da média) **sem** usar a view. Qual das
   duas versões você preferiria manter em um projeto?
