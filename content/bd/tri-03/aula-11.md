---
titulo: "Projeto integrador 4: manutenção e integridade"
mes_numero: 3
numero_sequencial: 23
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Projeto Integrador — Parte 4: MANUTENCAO
  -- Um banco vivo muda todo dia. Vamos cuidar do nosso.
criterios_validacao:
  - descricao: "Corrigir o valor da diária de um jogo com UPDATE + WHERE"
    sql: "SELECT EXISTS(SELECT 1 FROM loc_jogos WHERE valor_diaria = 15)"
    dica: "UPDATE loc_jogos SET valor_diaria = 15 WHERE id = 1; — sempre com WHERE."
  - descricao: "Cadastrar um cliente novo (chegou depois da carga inicial)"
    sql: "SELECT (SELECT COUNT(*) FROM loc_clientes) >= 6"
    dica: "INSERT INTO loc_clientes (id, nome, telefone, cidade) VALUES (6, 'Novo Cliente', '99999-6666', 'Nanuque');"
  - descricao: "Criar a tabela loc_telefones para resolver o atributo multivalorado"
    sql: "SELECT EXISTS(SELECT 1 FROM pragma_foreign_key_list('loc_telefones') WHERE \"table\"='loc_clientes')"
    dica: "CREATE TABLE loc_telefones (id INTEGER PRIMARY KEY, cliente_id INT, numero VARCHAR(20), FOREIGN KEY (cliente_id) REFERENCES loc_clientes(id));"
  - descricao: "Cadastrar 2 telefones para um mesmo cliente"
    sql: "SELECT EXISTS(SELECT 1 FROM loc_telefones GROUP BY cliente_id HAVING COUNT(*) >= 2)"
    dica: "Insira dois números com o mesmo cliente_id — é assim que se resolve um multivalorado."
  - descricao: "Remover uma locação específica com DELETE + WHERE"
    sql: "SELECT (SELECT COUNT(*) FROM loc_locacoes) >= 9"
    dica: "DELETE FROM loc_locacoes WHERE id = 10; — remova apenas uma, conferindo antes com SELECT."
quiz:
  titulo: "Quiz — Manutenção e integridade"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "O que é integridade de dados?"
      opcoes:
        - { id: a, texto: "O tamanho do banco em megabytes" }
        - { id: b, texto: "A garantia de que os dados são corretos, consistentes e sem contradições" }
        - { id: c, texto: "A quantidade de tabelas" }
        - { id: d, texto: "A velocidade das consultas" }
      resposta_correta: b
      explicacao: "Chaves, tipos e restrições existem justamente para proteger a integridade."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Ao corrigir o preço de um jogo, o que acontece com os relatórios das views?"
      opcoes:
        - { id: a, texto: "Os relatórios são apagados" }
        - { id: b, texto: "Passam a usar o valor novo automaticamente, porque a view calcula na hora" }
        - { id: c, texto: "As views precisam ser recriadas" }
        - { id: d, texto: "Continuam com o valor antigo" }
      resposta_correta: b
      explicacao: "É a vantagem de calcular na consulta em vez de guardar o total em coluna fixa."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Qual é o risco de apagar um cliente que tem locações registradas?"
      opcoes:
        - { id: a, texto: "O banco apaga tudo sozinho" }
        - { id: b, texto: "As locações ficam apontando para um cliente inexistente, quebrando o relacionamento" }
        - { id: c, texto: "As locações viram clientes" }
        - { id: d, texto: "Nenhum risco" }
      resposta_correta: b
      explicacao: "São os chamados registros órfãos — some do INNER JOIN e o histórico se perde."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Como resolver corretamente um cliente com dois telefones?"
      opcoes:
        - { id: a, texto: "Com uma tabela de telefones ligada por FK, uma linha por número" }
        - { id: b, texto: "Criando telefone1 e telefone2" }
        - { id: c, texto: "Guardando apenas o primeiro" }
        - { id: d, texto: "Colocando os dois separados por vírgula no mesmo campo" }
      resposta_correta: a
      explicacao: "É a 1ª Forma Normal: cada campo guarda um valor atômico."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que fazer um SELECT antes de um DELETE?"
      opcoes:
        - { id: a, texto: "Não é necessário" }
        - { id: b, texto: "Para deixar o comando mais rápido" }
        - { id: c, texto: "Para ver exatamente quais linhas serão afetadas, sem alterar nada" }
        - { id: d, texto: "Porque o DELETE exige isso" }
      resposta_correta: c
      explicacao: "Não existe desfazer: conferir antes é a única proteção."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Ao adicionar uma tabela nova em um banco já em uso, o que acontece com os dados existentes?"
      opcoes:
        - { id: a, texto: "Viram parte da tabela nova" }
        - { id: b, texto: "Nada — as tabelas antigas continuam intactas" }
        - { id: c, texto: "Precisam ser recadastrados" }
        - { id: d, texto: "São apagados" }
      resposta_correta: b
      explicacao: "Um banco relacional é feito para evoluir sem perder o que já existe."
    - id: q7
      tipo: multipla_escolha
      enunciado: "Por que o valor total das locações NÃO deve ser guardado em uma coluna fixa?"
      opcoes:
        - { id: a, texto: "Porque ocuparia muito espaço" }
        - { id: b, texto: "Deveria ser guardado sim" }
        - { id: c, texto: "Porque ficaria desatualizado se a diária mudasse, gerando inconsistência" }
        - { id: d, texto: "Porque o SQL não permite" }
      resposta_correta: c
      explicacao: "Dado que pode ser calculado a partir de outros normalmente não se armazena."
    - id: q8
      tipo: multipla_escolha
      enunciado: "O que caracteriza um banco de dados bem mantido?"
      opcoes:
        - { id: a, texto: "Consultas sem WHERE" }
        - { id: b, texto: "Dados corretos, relacionamentos íntegros e alterações sempre filtradas por WHERE" }
        - { id: c, texto: "Muitas tabelas" }
        - { id: d, texto: "Nenhuma alteração desde a criação" }
      resposta_correta: b
      explicacao: "Manutenção cuidadosa é o que mantém o banco confiável ao longo do tempo."
