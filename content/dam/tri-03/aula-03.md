---
titulo: "Acessibilidade: um app para todo mundo"
mes_numero: 3
numero_sequencial: 17
duracao_minutos: 25
tipo_sandbox: android
publicado: false
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/aviso"
          android:text="" />

      <EditText
          android:id="@+id/campoEmail"
          android:layout_width="match_parent"
          android:text="" />

      <Button
          android:id="@+id/btnEnviar"
          android:onClick="enviar"
          android:text="Enviar" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    public void enviar(View v) {
      EditText campo = findViewById(R.id.campoEmail);
      TextView aviso = findViewById(R.id.aviso);
      String email = campo.getText().toString();

      // Valide: se estiver vazio, avise de forma clara e util.

    }
  }
criterios_validacao:
  - descricao: "Dar uma dica clara ao campo de e-mail"
    contem: "campoEmail="
    dica: "Adicione android:hint=\"Seu e-mail\" ao EditText — sem rótulo, quem usa leitor de tela não sabe o que preencher."
  - descricao: "Mostrar uma mensagem de erro útil quando o campo está vazio"
    contem: "aviso=Digite seu e-mail para continuar"
    dica: "if (email.isEmpty()) { aviso.setText(\"Digite seu e-mail para continuar\"); }"
  - descricao: "Confirmar o envio quando o campo está preenchido"
    contem: "aviso=E-mail enviado"
    dica: "No else, use aviso.setText(\"E-mail enviado com sucesso\");"
quiz:
  titulo: "Quiz — Acessibilidade"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é acessibilidade em aplicativos?"
      opcoes:
        - { id: a, texto: "Deixar o app disponível na loja" }
        - { id: b, texto: "Fazer o app abrir rápido" }
        - { id: c, texto: "Garantir que pessoas com diferentes capacidades consigam usar o app" }
        - { id: d, texto: "Permitir usar sem internet" }
      resposta_correta: c
      explicacao: "Inclui quem enxerga pouco, quem não enxerga, quem tem dificuldade motora e muito mais."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que o contraste entre texto e fundo é importante?"
      opcoes:
        - { id: a, texto: "Contraste deixa o app mais rápido" }
        - { id: b, texto: "Contraste só afeta a estética" }
        - { id: c, texto: "Não tem importância" }
        - { id: d, texto: "Texto de cor parecida com o fundo fica ilegível, principalmente para quem enxerga pouco ou está no sol" }
      resposta_correta: d
      explicacao: "É um dos problemas de acessibilidade mais comuns e mais fáceis de corrigir."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que é um leitor de tela?"
      opcoes:
        - { id: a, texto: "Uma ferramenta de depuração" }
        - { id: b, texto: "Um aplicativo de leitura de livros" }
        - { id: c, texto: "Um recurso que lê em voz alta o conteúdo da tela para quem não pode vê-la" }
        - { id: d, texto: "Um tipo de sensor" }
      resposta_correta: c
      explicacao: "No Android ele se chama TalkBack, e depende das descrições que o desenvolvedor fornece."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para que serve o atributo android:contentDescription?"
      opcoes:
        - { id: a, texto: "Aumentar a fonte" }
        - { id: b, texto: "Definir a cor do elemento" }
        - { id: c, texto: "Descrever, para o leitor de tela, o que um elemento sem texto representa" }
        - { id: d, texto: "Mudar o texto visível do botão" }
      resposta_correta: c
      explicacao: "É essencial em ícones e imagens: sem ele, o leitor anuncia apenas 'botão'."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que o app não deve fixar o tamanho da fonte em valores muito pequenos?"
      opcoes:
        - { id: a, texto: "Não há problema" }
        - { id: b, texto: "Porque consome mais bateria" }
        - { id: c, texto: "Porque fonte pequena não existe no Android" }
        - { id: d, texto: "Porque muitas pessoas aumentam a fonte do sistema e o texto precisa acompanhar" }
      resposta_correta: d
      explicacao: "Ignorar a preferência do usuário torna o app inutilizável para muita gente."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual mensagem de erro é mais acessível?"
      opcoes:
        - { id: a, texto: "\"Falha\"" }
        - { id: b, texto: "Nenhuma mensagem, apenas a borda do campo em vermelho" }
        - { id: c, texto: "\"Digite seu e-mail para continuar\"" }
        - { id: d, texto: "\"Erro 422\"" }
      resposta_correta: c
      explicacao: "Ela diz o que houve E o que fazer. Cor sozinha não serve para quem não distingue cores."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que sinalizar um erro APENAS com a cor vermelha é problemático?"
      opcoes:
        - { id: a, texto: "Não é problemático" }
        - { id: b, texto: "Porque o Android não permite vermelho" }
        - { id: c, texto: "Porque quem não distingue cores não percebe o erro; é preciso texto junto" }
        - { id: d, texto: "Porque vermelho é uma cor feia" }
      resposta_correta: c
      explicacao: "A regra é: nunca use cor como o único meio de transmitir uma informação."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que botões devem ter área de toque confortável?"
      opcoes:
        - { id: a, texto: "Por exigência do compilador" }
        - { id: b, texto: "Porque o dedo é impreciso, e alvos pequenos são difíceis para todos, especialmente com limitação motora" }
        - { id: c, texto: "Não é relevante" }
        - { id: d, texto: "Para o app ficar bonito" }
      resposta_correta: b
      explicacao: "A recomendação do Material Design é de pelo menos 48dp de área tocável."
