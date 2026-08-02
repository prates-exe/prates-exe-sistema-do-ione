---
titulo: "Projeto integrador: calculadora de IMC completa"
mes_numero: 2
numero_sequencial: 14
duracao_minutos: 25
tipo_sandbox: android
publicado: true
layout_inicial: |
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical"
      android:layout_width="match_parent">

      <TextView
          android:id="@+id/tituloApp"
          android:text="Calculadora de IMC" />

  </LinearLayout>
exercicio_inicial: |
  class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
      setContentView(R.layout.activity_main);
    }

    // Metodo auxiliar: calcula o IMC (use o que aprendeu na Aula 13)

    // Metodo auxiliar: classifica o IMC e devolve o texto da categoria

    public void calcular(View v) {
      // Leia peso e altura, calcule, classifique e mostre no resultado.

    }
  }
criterios_validacao:
  - descricao: "Criar o campo de peso (id campoPeso)"
    contem: "campoPeso="
    dica: "No modo Design, arraste um EditText e ajuste o id para @+id/campoPeso, com hint \"Peso em kg\" e text \"70\"."
  - descricao: "Criar o campo de altura (id campoAltura)"
    contem: "campoAltura="
    dica: "Arraste outro EditText, id @+id/campoAltura, hint \"Altura em metros\" e text \"1.75\"."
  - descricao: "Criar o botão que chama o método calcular (id btnCalcular)"
    contem: "btnCalcular="
    dica: "Arraste um Button com id @+id/btnCalcular, texto \"Calcular\" e android:onClick=\"calcular\"."
  - descricao: "Criar o TextView de resultado (id resultado)"
    contem: "resultado="
    dica: "Arraste um TextView com id @+id/resultado e texto vazio."
  - descricao: "Ao clicar, mostrar o IMC calculado (22.8 para 70kg e 1.75m)"
    contem: "resultado=IMC: 22.8"
    dica: "double imc = peso / (altura * altura); e resultado.setText(\"IMC: \" + imc + ...);"
  - descricao: "Mostrar também a classificação (Peso normal)"
    contem: "Peso normal"
    dica: "Crie um método que devolve a categoria e junte no mesmo setText."
quiz:
  titulo: "Quiz — Fechamento do trimestre"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Em um app Android, qual arquivo define O QUE APARECE na tela?"
      opcoes:
        - { id: a, texto: "O layout XML" }
        - { id: b, texto: "O MainActivity.java" }
        - { id: c, texto: "O banco SQLite" }
        - { id: d, texto: "O arquivo JSON" }
      resposta_correta: a
      explicacao: "XML define a aparência; Java define o comportamento."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Qual é a sequência correta dentro de um método de clique que faz um cálculo?"
      opcoes:
        - { id: a, texto: "Ler os campos com findViewById, calcular, e escrever o resultado com setText" }
        - { id: b, texto: "Escrever o resultado antes de ler os campos" }
        - { id: c, texto: "Calcular antes de criar o layout" }
        - { id: d, texto: "Apagar a tela e recriar" }
      resposta_correta: a
      explicacao: "Ler, processar, mostrar — é o padrão de praticamente toda interação."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que o texto lido de um EditText precisa ser convertido antes de virar conta?"
      opcoes:
        - { id: a, texto: "Porque getText devolve texto, e não dá para fazer contas com texto" }
        - { id: b, texto: "Porque o EditText só aceita letras" }
        - { id: c, texto: "Não precisa converter" }
        - { id: d, texto: "Porque o Java não faz divisão" }
      resposta_correta: a
      explicacao: "Usamos Double.parseDouble(...) para transformar o texto digitado em número."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual a vantagem de separar o cálculo em um método próprio?"
      opcoes:
        - { id: a, texto: "O código do clique fica legível e o cálculo pode ser reaproveitado e corrigido em um lugar só" }
        - { id: b, texto: "Deixa o app mais lento" }
        - { id: c, texto: "É obrigatório no Android" }
        - { id: d, texto: "Não há vantagem" }
      resposta_correta: a
      explicacao: "É exatamente o que você viu na Aula 13 sobre métodos."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Se o app precisasse GUARDAR o histórico de IMCs mesmo fechando, o que usaria?"
      opcoes:
        - { id: a, texto: "SQLite, o banco local do aparelho" }
        - { id: b, texto: "Uma variável comum" }
        - { id: c, texto: "O arquivo de layout" }
        - { id: d, texto: "Nada, não é possível" }
      resposta_correta: a
      explicacao: "Variáveis somem quando o app fecha; o banco local persiste."
    - id: q6
      tipo: multipla_escolha
      enunciado: "E para MOSTRAR esse histórico em uma lista longa na tela?"
      opcoes:
        - { id: a, texto: "Uma RecyclerView alimentada por um Adapter" }
        - { id: b, texto: "Vários TextView criados manualmente" }
        - { id: c, texto: "Uma Intent" }
        - { id: d, texto: "Um EditText" }
      resposta_correta: a
      explicacao: "RecyclerView + Adapter é o par padrão para listas no Android."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Em qual método do ciclo de vida seria mais seguro salvar o que o usuário digitou?"
      opcoes:
        - { id: a, texto: "onPause" }
        - { id: b, texto: "onCreate" }
        - { id: c, texto: "onResume" }
        - { id: d, texto: "Nenhum" }
      resposta_correta: a
      explicacao: "É o primeiro aviso de que a tela vai sair da frente, e o mais garantido de executar."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que este projeto demonstra sobre como um app é construído?"
      opcoes:
        - { id: a, texto: "Que interface, lógica, métodos e dados trabalham juntos, cada um com seu papel" }
        - { id: b, texto: "Que tudo deve ficar em um único método" }
        - { id: c, texto: "Que o layout é opcional" }
        - { id: d, texto: "Que não é preciso testar" }
      resposta_correta: a
      explicacao: "É a soma de tudo que você viu neste trimestre."
