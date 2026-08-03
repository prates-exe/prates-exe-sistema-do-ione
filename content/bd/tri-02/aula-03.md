---
titulo: "Chave primária (PK): a identidade de cada registro"
mes_numero: 2
numero_sequencial: 3
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Aula 3 — chave primária.
  -- Siga a atividade passo a passo.
criterios_validacao:
  - descricao: "Criar a tabela funcionarios com uma chave primária"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('funcionarios') WHERE pk = 1)"
    dica: "CREATE TABLE funcionarios (id INTEGER PRIMARY KEY, nome VARCHAR(100), cargo VARCHAR(60));"
  - descricao: "funcionarios deve ter as colunas id, nome e cargo"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('funcionarios') WHERE name IN ('id','nome','cargo')) = 3"
    dica: "Confira os nomes das três colunas."
  - descricao: "Inserir 3 funcionários com ids diferentes (1, 2 e 3)"
    sql: "SELECT (SELECT COUNT(DISTINCT id) FROM funcionarios) >= 3"
    dica: "INSERT INTO funcionarios (id, nome, cargo) VALUES (1, 'Ana', 'Gerente'); e repita para 2 e 3."
quiz:
  titulo: "Quiz — Chave primária"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Quais são as duas regras de ouro da Chave Primária (PK)?"
      opcoes:
        - { id: a, texto: "Nunca se repete e nunca fica nula" }
        - { id: b, texto: "Pode ficar nula, mas nunca repete" }
        - { id: c, texto: "Pode repetir, mas nunca fica nula" }
        - { id: d, texto: "Sempre é texto e sempre tem 11 caracteres" }
      resposta_correta: a
      explicacao: "Se repetisse, o banco não saberia qual registro é qual. Se fosse nula, não identificaria nada."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Para que serve a Chave Primária?"
      opcoes:
        - { id: a, texto: "Ligar uma tabela a outra" }
        - { id: b, texto: "Ordenar os resultados de uma consulta" }
        - { id: c, texto: "Definir a cor da tabela" }
        - { id: d, texto: "Identificar de forma única cada registro dentro da própria tabela" }
      resposta_correta: d
      explicacao: "É pela PK que o sistema aponta para uma linha específica sem confusão."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que o NOME de uma pessoa é uma péssima escolha de chave primária?"
      opcoes:
        - { id: a, texto: "Porque VARCHAR não pode ser PK" }
        - { id: b, texto: "Porque nome não existe em banco de dados" }
        - { id: c, texto: "Porque nome é sempre nulo" }
        - { id: d, texto: "Porque nomes se repetem — pode haver dois alunos chamados João Silva" }
      resposta_correta: d
      explicacao: "A PK precisa ser única. Nomes repetem com frequência, então quebram a regra."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece se você tentar inserir dois registros com a mesma chave primária?"
      opcoes:
        - { id: a, texto: "O banco apaga o primeiro registro" }
        - { id: b, texto: "O banco recusa o segundo e mostra um erro" }
        - { id: c, texto: "A tabela é excluída" }
        - { id: d, texto: "O banco aceita normalmente" }
      resposta_correta: b
      explicacao: "É essa recusa que garante a integridade dos dados — o banco protege você do erro."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual destes é um bom candidato a chave primária de uma tabela de alunos?"
      opcoes:
        - { id: a, texto: "O nome da mãe" }
        - { id: b, texto: "O número de matrícula, que é único para cada aluno" }
        - { id: c, texto: "A cidade onde mora" }
        - { id: d, texto: "A idade" }
      resposta_correta: b
      explicacao: "Matrícula, CPF e id são únicos por natureza. Idade e cidade repetem muito."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que significa dizer que a PK não pode ser 'nula'?"
      opcoes:
        - { id: a, texto: "Ela precisa ser sempre negativa" }
        - { id: b, texto: "Ela nunca pode ficar vazia, sem valor" }
        - { id: c, texto: "Ela não pode ser o número zero" }
        - { id: d, texto: "Ela não pode ser um número" }
      resposta_correta: b
      explicacao: "Nulo significa 'sem valor nenhum'. Um registro sem identidade não pode ser localizado."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Na prática, por que se costuma criar uma coluna 'id' numérica em vez de usar um dado real como PK?"
      opcoes:
        - { id: a, texto: "Porque o banco exige que se chame id" }
        - { id: b, texto: "Porque um id artificial nunca muda e nunca repete, mesmo que os dados da pessoa mudem" }
        - { id: c, texto: "Porque é mais bonito" }
        - { id: d, texto: "Porque dados reais não podem ser guardados" }
      resposta_correta: b
      explicacao: "Uma pessoa pode mudar de nome ou telefone, mas o id dela no sistema continua o mesmo."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Quantas chaves primárias uma tabela normalmente tem?"
      opcoes:
        - { id: a, texto: "No mínimo três" }
        - { id: b, texto: "Uma" }
        - { id: c, texto: "Uma para cada coluna" }
        - { id: d, texto: "Nenhuma, é opcional e raramente usada" }
      resposta_correta: b
      explicacao: "Cada tabela tem uma identidade — uma chave primária."
