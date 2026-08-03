---
titulo: "Testes de software no desenvolvimento mobile"
mes_numero: 3
numero_sequencial: 19
duracao_minutos: 25
tipo_sandbox: code
publicado: false
exercicio_inicial: |
  class Main {
    // Metodo que queremos testar
    static String classificarIdade(int idade) {
      if (idade < 0) return "Invalida";
      else if (idade < 12) return "Crianca";
      else if (idade < 18) return "Adolescente";
      else return "Adulto";
    }

    // Ajuda a comparar o esperado com o obtido
    static void verificar(String caso, String esperado, String obtido) {
      String status = esperado.equals(obtido) ? "PASSOU" : "FALHOU";
      System.out.println(status + " | " + caso + " | esperado=" + esperado + " obtido=" + obtido);
    }

    public static void main(String[] args) {
      // Escreva os casos de teste pedidos na atividade.

    }
  }
criterios_validacao:
  - descricao: "Testar o caso normal de uma criança (idade 8)"
    contem: "PASSOU | crianca"
    dica: "verificar(\"crianca\", \"Crianca\", classificarIdade(8));"
  - descricao: "Testar o caso normal de um adulto (idade 30)"
    contem: "PASSOU | adulto"
    dica: "verificar(\"adulto\", \"Adulto\", classificarIdade(30));"
  - descricao: "Testar o valor de fronteira 12 (limite entre criança e adolescente)"
    contem: "PASSOU | fronteira 12"
    dica: "Com idade 12 o resultado esperado é \"Adolescente\" — teste o limite exato."
  - descricao: "Testar o valor de fronteira 18"
    contem: "PASSOU | fronteira 18"
    dica: "Com idade 18 o esperado é \"Adulto\"."
  - descricao: "Testar uma entrada inválida (idade negativa)"
    contem: "PASSOU | invalida"
    dica: "verificar(\"invalida\", \"Invalida\", classificarIdade(-5));"
quiz:
  titulo: "Quiz — Testes de software"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que testar um aplicativo antes de entregá-lo?"
      opcoes:
        - { id: a, texto: "Para encontrar falhas antes que o usuário encontre" }
        - { id: b, texto: "Porque é exigência do compilador" }
        - { id: c, texto: "Não é necessário testar" }
        - { id: d, texto: "Para deixar o app maior" }
      resposta_correta: a
      explicacao: "Corrigir um erro durante o desenvolvimento é muito mais barato do que depois de publicado."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que é um caso de teste?"
      opcoes:
        - { id: a, texto: "Um tipo de variável" }
        - { id: b, texto: "Uma entrada específica com o resultado que se espera obter" }
        - { id: c, texto: "Uma tela do aplicativo" }
        - { id: d, texto: "Um erro encontrado no app" }
      resposta_correta: b
      explicacao: "Sem o resultado esperado definido antes, não dá para dizer se o teste passou."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que são valores de fronteira e por que testá-los?"
      opcoes:
        - { id: a, texto: "Os maiores valores possíveis" }
        - { id: b, texto: "Valores aleatórios" }
        - { id: c, texto: "Valores no limite exato de uma condição, onde a maioria dos erros se esconde" }
        - { id: d, texto: "Valores que não importam" }
      resposta_correta: c
      explicacao: "Trocar < por <= é um erro comum, e só aparece testando exatamente o limite."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Testar apenas o 'caminho feliz' é suficiente?"
      opcoes:
        - { id: a, texto: "Sim, entradas inválidas não acontecem" }
        - { id: b, texto: "Sim, se funcionar uma vez está pronto" }
        - { id: c, texto: "Depende do tamanho do app" }
        - { id: d, texto: "Não — é preciso testar também entradas inválidas e casos extremos" }
      resposta_correta: d
      explicacao: "O usuário real vai digitar coisas que você não imaginou."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre testar no emulador e em um aparelho real?"
      opcoes:
        - { id: a, texto: "Não há diferença" }
        - { id: b, texto: "O aparelho real revela desempenho, toque e condições que o emulador não reproduz bem" }
        - { id: c, texto: "O emulador é sempre mais confiável" }
        - { id: d, texto: "Aparelho real não pode ser usado para testes" }
      resposta_correta: b
      explicacao: "Coisas como lentidão, tamanho do dedo e falta de sinal só aparecem de verdade no aparelho."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é teste de regressão?"
      opcoes:
        - { id: a, texto: "Apagar os testes antigos" }
        - { id: b, texto: "Testar apenas funções novas" }
        - { id: c, texto: "Testar de novo o que já funcionava, para garantir que uma mudança não quebrou nada" }
        - { id: d, texto: "Voltar o app para a versão anterior" }
      resposta_correta: c
      explicacao: "É muito comum uma correção em um lugar quebrar outro."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que registrar os resultados dos testes?"
      opcoes:
        - { id: a, texto: "Para saber o que já foi verificado e acompanhar a correção das falhas encontradas" }
        - { id: b, texto: "Porque o Android exige" }
        - { id: c, texto: "Só para preencher papel" }
        - { id: d, texto: "Não é preciso registrar" }
      resposta_correta: a
      explicacao: "Sem registro, você testa as mesmas coisas duas vezes e esquece as outras."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que pedir que outra pessoa teste o seu app?"
      opcoes:
        - { id: a, texto: "Porque quem fez conhece o caminho certo e inconscientemente evita os erros" }
        - { id: b, texto: "Não faz diferença" }
        - { id: c, texto: "Para dividir o trabalho" }
        - { id: d, texto: "Porque o desenvolvedor não pode testar" }
      resposta_correta: a
      explicacao: "É por isso que o planejamento prevê testes cruzados entre colegas."
