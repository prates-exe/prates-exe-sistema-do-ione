---
titulo: "Tipos de dados: INT, VARCHAR e DATE"
mes_numero: 2
numero_sequencial: 2
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 2 — escolhendo o tipo certo para cada informação.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela livros"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='livros')"
    dica: "CREATE TABLE livros (id INTEGER PRIMARY KEY, titulo VARCHAR(150), paginas INT, data_publicacao DATE);"
  - descricao: "livros deve ter as 4 colunas: id, titulo, paginas e data_publicacao"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('livros') WHERE name IN ('id','titulo','paginas','data_publicacao')) = 4"
    dica: "Confira os nomes das colunas, sem erro de digitação."
  - descricao: "A coluna paginas deve ser do tipo INT (número), não texto"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('livros') WHERE name='paginas' AND upper(type) LIKE 'INT%')"
    dica: "Número de páginas é contagem, então o tipo tem que ser INT — não VARCHAR."
  - descricao: "A coluna data_publicacao deve ser do tipo DATE"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('livros') WHERE name='data_publicacao' AND upper(type) LIKE 'DATE%')"
    dica: "Data precisa do tipo DATE, para o banco entender como data de verdade."
quiz:
  titulo: "Quiz — Tipos de dados"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Para guardar a data de nascimento de um aluno, o tipo mais adequado é:"
      opcoes:
        - { id: a, texto: "DATE" }
        - { id: b, texto: "VARCHAR" }
        - { id: c, texto: "INT" }
        - { id: d, texto: "BOOLEAN" }
      resposta_correta: a
      explicacao: "DATE faz o banco entender aquilo como data de verdade, permitindo comparar e ordenar por período."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Para guardar o nome completo de um cliente, o tipo mais adequado é:"
      opcoes:
        - { id: a, texto: "VARCHAR" }
        - { id: b, texto: "INT" }
        - { id: c, texto: "DATE" }
        - { id: d, texto: "PRIMARY KEY" }
      resposta_correta: a
      explicacao: "Texto usa VARCHAR. PRIMARY KEY não é um tipo, é uma restrição."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Para guardar a quantidade de produtos em estoque, o tipo mais adequado é:"
      opcoes:
        - { id: a, texto: "INT" }
        - { id: b, texto: "VARCHAR" }
        - { id: c, texto: "DATE" }
        - { id: d, texto: "TEXT longo" }
      resposta_correta: a
      explicacao: "Quantidade é contagem: número inteiro, ou seja, INT."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que significa o número em VARCHAR(100)?"
      opcoes:
        - { id: a, texto: "O limite máximo de caracteres que aquela coluna aceita" }
        - { id: b, texto: "A quantidade de linhas da tabela" }
        - { id: c, texto: "O número da coluna na tabela" }
        - { id: d, texto: "O valor inicial da coluna" }
      resposta_correta: a
      explicacao: "VARCHAR(100) aceita textos de até 100 caracteres."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que guardar uma data como VARCHAR (texto) é uma má ideia?"
      opcoes:
        - { id: a, texto: "O banco não entende como data, então não consegue ordenar nem comparar períodos corretamente" }
        - { id: b, texto: "Porque ocupa menos espaço" }
        - { id: c, texto: "Porque o VARCHAR não aceita números" }
        - { id: d, texto: "Não é má ideia, tanto faz" }
      resposta_correta: a
      explicacao: "Como texto, '02/01/2026' viria antes de '10/12/2025' na ordenação — o que está errado."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Um CPF, que sempre tem a mesma quantidade de dígitos e nunca é usado em cálculos, normalmente é guardado como:"
      opcoes:
        - { id: a, texto: "VARCHAR, porque é uma sequência de caracteres e pode começar com zero" }
        - { id: b, texto: "DATE" }
        - { id: c, texto: "INT, sempre" }
        - { id: d, texto: "Não precisa ser guardado" }
      resposta_correta: a
      explicacao: "Se fosse INT, um CPF começando com zero perderia esse zero. Como não fazemos contas com CPF, VARCHAR é mais seguro."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Escolher o tipo errado para uma coluna causa qual problema?"
      opcoes:
        - { id: a, texto: "Perda de integridade: o banco aceita valores sem sentido e as consultas ficam incorretas" }
        - { id: b, texto: "Nenhum, o banco corrige sozinho" }
        - { id: c, texto: "A tabela é apagada" }
        - { id: d, texto: "Só afeta a cor da tela" }
      resposta_correta: a
      explicacao: "O tipo é a primeira linha de defesa da qualidade dos dados."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Em CREATE TABLE livros (id INTEGER PRIMARY KEY, titulo VARCHAR(150)), quantas colunas a tabela terá?"
      opcoes:
        - { id: a, texto: "Duas: id e titulo" }
        - { id: b, texto: "Uma só" }
        - { id: c, texto: "Três" }
        - { id: d, texto: "Nenhuma, porque está vazia" }
      resposta_correta: a
      explicacao: "Cada item separado por vírgula dentro dos parênteses é uma coluna."
