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
import {
  MODAL_FORM,
  ModalFormAdapter,
} from 'src/app/contratos/modal-form.types';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';

type PautaPayload = { titulo: string; descricao?: string };

@UntilDestroy()
@Component({
  selector: 'app-pauta-form',
  templateUrl: './pauta-form.component.html',
  styleUrls: ['./pauta-form.component.css'],
  providers: [
    { provide: MODAL_FORM, useExisting: forwardRef(() => PautaFormComponent) },
  ],
})
export class PautaFormComponent
  implements OnInit, ModalFormAdapter<PautaPayload>
{
  private _pautaId?: PautaResponseDTO;

  formsPauta: FormGroup;
  get form(): AbstractControl<any, any> {
    return this.formsPauta;
  }

  get id(): string | number | undefined {
    const id = this._pautaId?.id;
    return id == null ? undefined : id;
  }

  getValue(): PautaPayload {
    const { titulo, descricao } = this.formsPauta.getRawValue();
    return { titulo: titulo!, descricao: descricao ?? '' };
  }

  onModalClose(): void {
    this.closeSubmit$.next(true);
    this.formsPauta.reset();
    this.formsPauta.markAsPristine();
    this.formsPauta.markAsUntouched();
  }

  @Input()
  set pautaId(value: PautaResponseDTO | undefined) {
    this._pautaId = value;
    if (!this.formsPauta) return;

    if (value) {
      this.formsPauta.patchValue({
        titulo: value.titulo,
        descricao: value.descricao,
      });
      this.formsPauta.markAsPristine();
      this.formsPauta.markAsUntouched();
    } else {
      this.formsPauta.reset();
    }
  }
  get pautaId(): PautaResponseDTO | undefined {
    return this._pautaId;
  }

  @Output() resetePauta = new EventEmitter<void>();
  public closeSubmit$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.formsPauta = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.closeSubmit$.pipe(untilDestroyed(this)).subscribe(() => {
      this.formsPauta.reset();
      this.formsPauta.markAsPristine();
      this.formsPauta.markAsUntouched();
      this.resetePauta.emit();
    });
  }
}
