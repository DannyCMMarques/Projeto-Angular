import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { TAMANHO_CLASSE_MODAL, TamanhoModal } from 'src/app/utils/constants/tamanhoClasseModal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent  {
  @Input() tamanho: TamanhoModal = 'md';
  @Input() showModal: boolean = true;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContainer', { read: ViewContainerRef })
  public modalContainer: ViewContainerRef | undefined;

  get tamanhoClasse(): string {
    return TAMANHO_CLASSE_MODAL[this.tamanho];
  }

  fechar(): void {
    this.close.emit();
  }

}
