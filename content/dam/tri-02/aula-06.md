---
titulo: "Praticando lógica: desafios em Java"
mes_numero: 2
numero_sequencial: 6
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      // Desafio 1: par ou impar
      int numero = 7;

      // Desafio 2: media de tres notas e aprovacao
      double nota1 = 8.0;
      double nota2 = 5.5;
      double nota3 = 7.5;

      // Desafio 3: maior de tres numeros
      int a = 14;
      int b = 27;
      int c = 9;

      // Desafio 4: classificacao de IMC (peso 70, altura 1.75)
      double peso = 70.0;
      double altura = 1.75;

    }
  }
criterios_validacao:
  - descricao: "Desafio 1 — identificar que 7 é ímpar"
    contem: "Impar"
    dica: "if (numero % 2 == 0) { ...\"Par\"... } else { System.out.println(\"Impar\"); }"
  - descricao: "Desafio 2 — média das notas é 7.0"
    contem: "Media: 7.0"
    dica: "double media = (nota1 + nota2 + nota3) / 3; e mostre \"Media: \" + media"
  - descricao: "Desafio 2 — resultado Aprovado (média 7.0 >= 6)"
    contem: "Aprovado"
    dica: "if (media >= 6) { System.out.println(\"Aprovado\"); } else { ... }"
  - descricao: "Desafio 3 — o maior número é 27"
    contem: "Maior: 27"
    dica: "Compare com if/else if: se a > b e a > c, o maior é a; senão, compare b e c."
  - descricao: "Desafio 4 — IMC calculado (22.85...)"
    contem: "IMC: 22.8"
    dica: "double imc = peso / (altura * altura); e mostre \"IMC: \" + imc"
  - descricao: "Desafio 4 — classificação Peso normal"
    contem: "Peso normal"
    dica: "IMC entre 18.5 e 24.9 é peso normal. Use if / else if na ordem certa."
quiz:
  titulo: "Quiz — Praticando lógica"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Como descobrir se um número é par?"
      opcoes:
        - { id: a, texto: "Testando se numero / 2 == 0" }
        - { id: b, texto: "Testando se numero > 2" }
        - { id: c, texto: "Não é possível" }
        - { id: d, texto: "Testando se numero % 2 == 0" }
      resposta_correta: d
      explicacao: "O resto da divisão por 2 é zero apenas para números pares."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que (nota1 + nota2 + nota3) / 3 precisa dos parênteses?"
      opcoes:
        - { id: a, texto: "Os parênteses são opcionais" }
        - { id: b, texto: "Para deixar mais bonito" }
        - { id: c, texto: "Sem eles o código não compila" }
        - { id: d, texto: "Sem eles, só a nota3 seria dividida por 3, por causa da precedência" }
      resposta_correta: d
      explicacao: "Divisão tem precedência sobre soma, então é preciso somar tudo primeiro."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Se as notas fossem int em vez de double, o que aconteceria com a média?"
      opcoes:
        - { id: a, texto: "Nada mudaria" }
        - { id: b, texto: "O programa não compilaria" }
        - { id: c, texto: "A média seria arredondada para cima" }
        - { id: d, texto: "A parte decimal seria descartada, dando um resultado errado" }
      resposta_correta: d
      explicacao: "É a divisão inteira da Aula 2 — por isso médias sempre usam double."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para achar o maior entre três números com if, quantas comparações no mínimo são necessárias?"
      opcoes:
        - { id: a, texto: "Duas — compara o primeiro par e depois o vencedor com o terceiro" }
        - { id: b, texto: "Nenhuma, o Java descobre sozinho" }
        - { id: c, texto: "Seis" }
        - { id: d, texto: "Uma só" }
      resposta_correta: a
      explicacao: "É o mesmo raciocínio de um torneio: dois se enfrentam, o vencedor enfrenta o terceiro."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é a fórmula do IMC?"
      opcoes:
        - { id: a, texto: "peso dividido pela altura ao quadrado" }
        - { id: b, texto: "peso mais altura" }
        - { id: c, texto: "peso multiplicado pela altura" }
        - { id: d, texto: "altura dividida pelo peso" }
      resposta_correta: a
      explicacao: "IMC = peso / (altura * altura)."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que escrever peso / altura * altura (sem parênteses) dá resultado errado?"
      opcoes:
        - { id: a, texto: "Porque altura é double" }
        - { id: b, texto: "Porque não compila" }
        - { id: c, texto: "Porque o Java divide primeiro e depois multiplica, em vez de elevar ao quadrado" }
        - { id: d, texto: "Não dá errado" }
      resposta_correta: c
      explicacao: "Divisão e multiplicação têm a mesma precedência e são resolvidas da esquerda para a direita."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Ao classificar faixas de IMC com else if, qual cuidado é essencial?"
      opcoes:
        - { id: a, texto: "Testar sempre do maior para o menor apenas" }
        - { id: b, texto: "Usar sempre || entre elas" }
        - { id: c, texto: "Colocar as condições em ordem, sem deixar faixas se sobreporem" }
        - { id: d, texto: "Não usar else" }
      resposta_correta: c
      explicacao: "É a mesma lição da Aula 4: o Java para na primeira condição verdadeira."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é a melhor forma de testar se um programa com if está correto?"
      opcoes:
        - { id: a, texto: "Rodar uma vez só e confiar" }
        - { id: b, texto: "Apagar o else" }
        - { id: c, texto: "Ler o código sem executar" }
        - { id: d, texto: "Rodar com valores diferentes que caiam em cada um dos caminhos possíveis" }
      resposta_correta: d
      explicacao: "Um if só está testado de verdade quando você viu todos os caminhos funcionando."
