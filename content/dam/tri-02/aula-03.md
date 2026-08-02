---
titulo: "Comentários, boas práticas e código legível"
mes_numero: 2
numero_sequencial: 3
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      // Passo 1: crie largura e altura (double) e calcule a area.

      // Passo 2: crie precoPorMetro e calcule o custo total.

      // Passo 3: mostre os dois resultados no formato pedido.

    }
  }
criterios_validacao:
  - descricao: "Calcular e mostrar a área do retângulo (4.0 x 2.5 = 10.0)"
    contem: "Area: 10.0"
    dica: "double largura = 4.0; double altura = 2.5; double area = largura * altura; e mostre \"Area: \" + area"
  - descricao: "Calcular e mostrar o custo total (10.0 x 35.0 = 350.0)"
    contem: "Custo: 350.0"
    dica: "double precoPorMetro = 35.0; double custo = area * precoPorMetro; e mostre \"Custo: \" + custo"
quiz:
  titulo: "Quiz — Comentários e boas práticas"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Como escrevemos um comentário de uma linha em Java?"
      opcoes:
        - { id: a, texto: "// comentário" }
        - { id: b, texto: "# comentário" }
        - { id: c, texto: "<!-- comentário -->" }
        - { id: d, texto: "' comentário" }
      resposta_correta: a
      explicacao: "// inicia um comentário de uma linha, que o Java ignora ao executar."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Como escrevemos um comentário de VÁRIAS linhas em Java?"
      opcoes:
        - { id: a, texto: "Entre /* e */" }
        - { id: b, texto: "Entre << e >>" }
        - { id: c, texto: "Usando // em uma linha só" }
        - { id: d, texto: "Não é possível" }
      resposta_correta: a
      explicacao: "Tudo entre /* e */ é ignorado, mesmo ocupando várias linhas."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que acontece com o comentário quando o programa roda?"
      opcoes:
        - { id: a, texto: "Nada — o Java ignora completamente, ele serve só para humanos lerem" }
        - { id: b, texto: "Aparece na tela junto com a saída" }
        - { id: c, texto: "Deixa o programa mais lento" }
        - { id: d, texto: "Vira um erro" }
      resposta_correta: a
      explicacao: "Comentário não afeta em nada a execução."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que usar nomes descritivos, como 'idadeAluno' em vez de 'x'?"
      opcoes:
        - { id: a, texto: "Facilita entender o código depois, para você mesmo e para outras pessoas" }
        - { id: b, texto: "É obrigatório, o código não roda com nomes curtos" }
        - { id: c, texto: "Deixa o programa mais rápido" }
        - { id: d, texto: "Não faz diferença nenhuma" }
      resposta_correta: a
      explicacao: "Não muda a velocidade, mas muda muito a facilidade de manter o código."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual nome segue o padrão camelCase do Java?"
      opcoes:
        - { id: a, texto: "areaDoRetangulo" }
        - { id: b, texto: "AreaDoRetangulo" }
        - { id: c, texto: "area_do_retangulo" }
        - { id: d, texto: "AREADORETANGULO" }
      resposta_correta: a
      explicacao: "Primeira palavra minúscula, as seguintes começando com maiúscula, sem espaços nem underscores."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é o melhor uso de um comentário?"
      opcoes:
        - { id: a, texto: "Explicar POR QUE algo foi feito, quando não é óbvio pelo código" }
        - { id: b, texto: "Repetir exatamente o que a linha já diz" }
        - { id: c, texto: "Escrever o máximo de texto possível" }
        - { id: d, texto: "Guardar senhas" }
      resposta_correta: a
      explicacao: "Comentar '// soma 1 a x' em cima de 'x = x + 1' não ajuda ninguém. Explique a intenção."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que a indentação (o recuo das linhas) é importante?"
      opcoes:
        - { id: a, texto: "Mostra visualmente qual código está dentro de qual bloco, facilitando a leitura" }
        - { id: b, texto: "O Java não roda sem indentação" }
        - { id: c, texto: "Deixa o arquivo menor" }
        - { id: d, texto: "Não tem importância nenhuma" }
      resposta_correta: a
      explicacao: "O Java aceitaria tudo em uma linha só, mas ninguém conseguiria ler depois."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Guardar o resultado de um cálculo em uma variável com nome claro, em vez de repetir a conta, serve para quê?"
      opcoes:
        - { id: a, texto: "Evitar repetição e deixar claro o significado daquele valor" }
        - { id: b, texto: "Ocupar mais memória de propósito" }
        - { id: c, texto: "Deixar o código mais difícil" }
        - { id: d, texto: "Nada, é sempre pior" }
      resposta_correta: a
      explicacao: "Se a conta muda, você corrige em um lugar só — e quem lê entende o que aquele número representa."
