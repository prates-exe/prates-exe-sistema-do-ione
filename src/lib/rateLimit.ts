// Limitador de tentativas em memória. Funciona por instância do servidor —
// suficiente para o tamanho de uma turma/escola rodando em uma instância
// só; não substitui um limitador distribuído (Redis) se o site crescer para
// múltiplas instâncias.
const historico = new Map<string, number[]>();

export function permitir(chave: string, limite: number, janelaMs: number): boolean {
  const agora = Date.now();
  const tentativas = (historico.get(chave) ?? []).filter((t) => agora - t < janelaMs);

  if (tentativas.length >= limite) {
    historico.set(chave, tentativas);
    return false;
  }

  tentativas.push(agora);
  historico.set(chave, tentativas);
  return true;
}
