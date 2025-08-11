import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MODAL_FORM,
  ModalFormAdapter,
} from 'src/app/contratos/modal-form.types';
import {
  TAMANHO_CLASSE_MODAL,
  TamanhoModal,
} from 'src/app/utils/constants/tamanhoClasseModal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent<T = any> {
  @Input() tamanho: TamanhoModal = 'md';
  @Input() showModal: boolean = true;
  @Input() isEdit = false;
  @Input() submitLabel = 'Cadastrar';
  @Input() submitLabelEdit = 'Salvar alterações';
  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter();
  @Input() isForms = false;
  @ViewChild('modalContainer', { read: ViewContainerRef })
  public modalContainer: ViewContainerRef | undefined;
  @ContentChild(MODAL_FORM) modalForm?: ModalFormAdapter<T>;

  get tamanhoClasse(): string {
    return TAMANHO_CLASSE_MODAL[this.tamanho];
  }

  submit() {
    const formAdapter = this.modalForm;
    if (!formAdapter?.form) {
      return;
    }

    formAdapter.form.markAllAsTouched?.();

    
    if (formAdapter.form.valid) {
      const value = formAdapter.getValue
        ? formAdapter.getValue()
        : (formAdapter.form as any).getRawValue?.() ?? formAdapter.form.value;
      this.submitForm.emit({ formulario: value, id: formAdapter.id });
      this.fechar();
    } else {
    }
  }

  fechar(): void {
    this.modalForm?.onModalClose?.();
    this.close.emit();
  }
}
