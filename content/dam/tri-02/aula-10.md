---
titulo: "Sensores, permissões e conexão com a internet"
mes_numero: 2
numero_sequencial: 10
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    public static void main(String[] args) {
      // Simulacao do fluxo real de um app que usa GPS e internet.
      boolean permissaoConcedida = true;
      boolean temInternet = false;

      // Passo 1: so acesse o GPS se a permissao foi concedida.

      // Passo 2: se nao houver internet, avise e use os dados salvos.

    }
  }
criterios_validacao:
  - descricao: "Só acessar a localização quando a permissão foi concedida"
    contem: "Localizacao obtida"
    dica: "if (permissaoConcedida) { System.out.println(\"Localizacao obtida\"); } else { System.out.println(\"Permissao negada\"); }"
  - descricao: "Avisar o usuário quando não há internet"
    contem: "Sem conexao"
    dica: "if (!temInternet) { System.out.println(\"Sem conexao\"); ... }"
  - descricao: "Continuar funcionando com os dados salvos localmente"
    contem: "Mostrando dados salvos"
    dica: "Dentro do caso sem internet, mostre também \"Mostrando dados salvos\" — é o comportamento correto."
quiz:
  titulo: "Quiz — Sensores, permissões e APIs"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que um aplicativo precisa pedir permissão explícita para usar o GPS?"
      opcoes:
        - { id: a, texto: "Porque a localização revela onde a pessoa está e por onde circula — é informação pessoal sensível" }
        - { id: b, texto: "Só por exigência técnica, sem relação com privacidade" }
        - { id: c, texto: "Não é necessário pedir permissão para o GPS" }
        - { id: d, texto: "Só é preciso pedir permissão para a câmera" }
      resposta_correta: a
      explicacao: "É proteção de privacidade e exigência ética e legal: a decisão fica com o usuário."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O usuário pode mudar de ideia depois de conceder uma permissão?"
      opcoes:
        - { id: a, texto: "Sim, pode revogar o acesso quando quiser nas configurações" }
        - { id: b, texto: "Não, a permissão é definitiva" }
        - { id: c, texto: "Só se reinstalar o aplicativo" }
        - { id: d, texto: "Só o desenvolvedor pode mudar" }
      resposta_correta: a
      explicacao: "Por isso o app precisa verificar a permissão sempre antes de usar o recurso, não só na primeira vez."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Quais destes são recursos de hardware que um app Android pode usar?"
      opcoes:
        - { id: a, texto: "Acelerômetro, sensor de luminosidade, vibração, lanterna e GPS" }
        - { id: b, texto: "Só a tela, nada mais" }
        - { id: c, texto: "Apenas a câmera" }
        - { id: d, texto: "Nenhum, tudo é feito por software" }
      resposta_correta: a
      explicacao: "Sensores leem o ambiente; atuadores (vibração, lanterna) agem sobre ele."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual é a diferença entre um sensor e um atuador?"
      opcoes:
        - { id: a, texto: "O sensor lê informação do ambiente; o atuador provoca uma ação no mundo físico" }
        - { id: b, texto: "São a mesma coisa" }
        - { id: c, texto: "Sensor só existe no iPhone" }
        - { id: d, texto: "Atuador é um tipo de tela" }
      resposta_correta: a
      explicacao: "O acelerômetro é sensor (lê movimento); a vibração é atuador (produz movimento)."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é o formato de dados mais usado quando um app conversa com uma API?"
      opcoes:
        - { id: a, texto: "JSON" }
        - { id: b, texto: "PNG" }
        - { id: c, texto: "APK" }
        - { id: d, texto: "XML de layout" }
      resposta_correta: a
      explicacao: "JSON é um formato de texto estruturado que o app precisa interpretar."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é uma API, no contexto de um aplicativo?"
      opcoes:
        - { id: a, texto: "Um serviço na internet que o app consulta para obter ou enviar dados" }
        - { id: b, texto: "Um tipo de botão" }
        - { id: c, texto: "O banco de dados local do aparelho" }
        - { id: d, texto: "Um arquivo de layout" }
      resposta_correta: a
      explicacao: "Um app de clima, por exemplo, consulta uma API para saber a previsão."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que pode acontecer se o desenvolvedor não tratar erros de conexão?"
      opcoes:
        - { id: a, texto: "O aplicativo pode travar, fechar sozinho ou mostrar uma tela vazia sem explicação" }
        - { id: b, texto: "Nada, o Android trata tudo automaticamente" }
        - { id: c, texto: "O app fica mais rápido" }
        - { id: d, texto: "A API para de existir" }
      resposta_correta: a
      explicacao: "A conexão pode cair, ficar lenta ou o servidor responder com erro — tudo isso precisa ser previsto."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é a forma correta de lidar com uma falha de conexão?"
      opcoes:
        - { id: a, texto: "Avisar com clareza, oferecer tentar de novo e, se possível, seguir com os dados salvos localmente" }
        - { id: b, texto: "Deixar o app fechar sozinho, sem aviso" }
        - { id: c, texto: "Ignorar o erro completamente" }
        - { id: d, texto: "Impedir o app de abrir de novo" }
      resposta_correta: a
      explicacao: "É aqui que o banco local (SQLite) da aula anterior salva a experiência do usuário."
