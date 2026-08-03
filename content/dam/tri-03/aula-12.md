---
titulo: "GitHub, README e documentação técnica"
mes_numero: 3
numero_sequencial: 26
duracao_minutos: 25
tipo_sandbox: none
publicado: false
quiz:
  titulo: "Quiz — Versionamento e documentação"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é o Git?"
      opcoes:
        - { id: a, texto: "Uma linguagem de programação" }
        - { id: b, texto: "Um editor de código" }
        - { id: c, texto: "Um sistema de controle de versão, que guarda o histórico das alterações do projeto" }
        - { id: d, texto: "Um tipo de banco de dados" }
      resposta_correta: c
      explicacao: "O GitHub é o site que hospeda repositórios Git."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que é um commit?"
      opcoes:
        - { id: a, texto: "Uma cópia do projeto na nuvem" }
        - { id: b, texto: "Um erro no código" }
        - { id: c, texto: "Um ponto salvo no histórico, com as alterações feitas e uma mensagem explicando" }
        - { id: d, texto: "Um tipo de teste" }
      resposta_correta: c
      explicacao: "É como um ponto de salvamento ao qual você pode voltar."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual é uma boa mensagem de commit?"
      opcoes:
        - { id: a, texto: "\"Corrige calculo do IMC com altura zero\"" }
        - { id: b, texto: "\"aaa\"" }
        - { id: c, texto: "\"alteracoes\"" }
        - { id: d, texto: "\"asdasd\"" }
      resposta_correta: a
      explicacao: "Ela diz o que mudou e por quê — quem lê o histórico entende sem abrir o código."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Por que usar controle de versão em vez de copiar pastas como 'projeto_final_v2'?"
      opcoes:
        - { id: a, texto: "Não há vantagem real" }
        - { id: b, texto: "Porque o histórico fica organizado, dá para voltar atrás e ver exatamente o que mudou em cada etapa" }
        - { id: c, texto: "Porque ocupa menos espaço" }
        - { id: d, texto: "Porque é obrigatório" }
      resposta_correta: b
      explicacao: "Quem já teve 'v2_final_agora_vai' sabe por que isso não funciona."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que NUNCA deve ser enviado para um repositório público?"
      opcoes:
        - { id: a, texto: "O código-fonte" }
        - { id: b, texto: "Senhas, chaves de API e dados pessoais" }
        - { id: c, texto: "As imagens do app" }
        - { id: d, texto: "O arquivo README" }
      resposta_correta: b
      explicacao: "Uma chave enviada por engano fica no histórico mesmo depois de apagada."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Para que serve o arquivo .gitignore?"
      opcoes:
        - { id: a, texto: "Ignorar erros de compilação" }
        - { id: b, texto: "Listar arquivos que não devem ser enviados ao repositório" }
        - { id: c, texto: "Listar os autores do projeto" }
        - { id: d, texto: "Documentar o projeto" }
      resposta_correta: b
      explicacao: "Arquivos gerados, configurações locais e segredos ficam de fora por ele."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que é o README de um projeto?"
      opcoes:
        - { id: a, texto: "O documento inicial que explica o que é o projeto, como rodar e como usar" }
        - { id: b, texto: "Um arquivo opcional sem importância" }
        - { id: c, texto: "A lista de erros conhecidos apenas" }
        - { id: d, texto: "O código principal" }
      resposta_correta: a
      explicacao: "É a primeira coisa que alguém lê ao abrir o repositório."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que um bom README importa para o seu portfólio?"
      opcoes:
        - { id: a, texto: "Porque aumenta o número de commits" }
        - { id: b, texto: "Porque deixa o app mais rápido" }
        - { id: c, texto: "Porque quem avalia bate o olho nele primeiro; sem explicação, o projeto parece incompleto" }
        - { id: d, texto: "Não importa" }
      resposta_correta: c
      explicacao: "Um projeto bom sem README parece um projeto inacabado."
---

## Onde o seu trabalho fica guardado

Você já perdeu um trabalho porque o computador desligou? Já teve pastas chamadas
`projeto_v2`, `projeto_final`, `projeto_final_agora_vai`?

O **controle de versão** resolve os dois problemas — e é conhecimento obrigatório na área.

## Git e GitHub

Não são a mesma coisa:

- **Git** é o **sistema** que guarda o histórico de alterações do seu projeto, no seu computador.
- **GitHub** é o **site** que hospeda esses projetos na internet, permitindo backup e
  compartilhamento.

