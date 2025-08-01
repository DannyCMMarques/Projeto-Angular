export function corTags (valor: string):"verde" | "amarelo" | "vermelho" {
  const coresVermelha = ['NAO_VOTADA', 'REPROVADO', 'NAO_INICIADA'];
  const coresVerde = ['VOTADA', 'APROVADO', 'FINALIZADA'];

  if (coresVerde.includes(valor)) return 'verde';
  if (coresVermelha.includes(valor)) return 'vermelho';
  return 'amarelo';
};