---

## Código é lido muito mais vezes do que escrito

Você escreve um programa uma vez, mas vai **ler** ele muitas vezes: para corrigir um erro, para
adicionar uma função nova, para lembrar o que fez semanas atrás. E outras pessoas também vão ler.

Por isso, escrever código que **funciona** é só metade do trabalho. A outra metade é escrever
código que dá para **entender**.

## Comentários

Comentários são trechos que o Java **ignora** completamente ao executar. Servem só para explicar
para humanos:

```java
// Comentário de uma linha

/*
  Comentário
  de várias linhas
*/
```

O ponto importante: **comente o "por quê", não o "o quê"**.

```java
// RUIM — só repete o que a linha já diz
// soma 1 ao contador
contador = contador + 1;

// BOM — explica a intenção
// Conta quantas tentativas o aluno já fez, para liberar a dica na terceira
contador = contador + 1;
```

Um comentário que apenas repete o código não ajuda ninguém e ainda corre o risco de ficar
desatualizado.

## Nomes de variáveis

Em Java o padrão é o **camelCase**: primeira palavra em minúsculo, cada palavra seguinte começando
com maiúscula, sem espaços nem underscores.

```java
int idadeAluno = 15;
double areaDoRetangulo = 12.5;
String nomeCompleto = "Ana Souza";
```

Compare estes dois trechos, que fazem exatamente a mesma coisa:

```java
// Difícil de entender
double x = 4.0;
double y = 2.5;
double z = x * y;
System.out.println(z);

// Fácil de entender
double largura = 4.0;
double altura = 2.5;
double area = largura * altura;
System.out.println("Area: " + area);
```

O segundo não é mais lento nem maior — é só mais claro. E clareza é o que separa código
profissional de código amador.

## Indentação

**Indentação** é o recuo das linhas, que mostra visualmente o que está dentro do quê:

```java
class Main {
  public static void main(String[] args) {
    int idade = 17;
    if (idade >= 18) {
      System.out.println("Maior de idade");
    }
  }
}
```

Tecnicamente o Java aceitaria tudo em uma linha só. Mas ninguém conseguiria ler. Mantenha sempre
o recuo consistente — cada bloco `{ }` desloca um nível para a direita.

## Guardar resultados em variáveis

Quando um valor é usado mais de uma vez, ou quando o cálculo tem um significado, guarde em uma
variável:

```java
// RUIM — a conta se repete e ninguém sabe o que ela significa
System.out.println(4.0 * 2.5);
System.out.println(4.0 * 2.5 * 35.0);

// BOM
double area = largura * altura;
double custo = area * precoPorMetro;
System.out.println("Area: " + area);
System.out.println("Custo: " + custo);
```

Se o preço mudar, você corrige em **um** lugar só.

## Atividade

Vamos calcular o custo de um piso para um cômodo.

**Passo 1.** Crie as variáveis `largura = 4.0` e `altura = 2.5` (ambas `double`), calcule a área
e guarde em uma variável chamada `area`.

**Passo 2.** Crie `precoPorMetro = 35.0` e calcule o custo total (`area * precoPorMetro`),
guardando em uma variável `custo`.

**Passo 3.** Mostre os dois resultados exatamente assim:

```
Area: 10.0
Custo: 350.0
```

Capriche: use **nomes descritivos**, **indente** corretamente e **comente** o que cada trecho faz.
Isso não vale ponto no checklist, mas é exatamente o que separa um código bom de um ruim.

## Desafio extra

1. Adicione uma margem de segurança de 10% no material e mostre o novo custo.
2. Reescreva o programa usando nomes ruins (`x`, `y`, `z`) e compare os dois lado a lado. Qual
   você entenderia melhor daqui a um mês?
3. Comente cada bloco explicando **a intenção**, não a operação.
