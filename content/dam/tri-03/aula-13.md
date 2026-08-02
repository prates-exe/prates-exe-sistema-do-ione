---
titulo: "Projeto final: revisão prática e ajustes"
mes_numero: 3
numero_sequencial: 27
duracao_minutos: 25
tipo_sandbox: android
publicado: true
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/tituloTela"
          android:text="Cadastro de produto" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    // Metodo auxiliar de validacao (aula 7)

    public void salvar(View v) {
      // Leia, valide, calcule e mostre o resultado.

    }
  }
criterios_validacao:
  - descricao: "Criar o campo de nome do produto (id campoNome)"
    contem: "campoNome="
    dica: "No modo Design arraste um EditText e ajuste o id para @+id/campoNome, com hint \"Nome do produto\"."
  - descricao: "Criar o campo de preço (id campoPreco)"
    contem: "campoPreco="
    dica: "Arraste outro EditText, id @+id/campoPreco, hint \"Preco em reais\"."
  - descricao: "Criar o botão que chama o método salvar (id btnSalvar)"
    contem: "btnSalvar=Salvar produto"
    dica: "Arraste um Button com id @+id/btnSalvar, texto \"Salvar produto\" e android:onClick=\"salvar\"."
  - descricao: "Criar o TextView de retorno (id retorno)"
    contem: "retorno="
    dica: "Arraste um TextView com id @+id/retorno e texto vazio."
  - descricao: "Validar: campo vazio deve gerar aviso claro, sem travar"
    contem: "retorno=Preencha o nome do produto"
    dica: "if (nome.isEmpty()) { retorno.setText(\"Preencha o nome do produto\"); return; }"
quiz:
  titulo: "Quiz — Revisão do projeto"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Qual é a sequência correta dentro de um método de clique?"
      opcoes:
        - { id: a, texto: "Ler os campos, validar, processar e mostrar o retorno" }
        - { id: b, texto: "Mostrar o retorno antes de ler os campos" }
        - { id: c, texto: "Processar antes de ler" }
        - { id: d, texto: "A ordem não importa" }
      resposta_correta: a
      explicacao: "Validar entre ler e processar evita a maior parte dos travamentos."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que validar ANTES de converter o texto em número?"
      opcoes:
        - { id: a, texto: "Porque evita a exceção antes que ela aconteça, em vez de só capturá-la" }
        - { id: b, texto: "Porque validar é mais rápido" }
        - { id: c, texto: "Não é preciso validar" }
        - { id: d, texto: "Porque o Android exige" }
      resposta_correta: a
      explicacao: "Validar e tratar são complementares, mas prevenir é melhor."
    - id: q3
      tipo: multipla_escolha
      enunciado: "O que o 'return' antecipado faz em um método de validação?"
      opcoes:
        - { id: a, texto: "Interrompe o método ali mesmo, impedindo que o restante rode com dados inválidos" }
        - { id: b, texto: "Reinicia o aplicativo" }
        - { id: c, texto: "Devolve o valor zero" }
        - { id: d, texto: "Não faz nada em métodos void" }
      resposta_correta: a
      explicacao: "É um padrão muito usado: valida, avisa e sai."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual mensagem de erro é melhor para um campo vazio?"
      opcoes:
        - { id: a, texto: "\"Preencha o nome do produto\"" }
        - { id: b, texto: "\"Erro\"" }
        - { id: c, texto: "\"NullPointerException\"" }
        - { id: d, texto: "Nenhuma mensagem" }
      resposta_correta: a
      explicacao: "Diz o que houve e o que fazer — a lição da aula de acessibilidade."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Ao revisar o projeto, o que verificar na interface?"
      opcoes:
        - { id: a, texto: "Rótulos claros, dicas nos campos, contraste adequado e retorno após as ações" }
        - { id: b, texto: "Apenas se as cores são bonitas" }
        - { id: c, texto: "Apenas o número de telas" }
        - { id: d, texto: "Nada, interface não se revisa" }
      resposta_correta: a
      explicacao: "É a lista das aulas 1 a 4 deste trimestre."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que testar os casos extremos antes de entregar?"
      opcoes:
        - { id: a, texto: "Porque é neles que o app quebra, e o usuário vai encontrá-los" }
        - { id: b, texto: "Para gastar tempo" }
        - { id: c, texto: "Porque o caminho feliz nunca funciona" }
        - { id: d, texto: "Não é necessário" }
      resposta_correta: a
      explicacao: "Campo vazio, texto onde se espera número, valor zero: sempre teste esses."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que caracteriza um projeto pronto para apresentar?"
      opcoes:
        - { id: a, texto: "Funciona, trata erros, tem interface clara, está documentado e foi testado" }
        - { id: b, texto: "Apenas compila sem erro" }
        - { id: c, texto: "Tem muitas telas" }
        - { id: d, texto: "Tem muitas linhas de código" }
      resposta_correta: a
      explicacao: "É a soma de tudo que você viu neste trimestre."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Qual é o melhor jeito de descobrir falhas antes da apresentação?"
      opcoes:
        - { id: a, texto: "Pedir a um colega que use o app sem instruções e observar onde ele trava" }
        - { id: b, texto: "Testar sozinho, do jeito que você sabe que funciona" }
        - { id: c, texto: "Não testar para não achar problemas" }
        - { id: d, texto: "Apenas ler o código" }
      resposta_correta: a
      explicacao: "É exatamente o objetivo dos testes cruzados previstos no planejamento."
