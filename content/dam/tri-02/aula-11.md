---
titulo: "Laços de repetição: for e while"
mes_numero: 2
numero_sequencial: 11
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      // Passo 1: for de 1 a 5.

      // Passo 2: soma de 1 a 10 com for.

      // Passo 3: contagem regressiva de 3 a 1 com while.

    }
  }
criterios_validacao:
  - descricao: "Contar de 1 a 5 com for"
    contem: "Contagem: 1 2 3 4 5"
    dica: "Monte o texto: String s = \"\"; for (int i = 1; i <= 5; i++) { s = s + i + \" \"; } e mostre \"Contagem: \" + s.trim()"
  - descricao: "Somar os números de 1 a 10 (resultado 55)"
    contem: "Soma: 55"
    dica: "int soma = 0; for (int i = 1; i <= 10; i++) { soma = soma + i; } System.out.println(\"Soma: \" + soma);"
  - descricao: "Fazer a contagem regressiva com while"
    contem: "Regressiva: 3 2 1"
    dica: "int n = 3; String r = \"\"; while (n >= 1) { r = r + n + \" \"; n--; }"
quiz:
  titulo: "Quiz — Laços de repetição"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Para que serve um laço de repetição?"
      opcoes:
        - { id: a, texto: "Executar o mesmo bloco de código várias vezes, sem copiar e colar" }
        - { id: b, texto: "Tomar decisões no programa" }
        - { id: c, texto: "Criar variáveis" }
        - { id: d, texto: "Encerrar o programa" }
      resposta_correta: a
      explicacao: "Quem decide é o if; quem repete é o for e o while."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Quais são as três partes de um for, na ordem?"
      opcoes:
        - { id: a, texto: "Inicialização, condição de parada e incremento" }
        - { id: b, texto: "Condição, corpo e retorno" }
        - { id: c, texto: "Nome, tipo e valor" }
        - { id: d, texto: "Início, meio e fim do programa" }
      resposta_correta: a
      explicacao: "for (int i = 1; i <= 5; i++) — começa em 1, repete enquanto i <= 5, soma 1 a cada volta."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Quantas vezes executa: for (int i = 1; i <= 5; i++)?"
      opcoes:
        - { id: a, texto: "5 vezes" }
        - { id: b, texto: "4 vezes" }
        - { id: c, texto: "6 vezes" }
        - { id: d, texto: "Infinitas vezes" }
      resposta_correta: a
      explicacao: "i vale 1, 2, 3, 4 e 5 — cinco voltas."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que significa i++?"
      opcoes:
        - { id: a, texto: "Some 1 ao valor de i" }
        - { id: b, texto: "Multiplique i por 2" }
        - { id: c, texto: "Compare i com 1" }
        - { id: d, texto: "Apague a variável i" }
      resposta_correta: a
      explicacao: "i++ é uma forma curta de escrever i = i + 1. E i-- subtrai 1."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual a principal diferença entre for e while?"
      opcoes:
        - { id: a, texto: "O for é melhor quando você sabe quantas repetições serão; o while, quando depende de uma condição" }
        - { id: b, texto: "O while não existe em Java" }
        - { id: c, texto: "O for só funciona com números negativos" }
        - { id: d, texto: "Não há diferença nenhuma" }
      resposta_correta: a
      explicacao: "Os dois fazem a mesma coisa, mas cada um deixa a intenção mais clara em um caso."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é um laço infinito?"
      opcoes:
        - { id: a, texto: "Um laço cuja condição nunca fica falsa, então ele nunca para" }
        - { id: b, texto: "Um laço que roda exatamente mil vezes" }
        - { id: c, texto: "Um erro de compilação" }
        - { id: d, texto: "Um laço sem corpo" }
      resposta_correta: a
      explicacao: "Geralmente acontece quando esquecemos de atualizar a variável de controle dentro do while."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual erro faz um while virar laço infinito?"
      opcoes:
        - { id: a, texto: "Esquecer de alterar a variável testada na condição dentro do laço" }
        - { id: b, texto: "Usar chaves no corpo do laço" }
        - { id: c, texto: "Declarar a variável antes do while" }
        - { id: d, texto: "Usar um int como contador" }
      resposta_correta: a
      explicacao: "Se n nunca diminui, a condição n >= 1 nunca fica falsa."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que somar valores dentro de um laço exige uma variável declarada FORA dele?"
      opcoes:
        - { id: a, texto: "Porque a soma precisa sobreviver entre as voltas e continuar existindo depois do laço" }
        - { id: b, texto: "Porque o Java não permite variáveis dentro de laços" }
        - { id: c, texto: "Só por questão de estilo" }
        - { id: d, texto: "Para o programa rodar mais rápido" }
      resposta_correta: a
      explicacao: "Se declarada dentro, ela seria recriada do zero a cada volta e some ao final."
