---
titulo: "Responsividade e orientação de tela"
mes_numero: 3
numero_sequencial: 16
duracao_minutos: 25
tipo_sandbox: android
publicado: false
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="horizontal"
      android:layout_width="match_parent">

      <EditText
          android:id="@+id/campoBusca"
          android:layout_width="wrap_content"
          android:hint="Buscar" />

      <Button
          android:id="@+id/btnBuscar"
          android:layout_width="wrap_content"
          android:onClick="buscar"
          android:text="Buscar" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    public void buscar(View v) {
      EditText campo = findViewById(R.id.campoBusca);
      TextView resultado = findViewById(R.id.resultado);
      resultado.setText("Buscando por: " + campo.getText().toString());
    }
  }
criterios_validacao:
  - descricao: "Empilhar os componentes trocando a orientação para vertical"
    contem: "campoBusca="
    dica: "No LinearLayout, troque android:orientation=\"horizontal\" por \"vertical\"."
  - descricao: "Fazer o campo de busca ocupar toda a largura disponível"
    contem: "btnBuscar=Buscar"
    dica: "No EditText, troque android:layout_width=\"wrap_content\" por \"match_parent\"."
  - descricao: "Adicionar um TextView de resultado (id resultado)"
    contem: "resultado="
    dica: "Arraste um TextView no modo Design e ajuste o id para @+id/resultado."
  - descricao: "A busca deve funcionar e mostrar o termo procurado"
    contem: "resultado=Buscando por:"
    dica: "Clique no botão Buscar no modo Testar, com algo digitado no campo."
quiz:
  titulo: "Quiz — Responsividade"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que significa um layout ser responsivo?"
      opcoes:
        - { id: a, texto: "Adaptar-se bem a diferentes tamanhos e orientações de tela" }
        - { id: b, texto: "Funcionar sem internet" }
        - { id: c, texto: "Responder rápido aos toques" }
        - { id: d, texto: "Ter muitas cores" }
      resposta_correta: a
      explicacao: "Celulares variam muito de tamanho — o layout precisa dar conta de todos."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre match_parent e wrap_content?"
      opcoes:
        - { id: a, texto: "wrap_content ocupa a tela inteira" }
        - { id: b, texto: "São a mesma coisa" }
        - { id: c, texto: "match_parent ocupa todo o espaço disponível; wrap_content ocupa apenas o necessário para o conteúdo" }
        - { id: d, texto: "match_parent é só para textos" }
      resposta_correta: c
      explicacao: "É a decisão mais básica de layout no Android."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que definir larguras fixas em pixels é uma má prática?"
      opcoes:
        - { id: a, texto: "Porque deixa o app lento" }
        - { id: b, texto: "Porque o que cabe em uma tela grande estoura ou sobra em uma pequena" }
        - { id: c, texto: "Porque pixels não existem no Android" }
        - { id: d, texto: "Não é má prática" }
      resposta_correta: b
      explicacao: "Larguras fixas quebram assim que o aparelho muda."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece com um layout horizontal em uma tela estreita?"
      opcoes:
        - { id: a, texto: "O app fecha" }
        - { id: b, texto: "Os elementos podem ficar espremidos ou sair da área visível" }
        - { id: c, texto: "Ele vira vertical automaticamente" }
        - { id: d, texto: "Nada muda" }
      resposta_correta: b
      explicacao: "Por isso formulários costumam ser empilhados na vertical."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que acontece com a Activity quando o usuário gira o celular?"
      opcoes:
        - { id: a, texto: "Por padrão ela é destruída e recriada, passando de novo pelo onCreate" }
        - { id: b, texto: "A tela congela" }
        - { id: c, texto: "Nada acontece" }
        - { id: d, texto: "O app é encerrado" }
      resposta_correta: a
      explicacao: "É por isso que dados não salvos podem se perder ao girar a tela."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Como evitar perder o que o usuário digitou ao girar a tela?"
      opcoes:
        - { id: a, texto: "Impedindo o usuário de girar" }
        - { id: b, texto: "Não é possível evitar" }
        - { id: c, texto: "Removendo os campos de texto" }
        - { id: d, texto: "Salvando os dados antes da destruição, por exemplo no onPause" }
      resposta_correta: d
      explicacao: "É a mesma lição do ciclo de vida: salve no onPause."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Em uma tela de formulário, qual orientação de LinearLayout costuma funcionar melhor?"
      opcoes:
        - { id: a, texto: "Tanto faz" }
        - { id: b, texto: "horizontal, tudo lado a lado" }
        - { id: c, texto: "vertical, empilhando os campos um sob o outro" }
        - { id: d, texto: "Nenhuma das duas" }
      resposta_correta: c
      explicacao: "Campos lado a lado ficam estreitos demais para digitar em um celular."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que testar o app em mais de um tamanho de tela?"
      opcoes:
        - { id: a, texto: "Não é necessário" }
        - { id: b, texto: "Para gastar mais tempo" }
        - { id: c, texto: "Porque um layout que parece perfeito em um aparelho pode quebrar em outro" }
        - { id: d, texto: "Porque é exigência da Play Store" }
      resposta_correta: c
      explicacao: "O aparelho do desenvolvedor nunca representa todos os usuários."
