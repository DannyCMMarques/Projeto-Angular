import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoCorHelper } from 'src/app/utils/helper/botao-status.helper/getCorBotao';
import { BotaoIconeHelper } from 'src/app/utils/helper/botao-status.helper/getIconeBotao';
import { BotaoTextoHelper } from 'src/app/utils/helper/botao-status.helper/getTextoBotao';

@Component({
  selector: 'app-botao-status',
  templateUrl: './botao-status.component.html',
  styleUrls: ['./botao-status.component.css']
})
export class BotaoStatusComponent {
  @Input() status: string = '';
  @Input() isSessao: boolean = false;
  @Input() id?: number;

  @Output() verResultados = new EventEmitter<number>();
  @Output() iniciarSessao = new EventEmitter<number>();
  @Output() participarSessao = new EventEmitter<number>();


    get cor() {
    return BotaoCorHelper.getCor(this.status, this.isSessao);
  }

  get texto() {
    return BotaoTextoHelper.getTexto(this.status, this.isSessao);
  }

  get icone() {
    return BotaoIconeHelper.getIcone(this.status, this.isSessao);
  }

  onClick(): void {
  if (!this.id) return;

  const { status, isSessao, id } = this;

  switch (true) {
    case !isSessao && status === 'EM VOTAÇÃO':
      this.participarSessao.emit(id);
      break;

    case !isSessao && status === 'VOTADA':
      this.verResultados.emit(id);
      break;

    case isSessao && status === 'NÃO INICIADA':
      this.iniciarSessao.emit(id);
      break;

    case isSessao && status === 'EM ANDAMENTO':
      this.participarSessao.emit(id);
      break;

    case isSessao && status === 'FINALIZADA':
      this.verResultados.emit(id);
      break;
  }
}

 get mostrarVerMais(): boolean {
    return (!this.isSessao && this.status === 'NÃO VOTADA') || (this.isSessao && this.status === 'NÃO INICIADA');
  }
}
