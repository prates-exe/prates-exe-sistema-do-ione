# Sistema do Ione — Documentação Técnica

## 1. Visão geral

O Sistema do Ione é uma plataforma de ensino para dois cursos de seis meses:
Desenvolvimento de Aplicativos (DAM) e Banco de Dados (BD). Cada aluno tem uma conta
individual, criada pela professora. Cada aula tem material escrito, um quiz de múltipla
escolha corrigido no servidor e, quando aplicável, um terminal interativo executado no
navegador (SQL para o curso de Banco de Dados; Java para os dois primeiros meses de
Desenvolvimento de Aplicativos). O progresso de cada aluno é salvo automaticamente.

O sistema foi construído para rodar inteiramente sobre serviços com camada gratuita:
Next.js hospedado na Vercel e Supabase (Postgres, autenticação e armazenamento) como
banco de dados.

## 2. Arquitetura

| Camada | Tecnologia | Motivo da escolha |
|---|---|---|
| Front-end e back-end | Next.js 16 (App Router) | Um único framework cobre páginas, formulários com Server Actions e rotas de API, sem precisar de um servidor separado. |
| Banco de dados e autenticação | Supabase (Postgres gerenciado) | Camada gratuita suficiente para uma turma escolar; autenticação e controle de acesso por linha (RLS) resolvidos pela própria plataforma. |
| Terminal de SQL | sql.js (SQLite compilado para WebAssembly) | Roda inteiramente no navegador do aluno, sem custo de servidor por aluno conectado. |
| Editor de código | CodeMirror 6 | Editor leve com destaque de sintaxe e marcação de erros; escolhido no lugar do Monaco (usado por editores como o VS Code) por ser uma fração do tamanho em bytes transferidos ao navegador. |
| Execução de código Java | Wandbox (serviço público gratuito) | Compila e roda o código do aluno sem precisar manter um servidor de compilação próprio. Chamado sempre através de uma rota própria do servidor, nunca diretamente do navegador do aluno. |

### Estrutura de pastas relevantes

```
src/app/                    rotas (páginas e APIs)
src/components/             componentes de interface
src/lib/                     lógica de acesso a dados, autenticação e regras de negócio
supabase/migrations/         schema do banco de dados, em ordem de aplicação
content/                     material das aulas (Markdown) e respectivos quizzes
scripts/                     scripts de configuração inicial (seed, criação da professora)
```

### Fluxo de autenticação

Não existe cadastro público. A conta da professora é criada uma única vez por um script
de linha de comando (`npm run create-professor`). Alunos são criados pela professora
através do painel administrativo; cada aluno recebe um nome de usuário e uma senha
gerada automaticamente (12 caracteres aleatórios). Como alunos não têm e-mail real, o
sistema usa um domínio fictício reservado para esse fim (`aluno.sistema-ione.invalid`,
seguindo a RFC 2606, que nunca resolve de verdade) apenas para satisfazer o formato
exigido pelo mecanismo de autenticação — a tela de login pede "usuário", não e-mail.

## 3. Modelo de dados

As tabelas principais, na ordem em que aparecem nas migrações:

- `profiles` — espelha os usuários autenticados; guarda nome completo e papel (`professor` ou `aluno`).
- `trilhas` — os dois cursos (`dam`, `bd`).
- `modulos` — os seis meses de cada curso.
- `turmas` e `turma_membros` — turmas e a relação de quais alunos pertencem a cada uma.
- `aulas` — conteúdo de cada aula: material em Markdown, tipo de terminal (`sql`, `code` ou nenhum), status de publicação.
- `quizzes` e `quiz_tentativas` — perguntas (com gabarito) e as tentativas de cada aluno.
- `sql_sandbox_state` e `sql_query_history` — o banco de dados SQLite de cada aluno (serializado) e o histórico de comandos executados.
- `code_sandbox_state` e `code_playground_state` — o código Java de cada aluno, por aula e em modo de prática livre.
- `progresso_aulas` — status de progresso de cada aluno em cada aula (material visto, exercício concluído, quiz concluído).
- `eventos_admin` — log de auditoria de ações administrativas (criação e remoção de turmas e alunos).

Todas as tabelas têm Row Level Security (RLS) habilitado. As políticas de acesso estão
descritas na seção de segurança.

## 4. Funcionalidades

### Professora
- Criar e listar turmas, associadas a um dos dois cursos.
- Criar contas de alunos (usuário e senha gerados automaticamente) e vinculá-los a uma turma.
- Remover um aluno de uma turma.
- Consultar o currículo publicado de cada curso.
- Acompanhar, por turma, quantas aulas cada aluno concluiu e quantos quizzes foram aprovados.

