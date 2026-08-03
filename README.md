# Bitlab

Plataforma de ensino para as turmas de **Banco de Dados** e **Desenvolvimento de
Aplicativos** do curso técnico. O aluno entra com login próprio, lê o material da aula,
resolve um desafio prático **dentro do navegador** e responde um quiz. O professor
acompanha quem fez o quê.

A parte prática é o motivo de o projeto existir. Os computadores do laboratório da escola
não aguentam o Android Studio — uma aula de 50 minutos virava dez minutos só para abrir um
arquivo. Aqui o aluno escreve SQL e monta telas de Android sem instalar nada: tudo roda no
navegador ou em serviços gratuitos.

## O que o aluno faz

- **Banco de Dados**: um terminal SQL de verdade, com um banco SQLite pessoal que ele
  carrega de aula em aula. As tabelas criadas na aula 3 continuam lá na aula 9. Erros de
  sintaxe são traduzidos para português apontando o trecho com problema.
- **Desenvolvimento de Aplicativos**: um editor de layout XML com **prévia da tela do
  celular ao vivo** e arrastar-e-soltar de componentes, mais um editor Java onde ele
  escreve a `MainActivity`. Ao executar, o app é simulado e a prévia mostra o resultado
  dos cliques.
- **Prática livre**: as duas bancadas também existem soltas, sem aula e sem nota, para
  quem quiser brincar.
- **Quiz** por aula, corrigido no servidor. O aluno pode refazer quantas vezes quiser, e
  ao voltar para a aula encontra as respostas anteriores já marcadas.
- **Perfil e conquistas**: apelido, avatar, nível e troféus por aula concluída.

Uma aula só conta como concluída quando o aluno **passou no quiz e terminou o desafio** —
não basta um dos dois.

## O que o professor faz

- Cria turmas e contas de aluno (usuário e senha provisória gerados automaticamente).
- Acompanha, por turma, quantas aulas cada aluno concluiu, quantos quizzes passou e
  quantos desafios entregou.
- Consulta o currículo publicado de cada curso.

Não existe autocadastro: a única forma de criar um aluno é pelo painel do professor.

## Conteúdo já publicado

| Curso | 2º trimestre | 3º trimestre |
|---|---|---|
| Banco de Dados | 12 aulas | 13 aulas |
| Desenvolvimento de Aplicativos | 14 aulas | 14 aulas |

As aulas são arquivos Markdown em `content/`, versionados junto com o código. Cada uma tem
material, critérios de correção do desafio e um quiz de 8 perguntas.

## Instalação

Precisa de Node.js 20 ou mais novo.

### 1. Banco de dados (Supabase)

Crie um projeto gratuito em [supabase.com](https://supabase.com) — escolha a região
**São Paulo**, que é a mais perto e a que dá menos atraso nas consultas.

Em **Project Settings > API**, copie a *Project URL*, a *anon key* e a *service_role key*.
A última é secreta e nunca deve sair do servidor.

### 2. Variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Cole os três valores no arquivo. Ele já está no `.gitignore` e nunca vai para o
repositório.

### 3. Migrações

No painel do Supabase, em **SQL Editor > New query**, rode o conteúdo de cada arquivo de
`supabase/migrations/` **na ordem numérica**, do `0001` ao `0014`. Cada uma é escrita para
poder rodar mais de uma vez sem estragar nada.

### 4. Dependências e conta de professor

```bash
npm install
```

```bash
npm run create-professor -- "seu@email.com" "sua-senha" "Seu Nome"
```

### 5. Publicar o currículo

```bash
npm run seed
```

O script lê `content/` e grava as aulas e quizzes no banco. Rodar de novo atualiza o que
mudou sem duplicar nada, e despublica aulas cujo arquivo tenha sido apagado.

### 6. Rodar

```bash
npm run dev
```

## Colocar no ar

O passo a passo completo (GitHub, Vercel, região, variáveis de ambiente) está em
[DEPLOY.md](DEPLOY.md).

## Escrever uma aula nova

Crie `content/<bd|dam>/tri-0<2|3>/aula-NN.md` com um cabeçalho YAML seguido do material em
Markdown. O jeito mais rápido é copiar uma aula existente e trocar o conteúdo. Os campos
do cabeçalho estão documentados em [DOCUMENTATION.md](DOCUMENTATION.md#o-formato-de-uma-aula).
Depois rode `npm run seed`.

## Como isso tudo funciona por dentro

[DOCUMENTATION.md](DOCUMENTATION.md) explica a arquitetura e, principalmente, **por que**
cada decisão foi tomada — inclusive as alternativas que foram testadas e descartadas.

## Licença

Código livre para uso e adaptação por outras escolas e professores.
