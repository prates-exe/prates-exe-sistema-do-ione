---
titulo: "Qualidade de código: refatoração e organização"
mes_numero: 3
numero_sequencial: 22
duracao_minutos: 25
tipo_sandbox: code
publicado: true
exercicio_inicial: |
  class Main {
    // Este metodo FUNCIONA, mas esta escrito de forma pessima.
    // Sua tarefa e refatorar sem mudar o resultado.
    static String f(double p, double a) {
      double x = p / (a * a);
      if (x < 18.5) { return "Abaixo do peso"; }
      else { if (x < 25) { return "Peso normal"; } else { if (x < 30) { return "Sobrepeso"; } else { return "Obesidade"; } } }
    }

    public static void main(String[] args) {
      // Passo 1: escreva a versao refatorada como classificarImc.
      // Passo 2: prove que as duas dao o mesmo resultado.

    }
  }
criterios_validacao:
  - descricao: "A versão refatorada deve classificar 70kg/1.75m como Peso normal"
    contem: "Refatorado: Peso normal"
    dica: "Crie static String classificarImc(double peso, double altura) e imprima \"Refatorado: \" + classificarImc(70, 1.75);"
  - descricao: "A versão refatorada deve classificar 95kg/1.75m como Obesidade"
    contem: "Refatorado obeso: Obesidade"
    dica: "Imprima \"Refatorado obeso: \" + classificarImc(95, 1.75);"
  - descricao: "Provar que o resultado é igual ao do método original"
    contem: "Iguais: true"
    dica: "System.out.println(\"Iguais: \" + classificarImc(70,1.75).equals(f(70,1.75)));"
quiz:
  titulo: "Quiz — Qualidade de código"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é refatorar um código?"
      opcoes:
        - { id: a, texto: "Melhorar a forma como está escrito sem mudar o que ele faz" }
        - { id: b, texto: "Adicionar funcionalidades novas" }
        - { id: c, texto: "Corrigir um erro" }
        - { id: d, texto: "Apagar e reescrever do zero" }
      resposta_correta: a
      explicacao: "Refatorar mantém o comportamento idêntico e melhora a estrutura."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Por que refatorar, se o código já funciona?"
      opcoes:
        - { id: a, texto: "Porque código confuso é difícil de corrigir e evoluir depois" }
        - { id: b, texto: "Porque deixa o app mais rápido sempre" }
        - { id: c, texto: "Porque o compilador exige" }
        - { id: d, texto: "Não vale a pena refatorar" }
      resposta_correta: a
      explicacao: "O custo do código ruim aparece na manutenção, não no dia em que foi escrito."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual é o problema de um método chamado 'f' com parâmetros 'p' e 'a'?"
      opcoes:
        - { id: a, texto: "Os nomes não dizem nada; quem lê precisa decifrar o código para entender" }
        - { id: b, texto: "Nomes curtos não compilam" }
        - { id: c, texto: "Deixa o programa lento" }
        - { id: d, texto: "Nenhum problema" }
      resposta_correta: a
      explicacao: "classificarImc(peso, altura) se explica sozinho."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual a vantagem de usar else if em vez de if aninhados dentro de else?"
      opcoes:
        - { id: a, texto: "Reduz o nível de indentação e deixa a sequência de faixas visível" }
        - { id: b, texto: "É mais rápido de executar" }
        - { id: c, texto: "Permite mais condições" }
        - { id: d, texto: "Nenhuma vantagem" }
      resposta_correta: a
      explicacao: "Aninhamento profundo é um dos maiores inimigos da legibilidade."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Qual é a regra de ouro ao refatorar?"
      opcoes:
        - { id: a, texto: "Garantir que o comportamento continua exatamente o mesmo, testando antes e depois" }
        - { id: b, texto: "Mudar o máximo possível de uma vez" }
        - { id: c, texto: "Refatorar sem testar" }
        - { id: d, texto: "Aproveitar para adicionar funções novas" }
      resposta_correta: a
      explicacao: "Refatorar e mudar comportamento ao mesmo tempo é receita para bug difícil de achar."
    - id: q6
      tipo: multipla_escolha
      enunciado: "O que é código duplicado e por que é um problema?"
      opcoes:
        - { id: a, texto: "O mesmo trecho repetido em vários lugares; se precisar mudar, você corrige em todos e esquece um" }
        - { id: b, texto: "Um arquivo copiado" }
        - { id: c, texto: "Dois métodos com nomes parecidos" }
        - { id: d, texto: "Não é problema" }
      resposta_correta: a
      explicacao: "A solução é extrair o trecho para um método e chamá-lo nos dois lugares."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Para que serve organizar as classes em pacotes?"
      opcoes:
        - { id: a, texto: "Agrupar arquivos por responsabilidade, facilitando encontrar as coisas quando o projeto cresce" }
        - { id: b, texto: "Deixar o app mais rápido" }
        - { id: c, texto: "Reduzir o tamanho do APK" }
        - { id: d, texto: "Nenhuma finalidade prática" }
      resposta_correta: a
      explicacao: "Telas, modelos e utilitários em pacotes separados é a organização mais comum."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que é um 'code review'?"
      opcoes:
        - { id: a, texto: "Outra pessoa lê o seu código e dá sugestões antes que ele seja considerado pronto" }
        - { id: b, texto: "Rodar o app para ver se funciona" }
        - { id: c, texto: "Apagar o código antigo" }
        - { id: d, texto: "Um tipo de teste automático" }
      resposta_correta: a
      explicacao: "É prática padrão no mercado — e é o que a turma vai fazer no Code Review coletivo."
