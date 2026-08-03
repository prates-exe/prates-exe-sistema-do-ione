---
titulo: "Operadores lógicos — && , || , !"
mes_numero: 2
numero_sequencial: 5
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      int idade = 20;
      boolean temCarteira = true;
      boolean feriado = false;
      boolean fimDeSemana = true;

      // Passo 1: usar && para decidir se pode dirigir.

      // Passo 2: usar || para decidir se tem aula hoje.

      // Passo 3: usar ! para inverter temCarteira.

    }
  }
criterios_validacao:
  - descricao: "Usar && para liberar quem tem 20 anos e carteira"
    contem: "Pode dirigir"
    dica: "if (idade >= 18 && temCarteira) { System.out.println(\"Pode dirigir\"); }"
  - descricao: "Usar || para avisar que não tem aula (é fim de semana)"
    contem: "Nao tem aula"
    dica: "if (feriado || fimDeSemana) { System.out.println(\"Nao tem aula\"); }"
  - descricao: "Usar ! para mostrar o inverso de temCarteira (false)"
    contem: "Sem carteira: false"
    dica: "System.out.println(\"Sem carteira: \" + (!temCarteira));"
quiz:
  titulo: "Quiz — Operadores lógicos"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que o operador && (E) exige para o resultado ser true?"
      opcoes:
        - { id: a, texto: "Nada, sempre retorna true" }
        - { id: b, texto: "Que as duas condições sejam verdadeiras" }
        - { id: c, texto: "Que nenhuma condição seja verdadeira" }
        - { id: d, texto: "Que pelo menos uma condição seja verdadeira" }
      resposta_correta: b
      explicacao: "&& só é true quando ambos os lados são true."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que o operador || (OU) exige para o resultado ser true?"
      opcoes:
        - { id: a, texto: "Que as duas sejam falsas" }
        - { id: b, texto: "Que pelo menos uma das condições seja verdadeira" }
        - { id: c, texto: "Nada, sempre retorna false" }
        - { id: d, texto: "Que as duas condições sejam verdadeiras" }
      resposta_correta: b
      explicacao: "|| é true quando pelo menos um dos lados é true."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que o operador ! (negação) faz?"
      opcoes:
        - { id: a, texto: "Soma 1 ao valor" }
        - { id: b, texto: "Transforma em texto" }
        - { id: c, texto: "Inverte o valor: true vira false e false vira true" }
        - { id: d, texto: "Não faz nada" }
      resposta_correta: c
      explicacao: "!true é false, e !false é true."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Com a = true e b = false, quanto vale (a && b)?"
      opcoes:
        - { id: a, texto: "true" }
        - { id: b, texto: "Depende da ordem" }
        - { id: c, texto: "Dá erro" }
        - { id: d, texto: "false" }
      resposta_correta: d
      explicacao: "&& exige os dois verdadeiros; como b é false, o resultado é false."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Com a = true e b = false, quanto vale (a || b)?"
      opcoes:
        - { id: a, texto: "false" }
        - { id: b, texto: "true" }
        - { id: c, texto: "Dá erro" }
        - { id: d, texto: "Nenhum dos dois" }
      resposta_correta: b
      explicacao: "|| basta um verdadeiro; como a é true, o resultado é true."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Como escrever 'a idade está entre 13 e 17 (inclusive)' em Java?"
      opcoes:
        - { id: a, texto: "idade >= 13 && idade <= 17" }
        - { id: b, texto: "idade >= 13 || idade <= 17" }
        - { id: c, texto: "13 <= idade <= 17" }
        - { id: d, texto: "idade == 13..17" }
      resposta_correta: a
      explicacao: "Java não aceita comparação em cadeia como na matemática — é preciso usar && entre duas comparações completas."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que 'idade >= 13 || idade <= 17' está errado para representar uma faixa?"
      opcoes:
        - { id: a, texto: "Porque com || qualquer idade satisfaz pelo menos uma das partes, então dá sempre true" }
        - { id: b, texto: "Porque falta ponto e vírgula" }
        - { id: c, texto: "Porque || não existe em Java" }
        - { id: d, texto: "Não está errado" }
      resposta_correta: a
      explicacao: "A idade 40 satisfaz '>= 13' e a idade 5 satisfaz '<= 17'. Para faixa, use sempre &&."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Em (idade >= 18 && temCarteira), o que acontece se idade for 15?"
      opcoes:
        - { id: a, texto: "O resultado vira true" }
        - { id: b, texto: "Dá erro de execução" }
        - { id: c, texto: "Ele testa temCarteira mesmo assim" }
        - { id: d, texto: "O Java já sabe que o resultado é false e nem chega a olhar temCarteira" }
      resposta_correta: d
      explicacao: "Isso se chama avaliação em curto-circuito: se o primeiro lado do && já é false, o resto é ignorado."
