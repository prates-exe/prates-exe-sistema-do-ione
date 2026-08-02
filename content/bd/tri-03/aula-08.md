---
titulo: "Projeto integrador 1: planejamento e modelagem"
mes_numero: 3
numero_sequencial: 20
duracao_minutos: 25
tipo_sandbox: sql
publicado: true
exercicio_inicial: |
  -- Projeto Integrador — Parte 1: MODELAGEM
  -- Sistema de uma videolocadora de jogos.
  -- Nesta aula voce escreve o modelo como COMENTARIO e cria so o esqueleto.
  --
  -- Escreva abaixo, em comentarios, as entidades e os atributos que voce
  -- identificou. Depois crie a tabela de clientes para comecar.
criterios_validacao:
  - descricao: "Criar a tabela loc_clientes com os atributos essenciais"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('loc_clientes') WHERE name IN ('id','nome','telefone','cidade')) = 4"
    dica: "CREATE TABLE loc_clientes (id INTEGER PRIMARY KEY, nome VARCHAR(100), telefone VARCHAR(20), cidade VARCHAR(60));"
  - descricao: "Criar a tabela loc_jogos"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('loc_jogos') WHERE name IN ('id','titulo','plataforma','valor_diaria')) = 4"
    dica: "CREATE TABLE loc_jogos (id INTEGER PRIMARY KEY, titulo VARCHAR(120), plataforma VARCHAR(40), valor_diaria INT);"
  - descricao: "A chave primária de loc_clientes deve estar declarada"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('loc_clientes') WHERE pk = 1)"
    dica: "Não esqueça do PRIMARY KEY na coluna id."
  - descricao: "A chave primária de loc_jogos deve estar declarada"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('loc_jogos') WHERE pk = 1)"
    dica: "Toda tabela precisa de uma identidade — não esqueça do PRIMARY KEY."
quiz:
  titulo: "Quiz — Modelagem"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual é a primeira etapa ao construir um banco de dados?"
      opcoes:
        - { id: a, texto: "Modelar: identificar as entidades, os atributos e os relacionamentos" }
        - { id: b, texto: "Escrever os INSERT" }
        - { id: c, texto: "Criar as views" }
        - { id: d, texto: "Fazer o backup" }
      resposta_correta: a
      explicacao: "Consertar um modelo ruim depois que já há dados é muito mais caro que planejar antes."
    - id: q2
      tipo: multipla_escolha
      enunciado: "O que é uma entidade na modelagem?"
      opcoes:
        - { id: a, texto: "Um assunto sobre o qual o sistema precisa guardar informação, que vira uma tabela" }
        - { id: b, texto: "Uma coluna da tabela" }
        - { id: c, texto: "Um valor específico" }
        - { id: d, texto: "Uma consulta salva" }
      resposta_correta: a
      explicacao: "Clientes, jogos e locações são entidades — cada uma vira uma tabela."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Como identificar entidades a partir da descrição de um sistema?"
      opcoes:
        - { id: a, texto: "Procurando os substantivos importantes: cliente, jogo, locação" }
        - { id: b, texto: "Procurando os verbos" }
        - { id: c, texto: "Contando as palavras" }
        - { id: d, texto: "Não há método, é chute" }
      resposta_correta: a
      explicacao: "Substantivos tendem a virar tabelas; o que os descreve vira coluna."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Um cliente aluga vários jogos e um jogo é alugado por vários clientes. Qual a cardinalidade?"
      opcoes:
        - { id: a, texto: "N:M, exigindo uma tabela associativa de locações" }
        - { id: b, texto: "1:1" }
        - { id: c, texto: "1:N com FK em clientes" }
        - { id: d, texto: "Não há relacionamento" }
      resposta_correta: a
      explicacao: "Muitos dos dois lados sempre pede a terceira tabela."
    - id: q5
      tipo: multipla_escolha
      enunciado: "A data da locação e a data de devolução ficam em qual tabela?"
      opcoes:
        - { id: a, texto: "Na tabela de locações, porque são dados da relação entre cliente e jogo" }
        - { id: b, texto: "Na tabela de clientes" }
        - { id: c, texto: "Na tabela de jogos" }
        - { id: d, texto: "Em nenhuma" }
      resposta_correta: a
      explicacao: "O cliente não tem 'uma data'; a locação é que tem."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que o valor da diária fica na tabela de jogos, e não na de locações?"
      opcoes:
        - { id: a, texto: "Porque é uma característica do jogo, que vale para todas as locações dele" }
        - { id: b, texto: "Porque locações não podem ter colunas" }
        - { id: c, texto: "Por acaso, tanto faz" }
        - { id: d, texto: "Porque valores só ficam na primeira tabela" }
      resposta_correta: a
      explicacao: "Colocar na locação repetiria o mesmo valor em toda locação daquele jogo — redundância."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que é um atributo multivalorado e como resolvê-lo?"
      opcoes:
        - { id: a, texto: "Um dado que aceita vários valores, como telefones; resolve-se com uma tabela separada" }
        - { id: b, texto: "Um dado que não pode ser guardado" }
        - { id: c, texto: "Uma coluna com nome comprido" }
        - { id: d, texto: "Uma chave primária dupla" }
      resposta_correta: a
      explicacao: "Cada valor vira uma linha, nunca uma lista dentro de um campo."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que vale a pena escrever o modelo antes de sair criando tabelas?"
      opcoes:
        - { id: a, texto: "Porque mudar o modelo no papel é barato; mudar depois, com dados dentro, é caro" }
        - { id: b, texto: "Porque é exigência do SQL" }
        - { id: c, texto: "Porque deixa o banco mais rápido" }
        - { id: d, texto: "Não vale a pena" }
      resposta_correta: a
      explicacao: "Dez minutos de planejamento economizam horas de retrabalho."
