import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';

@UntilDestroy()
@Component({
  selector: 'app-pauta-form',
  templateUrl: './pauta-form.component.html',
  styleUrls: ['./pauta-form.component.css'],
})
export class PautaFormComponent implements OnInit {
  private _pautaId?: PautaResponseDTO;

  @Input()
  set pautaId(value: PautaResponseDTO | undefined) {
    this._pautaId = value;
    if (this.formsPauta) {
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
  }
  get pautaId(): PautaResponseDTO | undefined {
    return this._pautaId;
  }

  @Output() resetePauta = new EventEmitter<void>();
  formsPauta: FormGroup;
  public closeSubmit$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.formsPauta = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.closeSubmit$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.formsPauta.reset();
        this.formsPauta.markAsPristine();
        this.formsPauta.markAsUntouched();
      });
  }
}