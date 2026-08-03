# Colocando o Bitlab no ar

Guia passo a passo para publicar o site na internet, de forma que os alunos acessem de qualquer
lugar. Todo o processo usa serviços com plano gratuito.

## O que você vai precisar

- A conta do **Supabase** que já existe (banco de dados e login dos alunos).
- Uma conta no **GitHub** (para guardar o código).
- Uma conta na **Vercel** (para hospedar o site).

As contas do GitHub e da Vercel precisam ser criadas por você — basta o seu e-mail, e as duas
têm plano gratuito suficiente para este projeto.

---

## Etapa 1 — Enviar o código para o GitHub

O código hoje está apenas no seu computador. A Vercel publica a partir do GitHub.

1. Acesse **github.com** e crie uma conta (ou entre na sua).
2. Clique em **New repository**.
3. Nome sugerido: `bitlab`.
4. Marque o repositório como **Private** (particular). Isso é importante: assim o código não fica
   público.
5. **Não** marque nenhuma opção de inicialização (README, .gitignore, licença).
6. Clique em **Create repository**.

Depois, no seu computador, dentro da pasta do projeto, rode os comandos que o GitHub mostra na
tela. Eles serão parecidos com estes:

```bash
git add .
git commit -m "Bitlab - versao inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/bitlab.git
git push -u origin main
```

**Antes de rodar**, confira uma coisa importante: o arquivo `.env.local`, que contém as senhas de
acesso ao banco, **não pode** ir para o GitHub. Ele já está protegido pelo `.gitignore`, mas vale
conferir com:

```bash
git status
```

Se `.env.local` aparecer na lista, **pare** e me avise antes de continuar.

---

## Etapa 2 — Publicar na Vercel

1. Acesse **vercel.com** e crie a conta usando **Continue with GitHub** (assim as duas já ficam
   conectadas).
2. Clique em **Add New... → Project**.
3. Encontre o repositório `bitlab` e clique em **Import**.
4. A Vercel reconhece sozinha que é um projeto Next.js — não mude as configurações de build.

### Configurar as variáveis de ambiente

Ainda na tela de importação, abra **Environment Variables** e cadastre as três variáveis que estão
no seu arquivo `.env.local`:

| Nome | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | copie do seu `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | copie do seu `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | copie do seu `.env.local` |

Copie e cole exatamente como estão, sem espaços sobrando.

A terceira (`SUPABASE_SERVICE_ROLE_KEY`) é a mais sensível: ela dá acesso total ao banco. Ela só é
usada no servidor, nunca chega ao navegador do aluno — mas nunca a compartilhe com ninguém.

### Escolher a região do servidor

Este passo faz diferença real na velocidade.

1. Vá em **Settings → Functions**.
2. Em **Function Region**, escolha **São Paulo, Brazil (gru1)**.

O motivo: o seu banco de dados no Supabase está em São Paulo. Se o site rodar em outro continente,
cada página precisa atravessar o oceano duas vezes para buscar os dados, e a navegação fica
visivelmente lenta.

5. Clique em **Deploy** e aguarde alguns minutos.

Ao final, a Vercel mostra o endereço do site, algo como:

```
https://bitlab.vercel.app
```

**Esse é o endereço que os alunos vão usar.** Me avise qual ficou, que eu gero de novo as listas
de acesso já com ele impresso.

---

## Etapa 3 — Conferir se está tudo funcionando

Abra o endereço e teste:

1. A tela de login aparece.
2. Entre com a sua conta de professora — o painel deve abrir.
3. Entre com a conta de um aluno (use uma das listas) — as aulas devem aparecer.
4. Abra uma aula de Banco de Dados e rode um comando no terminal SQL.
5. Recarregue a página e confirme que o que foi digitado continua lá.

---

## Sobre o plano gratuito do Supabase

Um ponto importante para você saber de antemão: **projetos gratuitos do Supabase são pausados
automaticamente após cerca de 7 dias sem nenhum acesso**.

Na prática, durante o período letivo isso não deve acontecer, porque os alunos acessam toda
semana. Mas em férias longas o projeto pode pausar.

Se isso ocorrer, o site vai mostrar erro ao entrar. A solução é simples: acesse o painel do
Supabase e clique em **Restore project**. Os dados **não são perdidos** — o projeto apenas
"dorme".

Recomendação: no fim de cada período de férias, entre no site uma vez antes da primeira aula, para
garantir que está no ar.

---

## Atualizando o site depois

Sempre que houver conteúdo novo ou correções, o caminho é:

```bash
git add .
git commit -m "descricao do que mudou"
git push
```

A Vercel detecta o envio e **republica sozinha**, em poucos minutos. Não é preciso mexer em mais
nada.

Se o conteúdo das aulas mudar, também é preciso rodar o `npm run seed` uma vez (do seu
computador), que é o que grava as aulas no banco.

---

## Endereço personalizado (opcional)

Se a escola tiver um domínio próprio, dá para usar um endereço como
`sistema.nomedaescola.com.br` em vez do `.vercel.app`:

1. Na Vercel, vá em **Settings → Domains**.
2. Adicione o domínio desejado.
3. A Vercel mostra os registros de DNS que precisam ser configurados — normalmente quem
   administra o site da escola faz isso.

Não é obrigatório: o endereço `.vercel.app` funciona perfeitamente e é gratuito.

---

## Migrações do banco

Todas as alterações de estrutura do banco ficam em `supabase/migrations/`, numeradas em ordem.
Elas já foram aplicadas ao seu projeto. Se algum dia você precisar recriar o banco do zero, basta
rodá-las em ordem no **SQL Editor** do Supabase, da 0001 até a última.

---

## Custos

| Serviço | Plano | Custo |
|---|---|---|
| GitHub | gratuito | R$ 0 |
| Vercel | Hobby | R$ 0 |
| Supabase | Free | R$ 0 |
| Execução de Java | serviços públicos gratuitos | R$ 0 |

O projeto inteiro roda sem custo. A única ressalva é a execução de código Java, que depende de
serviços públicos de terceiros (Wandbox e Compiler Explorer). O sistema alterna automaticamente
entre os dois quando um fica fora do ar, mas nenhum deles oferece garantia de disponibilidade. Se
os dois caírem ao mesmo tempo, os exercícios de Java ficam temporariamente indisponíveis — os de
Banco de Dados continuam funcionando normalmente, porque rodam dentro do próprio navegador.
