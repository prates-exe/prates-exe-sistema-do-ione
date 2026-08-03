---
titulo: "Projeto integrador 2: estrutura e carga de dados"
mes_numero: 3
numero_sequencial: 21
duracao_minutos: 25
tipo_sandbox: sql
publicado: false
exercicio_inicial: |
  -- Projeto Integrador — Parte 2: ESTRUTURA E DADOS
  -- Crie a tabela associativa e popule as tres tabelas.
criterios_validacao:
  - descricao: "Criar a tabela associativa loc_locacoes com as duas FKs"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_foreign_key_list('loc_locacoes')) >= 2"
    dica: "CREATE TABLE loc_locacoes (id INTEGER PRIMARY KEY, cliente_id INT, jogo_id INT, data_locacao DATE, dias INT, FOREIGN KEY (cliente_id) REFERENCES loc_clientes(id), FOREIGN KEY (jogo_id) REFERENCES loc_jogos(id));"
  - descricao: "A tabela de locações deve guardar data_locacao e dias"
    sql: "SELECT (SELECT COUNT(*) FROM pragma_table_info('loc_locacoes') WHERE name IN ('data_locacao','dias')) = 2"
    dica: "Esses dados pertencem à locação, não ao cliente nem ao jogo."
  - descricao: "Cadastrar pelo menos 5 clientes"
    sql: "SELECT (SELECT COUNT(*) FROM loc_clientes) >= 5"
    dica: "INSERT INTO loc_clientes (id, nome, telefone, cidade) VALUES ... com 5 clientes."
  - descricao: "Cadastrar pelo menos 6 jogos, de 2 plataformas diferentes"
    sql: "SELECT (SELECT COUNT(*) FROM loc_jogos) >= 6 AND (SELECT COUNT(DISTINCT plataforma) FROM loc_jogos) >= 2"
    dica: "Use plataformas variadas, como PS5 e Xbox."
  - descricao: "Registrar pelo menos 10 locações"
    sql: "SELECT (SELECT COUNT(*) FROM loc_locacoes) >= 10"
    dica: "Cadastre 10 locações usando os ids de clientes e jogos que existem."
  - descricao: "Um mesmo cliente com mais de uma locação (relacionamento N:M na prática)"
    sql: "SELECT EXISTS(SELECT 1 FROM loc_locacoes GROUP BY cliente_id HAVING COUNT(*) >= 2)"
    dica: "Repita o mesmo cliente_id em pelo menos duas locações."
  - descricao: "Um mesmo jogo alugado por mais de um cliente"
    sql: "SELECT EXISTS(SELECT 1 FROM loc_locacoes GROUP BY jogo_id HAVING COUNT(DISTINCT cliente_id) >= 2)"
    dica: "Faça o mesmo jogo_id aparecer com clientes diferentes."
  - descricao: "Deixar um jogo NUNCA alugado (para o LEFT JOIN da próxima aula)"
    sql: "SELECT EXISTS(SELECT 1 FROM loc_jogos WHERE id NOT IN (SELECT jogo_id FROM loc_locacoes WHERE jogo_id IS NOT NULL))"
    dica: "Cadastre 6 jogos mas use apenas 5 nas locações — o sexto fica sem nenhuma."
