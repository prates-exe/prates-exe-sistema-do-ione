---
titulo: "Relacionamento N:M e tabela associativa"
mes_numero: 2
numero_sequencial: 10
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 10 — muitos para muitos, com tabela associativa.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela estudantes"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('estudantes') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE estudantes (id INTEGER PRIMARY KEY, nome VARCHAR(100));"
  - descricao: "Criar a tabela cursos"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('cursos') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE cursos (id INTEGER PRIMARY KEY, nome VARCHAR(100));"
  - descricao: "Criar a tabela associativa matriculas com as DUAS chaves estrangeiras"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_foreign_key_list('matriculas')) >= 2"
    dica: "CREATE TABLE matriculas (id INTEGER PRIMARY KEY, estudante_id INT, curso_id INT, FOREIGN KEY (estudante_id) REFERENCES estudantes(id), FOREIGN KEY (curso_id) REFERENCES cursos(id));"
  - descricao: "Cadastrar 3 estudantes e 3 cursos"
    sql: "SELECT (SELECT COUNT(*) FROM estudantes) >= 3 AND (SELECT COUNT(*) FROM cursos) >= 3"
    dica: "Insira 3 estudantes e 3 cursos antes de matricular alguém."
  - descricao: "Um mesmo estudante matriculado em mais de um curso"
    sql: "SELECT EXISTS(SELECT 1 FROM matriculas GROUP BY estudante_id HAVING COUNT(*) >= 2)"
    dica: "Matricule o estudante 1 em dois cursos diferentes — é isso que caracteriza o N:M."
  - descricao: "Um mesmo curso com mais de um estudante"
    sql: "SELECT EXISTS(SELECT 1 FROM matriculas GROUP BY curso_id HAVING COUNT(*) >= 2)"
    dica: "Matricule dois estudantes diferentes no mesmo curso."
quiz:
  titulo: "Quiz — N:M e tabela associativa"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que caracteriza um relacionamento N:M (muitos para muitos)?"
      opcoes:
        - { id: a, texto: "Cada registro de um lado pode se relacionar com vários do outro, e vice-versa" }
        - { id: b, texto: "Cada registro se relaciona com exatamente um do outro lado" }
        - { id: c, texto: "Um lado tem muitos e o outro tem apenas um" }
        - { id: d, texto: "Não existe relacionamento" }
      resposta_correta: a
      explicacao: "Um aluno cursa várias disciplinas e cada disciplina tem vários alunos."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que um N:M não pode ser resolvido com uma FK simples, como o 1:N?"
      opcoes:
        - { id: a, texto: "Porque uma coluna guarda um valor só, e seria preciso guardar vários de cada lado" }
        - { id: b, texto: "Porque o SQL não permite chaves estrangeiras" }
        - { id: c, texto: "Porque N:M não existe na prática" }
        - { id: d, texto: "Porque a tabela ficaria pequena demais" }
      resposta_correta: a
      explicacao: "Você teria que repetir a linha inteira ou criar várias colunas — os dois caminhos são ruins."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Como se resolve um relacionamento N:M em um banco relacional?"
      opcoes:
        - { id: a, texto: "Criando uma terceira tabela (associativa) com uma FK para cada lado" }
        - { id: b, texto: "Criando muitas colunas na mesma tabela" }
        - { id: c, texto: "Usando apenas uma chave primária composta na primeira tabela" }
        - { id: d, texto: "Não é possível resolver" }
      resposta_correta: a
      explicacao: "A tabela associativa transforma um N:M em dois relacionamentos 1:N."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Quantas chaves estrangeiras uma tabela associativa tem, no mínimo?"
      opcoes:
        - { id: a, texto: "Duas — uma para cada tabela que ela liga" }
        - { id: b, texto: "Uma só" }
        - { id: c, texto: "Nenhuma" }
        - { id: d, texto: "Quatro" }
      resposta_correta: a
      explicacao: "É exatamente isso que faz a ponte entre os dois lados."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Em um sistema escolar, qual seria a tabela associativa entre alunos e cursos?"
      opcoes:
        - { id: a, texto: "matriculas" }
        - { id: b, texto: "professores" }
        - { id: c, texto: "salas" }
        - { id: d, texto: "notas_finais" }
      resposta_correta: a
      explicacao: "A matrícula é justamente o encontro entre um aluno e um curso."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Uma tabela associativa pode ter colunas próprias, além das duas FKs?"
      opcoes:
        - { id: a, texto: "Sim — por exemplo a data da matrícula ou a nota obtida" }
        - { id: b, texto: "Não, só pode ter as duas FKs" }
        - { id: c, texto: "Só se tiver menos de 10 linhas" }
        - { id: d, texto: "Só em bancos NoSQL" }
      resposta_correta: a
      explicacao: "Esses dados pertencem à RELAÇÃO, não ao aluno nem ao curso separadamente."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Em um pedido de loja com vários produtos, e cada produto em vários pedidos, qual é a cardinalidade?"
      opcoes:
        - { id: a, texto: "N:M, resolvida por uma tabela itens_do_pedido" }
        - { id: b, texto: "1:1" }
        - { id: c, texto: "1:N, sem tabela extra" }
        - { id: d, texto: "Não há relacionamento" }
      resposta_correta: a
      explicacao: "E a tabela associativa guarda também a quantidade de cada produto naquele pedido."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Para listar o nome do estudante junto com o nome do curso, quantos JOINs são necessários?"
      opcoes:
        - { id: a, texto: "Dois — da associativa para cada uma das duas tabelas" }
        - { id: b, texto: "Um só" }
        - { id: c, texto: "Nenhum" }
        - { id: d, texto: "Três" }
      resposta_correta: a
      explicacao: "Parte-se de matriculas e liga-se com estudantes e com cursos."
