import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent {

  @Input() abrirFormulario?: (id?: number) => void;
  @Input() isLoading: boolean = true;
  @Input() pautas: PautaResponseDTO[] = [];
@Input() deletarPautaFn: (id: number) => void = () => {};
  @Input() abrirResultado!: (id: number) => void;
  @Input() navegarParaSessao!: (id: number) => void;
  constructor() { }


public gerarCallbackExcluir(id: number): () => void {
  const fn = this.deletarPautaFn ?? (() => {});
  return () => fn(id);
}
}

