export class BotaoCorHelper {
  static getCor(status: string, isSessao: boolean): string {
    switch (status) {
      case 'NAO_VOTADA':
        return isSessao ? 'bg-yellow-100 text-yellow-900' : 'bg-gray-600 text-white';
      case 'EM_VOTACAO':
      case 'EM_ANDAMENTO':
        return 'bg-blue-600 text-white';
      case 'VOTADA':
      case 'FINALIZADA':
        return 'bg-gray-300 text-gray-600';
      default:
        return 'bg-gray-500 text-white';
    }
  }
}
