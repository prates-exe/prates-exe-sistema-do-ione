---
titulo: "Ciclo de vida do app e dados salvos no aparelho"
mes_numero: 2
numero_sequencial: 9
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    // Simulacao do ciclo de vida de uma Activity.
    // Cada metodo representa um momento real do Android.

    static void onCreate() {
      // Passo 1: escreva a mensagem de onCreate
    }

    static void onResume() {
      // Passo 2
    }

    static void onPause() {
      // Passo 3
    }

    static void onStop() {
      // Passo 4
    }

    public static void main(String[] args) {
      // Passo 5: chame os metodos na ordem correta,
      // simulando: app abre -> usuario sai -> app fecha
    }
  }
criterios_validacao:
  - descricao: "onCreate anuncia que a tela nasceu e o layout foi carregado"
    contem: "onCreate: tela criada"
    dica: "Dentro de onCreate, escreva System.out.println(\"onCreate: tela criada\");"
  - descricao: "onResume anuncia que a tela está visível e pronta"
    contem: "onResume: tela visivel"
    dica: "Dentro de onResume, escreva System.out.println(\"onResume: tela visivel\");"
  - descricao: "onPause anuncia que a tela saiu do primeiro plano"
    contem: "onPause: saiu da frente"
    dica: "Dentro de onPause, escreva System.out.println(\"onPause: saiu da frente\");"
  - descricao: "onStop anuncia que a tela não é mais vista"
    contem: "onStop: nao aparece mais"
    dica: "Dentro de onStop, escreva System.out.println(\"onStop: nao aparece mais\");"
quiz:
  titulo: "Quiz — Ciclo de vida e SQLite"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual método é executado uma única vez, no nascimento da Activity, e carrega o layout?"
      opcoes:
        - { id: a, texto: "onStop" }
        - { id: b, texto: "onCreate" }
        - { id: c, texto: "onPause" }
        - { id: d, texto: "onResume" }
      resposta_correta: b
      explicacao: "É no onCreate que chamamos setContentView para carregar a tela."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual método é chamado quando o app volta a ficar visível e em primeiro plano?"
      opcoes:
        - { id: a, texto: "onResume" }
        - { id: b, texto: "onStop" }
        - { id: c, texto: "onCreate" }
        - { id: d, texto: "onPause" }
      resposta_correta: a
      explicacao: "onResume roda sempre que o app volta ao primeiro plano, inclusive depois de pausado."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre onPause e onStop?"
      opcoes:
        - { id: a, texto: "onPause é quando a tela sai do primeiro plano mas ainda pode estar parcialmente visível; onStop é quando ela deixa de ser vista por completo" }
        - { id: b, texto: "onStop acontece antes de onCreate" }
        - { id: c, texto: "Não existe diferença" }
        - { id: d, texto: "onPause só existe em apps com banco de dados" }
      resposta_correta: a
      explicacao: "Entender essa sequência evita perder informações quando o usuário troca de app e volta."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual é a ordem correta quando o usuário abre o app e depois sai dele?"
      opcoes:
        - { id: a, texto: "onStop → onPause → onResume → onCreate" }
        - { id: b, texto: "onCreate → onResume → onPause → onStop" }
        - { id: c, texto: "onCreate → onStop → onPause → onResume" }
        - { id: d, texto: "onResume → onCreate → onStop → onPause" }
      resposta_correta: b
      explicacao: "Nasce, aparece, sai da frente, some. Essa ordem cai em prova."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Em qual método é mais indicado SALVAR os dados que o usuário digitou?"
      opcoes:
        - { id: a, texto: "Nunca é preciso salvar" }
        - { id: b, texto: "onCreate, antes de tudo" }
        - { id: c, texto: "onPause, porque é o primeiro aviso de que a tela vai sair da frente" }
        - { id: d, texto: "onResume" }
      resposta_correta: c
      explicacao: "O onPause é garantido; se esperar o onStop, o sistema pode encerrar o app antes."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O SQLite, no Android, serve para:"
      opcoes:
        - { id: a, texto: "Armazenar dados localmente no próprio aparelho, sem depender de internet" }
        - { id: b, texto: "Controlar o ciclo de vida da Activity" }
        - { id: c, texto: "Substituir o XML de layout" }
        - { id: d, texto: "Só funciona com conexão à internet" }
      resposta_correta: a
      explicacao: "É um banco de dados local, embutido no aparelho."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual operação do CRUD altera um registro que já existe?"
      opcoes:
        - { id: a, texto: "INSERT" }
        - { id: b, texto: "SELECT" }
        - { id: c, texto: "UPDATE" }
        - { id: d, texto: "DELETE" }
      resposta_correta: c
      explicacao: "INSERT cadastra, UPDATE altera, DELETE remove, SELECT consulta — o mesmo CRUD de Banco de Dados."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Na prática, o que costuma alimentar a lista (RecyclerView) que aparece na tela?"
      opcoes:
        - { id: a, texto: "O arquivo de layout XML" }
        - { id: b, texto: "O método onPause" }
        - { id: c, texto: "Um SELECT no banco local, trazendo os registros salvos" }
        - { id: d, texto: "O AndroidManifest" }
      resposta_correta: c
      explicacao: "Consulta o banco, entrega os dados ao Adapter, e o Adapter desenha a lista."