---

## A identidade do registro

Imagine uma tabela com 500 alunos e dois deles chamados **João Silva**. Se a secretaria precisa
alterar o telefone de um João Silva específico, como o sistema sabe qual dos dois?

É para resolver exatamente isso que existe a **Chave Primária** (*Primary Key*, ou **PK**). Ela é
a **identidade** de cada registro dentro da tabela.

## As duas regras de ouro

A chave primária obedece a duas regras que nunca podem ser quebradas:

1. **Nunca se repete.** Dois registros jamais podem ter a mesma PK.
2. **Nunca fica nula.** Todo registro precisa ter uma — não existe registro sem identidade.

Essas duas regras caem em prova quase sempre. Vale decorar: **única e obrigatória**.

## Como declarar

```sql
CREATE TABLE funcionarios (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  cargo VARCHAR(60)
);
```

O `PRIMARY KEY` logo depois do tipo já basta. A partir daí, o próprio banco passa a **vigiar**
essas regras para você: se alguém tentar cadastrar dois funcionários com `id = 1`, o banco
**recusa** o segundo e mostra um erro.

Isso é uma proteção, não um obstáculo. É o banco impedindo que os dados fiquem inconsistentes.

## Escolhendo uma boa chave primária

Nem toda coluna serve. Veja alguns exemplos:

| Coluna | Serve como PK? | Por quê |
|---|---|---|
| `nome` | Não | Nomes se repetem |
| `idade` | Não | Muitas pessoas têm a mesma idade |
| `cidade` | Não | Repete muito |
| `cpf` | Sim | É único por pessoa |
| `matricula` | Sim | Único por aluno |
| `id` | Sim | Criado justamente para ser único |

Na prática profissional, o mais comum é **criar uma coluna `id` artificial**, mesmo já existindo
um CPF. O motivo é simples: dados reais **mudam**. Uma pessoa pode corrigir o nome, trocar de
telefone, até corrigir um CPF digitado errado. O `id` interno do sistema nunca muda — e é por ele
que todas as outras tabelas vão apontar (é o que veremos na próxima aula).

## Atividade

No terminal abaixo:

**Passo 1.** Crie a tabela `funcionarios` com:

- `id` — `INTEGER PRIMARY KEY`
- `nome` — `VARCHAR(100)`
- `cargo` — `VARCHAR(60)`

**Passo 2.** Cadastre três funcionários, cada um com um `id` diferente:

```sql
INSERT INTO funcionarios (id, nome, cargo) VALUES (1, 'Ana', 'Gerente');
```

Repita para os ids `2` e `3`, com nomes e cargos à sua escolha.

**Passo 3 (o mais importante).** Agora tente **de propósito** inserir um quarto funcionário
repetindo um `id` que já existe:

```sql
INSERT INTO funcionarios (id, nome, cargo) VALUES (1, 'Carlos', 'Vendedor');
```

Leia com atenção a mensagem de erro que aparece. **Esse erro é o banco te protegendo** — é
exatamente a regra da unicidade funcionando. Entender essa mensagem agora vai te poupar muito
tempo quando ela aparecer em um projeto real.

## Desafio extra

Pense em um sistema de biblioteca. Se a tabela `emprestimos` guarda quem pegou qual livro e
quando, qual coluna (ou combinação de colunas) faria sentido como chave primária? Por que o
número do livro sozinho **não** serviria?
