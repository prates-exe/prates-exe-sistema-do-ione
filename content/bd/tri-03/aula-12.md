---
titulo: "Revisão para a avaliação do trimestre"
mes_numero: 3
numero_sequencial: 24
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Aula 12 — simulado pratico da prova.
  -- Sao 6 tarefas, uma de cada assunto cobrado.
criterios_validacao:
  - descricao: "Tarefa 1 (DDL) — criar as tabelas prova_cursos e prova_alunos com FK"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('prova_alunos') WHERE \"table\"='prova_cursos')"
    dica: "CREATE TABLE prova_cursos (id INTEGER PRIMARY KEY, nome VARCHAR(80)); depois CREATE TABLE prova_alunos (id INTEGER PRIMARY KEY, nome VARCHAR(100), nota INT, curso_id INT, FOREIGN KEY (curso_id) REFERENCES prova_cursos(id));"
  - descricao: "Tarefa 2 (DML) — cadastrar 3 cursos e 8 alunos"
    sql: "SELECT (SELECT COUNT(*) FROM prova_cursos) >= 3 AND (SELECT COUNT(*) FROM prova_alunos) >= 8"
    dica: "Use INSERT com várias linhas. Deixe um curso sem alunos, para a tarefa do LEFT JOIN."
  - descricao: "Tarefa 3 (DML) — corrigir a nota de um aluno para 10 com UPDATE + WHERE"
    sql: "SELECT EXISTS(SELECT 1 FROM prova_alunos WHERE nota = 10)"
    dica: "UPDATE prova_alunos SET nota = 10 WHERE id = 1; — nunca sem WHERE."
  - descricao: "Tarefa 4 — deixar um curso sem nenhum aluno"
    sql: "SELECT EXISTS(SELECT 1 FROM prova_cursos WHERE id NOT IN (SELECT curso_id FROM prova_alunos WHERE curso_id IS NOT NULL))"
    dica: "Cadastre 3 cursos mas distribua os alunos em apenas 2 deles."
  - descricao: "Tarefa 5 (View) — criar a view prova_boletim"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='view' AND name='prova_boletim')"
    dica: "CREATE VIEW prova_boletim AS SELECT a.nome AS aluno, a.nota AS nota, c.nome AS curso FROM prova_alunos a INNER JOIN prova_cursos c ON a.curso_id = c.id;"
  - descricao: "Tarefa 6 — ter alunos acima e abaixo da média (para a subconsulta)"
    sql: "SELECT EXISTS(SELECT 1 FROM prova_alunos WHERE nota > (SELECT AVG(nota) FROM prova_alunos))"
    dica: "Varie as notas — se todas forem iguais, ninguém fica acima da média."
quiz:
  titulo: "Simulado — Avaliação do 3º trimestre"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual comando cria a estrutura de uma tabela?"
      opcoes:
        - { id: a, texto: "SELECT (DQL)" }
        - { id: b, texto: "CREATE TABLE (DDL)" }
        - { id: c, texto: "CREATE VIEW" }
        - { id: d, texto: "INSERT INTO (DML)" }
      resposta_correta: b
      explicacao: "DDL define estrutura; DML mexe nos dados; DQL consulta."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que acontece com um UPDATE sem WHERE?"
      opcoes:
        - { id: a, texto: "Altera todas as linhas da tabela" }
        - { id: b, texto: "Não altera nada" }
        - { id: c, texto: "O banco pede confirmação" }
        - { id: d, texto: "Altera apenas a primeira linha" }
      resposta_correta: a
      explicacao: "É um dos erros mais caros da profissão."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre DELETE e DROP TABLE?"
      opcoes:
        - { id: a, texto: "DELETE apaga o banco" }
        - { id: b, texto: "DELETE remove linhas e mantém a tabela; DROP TABLE elimina a tabela inteira" }
        - { id: c, texto: "DROP TABLE remove só uma linha" }
        - { id: d, texto: "São iguais" }
      resposta_correta: b
      explicacao: "DELETE é DML; DROP TABLE é DDL."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual a finalidade da chave estrangeira?"
      opcoes:
        - { id: a, texto: "Impedir exclusões" }
        - { id: b, texto: "Ligar uma tabela a outra, referenciando a chave primária dela" }
        - { id: c, texto: "Ordenar os resultados" }
        - { id: d, texto: "Identificar unicamente o registro na própria tabela" }
      resposta_correta: b
      explicacao: "A PK identifica; a FK relaciona."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual JOIN traz também os registros SEM correspondência?"
      opcoes:
        - { id: a, texto: "LEFT JOIN" }
        - { id: b, texto: "Nenhum" }
        - { id: c, texto: "Os dois igualmente" }
        - { id: d, texto: "INNER JOIN" }
      resposta_correta: a
      explicacao: "O INNER exige par nos dois lados; o LEFT preserva todos os da esquerda."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que uma média precisa vir de uma subconsulta no WHERE?"
      opcoes:
        - { id: a, texto: "Não precisa de subconsulta" }
        - { id: b, texto: "Porque AVG é lento" }
        - { id: c, texto: "Porque WHERE só aceita texto" }
        - { id: d, texto: "Porque funções de agregação não podem ser usadas dentro do WHERE" }
      resposta_correta: d
      explicacao: "O WHERE age linha a linha, antes da agregação."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Uma View guarda os dados ou a consulta?"
      opcoes:
        - { id: a, texto: "Uma cópia dos dados" }
        - { id: b, texto: "A consulta — por isso reflete sempre os dados atuais" }
        - { id: c, texto: "As duas coisas" }
        - { id: d, texto: "Nenhuma das duas" }
      resposta_correta: b
      explicacao: "Ela executa a consulta original a cada uso."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Ao contar itens por categoria com LEFT JOIN, por que usar COUNT(coluna) e não COUNT(*)?"
      opcoes:
        - { id: a, texto: "Porque COUNT(*) não funciona com JOIN" }
        - { id: b, texto: "Porque COUNT(coluna) é mais rápido" }
        - { id: c, texto: "Não há diferença" }
        - { id: d, texto: "Porque COUNT(*) conta a linha do NULL, mostrando 1 onde deveria ser 0" }
      resposta_correta: d
      explicacao: "COUNT de uma coluna ignora os NULL — que é exatamente o que queremos."
