---
titulo: "Material Design: refinando a interface"
mes_numero: 3
numero_sequencial: 15
duracao_minutos: 25
tipo_sandbox: android
publicado: false
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/titulo"
          android:text="cadastro" />

      <EditText
          android:id="@+id/campo"
          android:text="" />

      <Button
          android:id="@+id/btn"
          android:onClick="salvar"
          android:text="ok" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    public void salvar(View v) {
      // Mostre uma confirmacao clara no titulo.

    }
  }
criterios_validacao:
  - descricao: "Dar um título claro e bem escrito à tela"
    contem: "titulo=Cadastro de aluno"
    dica: "No XML, troque android:text=\"cadastro\" por \"Cadastro de aluno\" — com inicial maiúscula e sentido completo."
  - descricao: "Adicionar uma dica (hint) ao campo, em vez de deixá-lo sem indicação"
    contem: "campo="
    dica: "Adicione android:hint=\"Nome completo\" no EditText. O hint diz ao usuário o que preencher."
  - descricao: "Dar um rótulo de ação ao botão"
    contem: "btn=Salvar cadastro"
    dica: "Troque o texto do botão de \"ok\" para \"Salvar cadastro\" — rótulos devem dizer o que acontece."
  - descricao: "Dar retorno ao usuário depois da ação"
    contem: "titulo=Cadastro salvo"
    dica: "No método salvar, use titulo.setText(\"Cadastro salvo com sucesso\");"
quiz:
  titulo: "Quiz — Material Design"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é o Material Design?"
      opcoes:
        - { id: a, texto: "Um emulador de Android" }
        - { id: b, texto: "Um tipo de banco de dados" }
        - { id: c, texto: "Uma linguagem de programação" }
        - { id: d, texto: "Um conjunto de diretrizes de design da Google para criar interfaces consistentes" }
      resposta_correta: d
      explicacao: "São recomendações sobre espaçamento, cores, tipografia e comportamento dos componentes."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que seguir diretrizes de design em vez de inventar tudo do zero?"
      opcoes:
        - { id: a, texto: "Não há motivo real" }
        - { id: b, texto: "Porque deixa o app menor" }
        - { id: c, texto: "Porque o usuário já conhece esses padrões e aprende a usar o app mais rápido" }
        - { id: d, texto: "Porque é obrigatório para compilar" }
      resposta_correta: c
      explicacao: "Consistência reduz o esforço de aprendizado: o usuário reconhece o que cada coisa faz."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que é hierarquia visual?"
      opcoes:
        - { id: a, texto: "Ordenar os arquivos do projeto" }
        - { id: b, texto: "Organizar os elementos para que o mais importante seja percebido primeiro" }
        - { id: c, texto: "Usar apenas uma cor" }
        - { id: d, texto: "Colocar tudo do mesmo tamanho" }
      resposta_correta: b
      explicacao: "Título maior, ação principal em destaque, informação secundária menor."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual é o problema de um botão escrito apenas 'OK'?"
      opcoes:
        - { id: a, texto: "É muito comprido" }
        - { id: b, texto: "Nenhum problema" }
        - { id: c, texto: "Não diz o que vai acontecer ao ser tocado" }
        - { id: d, texto: "Não pode ser usado em Android" }
      resposta_correta: c
      explicacao: "Rótulos devem descrever a ação: 'Salvar cadastro', 'Enviar', 'Excluir conta'."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Para que serve o android:hint em um EditText?"
      opcoes:
        - { id: a, texto: "Mudar a cor do texto" }
        - { id: b, texto: "Bloquear a digitação" }
        - { id: c, texto: "Definir o valor final do campo" }
        - { id: d, texto: "Mostrar uma dica do que preencher, que some quando o usuário digita" }
      resposta_correta: d
      explicacao: "É a forma mais simples de orientar o usuário sem poluir a tela."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que dar retorno (feedback) depois de uma ação do usuário?"
      opcoes:
        - { id: a, texto: "Para deixar o app mais lento" }
        - { id: b, texto: "Por exigência do Android" }
        - { id: c, texto: "Porque sem confirmação a pessoa não sabe se deu certo e tende a repetir a ação" }
        - { id: d, texto: "Não é necessário" }
      resposta_correta: c
      explicacao: "Um simples 'Cadastro salvo' evita cliques repetidos e insegurança."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que o Material Design recomenda sobre espaçamento entre elementos?"
      opcoes:
        - { id: a, texto: "Não trata de espaçamento" }
        - { id: b, texto: "Usar espaçamentos consistentes, criando respiro entre os blocos de conteúdo" }
        - { id: c, texto: "Colar todos os elementos, sem espaço" }
        - { id: d, texto: "Espaçamentos aleatórios em cada tela" }
      resposta_correta: b
      explicacao: "Espaço em branco não é desperdício: é o que separa e organiza a informação."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual dessas mudanças MAIS melhora a usabilidade de uma tela de cadastro?"
      opcoes:
        - { id: a, texto: "Aumentar o número de cores" }
        - { id: b, texto: "Diminuir a fonte para caber mais coisa" }
        - { id: c, texto: "Remover todos os textos" }
        - { id: d, texto: "Rótulos claros, dicas nos campos e confirmação após salvar" }
      resposta_correta: d
      explicacao: "Clareza vence enfeite: o usuário precisa saber o que fazer e o que aconteceu."
