---
titulo: "Normalização básica: eliminando redundância"
mes_numero: 2
numero_sequencial: 11
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 11 — de uma tabela bagunçada para um modelo normalizado.
  -- Leia o material e siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela bagunçada (não normalizada) para observar o problema"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('vendas_bagunca') WHERE name IN ('id','cliente_nome','cliente_telefone','produto')) = 4"
    dica: "CREATE TABLE vendas_bagunca (id INTEGER PRIMARY KEY, cliente_nome VARCHAR(100), cliente_telefone VARCHAR(20), produto VARCHAR(80));"
  - descricao: "Inserir 4 vendas repetindo o mesmo cliente (a redundância)"
    sql: "SELECT (SELECT COUNT(*) FROM vendas_bagunca) >= 4 AND (SELECT COUNT(DISTINCT cliente_nome) FROM vendas_bagunca) < (SELECT COUNT(*) FROM vendas_bagunca)"
    dica: "Repita o mesmo cliente em pelo menos duas vendas — é isso que gera a redundância."
  - descricao: "Criar a tabela normalizada compradores"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('compradores') WHERE name IN ('id','nome','telefone')) = 3"
    dica: "CREATE TABLE compradores (id INTEGER PRIMARY KEY, nome VARCHAR(100), telefone VARCHAR(20));"
  - descricao: "Criar a tabela normalizada compras, ligada por FK"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('compras') WHERE \"table\"='compradores')"
    dica: "CREATE TABLE compras (id INTEGER PRIMARY KEY, comprador_id INT, produto VARCHAR(80), FOREIGN KEY (comprador_id) REFERENCES compradores(id));"
  - descricao: "Cada comprador cadastrado uma única vez (sem repetição de telefone)"
    sql: "SELECT (SELECT COUNT(*) FROM compradores) = (SELECT COUNT(DISTINCT nome) FROM compradores)"
    dica: "Na tabela normalizada, cada pessoa aparece UMA vez só. As compras é que se repetem."
quiz:
  titulo: "Quiz — Normalização"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é redundância de dados?"
      opcoes:
        - { id: a, texto: "A mesma informação repetida em vários lugares do banco" }
        - { id: b, texto: "Um dado que falta na tabela" }
        - { id: c, texto: "Uma tabela sem chave primária" }
        - { id: d, texto: "Um erro de digitação" }
      resposta_correta: a
      explicacao: "O telefone do cliente repetido em cada venda dele é redundância."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é o principal objetivo da normalização?"
      opcoes:
        - { id: a, texto: "Organizar as tabelas para eliminar redundância e evitar inconsistências" }
        - { id: b, texto: "Deixar o banco com menos tabelas" }
        - { id: c, texto: "Aumentar o número de colunas" }
        - { id: d, texto: "Apagar dados antigos" }
      resposta_correta: a
      explicacao: "Normalizar geralmente AUMENTA o número de tabelas, mas elimina repetição."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Se o telefone de um cliente aparece em 50 vendas e ele troca de número, qual é o problema?"
      opcoes:
        - { id: a, texto: "É preciso atualizar 50 linhas, e esquecer uma gera inconsistência" }
        - { id: b, texto: "Nenhum, o banco atualiza sozinho" }
        - { id: c, texto: "O banco apaga as vendas antigas" }
        - { id: d, texto: "O telefone não pode ser alterado" }
      resposta_correta: a
      explicacao: "Isso se chama anomalia de atualização, e é o maior risco da redundância."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que é uma anomalia de exclusão?"
      opcoes:
        - { id: a, texto: "Ao apagar um registro, você perde sem querer outra informação que só existia ali" }
        - { id: b, texto: "Um registro que não pode ser apagado" }
        - { id: c, texto: "Um erro de sintaxe no DELETE" }
        - { id: d, texto: "Um registro duplicado" }
      resposta_correta: a
      explicacao: "Apagar a última venda de um cliente apagaria também os dados de contato dele."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Na 1ª Forma Normal, o que uma coluna NÃO pode conter?"
      opcoes:
        - { id: a, texto: "Vários valores no mesmo campo, como \"11111, 22222\" em um campo telefone" }
        - { id: b, texto: "Números inteiros" }
        - { id: c, texto: "Texto" }
        - { id: d, texto: "Chave primária" }
      resposta_correta: a
      explicacao: "Cada campo deve guardar um valor atômico — é a regra dos atributos que vocês viram no 1º trimestre."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Como se resolve o caso de um cliente com vários telefones (atributo multivalorado)?"
      opcoes:
        - { id: a, texto: "Criando uma tabela separada de telefones, ligada ao cliente por FK" }
        - { id: b, texto: "Colocando todos separados por vírgula no mesmo campo" }
        - { id: c, texto: "Criando as colunas telefone1, telefone2, telefone3" }
        - { id: d, texto: "Guardando só o primeiro telefone" }
      resposta_correta: a
      explicacao: "É o mesmo raciocínio da tabela associativa: cada valor vira uma linha."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Depois de normalizar, como voltamos a ver os dados juntos em um relatório?"
      opcoes:
        - { id: a, texto: "Usando INNER JOIN na hora da consulta" }
        - { id: b, texto: "Copiando os dados de volta para uma tabela só" }
        - { id: c, texto: "Não é mais possível ver juntos" }
        - { id: d, texto: "Usando DROP TABLE" }
      resposta_correta: a
      explicacao: "Separado para guardar, junto para consultar — é essa a lógica do modelo relacional."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Normalizar deixa o banco com mais ou menos tabelas?"
      opcoes:
        - { id: a, texto: "Mais tabelas, porém cada uma com um assunto único e sem repetição" }
        - { id: b, texto: "Menos tabelas, sempre" }
        - { id: c, texto: "O número de tabelas não muda" }
        - { id: d, texto: "Sempre exatamente duas tabelas" }
      resposta_correta: a
      explicacao: "Mais tabelas menores e bem definidas é sinal de um modelo saudável."
