---
titulo: "Depuração: Logcat e como achar a origem da falha"
mes_numero: 3
numero_sequencial: 20
duracao_minutos: 25
tipo_sandbox: code
publicado: false
exercicio_inicial: |
  class Main {
    // Este metodo tem um BUG. Sua tarefa e encontra-lo usando rastros.
    static double calcularMedia(int[] notas) {
      int soma = 0;
      for (int i = 0; i < notas.length; i++) {
        soma = soma + notas[i];
      }
      return soma / notas.length;
    }

    public static void main(String[] args) {
      int[] notas = {7, 8, 10};

      // Passo 1: imprima a soma e a quantidade antes do resultado.

      System.out.println("Media: " + calcularMedia(notas));
    }
  }
criterios_validacao:
  - descricao: "Imprimir a soma das notas para investigar (25)"
    contem: "soma=25"
    dica: "Adicione um método que calcule a soma e imprima System.out.println(\"soma=\" + soma);"
  - descricao: "Imprimir a quantidade de notas (3)"
    contem: "quantidade=3"
    dica: "System.out.println(\"quantidade=\" + notas.length);"
  - descricao: "Corrigir o bug: a média de 7, 8 e 10 deve dar 8.33, não 8.0"
    contem: "Media: 8.33"
    dica: "O bug é divisão inteira. Use (double) soma / notas.length no return."
quiz:
  titulo: "Quiz — Depuração"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é o Logcat no Android Studio?"
      opcoes:
        - { id: a, texto: "A janela que mostra as mensagens e os erros gerados pelo app enquanto ele roda" }
        - { id: b, texto: "Um banco de dados" }
        - { id: c, texto: "Um editor de código" }
        - { id: d, texto: "Um emulador" }
      resposta_correta: a
      explicacao: "É a primeira coisa a olhar quando algo dá errado."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é o primeiro passo ao ver o app travar?"
      opcoes:
        - { id: a, texto: "Mudar o código no chute até parar de dar erro" }
        - { id: b, texto: "Reinstalar o Android Studio" }
        - { id: c, texto: "Apagar o projeto e começar de novo" }
        - { id: d, texto: "Ler a mensagem de erro completa, começando pela primeira linha" }
      resposta_correta: d
      explicacao: "A mensagem quase sempre diz o tipo do erro e a linha exata."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que é uma stack trace?"
      opcoes:
        - { id: a, texto: "Uma lista de variáveis" }
        - { id: b, texto: "A sequência de chamadas que levou até o erro, com os números das linhas" }
        - { id: c, texto: "O histórico de versões do código" }
        - { id: d, texto: "Um tipo de teste" }
      resposta_correta: b
      explicacao: "Ela mostra o caminho: qual método chamou qual, até o ponto da falha."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Em uma stack trace, onde normalmente está a causa mais próxima do erro?"
      opcoes:
        - { id: a, texto: "Sempre na última linha" }
        - { id: b, texto: "A ordem é aleatória" }
        - { id: c, texto: "Nas primeiras linhas, e principalmente nas que citam arquivos do SEU projeto" }
        - { id: d, texto: "No meio, sempre" }
      resposta_correta: c
      explicacao: "Boa parte das linhas é código interno do Android; procure as do seu pacote."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Para que serve imprimir valores intermediários durante a investigação?"
      opcoes:
        - { id: a, texto: "Não serve para nada" }
        - { id: b, texto: "Para deixar o app mais lento" }
        - { id: c, texto: "Para preencher o Logcat" }
        - { id: d, texto: "Para ver o que realmente está nas variáveis, em vez de supor" }
      resposta_correta: d
      explicacao: "Quase todo bug é uma diferença entre o que você acha que está lá e o que está de fato."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que significa NullPointerException?"
      opcoes:
        - { id: a, texto: "A internet caiu" }
        - { id: b, texto: "Faltou memória" }
        - { id: c, texto: "O código tentou usar algo que está vazio (nulo), como uma View não encontrada" }
        - { id: d, texto: "O número é zero" }
      resposta_correta: c
      explicacao: "No Android, quase sempre é um findViewById com id errado."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que 'mudar o código no chute' é uma péssima estratégia de depuração?"
      opcoes:
        - { id: a, texto: "Porque demora menos" }
        - { id: b, texto: "Porque você pode esconder o sintoma sem corrigir a causa, e ainda criar novos erros" }
        - { id: c, texto: "Porque é proibido" }
        - { id: d, texto: "Não é uma péssima estratégia" }
      resposta_correta: b
      explicacao: "Depurar é investigar com método: observar, formular uma hipótese e testá-la."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Um app que calcula média e devolve 8.0 em vez de 8.33 tem que tipo de problema?"
      opcoes:
        - { id: a, texto: "Erro de compilação" }
        - { id: b, texto: "Erro de lógica — o app roda sem travar, mas o resultado está errado" }
        - { id: c, texto: "Erro de rede" }
        - { id: d, texto: "Nenhum problema" }
      resposta_correta: b
      explicacao: "São os mais perigosos: não há mensagem de erro, só um resultado silenciosamente errado."
