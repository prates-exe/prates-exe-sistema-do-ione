---
titulo: "Identidade visual: cores, ícones e tipografia"
mes_numero: 3
numero_sequencial: 18
duracao_minutos: 25
tipo_sandbox: none
publicado: false
quiz:
  titulo: "Quiz — Identidade visual"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é identidade visual de um aplicativo?"
      opcoes:
        - { id: a, texto: "O banco de dados usado" }
        - { id: b, texto: "O conjunto de cores, ícone, tipografia e estilo que fazem o app ser reconhecível" }
        - { id: c, texto: "O código-fonte do app" }
        - { id: d, texto: "A quantidade de telas" }
      resposta_correta: b
      explicacao: "É o que faz alguém reconhecer o app antes mesmo de ler o nome."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Quantas cores principais uma paleta de app costuma ter?"
      opcoes:
        - { id: a, texto: "Exatamente dez" }
        - { id: b, texto: "Poucas — normalmente uma cor principal, uma de destaque e tons neutros" }
        - { id: c, texto: "Quanto mais, melhor" }
        - { id: d, texto: "Apenas preto e branco, sempre" }
      resposta_correta: b
      explicacao: "Excesso de cores confunde e tira o destaque do que importa."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual é o papel da cor de destaque (acento) em uma interface?"
      opcoes:
        - { id: a, texto: "Substituir o texto" }
        - { id: b, texto: "Chamar atenção para a ação mais importante da tela" }
        - { id: c, texto: "Nenhum papel específico" }
        - { id: d, texto: "Pintar o fundo inteiro" }
      resposta_correta: b
      explicacao: "Se tudo é colorido e chamativo, nada se destaca."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que a cor sozinha não deve indicar estados como erro ou sucesso?"
      opcoes:
        - { id: a, texto: "Deve indicar sim, sozinha" }
        - { id: b, texto: "Porque cores gastam bateria" }
        - { id: c, texto: "Porque o Android não suporta cores" }
        - { id: d, texto: "Porque parte das pessoas não distingue certas cores; é preciso texto ou ícone junto" }
      resposta_correta: d
      explicacao: "É a mesma regra de acessibilidade da aula anterior."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que caracteriza um bom ícone de aplicativo?"
      opcoes:
        - { id: a, texto: "Ser uma foto" }
        - { id: b, texto: "Ter muitos detalhes e textos" }
        - { id: c, texto: "Ser igual ao de outro app famoso" }
        - { id: d, texto: "Ser simples e reconhecível mesmo em tamanho pequeno" }
      resposta_correta: d
      explicacao: "O ícone aparece pequeno na tela inicial: detalhes finos viram borrão."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que evitar colocar texto dentro do ícone do app?"
      opcoes:
        - { id: a, texto: "Porque é proibido" }
        - { id: b, texto: "Não é preciso evitar" }
        - { id: c, texto: "Porque em tamanho pequeno o texto fica ilegível, e o nome já aparece embaixo do ícone" }
        - { id: d, texto: "Porque texto não pode ser desenhado" }
      resposta_correta: c
      explicacao: "O sistema já mostra o nome do app abaixo do ícone."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Quantas fontes diferentes convém usar em um aplicativo?"
      opcoes:
        - { id: a, texto: "Uma fonte diferente por tela" }
        - { id: b, texto: "Uma ou duas, variando tamanho e peso para criar hierarquia" }
        - { id: c, texto: "Nenhuma, só imagens" }
        - { id: d, texto: "Pelo menos cinco" }
      resposta_correta: b
      explicacao: "Hierarquia se cria com tamanho e negrito, não com variedade de fontes."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que a consistência visual entre telas é importante?"
      opcoes:
        - { id: a, texto: "Porque economiza memória" }
        - { id: b, texto: "Porque o usuário aprende os padrões uma vez e reconhece em todas as telas" }
        - { id: c, texto: "Porque telas iguais são mais fáceis de programar" }
        - { id: d, texto: "Não é importante" }
      resposta_correta: b
      explicacao: "Se cada tela tem um estilo, o app parece um amontoado de partes soltas."
---

## O que faz um app parecer profissional

Dois aplicativos podem ter exatamente as mesmas funções e passar impressões completamente
diferentes. A diferença quase sempre está na **identidade visual**: o conjunto de cores, ícone,
tipografia e estilo que dá personalidade e coerência ao produto.

Esta aula é sobre as decisões visuais do seu projeto — as que você vai defender na apresentação
final.