---

## Quando uma condição não basta

Às vezes uma decisão depende de **mais de uma condição** ao mesmo tempo: para dirigir, é preciso
ter 18 anos **e** ter carteira. Para isso existem os **operadores lógicos**.

| Operador | Nome | Significa |
|---|---|---|
| `&&` | E lógico | as **duas** condições precisam ser verdadeiras |
| `\|\|` | OU lógico | **pelo menos uma** precisa ser verdadeira |
| `!` | negação | inverte o valor (true vira false) |

## O operador && (E)

```java
int idade = 20;
boolean temCarteira = true;

if (idade >= 18 && temCarteira) {
  System.out.println("Pode dirigir");
} else {
  System.out.println("Nao pode dirigir");
}
```

Só mostra "Pode dirigir" se **as duas** condições forem verdadeiras. Veja todos os casos:

| idade >= 18 | temCarteira | resultado do && |
|---|---|---|
| true | true | **true** |
| true | false | false |
| false | true | false |
| false | false | false |

Repare: com `&&`, basta **um** false para tudo virar false.

## O operador || (OU)

```java
boolean feriado = false;
boolean fimDeSemana = true;

if (feriado || fimDeSemana) {
  System.out.println("Nao tem aula");
}
```

Aqui basta **uma** das duas ser verdadeira:

| feriado | fimDeSemana | resultado do \|\| |
|---|---|---|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

Com `||`, basta **um** true para tudo virar true.

## O operador ! (negação)

O `!` simplesmente inverte:

```java
boolean temCarteira = true;
System.out.println(!temCarteira);   // false
```

É útil para expressar "se **não** ...":

```java
if (!temCarteira) {
  System.out.println("Precisa tirar a carteira primeiro");
}
```

## A pegadinha das faixas de valores

Este é o erro mais comum da aula. Na matemática escrevemos `13 ≤ idade ≤ 17`. Em Java **isso não
funciona** — é preciso escrever as duas comparações completas, ligadas por `&&`:

```java
// ERRADO — nem compila
if (13 <= idade <= 17)

// CERTO
if (idade >= 13 && idade <= 17)
```

E cuidado para não trocar `&&` por `||` aqui:

```java
if (idade >= 13 || idade <= 17)   // ERRADO: dá true para QUALQUER idade
```

Por quê? A idade 40 satisfaz `>= 13`. A idade 5 satisfaz `<= 17`. Como o `||` aceita qualquer uma
das duas, **todo mundo passa**. Para faixas, use sempre `&&`.

## Curto-circuito

Uma curiosidade útil: em `idade >= 18 && temCarteira`, se a idade for 15, o Java **já sabe** que o
resultado será false e **nem chega a olhar** o `temCarteira`. Isso se chama **avaliação em
curto-circuito**, e é o motivo de colocarmos a condição mais "barata" ou mais provável primeiro.

## Atividade

No terminal abaixo, com as quatro variáveis já declaradas:

**Passo 1.** Use `&&` para decidir se pode dirigir. Com `idade = 20` e `temCarteira = true`, deve
aparecer:

```
Pode dirigir
```

**Passo 2.** Use `||` para decidir se tem aula. Com `feriado = false` e `fimDeSemana = true`, deve
aparecer:

```
Nao tem aula
```

**Passo 3.** Use `!` para mostrar o inverso de `temCarteira`:

```
Sem carteira: false
```

**Depois de marcar os três**, teste todas as combinações: mude `temCarteira` para `false` e veja
"Nao pode dirigir"; mude `fimDeSemana` para `false` e veja a mensagem de aula sumir. Percorrer a
tabela inteira é o que fixa a lógica de verdade.

## Desafio extra

1. Escreva uma condição que mostre `"Adolescente"` apenas quando a idade estiver entre 13 e 17
   (inclusive). Teste com 12, 15 e 18.
2. Escreva a mesma condição usando `||` de propósito e comprove que ela dá `true` para 40 também.
3. Combine tudo: mostre `"Pode dirigir sozinho"` só quando a pessoa tiver 18 anos ou mais, tiver
   carteira **e não** for um dia de chuva (crie um `boolean chovendo`).