---

## Começando o 3º trimestre

Nos trimestres anteriores você aprendeu a **fazer funcionar**. Agora o foco muda: vamos aprender a
fazer **bem feito**. Este trimestre é sobre qualidade — de interface, de código, de segurança — e
termina com o seu projeto pronto para apresentar.

A primeira etapa é o **refinamento da interface**.

## O que é o Material Design

O **Material Design** é o conjunto de diretrizes de design da Google para aplicativos Android. Ele
não é uma linguagem nem uma biblioteca obrigatória: são **recomendações** sobre espaçamento,
cores, tipografia, hierarquia e comportamento dos componentes.

Por que seguir? Porque o usuário **já conhece** esses padrões. Quando o seu app se comporta como
os outros que ele usa todo dia, ele aprende a usar o seu em segundos. Inventar tudo do zero
obriga a pessoa a decifrar a sua tela.

## Os quatro princípios que mais mudam uma tela

**1. Hierarquia visual.** O olho precisa saber onde pousar primeiro. O título é maior; a ação
principal tem destaque; a informação secundária é menor e mais discreta. Se tudo tem o mesmo peso,
nada tem destaque.

**2. Rótulos que descrevem a ação.** Compare:

| Ruim | Bom |
|---|---|
| `OK` | `Salvar cadastro` |
| `Enviar` (enviar o quê?) | `Enviar mensagem` |
| `Sim` | `Excluir conta` |

O usuário precisa saber **o que vai acontecer** antes de tocar.

**3. Dicas nos campos.** Um `EditText` vazio não diz nada. O `android:hint` mostra um texto cinza
que orienta e desaparece quando a pessoa começa a digitar:

```xml
<EditText
    android:id="@+id/campo"
    android:hint="Nome completo" />
```

**4. Retorno depois da ação.** Se o usuário toca em salvar e nada muda na tela, ele não sabe se
funcionou — e toca de novo, criando cadastro duplicado. Uma confirmação simples resolve:

```java
titulo.setText("Cadastro salvo com sucesso");
```

## Espaçamento: o que não está lá também comunica

Uma recomendação central do Material Design é o **espaçamento consistente**. Espaço em branco não
é desperdício — é o que separa blocos de conteúdo e deixa a tela respirável.

Uma tela com tudo colado parece um amontoado; a mesma tela com respiro entre os blocos parece
organizada, mesmo sem mudar nenhum conteúdo.

## Texto também é interface

Um detalhe que passa despercebido: **a escrita faz parte do design**. Compare a tela do exercício:

- `cadastro` — minúsculo, incompleto, parece rascunho.
- `Cadastro de aluno` — diz exatamente do que se trata.

Maiúscula inicial, sem abreviação desnecessária, com sentido completo. Isso custa zero e muda a
percepção de qualidade.

## Atividade

A tela do terminal está **de propósito mal feita**: título em minúsculo e vago, campo sem dica,
botão escrito "ok" e nenhuma confirmação ao salvar.

Sua tarefa é **refiná-la**.

**Passo 1.** No XML, mude o texto do título para `Cadastro de aluno`.

**Passo 2.** Adicione `android:hint="Nome completo"` ao campo.

**Passo 3.** Mude o texto do botão para `Salvar cadastro`.

**Passo 4.** No `MainActivity.java`, faça o método `salvar` mostrar a confirmação
`Cadastro salvo com sucesso` no título.

**Passo 5.** Volte ao modo **Testar**, digite um nome e clique no botão. Compare mentalmente com a
tela do começo: mesmos componentes, experiência completamente diferente.

## Desafio extra

1. Entre no modo **Design** e reordene os elementos pensando na hierarquia: o que a pessoa precisa
   ver primeiro?
2. Faça a confirmação incluir o nome digitado: `"Cadastro de Maria salvo"`. Isso é ainda mais
   claro que uma mensagem genérica.
3. Pegue um aplicativo que você usa todo dia e identifique nele os quatro princípios desta aula.
   Onde ele acerta? Onde ele erra?
