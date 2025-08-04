import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent {

  @Input() abrirFormulario!: () => void;
  @Input() isLoading: boolean = true;
  constructor() { }



}