---

## O erro mais difícil é o que não avisa

Existem dois tipos de problema:

- **O que trava o app.** Assustador, mas honesto: aparece uma mensagem, você sabe onde olhar.
- **O que dá resultado errado em silêncio.** O app funciona, ninguém percebe nada — e a nota do
  aluno sai errada, o preço sai errado, o cálculo sai errado.

O segundo é muito mais perigoso. E é dele que trata boa parte desta aula.

## O Logcat

No Android Studio, o **Logcat** é a janela que mostra tudo que o aplicativo diz enquanto roda:
mensagens que você mesmo imprimiu e erros que o sistema gerou.

Quando o app fecha sozinho, a resposta está lá. E a regra é: **leia a mensagem inteira, começando
pela primeira linha**. Ela normalmente traz duas informações preciosas:

- **o tipo do erro** (por exemplo `NullPointerException`);
- **o arquivo e a linha** onde aconteceu.

## Lendo uma stack trace

A **stack trace** é a lista que aparece embaixo da mensagem de erro. Ela mostra a **sequência de
chamadas** que levou até a falha — qual método chamou qual, até o ponto que quebrou.

Ela costuma ser longa e assustadora, mas a maior parte é código interno do Android, que não
interessa. O truque é **procurar as linhas que citam os arquivos do seu projeto** — é ali que está
o seu erro.

Os dois erros mais comuns no Android:

| Erro | Causa mais provável |
|---|---|
| `NullPointerException` | `findViewById` com id errado, devolvendo nulo |
| `ArrayIndexOutOfBoundsException` | acessou uma posição que não existe no array |

O segundo você já conhece da aula de arrays. O primeiro quase sempre é um id digitado diferente
entre o XML e o Java.

## Investigar em vez de chutar

Quando algo dá errado, a tentação é mexer no código até parar de dar erro. Isso é péssimo por dois
motivos: você pode **esconder o sintoma** sem corrigir a causa, e pode **criar erros novos** no
caminho.

Depurar é investigar com método:

1. **Observar** exatamente o que acontece de errado.
2. **Formular uma hipótese** sobre a causa.
3. **Testar** a hipótese olhando os valores reais.
4. **Corrigir** e conferir que o resultado esperado apareceu.

## A técnica mais simples e mais útil

Não precisa de ferramenta sofisticada: **imprima os valores intermediários**.

```java
System.out.println("soma=" + soma);
System.out.println("quantidade=" + notas.length);
System.out.println("resultado=" + resultado);
```

Quase todo bug é uma diferença entre **o que você acha que está na variável** e **o que está de
fato**. Imprimir mostra a verdade em segundos.

No Android, além do `println`, existe o `Log.d("MinhaTag", "mensagem")`, que aparece no Logcat com
uma etiqueta para você filtrar. A ideia é exatamente a mesma.

Uma recomendação profissional: **remova ou desative esses rastros antes de entregar**. Log demais
polui o Logcat e pode até vazar informação.

## Atividade

O método `calcularMedia` no terminal tem um **bug real**: com as notas 7, 8 e 10, ele devolve
`8.0`, mas a média correta é `8.33`.

O app **não trava**. Ele simplesmente responde errado — o tipo de erro mais perigoso.

**Passo 1.** Antes de corrigir, **investigue**. Some as notas e imprima:

```
soma=25
```

**Passo 2.** Imprima também a quantidade:

```
quantidade=3
```

**Passo 3.** Agora raciocine: 25 dividido por 3 é 8,33. Se a soma está certa (25) e a quantidade
está certa (3), **por que o resultado é 8.0?**

A resposta está na Aula 2 do trimestre passado: **divisão entre inteiros descarta a parte
decimal**. Como `soma` e `notas.length` são os dois `int`, o Java joga fora o `,33`.

**Passo 4.** Corrija o `return` do método usando a conversão `(double)`, e confirme:

```
Media: 8.333333333333334
```

Repare no processo: você não chutou. Você observou, imprimiu os valores, formulou a hipótese e
confirmou. Esse é o método que funciona para qualquer bug.

## Desafio extra

1. Chame `calcularMedia` com um array **vazio** e veja o que acontece. Que erro aparece? Como
   você trataria isso? (A próxima aula é exatamente sobre isso.)
2. Adicione um rastro dentro do laço, imprimindo cada nota e a soma parcial. Isso ajuda a ver o
   acumulador crescendo.
3. Volte a um exercício antigo seu, insira um erro de propósito e treine encontrá-lo usando só
   rastros.
