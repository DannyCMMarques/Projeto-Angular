
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { MODAL_FORM, ModalFormAdapter } from 'src/app/contratos/modal-form.types';
import { SessaoFormDTO } from 'src/app/interfaces/interfaceSessao';

type SessaoPayload = {
  duracao: number | string;
  unidade: string;
  idPauta: number | string;
};

@UntilDestroy()
@Component({
  selector: 'app-sessao-form',
  templateUrl: './sessao-form.component.html',
  styleUrls: ['./sessao-form.component.css'],
  providers: [
    { provide: MODAL_FORM, useExisting: forwardRef(() => SessaoFormComponent) },
  ],
})
export class SessaoFormComponent
  implements OnInit, ModalFormAdapter<SessaoPayload>
{
  private _sessao?: SessaoFormDTO;

  @Output() reseteSessao = new EventEmitter<void>();
  formsSessao: FormGroup;

  get form(): AbstractControl<any, any> {
    return this.formsSessao;
  }

  get id(): number | string | undefined {
    return (this._sessao as any)?.id;
  }

  getValue(): SessaoPayload {
    const { duracao, unidade, idPauta } = this.formsSessao.getRawValue();
    return { duracao, unidade, idPauta };
  }

  onModalClose(): void {
    this.closeSubmit$.next(true);
    this.formsSessao.reset();
    this.formsSessao.markAsPristine();
    this.formsSessao.markAsUntouched();
    this.reseteSessao.emit();
  }

  @Input()
  set sessao(value: SessaoFormDTO | undefined) {
    this._sessao = value;

    if (this.formsSessao) {
            if (value) {
              this.formsSessao.patchValue({
                duracao: value.duracao,
                unidade: value.unidade,
                idPauta: value.idPauta,
              });
              this.formsSessao.markAsPristine();
              this.formsSessao.markAsUntouched();
            } else {
              this.formsSessao.reset();
            }
          }
  }
  get sessao(): SessaoFormDTO | undefined {
    return this._sessao;
  }

  public closeSubmit$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.formsSessao = this.fb.group({
      duracao: ['1', Validators.required],
      unidade: ['MIN', Validators.required],
      idPauta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.closeSubmit$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.formsSessao.reset();
        this.formsSessao.markAsPristine();
        this.formsSessao.markAsUntouched();
        this.reseteSessao.emit();
      });
  }
}