### Aluno
- Ver as turmas em que está matriculado e a lista de aulas de cada uma, com status de progresso.
- Abrir uma aula: material em Markdown, terminal (quando aplicável) e quiz.
- No curso de Banco de Dados, um banco de dados SQLite persistente por aluno, que acumula as tabelas criadas ao longo do curso; erros de sintaxe são traduzidos para uma mensagem em português apontando o trecho do comando com problema.
- Nos dois primeiros meses de Desenvolvimento de Aplicativos, um editor de código Java por aula, com execução real do código.
- Espaços de prática livre para SQL e Java, sem relação com as atividades avaliadas.
- Responder quizzes; a nota é calculada no servidor e a aula é marcada como concluída quando a nota mínima é atingida.

## 5. Segurança

Esta seção responde, item por item, aos pontos de uma auditoria de segurança padrão.

### 5.1 Autenticação

- **Senhas nunca são armazenadas ou processadas pelo código deste projeto.** A
  autenticação é inteiramente delegada ao Supabase Auth, que armazena senhas com hash
  (bcrypt) — o código da aplicação nunca vê nem manipula uma senha em texto puro além do
  instante em que ela é digitada no formulário e enviada por HTTPS.
- Alunos recebem uma senha provisória gerada aleatoriamente (12 caracteres, gerados por
  `crypto.randomBytes`, não previsível). A professora escolhe a própria senha; recomenda-se
  que ela use uma senha forte, já que não há campo de validação de força de senha na
  interface do Supabase Auth para o fluxo usado aqui.
- **Autenticação em duas etapas (2FA/MFA)**: o Supabase Auth oferece suporte a MFA por
  aplicativo autenticador (TOTP). Não foi habilitada nesta versão. Recomenda-se ativá-la
  pelo menos para a conta da professora caso o painel administrativo passe a controlar
  informações mais sensíveis no futuro (ver seção 7).
- **Limite de tentativas de login**: implementado em `src/lib/rateLimit.ts` e aplicado em
  `src/lib/auth/actions.ts` — no máximo 5 tentativas a cada 5 minutos por usuário
  informado. O mesmo mecanismo limita a 10 execuções de código por minuto por aluno
  (`src/app/api/executar-codigo/route.ts`), para não sobrecarregar o serviço externo de
  execução nem permitir abuso.
- **Expiração de sessão**: os tokens de sessão emitidos pelo Supabase Auth expiram
  automaticamente (o padrão da plataforma é de uma hora, renovado de forma transparente
  enquanto o usuário estiver ativo). O botão "Sair" encerra a sessão explicitamente.

### 5.2 Autorização

Este é o ponto que a auditoria fornecida corretamente identifica como o mais crítico em
sistemas como este, e é tratado na camada mais próxima possível dos dados: o próprio
banco de dados, através de Row Level Security (RLS) do Postgres. Nenhuma regra de
autorização depende de checagem feita só na interface.

Cada tabela tem políticas que amarram o acesso ao usuário autenticado
(`auth.uid()`), não a um valor enviado pelo navegador:

- Um aluno só lê ou escreve linhas de progresso, banco de dados SQL e código onde
  `aluno_id = auth.uid()`. Mesmo que o código do navegador seja alterado para tentar
  enviar o identificador de outro aluno, o banco de dados rejeita a escrita e não
  retorna linhas de outra pessoa na leitura — a comparação é feita no servidor de banco
  de dados, não confia no que o cliente informou.
- Um aluno só vê aulas publicadas de uma trilha à qual pertence, através da função
  `is_membro_turma()`. Trocar o identificador da aula na URL para tentar acessar o
  conteúdo de outra turma ou de um curso diferente não funciona: a política
  `aulas_select_aluno_publicada` bloqueia no banco de dados, não apenas na interface.
- O gabarito dos quizzes (`quizzes.perguntas`, que inclui a resposta correta) nunca é
  lido diretamente pelo aluno: a tabela só permite leitura para o papel professor. O
  conteúdo do quiz chega ao aluno através de uma Server Action
  (`src/lib/quiz/actions.ts`) que busca a pergunta com uma chave de acesso privilegiada
  do servidor e remove o campo de resposta correta antes de devolver o resultado ao
  navegador. A correção também acontece no servidor, comparando a resposta enviada com o
  gabarito guardado no banco — o aluno nunca recebe a resposta certa antes de responder.
- Rotas e páginas administrativas verificam o papel do usuário (`professor`) tanto na
  camada de proxy (checagem otimista, evita renderizar a página) quanto na camada de
  dados (checagem definitiva, em `src/lib/auth/dal.ts`), seguindo a recomendação do
  próprio Next.js de nunca depender só da camada de proxy para segurança.

### 5.3 Validação de entrada

- O React escapa por padrão todo conteúdo exibido na tela; não há, em nenhum ponto do
  código, uso de `dangerouslySetInnerHTML`, `eval` ou construção dinâmica de código —
  isso foi verificado por busca em todo o código-fonte.
- O material das aulas é escrito em Markdown e renderizado com `react-markdown`, sem o
  plugin que permitiria HTML embutido (`rehype-raw`). Mesmo que um arquivo de aula
  contivesse uma tag `<script>`, ela apareceria como texto, não seria executada.
