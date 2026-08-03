---
titulo: "Operadores aritméticos e de comparação"
mes_numero: 2
numero_sequencial: 2
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      int a = 10;
      int b = 3;

      // Passo 1: mostre as cinco operações no formato pedido na atividade.

      // Passo 2: mostre as duas comparações.

      // Passo 3: faça a divisão dar 3.33 usando double.

    }
  }
criterios_validacao:
  - descricao: "Mostrar a soma (13)"
    contem: "Soma: 13"
    dica: "System.out.println(\"Soma: \" + (a + b)); — não esqueça os parênteses em volta da conta."
  - descricao: "Mostrar a multiplicação (30)"
    contem: "Multiplicacao: 30"
    dica: "System.out.println(\"Multiplicacao: \" + (a * b));"
  - descricao: "Mostrar a divisão inteira (3)"
    contem: "Divisao: 3"
    dica: "System.out.println(\"Divisao: \" + (a / b)); — entre inteiros, 10 / 3 dá 3."
  - descricao: "Mostrar o resto da divisão (1)"
    contem: "Resto: 1"
    dica: "System.out.println(\"Resto: \" + (a % b)); — o resto de 10 dividido por 3 é 1."
  - descricao: "Mostrar a comparação a > b (true)"
    contem: "Maior: true"
    dica: "System.out.println(\"Maior: \" + (a > b));"
  - descricao: "Mostrar a divisão com casas decimais (3.33...)"
    contem: "Divisao exata: 3.3"
    dica: "Force o double: System.out.println(\"Divisao exata: \" + ((double) a / b));"