---

## Simulado antes da prova

Esta aula é uma **revisão prática** de tudo que cai na avaliação do trimestre. São seis tarefas,
uma de cada assunto — se você conseguir fazer todas sem consultar, está pronto.

O cenário é simples de propósito: **alunos e cursos**. O foco é nos comandos, não em decorar o
cenário.

## O que cai na prova

| Assunto | O que você precisa saber fazer |
|---|---|
| **DDL** | criar tabelas com tipos corretos, PK e FK |
| **DML** | inserir, alterar e remover — sempre com `WHERE` |
| **DQL** | consultar com filtro, ordenação e agrupamento |
| **INNER JOIN** | juntar tabelas e mostrar nomes em vez de ids |
| **LEFT JOIN** | encontrar quem está sem correspondência |
| **Subconsulta** | filtrar por um valor calculado, como a média |
| **View** | salvar uma consulta recorrente |

## As armadilhas mais comuns

Vale revisar os pontos que mais derrubam gente na prova:

**1. `UPDATE` ou `DELETE` sem `WHERE`.** Afeta a tabela inteira. Sempre escreva o filtro.

**2. Confundir `DELETE` com `DROP TABLE`.** O primeiro tira linhas; o segundo elimina a tabela.

**3. Achar que `INNER JOIN` traz tudo.** Ele **esconde** quem não tem par. Para ver os sem
correspondência, use `LEFT JOIN` + `IS NULL`.

**4. Usar `COUNT(*)` com `LEFT JOIN`.** A categoria vazia aparece com 1 em vez de 0. Use
`COUNT(coluna_da_direita)`.

**5. Tentar usar `AVG()` dentro do `WHERE`.** Não funciona — o `WHERE` age linha a linha, antes da
agregação. Use subconsulta.

**6. Esquecer a ordem das cláusulas.** É sempre: `SELECT` → `FROM` → `JOIN` → `ON` → `WHERE` →
`GROUP BY` → `ORDER BY`.

**7. Achar que a View guarda dados.** Ela guarda a **consulta**, e por isso está sempre
atualizada.

## Atividade — simulado

Resolva as seis tarefas na ordem. Cada uma corresponde a um item da prova.

**Tarefa 1 (DDL).** Crie duas tabelas:

- `prova_cursos` com `id` (PK) e `nome`;
- `prova_alunos` com `id` (PK), `nome`, `nota`, `curso_id` e a **FK** para `prova_cursos`.

**Tarefa 2 (DML).** Cadastre **3 cursos** e **8 alunos**, com **notas variadas**. Distribua os
alunos em **apenas 2 dos 3 cursos** — o terceiro fica vazio de propósito.

**Tarefa 3 (DML).** Corrija a nota do aluno de `id = 1` para `10`, usando `UPDATE` com `WHERE`.
Antes, confira com um `SELECT`.

**Tarefa 4 (DQL + JOIN).** Rode o boletim completo, com nome do aluno, nota e nome do curso:

```sql
SELECT a.nome AS aluno, a.nota AS nota, c.nome AS curso
FROM prova_alunos a
INNER JOIN prova_cursos c ON a.curso_id = c.id
ORDER BY c.nome, a.nome;
```

**Tarefa 5 (View).** Transforme essa consulta na view `prova_boletim` e consulte-a.

**Tarefa 6 (LEFT JOIN e subconsulta).** Responda as duas perguntas:

```sql
-- Qual curso esta sem nenhum aluno?
SELECT c.nome
FROM prova_cursos c
LEFT JOIN prova_alunos a ON a.curso_id = c.id
WHERE a.id IS NULL;

-- Quais alunos estao acima da media da turma?
SELECT nome, nota
FROM prova_alunos
WHERE nota > (SELECT AVG(nota) FROM prova_alunos);
```

## Perguntas extras para treinar

Estas não entram no checklist, mas são exatamente o tipo de questão que aparece na prova. Escreva
cada consulta sozinho:

1. Quantos alunos há **em cada curso**, incluindo o curso vazio com zero?
2. Qual é a **média de notas por curso**?
3. Quais alunos tiraram **nota abaixo da média** da turma?
4. Qual é a **maior** e a **menor** nota da turma?
5. Liste os cursos que têm **mais de 3 alunos** (use `HAVING`).

## Como estudar para a prova

Uma recomendação prática: **não decore consultas prontas**. Entenda o que cada cláusula faz.

Se você souber responder "para que serve o `ON`?", "quando uso `LEFT JOIN`?" e "por que a média
precisa de subconsulta?", você monta qualquer consulta na hora — mesmo uma que nunca viu.

E na prova prática, use o mesmo cuidado profissional: **teste o filtro com um `SELECT` antes** de
rodar `UPDATE` ou `DELETE`.

## Desafio extra

1. Refaça o simulado inteiro **sem consultar** o material. Cronometre.
2. Anote as três consultas que você mais demorou para montar e revise exatamente esses assuntos.
3. Monte uma pergunta difícil sobre esse cenário e troque com um colega.
