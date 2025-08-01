export class BotaoIconeHelper {
  static getIcone(status: string, isSessao: boolean): string {
    if (!isSessao) {
      switch (status) {
        case 'NÃO VOTADA':
          return 'schedule';
        case 'EM VOTAÇÃO':
          return 'how_to_vote';
        case 'VOTADA':
          return 'check_circle';
      }
    } else {
      switch (status) {
        case 'NÃO INICIADA':
          return 'play_arrow';
        case 'EM ANDAMENTO':
          return 'group';
        case 'FINALIZADA':
          return 'check_circle';
      }
    }
    return 'help';
  }
}
