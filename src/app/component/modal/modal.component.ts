import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  TAMANHO_CLASSE_MODAL,
  TamanhoModal,
} from 'src/app/utils/constants/tamanhoClasseModal';
import { PautaFormComponent } from '../forms/pauta-form/pauta-form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() tamanho: TamanhoModal = 'md';
  @Input() showModal: boolean = true;
  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter();
  @ContentChild(PautaFormComponent) pautaFormComponent!: PautaFormComponent;
  @ViewChild('modalContainer', { read: ViewContainerRef })
  public modalContainer: ViewContainerRef | undefined;

  get tamanhoClasse(): string {
    return TAMANHO_CLASSE_MODAL[this.tamanho];
  }

  submit() {
    if (this.pautaFormComponent) {
      this.submitPauta();
    }
  }

  submitPauta() {
    if (this.pautaFormComponent && this.pautaFormComponent.formsPauta.value !== null) {

      console.log('Pauta Form Component:', this.pautaFormComponent.formsPauta);
       return this.submitForm.emit({formulario:this.pautaFormComponent.formsPauta.value, id:this.pautaFormComponent.pautaId?.id});
    }

  }
  fechar(): void {

    this.pautaFormComponent.closeSubmit$.next(true);
    this.close.emit();
  }
}
