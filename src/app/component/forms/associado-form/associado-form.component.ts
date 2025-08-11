import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { ModalFormAdapter, MODAL_FORM } from 'src/app/contratos/modal-form.types';

type AssociadoPayload = {
  nome: string;
  cpf: string;
};

@UntilDestroy()
@Component({
  selector: 'app-associado-form',
  templateUrl: './associado-form.component.html',
  styleUrls: ['./associado-form.component.css'],
  providers: [
    { provide: MODAL_FORM, useExisting: forwardRef(() => AssociadoFormComponent) },
  ],
})
export class AssociadoFormComponent
  implements OnInit, ModalFormAdapter<AssociadoPayload>
{
  public formsAssociado: FormGroup;

  @Output() resetAssociado = new EventEmitter<void>();
  public closeSubmit$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.formsAssociado = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }

  ngOnInit(): void {
    this.closeSubmit$.pipe(untilDestroyed(this)).subscribe(() => {
      this.formsAssociado.reset();
      this.formsAssociado.markAsPristine();
      this.formsAssociado.markAsUntouched();
      this.resetAssociado.emit();
    });
  }

  private atualizarValidacoes() {
    const nomeControl = this.formsAssociado.get('nome');

    if (this.mostrarCadastro) {
      nomeControl?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      nomeControl?.clearValidators();
    }

    nomeControl?.updateValueAndValidity();
  }

  @Input()
  set mostrarCadastro(value: boolean) {
    this._mostrarCadastro = value;
    this.atualizarValidacoes();
  }

  get mostrarCadastro(): boolean {
    return this._mostrarCadastro;
  }

  private _mostrarCadastro: boolean = false;

  get form(): AbstractControl<any, any> {
    return this.formsAssociado;
  }

  getValue(): AssociadoPayload {
    const { nome, cpf } = this.formsAssociado.getRawValue();
    return {
      nome: (nome ?? '').trim(),
      cpf: (cpf ?? '').replace(/\D/g, ''),
    };
  }

  onModalClose(): void {
    this.closeSubmit$.next(true);
  }
}