---

## Nem todo celular é igual ao seu

Existe uma variedade enorme de aparelhos: telas de 5 polegadas e de 7, mais estreitas e mais
largas, em pé e deitadas. Um layout que fica perfeito no seu celular pode ficar espremido,
cortado ou esquisito em outro.

**Responsividade** é a capacidade do layout de **se adaptar** a essas variações.

## As duas medidas fundamentais

Toda View precisa dizer quanto espaço quer ocupar. As duas respostas mais usadas:

| Valor | Significado |
|---|---|
| `match_parent` | ocupa **todo** o espaço disponível do contêiner |
| `wrap_content` | ocupa **apenas o necessário** para o conteúdo |

```xml
<EditText android:layout_width="match_parent" />   <!-- ocupa a linha toda -->
<Button   android:layout_width="wrap_content" />   <!-- só o tamanho do texto -->
```

A regra prática:

- **Campos de texto** → `match_parent`. Quanto mais espaço para digitar, melhor.
- **Botões** → `wrap_content` normalmente, ou `match_parent` se for a ação principal da tela.

## Por que não usar medidas fixas

A tentação é escrever `android:layout_width="300dp"`. O problema é que 300 pontos podem ser
metade de uma tela larga e **maior que a tela inteira** de um aparelho pequeno — e aí o elemento
some para fora da área visível.

Sempre que possível, deixe o layout **decidir** o tamanho, em vez de fixá-lo.

## Orientação: vertical ou horizontal

O `android:orientation` do `LinearLayout` decide se os filhos ficam empilhados ou lado a lado.

Em **formulários**, a resposta quase sempre é `vertical`:

```xml
<LinearLayout android:orientation="vertical">
```

Com `horizontal`, um campo de busca e um botão dividem a largura — e em uma tela estreita o campo
fica com espaço para umas três letras. Empilhado, o campo aproveita a largura inteira.

Use `horizontal` para coisas pequenas que realmente fazem sentido lado a lado, como dois botões
de confirmar e cancelar.

## Girar o celular destrói a tela

Aqui está um comportamento que surpreende quem está começando: quando o usuário **gira** o
aparelho, o Android **destrói e recria** a Activity. Ela passa de novo pelo `onCreate`, como se
tivesse acabado de abrir.

A consequência: **o que não foi salvo se perde**. O formulário que a pessoa estava preenchendo
volta em branco.

É a mesma lição do ciclo de vida que você viu no trimestre passado — e reforça por que salvamos
no `onPause`, que é chamado antes da destruição.

## Testar em mais de um tamanho

O aparelho do desenvolvedor **nunca** representa todos os usuários. Testar em pelo menos duas
proporções diferentes revela problemas que passam despercebidos: texto cortado, botão fora da
tela, campo estreito demais.

## Atividade

A tela do terminal é uma busca **mal configurada**: os componentes estão lado a lado
(`horizontal`) e o campo usa `wrap_content`, ficando minúsculo.

**Passo 1.** No XML, troque a orientação do `LinearLayout` de `horizontal` para `vertical`.

**Passo 2.** Troque o `android:layout_width` do `EditText` de `wrap_content` para `match_parent`,
para o campo aproveitar toda a largura.

**Passo 3.** Adicione um `TextView` com `android:id="@+id/resultado"` — pelo modo **Design**, se
preferir arrastar. Deixe o texto vazio.

**Passo 4.** Volte ao modo **Testar**, digite algo no campo e clique em Buscar. O resultado deve
aparecer:

```
Buscando por: alguma coisa
```

**Passo 5.** Agora faça a comparação: volte a orientação para `horizontal` e olhe a tela. Depois
volte para `vertical`. Qual das duas você usaria em um celular de verdade?

## Desafio extra

1. Faça o botão ocupar a largura toda (`match_parent`) e avalie: em uma tela de busca, isso
   melhora ou piora?
2. Adicione mais dois campos ao formulário e observe como a versão vertical continua funcionando
   enquanto a horizontal ficaria impraticável.
3. Pense e escreva como comentário: se o usuário digitar uma busca e girar o celular, o que
   acontece com o texto? Em qual método você salvaria para não perder?
