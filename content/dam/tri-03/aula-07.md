---
titulo: "Tratamento de exceções: evitando travamentos"
mes_numero: 3
numero_sequencial: 21
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    // Converte o texto digitado em numero, sem deixar o app travar.
    static int lerIdade(String texto) {
      // Passo 1: proteja esta conversao com try/catch.
      return Integer.parseInt(texto);
    }

    public static void main(String[] args) {
      // Passo 2: teste com uma entrada valida e com entradas problematicas.

    }
  }
criterios_validacao:
  - descricao: "Converter corretamente uma entrada válida"
    contem: "Idade: 17"
    dica: "Chame lerIdade(\"17\") e imprima \"Idade: \" + resultado."
  - descricao: "Não travar quando o usuário digita letras"
    contem: "Idade invalida: abc"
    dica: "No catch (NumberFormatException e), devolva um valor seguro e avise. Imprima \"Idade invalida: abc\"."
  - descricao: "Não travar quando o campo vem vazio"
    contem: "Idade invalida: (vazio)"
    dica: "Trate o texto vazio também — ele cai no mesmo catch."
  - descricao: "O programa deve chegar ao fim, provando que não travou"
    contem: "Programa terminou normalmente"
    dica: "Imprima essa frase na última linha do main. Se travasse, ela nunca apareceria."
quiz:
  titulo: "Quiz — Exceções"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é uma exceção em Java?"
      opcoes:
        - { id: a, texto: "Um erro que acontece durante a execução e interrompe o fluxo normal do programa" }
        - { id: b, texto: "Um erro de digitação no código" }
        - { id: c, texto: "Um tipo de variável" }
        - { id: d, texto: "Um comentário especial" }
      resposta_correta: a
      explicacao: "Diferente do erro de compilação, ela só aparece quando o programa está rodando."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Para que serve o bloco try/catch?"
      opcoes:
        - { id: a, texto: "Tentar executar um código e, se der erro, tratar a falha em vez de travar" }
        - { id: b, texto: "Repetir um trecho de código" }
        - { id: c, texto: "Criar variáveis" }
        - { id: d, texto: "Acelerar o programa" }
      resposta_correta: a
      explicacao: "O try contém o código arriscado; o catch decide o que fazer se falhar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que acontece com o app se uma exceção NÃO for tratada?"
      opcoes:
        - { id: a, texto: "Ele fecha sozinho, mostrando a mensagem de que o aplicativo parou" }
        - { id: b, texto: "Nada, ele continua normalmente" }
        - { id: c, texto: "Ele fica mais rápido" }
        - { id: d, texto: "O Android corrige automaticamente" }
      resposta_correta: a
      explicacao: "É a experiência mais frustrante possível para o usuário."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual exceção acontece ao tentar converter 'abc' em número?"
      opcoes:
        - { id: a, texto: "NumberFormatException" }
        - { id: b, texto: "NullPointerException" }
        - { id: c, texto: "ArrayIndexOutOfBoundsException" }
        - { id: d, texto: "Nenhuma, dá zero" }
      resposta_correta: a
      explicacao: "É a exceção clássica de Integer.parseInt com texto inválido."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que um catch VAZIO é considerado má prática?"
      opcoes:
        - { id: a, texto: "Porque esconde o problema: o erro some sem ninguém saber e o app continua em estado inconsistente" }
        - { id: b, texto: "Porque deixa o código maior" }
        - { id: c, texto: "Porque não compila" }
        - { id: d, texto: "Não é má prática" }
      resposta_correta: a
      explicacao: "Tratar não é silenciar: é decidir conscientemente o que fazer."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual é a melhor reação a uma entrada inválida do usuário?"
      opcoes:
        - { id: a, texto: "Avisar com uma mensagem clara e permitir corrigir, mantendo o app funcionando" }
        - { id: b, texto: "Fechar o aplicativo" }
        - { id: c, texto: "Ignorar em silêncio e continuar com valor errado" }
        - { id: d, texto: "Mostrar a stack trace completa na tela" }
      resposta_correta: a
      explicacao: "Mensagem técnica na tela do usuário não ajuda ninguém — ela vai para o Logcat."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Onde é mais importante usar tratamento de exceções em um app?"
      opcoes:
        - { id: a, texto: "Em tudo que vem de fora: entrada do usuário, internet, arquivos e banco de dados" }
        - { id: b, texto: "Apenas em cálculos matemáticos" }
        - { id: c, texto: "Apenas na tela inicial" }
        - { id: d, texto: "Em nenhum lugar" }
      resposta_correta: a
      explicacao: "São as partes que você não controla — e por isso podem falhar."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que é 'validar antes' e como se relaciona com exceções?"
      opcoes:
        - { id: a, texto: "Conferir a entrada antes de usá-la, evitando que a exceção chegue a acontecer" }
        - { id: b, texto: "Tratar a exceção duas vezes" }
        - { id: c, texto: "Ignorar a validação" }
        - { id: d, texto: "Usar catch vazio" }
      resposta_correta: a
      explicacao: "Validar e tratar são complementares: o ideal é fazer os dois."