---

## Funcionar é o mínimo

Chegamos a um ponto importante do curso. Até aqui, o objetivo era **fazer funcionar**. Agora vamos
falar de algo que separa quem programa por hobby de quem programa profissionalmente: **a
qualidade do que está escrito**.

Um código ruim que funciona hoje vira um problema caro amanhã — quando você precisar corrigir um
erro, adicionar uma função ou simplesmente entender o que fez.

## O que é refatorar

**Refatorar** é melhorar a forma como o código está escrito **sem mudar o que ele faz**.

Repare na definição: o comportamento continua **exatamente** igual. Se o resultado mudou, não foi
refatoração — foi alteração de funcionalidade, e as duas coisas nunca devem ser feitas ao mesmo
tempo.

## Os quatro problemas mais comuns

**1. Nomes que não dizem nada.**

```java
static String f(double p, double a)          // o que é f? o que é p?
static String classificarImc(double peso, double altura)   // se explica sozinho
```

Nomes são a documentação mais barata que existe. `x`, `f`, `temp`, `aux` obrigam quem lê a
decifrar o código inteiro para entender a intenção.

**2. Aninhamento profundo.**

```java
// RUIM: cada else abre outro nível
if (x < 18.5) { ... }
else { if (x < 25) { ... } else { if (x < 30) { ... } else { ... } } }

// BOM: a sequência de faixas fica visível
if (imc < 18.5) return "Abaixo do peso";
else if (imc < 25) return "Peso normal";
else if (imc < 30) return "Sobrepeso";
else return "Obesidade";
```

O segundo tem a mesma lógica, mas você **lê de cima para baixo** como uma tabela.

**3. Código duplicado.** O mesmo trecho copiado em dois lugares. Quando a regra mudar, você vai
corrigir um e esquecer o outro — e o bug vai aparecer semanas depois. A solução é extrair para um
método e chamar nos dois lugares.

**4. Métodos que fazem coisas demais.** Um método deve ter **uma responsabilidade**. Se você
precisa de "e" para descrever o que ele faz ("calcula o IMC **e** classifica **e** mostra na
tela"), provavelmente são três métodos.

## A regra de ouro

**Refatore em passos pequenos, garantindo que o comportamento não mudou.**

Se você tem os testes da aula 5, rode-os antes e depois. Se não tem, guarde a versão antiga e
compare os resultados — é exatamente o que a atividade de hoje pede.

Nunca refatore e adicione funcionalidade na mesma mexida: se algo quebrar, você não vai saber qual
das duas causou.

## Organização de pacotes

Quando o projeto cresce, todos os arquivos soltos na mesma pasta viram um caos. A solução é
agrupar por **responsabilidade**:

```
com.exemplo.meuapp
├── ui         (as telas: MainActivity, DetalheActivity)
├── model      (os dados: Aluno, Produto)
├── data       (banco de dados, acesso a API)
└── util       (funções auxiliares reutilizáveis)
```

O critério é sempre o mesmo: **quem procura, encontra**. Se alguém abrir o seu projeto pela
primeira vez, deve conseguir adivinhar onde está cada coisa.

## Code review

No mercado, código não é considerado pronto quando compila — é considerado pronto quando **outra
pessoa leu e aprovou**. Isso se chama **code review**.

Funciona porque quem escreveu está "cego" pelo próprio raciocínio. Um par de olhos novo encontra
em minutos o que você não viu em horas.

Ao revisar o código de um colega, foque em:

- os **nomes** dizem o que as coisas são?
- dá para **entender** sem perguntar nada?
- há **duplicação** que poderia virar um método?
- as **entradas** estão sendo validadas?

E ao receber uma revisão: crítica ao código não é crítica a você. É assim que todo profissional
melhora.

## Atividade

O método `f` no terminal **funciona perfeitamente** — e está escrito de forma péssima: nome
ilegível, parâmetros de uma letra e `if`s aninhados em três níveis.

**Passo 1.** Escreva a versão refatorada, chamada `classificarImc(double peso, double altura)`,
com nomes claros e `else if` encadeado. **Não mude a lógica** — apenas a forma.

**Passo 2.** Prove que ela funciona igual, imprimindo:

```
Refatorado: Peso normal
Refatorado obeso: Obesidade
```

**Passo 3.** Agora a parte mais importante: **prove que as duas versões dão o mesmo resultado**:

```java
System.out.println("Iguais: " + classificarImc(70, 1.75).equals(f(70, 1.75)));
```

Deve imprimir `Iguais: true`. Essa comparação é a prova de que você **refatorou** e não
**alterou** — é exatamente assim que se faz em um projeto real.

## Desafio extra

1. Compare as duas versões lado a lado. Quantos níveis de indentação cada uma tem? Qual você
   entenderia mais rápido daqui a três meses?
2. Refatore um método seu de um exercício anterior. Rode antes e depois para garantir o mesmo
   resultado.
3. Troque de código com um colega e faça um **code review** usando as quatro perguntas da lista
   acima. Anote as sugestões.
