# Sistema do Ione

Plataforma gratuita para acompanhar as turmas de **Desenvolvimento de Aplicativos (DAM)** e
**Banco de Dados (BD)**: cada aluno tem seu próprio login, cada aula tem material + quiz, e o
curso de Banco de Dados (todos os 6 meses) e os dois primeiros meses de DAM têm um terminal
embutido no navegador para praticar (SQL de um lado, Java do outro), com progresso salvo
automaticamente.

## O que já está pronto

- Login separado para professora (admin) e alunos, sem autocadastro — só a professora cria contas.
- Painel da professora: criar turmas, cadastrar alunos (usuário + senha provisória gerados
  automaticamente), ver o progresso de cada um.
- Terminal de SQL no navegador (roda 100% no seu computador, sem servidor — usa SQLite via
  WebAssembly), com apontamento de erro em português, mais um espaço de prática livre.
- Terminal de código Java (meses 1 e 2 de DAM), executado por um serviço gratuito externo
  (wandbox.org), com espaço de prática livre também.
- Quiz por aula, corrigido no servidor (o aluno nunca recebe o gabarito antes de responder).
- Currículo completo do **Mês 1** de BD (8 aulas) e do **Mês 1** de DAM (12 aulas), já escrito,
  pronto para revisar e publicar.

**Ainda falta**: o conteúdo dos meses 2 a 6 dos dois cursos (a estrutura para adicionar já existe
— veja "Adicionando mais aulas" abaixo).

## Passo a passo para colocar no ar (gratuito)

### 1. Crie um projeto no Supabase (banco de dados + login)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com).
2. Crie um novo projeto (escolha uma senha de banco de dados forte e guarde-a).
3. Em **Project Settings > API**, copie:
   - **Project URL**
   - **anon public key**
   - **service_role key** (fique atenta: essa chave é secreta, nunca compartilhe)

### 2. Configure as variáveis de ambiente

Copie `.env.local.example` para `.env.local` e cole os três valores do passo anterior.

### 3. Rode as migrações do banco

No Supabase, vá em **SQL Editor > New query** e rode, **nessa ordem**, o conteúdo de cada arquivo:

1. `supabase/migrations/0001_init_schema.sql`
2. `supabase/migrations/0002_rls_policies.sql`
3. `supabase/migrations/0003_seed_trilhas.sql`
4. `supabase/migrations/0004_sql_rascunho.sql`
5. `supabase/migrations/0005_eventos_admin.sql`

### 4. Instale as dependências e crie sua conta de professora

```bash
npm install
npm run create-professor -- "seu@email.com" "sua-senha" "Seu Nome"
```

Não existe cadastro público no sistema (por segurança) — esse comando cria a única conta que
entra como professora. Guarde o e-mail e a senha usados.

### 5. Publique o currículo do Mês 1

```bash
npm run seed
```

Isso lê os arquivos em `content/bd/mes-01` e `content/dam/mes-01` e publica as aulas e quizzes no
banco.

### 6. Rode localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000), entre com o e-mail/senha de professora,
crie uma turma e um aluno de teste.

### 7. Coloque online de graça (Vercel)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Importe este repositório.
3. Nas configurações do projeto na Vercel, adicione as mesmas três variáveis de ambiente do
   `.env.local`.
4. Em **Settings > Functions > Function Region**, escolha **São Paulo (gru1)** — como o banco de
   dados (Supabase) está nessa região, isso evita que cada consulta viaje até outro continente e
   volta, o que deixa a navegação bem mais rápida para os alunos.
5. Publique. O link gerado pela Vercel é o que os alunos vão usar para entrar.

## Adicionando mais aulas (meses 2 a 6)

Cada aula é um arquivo Markdown em `content/<bd|dam>/mes-XX/aula-YY.md`, com um cabeçalho no topo
(`titulo`, `mes_numero`, `semana_numero`, `numero_sequencial`, `tipo_sandbox`, `publicado`, e
opcionalmente `quiz`) seguido do material da aula. Use os arquivos do mês 1 como modelo. Depois de
criar os arquivos, rode `npm run seed` de novo — ele atualiza o que já existe e adiciona o que é
novo, sem duplicar nada.

## Avisos importantes

- O terminal de SQL usa **SQLite** (não é literalmente MySQL) — os comandos básicos que os alunos
  vão aprender (CREATE TABLE, INSERT, SELECT, JOIN etc.) são os mesmos, mas alguns recursos bem
  específicos do MySQL não existem aqui.
- O projeto gratuito do Supabase pausa depois de ~7 dias sem uso. Se isso acontecer, basta acessar
  o painel do Supabase para reativar — nenhum dado é perdido.
- A execução de código Java depende de um serviço público gratuito de terceiros (wandbox.org).
  Ele não tem garantia de disponibilidade — se ficar fora do ar, o sistema mostra uma mensagem de
  erro amigável e o resto da plataforma continua funcionando normalmente.
