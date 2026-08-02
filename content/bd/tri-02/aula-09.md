---
titulo: "INNER JOIN: juntando duas tabelas"
mes_numero: 2
numero_sequencial: 9
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 9 — juntando tabelas com INNER JOIN.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela categorias"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('categorias') WHERE name IN ('id','nome')) = 2"
    dica: "CREATE TABLE categorias (id INTEGER PRIMARY KEY, nome VARCHAR(60));"
  - descricao: "Criar a tabela itens com a chave estrangeira categoria_id"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('itens') WHERE \"table\"='categorias')"
    dica: "CREATE TABLE itens (id INTEGER PRIMARY KEY, nome VARCHAR(80), preco INT, categoria_id INT, FOREIGN KEY (categoria_id) REFERENCES categorias(id));"
  - descricao: "Cadastrar 3 categorias"
    sql: "SELECT (SELECT COUNT(*) FROM categorias) >= 3"
    dica: "Insira 3 categorias, por exemplo: Bebidas, Limpeza e Alimentos."
  - descricao: "Cadastrar 6 itens distribuídos entre as categorias"
    sql: "SELECT (SELECT COUNT(*) FROM itens) >= 6 AND (SELECT COUNT(DISTINCT categoria_id) FROM itens) >= 3"
    dica: "Cadastre 6 itens usando as 3 categorias — pelo menos um item para cada categoria."
  - descricao: "Deixar um item SEM categoria (categoria_id nulo), para comparar depois"
    sql: "SELECT EXISTS(SELECT 1 FROM itens WHERE categoria_id IS NULL)"
    dica: "INSERT INTO itens (id, nome, preco, categoria_id) VALUES (7, 'Item avulso', 10, NULL);"
quiz:
  titulo: "Quiz — INNER JOIN"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Para que serve o INNER JOIN?"
      opcoes:
        - { id: a, texto: "Combinar linhas de duas tabelas relacionadas em um único resultado" }
        - { id: b, texto: "Criar uma tabela nova" }
        - { id: c, texto: "Apagar registros duplicados" }
        - { id: d, texto: "Ordenar o resultado" }
      resposta_correta: a
      explicacao: "O JOIN monta um resultado único juntando informações que estavam separadas."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual palavra-chave indica a condição de ligação entre as tabelas em um JOIN?"
      opcoes:
        - { id: a, texto: "ON" }
        - { id: b, texto: "WHERE" }
        - { id: c, texto: "GROUP BY" }
        - { id: d, texto: "AS" }
      resposta_correta: a
      explicacao: "O ON diz quais colunas ligam as duas tabelas, normalmente FK = PK."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Em itens INNER JOIN categorias ON itens.categoria_id = categorias.id, o que está sendo comparado?"
      opcoes:
        - { id: a, texto: "A chave estrangeira de itens com a chave primária de categorias" }
        - { id: b, texto: "Dois nomes de tabelas" }
        - { id: c, texto: "Duas chaves primárias da mesma tabela" }
        - { id: d, texto: "Nada, é só decoração" }
      resposta_correta: a
      explicacao: "É sempre esse o padrão: a FK de um lado, a PK do outro."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece com um item cuja categoria_id é NULL em um INNER JOIN?"
      opcoes:
        - { id: a, texto: "Ele NÃO aparece no resultado, porque não encontra par na outra tabela" }
        - { id: b, texto: "Ele aparece com a categoria em branco" }
        - { id: c, texto: "O comando dá erro" }
        - { id: d, texto: "Ele aparece duplicado" }
      resposta_correta: a
      explicacao: "O INNER JOIN só traz linhas que têm correspondência dos DOIS lados."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que escrevemos itens.nome em vez de só nome em um JOIN?"
      opcoes:
        - { id: a, texto: "Porque as duas tabelas têm uma coluna chamada nome, e é preciso dizer de qual delas se trata" }
        - { id: b, texto: "Por questão de estilo apenas" }
        - { id: c, texto: "Porque o SQL exige o ponto sempre" }
        - { id: d, texto: "Para deixar a consulta mais lenta" }
      resposta_correta: a
      explicacao: "Sem isso o banco responde 'ambiguous column name' — ele não sabe qual nome você quer."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Para que serve o AS em SELECT itens.nome AS produto?"
      opcoes:
        - { id: a, texto: "Dá um apelido à coluna no resultado, deixando o relatório mais legível" }
        - { id: b, texto: "Renomeia a coluna permanentemente na tabela" }
        - { id: c, texto: "Apaga a coluna original" }
        - { id: d, texto: "Cria uma coluna nova na tabela" }
      resposta_correta: a
      explicacao: "O apelido vale só naquele resultado; a tabela continua igual."
    - id: q7
      tipo: multipla_escolha
      enunciado: "É possível usar WHERE e ORDER BY junto com um INNER JOIN?"
      opcoes:
        - { id: a, texto: "Sim — o JOIN monta o conjunto e as outras cláusulas filtram e ordenam normalmente" }
        - { id: b, texto: "Não, JOIN não aceita filtro" }
        - { id: c, texto: "Só o WHERE é permitido" }
        - { id: d, texto: "Só em bancos NoSQL" }
      resposta_correta: a
      explicacao: "A ordem é: SELECT ... FROM ... JOIN ... ON ... WHERE ... ORDER BY ..."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que acontece se você esquecer a cláusula ON em um JOIN?"
      opcoes:
        - { id: a, texto: "O banco combina TODAS as linhas de uma tabela com todas da outra, gerando um resultado gigante e sem sentido" }
        - { id: b, texto: "O resultado fica vazio" }
        - { id: c, texto: "O banco escolhe a ligação sozinho" }
        - { id: d, texto: "Nada muda" }
      resposta_correta: a
      explicacao: "Isso se chama produto cartesiano: 10 linhas com 10 linhas viram 100."
