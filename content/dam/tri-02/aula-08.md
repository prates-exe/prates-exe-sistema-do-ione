---
titulo: "Interface, navegação entre telas e listas"
mes_numero: 2
numero_sequencial: 8
duracao_minutos: 25
tipo_sandbox: android
publicado: true
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/tituloTela"
          android:text="Cadastro" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    public void cadastrar(View v) {
      // Leia o nome e o email digitados e escreva no resumo:
      // "Cadastrado: <nome> (<email>)"

    }
  }
criterios_validacao:
  - descricao: "Criar o campo de nome (id campoNome)"
    contem: "campoNome="
    dica: "No modo Design, arraste um EditText. Depois, no XML, ajuste o id para @+id/campoNome e o hint para \"Nome completo\"."
  - descricao: "Criar o campo de e-mail (id campoEmail)"
    contem: "campoEmail="
    dica: "Arraste outro EditText e ajuste o id para @+id/campoEmail, com hint \"E-mail\"."
  - descricao: "Criar o botão que chama o método cadastrar (id btnCadastrar)"
    contem: "btnCadastrar="
    dica: "Arraste um Button, ajuste o id para @+id/btnCadastrar, o texto para \"Cadastrar\" e o android:onClick para cadastrar."
  - descricao: "Criar o TextView de resumo (id resumo)"
    contem: "resumo="
    dica: "Arraste um TextView e ajuste o id para @+id/resumo, deixando o texto vazio."
  - descricao: "Ao clicar, o resumo deve mostrar o cadastro completo"
    contem: "resumo=Cadastrado:"
    dica: "No método cadastrar, use findViewById nos três e faça resumo.setText(\"Cadastrado: \" + nome + \" (\" + email + \")\");"
quiz:
  titulo: "Quiz — Interface, navegação e listas"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre UI e UX?"
      opcoes:
        - { id: a, texto: "UI é a interface em si (cores, botões, textos); UX é a experiência de usar o app" }
        - { id: b, texto: "São a mesma coisa, só siglas diferentes" }
        - { id: c, texto: "UI é só para Android; UX é só para iOS" }
        - { id: d, texto: "UX é o nome do banco de dados do app" }
      resposta_correta: a
      explicacao: "Uma UI bonita não garante boa UX: se a pessoa se perde ou se frustra, a experiência é ruim."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Cada tela de um aplicativo é representada por qual componente?"
      opcoes:
        - { id: a, texto: "Uma Activity" }
        - { id: b, texto: "Um Adapter" }
        - { id: c, texto: "Um JSON" }
        - { id: d, texto: "Um SGBD" }
      resposta_correta: a
      explicacao: "Cada tela é uma Activity. Menus e Fragmentos completam a navegação."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual recurso abre outra tela e leva dados de uma Activity para outra?"
      opcoes:
        - { id: a, texto: "Intent" }
        - { id: b, texto: "Adapter" }
        - { id: c, texto: "SQLite" }
        - { id: d, texto: "JSON" }
      resposta_correta: a
      explicacao: "A Intent é o mecanismo de navegação e de passagem de dados entre telas."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para exibir uma lista longa de dados de forma otimizada, o componente indicado é:"
      opcoes:
        - { id: a, texto: "RecyclerView" }
        - { id: b, texto: "TextView" }
        - { id: c, texto: "ImageView" }
        - { id: d, texto: "Intent" }
      resposta_correta: a
      explicacao: "A RecyclerView reaproveita os itens que saem da tela, em vez de criar um novo para cada linha."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é o papel do Adapter em uma lista?"
      opcoes:
        - { id: a, texto: "Ligar os dados às posições exibidas na lista, definindo o que cada item mostra" }
        - { id: b, texto: "Guardar os dados no banco local" }
        - { id: c, texto: "Fazer a conexão com a internet" }
        - { id: d, texto: "Controlar o ciclo de vida da Activity" }
      resposta_correta: a
      explicacao: "Sem o Adapter, a lista não sabe de onde vêm os dados nem como desenhá-los."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que a RecyclerView é melhor que a ListView para listas longas?"
      opcoes:
        - { id: a, texto: "Porque reaproveita as views que saem da tela, gastando menos memória" }
        - { id: b, texto: "Porque tem cores mais bonitas" }
        - { id: c, texto: "Porque não precisa de Adapter" }
        - { id: d, texto: "Porque funciona sem internet" }
      resposta_correta: a
      explicacao: "Uma lista de mil itens não cria mil componentes: só os visíveis existem de fato."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual destas é uma boa prática de interface em uma tela de cadastro?"
      opcoes:
        - { id: a, texto: "Usar rótulos ou hints claros indicando o que preencher em cada campo" }
        - { id: b, texto: "Deixar todos os campos sem identificação" }
        - { id: c, texto: "Usar cor de texto parecida com a do fundo" }
        - { id: d, texto: "Fazer botões pequenos, difíceis de acertar" }
      resposta_correta: a
      explicacao: "Contraste adequado, área de toque confortável e rótulos claros são o básico de boa UX."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que é hierarquia visual em uma tela?"
      opcoes:
        - { id: a, texto: "Organizar os elementos para que o mais importante seja percebido primeiro" }
        - { id: b, texto: "Colocar tudo exatamente do mesmo tamanho" }
        - { id: c, texto: "Usar apenas texto, sem botões" }
        - { id: d, texto: "Ordenar os arquivos em pastas" }
      resposta_correta: a
      explicacao: "Título maior, botão principal em destaque, informação secundária menor."