quiz:
  titulo: "Quiz — Estrutura e carga"
  nota_minima_aprovacao: 60
  perguntas:
    - id: q1
      tipo: multipla_escolha
      enunciado: "Por que a tabela associativa precisa ser criada DEPOIS das outras duas?"
      opcoes:
        - { id: a, texto: "Por preferência pessoal" }
        - { id: b, texto: "Porque as chaves estrangeiras dela apontam para tabelas que precisam já existir" }
        - { id: c, texto: "Porque tabelas associativas são menores" }
        - { id: d, texto: "Não precisa, a ordem é indiferente" }
      resposta_correta: b
      explicacao: "A FK referencia uma tabela existente; sem ela, o CREATE falha."
    - id: q2
      tipo: multipla_escolha
      enunciado: "Em que ordem os dados devem ser inseridos?"
      opcoes:
        - { id: a, texto: "Primeiro clientes e jogos, depois as locações que apontam para eles" }
        - { id: b, texto: "Tanto faz" }
        - { id: c, texto: "Tudo ao mesmo tempo" }
        - { id: d, texto: "Primeiro as locações" }
      resposta_correta: a
      explicacao: "A locação aponta para um cliente e um jogo que precisam existir de verdade."
    - id: q3
      tipo: multipla_escolha
      enunciado: "Por que inserir várias linhas em um único INSERT?"
      opcoes:
        - { id: a, texto: "Insere dados diferentes" }
        - { id: b, texto: "Não há vantagem" }
        - { id: c, texto: "É a única forma que funciona" }
        - { id: d, texto: "Deixa o script mais curto e legível, com um comando em vez de dez" }
      resposta_correta: d
      explicacao: "VALUES (...), (...), (...); insere várias linhas de uma vez."
    - id: q4
      tipo: multipla_escolha
      enunciado: "Qual formato de data usamos no SQL deste terminal?"
      opcoes:
        - { id: a, texto: "Datas não podem ser inseridas" }
        - { id: b, texto: "Qualquer formato serve" }
        - { id: c, texto: "'2026-08-15', entre aspas, no formato ano-mes-dia" }
        - { id: d, texto: "15/08/2026 sem aspas" }
      resposta_correta: c
      explicacao: "O formato ano-mes-dia é o padrão internacional e ordena corretamente."
    - id: q5
      tipo: multipla_escolha
      enunciado: "Por que é importante ter dados de teste VARIADOS?"
      opcoes:
        - { id: a, texto: "Não é importante" }
        - { id: b, texto: "Para gastar mais tempo" }
        - { id: c, texto: "Para o banco ficar maior" }
        - { id: d, texto: "Porque só com variedade os relatórios e agrupamentos revelam algo útil" }
      resposta_correta: d
      explicacao: "Se todos os clientes tiverem uma locação só, o ranking não mostra nada."
    - id: q6
      tipo: multipla_escolha
      enunciado: "Por que deixar de propósito um jogo nunca alugado?"
      opcoes:
        - { id: a, texto: "Por engano" }
        - { id: b, texto: "Não faz sentido" }
        - { id: c, texto: "Para o banco ficar incompleto" }
        - { id: d, texto: "Para poder testar o LEFT JOIN e encontrar itens sem movimento" }
      resposta_correta: d
      explicacao: "Dados de teste devem cobrir os casos extremos, não só o caminho feliz."
    - id: q7
      tipo: multipla_escolha
      enunciado: "O que acontece se você inserir uma locação com cliente_id que não existe?"
      opcoes:
        - { id: a, texto: "A tabela é apagada" }
        - { id: b, texto: "Nada de errado acontece" }
        - { id: c, texto: "O cliente é criado automaticamente" }
        - { id: d, texto: "O relacionamento fica quebrado e essa locação some dos relatórios com INNER JOIN" }
      resposta_correta: d
      explicacao: "É por isso que a ordem de inserção importa."
    - id: q8
      tipo: multipla_escolha
      enunciado: "Por que guardar 'dias' em vez de calcular a diferença entre duas datas?"
      opcoes:
        - { id: a, texto: "Porque datas não podem ser guardadas" }
        - { id: b, texto: "Porque ocupa menos espaço" }
        - { id: c, texto: "Simplifica o cálculo do valor total, que é dias vezes valor da diária" }
        - { id: d, texto: "Não há motivo" }
      resposta_correta: c
      explicacao: "É uma decisão de projeto: simplifica agora, e você pode evoluir depois."
---

## Da planta para a construção

Na Parte 1 você desenhou o modelo e criou duas tabelas. Agora vamos **completar a estrutura** e
**dar vida ao banco** com dados de verdade.

## A tabela que liga tudo

Falta a peça central: a tabela associativa que registra **quem alugou o quê**.

```sql
CREATE TABLE loc_locacoes (
  id             INTEGER PRIMARY KEY,
  cliente_id     INT,
  jogo_id        INT,
  data_locacao   DATE,
  dias           INT,
  FOREIGN KEY (cliente_id) REFERENCES loc_clientes(id),
  FOREIGN KEY (jogo_id)    REFERENCES loc_jogos(id)
);
```

