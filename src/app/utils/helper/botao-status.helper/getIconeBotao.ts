export class BotaoIconeHelper {
  static getIcone(status: string, isSessao: boolean): string {
    if (!isSessao) {
      switch (status) {
        case 'NAO_VOTADA':
          return 'schedule';
        case 'EM_VOTACAO':
          return 'how_to_vote';
        case 'VOTADA':
          return 'check_circle';
      }
    } else {
      switch (status) {
        case 'NAO_INICIADA':
          return 'play_arrow';
        case 'EM_ANDAMENTO':
          return 'group';
        case 'FINALIZADA':
          return 'check_circle';
      }
    }
    return 'help';
  }
}
