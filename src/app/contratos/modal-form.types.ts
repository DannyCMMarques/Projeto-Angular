// modal-form.types.ts
import { InjectionToken } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface ModalFormAdapter<T = any> {
  form: AbstractControl<any, any>;
  id?: string | number;
  getValue?(): T;
  onModalClose?(): void;
}

export const MODAL_FORM = new InjectionToken<ModalFormAdapter>('MODAL_FORM');
