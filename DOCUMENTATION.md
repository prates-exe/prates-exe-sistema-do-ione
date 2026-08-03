# Bitlab — como funciona e por quê

Este documento é para quem vai mexer no código: eu daqui a seis meses, outro professor que
queira usar isto na escola dele, ou alguém curioso. Ele não repete o que o código já diz.
O que ele explica é **por que** cada peça é do jeito que é, e o que foi tentado antes de
chegar nela.

Índice:

1. [O problema que originou o projeto](#1-o-problema-que-originou-o-projeto)
2. [As escolhas de tecnologia](#2-as-escolhas-de-tecnologia)
3. [O terminal de SQL](#3-o-terminal-de-sql)
4. [O simulador de Android](#4-o-simulador-de-android)
5. [Correção automática dos desafios](#5-correção-automática-dos-desafios)
6. [Quiz e a regra de conclusão](#6-quiz-e-a-regra-de-conclusão)
7. [Salvamento automático](#7-salvamento-automático)
8. [Segurança](#8-segurança)
9. [Desempenho](#9-desempenho)
10. [O formato de uma aula](#o-formato-de-uma-aula)
11. [Limitações conhecidas](#11-limitações-conhecidas)

---

## 1. O problema que originou o projeto

Duas turmas de curso técnico, dois laboratórios, aulas de 50 minutos. O laboratório de
Desenvolvimento de Aplicativos tem computadores que não rodam o Android Studio em tempo
útil: abrir a IDE e criar um arquivo consumia dez minutos dos cinquenta. Na prática, os
alunos passavam a aula esperando barra de progresso.

Isso define quase tudo que vem depois. O requisito não era "fazer um site de aulas", era:
**o aluno precisa programar de verdade em um computador fraco, sem instalar nada.** Daí
saem três consequências que aparecem o tempo todo neste código:

- **O trabalho pesado tem que sair da máquina do aluno.** O que não puder sair, tem que ser
  leve o suficiente para caber num navegador em um PC velho.
- **Nada de instalação.** Se a solução exigir configurar algo no laboratório, ela morre no
  primeiro dia — quem administra aquelas máquinas não é o professor.
- **Custo zero.** Não há orçamento. Toda a plataforma roda em camadas gratuitas, e isso é
  uma restrição de projeto, não um detalhe.

Um requisito não-óbvio apareceu depois, no uso real: **o aluno perde a conexão, fecha a
aba, o computador trava.** Tudo que ele digita precisa sobreviver a isso. Boa parte da
complexidade do salvamento automático (seção 7) existe por causa disso.

## 2. As escolhas de tecnologia

### Next.js (App Router)

Um framework só cobrindo página, formulário e API significa um deploy só e um conjunto só
de regras de autenticação. A peça que mais pesou na escolha foram as **Server Actions**:
elas permitem que a correção do quiz aconteça no servidor sem precisar escrever uma rota
de API, um `fetch` e a serialização entre os dois. Menos código no caminho entre o clique
e o banco significa menos lugar para um erro de segurança se esconder.

Duas particularidades desta versão do Next.js que confundem quem chega:

- O que outros projetos chamam de `middleware.ts` aqui se chama **`src/proxy.ts`**, e
  exporta uma função `proxy()`. Mesmo comportamento, nome diferente.
- A documentação da versão instalada fica em `node_modules/next/dist/docs/`. Vale mais que
  qualquer tutorial da internet, porque a API mudou.

### Supabase

Postgres gerenciado, autenticação e controle de acesso por linha (RLS) na camada gratuita.
O que decidiu a escolha foi o **RLS**: a regra de "aluno só enxerga o que é dele" fica
escrita no banco, não na aplicação. Isso é qualitativamente diferente de checar permissão
no código, e a seção 8 explica por quê.

A região do projeto deve ser **São Paulo**. Com o banco em São Paulo e o site na Vercel
configurado para a mesma região (`gru1`), cada consulta é uma viagem curta. Com o banco
fora do Brasil, cada página do aluno somava centenas de milissegundos de ida e volta — foi
visível no laboratório.

### sql.js (SQLite compilado para WebAssembly)

O terminal de SQL roda **inteiramente no navegador do aluno**. Nenhum servidor de banco por
aluno conectado, nenhum custo, nenhuma fila. Vinte e sete alunos executando `SELECT` ao
mesmo tempo são vinte e sete navegadores trabalhando, e o servidor nem fica sabendo.

O preço é que o motor é SQLite, não MySQL. Para o que se ensina no 2º ano — `CREATE TABLE`,
`INSERT`, `SELECT`, `WHERE`, `JOIN`, chaves, agregações — a sintaxe é a mesma. As
diferenças aparecem em recursos que não entram no programa do curso. O motor está isolado
atrás de `src/lib/sqljs/engine.ts`, então trocar por PGlite (Postgres em WebAssembly) no
futuro mexe em um arquivo, não em toda a aplicação.

### CodeMirror 6, e não Monaco

A primeira versão usava o Monaco — o editor do VS Code. Ele é excelente e é o que se usa
por padrão quando se quer "um editor de código no navegador". Foi trocado porque **pesa
alguns megabytes** que o aluno precisa baixar antes de digitar a primeira letra. Numa rede
de escola, com trinta máquinas puxando ao mesmo tempo, isso é a diferença entre a aula
começar e a aula não começar.

O CodeMirror 6 é uma fração do tamanho, e o que ele entrega a menos (autocompletar
inteligente, análise de tipos) não faz falta para quem está escrevendo o primeiro `SELECT`
da vida.

### Wandbox, com Godbolt de reserva

Java precisa de um compilador de verdade, e um compilador de verdade não roda no navegador.
O código do aluno vai para o **Wandbox**, um serviço público e gratuito, sempre através de
uma rota do próprio servidor (`/api/executar-codigo`) — nunca direto do navegador, para
que a chamada externa possa ser limitada e auditada.

Depender de um serviço gratuito de terceiros é uma fragilidade conhecida, e ela se
concretizou: no meio do desenvolvimento o Wandbox começou a responder
`OCI runtime error: Resource temporarily unavailable` — com status HTTP 200, ou seja,
falhando sem parecer que falhou. Por isso `src/lib/execucao/client.ts` detecta essa resposta
específica e cai para o **Compiler Explorer (Godbolt)** automaticamente. O aluno não fica
sabendo que trocou de serviço.

Duas armadilhas que custaram caro e estão marcadas no código:

- Os dois serviços salvam o arquivo com um nome fixo, então a classe do aluno precisa ser
  `class Main` **sem `public`** — Java exige que uma classe pública tenha o mesmo nome do
  arquivo.
- A máquina do Godbolt roda sem locale UTF-8, e todo acento virava `?` na saída. A saída
  ficava `Ol? mundo`, o que para um aluno parece um erro dele. A correção é injetar uma
  classe `__Utf8` que troca a saída padrão por uma em UTF-8 antes de o programa começar.

Uma alternativa anterior, o Piston público, foi abandonada quando passou a exigir
autorização prévia em fevereiro de 2026.

## 3. O terminal de SQL

O aluno de Banco de Dados tem **um banco pessoal que atravessa o curso inteiro**. As
tabelas criadas na aula 3 continuam existindo na aula 9. Isso é deliberado: o banco vira o
caderno dele, e ele vê o próprio trabalho acumulando.

Tecnicamente, o banco SQLite é serializado (`db.export()`), convertido para base64 e
guardado na coluna `db_snapshot` de `sql_sandbox_state`, uma linha por aluno por curso.

Há uma segunda coluna, `rascunho`, e a separação entre as duas importa. O `db_snapshot` é o
banco **depois** de comandos executados com sucesso. O `rascunho` é o texto que está no
editor e **ainda não foi executado**. Sem essa separação, o aluno que digitasse metade de
um comando e trocasse de página perdia o que escreveu — o comando nunca rodou, então nunca
entrou no snapshot. Salvar as duas coisas separadamente resolve, e é o que faz o aluno
reabrir a aula exatamente onde parou.

Erros do SQLite são traduzidos em `src/lib/sqljs/errorParser.ts`. A mensagem original
(`near "SELCT": syntax error`) é verdadeira mas inútil para quem está começando; o parser
extrai o trecho problemático e monta uma frase em português apontando onde olhar.

## 4. O simulador de Android

Esta é a parte mais incomum do projeto e merece a explicação mais longa.

**O objetivo não é gerar um APK.** É que o aluno aprenda a estrutura real do Android —
layout em XML, `MainActivity` em Java, `findViewById`, `setOnClickListener` — e **veja na
tela o que está construindo**. Quando ele tiver um computador melhor, o Android Studio não
vai ser um mundo novo.

Funciona em duas metades:

**A prévia visual** (`AndroidPreview.tsx` + `layoutParser.ts`) roda inteira no navegador. O
XML do layout é lido com o `DOMParser` nativo e desenhado como HTML dentro de uma moldura
de celular. Como isso é instantâneo e local, o aluno vê a tela mudando enquanto digita. Tem
também paleta de componentes e arrastar-e-soltar, com o XML sendo reescrito a cada
alteração (`layoutWriter.ts`) — os dois modos editam a mesma fonte de verdade, então o
aluno pode arrastar e depois ajustar no código.

Detalhe que gerou um bug real: o `DOMParser` é rigoroso e rejeita o XML se faltar o
`xmlns:android`. O aluno que digitava um `<TextView>` "certo" via "XML inválido" sem
entender o motivo. Hoje o namespace é injetado automaticamente quando falta.

**A execução** (`stub.ts`) é o truque central. Não existe emulador de Android: o que existe
é um arquivo Java montado na hora contendo (a) classes falsas de `View`, `TextView`,
`EditText`, `Button`, `Activity`, `R` e `Bundle`, que imitam a API do Android o suficiente
para o código do aluno compilar sem alteração nenhuma, (b) a `MainActivity` **exatamente
como o aluno escreveu** e (c) um `main` que chama `onCreate`, dispara os cliques e imprime
o estado final das views como JSON precedido de `__ESTADO__`.

Esse arquivo vai para o mesmo compilador Java das aulas normais. A saída volta, o cliente
encontra a linha `__ESTADO__`, lê o JSON e atualiza a prévia. O resultado é que o aluno
escreve Android de verdade, roda, e vê o texto mudar no celular desenhado na tela — usando
só um compilador Java comum.

O `main` imprime o estado dentro de um `finally`: se o código do aluno lançar uma exceção
no meio, a prévia ainda mostra até onde deu certo, o que é mais informativo do que uma tela
em branco.

## 5. Correção automática dos desafios

Cada aula de Banco de Dados traz, no cabeçalho do arquivo, uma lista de `criterios_validacao`.
Cada critério tem uma descrição legível, **uma consulta SQL que devolve verdadeiro ou
falso**, e uma dica.

```yaml
criterios_validacao:
  - descricao: "Criar a tabela pedidos com a chave estrangeira cliente_id"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_table_info('pedidos') WHERE name='cliente_id')"
    dica: "CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INT, ...);"
```

A verificação roda no banco do próprio aluno, no navegador, e vira uma lista de itens
marcados. A escolha importante aqui é que o critério **checa o resultado, não o texto do
comando**. Comparar o SQL digitado com um gabarito reprovaria o aluno que chegou ao mesmo
lugar por outro caminho — e "existe mais de um jeito" é justamente uma das coisas que a
matéria ensina. Consultando `pragma_table_info` e `pragma_foreign_key_list`, o que se
verifica é o banco que ele construiu.

Todos os critérios do curso foram executados contra o sql.js real antes de publicar,
inclusive com tentativas erradas de propósito, para confirmar que reprovam o que deve ser
reprovado.

## 6. Quiz e a regra de conclusão

**O gabarito nunca chega ao navegador.** A tabela `quizzes` só é legível pelo professor via
RLS. O aluno recebe o quiz por uma Server Action (`src/lib/quiz/actions.ts`) que busca as
perguntas com a chave privilegiada do servidor e remove o campo da resposta correta antes
de devolver. A correção compara no servidor. Não adianta abrir o inspetor do navegador: a
resposta certa não está lá.

O aluno pode refazer o quiz quantas vezes quiser, e cada tentativa é gravada em
`quiz_tentativas`. Ao reabrir a aula, o formulário volta **com as respostas da última
tentativa já marcadas**, junto com o número de tentativas e a melhor nota. Antes disso a
página reabria em branco e o aluno achava que tinha perdido o que fez.

### A regra de conclusão mora no banco

Uma aula está concluída quando o aluno **passou no quiz E terminou o desafio**. Aula sem
desafio (`tipo_sandbox: none`) fecha só com o quiz.

Essa regra estava escrita em três lugares do código, com diferenças sutis entre eles, e o
resultado foi um bug que apareceu em sala: aulas ficavam marcadas como concluídas só com o
quiz, e o professor não conseguia saber quem tinha realmente feito o exercício.

A correção (`0014_regra_conclusao.sql`) foi tirar a regra do código e colocá-la em um
**gatilho do Postgres**. Agora `progresso_aulas.status` é sempre calculado pelo banco a
partir de `quiz_completo` e `exercicio_completo`, em qualquer caminho de escrita, inclusive
os que ainda não existem. O código da aplicação só marca fatos — "o quiz passou", "o
desafio foi entregue" — e nunca decide o status.

Vale registrar o padrão, porque ele se repete: **quando a mesma regra é implementada em
mais de um lugar, mais cedo ou mais tarde os lugares discordam.** Mover a regra para a
camada mais baixa que todos atravessam é o que impede isso.

## 7. Salvamento automático

O relato dos alunos foi direto: "sai da página, volta, e perdeu o que eu fiz".

A causa era o salvamento com atraso (*debounce*). Salvar a cada tecla digitada seria uma
tempestade de requisições, então o salvamento espera o aluno parar de digitar. O problema é
o que acontece **durante** essa espera: se ele clicasse em outra aula nesse intervalo, o
componente era destruído com o salvamento ainda agendado, e o texto ia junto.

`useAutosave.ts` resolve guardando o valor pendente em uma `ref` e gravando à força em três
momentos:

- `pagehide` — fechou a aba ou navegou para fora do site;
- `visibilitychange` para `hidden` — trocou de aba ou minimizou. Este é o gancho que
  funciona em celular, onde o navegador pode encerrar a página sem avisar de outro jeito;
- na limpeza do efeito — trocou de aula dentro do próprio site, que era exatamente o caso
  relatado.

O atraso também caiu de 2 segundos para 800 ms nos três terminais. A janela de perda ficou
menor, e como agora existe a gravação forçada, ela é fechada de qualquer jeito.

## 8. Segurança

O sistema guarda dados de adolescentes. A postura adotada foi coletar o mínimo possível e
não confiar em nada que venha do navegador.

### A autorização está no banco, não na tela

Toda tabela tem Row Level Security ligado, e as políticas comparam sempre com
`auth.uid()` — a identidade que o **banco** conhece, não um identificador enviado pelo
cliente.

Na prática: um aluno que edite o JavaScript da página para pedir o progresso de um colega
recebe zero linhas. Não porque a tela escondeu, mas porque o Postgres não devolveu. O
mesmo vale para trocar o identificador da aula na URL tentando ver o conteúdo de outra
turma — `is_membro_turma()` bloqueia na consulta.

Isso é a diferença entre esconder e proibir. Verificação feita só na interface é
decoração: quem controla o navegador controla a interface.

A checagem de papel (professor ou aluno) acontece em dois níveis: no `proxy.ts`, de forma
otimista, só para não renderizar uma página que a pessoa não vai poder usar; e em
`src/lib/auth/dal.ts`, de forma definitiva, junto do acesso aos dados. O próprio Next.js
recomenda não depender da camada de proxy para segurança, porque ela nem sempre roda no
caminho de toda requisição.

### Senhas

O código deste projeto **nunca vê uma senha**. A autenticação inteira é do Supabase Auth,
que guarda hash. Senhas de aluno são geradas com `crypto.randomBytes`, com 12 caracteres,
de um alfabeto sem os símbolos que se confundem à mão (`0`/`O`, `1`/`l`/`I`) — detalhe
banal que evita metade dos "professora, minha senha não funciona" quando a lista é
entregue impressa.

### Injeção

Nenhuma consulta ao Postgres é montada concatenando texto: tudo passa pelo cliente do
Supabase, que parametriza. O material das aulas é Markdown renderizado sem o plugin que
permitiria HTML embutido, então uma tag `<script>` num arquivo de aula apareceria como
texto. Não há `dangerouslySetInnerHTML` nem `eval` em lugar nenhum do código.

Sobre o terminal de SQL: ele **não** é um risco de injeção. O comando do aluno roda num
SQLite que existe só dentro do navegador dele, sem nenhuma ligação com o Postgres do
projeto. O que é salvo no servidor é o arquivo binário do banco, guardado como dado opaco —
nunca interpretado como SQL.

### CSRF

Toda ação que altera dados é Server Action, e Server Actions verificam a origem da
requisição automaticamente. O cenário clássico de CSRF já está coberto sem código extra.

### Limite de tentativas

`src/lib/rateLimit.ts`: 5 tentativas de login a cada 5 minutos por usuário, 10 execuções de
código por minuto por aluno. O segundo limite protege tanto o serviço externo quanto a
turma — um aluno em laço infinito não derruba a aula dos outros.

O estado fica em memória do processo. É honesto dizer que isso vale por instância: se o
site passar a rodar em várias, o limite efetivo fica maior que o configurado (nunca menor).
Para uma escola, uma instância, é o suficiente, e evitar uma dependência de Redis vale mais
do que a precisão extra.

### Dados pessoais e LGPD

De cada aluno o sistema guarda **nome completo e nome de usuário**. Nada de data de
nascimento, telefone, endereço, documento ou localização. Alunos não têm e-mail: o Supabase
Auth exige um, então é usado um domínio reservado pela RFC 2606 (`.invalid`) que nunca
resolve e não permite contato.

Um aviso para quem for adaptar o projeto: o domínio em
`src/lib/auth/constants.ts` faz parte do e-mail com que cada conta foi criada. **Trocar
aquele valor derruba o login de todo mundo já cadastrado.** Ele ficou com o nome antigo do
projeto de propósito.

A LGPD exige consentimento de responsável para dados de menores. Isso é responsabilidade da
escola, não do código — o que o código faz é reduzir ao mínimo o que existe para consentir.

O repositório também é auditado: nomes de aluno, senhas e listas impressas nunca entraram
no controle de versão. O `.gitignore` cobre `.env*`, `scratch-*` e `/turmas/`, e a
verificação foi feita sobre o histórico inteiro, não só sobre a versão atual.

## 9. Desempenho

O que foi feito e por quê:

- **Consultas agrupadas em funções do Postgres.** O painel do aluno precisava de uma
  dezena de consultas separadas, cada uma com sua ida e volta até São Paulo. As funções
  `aluno_dashboard`, `aluno_trilhas` e `trilha_do_aluno` fazem esse trabalho em uma
  chamada só. Em rede de escola, a soma das viagens pesava mais que o trabalho de fato.
- **Troca do Monaco pelo CodeMirror** (seção 2) — o maior ganho isolado, medido em
  megabytes que deixaram de ser baixados.
- **Região do banco e do site iguais** (São Paulo / `gru1`).
- **`getCurrentUser` memoizado por requisição** com o `cache` do React: a mesma página
  pergunta "quem é o usuário?" em vários pontos e isso custa uma leitura só.

## O formato de uma aula

Cada aula é um arquivo Markdown em `content/<bd|dam>/tri-0<2|3>/aula-NN.md`, com cabeçalho
YAML. As aulas são versionadas junto com o código de propósito: dá para ver o histórico de
uma aula, comparar versões e desfazer, o que um editor dentro do site não daria.

| Campo | Para que serve |
|---|---|
| `titulo` | Nome exibido na lista e no topo da aula |
| `mes_numero` | Trimestre (2 ou 3) — o nome do campo é herança da estrutura antiga |
| `numero_sequencial` | Ordem dentro do trimestre |
| `duracao_minutos` | Estimativa mostrada ao aluno |
| `tipo_sandbox` | `sql`, `code`, `android` ou `none` |
| `publicado` | `false` esconde a aula dos alunos sem apagar o arquivo |
| `exercicio_inicial` | Conteúdo que já vem no editor quando o aluno abre |
| `criterios_validacao` | Lista de checagens do desafio (seção 5) |
| `quiz` | Título, nota mínima e perguntas com gabarito |

`npm run seed` lê a pasta e grava no banco. Ele atualiza o que mudou, adiciona o que é novo
e **despublica aulas cujo arquivo foi apagado** — assim o disco é sempre a fonte da
verdade, e nunca sobra no banco uma aula fantasma que ninguém consegue mais editar.

## 11. Limitações conhecidas

Coisas que são assim de propósito, ou que ainda incomodam:

- **SQLite não é MySQL.** Cobre o programa do curso, mas não é literalmente o mesmo motor.
- **A execução de Java depende de serviço público de terceiros.** Há reserva automática
  (seção 2), mas se os dois caírem juntos, os desafios de Java param. O resto do site
  continua.
- **Erros de compilação do Java apontam a linha do arquivo montado, não a do editor do
  aluno.** Como o código dele é colado depois das classes de apoio, os números não batem, e
  o aluno recebe um erro sem saber onde olhar. É o próximo conserto da fila.
- **O limitador de tentativas é por instância** (explicado na seção 8).
- **O projeto gratuito do Supabase pausa depois de ~7 dias sem uso.** Não perde dado;
  precisa reativar pelo painel. Nas férias, vale entrar uma vez por semana.
- **Não há troca de senha pelo aluno.** Quem redefine é o professor. Foi uma escolha
  consciente para não construir fluxo de recuperação sem e-mail real, mas é uma falta.
- **Não há autenticação em duas etapas para a conta do professor.** O Supabase Auth
  suporta; vale ligar se o painel passar a guardar coisa mais sensível.
