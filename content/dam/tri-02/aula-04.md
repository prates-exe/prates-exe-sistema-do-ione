---
titulo: "Estruturas condicionais — if / else"
mes_numero: 2
numero_sequencial: 4
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      int idade = 16;
      int nota = 75;

      // Passo 1: if/else com a idade.

      // Passo 2: else if encadeado com a nota.

      // Passo 3: descubra se a idade e par usando %.

    }
  }
criterios_validacao:
  - descricao: "Classificar a idade 16 como menor de idade"
    contem: "Menor de idade"
    dica: "if (idade >= 18) { ... } else { System.out.println(\"Menor de idade\"); }"
  - descricao: "Classificar a nota 75 como Conceito B"
    contem: "Conceito B"
    dica: "Encadeie: if (nota >= 90) A; else if (nota >= 70) B; else if (nota >= 50) C; else D."
  - descricao: "Informar que 16 é um número par"
    contem: "Par: true"
    dica: "System.out.println(\"Par: \" + (idade % 2 == 0));"
quiz:
  titulo: "Quiz — if / else"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que a estrutura if faz em um programa?"
      opcoes:
        - { id: a, texto: "Executa um bloco de código só se uma condição for verdadeira" }
        - { id: b, texto: "Repete um bloco de código várias vezes" }
        - { id: c, texto: "Cria uma nova variável" }
        - { id: d, texto: "Sempre executa, não importa a condição" }
      resposta_correta: a
      explicacao: "if testa uma condição: se ela for true, o bloco entre chaves é executado."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual estrutura executa um bloco alternativo quando a condição do if é falsa?"
      opcoes:
        - { id: a, texto: "else" }
        - { id: b, texto: "elseif" }
        - { id: c, texto: "otherwise" }
        - { id: d, texto: "not" }
      resposta_correta: a
      explicacao: "else define o que fazer quando a condição do if não é verdadeira."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que precisa haver dentro dos parênteses do if?"
      opcoes:
        - { id: a, texto: "Uma condição que resulte em true ou false" }
        - { id: b, texto: "Sempre um número" }
        - { id: c, texto: "Sempre um texto" }
        - { id: d, texto: "Nada, os parênteses ficam vazios" }
      resposta_correta: a
      explicacao: "O if precisa de um boolean — por isso usamos operadores de comparação ali dentro."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Em um encadeamento if / else if / else, o que acontece quando uma condição é verdadeira?"
      opcoes:
        - { id: a, texto: "O bloco dela é executado e o Java para de testar as demais" }
        - { id: b, texto: "Todos os blocos são executados" }
        - { id: c, texto: "O Java continua testando todas as outras condições" }
        - { id: d, texto: "O programa encerra" }
      resposta_correta: a
      explicacao: "O Java testa na ordem e para na primeira condição verdadeira. Por isso a ORDEM importa."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Com nota = 75, o que mostra: if (nota >= 50) A; else if (nota >= 70) B; ?"
      opcoes:
        - { id: a, texto: "A — porque 75 já satisfaz a primeira condição e o resto nem é testado" }
        - { id: b, texto: "B, porque 75 é maior que 70" }
        - { id: c, texto: "Os dois" }
        - { id: d, texto: "Nenhum" }
      resposta_correta: a
      explicacao: "Erro clássico: condições encadeadas precisam ir da MAIS restritiva para a menos restritiva."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é o erro em: if (idade = 18) { ... }"
      opcoes:
        - { id: a, texto: "Usou = (atribuição) em vez de == (comparação)" }
        - { id: b, texto: "Faltou ponto e vírgula" }
        - { id: c, texto: "if não aceita números" }
        - { id: d, texto: "Não há erro" }
      resposta_correta: a
      explicacao: "Um = atribui; dois == comparam. É o erro mais clássico de quem está começando."
    - id: q7
      tipo: multipla_escolha
      enunciado: "As chaves { } são obrigatórias em um if de uma linha só?"
      opcoes:
        - { id: a, texto: "Tecnicamente não, mas usar sempre evita bugs difíceis de achar" }
        - { id: b, texto: "Sim, o código não compila sem elas" }
        - { id: c, texto: "Nunca devem ser usadas" }
        - { id: d, texto: "Só em programas grandes" }
      resposta_correta: a
      explicacao: "Sem chaves, só a primeira linha pertence ao if — e isso já causou bugs famosos."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Em 'if (idade >= 18) {...} else if (idade >= 12) {...} else {...}', quantas condições são testadas no total?"
      opcoes:
        - { id: a, texto: "Duas, com um bloco final para quando nenhuma for verdadeira" }
        - { id: b, texto: "Uma só" }
        - { id: c, texto: "Três condições" }
        - { id: d, texto: "Nenhuma, else if não existe em Java" }
      resposta_correta: a
      explicacao: "O else final não testa nada: ele cobre todos os casos restantes."