---

## Quando os dois lados são "muitos"

Na Aula 4 você viu a cardinalidade **1:N**: um cliente tem vários pedidos, mas cada pedido é de um
único cliente. A chave estrangeira ficava no lado "muitos" e resolvia tudo.

Agora pense em outra situação:

- Um **estudante** cursa **várias** disciplinas.
- Uma **disciplina** tem **vários** estudantes.

Os dois lados são "muitos". Isso é um relacionamento **N:M** (ou muitos-para-muitos), e ele
**não** se resolve com uma chave estrangeira simples.

## Por que a FK simples não funciona aqui

Tente colocar a FK na tabela de estudantes:

| id | nome | curso_id |
|---|---|---|
| 1 | Ana | 1 |

E se a Ana estiver em três cursos? As opções ruins seriam:

- **Repetir a Ana** três vezes na tabela → redundância, o problema que o banco existe para evitar.
- **Criar `curso_id_1`, `curso_id_2`, `curso_id_3`** → e se ela entrar num quarto curso? A
  estrutura quebra.

O problema fundamental: **uma coluna guarda um valor só**.

## A solução: tabela associativa

A saída é criar uma **terceira tabela**, chamada **tabela associativa**, que existe só para
registrar os encontros entre os dois lados:

```sql
CREATE TABLE estudantes (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE cursos (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100)
);

CREATE TABLE matriculas (
  id INTEGER PRIMARY KEY,
  estudante_id INT,
  curso_id INT,
  FOREIGN KEY (estudante_id) REFERENCES estudantes(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

Repare: a tabela `matriculas` tem **duas** chaves estrangeiras, uma para cada lado.

Cada linha dela significa *"este estudante está neste curso"*:

| id | estudante_id | curso_id |
|---|---|---|
| 1 | 1 | 1 |
| 2 | 1 | 2 |
| 3 | 2 | 1 |

Lendo: a Ana (1) está em dois cursos; o curso 1 tem dois estudantes. Exatamente o N:M que
queríamos, sem repetir nenhum nome.

## A ideia central

A tabela associativa **transforma um N:M em dois relacionamentos 1:N**:

- Um estudante tem muitas matrículas (1:N).
- Um curso tem muitas matrículas (1:N).

E o banco relacional sabe muito bem lidar com 1:N. Esse é o truque.

## Ela pode ter dados próprios

Uma tabela associativa não precisa ter só as duas FKs. Ela pode guardar informações que pertencem
**à relação**, e não a nenhum dos dois lados:

```sql
CREATE TABLE matriculas (
  id INTEGER PRIMARY KEY,
  estudante_id INT,
  curso_id INT,
  data_matricula DATE,
  nota_final INT,
  FOREIGN KEY (estudante_id) REFERENCES estudantes(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

A `nota_final` não é do aluno (ele tem uma nota por curso) nem do curso (ele tem uma nota por
aluno) — ela é **da matrícula**. Esse é um raciocínio muito importante em modelagem.

## Onde mais isso aparece

O padrão N:M está em todo lugar:

| Lado A | Lado B | Tabela associativa |
|---|---|---|
| pedidos | produtos | itens_do_pedido (com a quantidade) |
| filmes | atores | elenco (com o personagem) |
| médicos | pacientes | consultas (com data e hora) |
| livros | autores | autoria |

## Consultando: dois JOINs

Para ver os nomes em vez dos ids, partimos da tabela associativa e ligamos os dois lados:

```sql
SELECT estudantes.nome AS aluno, cursos.nome AS curso
FROM matriculas
INNER JOIN estudantes ON matriculas.estudante_id = estudantes.id
INNER JOIN cursos ON matriculas.curso_id = cursos.id;
```

São **dois** `INNER JOIN` porque são duas tabelas para juntar. O raciocínio é o mesmo da aula
anterior, só que aplicado duas vezes.

## Atividade

No terminal abaixo, monte o sistema de matrículas:

**Passo 1.** Crie a tabela `estudantes` com `id` (PK) e `nome`.

**Passo 2.** Crie a tabela `cursos` com `id` (PK) e `nome`.

**Passo 3.** Crie a tabela associativa `matriculas`, com `id` (PK), `estudante_id`, `curso_id` e
as **duas** chaves estrangeiras.

**Passo 4.** Cadastre **3 estudantes** e **3 cursos**.

**Passo 5.** Faça as matrículas de forma que:

- **um mesmo estudante** apareça em **dois cursos diferentes**;
- **um mesmo curso** tenha **dois estudantes diferentes**.

É isso que caracteriza o N:M de verdade — e é exatamente o que o checklist confere.

**Passo 6.** Rode a consulta com os dois JOINs e veja o resultado com os nomes:

```sql
SELECT estudantes.nome AS aluno, cursos.nome AS curso
FROM matriculas
INNER JOIN estudantes ON matriculas.estudante_id = estudantes.id
INNER JOIN cursos ON matriculas.curso_id = cursos.id;
```

## Desafio extra

1. Descubra **quantos estudantes** cada curso tem, combinando os JOINs com `GROUP BY` e `COUNT`.
2. Adicione uma coluna `nota_final` na tabela `matriculas` (crie a tabela de novo com `DROP TABLE`
   antes) e calcule a **média de notas por curso**.
3. Modele no papel: um sistema de biblioteca onde um livro pode ter vários autores e um autor
   pode ter escrito vários livros. Quais três tabelas você criaria?