---

## Hora de juntar tudo

Nas cinco aulas anteriores você aprendeu variáveis, tipos, operadores aritméticos, comparações,
`if/else` e operadores lógicos. Esta aula não traz conteúdo novo: traz **quatro desafios** que
combinam tudo isso.

É assim que a programação funciona de verdade — os conceitos são poucos, mas se combinam de
infinitas maneiras.

## Relembrando o essencial

**Par ou ímpar** — use o resto da divisão:

```java
if (numero % 2 == 0) {
  // par
} else {
  // impar
}
```

**Média** — cuidado com os parênteses e com o tipo:

```java
double media = (nota1 + nota2 + nota3) / 3;
```

Sem os parênteses, só a última nota seria dividida por 3, porque a divisão tem **precedência**
sobre a soma. E se as notas fossem `int`, a parte decimal seria descartada (a pegadinha da Aula 2).

**Maior de três** — pense como um torneio: compare dois, e o vencedor enfrenta o terceiro.

```java
if (a > b && a > c) {
  // a é o maior
} else if (b > c) {
  // b é o maior
} else {
  // c é o maior
}
```

**IMC** — a fórmula é peso dividido pela altura **ao quadrado**:

```java
double imc = peso / (altura * altura);
```

Os parênteses são obrigatórios. Sem eles, `peso / altura * altura` seria resolvido da esquerda
para a direita: primeiro divide, depois multiplica — e o resultado volta a ser o próprio peso.

Faixas de classificação do IMC:

| Faixa | Classificação |
|---|---|
| abaixo de 18.5 | Abaixo do peso |
| 18.5 a 24.9 | Peso normal |
| 25 a 29.9 | Sobrepeso |
| 30 ou mais | Obesidade |

## Atividade

No terminal abaixo estão quatro desafios, com as variáveis já declaradas. Resolva um de cada vez
e confira no checklist.

**Desafio 1 — Par ou ímpar.** Com `numero = 7`, mostre:

```
Impar
```

**Desafio 2 — Média e aprovação.** Com as notas 8.0, 5.5 e 7.5, calcule a média e diga se está
aprovado (média >= 6):

```
Media: 7.0
Aprovado
```

**Desafio 3 — Maior de três.** Com `a = 14`, `b = 27`, `c = 9`, mostre:

```
Maior: 27
```

**Desafio 4 — IMC.** Com peso 70.0 e altura 1.75, calcule o IMC e classifique:

```
IMC: 22.857142857142858
Peso normal
```

## Como testar de verdade

Depois que os seis itens do checklist marcarem, **não pare por aí**. Um `if` só está realmente
testado quando você viu **todos os caminhos** funcionando:

- Mude `numero` para 8 e confirme que aparece "Par".
- Baixe as notas para que a média fique abaixo de 6 e confirme o "Reprovado".
- Troque os valores de `a`, `b` e `c` para que o maior seja cada um deles, um por vez.
- Mude o peso para 50 e depois para 95, e confira se a classificação do IMC muda corretamente.

## Desafio extra

1. No desafio 3, o que acontece se dois números forem iguais e forem os maiores? Teste com
   `a = 27` e `b = 27` e veja se sua lógica ainda faz sentido.
2. Melhore o desafio 2 mostrando também **quantos pontos faltaram** para a aprovação, quando o
   aluno for reprovado.
3. No desafio 4, adicione a faixa de "Obesidade grave" para IMC acima de 40 e teste.
