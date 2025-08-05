import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent {

  @Output() abrirFormulario = new EventEmitter();
  @Input() isLoading: boolean = true;
  @Input() pautas: PautaResponseDTO[] = [];
  @Output() deletarPautaFn: EventEmitter<number> = new EventEmitter<number>();
  @Input() abrirResultado!: (id: number) => void;
  @Input() navegarParaSessao!: (id: number) => void;
  constructor() { }


  abrirFormularioPauta(): void {
    this.abrirFormulario.emit();
  }

}