---

## O app não está sempre na sua mão

No computador, um programa roda até você fechar. No celular é diferente: a qualquer momento chega
uma ligação, o usuário troca de aplicativo, a tela bloqueia. O Android precisa lidar com tudo isso
sem perder os dados de ninguém.

Para isso, o sistema **avisa** o seu aplicativo sobre cada mudança, chamando automaticamente
alguns métodos. Esse conjunto de avisos é o **ciclo de vida da Activity**.

## Os quatro métodos essenciais

| Método | Quando é chamado | Para que serve |
|---|---|---|
| `onCreate` | uma única vez, quando a tela nasce | carregar o layout (`setContentView`) e preparar tudo |
| `onResume` | quando a tela fica visível e em primeiro plano | retomar o que estava parado |
| `onPause` | quando a tela sai do primeiro plano | **salvar** o que precisa ser guardado |
| `onStop` | quando a tela deixa completamente de ser vista | liberar recursos mais pesados |

A ordem quando o usuário abre o app e depois sai:

```
onCreate  ->  onResume  ->  onPause  ->  onStop
  nasce       aparece      sai da frente   some
```

## A diferença entre onPause e onStop

Essa distinção cai em prova e confunde muita gente:

- **`onPause`** — a tela **saiu do primeiro plano**, mas **ainda pode estar parcialmente
  visível**. Exemplo: uma janela de diálogo abriu por cima, ou o app entrou em tela dividida.
- **`onStop`** — a tela **deixou completamente de ser vista**. O usuário foi para outro app ou
  para a tela inicial.

## Onde salvar os dados

Regra prática: **salve no `onPause`**.

O motivo é que o `onPause` é o **primeiro aviso** de que a tela vai sair da frente, e é o método
com maior garantia de ser executado. Se você esperar o `onStop`, corre o risco de o sistema
encerrar o app antes (o Android pode matar aplicativos em segundo plano para liberar memória).

É exatamente isso que evita aquele problema irritante de digitar um formulário inteiro, atender
uma ligação, voltar e encontrar tudo em branco.

## Guardando dados no próprio aparelho

O **SQLite** permite que o aplicativo armazene dados **localmente**, dentro do próprio aparelho,
**sem depender de internet**. É um banco de dados completo, embutido no Android.

Sobre esse banco aplicamos as quatro operações do **CRUD** — as mesmas que você já conhece de
Banco de Dados:

| Operação | O que faz | Comando SQL |
|---|---|---|
| **C**reate | cadastra um registro novo | `INSERT` |
| **R**ead | consulta e lista o que está salvo | `SELECT` |
| **U**pdate | altera um registro existente | `UPDATE` |
| **D**elete | remove um registro | `DELETE` |

Na prática, o fluxo típico de um app é este:

1. O usuário preenche um formulário e toca em salvar → **INSERT** no banco.
2. A tela de listagem faz um **SELECT** para buscar tudo que está salvo.
3. Os dados vão para o **Adapter**.
4. O Adapter desenha a **RecyclerView** na tela.

Repare como tudo se conecta com as aulas anteriores: o CRUD de Banco de Dados, a lista da Aula 8 e
o ciclo de vida desta aula são peças do mesmo quebra-cabeça.

## Atividade

Vamos **simular** o ciclo de vida em Java puro, para deixar a ordem gravada.

No terminal abaixo há quatro métodos vazios, representando os quatro momentos da Activity.

**Passos 1 a 4.** Complete cada método com um `System.out.println` exatamente assim:

| Método | Mensagem |
|---|---|
| `onCreate` | `onCreate: tela criada` |
| `onResume` | `onResume: tela visivel` |
| `onPause` | `onPause: saiu da frente` |
| `onStop` | `onStop: nao aparece mais` |

**Passo 5.** No `main`, chame os quatro métodos **na ordem correta**, simulando o usuário abrindo
o app e depois saindo dele. A saída deve ficar exatamente assim:

```
onCreate: tela criada
onResume: tela visivel
onPause: saiu da frente
onStop: nao aparece mais
```

Escrever a sequência com as próprias mãos fixa a ordem muito melhor do que só ler a tabela.

## Desafio extra

1. Simule o usuário **voltando** para o app: depois do `onPause`, chame `onResume` de novo (sem
   passar pelo `onCreate`). Por que o `onCreate` **não** é chamado outra vez?
2. Adicione um método `salvarDados()` e chame-o de dentro do `onPause`, mostrando
   `"Dados salvos!"`. É exatamente esse o padrão usado em apps reais.
3. Pense e escreva como comentário: se o usuário girar o celular, a tela é destruída e recriada.
   Quais métodos seriam chamados nessa situação?