---

## A tela e a experiência

Uma interface bem construída não é questão de gosto. Existem dois conceitos que caminham juntos:

- **UI** (*User Interface*) — a interface propriamente dita: tudo o que aparece e com o que a
  pessoa interage. Cores, botões, textos, imagens e como estão organizados.
- **UX** (*User Experience*) — a **experiência** de usar: se a pessoa consegue fazer o que queria
  de forma simples, sem se perder e sem se frustrar.

Uma tela pode ser bonita (boa UI) e ainda assim confusa de usar (má UX). Boas práticas básicas:

- **contraste adequado** entre texto e fundo;
- **botões com área de toque confortável** — dedo não é mouse;
- **hierarquia visual clara** — o mais importante aparece primeiro, maior ou em destaque;
- **rótulos que indicam o que preencher** em cada campo;
- **mensagens de erro que a pessoa entende** ("E-mail inválido", não "Erro 422").

## Navegação: Activities e Intents

Quando o aplicativo tem mais de uma tela, **cada tela é uma Activity**.

Para sair de uma e abrir outra — e principalmente para **levar dados** de uma para a outra —
usamos a **Intent**:

```java
Intent intent = new Intent(this, DetalheActivity.class);
intent.putExtra("nome", "Maria");
startActivity(intent);
```

Lendo: *"crie a intenção de ir desta tela para a `DetalheActivity`, levando junto o dado `nome`, e
execute"*.

**Menus** e **Fragmentos** completam a navegação: menus organizam as opções disponíveis, e
fragmentos permitem reaproveitar pedaços de interface em telas diferentes.

## Listas e o papel do Adapter

Exibir muitos dados exige cuidado com desempenho. Imagine uma lista de mil contatos: criar mil
componentes de uma vez travaria o aparelho.

- A **`ListView`** resolve casos simples e curtos.
- A **`RecyclerView`** é a escolha certa para listas longas, porque **reaproveita** os itens que
  saem da tela em vez de criar um novo para cada linha. Só existem de fato os itens visíveis
  (mais alguns de reserva).

Em ambos os casos existe uma peça intermediária indispensável: o **Adapter**. Ele **liga os dados
às posições** que aparecem na lista, definindo o que cada item vai mostrar.

Pense assim: a lista é a prateleira, os dados são os produtos, e o Adapter é quem coloca cada
produto no lugar certo da prateleira.

## Atividade

Nesta aula você vai **montar uma tela de cadastro** usando o modo **Design** — arrastando os
componentes, como no Android Studio.

A tela começa apenas com o título; você monta o resto.

**Passo 1.** Clique em **Design** e arraste um `EditText` para a tela. Depois volte ao
`activity_main.xml` e ajuste os atributos:

```xml
android:id="@+id/campoNome"
android:hint="Nome completo"
```

**Passo 2.** Arraste **outro** `EditText` e ajuste para `@+id/campoEmail`, com
`android:hint="E-mail"`.

**Passo 3.** Arraste um `Button` e ajuste:

```xml
android:id="@+id/btnCadastrar"
android:text="Cadastrar"
android:onClick="cadastrar"
```

**Passo 4.** Arraste um `TextView` e ajuste para `@+id/resumo`, deixando `android:text=""`.

**Passo 5.** No `MainActivity.java`, escreva o método `cadastrar`: leia os dois campos e escreva
no resumo, neste formato:

```
Cadastrado: Maria Silva (maria@escola.com)
```

**Passo 6.** Volte ao modo **Testar**, preencha os dois campos e clique em Cadastrar.

Repare que você acabou de aplicar as boas práticas de UX que leu acima: cada campo tem uma dica
clara do que preencher, e o usuário recebe uma confirmação do que foi feito.

## Desafio extra

1. No modo Design, **reordene** os componentes arrastando: coloque o e-mail antes do nome e veja o
   XML mudar sozinho. Qual ordem faz mais sentido para quem preenche?
2. Adicione uma validação simples: se o nome estiver vazio, o resumo deve mostrar
   `"Preencha o nome"` em vez do cadastro. (Dica: `if (nome.isEmpty())`.)
3. Responda como comentário no código: se esta tela levasse os dados para uma **segunda** tela,
   qual recurso do Android você usaria? E se o app precisasse mostrar **todos** os cadastros já
   feitos, em uma lista, qual componente seria o indicado?
