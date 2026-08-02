---
titulo: "O que é SQL e como criar sua primeira tabela"
mes_numero: 2
numero_sequencial: 1
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 1 — sua primeira tabela.
  -- Leia o material acima e siga a atividade passo a passo.
  -- Dica: use Ctrl+Enter para executar.
criterios_validacao:
  - descricao: "Criar a tabela alunos"
    sql: "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='alunos')"
    dica: "Escreva: CREATE TABLE alunos (id INTEGER PRIMARY KEY, nome VARCHAR(100), idade INT);"
  - descricao: "A tabela alunos deve ter as colunas id, nome e idade"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('alunos') WHERE name IN ('id','nome','idade')) = 3"
    dica: "Confira se as três colunas existem com esses nomes exatos, sem erro de digitação."
  - descricao: "Criar também a tabela professores, com id, nome e disciplina"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('professores') WHERE name IN ('id','nome','disciplina')) = 3"
    dica: "Agora sozinho: CREATE TABLE professores (id INTEGER PRIMARY KEY, nome VARCHAR(100), disciplina VARCHAR(100));"
quiz:
  titulo: "Quiz — SQL e CREATE TABLE"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que significa a sigla SQL?"
      opcoes:
        - { id: a, texto: "Structured Query Language (Linguagem de Consulta Estruturada)" }
        - { id: b, texto: "Sistema de Questões Lógicas" }
        - { id: c, texto: "Simple Query List" }
        - { id: d, texto: "Software de Quadros Lineares" }
      resposta_correta: a
      explicacao: "SQL é a linguagem usada para conversar com bancos de dados relacionais."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual comando SQL cria a estrutura de uma nova tabela?"
      opcoes:
        - { id: a, texto: "CREATE TABLE" }
        - { id: b, texto: "INSERT INTO" }
        - { id: c, texto: "SELECT" }
        - { id: d, texto: "NEW TABLE" }
      resposta_correta: a
      explicacao: "CREATE TABLE define a estrutura. INSERT INTO coloca dados nela depois."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O grupo de comandos que define a ESTRUTURA do banco (como o CREATE TABLE) se chama:"
      opcoes:
        - { id: a, texto: "DDL — Linguagem de Definição de Dados" }
        - { id: b, texto: "DML — Linguagem de Manipulação de Dados" }
        - { id: c, texto: "DQL — Linguagem de Consulta de Dados" }
        - { id: d, texto: "HTML" }
      resposta_correta: a
      explicacao: "DDL define estrutura; DML mexe nos dados; DQL consulta os dados."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Em uma tabela, o que representa cada LINHA?"
      opcoes:
        - { id: a, texto: "Um registro completo — por exemplo, todos os dados de um aluno" }
        - { id: b, texto: "Uma característica, como 'nome'" }
        - { id: c, texto: "O nome da tabela" }
        - { id: d, texto: "O banco de dados inteiro" }
      resposta_correta: a
      explicacao: "Linha = registro (uma entidade completa). Coluna = atributo (uma característica)."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Em uma tabela, o que representa cada COLUNA?"
      opcoes:
        - { id: a, texto: "Um atributo — uma característica que todos os registros têm" }
        - { id: b, texto: "Um registro completo" }
        - { id: c, texto: "Uma consulta salva" }
        - { id: d, texto: "Um usuário do sistema" }
      resposta_correta: a
      explicacao: "A coluna 'idade' é um atributo: todos os alunos têm uma idade."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é o 'campo' em uma tabela?"
      opcoes:
        - { id: a, texto: "O cruzamento de uma linha com uma coluna — um dado específico" }
        - { id: b, texto: "O nome da tabela" }
        - { id: c, texto: "Um sinônimo de tabela" }
        - { id: d, texto: "O programa que gerencia o banco" }
      resposta_correta: a
      explicacao: "A idade do aluno João, especificamente, é um campo."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual erro de sintaxe existe em: CREATE TABLE alunos (id INTEGER, nome VARCHAR(100)"
      opcoes:
        - { id: a, texto: "Falta fechar o parêntese e o ponto e vírgula no final" }
        - { id: b, texto: "Não pode ter duas colunas" }
        - { id: c, texto: "VARCHAR não existe" }
        - { id: d, texto: "Não há erro nenhum" }
      resposta_correta: a
      explicacao: "Todo CREATE TABLE fecha os parênteses e termina com ponto e vírgula."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Depois de criar uma tabela vazia, o que acontece se você rodar SELECT * nela?"
      opcoes:
        - { id: a, texto: "Ela aparece sem nenhuma linha — o que confirma que foi criada corretamente" }
        - { id: b, texto: "Dá erro, porque tabela vazia não pode ser consultada" }
        - { id: c, texto: "O banco cria linhas automaticamente" }
        - { id: d, texto: "A tabela é apagada" }
      resposta_correta: a
      explicacao: "Uma tabela recém-criada existe, mas está vazia até você usar INSERT."
---

## Por que um banco de dados?

Todo sistema que você usa guarda informação em algum lugar: a lista de alunos da secretaria, os
produtos de uma loja, as mensagens de um aplicativo. Essas informações precisam ficar
**organizadas**, **seguras** e fáceis de **buscar depois**. É exatamente isso que um banco de
dados faz.

Um **banco de dados relacional** organiza as informações em **tabelas**, parecido com uma
planilha — mas com regras muito mais rígidas, que é justamente o que garante a qualidade dos
dados.

## As quatro palavras que você precisa saber

| Termo | O que é | Exemplo |
|---|---|---|
| **Tabela** | O conjunto de dados sobre um assunto | a tabela `alunos` |
| **Coluna** (atributo) | Uma característica que todos os registros têm | `nome`, `idade` |
| **Linha** (registro) | Um item completo armazenado | todos os dados do aluno João |
| **Campo** | O cruzamento de uma linha com uma coluna | a idade do João, especificamente |

Guarde bem essa diferença entre **linha** e **coluna** — ela cai em prova e é a base de tudo.

## A linguagem SQL

Para conversar com o banco usamos o **SQL** (*Structured Query Language*, Linguagem de Consulta
Estruturada). Os comandos do SQL são divididos em três grupos:

- **DDL** (Definição de Dados) — define a **estrutura**. É aqui que mora o `CREATE TABLE`.
- **DML** (Manipulação de Dados) — mexe no **conteúdo**: `INSERT`, `UPDATE`, `DELETE`.
- **DQL** (Consulta de Dados) — **lê** o conteúdo: `SELECT`.

Nesta aula começamos pela DDL, porque **enquanto a estrutura não existe, não há onde guardar
nada**.

## Criando uma tabela

A estrutura básica do comando é sempre a mesma:

```sql
CREATE TABLE nome_da_tabela (
  coluna1 TIPO,
  coluna2 TIPO,
  coluna3 TIPO
);
```

Um exemplo real, uma tabela para guardar alunos:

```sql
CREATE TABLE alunos (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  idade INT
);
```

Lendo linha por linha:

- `CREATE TABLE alunos` — cria uma tabela chamada `alunos`.
- `id INTEGER PRIMARY KEY` — uma coluna `id` que identifica cada aluno de forma única (vamos
  estudar chave primária com calma na Aula 3).
- `nome VARCHAR(100)` — uma coluna de texto com até 100 caracteres.
- `idade INT` — uma coluna de número inteiro.
- O **ponto e vírgula** no final encerra o comando.

## Os erros mais comuns (e como reconhecê-los)

Quase todo erro de iniciante em SQL é de digitação. Os campeões são:

1. **Esquecer o ponto e vírgula** no final do comando.
2. **Esquecer de fechar o parêntese** depois da última coluna.
3. **Esquecer a vírgula** entre uma coluna e outra.
4. **Escrever o nome da coluna diferente** do que usou antes (`nome` e `Nome` podem virar
   confusão).

Quando algo dá errado, o terminal abaixo mostra a mensagem de erro apontando **onde** está o
problema. Leia a mensagem antes de sair mudando o código — em programação, ler o erro é metade da
solução.

## Atividade

No terminal abaixo, faça os dois passos:

**Passo 1.** Crie a tabela `alunos` com estas colunas:

- `id` — número inteiro, chave primária (`INTEGER PRIMARY KEY`)
- `nome` — texto (`VARCHAR(100)`)
- `idade` — número inteiro (`INT`)

Depois execute `SELECT * FROM alunos;`. Ela deve aparecer **vazia** — sem nenhuma linha. Isso é o
esperado e confirma que a tabela foi criada certo.

**Passo 2.** Agora sozinho, sem copiar: crie uma tabela `professores` com as colunas `id`
(chave primária), `nome` (texto) e `disciplina` (texto).

O checklist abaixo do terminal vai marcando cada passo conforme você acerta.

## Desafio extra

Se terminar antes do fim da aula, tente criar uma terceira tabela pensando sozinho na estrutura:
uma tabela `turmas`, com um identificador, o nome da turma e o ano. Quais colunas fazem sentido?
Que tipo cada uma deveria ter?
