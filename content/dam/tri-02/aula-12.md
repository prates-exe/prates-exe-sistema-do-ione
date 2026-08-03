---
titulo: "Listas (arrays): guardando vários valores"
mes_numero: 2
numero_sequencial: 12
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      String[] contatos = {"Ana", "Bruno", "Carla", "Diego"};
      int[] notas = {8, 6, 10, 7};

      // Passo 1: mostre quantos contatos existem.

      // Passo 2: percorra e monte a lista dos contatos.

      // Passo 3: calcule a media das notas.

      // Passo 4: descubra a maior nota.

    }
  }
criterios_validacao:
  - descricao: "Mostrar o total de contatos (4)"
    contem: "Total: 4"
    dica: "System.out.println(\"Total: \" + contatos.length); — repare: length não tem parênteses."
  - descricao: "Percorrer o array e listar todos os contatos"
    contem: "Contatos: Ana Bruno Carla Diego"
    dica: "String s = \"\"; for (int i = 0; i < contatos.length; i++) { s = s + contatos[i] + \" \"; }"
  - descricao: "Calcular a média das notas (7.75)"
    contem: "Media: 7.75"
    dica: "Some tudo em um for e divida por notas.length — use (double) para não perder as casas decimais."
  - descricao: "Encontrar a maior nota (10)"
    contem: "Maior nota: 10"
    dica: "int maior = notas[0]; e no for, se notas[i] > maior, atualize maior."
quiz:
  titulo: "Quiz — Arrays"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é um array?"
      opcoes:
        - { id: a, texto: "Um tipo de laço de repetição" }
        - { id: b, texto: "Uma variável que guarda um único valor" }
        - { id: c, texto: "Uma variável que guarda vários valores do mesmo tipo, em posições numeradas" }
        - { id: d, texto: "Um comando de decisão" }
      resposta_correta: c
      explicacao: "Em vez de nota1, nota2, nota3, você tem notas[0], notas[1], notas[2]."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é o índice do PRIMEIRO elemento de um array em Java?"
      opcoes:
        - { id: a, texto: "Depende do tamanho" }
        - { id: b, texto: "-1" }
        - { id: c, texto: "0" }
        - { id: d, texto: "1" }
      resposta_correta: c
      explicacao: "Arrays em Java começam no zero. Essa é a fonte de metade dos erros com listas."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Em um array com 4 elementos, qual é o índice do ÚLTIMO?"
      opcoes:
        - { id: a, texto: "3" }
        - { id: b, texto: "4" }
        - { id: c, texto: "5" }
        - { id: d, texto: "0" }
      resposta_correta: a
      explicacao: "Os índices vão de 0 a 3. O último é sempre tamanho - 1."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Como descobrir quantos elementos um array tem?"
      opcoes:
        - { id: a, texto: "Contando manualmente" }
        - { id: b, texto: "Usando .length(), com parênteses" }
        - { id: c, texto: "Usando .length, sem parênteses" }
        - { id: d, texto: "Usando .size" }
      resposta_correta: c
      explicacao: "Em arrays é .length (sem parênteses). Em String é .length() (com parênteses)."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é a condição correta para percorrer um array inteiro com for?"
      opcoes:
        - { id: a, texto: "i <= array.length" }
        - { id: b, texto: "i > 0" }
        - { id: c, texto: "i < array.length" }
        - { id: d, texto: "i < array.length - 1" }
      resposta_correta: c
      explicacao: "Com <= você tentaria acessar uma posição que não existe e o programa quebraria."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que acontece ao acessar um índice que não existe, como notas[10] em um array de 4?"
      opcoes:
        - { id: a, texto: "O programa quebra com um erro de índice fora do limite" }
        - { id: b, texto: "Retorna o último elemento" }
        - { id: c, texto: "Retorna zero" }
        - { id: d, texto: "O array cresce automaticamente" }
      resposta_correta: a
      explicacao: "É o famoso ArrayIndexOutOfBoundsException, um dos erros mais comuns em Java."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Para achar o maior valor de um array, qual é a estratégia?"
      opcoes:
        - { id: a, texto: "Somar todos e dividir pelo tamanho" }
        - { id: b, texto: "Guardar o primeiro como maior e, percorrendo, trocar sempre que achar um valor maior" }
        - { id: c, texto: "Não é possível sem ordenar antes" }
        - { id: d, texto: "Pegar sempre o último elemento" }
      resposta_correta: b
      explicacao: "É o mesmo raciocínio de segurar a maior carta da mão enquanto olha as outras."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual a relação entre arrays e a RecyclerView que você viu na Aula 8?"
      opcoes:
        - { id: a, texto: "A lista de dados que alimenta a RecyclerView é justamente uma coleção como essa" }
        - { id: b, texto: "Arrays só funcionam fora do Android" }
        - { id: c, texto: "Nenhuma relação" }
        - { id: d, texto: "A RecyclerView substitui os arrays" }
      resposta_correta: a
      explicacao: "O Adapter percorre a coleção exatamente como você percorre um array com for."
