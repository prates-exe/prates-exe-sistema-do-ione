---
titulo: "Segurança em aplicações móveis"
mes_numero: 3
numero_sequencial: 24
duracao_minutos: 25
tipo_sandbox: none
publicado: false
quiz:
  titulo: "Quiz — Segurança"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é o princípio do menor privilégio?"
      opcoes:
        - { id: a, texto: "Dar privilégios de administrador ao app" }
        - { id: b, texto: "Não pedir permissão nenhuma" }
        - { id: c, texto: "Pedir apenas as permissões estritamente necessárias para o app funcionar" }
        - { id: d, texto: "Pedir todas as permissões de uma vez, por garantia" }
      resposta_correta: c
      explicacao: "Cada permissão a mais é um risco a mais e uma desconfiança a mais do usuário."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Quando é o melhor momento para pedir uma permissão ao usuário?"
      opcoes:
        - { id: a, texto: "Nunca" }
        - { id: b, texto: "Só depois de o app já ter usado o recurso" }
        - { id: c, texto: "Todas juntas na primeira abertura" }
        - { id: d, texto: "No momento em que o recurso vai ser usado, explicando o motivo" }
      resposta_correta: d
      explicacao: "Pedir no contexto certo aumenta muito a chance de o usuário aceitar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que são dados sensíveis?"
      opcoes:
        - { id: a, texto: "Informações que causam dano se vazarem: senhas, CPF, localização, dados de saúde" }
        - { id: b, texto: "O código-fonte" }
        - { id: c, texto: "Qualquer texto do app" }
        - { id: d, texto: "Apenas imagens" }
      resposta_correta: a
      explicacao: "A LGPD trata justamente da proteção desse tipo de informação."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que NUNCA se deve guardar senha em texto puro?"
      opcoes:
        - { id: a, texto: "Porque ocupa muito espaço" }
        - { id: b, texto: "Porque quem acessar o banco lê todas as senhas diretamente" }
        - { id: c, texto: "Pode guardar, sem problema" }
        - { id: d, texto: "Porque deixa o app lento" }
      resposta_correta: b
      explicacao: "Senhas devem passar por hash — uma transformação que não pode ser revertida."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que não se deve deixar chaves de API escritas dentro do código do app?"
      opcoes:
        - { id: a, texto: "Porque ocupam muito espaço" }
        - { id: b, texto: "Pode deixar, é seguro" }
        - { id: c, texto: "Porque chaves não funcionam em Android" }
        - { id: d, texto: "Porque o APK pode ser aberto e a chave extraída por qualquer pessoa" }
      resposta_correta: d
      explicacao: "Um app instalado está na mão do usuário — nada dentro dele é secreto."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Qual a diferença entre HTTP e HTTPS?"
      opcoes:
        - { id: a, texto: "Não há diferença real" }
        - { id: b, texto: "O HTTP é mais moderno" }
        - { id: c, texto: "O HTTPS criptografa a comunicação; no HTTP os dados trafegam legíveis" }
        - { id: d, texto: "O HTTPS é mais rápido" }
      resposta_correta: c
      explicacao: "Em rede pública, HTTP permite que qualquer um leia o que trafega."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que validar a entrada do usuário também é uma questão de segurança?"
      opcoes:
        - { id: a, texto: "Porque entrada não validada pode quebrar o app ou ser usada para ataques" }
        - { id: b, texto: "Porque o Android exige" }
        - { id: c, texto: "Porque validar deixa o app bonito" }
        - { id: d, texto: "Não tem relação com segurança" }
      resposta_correta: a
      explicacao: "É a mesma lição do WHERE esquecido e do try/catch: nunca confie no que vem de fora."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que a LGPD exige de quem coleta dados pessoais?"
      opcoes:
        - { id: a, texto: "Coletar o máximo de dados possível" }
        - { id: b, texto: "Nada, é apenas uma recomendação" }
        - { id: c, texto: "Vender os dados coletados" }
        - { id: d, texto: "Coletar apenas o necessário, informar a finalidade e proteger os dados coletados" }
      resposta_correta: d
      explicacao: "Minimização, transparência e proteção são princípios centrais da lei."
---

## Um app é instalado no aparelho de outra pessoa

Essa frase resume por que segurança importa aqui. Diferente de um site, que roda no servidor, o
seu aplicativo vai para o **celular do usuário** — com acesso à câmera, à localização, aos
contatos e aos dados que ele digitar.

Isso é uma responsabilidade grande. E o Android leva a sério: várias dessas capacidades só são
liberadas com **autorização explícita**.

## Permissões: peça o mínimo

O princípio se chama **menor privilégio**: peça **apenas** o que o app realmente precisa.

Um app de bloco de notas que pede acesso a contatos, câmera e localização levanta suspeita — e com
razão. Cada permissão a mais é:

