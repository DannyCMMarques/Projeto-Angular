export class BotaoTextoHelper {
   static getTexto(status: string, isSessao: boolean): string {
    if (!isSessao) {
      switch (status) {
        case 'NÃO VOTADA': return 'Aguardando Início';
        case 'EM VOTAÇÃO': return 'Votar';
        case 'VOTADA': return 'Ver Resultados';
      }
    } else {
      switch (status) {
        case 'NÃO INICIADA': return 'Iniciar Sessão';
        case 'EM ANDAMENTO': return 'Participar Sessão';
        case 'FINALIZADA': return 'Ver Resultados';
      }
    }
    return 'Desconhecido';
  }
}