---

## Um nome para muitos valores

Até agora, cada variável guardava **um** valor. Mas e se você precisar guardar as notas de 30
alunos? Criar `nota1`, `nota2`, ... até `nota30` seria terrível — e impossível de percorrer com um
laço.

Para isso existem os **arrays** (também chamados de vetores ou listas): uma variável que guarda
**vários valores do mesmo tipo**, em posições numeradas.

## Criando um array

```java
String[] contatos = {"Ana", "Bruno", "Carla", "Diego"};
int[] notas = {8, 6, 10, 7};
```

Os colchetes `[]` depois do tipo indicam que é um array. Os valores vão entre chaves, separados
por vírgula.

## As posições começam no ZERO

Esta é a regra mais importante da aula, e a fonte de metade dos erros com listas:

| Índice | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| contatos | Ana | Bruno | Carla | Diego |

```java
System.out.println(contatos[0]);   // Ana
System.out.println(contatos[3]);   // Diego
```

Em um array de **4** elementos, os índices vão de **0 a 3**. O último índice é sempre
**tamanho − 1**.

Se você tentar `contatos[4]`, o programa **quebra** com o erro
`ArrayIndexOutOfBoundsException` — "índice fora do limite". Esse é um dos erros mais comuns em
Java, e agora você já sabe o que ele significa.

## Descobrindo o tamanho

```java
System.out.println(contatos.length);   // 4
```

Atenção ao detalhe: em **array** é `.length` **sem parênteses**. Em **String** é `.length()`
**com parênteses**. Confundir os dois é normal no começo.

## Percorrendo com for

Aqui os laços da aula passada mostram o seu valor. Esta é a combinação mais usada em toda a
programação:

```java
for (int i = 0; i < contatos.length; i++) {
  System.out.println(contatos[i]);
}
```

Repare em duas coisas:

- começa em **`i = 0`** (o primeiro índice);
- a condição é **`i < contatos.length`**, com **menor**, não "menor ou igual".

Se fosse `i <= contatos.length`, na última volta o `i` valeria 4 e o programa quebraria. Decore
esse padrão: **começa em 0, vai até menor que o length**.

## Somando e calculando a média

```java
int soma = 0;
for (int i = 0; i < notas.length; i++) {
  soma = soma + notas[i];
}
double media = (double) soma / notas.length;
System.out.println("Media: " + media);
```

O `(double)` é a conversão da Aula 2 — sem ela, `31 / 4` daria `7` em vez de `7.75`.

## Encontrando o maior valor

A estratégia é a mesma de segurar a maior carta da mão enquanto olha as outras:

```java
int maior = notas[0];
for (int i = 0; i < notas.length; i++) {
  if (notas[i] > maior) {
    maior = notas[i];
  }
}
```

Começamos assumindo que o primeiro é o maior, e trocamos sempre que aparecer um maior. Repare que
esta é a versão geral do "maior de três" que você fez na Aula 6 — só que funciona para **qualquer
quantidade** de elementos.

## A ligação com o Android

Lembra da **RecyclerView** e do **Adapter** da Aula 8? A "lista de dados" que alimenta uma
RecyclerView é exatamente uma coleção como esta. O Adapter percorre a coleção **do mesmo jeito**
que você percorre um array com `for`, pegando o item da posição e desenhando na tela.

E de onde vêm esses dados? Normalmente de um `SELECT` no banco local (Aula 9). Tudo se conecta.

## Atividade

No terminal abaixo, os dois arrays já estão criados.

**Passo 1.** Mostre quantos contatos existem:

```
Total: 4
```

**Passo 2.** Percorra o array e monte a lista em uma linha:

```
Contatos: Ana Bruno Carla Diego
```

**Passo 3.** Calcule a média das notas (lembre do `(double)`):

```
Media: 7.75
```

**Passo 4.** Descubra a maior nota:

```
Maior nota: 10
```

## Desafio extra

1. Descubra a **menor** nota (mesma estratégia, invertendo a comparação).
2. Conte **quantas notas** são maiores ou iguais a 7 (combine `for` com `if`).
3. Mostre cada contato **junto com a nota dele**, usando o mesmo índice nos dois arrays:
   `Ana: 8`, `Bruno: 6`... Repare que o índice `i` serve para os dois ao mesmo tempo.
4. Tente acessar `contatos[4]` de propósito e leia a mensagem de erro completa. Reconhecer esse
   erro vai te poupar muito tempo.