---

## Repetir sem copiar e colar

Imagine mostrar os números de 1 a 100. Copiar e colar cem `System.out.println` é inviável — e se
mudar para 1000?

Para isso existem os **laços de repetição**: eles executam o mesmo bloco várias vezes, mudando um
valor a cada volta.

Você já conhece a estrutura que **decide** (`if`). Agora vem a que **repete**.

## O laço for

```java
for (int i = 1; i <= 5; i++) {
  System.out.println(i);
}
```

Isso mostra 1, 2, 3, 4 e 5. O `for` tem **três partes**, separadas por ponto e vírgula:

| Parte | No exemplo | O que faz |
|---|---|---|
| **inicialização** | `int i = 1` | cria a variável de controle e define o valor inicial |
| **condição** | `i <= 5` | enquanto for verdadeira, o laço continua |
| **incremento** | `i++` | o que acontece ao fim de cada volta |

O `i++` é uma forma curta de escrever `i = i + 1`. Existe também o `i--`, que subtrai 1.

**A ordem de execução** é: inicializa uma vez → testa a condição → executa o corpo → incrementa →
testa de novo → e assim por diante, até a condição ficar falsa.

## Acumulando um resultado

Um uso muito comum é **somar** valores:

```java
int soma = 0;
for (int i = 1; i <= 10; i++) {
  soma = soma + i;
}
System.out.println("Soma: " + soma);   // Soma: 55
```

Repare em um detalhe essencial: a variável `soma` é declarada **fora** do laço.

Se ela fosse declarada dentro, seria recriada do zero a cada volta — e deixaria de existir quando
o laço terminasse. Ela precisa **sobreviver entre as voltas**.

## O laço while

O `while` repete **enquanto** uma condição for verdadeira:

```java
int n = 3;
while (n >= 1) {
  System.out.println(n);
  n--;
}
```

Isso mostra 3, 2 e 1.

## for ou while: qual usar?

Os dois fazem a mesma coisa, mas cada um deixa a intenção mais clara em um caso:

- **`for`** — quando você **sabe quantas** repetições serão. "Faça 10 vezes", "percorra os 7 dias
  da semana".
- **`while`** — quando depende de uma **condição** que pode mudar. "Enquanto houver mensagens não
  lidas", "enquanto o usuário não digitar sair".

## O erro clássico: laço infinito

Veja o que acontece se esquecermos o `n--`:

```java
int n = 3;
while (n >= 1) {
  System.out.println(n);
  // esqueceu de diminuir o n!
}
```

O `n` continua valendo 3 para sempre, a condição nunca fica falsa, e o programa **nunca para**.
Isso é um **laço infinito**, e ele trava o aplicativo.

A regra para evitar: **toda variável testada na condição do `while` precisa ser alterada dentro do
laço**. Sempre que escrever um `while`, procure imediatamente onde a variável muda.

## Montando um texto ao longo do laço

Para mostrar tudo em uma linha só, vá **acumulando em uma String**:

```java
String s = "";
for (int i = 1; i <= 5; i++) {
  s = s + i + " ";
}
System.out.println("Contagem: " + s.trim());   // Contagem: 1 2 3 4 5
```

O `.trim()` remove o espaço sobrando no final. É a mesma ideia da soma: a variável vive fora do
laço e cresce a cada volta.

## Atividade

No terminal abaixo:

**Passo 1.** Use um `for` para montar a contagem de 1 a 5 em uma linha:

```
Contagem: 1 2 3 4 5
```

**Passo 2.** Use um `for` para somar os números de 1 a 10:

```
Soma: 55
```

**Passo 3.** Use um `while` para fazer a contagem regressiva de 3 até 1:

```
Regressiva: 3 2 1
```

Antes de executar, **conte com o dedo** quantas voltas cada laço vai dar. Errar essa previsão é o
jeito mais rápido de descobrir se você entendeu a condição de parada.

## Desafio extra

1. Mostre apenas os números **pares** de 1 a 20 (combine o `for` com o `%` da Aula 2).
2. Calcule a **tabuada do 7**, de 7x1 até 7x10.
3. Faça um `for` que conte **de trás para frente**, de 10 até 1 (dica: comece em 10, condição
   `i >= 1` e use `i--`).
4. Escreva de propósito um `while` sem atualizar a variável e observe o programa não terminar (ele
   será interrompido por tempo). Depois corrija.
