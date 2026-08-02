---
titulo: "Telas e Views: ligando o layout ao código"
mes_numero: 2
numero_sequencial: 7
duracao_minutos: 25
tipo_sandbox: android
publicado: true
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/titulo"
          android:text="Mensagem aparece aqui" />

      <EditText
          android:id="@+id/campoNome"
          android:hint="Digite seu nome"
          android:text="Maria" />

      <Button
          android:id="@+id/btnSaudar"
          android:onClick="saudar"
          android:text="Saudar" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    public void saudar(View v) {
      // Passo 1: pegue o campoNome e o titulo com findViewById.

      // Passo 2: mude o texto do titulo para "Ola, " + o nome digitado.

    }
  }
criterios_validacao:
  - descricao: "O botão deve mudar o título para uma saudação com o nome digitado"
    contem: "titulo=Ola, Maria"
    dica: "EditText campoNome = findViewById(R.id.campoNome); TextView titulo = findViewById(R.id.titulo); titulo.setText(\"Ola, \" + campoNome.getText().toString());"
quiz:
  titulo: "Quiz — Telas e Views"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual arquivo define a estrutura visual (os componentes) de uma tela Android?"
      opcoes:
        - { id: a, texto: "O layout XML, como activity_main.xml" }
        - { id: b, texto: "O MainActivity.java" }
        - { id: c, texto: "O AndroidManifest.xml" }
        - { id: d, texto: "Nenhum, é tudo automático" }
      resposta_correta: a
      explicacao: "O XML define quais Views existem na tela e como estão organizadas."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Como o código Java encontra um componente do layout XML para controlá-lo?"
      opcoes:
        - { id: a, texto: "Usando findViewById, com o id definido no XML" }
        - { id: b, texto: "O código encontra sozinho, sem precisar de id" }
        - { id: c, texto: "Editando o AndroidManifest.xml" }
        - { id: d, texto: "Não é possível conectar XML e Java" }
      resposta_correta: a
      explicacao: "findViewById busca, pelo id declarado no android:id, a referência à View."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual componente permite que o usuário DIGITE um texto?"
      opcoes:
        - { id: a, texto: "EditText" }
        - { id: b, texto: "TextView" }
        - { id: c, texto: "Button" }
        - { id: d, texto: "LinearLayout" }
      resposta_correta: a
      explicacao: "TextView só exibe; EditText é o campo editável."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Para que serve o LinearLayout?"
      opcoes:
        - { id: a, texto: "É um contêiner que organiza as Views em linha ou em coluna" }
        - { id: b, texto: "É um botão especial" }
        - { id: c, texto: "É um campo de texto" }
        - { id: d, texto: "Serve para conectar com a internet" }
      resposta_correta: a
      explicacao: "Ele agrupa e posiciona os componentes; a direção vem do android:orientation."
    - id: q5
      tipo: multipla_escolha
      enunciado: "O que faz android:orientation=\"vertical\" em um LinearLayout?"
      opcoes:
        - { id: a, texto: "Empilha os componentes um embaixo do outro" }
        - { id: b, texto: "Coloca os componentes lado a lado" }
        - { id: c, texto: "Centraliza tudo na tela" }
        - { id: d, texto: "Deixa o texto em negrito" }
      resposta_correta: a
      explicacao: "vertical empilha; horizontal coloca lado a lado."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que o atributo android:onClick=\"saudar\" faz?"
      opcoes:
        - { id: a, texto: "Diz que, ao clicar no botão, o método saudar do MainActivity deve ser executado" }
        - { id: b, texto: "Muda o texto do botão para 'saudar'" }
        - { id: c, texto: "Cria uma variável chamada saudar" }
        - { id: d, texto: "Fecha o aplicativo" }
      resposta_correta: a
      explicacao: "É a ponte entre o clique na tela e o código Java."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Qual método lê o que o usuário digitou em um EditText?"
      opcoes:
        - { id: a, texto: "getText()" }
        - { id: b, texto: "setText()" }
        - { id: c, texto: "readText()" }
        - { id: d, texto: "findText()" }
      resposta_correta: a
      explicacao: "getText() lê o conteúdo; setText() escreve nele."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que acontece se o id usado no findViewById não existir no XML?"
      opcoes:
        - { id: a, texto: "Dá erro, porque o R.id daquele nome não foi gerado" }
        - { id: b, texto: "O Java cria a View automaticamente" }
        - { id: c, texto: "O aplicativo abre normalmente" }
        - { id: d, texto: "O XML é apagado" }
      resposta_correta: a
      explicacao: "O nome no Java precisa ser exatamente igual ao do android:id — inclusive maiúsculas e minúsculas."
---

## Do layout ao código

Até aqui você trabalhou a lógica em Java puro. Agora começa a parte visual: construir uma tela com
**Views** (os componentes visuais) e ligá-la ao código Java. É exatamente a mesma estrutura do
Android Studio, só que rodando aqui no site, direto no navegador.