---

## Quem não consegue usar o seu app?

Essa é a pergunta que abre esta aula. Nem todo mundo enxerga bem. Nem todo mundo distingue cores.
Nem todo mundo tem firmeza no toque. E todo mundo, em algum momento, tenta usar o celular no sol
forte, com uma mão só, ou com a tela suja.

**Acessibilidade** é garantir que essas pessoas também consigam usar o que você construiu. E o
mais importante: quase tudo que melhora a acessibilidade **melhora a experiência de todos**.

## Contraste

O erro mais comum e mais fácil de corrigir: texto cinza-claro sobre fundo branco. Fica bonito na
tela do desenvolvedor, em ambiente fechado — e some quando alguém tenta ler no ônibus, no sol.

Para quem tem baixa visão, some sempre.

A regra: **texto precisa de contraste forte com o fundo**. Cinza-escuro ou preto sobre branco;
branco sobre cores escuras. Na dúvida, escolha o mais contrastante.

## Tamanho de fonte

Muitas pessoas **aumentam a fonte** nas configurações do celular — é uma necessidade real, não
uma preferência estética. Um app que fixa fontes minúsculas ignora essa escolha e fica
inutilizável para essas pessoas.

Prefira tamanhos generosos e evite espremer texto para "caber mais coisa". Se não cabe, o problema
é a quantidade de conteúdo, não o tamanho da letra.

## Descrição dos elementos

O Android tem um leitor de tela chamado **TalkBack**, que lê em voz alta o conteúdo para quem não
pode vê-lo. Ele funciona lendo os textos — mas e um botão que só tem um ícone de lixeira?

Sem ajuda, o TalkBack anuncia apenas **"botão"**. A pessoa não faz ideia do que ele faz.

A solução é o `android:contentDescription`:

```xml
<Button
    android:id="@+id/btnExcluir"
    android:contentDescription="Excluir cadastro" />
```

Agora o leitor anuncia "Excluir cadastro, botão". Todo elemento **sem texto visível** precisa
disso.

O mesmo vale para campos: um `EditText` sem `hint` nem rótulo é anunciado apenas como "campo de
edição". Com `android:hint="Seu e-mail"`, a pessoa sabe o que preencher.

## Mensagens de erro que ajudam

Compare estas três formas de avisar que o e-mail está vazio:

| Mensagem | Problema |
|---|---|
| borda do campo em vermelho | quem não distingue cores não percebe nada |
| "Erro" | não diz o que houve nem o que fazer |
| **"Digite seu e-mail para continuar"** | diz o problema **e** a solução |

Uma boa mensagem de erro responde duas perguntas: **o que aconteceu** e **o que eu faço agora**.

E fica a regra geral: **nunca use cor como o único meio de transmitir uma informação**. Cor pode
reforçar, nunca carregar sozinha.

## Área de toque

O dedo é impreciso — bem mais que um cursor de mouse. Botões pequenos demais geram toques
errados, o que irrita todo mundo e impede quem tem limitação motora de usar o app.

A recomendação do Material Design é de pelo menos **48dp** de área tocável, mesmo que o ícone
desenhado seja menor.

## Atividade

A tela do terminal tem um campo de e-mail **sem nenhuma indicação** e nenhuma validação.

**Passo 1.** No XML, adicione `android:hint="Seu e-mail"` ao campo. Sem isso, nem quem enxerga
nem o leitor de tela sabem o que preencher.

**Passo 2.** No `MainActivity.java`, valide a entrada dentro do método `enviar`:

- Se o campo estiver **vazio**, mostre no aviso: `Digite seu e-mail para continuar`
- Caso contrário, mostre: `E-mail enviado com sucesso`

Use `if (email.isEmpty()) { ... } else { ... }`.

**Passo 3.** Teste os dois caminhos no modo **Testar**: clique com o campo vazio e depois com algo
digitado. Repare que a mensagem de erro **diz o que fazer** — não apenas que deu errado.

## Desafio extra

1. Adicione `android:contentDescription` ao botão, descrevendo a ação para o leitor de tela.
2. Melhore ainda mais a validação: se o texto não tiver `@`, avise
   `"O e-mail precisa ter @"`. (Dica: `email.contains("@")`.)
3. Pegue um app que você usa e teste: aumente a fonte do sistema ao máximo. O que quebra? O que
   continua funcionando bem?
