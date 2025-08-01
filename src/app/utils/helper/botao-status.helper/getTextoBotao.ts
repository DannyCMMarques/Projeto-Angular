export class BotaoTextoHelper {
   static getTexto(status: string, isSessao: boolean): string {
    if (!isSessao) {
      switch (status) {
        case 'NÃO_VOTADA': return 'Aguardando Início';
        case 'EM VOTAÇÃO': return 'Votar';
        case 'VOTADA': return 'Ver Resultados';
      }
    } else {
      switch (status) {
        case 'NAO_INICIADA': return 'Iniciar Sessão';
        case 'EM_ANDAMENTO': return 'Participar Sessão';
        case 'FINALIZADA': return 'Ver Resultados';
      }
    }
    return 'Desconhecido';
  }
}