## Commits: pontos de salvamento

Um **commit** é um ponto salvo no histórico. Ele guarda **o que mudou** e uma **mensagem**
explicando o motivo.

O poder disso é grande: você consegue ver o projeto como estava há duas semanas, descobrir quando
um erro apareceu e voltar atrás se necessário.

A mensagem faz toda a diferença:

| Ruim | Bom |
|---|---|
| `alteracoes` | `Corrige calculo do IMC com altura zero` |
| `asdasd` | `Adiciona validacao no campo de e-mail` |
| `aaa` | `Refatora classificarImc para usar else if` |

A regra: a mensagem deve dizer **o que mudou e por quê**, de forma que alguém entenda sem abrir o
código.

## O que NUNCA vai para o repositório

Este ponto é sério, principalmente em repositório público:

- **senhas**;
- **chaves de API**;
- **dados pessoais** de outras pessoas;
- arquivos de configuração com credenciais.

E um detalhe que pega muita gente: apagar o arquivo depois **não resolve**. O Git guarda o
histórico — a chave continua acessível em commits antigos. Se acontecer, a chave precisa ser
**revogada e trocada**, não apenas apagada.

Para evitar, existe o **`.gitignore`**: um arquivo listando o que não deve ser enviado. Nele
entram arquivos gerados pela compilação, configurações locais e qualquer coisa com segredo.

## O README

O **README** é o primeiro arquivo que alguém lê ao abrir o seu repositório. É a porta de entrada
do projeto — e um projeto excelente sem README parece incompleto.

Um bom README tem:

```markdown
# Nome do App

Uma frase dizendo o que o app faz.

## Sobre
O problema que ele resolve e para quem é.

## Funcionalidades
- Cadastro de itens
- Listagem com busca
- Armazenamento local

## Tecnologias
Java, Android, SQLite.

## Como rodar
1. Clonar o repositório
2. Abrir no Android Studio
3. Rodar em um emulador ou aparelho

## Capturas de tela
(imagens do app funcionando)

## Autor
Seu nome
```

O item mais esquecido e mais importante é o **"Como rodar"**. Sem ele, quem baixa o projeto não
consegue nem abrir.

## Manual de uso

O README é para **quem vai mexer no código**. O **manual de uso** é para **quem vai usar o app** —
e a linguagem muda completamente: nada de termos técnicos, e sim o passo a passo do usuário.

```
Como cadastrar um item
1. Toque no botão "Adicionar"
2. Preencha o nome e o valor
3. Toque em "Salvar cadastro"
4. O item aparece na lista da tela inicial
```

Se possível, com capturas de tela indicando onde tocar.

## Portfólio

Aqui está o ponto que conecta tudo isso com o seu futuro: **um repositório bem organizado é
portfólio**.

Quem contrata na área de tecnologia olha o GitHub. E o que impressiona não é a quantidade de
projetos, e sim:

- o **README** explicando bem o projeto;
- o **histórico de commits** com mensagens claras, mostrando evolução;
- o **código organizado** (a aula de qualidade de código);
- as **capturas de tela** mostrando o app funcionando.

Um projeto bem apresentado vale mais que cinco projetos jogados sem explicação.

## Atividade

Esta aula é de **produção de documentação**. Escreva de verdade — é entrega do trimestre.

**Passo 1.** Escreva o **README completo** do seu projeto, seguindo a estrutura acima. Capriche
especialmente no "Como rodar".

**Passo 2.** Escreva o **manual de uso**, com o passo a passo das duas ou três ações principais do
app, em linguagem de usuário.

**Passo 3.** Faça a **auditoria do repositório**: existe alguma senha, chave ou dado pessoal
versionado? Se sim, anote para remover e trocar.

**Passo 4.** Revise as suas **mensagens de commit**. Se estiverem no estilo "alteracoes", escreva
como elas deveriam ter sido — o exercício de reescrever ensina o hábito.

**Passo 5.** Liste as **capturas de tela** que você vai colocar no README, escolhendo as que
melhor mostram o app funcionando.

## Desafio extra

1. Procure no GitHub um projeto Android popular e analise o README. O que ele tem que o seu não
   tem?
2. Escreva a seção "Limitações e melhorias futuras" do seu projeto — reconhecer o que ficou de
   fora demonstra maturidade.
3. Peça a um colega para ler o seu README e tentar rodar o projeto seguindo só as suas
   instruções. Onde ele travou? Foi ali que faltou explicação.