---

## Juntando tudo antes da entrega

Esta aula é a revisão prática antes da avaliação e da apresentação. Aqui você aplica, em uma tela
só, **tudo o que aprendeu no trimestre**:

| Da aula | O que entra |
|---|---|
| 1 | rótulos claros e retorno ao usuário |
| 2 | layout que aproveita a largura |
| 3 | dicas nos campos e mensagens úteis de erro |
| 5 | testar os casos extremos |
| 7 | validação para não travar |
| 8 | código organizado e legível |

## O padrão que resolve quase tudo

Todo método de clique bem escrito segue a mesma sequência:

```java
public void salvar(View v) {
  // 1. LER
  EditText campoNome = findViewById(R.id.campoNome);
  String nome = campoNome.getText().toString();

  // 2. VALIDAR (e sair se algo estiver errado)
  if (nome.isEmpty()) {
    retorno.setText("Preencha o nome do produto");
    return;
  }

  // 3. PROCESSAR

  // 4. MOSTRAR
  retorno.setText("Produto salvo: " + nome);
}
```

O **`return`** dentro da validação é a peça central: ele **interrompe o método ali mesmo**,
impedindo que o resto rode com dados inválidos. Esse padrão — validar, avisar e sair — evita a
maior parte dos travamentos de app iniciante.

Repare também na ordem: **validar vem antes de processar**. Se você converter o texto em número
antes de conferir se ele existe, a exceção já aconteceu.

## A lista de verificação antes de entregar

Passe o seu projeto por esta lista. Cada item vem de uma aula do trimestre:

**Interface**
- [ ] Todos os campos têm dica (`hint`) ou rótulo?
- [ ] Os botões dizem o que fazem, em vez de "OK"?
- [ ] O contraste do texto está bom?
- [ ] Toda ação dá um retorno visível ao usuário?

**Robustez**
- [ ] O app aguenta campo vazio sem travar?
- [ ] Aguenta letra onde se espera número?
- [ ] Aguenta valor zero em divisões?
- [ ] Toda conversão de texto está protegida?

**Código**
- [ ] Os nomes de métodos e variáveis se explicam?
- [ ] Não há código duplicado óbvio?
- [ ] Os métodos têm uma responsabilidade cada?

**Entrega**
- [ ] O README explica o projeto e como rodar?
- [ ] O manual de uso está escrito?
- [ ] Não há senha ou chave no repositório?

## Atividade

Você vai construir, do zero, uma tela de cadastro de produto **com validação** — usando o modo
**Design** para montar e o Java para a lógica.

**Passo 1.** No modo **Design**, arraste um `EditText` e ajuste no XML para
`android:id="@+id/campoNome"`, com `android:hint="Nome do produto"`.

**Passo 2.** Arraste outro `EditText`: `@+id/campoPreco`, com `android:hint="Preco em reais"`.

**Passo 3.** Arraste um `Button`: `@+id/btnSalvar`, texto `Salvar produto`, com
`android:onClick="salvar"`.

**Passo 4.** Arraste um `TextView`: `@+id/retorno`, texto vazio.

**Passo 5.** No `MainActivity.java`, escreva o método `salvar` seguindo o padrão **ler → validar →
processar → mostrar**:

- Se o nome estiver **vazio**, mostre no retorno: `Preencha o nome do produto` e **saia com
  `return`**.
- Caso contrário, mostre uma confirmação com o nome do produto.

**Passo 6.** Teste os **dois caminhos** no modo Testar: clique com o campo vazio (deve avisar sem
travar) e depois preenchido (deve confirmar).

## Desafio extra

1. Valide também o preço: se estiver vazio ou não for número, avise sem travar. Use `try/catch`.
2. Aplique a lista de verificação inteira ao **seu projeto do trimestre** e anote o que precisa
   corrigir.
3. Peça a um colega para usar a sua tela **sem nenhuma instrução**. Onde ele hesitou? Foi ali que
   faltou clareza.