---

## O app que fecha sozinho

Você já viu aquela mensagem: *"Infelizmente, o aplicativo parou"*. Do lado do usuário, é a pior
experiência possível — ele perde o que estava fazendo e normalmente não volta.

Do lado do código, quase sempre a causa é a mesma: uma **exceção não tratada**.

## O que é uma exceção

Uma **exceção** é um erro que acontece **durante a execução**, não na compilação. O código está
escrito corretamente, mas em algum momento a realidade não colabora:

- o usuário digitou letras onde se esperava número;
- o campo veio vazio;
- a internet caiu no meio de uma requisição;
- o arquivo que deveria existir não está lá.

Quando isso acontece e ninguém trata, o Android encerra o aplicativo.

## O bloco try/catch

O `try/catch` é a estrutura que permite **tentar** algo arriscado e **reagir** se falhar:

```java
try {
  int idade = Integer.parseInt(texto);
  // deu certo
} catch (NumberFormatException e) {
  // deu errado: decide o que fazer
}
```

- No **`try`** vai o código que pode falhar.
- No **`catch`** vai o que fazer quando falha.

O programa **não trava**: ele desvia para o `catch` e continua.

## As exceções que mais aparecem

| Exceção | Quando acontece |
|---|---|
| `NumberFormatException` | converter texto inválido em número |
| `NullPointerException` | usar algo que está nulo (View não encontrada) |
| `ArrayIndexOutOfBoundsException` | acessar posição inexistente de um array |
| `ArithmeticException` | dividir por zero (em inteiros) |

## O erro de quem aprendeu try/catch ontem

Assim que se descobre o `try/catch`, surge a tentação de fazer isso:

```java
try {
  // codigo
} catch (Exception e) {
  // vazio!
}
```

Isso é **pior** que não tratar. O erro simplesmente **desaparece**: ninguém é avisado, o programa
continua com dados inconsistentes, e quando o problema aparecer lá na frente não haverá nenhuma
pista de onde ele veio.

**Tratar não é silenciar.** Tratar é decidir conscientemente o que fazer:

1. **Avisar o usuário** com uma mensagem clara e útil;
2. **Registrar o erro** no Logcat, para você investigar depois;
3. **Manter o app em um estado válido** — com um valor padrão seguro, por exemplo.

## A mensagem certa para cada público

Um detalhe importante: a mensagem técnica e a mensagem do usuário são **diferentes**.

| Para | Mensagem |
|---|---|
| Usuário (na tela) | "Digite apenas números na idade" |
| Desenvolvedor (Logcat) | `NumberFormatException: For input string: "abc"` |

Jogar a stack trace na tela do usuário não ajuda ninguém e ainda passa impressão de app quebrado.

## Validar antes é melhor ainda

O `try/catch` é a rede de segurança. Mas melhor que capturar o erro é **evitar que ele aconteça**:

```java
if (texto.isEmpty()) {
  aviso.setText("Preencha a idade");
  return;
}
```

Validar e tratar são **complementares**. Valide o que você consegue prever; trate o que escapar.

## Onde isso mais importa

A regra prática: **proteja tudo que vem de fora do seu controle**.

- **Entrada do usuário** — ele vai digitar coisas inesperadas.
- **Internet** — a conexão cai, o servidor demora, a resposta vem incompleta.
- **Arquivos e banco de dados** — podem não existir ou estar corrompidos.

O código que você mesmo escreveu e controla raramente precisa de `try/catch`. O que atravessa a
fronteira do seu app, sempre.

## Atividade

O método `lerIdade` no terminal converte texto em número — e **trava** se o texto não for válido.

**Passo 1.** Proteja a conversão com `try/catch`, capturando `NumberFormatException`. No `catch`,
imprima um aviso e devolva um valor seguro (por exemplo `-1`).

**Passo 2.** No `main`, teste três entradas e imprima assim:

- `lerIdade("17")` → deve imprimir `Idade: 17`
- `lerIdade("abc")` → deve imprimir `Idade invalida: abc`
- `lerIdade("")` → deve imprimir `Idade invalida: (vazio)`

Dica: no `catch` você sabe qual texto falhou; use `texto.isEmpty() ? "(vazio)" : texto` para
montar a mensagem.

**Passo 3.** Na **última linha** do `main`, imprima:

```
Programa terminou normalmente
```

Essa linha é a prova do conceito: **se alguma exceção tivesse escapado, o programa teria travado
antes e essa frase nunca apareceria**. Ela aparecendo significa que as três entradas foram
tratadas.

## Desafio extra

1. Adicione a validação **antes** do `try`: se o texto for vazio, avise sem sequer tentar
   converter. Compare as duas abordagens.
2. Teste `lerIdade("17.5")`. Por que também falha? Qual seria o tipo certo para aceitar decimais?
3. Volte ao projeto da calculadora de IMC e proteja a leitura dos campos. O que acontece hoje se
   o usuário clicar em calcular com os campos vazios?