---

## Um banco pode estar "certo" e ainda assim ser ruim

Você já sabe criar tabelas, inserir, consultar e juntar. Mas existe uma pergunta anterior a tudo
isso: **quais tabelas devem existir?**

Responder mal essa pergunta gera um banco que funciona hoje e vira um pesadelo em seis meses. A
**normalização** é o conjunto de regras que ajuda a acertar essa parte.

## O problema: uma tabela que guarda tudo

Veja esta tabela de vendas:

| id | cliente_nome | cliente_telefone | produto |
|---|---|---|---|
| 1 | Ana Silva | 99999-1111 | Caderno |
| 2 | Ana Silva | 99999-1111 | Caneta |
| 3 | Ana Silva | 99999-1111 | Mochila |
| 4 | Bruno Costa | 98888-2222 | Caderno |

Ela funciona. Mas repare: o nome e o telefone da Ana estão repetidos **três vezes**. Isso é
**redundância** — a mesma informação guardada em vários lugares.

## Os três problemas que a redundância causa

**1. Anomalia de atualização.** A Ana troca de telefone. Agora é preciso atualizar **todas** as
linhas dela. Se ela tem 50 compras e você atualizar 49, o banco fica com **dois telefones
diferentes** para a mesma pessoa. Qual está certo? Ninguém sabe. Isso é **inconsistência**.

**2. Anomalia de exclusão.** Se você apagar a única compra de um cliente, **perde junto** o nome e
o telefone dele — porque essa informação só existia naquela linha.

**3. Anomalia de inserção.** Como cadastrar um cliente novo que **ainda não comprou nada**? Não
dá: seria preciso inventar uma venda falsa, porque a tabela só guarda clientes junto com vendas.

Esses três nomes caem em prova. E os três somem quando o modelo é normalizado.

## A solução: separar por assunto

A regra central é simples: **cada tabela trata de um assunto só**.

Aqui temos dois assuntos misturados — **pessoas** e **compras**. Então viram duas tabelas:

