---
titulo: "Otimização: desempenho e consumo de bateria"
mes_numero: 3
numero_sequencial: 23
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      String[] nomes = {"Ana", "Bruno", "Carla", "Diego", "Eva"};

      // Passo 1: montagem INEFICIENTE (String + String dentro do laco).

      // Passo 2: montagem EFICIENTE com StringBuilder.

      // Passo 3: prove que as duas produzem o mesmo texto.

    }
  }
criterios_validacao:
  - descricao: "Montar a lista da forma ineficiente e mostrar o resultado"
    contem: "Lento: Ana Bruno Carla Diego Eva"
    dica: "String s = \"\"; for (...) { s = s + nomes[i] + \" \"; } e imprima \"Lento: \" + s.trim();"
  - descricao: "Montar a mesma lista com StringBuilder"
    contem: "Rapido: Ana Bruno Carla Diego Eva"
    dica: "StringBuilder sb = new StringBuilder(); for (...) { sb.append(nomes[i]).append(\" \"); }"
  - descricao: "Provar que as duas formas dão exatamente o mesmo texto"
    contem: "Iguais: true"
    dica: "Compare com .equals() os dois resultados já com trim()."
quiz:
  titulo: "Quiz — Otimização"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que desempenho importa mais em celular do que em computador?"
      opcoes:
        - { id: a, texto: "Porque o celular tem menos recursos e depende de bateria" }
        - { id: b, texto: "Porque celulares não têm processador" }
        - { id: c, texto: "Não importa mais" }
        - { id: d, texto: "Porque a tela é menor" }
      resposta_correta: a
      explicacao: "Processamento desnecessário consome bateria e trava aparelhos mais simples."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que concatenar String dentro de um laço é ineficiente?"
      opcoes:
        - { id: a, texto: "Porque String é imutável: cada concatenação cria um novo objeto na memória" }
        - { id: b, texto: "Porque o laço fica infinito" }
        - { id: c, texto: "Porque String não aceita o operador +" }
        - { id: d, texto: "Não é ineficiente" }
      resposta_correta: a
      explicacao: "Com poucos itens não se nota; com milhares, o app engasga."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual classe é indicada para montar textos dentro de laços?"
      opcoes:
        - { id: a, texto: "StringBuilder" }
        - { id: b, texto: "Integer" }
        - { id: c, texto: "ArrayList" }
        - { id: d, texto: "Math" }
      resposta_correta: a
      explicacao: "Ela acumula o texto em um só objeto, em vez de criar um novo a cada volta."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que a RecyclerView economiza recursos em listas longas?"
      opcoes:
        - { id: a, texto: "Porque reaproveita as views que saem da tela, criando apenas as visíveis" }
        - { id: b, texto: "Porque carrega tudo de uma vez" }
        - { id: c, texto: "Porque não usa Adapter" }
        - { id: d, texto: "Ela não economiza" }
      resposta_correta: a
      explicacao: "Uma lista de mil itens não cria mil componentes."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que mais consome bateria em um aplicativo típico?"
      opcoes:
        - { id: a, texto: "Uso constante de rede, GPS e sensores" }
        - { id: b, texto: "A quantidade de linhas de código" }
        - { id: c, texto: "O tamanho do arquivo XML" }
        - { id: d, texto: "A quantidade de comentários" }
      resposta_correta: a
      explicacao: "Rádio, GPS e sensores são os grandes consumidores; a CPU vem depois."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é a boa prática ao usar o GPS?"
      opcoes:
        - { id: a, texto: "Ligar apenas quando necessário e desligar assim que obtiver a informação" }
        - { id: b, texto: "Manter sempre ligado, por garantia" }
        - { id: c, texto: "Ligar no onCreate e nunca desligar" }
        - { id: d, texto: "Nunca usar GPS" }
      resposta_correta: a
      explicacao: "GPS ligado em segundo plano é uma das principais causas de bateria drenada."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que evitar buscar os mesmos dados da internet repetidamente?"
      opcoes:
        - { id: a, texto: "Porque gasta bateria, dados móveis e deixa o app mais lento sem necessidade" }
        - { id: b, texto: "Porque a API pode ficar com raiva" }
        - { id: c, texto: "Porque não é possível repetir requisições" }
        - { id: d, texto: "Não há problema em repetir" }
      resposta_correta: a
      explicacao: "Guardar localmente o que já foi buscado (cache) resolve os três problemas."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é a ordem correta de prioridades ao otimizar?"
      opcoes:
        - { id: a, texto: "Primeiro fazer funcionar e ficar legível; depois medir e otimizar o que realmente é lento" }
        - { id: b, texto: "Otimizar tudo desde a primeira linha" }
        - { id: c, texto: "Nunca otimizar" }
        - { id: d, texto: "Otimizar antes de escrever o código" }
      resposta_correta: a
      explicacao: "Otimizar no escuro deixa o código ilegível sem ganho real."