## A paleta de cores

O erro clássico de quem começa é usar **cores demais**. A tela vira um carnaval e nada se
destaca.

Uma paleta bem resolvida tem poucos elementos:

| Papel | Uso |
|---|---|
| **Cor principal** | barra superior, elementos de identidade |
| **Cor de destaque** | a ação mais importante da tela |
| **Neutros** | fundo, textos, bordas (brancos, cinzas, quase-pretos) |
| **Estados** | sucesso, erro e alerta |

A cor de destaque tem uma função específica: **guiar o olho para a ação principal**. Se todos os
botões forem coloridos e chamativos, nenhum se destaca — e o usuário fica sem saber o que fazer
primeiro.

E vale a lição da aula anterior: **cor nunca deve ser o único indicador**. Um erro em vermelho
precisa vir com texto explicando; um sucesso em verde também.

## O ícone

O ícone é a primeira coisa que a pessoa vê — e ele aparece **pequeno**, no meio de dezenas de
outros na tela inicial.

Três regras práticas:

1. **Simples.** Uma forma clara e reconhecível. Detalhes finos viram borrão em 48 pixels.
2. **Sem texto dentro.** O sistema já mostra o nome do app logo abaixo. Texto no ícone fica
   ilegível e redundante.
3. **Único.** Ele precisa se distinguir dos outros ícones do celular, não imitar um app famoso.

Um bom teste: reduza o seu ícone para o tamanho de uma unha. Ainda dá para reconhecer? Se não,
simplifique.

## A tipografia

Aqui a regra é econômica: **uma ou duas fontes, no máximo**.

A hierarquia não vem da variedade de fontes, e sim de **tamanho** e **peso**:

- Título: grande e em negrito.
- Subtítulo: médio, peso normal.
- Corpo: tamanho confortável de leitura.
- Detalhe: menor e mais discreto — mas nunca ilegível.

Usar cinco fontes diferentes não deixa o app rico; deixa desorganizado.

## Consistência entre telas

Este é o ponto que mais separa um projeto escolar de um app profissional: **as telas precisam
parecer parte do mesmo produto**.

Isso significa:

- o mesmo estilo de botão em todas as telas;
- os mesmos espaçamentos;
- os mesmos tamanhos de título;
- as mesmas cores para as mesmas funções.

Se cada tela foi desenhada isoladamente, o resultado parece um amontoado de partes soltas — mesmo
que cada tela, sozinha, esteja bonita.

## Decidindo a identidade do seu projeto

Antes de mexer no código, responda por escrito:

1. **Qual é a cor principal do meu app?** Ela combina com o propósito? (Um app de finanças e um
   app infantil pedem coisas bem diferentes.)
2. **Qual é a cor de destaque?** Ela aparece só nas ações importantes?
3. **Como é o meu ícone?** Ele é simples o bastante para ser reconhecido pequeno?
4. **Quais tamanhos de texto eu uso** para título, corpo e detalhe?

Anotar essas decisões é o que garante que você as aplique de forma consistente — e é exatamente
esse tipo de justificativa que se apresenta ao mostrar o projeto.

## Atividade

Esta aula é de **planejamento visual**, então não tem terminal. Faça no caderno ou no computador:

**Passo 1.** Defina a **paleta** do seu projeto: cor principal, cor de destaque e os neutros.
Escreva o motivo de cada escolha.

**Passo 2.** Desenhe (no papel mesmo) três versões do **ícone** do seu app. Depois reduza cada
uma mentalmente ao tamanho de uma unha e escolha a que continua reconhecível.

**Passo 3.** Defina a **hierarquia de textos**: que tamanho terá o título, o corpo e os detalhes.

**Passo 4.** Faça uma **auditoria de consistência**: liste as telas do seu projeto e verifique se
os botões, espaçamentos e cores são os mesmos em todas. Anote o que está fora do padrão.

**Passo 5.** Escreva um parágrafo justificando a identidade visual escolhida. Esse texto entra na
documentação e na apresentação do projeto.

## Desafio extra

1. Escolha dois aplicativos que você usa e compare as paletas. Quantas cores principais cada um
   usa? Onde aparece a cor de destaque?
2. Olhe a tela inicial do seu celular e identifique os três ícones mais reconhecíveis. O que eles
   têm em comum?
3. Aplique a sua paleta nas telas que você já construiu no terminal Android das aulas anteriores.