- um **risco a mais** se o app tiver uma falha;
- uma **desconfiança a mais** do usuário;
- um **motivo a mais** para a Play Store questionar.

E o **momento** de pedir importa tanto quanto: peça **quando o recurso for usado**, explicando o
porquê. Comparar as duas abordagens deixa claro:

| Ruim | Bom |
|---|---|
| Na primeira abertura, pede tudo de uma vez, sem explicar | Ao tocar em "Usar minha localização", explica: "Precisamos da sua localização para mostrar as lojas próximas" |

A segunda tem muito mais chance de ser aceita — porque faz sentido naquele momento.

E lembre da aula do trimestre passado: o usuário pode **revogar** a permissão depois. O app
precisa **verificar** antes de cada uso, não apenas na primeira vez.

## Dados sensíveis

**Dados sensíveis** são informações que causam dano real se vazarem: senhas, CPF, endereço,
localização, dados de saúde, informações financeiras.

Três regras:

**1. Não colete o que não precisa.** A pergunta certa é: *"o app funciona sem esse dado?"*. Se
sim, não peça. Dado que você não tem é dado que não pode vazar.

**2. Nunca guarde senha em texto puro.** Se você salvar a senha do jeito que foi digitada,
qualquer um que acesse o banco lê todas. Senhas devem passar por **hash** — uma transformação de
mão única, que não pode ser revertida. Na hora de verificar, você compara os hashes, nunca as
senhas.

**3. Não guarde mais do que o necessário.** Dado antigo que não serve mais deve ser apagado.

## Chaves de API dentro do app

Um erro muito comum: colocar a chave de acesso de uma API direto no código.

```java
String apiKey = "abc123minhachavesecreta";   // NUNCA faça isso
```

O motivo é simples e definitivo: **o APK está na mão do usuário**. Existem ferramentas que abrem
um APK e leem tudo que há dentro, inclusive esse texto. Nada dentro de um app instalado é secreto.

Chaves realmente sensíveis devem ficar em um **servidor** que você controla; o app conversa com
esse servidor, e ele guarda o segredo.

## Comunicação: sempre HTTPS

Ao conversar com uma API, use **HTTPS**, nunca HTTP.

Com HTTP, os dados trafegam **legíveis**. Em uma rede Wi-Fi pública, qualquer pessoa com uma
ferramenta simples pode ler o que o app envia — incluindo login e senha. O HTTPS criptografa a
comunicação e resolve isso.

O Android moderno já **bloqueia HTTP por padrão**, justamente para evitar esse erro.

## Validar entrada é segurança

Você já viu isso em três contextos diferentes:

- em Banco de Dados: `UPDATE` sem `WHERE` destrói a tabela;
- em exceções: entrada inválida trava o app;
- agora: entrada não validada pode ser explorada de propósito.

A lição é a mesma nos três casos: **nunca confie no que vem de fora**. Valide sempre, mesmo que
a tela "não permita" digitar errado — porque quem quer atacar não usa a sua tela.

## LGPD

A **Lei Geral de Proteção de Dados** trata exatamente disso no Brasil. Os princípios que mais
afetam um app:

- **Minimização** — colete apenas o necessário para a finalidade.
- **Transparência** — informe claramente o que é coletado e para quê.
- **Segurança** — proteja adequadamente o que foi coletado.
- **Direito do titular** — a pessoa pode pedir acesso e exclusão dos seus dados.

Repare que a boa prática técnica e a exigência legal apontam para o mesmo lugar.

## Atividade

Esta aula é de **análise do seu projeto**. Faça por escrito — o resultado entra na documentação
final.

**Passo 1.** Liste **todas as permissões** que o seu app pede. Para cada uma, responda: o app
funciona sem ela? Se sim, remova.

**Passo 2.** Para as que sobraram, escreva **a frase que você mostraria ao usuário** explicando
por que precisa daquilo, no momento do pedido.

**Passo 3.** Liste **todos os dados** que o app guarda. Marque quais são sensíveis.

**Passo 4.** Responda por escrito:

- Algum dado sensível está guardado sem proteção?
- Existe alguma chave ou senha escrita dentro do código?
- Toda comunicação com a internet usa HTTPS?
- Toda entrada de usuário é validada antes de ser usada?

**Passo 5.** Anote as correções necessárias. Essa lista é uma **auditoria de segurança** — e é
exatamente esse tipo de análise que se faz em projetos reais.

## Desafio extra

1. Pegue um app do seu celular e veja em Configurações quais permissões ele pede. Alguma parece
   desnecessária para o que ele faz?
2. Pesquise o que é **hash de senha** e por que ele é de mão única. Por que isso é melhor do que
   criptografia reversível para senhas?
3. Escreva a seção "Privacidade e segurança" da documentação do seu projeto, explicando o que
   você coleta, por quê e como protege.