---

## O celular é muito mais que uma tela

Um aparelho moderno tem uma quantidade enorme de recursos que o seu aplicativo pode usar. Eles se
dividem em dois grupos:

- **Sensores** — *leem* informação do ambiente: acelerômetro (movimento e inclinação), sensor de
  luminosidade (claridade), GPS (localização).
- **Atuadores** — *agem* sobre o mundo físico: vibração, lanterna.

A diferença é a direção: o sensor traz informação **para dentro**, o atuador leva ação **para
fora**.

## Nem tudo pode ser usado livremente

Alguns desses recursos acessam **informações pessoais sensíveis**. A localização é o exemplo mais
claro: ela revela onde a pessoa está, onde mora, onde estuda e por onde circula todos os dias.

Por isso o sistema operacional **não permite** que o aplicativo simplesmente use o GPS. É
obrigatório **solicitar autorização explícita**, e a decisão fica nas mãos do usuário, que pode:

- **negar** o acesso;
- **conceder** o acesso;
- **revogar** depois, a qualquer momento, nas configurações.

Esse último ponto é importante para o programador: **não basta pedir a permissão uma vez**. O app
precisa **verificar** se ainda tem a permissão toda vez que for usar o recurso, porque ela pode
ter sido retirada.

Isso é, ao mesmo tempo, uma **proteção de privacidade** e uma **exigência ética e legal**. No
Brasil, a LGPD (Lei Geral de Proteção de Dados) trata exatamente desse tipo de cuidado com dados
pessoais.

## Conectando com a internet

Quando o aplicativo busca informações fora do aparelho, ele conversa com uma **API** — um serviço
na internet que responde a pedidos. Um app de clima consulta uma API para saber a previsão; um app
de entrega consulta outra para achar o endereço pelo CEP.

Os dados normalmente voltam em **JSON**, um formato de texto estruturado:

```json
{
  "cidade": "Teofilo Otoni",
  "temperatura": 27,
  "condicao": "ensolarado"
}
```

O aplicativo precisa **interpretar** esse texto e transformar em valores que o Java entende.

## Quando a internet falha (e ela vai falhar)

Essa é a parte que separa um app amador de um profissional. A comunicação nem sempre dá certo:

- a conexão pode **cair** no meio;
- pode ficar **muito lenta**;
- o servidor pode responder com **erro**;
- o usuário pode estar em modo avião.

Se o desenvolvedor não previr essas situações, o aplicativo **trava**, **fecha sozinho** ou mostra
uma **tela vazia sem qualquer explicação** — e o usuário não faz ideia do que aconteceu.

O caminho correto tem três partes:

1. **Tratar a falha** — prever que ela pode acontecer, em vez de assumir que tudo vai dar certo.
2. **Avisar com clareza** — "Sem conexão. Verifique sua internet." em vez de uma tela em branco.
3. **Continuar funcionando** — sempre que possível, mostrar os dados que já estavam **guardados
   localmente** (lembra do SQLite da aula anterior?), em vez de simplesmente não mostrar nada.

É por isso que o WhatsApp mostra suas conversas antigas mesmo sem internet: elas estão salvas no
aparelho.

## Atividade

Sensores e internet de verdade só existem em um aparelho físico, então aqui vamos **simular a
lógica de decisão** — que é exatamente a parte que o programador escreve.

No terminal abaixo há duas variáveis: `permissaoConcedida = true` e `temInternet = false`.

**Passo 1.** Escreva um `if/else` que só acesse a localização se a permissão foi concedida:

- se `permissaoConcedida` for true → mostre `Localizacao obtida`
- caso contrário → mostre `Permissao negada`

**Passo 2.** Escreva a lógica de conexão. Se **não** houver internet, o app deve avisar **e**
continuar funcionando com o que está salvo:

```
Sem conexao
Mostrando dados salvos
```

Se houvesse internet, deveria mostrar `Dados atualizados da API`.

A saída completa com os valores iniciais deve ser:

```
Localizacao obtida
Sem conexao
Mostrando dados salvos
```

**Passo 3.** Teste os outros casos: mude `permissaoConcedida` para `false` e veja a mensagem de
permissão negada. Mude `temInternet` para `true` e veja o app buscar da API.

## Desafio extra

1. Junte as duas condições: só busque a previsão do tempo se **tiver permissão de localização e
   internet** ao mesmo tempo (use `&&`).
2. Adicione uma terceira variável `boolean modoEconomiaDeDados` e faça o app **não** baixar dados
   pesados quando ela estiver ativa, mesmo com internet.
3. Escreva como comentário: por que é uma má ideia um app pedir **todas** as permissões possíveis
   logo na primeira abertura, mesmo as que não vai usar?