```sql
CREATE TABLE compradores (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  telefone VARCHAR(20)
);

CREATE TABLE compras (
  id INTEGER PRIMARY KEY,
  comprador_id INT,
  produto VARCHAR(80),
  FOREIGN KEY (comprador_id) REFERENCES compradores(id)
);
```

Agora:

**compradores**

| id | nome | telefone |
|---|---|---|
| 1 | Ana Silva | 99999-1111 |
| 2 | Bruno Costa | 98888-2222 |

**compras**

| id | comprador_id | produto |
|---|---|---|
| 1 | 1 | Caderno |
| 2 | 1 | Caneta |
| 3 | 1 | Mochila |
| 4 | 2 | Caderno |

O telefone da Ana aparece **uma vez só**. Se ela trocar de número, você atualiza **uma linha** — e
todas as compras dela passam a apontar para o dado correto automaticamente.

E os três problemas somem: dá para cadastrar um cliente sem compras, apagar uma compra sem perder
o cliente, e atualizar o telefone sem risco de inconsistência.

## A 1ª Forma Normal: um valor por campo

A primeira regra da normalização diz que **cada campo guarda um único valor** (um valor
**atômico** — o mesmo conceito de atributos que vocês viram no 1º trimestre).

Isto **quebra** a regra:

| id | nome | telefones |
|---|---|---|
| 1 | Ana | 99999-1111, 98888-2222 |

Guardar dois telefones em um campo só impede qualquer busca séria: como procurar quem tem o
telefone 98888-2222? A solução é a mesma de sempre — **uma tabela separada**:

```sql
CREATE TABLE telefones (
  id INTEGER PRIMARY KEY,
  comprador_id INT,
  numero VARCHAR(20),
  FOREIGN KEY (comprador_id) REFERENCES compradores(id)
);
```

Cada telefone vira uma **linha**, não uma coluna nem parte de um texto.

## Separado para guardar, junto para consultar

"Mas agora ficou mais difícil de ver tudo junto!"

Não ficou — para isso existe o `INNER JOIN` da Aula 9:

```sql
SELECT compradores.nome, compradores.telefone, compras.produto
FROM compras
INNER JOIN compradores ON compras.comprador_id = compradores.id;
```

O resultado é exatamente a tabela bagunçada do começo — mas **gerada na hora**, a partir de dados
guardados sem nenhuma repetição.

Essa é a filosofia do modelo relacional: **separado para armazenar, junto para consultar**.

## Atividade

Nesta aula você vai fazer o caminho completo: partir do modelo ruim e chegar ao bom.

**Passo 1.** Crie a tabela **não normalizada** `vendas_bagunca`, com `id`, `cliente_nome`,
`cliente_telefone` e `produto`.

**Passo 2.** Insira **4 vendas**, repetindo o **mesmo cliente** em pelo menos duas delas (com o
telefone repetido junto). Rode `SELECT * FROM vendas_bagunca;` e **olhe a repetição**.

**Passo 3.** Agora normalize. Crie a tabela `compradores` com `id`, `nome` e `telefone`.

**Passo 4.** Crie a tabela `compras` com `id`, `comprador_id` (FK) e `produto`.

**Passo 5.** Cadastre os mesmos dados no modelo novo — cada comprador **uma única vez**, e as
compras apontando para ele.

**Passo 6.** Compare os dois modelos com um JOIN e confirme que a informação é a mesma:

```sql
SELECT compradores.nome, compradores.telefone, compras.produto
FROM compras
INNER JOIN compradores ON compras.comprador_id = compradores.id;
```

## Desafio extra

1. Nas duas tabelas, mude o telefone da Ana. Conte quantos `UPDATE` você precisou em cada modelo.
2. Tente cadastrar um comprador que ainda não comprou nada nos dois modelos. No modelo bagunçado,
   isso é possível?
3. Crie a tabela `telefones` e cadastre dois números para o mesmo comprador. Depois monte um JOIN
   mostrando o nome e todos os telefones de cada pessoa.
