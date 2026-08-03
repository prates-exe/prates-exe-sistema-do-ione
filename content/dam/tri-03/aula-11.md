---
titulo: "Gerando o APK e publicando na Play Store"
mes_numero: 3
numero_sequencial: 25
duracao_minutos: 25
tipo_sandbox: none
publicado: false
quiz:
  titulo: "Quiz — Publicação"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é um APK?"
      opcoes:
        - { id: a, texto: "Um emulador" }
        - { id: b, texto: "Um tipo de banco de dados" }
        - { id: c, texto: "O arquivo instalável do aplicativo Android, com todo o código e recursos empacotados" }
        - { id: d, texto: "O código-fonte do projeto" }
      resposta_correta: c
      explicacao: "É o que se instala no aparelho."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre APK e AAB?"
      opcoes:
        - { id: a, texto: "O AAB é enviado à Play Store, que gera versões otimizadas para cada aparelho; o APK é o instalável direto" }
        - { id: b, texto: "O AAB é o código-fonte" }
        - { id: c, texto: "O APK só funciona em emulador" }
        - { id: d, texto: "São exatamente a mesma coisa" }
      resposta_correta: a
      explicacao: "O AAB (Android App Bundle) é hoje o formato exigido para publicar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que significa assinar um aplicativo?"
      opcoes:
        - { id: a, texto: "Registrar o app em cartório" }
        - { id: b, texto: "Aplicar uma assinatura digital que comprova que aquele app veio de você" }
        - { id: c, texto: "Colocar a sua foto no ícone" }
        - { id: d, texto: "Escrever o seu nome no código" }
      resposta_correta: b
      explicacao: "É o que garante ao sistema que a atualização veio do mesmo autor."
    - id: q4
      tipo: multipla_escolha
      enunciado: "O que acontece se você PERDER a chave de assinatura do seu app publicado?"
      opcoes:
        - { id: a, texto: "O app é apagado da loja automaticamente" }
        - { id: b, texto: "Você não consegue mais publicar atualizações daquele app" }
        - { id: c, texto: "A Google recupera para você" }
        - { id: d, texto: "Nada, é só gerar outra" }
      resposta_correta: b
      explicacao: "Por isso a chave deve ser guardada com muito cuidado e backup."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre build de debug e de release?"
      opcoes:
        - { id: a, texto: "O debug é para testes durante o desenvolvimento; o release é otimizado e assinado para distribuição" }
        - { id: b, texto: "O release não funciona em celular" }
        - { id: c, texto: "São iguais" }
        - { id: d, texto: "O debug é mais rápido para o usuário" }
      resposta_correta: a
      explicacao: "Nunca se distribui uma build de debug: ela é maior, mais lenta e menos segura."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é preciso para publicar na Google Play Store?"
      opcoes:
        - { id: a, texto: "Autorização do governo" }
        - { id: b, texto: "Nada, é totalmente livre" }
        - { id: c, texto: "Uma conta de desenvolvedor, que tem uma taxa única de cadastro" }
        - { id: d, texto: "Uma empresa registrada obrigatoriamente" }
      resposta_correta: c
      explicacao: "A conta é paga uma única vez e permite publicar vários aplicativos."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que a ficha do app na loja precisa ter, além do arquivo?"
      opcoes:
        - { id: a, texto: "O código-fonte completo" }
        - { id: b, texto: "Somente o nome" }
        - { id: c, texto: "Título, descrição, capturas de tela, ícone, classificação indicativa e política de privacidade" }
        - { id: d, texto: "Apenas o arquivo do app" }
      resposta_correta: c
      explicacao: "A política de privacidade é obrigatória para apps que coletam dados."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que existe o versionamento (versionCode e versionName) de um app?"
      opcoes:
        - { id: a, texto: "Não tem função" }
        - { id: b, texto: "Para calcular o preço do app" }
        - { id: c, texto: "Para o sistema saber qual versão é mais nova e o usuário identificar as atualizações" }
        - { id: d, texto: "Apenas por organização interna" }
      resposta_correta: c
      explicacao: "Cada envio à loja precisa de um versionCode maior que o anterior."
---

## Do projeto ao aplicativo instalável

Até aqui o seu app rodou no emulador, no aparelho de teste ou no terminal deste site. Nesta aula
vemos o caminho que transforma o projeto em **um aplicativo que outras pessoas podem instalar**.

Uma observação honesta antes de começar: **este processo exige o Android Studio de verdade** —
gerar um arquivo assinado não é algo que se faça pelo navegador. O objetivo aqui é você **conhecer
o processo completo**, porque ele cai na prova e porque é o que acontece no mercado. Quando você
tiver acesso a um computador com Android Studio, vai saber exatamente o que fazer.