---

## Um banco de dados é uma coisa viva

Sistemas reais não ficam parados. Preços mudam, clientes novos chegam, registros errados precisam
ser corrigidos, requisitos novos aparecem.

Esta aula é sobre **cuidar** do banco que você construiu — sem quebrar nada.

## Corrigindo dados

A locadora reajustou o valor de um jogo:

```sql
-- 1. Confira ANTES o que será afetado
SELECT id, titulo, valor_diaria FROM loc_jogos WHERE id = 1;

-- 2. Só então altere
UPDATE loc_jogos SET valor_diaria = 15 WHERE id = 1;
```

Repare em algo importante: depois desse `UPDATE`, **os relatórios já usam o valor novo
automaticamente**. Nada precisa ser refeito.

Por quê? Porque na Parte 3 você calculou o total **na consulta** (`dias * valor_diaria`), em vez
de guardá-lo em uma coluna. Se você tivesse guardado, todos os totais antigos estariam agora
errados — e você teria que recalcular tudo na mão.

Essa é a regra: **dado que pode ser calculado a partir de outros normalmente não se armazena**.

## Crescendo: dados novos

Um cliente novo simplesmente entra:

```sql
INSERT INTO loc_clientes (id, nome, telefone, cidade)
VALUES (6, 'Novo Cliente', '99999-6666', 'Nanuque');
```

E as views já o incluem nos relatórios assim que ele fizer a primeira locação. Nada a recriar.

## Evoluindo a estrutura

Requisito novo: alguns clientes têm **mais de um telefone**.

A tentação é criar `telefone2`. Mas você já sabe que isso quebra o modelo — e se aparecer um
terceiro número?

A solução correta é a da 1ª Forma Normal: **uma tabela separada**, com uma linha por número.

```sql
CREATE TABLE loc_telefones (
  id         INTEGER PRIMARY KEY,
  cliente_id INT,
  numero     VARCHAR(20),
  FOREIGN KEY (cliente_id) REFERENCES loc_clientes(id)
);
```

E o mais importante: **adicionar essa tabela não afeta nada do que já existe**. Todos os dados e
relatórios continuam funcionando. Um banco bem modelado **evolui sem quebrar** — é exatamente por
isso que investimos tempo na modelagem.

## Removendo com cuidado

```sql
-- 1. Confira
SELECT * FROM loc_locacoes WHERE id = 10;

-- 2. Remova
DELETE FROM loc_locacoes WHERE id = 10;
```

Aqui vale um alerta sobre **integridade**: e se você apagasse um **cliente** que tem locações?

As locações dele continuariam existindo, apontando para um cliente que não existe mais. São os
chamados **registros órfãos**: eles somem de qualquer relatório com `INNER JOIN`, e o histórico
fica corrompido silenciosamente.

Por isso, antes de apagar um registro "pai", sempre pergunte: **existe algo apontando para ele?**

```sql
SELECT COUNT(*) FROM loc_locacoes WHERE cliente_id = 3;
```

Se o resultado for maior que zero, apagar aquele cliente vai quebrar o relacionamento.

## Atividade

**Passo 1.** Corrija o valor da diária do jogo `id = 1` para `15`, conferindo antes com um
`SELECT`.

**Passo 2.** Rode de novo o relatório da aula anterior e confirme que os totais daquele jogo
mudaram sozinhos:

```sql
SELECT * FROM rel_locacoes_completo ORDER BY total DESC;
```

**Passo 3.** Cadastre um **cliente novo** (id 6).

**Passo 4.** Crie a tabela `loc_telefones`, com FK para `loc_clientes`.

**Passo 5.** Cadastre **dois telefones para o mesmo cliente**, resolvendo o atributo
multivalorado.

**Passo 6.** Monte a consulta que mostra cada cliente com todos os seus telefones:

```sql
SELECT c.nome, t.numero
FROM loc_clientes c
LEFT JOIN loc_telefones t ON t.cliente_id = c.id;
```

Usamos `LEFT JOIN` de propósito: assim aparecem também os clientes que ainda não têm telefone
cadastrado na tabela nova.

**Passo 7.** Remova a locação de `id = 10`, conferindo antes com um `SELECT`.

**Passo 8.** Antes de terminar, faça a verificação de integridade:

```sql
-- Existe alguma locacao apontando para cliente inexistente?
SELECT COUNT(*) FROM loc_locacoes
WHERE cliente_id NOT IN (SELECT id FROM loc_clientes);

-- E para jogo inexistente?
SELECT COUNT(*) FROM loc_locacoes
WHERE jogo_id NOT IN (SELECT id FROM loc_jogos);
```

Os dois devem devolver **zero**. Se não devolverem, há registros órfãos para corrigir.

## Desafio extra

1. Escolha um cliente e descubra quantas locações ele tem antes de considerar apagá-lo.
2. Aumente em 10% a diária de **todos** os jogos de uma plataforma específica (use `WHERE` com a
   plataforma, e multiplique o valor atual).
3. Pense: se um jogo for retirado do catálogo, o que deveria acontecer com o histórico de locações
   dele? Apagar as locações faria a locadora perder o registro de faturamento?
