import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  TAMANHO_CLASSE_MODAL,
  TamanhoModal,
} from '../../../utils/constants/tamanhoClasseModal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() tamanho: TamanhoModal = 'md';
  @Output() close = new EventEmitter<void>();

  get tamanhoClasse(): string {
    return TAMANHO_CLASSE_MODAL[this.tamanho];
  }

  fechar(): void {
    this.close.emit();
  }
}
