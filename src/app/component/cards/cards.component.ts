import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Status } from 'src/app/interfaces/Status';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnChanges {
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
  @Output() onExcluir = new EventEmitter();
  @Output() onEditar = new EventEmitter();
  @Output() onVerResultados = new EventEmitter<number>();
  @Output() onIniciarSessao = new EventEmitter<number>();
  @Output() onParticiparSessao = new EventEmitter<number>();

  podeEditarOuExcluir = false;

 ngOnChanges(changes: SimpleChanges): void {
  if(changes['status']) {
    this.podeEditarOuExcluir =
      changes['status'].currentValue === 'NAO_VOTADA' || changes['status'].currentValue === 'NAO_INICIADA';
     }   }
  emitirExcluir(card: Event): void {
    this.onExcluir.emit(card);
  }
   emitirEditar(card:Event): void {
      this.onEditar?.emit(card);
   }

   emitirVerResultados(): void {
      this.onVerResultados.emit(this.id);
   }

   emitirIniciarSessao(): void {
      this.onIniciarSessao?.emit(this.id);
   }

   emitirParticiparSessao(): void {
      this.onParticiparSessao?.emit(this.id);
   }
}
