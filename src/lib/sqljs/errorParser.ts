export interface ErroSqlAnalisado {
  bruto: string;
  amigavel: string;
  tokenAlvo?: string;
  posicao?: { linha: number; coluna: number };
  intervalo?: { de: number; ate: number };
}

export function analisarErroSql(mensagem: string, querySql: string): ErroSqlAnalisado {
  let tokenAlvo: string | undefined;
  let amigavel = mensagem;

  const nearMatch = mensagem.match(/near "(.+?)": syntax error/i);
  const noSuchTable = mensagem.match(/no such table: (\S+)/i);
  const noSuchColumn = mensagem.match(/no such column: (\S+)/i);
  const notNull = mensagem.match(/NOT NULL constraint failed: (\S+)/i);
  const unique = mensagem.match(/UNIQUE constraint failed: (\S+)/i);
  const foreignKey = /FOREIGN KEY constraint failed/i.test(mensagem);

  if (nearMatch) {
    tokenAlvo = nearMatch[1];
    amigavel = `Erro de sintaxe perto de "${tokenAlvo}". Confira se não falta uma vírgula, um parêntese, ou se o comando está escrito corretamente.`;
  } else if (noSuchTable) {
    tokenAlvo = noSuchTable[1];
    amigavel = `A tabela "${tokenAlvo}" não existe. Confira se o nome foi digitado certo.`;
  } else if (noSuchColumn) {
    tokenAlvo = noSuchColumn[1];
    amigavel = `A coluna "${tokenAlvo}" não existe nessa tabela. Confira o nome da coluna.`;
  } else if (notNull) {
    amigavel = `O campo "${notNull[1]}" não pode ficar vazio (restrição NOT NULL).`;
  } else if (unique) {
    amigavel = `Já existe um registro com esse valor em "${unique[1]}" (restrição UNIQUE).`;
  } else if (foreignKey) {
    amigavel = `Essa operação viola uma chave estrangeira: o valor referenciado não existe na tabela relacionada.`;
  }

  let posicao: ErroSqlAnalisado["posicao"];
  let intervalo: ErroSqlAnalisado["intervalo"];
  if (tokenAlvo) {
    const index = querySql.indexOf(tokenAlvo);
    if (index >= 0) {
      posicao = indiceParaPosicao(querySql, index);
      intervalo = { de: index, ate: index + tokenAlvo.length };
    }
  }

  return { bruto: mensagem, amigavel, tokenAlvo, posicao, intervalo };
}

function indiceParaPosicao(texto: string, index: number): { linha: number; coluna: number } {
  const ateIndice = texto.slice(0, index);
  const linhas = ateIndice.split("\n");
  return { linha: linhas.length, coluna: linhas[linhas.length - 1].length + 1 };
}
