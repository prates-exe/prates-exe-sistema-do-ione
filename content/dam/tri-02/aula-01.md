---
titulo: "Variáveis e tipos primitivos em Java"
mes_numero: 2
numero_sequencial: 1
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      // Passo 1: crie as quatro variáveis pedidas na atividade.

      // Passo 2: mostre cada uma com System.out.println.

    }
  }
criterios_validacao:
  - descricao: "Mostrar a idade (17)"
    contem: "Idade: 17"
    dica: "Crie int idade = 17; e depois System.out.println(\"Idade: \" + idade);"
  - descricao: "Mostrar a altura (1.75)"
    contem: "Altura: 1.75"
    dica: "Crie double altura = 1.75; e mostre com System.out.println(\"Altura: \" + altura);"
  - descricao: "Mostrar a inicial do nome (M)"
    contem: "Inicial: M"
    dica: "char inicial = 'M'; — atenção: char usa aspas SIMPLES."
  - descricao: "Mostrar se é estudante (true)"
    contem: "Estudante: true"
    dica: "boolean estudante = true; e mostre com System.out.println(\"Estudante: \" + estudante);"
quiz:
  titulo: "Quiz — Variáveis e tipos"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é uma variável em programação?"
      opcoes:
        - { id: a, texto: "Um comando que apaga dados" }
        - { id: b, texto: "Um espaço na memória com um nome, onde guardamos um valor que pode mudar" }
        - { id: c, texto: "Uma linha de comentário" }
        - { id: d, texto: "O nome do arquivo do programa" }
      resposta_correta: b
      explicacao: "Variável é como uma caixinha com etiqueta: tem nome, tem tipo e guarda um valor."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual tipo usamos para guardar um número inteiro, como a idade?"
      opcoes:
        - { id: a, texto: "int" }
        - { id: b, texto: "String" }
        - { id: c, texto: "boolean" }
        - { id: d, texto: "double" }
      resposta_correta: a
      explicacao: "int guarda inteiros, sem casas decimais."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual tipo usamos para um número com casas decimais, como 1.75?"
      opcoes:
        - { id: a, texto: "boolean" }
        - { id: b, texto: "char" }
        - { id: c, texto: "double" }
        - { id: d, texto: "int" }
      resposta_correta: c
      explicacao: "double guarda números com parte decimal."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual tipo guarda apenas verdadeiro ou falso?"
      opcoes:
        - { id: a, texto: "boolean" }
        - { id: b, texto: "char" }
        - { id: c, texto: "int" }
        - { id: d, texto: "String" }
      resposta_correta: a
      explicacao: "boolean só aceita true ou false."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre aspas simples e aspas duplas em Java?"
      opcoes:
        - { id: a, texto: "Aspas simples são para um único caractere (char); aspas duplas são para texto (String)" }
        - { id: b, texto: "Não há diferença" }
        - { id: c, texto: "Aspas duplas só funcionam em comentários" }
        - { id: d, texto: "Aspas simples são para números" }
      resposta_correta: a
      explicacao: "'A' é um char. \"A\" é uma String. São coisas diferentes para o Java."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual destes nomes de variável é INVÁLIDO em Java?"
      opcoes:
        - { id: a, texto: "idadeAluno" }
        - { id: b, texto: "2idade" }
        - { id: c, texto: "_idade" }
        - { id: d, texto: "idade" }
      resposta_correta: b
      explicacao: "Nome de variável não pode começar com número."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que acontece em: int altura = 1.75;"
      opcoes:
        - { id: a, texto: "Dá erro de compilação, porque int não aceita casas decimais" }
        - { id: b, texto: "Funciona e guarda 1.75" }
        - { id: c, texto: "Funciona e guarda 2" }
        - { id: d, texto: "O programa ignora a linha" }
      resposta_correta: a
      explicacao: "O tipo precisa combinar com o valor. Para 1.75 use double."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que o sinal + faz em System.out.println(\"Idade: \" + idade); ?"
      opcoes:
        - { id: a, texto: "Apaga o texto" }
        - { id: b, texto: "Cria uma variável nova" }
        - { id: c, texto: "Junta (concatena) o texto com o valor da variável" }
        - { id: d, texto: "Soma dois números" }
      resposta_correta: c
      explicacao: "Quando um dos lados é texto, o + concatena em vez de somar."
---

## A estrutura mínima de um programa Java

Todo programa Java começa com a mesma estrutura. Nos nossos exercícios ela será sempre esta:

```java
class Main {
  public static void main(String[] args) {
    // seu código vai aqui
  }
}
```

- `class Main` — toda a lógica fica dentro de uma classe.
- `public static void main(String[] args)` — é o **ponto de partida**: o Java sempre começa a
  rodar o programa por aqui.
- Tudo entre as chaves `{ }` do `main` é executado **de cima para baixo**, na ordem.

## Guardando informação na memória

Todo programa precisa guardar informação enquanto roda: a idade que o usuário digitou, o
resultado de uma conta, se um botão foi clicado. Para isso existem as **variáveis**.

Pense em uma variável como uma **caixinha com etiqueta**:

- ela tem um **nome** (a etiqueta),
- ela tem um **tipo** (o que cabe dentro dela),
- ela guarda um **valor** (que pode mudar depois).

```java
int idade = 17;
```

Lendo essa linha: *"crie uma caixinha chamada `idade`, que só aceita números inteiros, e coloque
17 dentro dela"*.

## Os tipos que você mais vai usar

| Tipo | Guarda | Exemplo |
|---|---|---|
| `int` | números inteiros | `int idade = 17;` |
| `double` | números com decimais | `double altura = 1.75;` |
| `char` | **um** caractere | `char inicial = 'M';` |
| `boolean` | verdadeiro ou falso | `boolean estudante = true;` |
| `String` | texto | `String nome = "Maria";` |

Repare que `String` começa com letra **maiúscula**, diferente dos outros. Isso não é por acaso:
os quatro primeiros são **tipos primitivos** (os tipos básicos da linguagem), enquanto `String` é
uma classe. Na prática do dia a dia você usa todos da mesma forma.

## Aspas simples x aspas duplas

Esse detalhe derruba muita gente:

```java
char letra = 'A';      // aspas SIMPLES — um único caractere
String texto = "A";    // aspas DUPLAS — um texto
```

Para o Java, `'A'` e `"A"` são coisas **diferentes**. Usar aspas duplas em um `char` dá erro de
compilação.

## Regras para nomear variáveis

1. **Não pode começar com número** — `2idade` é inválido, `idade2` é válido.
2. **Não pode ter espaço** — use `idadeAluno`, não `idade aluno`.
3. **O Java diferencia maiúsculas de minúsculas** — `idade` e `Idade` são duas variáveis
   diferentes.
4. Por convenção, começamos com letra minúscula e usamos maiúscula nas palavras seguintes:
   `idadeDoAluno`. Isso se chama **camelCase** e é o padrão da linguagem.

## Mostrando valores na tela

Para exibir algo usamos `System.out.println()`:

```java
int idade = 17;
System.out.println(idade);              // mostra: 17
System.out.println("Idade: " + idade);  // mostra: Idade: 17
```

Repare no sinal `+`. Quando um dos lados é **texto**, ele **junta** (concatena) em vez de somar.
Por isso `"Idade: " + idade` vira `Idade: 17`.

## Erros comuns nesta aula

1. **Esquecer o ponto e vírgula** no fim da linha.
2. **Tipo que não combina com o valor**: `int altura = 1.75;` dá erro.
3. **Aspas duplas em `char`**: `char letra = "A";` dá erro.
4. **Usar a variável antes de criar**: o Java reclama de *"cannot find symbol"*.

## Atividade

No terminal abaixo, complete o `main`:

**Passo 1.** Crie quatro variáveis:

- `idade` — inteira, com valor `17`
- `altura` — decimal, com valor `1.75`
- `inicial` — um caractere, com valor `'M'`
- `estudante` — booleana, com valor `true`

**Passo 2.** Mostre cada uma delas, exatamente nestes formatos:

```
Idade: 17
Altura: 1.75
Inicial: M
Estudante: true
```

O checklist confere as quatro linhas separadamente, então dá para ver exatamente qual ainda falta.

## Desafio extra

Depois que os quatro itens estiverem marcados:

1. Crie uma `String nome` com o seu nome e mostre `"Nome: " + nome`.
2. Mude o valor de `idade` **depois** de já ter mostrado ela, e mostre de novo — veja a mesma
   caixinha passar a guardar outro valor.
3. Escreva de propósito `int altura = 1.75;` e leia a mensagem de erro. Reconhecer esse erro
   agora economiza tempo depois.