---

## O tipo não é um detalhe

Quando você cria uma coluna, precisa dizer ao banco **que tipo de informação** ela vai aceitar.
Isso não é burocracia: o tipo é a primeira linha de defesa da qualidade dos dados. Ele impede que
alguém cadastre "banana" no campo de idade.

## Os três tipos que você mais vai usar

| Tipo | Guarda | Exemplos de uso |
|---|---|---|
| `INT` | números inteiros | idade, quantidade em estoque, número de páginas |
| `VARCHAR(n)` | texto de até *n* caracteres | nome, e-mail, endereço, CPF |
| `DATE` | datas | data de nascimento, data de matrícula |

O número dentro do `VARCHAR` é o **limite de caracteres**. `VARCHAR(100)` aceita textos de até
100 caracteres — o suficiente para um nome completo.

```sql
CREATE TABLE livros (
  id INTEGER PRIMARY KEY,
  titulo VARCHAR(150),
  paginas INT,
  data_publicacao DATE
);
```

## Por que não guardar tudo como texto?

Essa é a dúvida mais comum. Afinal, `VARCHAR` aceita qualquer coisa — por que não usar sempre?

Porque o banco perde a capacidade de **entender** o dado. Veja o problema com datas guardadas
como texto:

```
'10/12/2025'
'02/01/2026'
```

Ordenando como **texto**, o `'02/01/2026'` vem **antes** do `'10/12/2025'`, porque o caractere
`0` vem antes do `1`. Está errado: janeiro de 2026 é depois de dezembro de 2025. Com o tipo
`DATE`, o banco entende de verdade e ordena certo.

O mesmo vale para números: guardados como texto, `'100'` viria antes de `'20'`.

## O caso especial do CPF

E o CPF, é `INT` ou `VARCHAR`? A resposta é **`VARCHAR`**, por dois motivos:

1. Um CPF pode começar com **zero**. Como número, o zero da frente desapareceria.
2. Nunca fazemos **contas** com CPF — não somamos nem tiramos média de CPFs.

A regra prática é: **se você não vai fazer conta com aquilo, provavelmente é texto**, mesmo que
seja formado só por dígitos. Telefone, CEP e número de matrícula seguem a mesma lógica.

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `livros` com as colunas:

- `id` — `INTEGER PRIMARY KEY`
- `titulo` — texto de até 150 caracteres
- `paginas` — número inteiro
- `data_publicacao` — data

**Passo 2.** Confira sua escolha de tipos. O checklist verifica especificamente se `paginas` ficou
como número e se `data_publicacao` ficou como data — se você usou `VARCHAR` em alguma delas, o
item não vai marcar.

Para corrigir um tipo errado, você precisa apagar a tabela e criar de novo:

```sql
DROP TABLE livros;
```

E então escrever o `CREATE TABLE` corrigido. Repare: o `DROP TABLE` apaga a tabela **inteira**,
estrutura e tudo — vamos falar mais sobre ele na Aula 6.

## Desafio extra

Pense (e escreva no terminal como comentário, usando `--`) qual tipo você usaria para cada uma
destas informações de um sistema de escola:

- número de matrícula do aluno
- nome da mãe
- nota do bimestre
- data da última atualização do cadastro
- telefone de contato