quiz:
  titulo: "Quiz — Operadores"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual operador compara se dois valores são iguais em Java?"
      opcoes:
        - { id: a, texto: "==" }
        - { id: b, texto: "equals" }
        - { id: c, texto: "<>" }
        - { id: d, texto: "=" }
      resposta_correta: a
      explicacao: "== compara; um único = atribui um valor a uma variável. Confundir os dois é o erro mais comum de iniciante."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual o resultado de 7 / 2 quando os dois são int?"
      opcoes:
        - { id: a, texto: "4" }
        - { id: b, texto: "Erro de compilação" }
        - { id: c, texto: "3 — a parte decimal é descartada" }
        - { id: d, texto: "3.5" }
      resposta_correta: c
      explicacao: "Divisão entre inteiros dá inteiro. O 0.5 é simplesmente jogado fora, sem arredondar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que o operador % (módulo) retorna?"
      opcoes:
        - { id: a, texto: "A porcentagem de um número" }
        - { id: b, texto: "A soma dos dois números" }
        - { id: c, texto: "O resto da divisão" }
        - { id: d, texto: "Sempre zero" }
      resposta_correta: c
      explicacao: "10 % 3 dá 1, porque 3 cabe 3 vezes em 10 e sobra 1."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Como saber se um número é par usando o operador %?"
      opcoes:
        - { id: a, texto: "Testando se numero % 2 == 1" }
        - { id: b, texto: "Testando se numero / 2 == 0" }
        - { id: c, texto: "Não é possível" }
        - { id: d, texto: "Testando se numero % 2 == 0" }
      resposta_correta: d
      explicacao: "Se o resto da divisão por 2 é zero, o número é par. É um truque muito usado."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual operador significa 'diferente de' em Java?"
      opcoes:
        - { id: a, texto: "NOT" }
        - { id: b, texto: "!=" }
        - { id: c, texto: "<>" }
        - { id: d, texto: "=/=" }
      resposta_correta: b
      explicacao: "O ponto de exclamação significa negação em Java, então != é 'não igual'."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é o resultado de uma comparação como (a > b)?"
      opcoes:
        - { id: a, texto: "Um número inteiro" }
        - { id: b, texto: "Um texto" }
        - { id: c, texto: "Sempre true" }
        - { id: d, texto: "Um boolean: true ou false" }
      resposta_correta: d
      explicacao: "Toda comparação devolve um boolean, e é isso que usamos depois no if."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Como fazer 10 / 3 resultar em 3.333 em vez de 3?"
      opcoes:
        - { id: a, texto: "Usando % em vez de /" }
        - { id: b, texto: "Fazendo pelo menos um dos números ser double, por exemplo (double) a / b" }
        - { id: c, texto: "Não é possível em Java" }
        - { id: d, texto: "Trocando / por //" }
      resposta_correta: b
      explicacao: "Se um dos lados é double, o Java faz a divisão com casas decimais."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que System.out.println(\"Soma: \" + a + b); com a=10 e b=3 mostra 'Soma: 103'?"
      opcoes:
        - { id: a, texto: "Porque o + vira concatenação de texto e junta os números como se fossem letras" }
        - { id: b, texto: "Porque o Java soma da direita para a esquerda" }
        - { id: c, texto: "Porque a soma está errada" }
        - { id: d, texto: "Porque falta um ponto e vírgula" }
      resposta_correta: a
      explicacao: "É preciso usar parênteses: (\"Soma: \" + (a + b)), para a conta acontecer primeiro."
---

## Fazendo contas

Java tem os operadores matemáticos que você já conhece, e mais um que talvez seja novo:

| Operador | Significado | Exemplo com a=10, b=3 | Resultado |
|---|---|---|---|
| `+` | soma | `a + b` | 13 |
| `-` | subtração | `a - b` | 7 |
| `*` | multiplicação | `a * b` | 30 |
| `/` | divisão | `a / b` | **3** |
| `%` | resto da divisão | `a % b` | 1 |

## A pegadinha da divisão inteira

Repare no resultado de `10 / 3`: deu **3**, não 3.33.

Quando os dois números são `int`, o Java faz **divisão inteira** e simplesmente **descarta** a
parte decimal — nem arredonda, só joga fora. Por isso `7 / 2` dá `3`, não `3.5` nem `4`.

Para ter casas decimais, pelo menos um dos lados precisa ser `double`:

```java
int a = 10;
int b = 3;

System.out.println(a / b);              // 3
System.out.println((double) a / b);     // 3.3333333333333335
```

O `(double)` na frente é uma **conversão de tipo**: ele diz "trate esse `a` como `double` nesta
conta". Assim o Java entende que o resultado também deve ter decimais.

## O operador % e um truque útil

O `%` devolve o **resto** da divisão. `10 % 3` dá `1`, porque o 3 cabe 3 vezes em 10 e sobra 1.

Isso parece pouco útil, mas tem um uso muito comum: **descobrir se um número é par**.

```java
if (numero % 2 == 0) {
  // é par
}
```

Se o resto da divisão por 2 é zero, o número é par. Guarde esse truque — ele aparece o tempo todo.

## Comparando valores

As comparações devolvem sempre `true` ou `false`, ou seja, um `boolean`:

| Operador | Significado | Exemplo |
|---|---|---|
| `==` | igual a | `a == b` |
| `!=` | diferente de | `a != b` |
| `>` | maior que | `a > b` |
| `<` | menor que | `a < b` |
| `>=` | maior ou igual | `a >= b` |
| `<=` | menor ou igual | `a <= b` |

```java
int a = 10;
int b = 3;
System.out.println(a > b);   // true
System.out.println(a == b);  // false
```

## O erro mais comum: = contra ==

Preste muita atenção nesta diferença:

```java
a = b    // ATRIBUI: coloca o valor de b dentro de a
a == b   // COMPARA: pergunta se a e b são iguais
```

Um único `=` **muda** o valor da variável. Dois `==` **perguntam** se são iguais. Trocar um pelo
outro é o erro clássico de quem está começando, e nem sempre o Java avisa.

## Outra pegadinha: a ordem da concatenação

Veja a diferença:

```java
System.out.println("Soma: " + a + b);     // Soma: 103
System.out.println("Soma: " + (a + b));   // Soma: 13
```

Na primeira linha, o Java lê da esquerda para a direita: `"Soma: " + 10` vira o texto
`"Soma: 10"`, e aí o `+ 3` só cola o 3 no final, virando `"Soma: 103"`.

Na segunda, os **parênteses** fazem a conta acontecer primeiro. **Sempre use parênteses** em volta
de contas dentro de um `println`.

## Atividade

No terminal abaixo, com `a = 10` e `b = 3` (já estão no código):

**Passo 1.** Mostre as operações exatamente nestes formatos (repare nos parênteses!):

```
Soma: 13
Multiplicacao: 30
Divisao: 3
Resto: 1
```

**Passo 2.** Mostre a comparação:

```
Maior: true
```

**Passo 3.** Agora faça a divisão dar o valor com decimais, usando a conversão `(double)`:

```
Divisao exata: 3.3333333333333335
```

Antes de executar, **tente prever** o resultado de cada linha. Depois confira se acertou — errar a
previsão é a melhor forma de descobrir o que ainda não ficou claro.

## Desafio extra

1. Descubra se `a` é par usando `%` e mostre o resultado da comparação `a % 2 == 0`.
2. Calcule a média entre `a` e `b` com casas decimais corretas.
3. Escreva de propósito `System.out.println("Soma: " + a + b);` **sem** os parênteses e veja o
   `103` aparecer. Entender por que isso acontece evita um bug bem chato no futuro.