---

## Funcionou uma vez não quer dizer que funciona

Todo mundo testa o próprio app do mesmo jeito: abre, digita um valor que sabe que dá certo, vê o
resultado esperado e conclui que está pronto.

O problema é que **o usuário não faz isso**. Ele digita letra onde era número, deixa campo vazio,
toca duas vezes no botão, gira o celular no meio do cadastro. E aí o app quebra.

**Testar** é procurar esses problemas de propósito, antes que outra pessoa os encontre.

## O que é um caso de teste

Um caso de teste tem três partes:

1. **A entrada** — o que vai ser fornecido.
2. **O resultado esperado** — definido **antes** de rodar.
3. **O resultado obtido** — o que realmente aconteceu.

Se esperado e obtido forem iguais, o teste **passou**. Se não, você encontrou um problema.

Definir o esperado **antes** é essencial. Se você rodar primeiro e só depois decidir o que
esperava, vai acabar aceitando o resultado errado como certo.

## As três categorias que você precisa cobrir

**1. Caminho feliz.** A entrada normal, esperada. Idade 8 deve dar "Criança".

**2. Valores de fronteira.** Os limites exatos das condições — e é **aqui que mora a maioria dos
erros**. Se a regra é "menor de 12 é criança", o que acontece com **exatamente 12**?

Esse é o famoso erro de trocar `<` por `<=`. Ele nunca aparece testando 8 ou 30; só aparece
testando 12.

**3. Entradas inválidas.** Idade negativa, campo vazio, texto onde se espera número. O usuário
real vai fazer isso, seja por engano ou por curiosidade.

## Testando na prática

Não é preciso ferramenta nenhuma para começar. Um método simples que compara esperado com obtido
já organiza tudo:

```java
static void verificar(String caso, String esperado, String obtido) {
  String status = esperado.equals(obtido) ? "PASSOU" : "FALHOU";
  System.out.println(status + " | " + caso + " | esperado=" + esperado + " obtido=" + obtido);
}
```

E os casos ficam assim:

```java
verificar("crianca", "Crianca", classificarIdade(8));
verificar("fronteira 12", "Adolescente", classificarIdade(12));
```

Em poucos segundos você vê **todos** os casos de uma vez, e sabe exatamente qual falhou.

## Emulador ou aparelho real

Os dois são necessários, e revelam coisas diferentes:

| Emulador | Aparelho real |
|---|---|
| rápido para testar várias telas | mostra o desempenho verdadeiro |
| permite simular vários tamanhos | revela se o botão é confortável para o dedo |
| sempre com internet perfeita | mostra o comportamento com sinal ruim |

O emulador é ótimo durante o desenvolvimento. Mas **antes de entregar**, teste em um aparelho de
verdade — de preferência um mais simples, não o melhor celular da turma.

## Teste de regressão

Você corrige um erro na tela de cadastro. Ótimo. Mas será que a correção quebrou a tela de
listagem?

**Teste de regressão** é justamente rodar de novo o que **já funcionava**, para garantir que a
mudança não estragou nada. É por isso que vale a pena escrever os casos de teste: você roda todos
de novo em segundos.

## Por que outra pessoa deve testar

Quem construiu o app **conhece o caminho certo** e, sem perceber, evita os erros. Você toca nos
lugares certos, na ordem certa, com os dados certos.

Outra pessoa não sabe nada disso — e por isso encontra em cinco minutos problemas que você não viu
em semanas. É exatamente por isso que o planejamento do trimestre prevê **testes cruzados** entre
colegas.

## Atividade

No terminal há um método `classificarIdade` e um método `verificar` prontos. Sua tarefa é
**escrever os casos de teste** dentro do `main`.

**Passo 1.** Teste o caminho feliz de uma criança:

```java
verificar("crianca", "Crianca", classificarIdade(8));
```

**Passo 2.** Teste o caminho feliz de um adulto (idade 30, esperado `Adulto`).

**Passo 3.** Teste a **fronteira 12** — chame o caso de `"fronteira 12"`. Pense antes: com 12
anos, o esperado é `Crianca` ou `Adolescente`? Confira a condição do método.

**Passo 4.** Teste a **fronteira 18**, com o caso `"fronteira 18"`.

**Passo 5.** Teste uma entrada inválida: idade `-5`, caso `"invalida"`, esperado `Invalida`.

Todos devem imprimir **PASSOU**. Se algum imprimir FALHOU, leia com atenção: ou o seu esperado
está errado, ou você encontrou um erro de verdade no método.

## Desafio extra

1. Adicione um caso para a fronteira **0** (recém-nascido). O método trata isso corretamente?
2. Mude de propósito o `< 12` do método para `<= 12` e rode os testes de novo. Qual caso acusa a
   mudança? Era exatamente esse o objetivo de testar fronteiras.
3. Escreva casos de teste para o método `calcularImc` do projeto do trimestre passado, incluindo
   altura zero.