Repare em três decisões:

1. **Duas chaves estrangeiras** — uma para cada lado do N:M.
2. **`data_locacao` e `dias`** ficam aqui, porque são dados **da locação**, não do cliente nem do
   jogo.
3. Guardamos **`dias`** em vez de calcular a diferença entre duas datas. É uma escolha de projeto
   que simplifica o cálculo do total (`dias × valor_diaria`) e é perfeitamente válida.

## A ordem importa duas vezes

**Na criação:** a tabela associativa precisa vir **por último**, porque as chaves estrangeiras
dela apontam para tabelas que já devem existir.

**Na inserção:** cadastre primeiro **clientes** e **jogos**, e só depois as **locações**. Uma
locação aponta para um cliente e um jogo que precisam existir de verdade — senão o relacionamento
nasce quebrado e a linha some de qualquer relatório com `INNER JOIN`.

## Dados de teste bem pensados

Aqui está algo que separa um trabalho bom de um mediano: **dados de teste não são aleatórios**.

Se todos os clientes tiverem exatamente uma locação, o ranking de "quem mais alugou" não mostra
nada. Se todos os jogos tiverem sido alugados, você não consegue testar o `LEFT JOIN`.

Então planeje os dados para cobrir os casos que quer demonstrar:

- **um cliente com várias locações** — para o ranking fazer sentido;
- **um jogo alugado por vários clientes** — para provar o N:M;
- **um jogo nunca alugado** — para o `LEFT JOIN` da próxima aula ter o que revelar;
- **plataformas variadas** — para o agrupamento por plataforma ter mais de uma linha.

Isso se chama pensar nos **casos extremos**, e é exatamente o que se espera de um profissional.

## Inserindo em lote

Use um `INSERT` com várias linhas — fica muito mais legível que dez comandos:

```sql
INSERT INTO loc_clientes (id, nome, telefone, cidade)
VALUES
  (1, 'Ana Silva',    '99999-1111', 'Teofilo Otoni'),
  (2, 'Bruno Costa',  '99999-2222', 'Teofilo Otoni'),
  (3, 'Carla Souza',  '99999-3333', 'Nanuque');
```

Datas vão entre aspas, no formato **ano-mês-dia**:

```sql
INSERT INTO loc_locacoes (id, cliente_id, jogo_id, data_locacao, dias)
VALUES (1, 1, 1, '2026-08-01', 3);
```

Esse formato é o padrão internacional e tem uma vantagem prática: ordena corretamente como texto.

## Atividade

**Passo 1.** Crie a tabela `loc_locacoes` com `id` (PK), `cliente_id`, `jogo_id`, `data_locacao`,
`dias` e as **duas** chaves estrangeiras.

**Passo 2.** Cadastre **5 clientes**, de pelo menos duas cidades.

**Passo 3.** Cadastre **6 jogos**, de **pelo menos 2 plataformas**, com valores de diária
variados.

**Passo 4.** Registre **10 locações**, planejadas para que:

- pelo menos **um cliente** apareça em **duas ou mais** locações;
- pelo menos **um jogo** seja alugado por **clientes diferentes**;
- **um jogo fique sem nenhuma locação** (use só 5 dos 6 jogos).

**Passo 5.** Confira a carga:

```sql
SELECT COUNT(*) AS clientes FROM loc_clientes;
SELECT COUNT(*) AS jogos FROM loc_jogos;
SELECT COUNT(*) AS locacoes FROM loc_locacoes;
```

O banco está pronto. Na próxima aula ele começa a responder perguntas.

## Desafio extra

1. Tente inserir uma locação com um `cliente_id` que **não existe** (por exemplo 99) e depois rode
   um `INNER JOIN` com clientes. Onde foi parar essa locação?
2. Cadastre um cliente que **nunca alugou nada** — mais um caso extremo útil para a próxima aula.
3. Confira se algum dado ficou repetido sem necessidade. O seu modelo está livre de redundância?
