import { Component, Input } from '@angular/core';
import { TamanhoModal } from 'src/utils/constants/tamanhoClasseModal';

@Component({
  selector: 'app-modal-visualizar-data',
  templateUrl: './modal-visualizar-data.component.html',
  styleUrls: ['./modal-visualizar-data.component.css'],
})
export class ModalVisualizarDataComponent {
  @Input() id!: number;
  @Input() isSessao!: boolean;
  @Input() size: TamanhoModal = 'md';

  public open: boolean = false;

  public handleOpen() {
    this.open = true;
  }

  public handleClose() {
    this.open = false;
  }
}