## APK e AAB

| Formato | O que é | Quando usar |
|---|---|---|
| **APK** | o arquivo instalável, com tudo empacotado | instalar direto, compartilhar para teste |
| **AAB** | um pacote enviado à loja, que gera versões sob medida | **publicar na Play Store** |

O **AAB** (*Android App Bundle*) é o formato exigido hoje pela Play Store. A vantagem: a loja gera
uma versão otimizada para **cada tipo de aparelho**, então o usuário baixa só o que o celular dele
precisa — um download menor.

## Assinatura digital

Todo app instalado precisa ser **assinado**. A assinatura é uma prova criptográfica de que aquele
arquivo veio de você.

Serve para uma coisa essencial: quando você publica uma **atualização**, o sistema confere se ela
foi assinada com a **mesma chave** do app já instalado. Se não for, ele recusa — impedindo que
outra pessoa publique uma "atualização" falsa do seu app.

**O aviso mais importante desta aula:** se você **perder a chave de assinatura**, nunca mais
conseguirá publicar atualizações daquele aplicativo. Não existe recuperação. A chave precisa de
backup em lugar seguro, e a senha dela também.

## Debug e release

Durante o desenvolvimento, o Android Studio gera builds de **debug**: com informações extras para
depuração, sem otimização, assinadas com uma chave automática de teste.

Para distribuir, gera-se a build de **release**: otimizada, menor e assinada com **a sua** chave.

Nunca distribua uma build de debug — ela é maior, mais lenta e expõe informações internas.

## O passo a passo no Android Studio

Para quando você tiver acesso:

1. **Build → Generate Signed Bundle / APK**
2. Escolher **Android App Bundle** (para a loja) ou **APK** (para instalar direto)
3. Criar uma **keystore** nova (ou usar a existente) — guardar arquivo e senhas com cuidado
4. Escolher a variante **release**
5. O arquivo é gerado na pasta do projeto

## Publicando na Play Store

O processo tem três partes:

**1. Conta de desenvolvedor.** É preciso criar uma conta no Google Play Console, que tem uma
**taxa única** de cadastro (não é mensalidade). Com ela você pode publicar vários apps.

**2. A ficha do app.** Não basta enviar o arquivo — a loja pede:

- título e descrição (curta e completa);
- **capturas de tela** do app rodando;
- ícone em alta resolução;
- **classificação indicativa** (respondendo um questionário sobre o conteúdo);
- **política de privacidade** — obrigatória se o app coleta qualquer dado.

Repare que a política de privacidade conecta diretamente com a aula anterior: você precisa
declarar o que coleta e por quê.

**3. Revisão.** A Google analisa o app antes de publicar. Pode levar de horas a alguns dias, e o
app pode ser recusado — normalmente por permissões sem justificativa, política de privacidade
faltando ou conteúdo inadequado.

## Versionamento

Todo app tem dois números:

- **`versionCode`** — um número inteiro que o **sistema** usa para saber qual versão é mais nova.
  Cada envio à loja precisa de um valor **maior** que o anterior.
- **`versionName`** — o texto que o **usuário** vê, como `1.2.0`.

Uma convenção comum para o `versionName` é `maior.menor.correção`: mudanças grandes sobem o
primeiro número, funcionalidades novas o segundo, correções o terceiro.

## Atividade

Esta aula é de **planejamento da entrega**. Escreva as respostas — elas entram na documentação e
na apresentação final.

**Passo 1.** Escreva o **título** do seu app (curto, claro) e a **descrição curta** em uma frase.

**Passo 2.** Escreva a **descrição completa**: o que o app faz, para quem é e qual problema
resolve. Uns dois parágrafos.

**Passo 3.** Liste quais **capturas de tela** você usaria e o que cada uma mostra. Escolha as
telas que melhor demonstram o valor do app.

**Passo 4.** Escreva um rascunho da **política de privacidade**, respondendo: quais dados o app
coleta, para que servem, onde ficam guardados e como o usuário pode pedir a exclusão.

**Passo 5.** Defina a **versão inicial** do seu app (`versionCode` e `versionName`) e escreva o
que precisaria acontecer para você subir cada um deles.

## Desafio extra

1. Abra a página de um app na Play Store e analise a ficha: como é o título? A descrição convence?
   As capturas mostram o app funcionando?
2. Pesquise a política de privacidade de um app que você usa. Ela é compreensível ou é um texto
   que ninguém lê?
3. Pense: se você tivesse que explicar o seu app em **uma frase** para alguém baixar, qual seria?
