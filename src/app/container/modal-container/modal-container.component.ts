import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';
import { ModalContainerInterface } from 'src/app/interfaces/modalContainerInterface';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent {

  @Input() modal: ModalContainerInterface | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Input() sessaoDaPauta: SessaoIniciadaResponseDTO | undefined;
@Output() sucessoFormulario = new EventEmitter<void>();
fecharModal() {
  this.closeModal.emit();
}

onFormularioSucesso() {
  this.sucessoFormulario.emit();
  this.fecharModal();
}
}
