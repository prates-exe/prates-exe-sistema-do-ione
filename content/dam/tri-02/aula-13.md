---
titulo: "Métodos: organizando o código em blocos"
mes_numero: 2
numero_sequencial: 13
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {

    // Passo 1: crie o metodo saudacao(String nome) que devolve "Ola, <nome>!"

    // Passo 2: crie o metodo calcularImc(double peso, double altura)

    // Passo 3: crie o metodo ehPar(int numero) que devolve true ou false

    public static void main(String[] args) {
      // Passo 4: use os tres metodos aqui.

    }
  }
criterios_validacao:
  - descricao: "Criar e usar o método saudacao"
    contem: "Ola, Maria!"
    dica: "static String saudacao(String nome) { return \"Ola, \" + nome + \"!\"; } e chame System.out.println(saudacao(\"Maria\"));"
  - descricao: "Criar e usar o método calcularImc (70 / 1.75² = 22.857...)"
    contem: "IMC: 22.8"
    dica: "static double calcularImc(double peso, double altura) { return peso / (altura * altura); }"
  - descricao: "Criar e usar o método ehPar com o número 8 (true)"
    contem: "8 e par? true"
    dica: "static boolean ehPar(int numero) { return numero % 2 == 0; } e mostre \"8 e par? \" + ehPar(8);"
  - descricao: "Usar o mesmo método ehPar com o número 7 (false)"
    contem: "7 e par? false"
    dica: "Chame o MESMO método de novo com outro valor — é essa a vantagem de ter um método."
quiz:
  titulo: "Quiz — Métodos"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é um método?"
      opcoes:
        - { id: a, texto: "Um laço de repetição" }
        - { id: b, texto: "Um tipo de variável" }
        - { id: c, texto: "Um bloco de código com nome, que pode ser executado sempre que for chamado" }
        - { id: d, texto: "Um comentário especial" }
      resposta_correta: c
      explicacao: "Você escreve uma vez e usa quantas vezes quiser."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que são os parâmetros de um método?"
      opcoes:
        - { id: a, texto: "O valor que ele devolve" }
        - { id: b, texto: "As informações que o método recebe para trabalhar" }
        - { id: c, texto: "Comentários dentro do método" }
        - { id: d, texto: "O nome do método" }
      resposta_correta: b
      explicacao: "Em calcularImc(double peso, double altura), peso e altura são os parâmetros."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que a palavra return faz?"
      opcoes:
        - { id: a, texto: "Devolve um valor para quem chamou o método e encerra sua execução" }
        - { id: b, texto: "Mostra o valor na tela" }
        - { id: c, texto: "Repete o método" }
        - { id: d, texto: "Cria uma variável nova" }
      resposta_correta: a
      explicacao: "Devolver é diferente de imprimir: quem chamou decide o que fazer com o valor."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que significa void na assinatura de um método?"
      opcoes:
        - { id: a, texto: "Que o método tem erro" }
        - { id: b, texto: "Que ele devolve um número" }
        - { id: c, texto: "Que o método está vazio" }
        - { id: d, texto: "Que o método não devolve nenhum valor" }
      resposta_correta: d
      explicacao: "Por isso o main é void: ele executa, mas não devolve nada."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Em static boolean ehPar(int numero), qual é o tipo de retorno?"
      opcoes:
        - { id: a, texto: "boolean" }
        - { id: b, texto: "int" }
        - { id: c, texto: "numero" }
        - { id: d, texto: "static" }
      resposta_correta: a
      explicacao: "O tipo de retorno vem antes do nome do método e diz que tipo de valor ele devolve."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é a principal vantagem de usar métodos?"
      opcoes:
        - { id: a, texto: "Aumentar o número de linhas do código" }
        - { id: b, texto: "Deixar o programa mais lento de propósito" }
        - { id: c, texto: "Evitar repetição: escreve uma vez, usa várias, e corrige em um lugar só" }
        - { id: d, texto: "Substituir os laços de repetição" }
      resposta_correta: c
      explicacao: "Se a fórmula mudar, você altera dentro do método e todas as chamadas já usam a nova."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre um método que devolve valor e um que só imprime?"
      opcoes:
        - { id: a, texto: "O que imprime é sempre melhor" }
        - { id: b, texto: "Métodos não podem devolver valores" }
        - { id: c, texto: "Não há diferença prática" }
        - { id: d, texto: "O que devolve pode ser reaproveitado em contas e decisões; o que imprime só serve para mostrar" }
      resposta_correta: d
      explicacao: "Por isso calcularImc devolve o número: quem chamou pode mostrar, comparar ou classificar."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Que relação isso tem com o método saudar(View v) da Aula 7?"
      opcoes:
        - { id: a, texto: "O Android não usa métodos" }
        - { id: b, texto: "É exatamente a mesma estrutura: um método que recebe um parâmetro e executa quando chamado" }
        - { id: c, texto: "Métodos do Android são totalmente diferentes" }
        - { id: d, texto: "Nenhuma relação" }
      resposta_correta: b
      explicacao: "A diferença é só quem chama: lá é o clique do botão, aqui é o seu código."
