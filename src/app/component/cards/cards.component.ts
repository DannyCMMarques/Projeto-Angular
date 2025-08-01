import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from 'src/app/interfaces/Status';
import { StatusPauta } from 'src/app/utils/enums/StatusPauta';
import { StatusSessao } from 'src/app/utils/enums/StatusSessao';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() status!: Status;
  @Input() descricao?: string;
  @Input() icon?: string;
  @Input() iconeExpandir?: string;
  @Input() resultado?: string;
  @Input() horarioInicio?: string | null;
  @Input() horarioFim?: string | null;
  @Input() duracao?: number;
  @Input() isSessao?: boolean;
  @Input() pautaTitulo?: string;
  @Input() id?: number;

  @Output() onEditar? = new EventEmitter<number>();
  @Output() onExcluir? = new EventEmitter<number>();
  @Output() onVerResultados? = new EventEmitter<number>();
  @Output() onIniciarSessao? = new EventEmitter<number>();
  @Output() onParticiparSessao? = new EventEmitter<number>();

  podeEditarOuExcluir =
    this.status === StatusSessao.NAO_INICIADA || this.status === StatusPauta.NAO_VOTADA;

  emitirEditar(): void {
    if (this.id != null) this.onEditar?.emit(this.id);
  }

  emitirExcluir(): void {
    if (this.id != null) this.onExcluir?.emit(this.id);
  }

  emitirVerResultados(): void {
    if (this.id != null) this.onVerResultados?.emit(this.id);
  }

  emitirIniciarSessao(): void {
    if (this.id != null) this.onIniciarSessao?.emit(this.id);
  }

  emitirParticiparSessao(): void {
    if (this.id != null) this.onParticiparSessao?.emit(this.id);
  }
}
