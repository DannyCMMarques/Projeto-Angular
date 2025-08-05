export class BotaoTextoHelper {
   static getTexto(status: string, isSessao: boolean): string {
    if (!isSessao) {
      switch (status) {
        case 'NAO_VOTADA': return 'Aguardando Início';
        case 'EM_VOTACAO': return 'Votar';
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