Um aplicativo Android tem sempre **dois arquivos** trabalhando juntos:

| Arquivo | Responsável por |
|---|---|
| `activity_main.xml` | **como a tela é** — quais componentes existem e onde ficam |
| `MainActivity.java` | **o que a tela faz** — a lógica que reage às ações do usuário |

Essa separação é uma das ideias centrais do Android: o **visual** fica separado do
**comportamento**.

## As Views principais

- **`TextView`** — mostra um texto na tela. O usuário não pode editar.
- **`EditText`** — um campo onde o usuário **digita**.
- **`Button`** — um botão que, ao ser clicado, executa um método.
- **`LinearLayout`** — um **contêiner** que organiza os outros componentes em linha ou coluna.

O `LinearLayout` não aparece na tela: ele é a "caixa" que segura os outros. O atributo
`android:orientation` define a direção:

- `vertical` — empilha os componentes um embaixo do outro.
- `horizontal` — coloca lado a lado.

## Anatomia do XML

```xml
<LinearLayout
    android:orientation="vertical"
    android:layout_width="match_parent">

    <TextView
        android:id="@+id/titulo"
        android:text="Mensagem aparece aqui" />

    <EditText
        android:id="@+id/campoNome"
        android:hint="Digite seu nome" />

    <Button
        android:id="@+id/btnSaudar"
        android:onClick="saudar"
        android:text="Saudar" />

</LinearLayout>
```

Os atributos mais importantes:

- **`android:id="@+id/titulo"`** — dá um **nome** ao componente. É por esse nome que o Java vai
  encontrá-lo. O `@+id/` significa "crie um id novo com esse nome".
- **`android:text`** — o texto que aparece.
- **`android:hint`** — o texto cinza de dica, que some quando o usuário digita.
- **`android:onClick="saudar"`** — diz qual **método do Java** deve rodar quando o botão for
  clicado.
- **`android:layout_width="match_parent"`** — ocupa toda a largura disponível.

## A ponte: findViewById

Para controlar um componente pelo código, use `findViewById` com o id declarado no XML:

```java
TextView titulo = findViewById(R.id.titulo);
titulo.setText("Novo texto");
```

O `R.id.titulo` é gerado automaticamente a partir do `android:id="@+id/titulo"`. Se os nomes não
baterem exatamente (inclusive maiúsculas e minúsculas), dá erro.

Os dois métodos que você mais vai usar:

- **`getText()`** — **lê** o que está no componente.
- **`setText(...)`** — **escreve** um novo valor nele.

```java
EditText campoNome = findViewById(R.id.campoNome);
String nome = campoNome.getText().toString();
```

## Reagindo ao clique

No XML, o botão aponta para um método:

```xml
<Button android:onClick="saudar" />
```

E no Java esse método precisa existir, com exatamente essa assinatura:

```java
public void saudar(View v) {
  // roda quando o botão é clicado
}
```

O `View v` é o próprio componente que foi clicado. Mesmo que você não use, ele precisa estar ali.

## Os dois modos do terminal

No terminal abaixo você tem dois botões no topo:

- **Design** — abre a paleta de componentes. Você **arrasta** TextView, EditText e Button para
  dentro do celular, reordena arrastando e exclui o que estiver selecionado. Tudo que você faz
  ali **reescreve o XML sozinho**.
- **Testar** — a tela fica "viva": você digita nos campos e clica nos botões, e o seu código Java
  roda de verdade.

Você pode ir e voltar entre os dois a qualquer momento — é o mesmo vaivém entre "Design" e "Code"
do Android Studio.

## Atividade

O layout já vem pronto com um `TextView` (`titulo`), um `EditText` (`campoNome`) e um `Button`
(`btnSaudar`).

**Passo 1.** No arquivo `MainActivity.java`, dentro do método `saudar`, use `findViewById` para
pegar o `campoNome` e o `titulo`.

**Passo 2.** Mude o texto do `titulo` para `"Ola, "` seguido do nome digitado. Use
`campoNome.getText().toString()` para ler o campo.

**Passo 3.** Volte ao modo **Testar** e clique no botão "Saudar" na prévia. O título deve virar:

```
Ola, Maria
```

**Passo 4.** Ainda no modo Testar, apague "Maria" do campo, digite o **seu** nome e clique de
novo. A saudação deve mudar junto.

## Desafio extra

1. Entre no modo **Design** e arraste um novo `TextView` para a tela. Depois volte ao modo código
   e veja o XML que foi gerado sozinho.
2. Adicione um segundo botão chamado "Limpar", com `android:onClick="limpar"`, e escreva o método
   `limpar` que apaga o texto do título (`titulo.setText("")`).
3. Troque o `android:orientation` do `LinearLayout` de `vertical` para `horizontal` e veja os
   componentes irem para o lado. Qual dos dois fica melhor nesta tela?