---

## No celular, cada recurso conta

Um computador tem energia da tomada e memória de sobra. Um celular tem bateria limitada, menos
memória e, muitas vezes, um processador bem mais simples que o do aparelho que você usa para
desenvolver.

Um app mal otimizado trava nos celulares mais simples e **drena a bateria** — e a primeira coisa
que o usuário faz ao ver o app no topo do consumo de bateria é desinstalar.

## A regra antes das regras

Antes de qualquer técnica, guarde a ordem certa de prioridades:

1. **Fazer funcionar.**
2. **Deixar legível** (a aula anterior).
3. **Medir** onde está lento de verdade.
4. **Otimizar** apenas isso.

Otimizar no escuro, sem medir, é como consertar um carro no chute: você deixa o código ilegível e
normalmente não ganha nada. O ponto lento raramente é onde a gente imagina.

## O caso clássico: concatenar String em laço

Este é o exemplo mais didático de código que **parece inocente** e não é:

```java
String s = "";
for (int i = 0; i < nomes.length; i++) {
  s = s + nomes[i] + " ";      // cria um novo objeto a cada volta!
}
```

Em Java, `String` é **imutável**: ela não pode ser alterada depois de criada. Então cada `s = s +
...` **não modifica** a String — cria uma **nova**, copia todo o conteúdo anterior e descarta a
antiga.

Com 5 nomes, ninguém percebe. Com 5.000, o app engasga visivelmente.

A solução é o **StringBuilder**, que acumula tudo em um só objeto:

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < nomes.length; i++) {
  sb.append(nomes[i]).append(" ");
}
String s = sb.toString();
```

Mesmo resultado, sem o desperdício.

## Listas: RecyclerView

Você já viu isso na prática: a `RecyclerView` **reaproveita** as views que saem da tela em vez de
criar uma para cada item. Uma lista de mil contatos cria só os componentes visíveis — mais alguns
de reserva.

É o mesmo princípio do StringBuilder: **não criar o que não precisa existir**.

## Bateria: onde ela realmente vai

Ao contrário do que parece, o processador raramente é o vilão. Os grandes consumidores são os
componentes que **conversam com o mundo**:

| Recurso | Impacto |
|---|---|
| **Rede** (internet) | alto — o rádio consome muito ao ligar |
| **GPS** | muito alto |
| **Sensores** contínuos | alto |
| **Tela** acesa | alto |
| Processamento comum | moderado |

As três práticas que mais economizam:

**1. Ligue e desligue.** Sensores e GPS devem ser ativados quando a tela precisa deles e
**desativados** quando ela sai de cena. Aquele `onPause` do ciclo de vida é o lugar certo para
desligar — e é por isso que entender o ciclo de vida importa tanto.

**2. Não busque a mesma coisa duas vezes.** Se o app já baixou a previsão do tempo há um minuto,
não precisa baixar de novo a cada toque. Guardar o resultado localmente (**cache**) economiza
bateria, dados móveis e ainda deixa o app mais rápido.

**3. Agrupe as requisições.** Ligar o rádio dez vezes seguidas gasta muito mais que ligar uma vez
e trazer tudo junto.

## O que o usuário sente

Vale conectar tudo isso com a experiência real:

- **App lento** → o usuário acha que travou e toca de novo, piorando.
- **App que gasta bateria** → ele aparece na lista de consumo e é desinstalado.
- **App que gasta dados** → o mesmo destino, com mais raiva.

Otimizar não é preciosismo técnico: é o que mantém o app instalado.

## Atividade

No terminal você vai **comparar as duas formas** de montar um texto.

**Passo 1.** Monte a lista de nomes da forma **ineficiente**, com `String + String` dentro do
laço, e imprima:

```
Lento: Ana Bruno Carla Diego Eva
```

**Passo 2.** Monte a mesma lista com **StringBuilder** e imprima:

```
Rapido: Ana Bruno Carla Diego Eva
```

**Passo 3.** Prove que as duas produzem exatamente o mesmo texto:

```
Iguais: true
```

Esse último passo é o ponto da aula: a versão otimizada **não muda o resultado**, só o caminho
para chegar nele. Com 5 nomes a diferença de tempo é invisível; a lição é o **hábito**, para
quando forem 5.000.

## Desafio extra

1. Aumente para 1.000 nomes (gere com um laço) e meça o tempo das duas versões com
   `System.currentTimeMillis()` antes e depois. Agora a diferença aparece.
2. Liste três coisas do **seu projeto** que poderiam consumir bateria à toa. Como você as
   desligaria no `onPause`?
3. Pense: no seu app, existe alguma informação que é buscada mais de uma vez sem necessidade?
