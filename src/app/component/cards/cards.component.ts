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
  @Output() onEditar = new EventEmitter<number>();
  @Output() onVerResultados = new EventEmitter<number>();
  @Output() onIniciarSessao = new EventEmitter<number>();
  @Output() onParticiparSessao = new EventEmitter<number>();

  podeEditarOuExcluir = false;

 ngOnChanges(changes: SimpleChanges): void {
  if(changes['status']) {
    this.podeEditarOuExcluir =
      changes['status'].currentValue === 'NAO_VOTADA' || changes['status'].currentValue === 'NAO_INICIADA';
     console.log(changes)

     }   }
  emitirExcluir(card: Event): void {
    this.onExcluir.emit(card);
  }
   emitirEditar(): void {
     if (this.id != null) this.onEditar?.emit(this.id);
   }

   emitirVerResultados(): void {
     if (this.id != null) this.onVerResultados.emit(this.id);
   }

   emitirIniciarSessao(): void {
     if (this.id != null) this.onIniciarSessao?.emit(this.id);
   }

   emitirParticiparSessao(): void {
     if (this.id != null) this.onParticiparSessao?.emit(this.id);
   }
}