---

## O projeto final do trimestre

Chegou a hora de juntar tudo. Neste projeto você vai construir uma **calculadora de IMC completa**
— do zero, montando a interface e escrevendo a lógica.

Você vai usar praticamente tudo do trimestre:

| Da aula | O que entra aqui |
|---|---|
| 1 e 2 | variáveis, tipos e operadores |
| 4 e 5 | `if / else if` e operadores lógicos |
| 6 | a fórmula e as faixas do IMC |
| 7 | `findViewById`, `getText`, `setText`, `onClick` |
| 8 | montar a tela arrastando componentes, com boa UX |
| 13 | separar o cálculo e a classificação em **métodos** |

## O padrão de toda interação

Quase toda ação em um app segue três passos:

1. **Ler** o que o usuário informou (`getText`);
2. **Processar** — calcular, decidir, validar;
3. **Mostrar** o resultado (`setText`).

Guardar esse padrão ajuda a organizar qualquer tela que você for construir.

## Texto vira número

Um detalhe importante: o `getText()` devolve **texto**, e não dá para fazer contas com texto. É
preciso **converter**:

```java
EditText campoPeso = findViewById(R.id.campoPeso);
double peso = Double.parseDouble(campoPeso.getText().toString());
```

O `Double.parseDouble(...)` transforma o texto `"70"` no número `70.0`. Para inteiros existe o
equivalente `Integer.parseInt(...)`.

## Organizando com métodos

Você poderia jogar tudo dentro do método `calcular`, mas ficaria confuso. Melhor separar, como
aprendeu na Aula 13:

```java
static double calcularImc(double peso, double altura) {
  return peso / (altura * altura);
}

static String classificar(double imc) {
  if (imc < 18.5) return "Abaixo do peso";
  else if (imc < 25) return "Peso normal";
  else if (imc < 30) return "Sobrepeso";
  else return "Obesidade";
}
```

Repare que o `classificar` usa vários `return`: assim que um deles executa, o método termina. É
uma forma bem legível de escrever classificações por faixa.

Com isso, o método do clique fica curto e claro:

```java
public void calcular(View v) {
  EditText campoPeso = findViewById(R.id.campoPeso);
  EditText campoAltura = findViewById(R.id.campoAltura);
  TextView resultado = findViewById(R.id.resultado);

  double peso = Double.parseDouble(campoPeso.getText().toString());
  double altura = Double.parseDouble(campoAltura.getText().toString());

  double imc = calcularImc(peso, altura);
  resultado.setText("IMC: " + imc + " - " + classificar(imc));
}
```

**Ler, processar, mostrar.** Cada peça no seu lugar.

## Atividade

A tela começa apenas com o título. Monte o resto pelo modo **Design**.

**Passo 1.** Arraste um `EditText` e ajuste no XML:

```xml
android:id="@+id/campoPeso"
android:hint="Peso em kg"
android:text="70"
```

**Passo 2.** Arraste outro `EditText`:

```xml
android:id="@+id/campoAltura"
android:hint="Altura em metros"
android:text="1.75"
```

**Passo 3.** Arraste um `Button`:

```xml
android:id="@+id/btnCalcular"
android:text="Calcular"
android:onClick="calcular"
```

**Passo 4.** Arraste um `TextView` com `android:id="@+id/resultado"` e texto vazio.

**Passo 5.** No `MainActivity.java`, crie os métodos `calcularImc` e `classificar`, e escreva o
método `calcular` seguindo o padrão ler → processar → mostrar.

**Passo 6.** Volte ao modo **Testar** e clique em Calcular. Com 70 kg e 1,75 m o resultado deve
mostrar o IMC e a classificação:

```
IMC: 22.857142857142858 - Peso normal
```

**Passo 7.** Teste outros valores: mude o peso para 50 e depois para 95, e confirme que a
classificação muda junto. Testar todos os caminhos é o que prova que o app funciona.

## Desafio extra

1. **Melhore a UX**: arredonde o IMC para uma casa decimal antes de mostrar (dica: multiplique por
   10, use `Math.round` e divida por 10). Compare `22.857142857142858` com `22.9` — qual é melhor
   para o usuário?
2. **Valide a entrada**: se a altura for 0, mostre `"Altura invalida"` em vez de calcular. O que
   aconteceria com a divisão sem essa validação?
3. Adicione um botão **Limpar** que zera os campos e o resultado.
4. **Pense e escreva como comentário**: para guardar o histórico de todos os IMCs calculados,
   mesmo depois de fechar o app, o que você usaria? E para exibir esse histórico em uma lista? Em
   qual método do ciclo de vida você salvaria? (As respostas estão nas Aulas 8, 9 e 12.)