---

## Os dados estão espalhados de propósito

Na Aula 4 você aprendeu a **separar** as informações em tabelas ligadas por chave estrangeira. Isso
evita repetição e mantém os dados consistentes.

Mas na hora de gerar um **relatório**, ninguém quer ver `categoria_id = 2`. As pessoas querem ver
`"Bebidas"`. É aí que entra o **INNER JOIN**: ele **junta** as tabelas de volta, só na hora da
consulta.

## O problema, na prática

Imagine estas duas tabelas:

**categorias**

| id | nome |
|---|---|
| 1 | Bebidas |
| 2 | Limpeza |

**itens**

| id | nome | preco | categoria_id |
|---|---|---|---|
| 1 | Refrigerante | 8 | 1 |
| 2 | Detergente | 3 | 2 |

Um `SELECT * FROM itens` mostraria `categoria_id = 1`, e não "Bebidas". Precisamos ligar as duas.

## A sintaxe do INNER JOIN

```sql
SELECT itens.nome, itens.preco, categorias.nome
FROM itens
INNER JOIN categorias ON itens.categoria_id = categorias.id;
```

Lendo em partes:

- `FROM itens` — a tabela principal.
- `INNER JOIN categorias` — a tabela que queremos juntar.
- `ON itens.categoria_id = categorias.id` — **a condição de ligação**: a chave estrangeira de um
  lado, a chave primária do outro.

Essa linha do `ON` é o coração do JOIN. É sempre o mesmo padrão: **FK = PK**.

## Por que o nome da tabela antes da coluna?

Repare que escrevemos `itens.nome` e `categorias.nome`, e não apenas `nome`.

É porque **as duas tabelas têm uma coluna chamada `nome`**. Sem dizer de qual tabela se trata, o
banco responde com o erro *"ambiguous column name"* — ele não tem como adivinhar.

## Deixando o relatório legível com AS

Com duas colunas chamadas `nome`, o resultado fica confuso. O `AS` resolve, dando um **apelido**:

```sql
SELECT
  itens.nome AS produto,
  itens.preco AS valor,
  categorias.nome AS categoria
FROM itens
INNER JOIN categorias ON itens.categoria_id = categorias.id;
```

Agora o resultado tem colunas chamadas `produto`, `valor` e `categoria`. O apelido vale **só
naquele resultado** — as tabelas continuam exatamente iguais.

## O detalhe mais importante: o que o INNER JOIN deixa de fora

O `INNER` significa que só aparecem as linhas que têm **correspondência dos dois lados**.

Se um item tiver `categoria_id` nulo (ou apontando para uma categoria que não existe), ele
**simplesmente não aparece** no resultado. Não dá erro, não aparece em branco: some.

Isso pega muita gente de surpresa: "cadastrei 7 produtos mas o relatório só mostra 6". Na
atividade você vai criar exatamente essa situação para ver acontecer.

## Combinando com o que você já sabe

O JOIN se combina com tudo que veio antes:

```sql
SELECT itens.nome AS produto, categorias.nome AS categoria
FROM itens
INNER JOIN categorias ON itens.categoria_id = categorias.id
WHERE itens.preco > 5
ORDER BY itens.preco DESC;
```

A ordem de escrita é sempre: `SELECT` → `FROM` → `JOIN` → `ON` → `WHERE` → `ORDER BY`.

E também funciona com agregação:

```sql
SELECT categorias.nome AS categoria, COUNT(*) AS quantidade
FROM itens
INNER JOIN categorias ON itens.categoria_id = categorias.id
GROUP BY categorias.nome;
```

## Atividade

No terminal abaixo, monte um mini catálogo de mercado:

**Passo 1.** Crie a tabela `categorias` com `id` (PK) e `nome`.

**Passo 2.** Crie a tabela `itens` com `id` (PK), `nome`, `preco` e `categoria_id`, **com a
`FOREIGN KEY`** apontando para `categorias(id)`.

**Passo 3.** Cadastre **3 categorias** (por exemplo: Bebidas, Limpeza, Alimentos).

**Passo 4.** Cadastre **6 itens**, distribuídos entre as três categorias (pelo menos um item em
cada).

**Passo 5.** Cadastre **mais um item com `categoria_id` nulo**:

```sql
INSERT INTO itens (id, nome, preco, categoria_id) VALUES (7, 'Item avulso', 10, NULL);
```

**Passo 6.** Agora rode o JOIN e observe:

```sql
SELECT itens.nome AS produto, categorias.nome AS categoria
FROM itens
INNER JOIN categorias ON itens.categoria_id = categorias.id;
```

Conte as linhas do resultado. Você cadastrou **7** itens, mas aparecem **6**. O "Item avulso"
ficou de fora porque não tem par na tabela de categorias. **Esse é o comportamento do INNER
JOIN** — e entender isso agora evita muita confusão depois.

## Desafio extra

1. Monte um relatório com `AS` em todas as colunas, mostrando produto, valor e categoria, ordenado
   do mais caro para o mais barato.
2. Use `WHERE` junto com o JOIN para mostrar só os itens de uma categoria específica.
3. Combine JOIN com `GROUP BY` e `COUNT` para descobrir **quantos itens existem em cada
   categoria**.
4. Tire a cláusula `ON` do seu JOIN e execute. Conte as linhas do resultado: 7 itens vezes 3
   categorias dá 21 linhas sem sentido. Isso se chama **produto cartesiano**, e é o que acontece
   quando o SQL não sabe como ligar as tabelas.