---

## O projeto que fecha o ano

As próximas cinco aulas formam um **projeto único**, do zero ao relatório final. Ao terminar, você
terá um banco de dados completo, documentado e apresentável — exatamente o tipo de trabalho que se
mostra em um portfólio.

**O cenário:** uma **videolocadora de jogos**. Ela empresta jogos para clientes, cobra por dia de
aluguel e precisa controlar tudo.

Nesta primeira parte não vamos correr para o teclado. Vamos **modelar**.

## Por que modelar antes

Mudar o modelo **no papel** custa cinco minutos. Mudar depois, com centenas de registros dentro,
significa migrar dados, corrigir consultas e arriscar perder informação.

É a etapa que mais economiza tempo — e a que mais se pula.

## Passo 1: encontrar as entidades

Leia a descrição do sistema e **procure os substantivos importantes**:

> "A locadora empresta **jogos** para **clientes**. Cada **locação** registra qual cliente levou
> qual jogo, em que data, e quando devolveu."

Três substantivos se destacam: **cliente**, **jogo** e **locação**. Cada um é uma **entidade** — e
cada entidade vira uma **tabela**.

## Passo 2: definir os atributos

Para cada entidade, pergunte: *"o que preciso saber sobre isso?"*

**Cliente:** nome, telefone, cidade.
**Jogo:** título, plataforma, valor da diária.
**Locação:** qual cliente, qual jogo, data da locação, data da devolução.

Note que os atributos de cliente e jogo são **características próprias**. Já os de locação
descrevem um **acontecimento**.

## Passo 3: decidir onde cada dado mora

Esta é a parte que exige raciocínio. Duas perguntas frequentes:

**Por que o valor da diária fica em `jogos` e não em `locações`?**
Porque é uma característica **do jogo** — vale para todas as locações dele. Se ficasse na locação,
o mesmo valor seria repetido em cada aluguel daquele jogo: redundância, o problema da Aula 11 do
trimestre passado.

**Por que a data fica em `locações` e não em `clientes`?**
Porque o cliente não tem "uma data" — ele tem várias locações, cada uma em um dia. A data pertence
**ao acontecimento**.

A regra geral: **o dado mora onde ele não se repete**.

## Passo 4: definir a cardinalidade

Um cliente aluga **vários** jogos. Um jogo é alugado por **vários** clientes.

Muitos dos dois lados = **N:M**, e você já sabe: isso exige uma **tabela associativa**. É
exatamente o papel da tabela `locacoes`, que também guarda os dados da relação (as datas).

## O modelo final

```
loc_clientes                loc_locacoes                 loc_jogos
------------                ------------                 ---------
id (PK)          <--------- cliente_id (FK)
nome                        jogo_id (FK)      ---------> id (PK)
telefone                    data_locacao                 titulo
cidade                      data_devolucao               plataforma
                            id (PK)                      valor_diaria
```

Repare que a tabela do meio tem as **duas** chaves estrangeiras e os dados que pertencem à relação.

## Atributos multivalorados

E se um cliente tiver **dois telefones**? Não coloque `"99999-1111, 98888-2222"` em um campo só —
isso quebra a 1ª Forma Normal e impede qualquer busca.

A solução, como sempre: **uma tabela separada** de telefones, com FK para o cliente. Cada número
vira uma **linha**.

## Atividade

Nesta aula você **planeja e começa a estrutura**.

**Passo 1.** No terminal, escreva **em comentários** (usando `--`) o seu modelo: as três entidades,
os atributos de cada uma e a cardinalidade entre elas. Escrever isso com as próprias palavras é
o que fixa o raciocínio.

**Passo 2.** Crie a tabela `loc_clientes` com `id` (PK), `nome`, `telefone` e `cidade`. Aplique as
boas práticas da aula anterior: indentação, palavras-chave em maiúsculo e nomes claros.

**Passo 3.** Crie a tabela `loc_jogos` com `id` (PK), `titulo`, `plataforma` e `valor_diaria`.

**Passo 4.** Confirme que as duas foram criadas corretamente:

```sql
SELECT * FROM loc_clientes;
SELECT * FROM loc_jogos;
```

As duas devem aparecer **vazias** — a estrutura existe, os dados vêm na próxima aula.

A tabela `loc_locacoes`, que liga as duas, fica para a Parte 2. Assim você vê o modelo sendo
construído por camadas, como acontece de verdade.

## Desafio extra

1. Escreva em comentários **quais perguntas** você quer que esse banco responda no final. Por
   exemplo: "quem mais alugou?", "qual jogo dá mais receita?". Ter as perguntas antes ajuda a
   conferir se o modelo dá conta.
2. Modele (em comentários) a tabela de **telefones** para resolver o caso do cliente com vários
   números.
3. Pense: se a locadora quisesse registrar o **estado de conservação** de cada cópia do jogo, o
   modelo mudaria? Uma cópia é a mesma coisa que um título?