---

## Quando o código começa a crescer

Nas aulas anteriores tudo ficava dentro do `main`. Isso funciona para exercícios pequenos, mas
imagine um app com centenas de linhas: fica impossível encontrar qualquer coisa.

Além disso, é comum precisar da **mesma lógica em vários lugares**. Copiar e colar é péssimo: se
houver um erro, você precisa corrigir em todos os lugares — e vai esquecer algum.

A solução são os **métodos**: blocos de código com nome, que você escreve **uma vez** e usa
**quantas vezes quiser**.

## Anatomia de um método

```java
static String saudacao(String nome) {
  return "Ola, " + nome + "!";
}
```

Cada parte tem um papel:

| Parte | No exemplo | O que é |
|---|---|---|
| tipo de retorno | `String` | que tipo de valor o método devolve |
| nome | `saudacao` | como você vai chamá-lo |
| parâmetros | `(String nome)` | as informações que ele recebe |
| corpo | `{ ... }` | o que ele faz |
| `return` | `return "Ola, ..."` | o valor que ele devolve |

(O `static` aparece porque nossos exercícios rodam direto no `main`. Você vai entender esse
detalhe quando estudar orientação a objetos.)

Para usar:

```java
System.out.println(saudacao("Maria"));   // Ola, Maria!
System.out.println(saudacao("Joao"));    // Ola, Joao!
```

Escrito uma vez, usado duas — e poderia ser usado cem.

## Devolver não é o mesmo que imprimir

Essa distinção é a mais importante da aula.

```java
// Método que DEVOLVE
static double calcularImc(double peso, double altura) {
  return peso / (altura * altura);
}

// Método que só IMPRIME
static void mostrarImc(double peso, double altura) {
  System.out.println(peso / (altura * altura));
}
```

O segundo parece mais prático, mas é bem menos útil. Com o primeiro, quem chamou pode fazer o que
quiser com o resultado:

```java
double imc = calcularImc(70, 1.75);
System.out.println("IMC: " + imc);          // mostrar
if (imc < 18.5) { ... }                     // decidir
double media = (imc + imcAnterior) / 2;     // calcular
```

Com o segundo, o valor aparece na tela e **desaparece**. A regra prática: **métodos de cálculo
devolvem; quem mostra é quem chamou**.

## O void

Quando um método **não devolve nada**, o tipo de retorno é `void`:

```java
static void mostrarSeparador() {
  System.out.println("--------");
}
```

É por isso que o `main` é `public static void main(...)` — ele executa, mas não devolve valor.

## Métodos que devolvem boolean

Muito úteis para perguntas de sim/não:

```java
static boolean ehPar(int numero) {
  return numero % 2 == 0;
}
```

Repare: `numero % 2 == 0` já **é** um `boolean`, então dá para devolver a comparação direto — sem
precisar de `if`. E o uso fica bem legível:

```java
if (ehPar(8)) {
  System.out.println("E par!");
}
```

## Você já usou métodos sem perceber

Lembra da Aula 7?

```java
public void saudar(View v) {
  ...
}
```

Isso é **exatamente** um método: tem tipo de retorno (`void`), nome (`saudar`) e um parâmetro
(`View v`). A única diferença é **quem chama**: lá quem chama é o clique do botão; aqui é o seu
próprio código.

Todo o Android funciona assim — `onCreate`, `onResume`, `onClick` são métodos que o sistema chama
nos momentos certos.

## Atividade

No terminal abaixo, crie três métodos **fora** do `main` (mas dentro da classe) e use os três
dentro do `main`.

**Passo 1.** `saudacao(String nome)` — devolve `"Ola, "` + nome + `"!"`. Chame com `"Maria"`:

```
Ola, Maria!
```

**Passo 2.** `calcularImc(double peso, double altura)` — devolve o IMC. Chame com 70 e 1.75 e
mostre com o texto `"IMC: "`:

```
IMC: 22.857142857142858
```

**Passo 3.** `ehPar(int numero)` — devolve `true` ou `false`.

**Passo 4.** Use o `ehPar` **duas vezes**, com valores diferentes:

```
8 e par? true
7 e par? false
```

Esse passo 4 é o ponto central da aula: **o mesmo método, reaproveitado**. É por isso que métodos
existem.

## Desafio extra

1. Crie um método `classificarImc(double imc)` que **devolve** a categoria como `String` e use-o
   junto com o `calcularImc`. Repare como o código do `main` fica curto e legível.
2. Crie `maiorDe(int[] numeros)` que recebe um array (Aula 12) e devolve o maior valor.
3. Reescreva os desafios da Aula 6 usando métodos, um para cada desafio. Compare o `main` antes e
   depois.