---

## Fazendo o programa decidir

Até agora nossos programas executavam tudo, de cima para baixo, sem escolhas. Mas todo aplicativo
real precisa **decidir**: mostrar uma mensagem de erro se o campo estiver vazio, liberar o acesso
se a senha estiver certa, exibir "aprovado" se a nota for suficiente.

A estrutura `if` permite executar um bloco **só quando uma condição é verdadeira**:

```java
int idade = 16;

if (idade >= 18) {
  System.out.println("Maior de idade");
} else {
  System.out.println("Menor de idade");
}
```

Lendo em partes:

- A **condição** fica entre parênteses e precisa resultar em `true` ou `false` (por isso usamos
  os operadores de comparação da aula anterior).
- O bloco entre `{ }` depois do `if` roda **só se** a condição for `true`.
- O bloco depois do `else` roda quando a condição é `false`.

O `else` é **opcional**: se você só quer fazer algo quando a condição é verdadeira, pode usar o
`if` sozinho.

## Encadeando com else if

Quando há mais de duas possibilidades, encadeamos com `else if`:

```java
int nota = 75;

if (nota >= 90) {
  System.out.println("Conceito A");
} else if (nota >= 70) {
  System.out.println("Conceito B");
} else if (nota >= 50) {
  System.out.println("Conceito C");
} else {
  System.out.println("Conceito D");
}
```

Com `nota = 75`, o programa mostra **Conceito B**.

## A ordem importa (e muito)

Este é o ponto mais importante da aula. O Java testa as condições **na ordem** e **para na
primeira que for verdadeira**. As demais nem são avaliadas.

Veja o que acontece se a ordem estiver errada:

```java
int nota = 75;

// ERRADO — ordem invertida
if (nota >= 50) {
  System.out.println("Conceito C");   // <- vai mostrar ISSO
} else if (nota >= 70) {
  System.out.println("Conceito B");   // <- nunca será alcançado
}
```

Como `75 >= 50` já é verdadeiro, o Java entra no primeiro bloco e **nem testa** o segundo. O aluno
receberia Conceito C injustamente.

A regra: em condições encadeadas com faixas de valores, vá **da mais restritiva para a menos
restritiva**.

## Dois erros clássicos

**1. Usar `=` no lugar de `==`**

```java
if (idade = 18)   // ERRADO: isso ATRIBUI 18 à idade
if (idade == 18)  // CERTO: isso COMPARA
```

**2. Esquecer as chaves**

```java
// PERIGOSO
if (idade >= 18)
  System.out.println("Maior de idade");
  System.out.println("Pode dirigir");   // <- SEMPRE executa!
```

Sem as chaves, apenas a **primeira** linha pertence ao `if`. A segunda roda sempre, mesmo para um
menor de idade. Use chaves **sempre**, mesmo com uma linha só — é uma regra que evita bugs bem
difíceis de encontrar.

## Atividade

No terminal abaixo, com `idade = 16` e `nota = 75` (já estão no código):

**Passo 1.** Escreva um `if/else` que mostre `Maior de idade` ou `Menor de idade` conforme a
idade. Com 16, deve aparecer:

```
Menor de idade
```

**Passo 2.** Escreva o encadeamento de conceitos (A/B/C/D) com `else if`, na ordem correta. Com
nota 75, deve aparecer:

```
Conceito B
```

**Passo 3.** Usando o operador `%` da aula anterior, mostre se a idade é par:

```
Par: true
```

**Depois que os três itens marcarem**, faça o teste mais importante: mude `idade` para `20` e
`nota` para `95`, execute de novo e confira se as mensagens mudam corretamente. Testar os dois
caminhos é o que realmente prova que o `if` está certo.

## Desafio extra

1. Adicione um `else if` que mostre `"Voce tem exatamente 18 anos!"` quando a idade for
   exatamente 18. Onde ele precisa entrar no encadeamento para funcionar?
2. Inverta de propósito a ordem dos conceitos (começando por `nota >= 50`) e veja o Conceito C
   aparecer com nota 75. Depois corrija.
3. Tire as chaves de um `if` com duas linhas dentro e veja a segunda linha executar sempre.