- Toda consulta ao banco de dados real (Postgres) passa pelo cliente oficial do
  Supabase, que usa parâmetros — em nenhum lugar do código o projeto concatena texto
  vindo do usuário para montar uma instrução SQL.
- **Sobre o terminal de SQL do aluno**: é importante deixar claro que ele não representa
  risco de injeção de SQL no sentido tradicional. O comando SQL escrito pelo aluno roda
  dentro de um banco de dados SQLite isolado, criado inteiramente dentro do navegador
  dele via WebAssembly (biblioteca sql.js). Esse banco de dados não tem nenhuma conexão
  com o Postgres real do projeto — o aluno só tem acesso de leitura e escrita ao próprio
  sandbox local, que depois é salvo como um arquivo binário opaco (não como texto SQL
  interpretado) na tabela `sql_sandbox_state`, sujeita às mesmas regras de RLS descritas
  acima.

### 5.4 CSRF (falsificação de requisição entre sites)

Todas as ações que alteram dados (login, criação de turma, criação de aluno, envio de
quiz etc.) são implementadas como Server Actions do Next.js, não como formulários HTML
tradicionais apontando para uma URL fixa. Server Actions do Next.js verificam
automaticamente a origem da requisição antes de executar, o que já cobre o cenário
clássico de CSRF sem necessidade de implementação adicional.

### 5.5 Dados pessoais e LGPD

Como o sistema lida com dados de estudantes, parte dos quais menores de idade, a
coleta de dados foi propositalmente mantida mínima:

- De cada aluno, o sistema guarda apenas **nome completo** e um **nome de usuário**
  (não é um e-mail real e não permite contato — o domínio usado é reservado e nunca
  resolve).
- Não são coletados data de nascimento, telefone, endereço, documento de identidade ou
  qualquer dado de geolocalização.
- Os dados ficam armazenados no banco de dados gerenciado pelo Supabase, protegidos
  pelas políticas de acesso descritas acima.

A LGPD (Lei Geral de Proteção de Dados) exige, para dados de crianças e adolescentes,
consentimento específico de um responsável legal e informação clara sobre a finalidade
da coleta. Isso é uma responsabilidade institucional da escola/professora, não algo que
o código por si só resolve — recomenda-se que a professora obtenha esse consentimento
(por exemplo, através de um termo assinado no início do curso) e mantenha um canal claro
para dúvidas dos responsáveis sobre os dados coletados.

### 5.6 Upload de arquivos

Não há, nesta versão, nenhuma funcionalidade de upload de arquivos (imagens, PDFs,
vídeos). Caso essa funcionalidade seja adicionada no futuro, ela deve validar o tipo
real do arquivo (não apenas a extensão), impor um limite de tamanho e armazenar os
arquivos fora de qualquer caminho executável pelo servidor.

### 5.7 Infraestrutura

- **HTTPS**: obrigatório e automático quando o projeto é publicado na Vercel; não há
  suporte a HTTP simples em produção.
- **Segredos**: a chave de acesso privilegiado do Supabase (service role / secret key)
  só é usada em código que roda no servidor (nunca enviada ao navegador) e fica
  armazenada em variáveis de ambiente (`.env.local`, explicitamente ignorado pelo
  controle de versão). Nenhuma chave ou segredo está escrito diretamente no
  código-fonte.
- **Logs de auditoria**: a tabela `eventos_admin` registra a criação de turmas, a
  criação de alunos e a remoção de alunos de uma turma, com o identificador da
  professora responsável e o horário — consultável diretamente no painel do Supabase.

## 6. Limitações conhecidas

- O terminal de SQL usa o motor SQLite, não MySQL. A sintaxe básica ensinada (criação de
  tabelas, inserção, consulta, junções) é equivalente, mas alguns recursos específicos do
  MySQL não têm equivalente aqui.
- A execução de código Java depende de um serviço público de terceiros (Wandbox), sem
  garantia contratual de disponibilidade. Uma falha nesse serviço não afeta o restante
  do sistema — o aluno recebe uma mensagem de erro e pode tentar novamente.
- O limitador de tentativas (login e execução de código) guarda o estado em memória do
  processo do servidor. Isso é suficiente para uma aplicação rodando em uma única
  instância; se o site crescer a ponto de rodar em várias instâncias simultâneas, o
  limite efetivo por usuário passa a ser maior (nunca menor) do que o configurado.
- O projeto gratuito do Supabase pausa automaticamente após aproximadamente sete dias
  sem uso; isso não causa perda de dados, apenas exige reativar o projeto pelo painel.

## 7. Trabalho futuro sugerido

- Autenticação em duas etapas (MFA) para a conta da professora.
- Fluxo de troca de senha para alunos, com invalidação de sessões anteriores ao trocar.
- Currículo completo dos meses 2 a 6 dos dois cursos (atualmente só o mês 1 está
  publicado em ambos).
- Termo de consentimento e política de privacidade formalizados pela escola.
