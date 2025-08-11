import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AssociadoFormComponent } from './associado-form.component';

describe('AssociadoFormComponent', () => {
  let component: AssociadoFormComponent;
  let fixture: ComponentFixture<AssociadoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AssociadoFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(AssociadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function ensureNomeControl() {
    if (!component.formsAssociado.get('nome')) {
      component.formsAssociado.addControl('nome', new FormControl(''));
    }
    return component.formsAssociado.get('nome') as FormControl;
  }

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com form inválido (cpf required) e validar cpf de 11 dígitos', () => {
    const cpf = component.formsAssociado.get('cpf')!;
    expect(component.formsAssociado.valid).toBeFalse();

    cpf.setValue('123');
    expect(cpf.valid).toBeFalse();
    expect(component.formsAssociado.valid).toBeFalse();

    cpf.setValue('12345678901');
    expect(cpf.valid).toBeTrue();
    expect(component.formsAssociado.valid).toBeTrue();
  });

  it('deve aplicar validações de nome quando mostrarCadastro=true e removê-las quando =false', () => {
    const cpf = component.formsAssociado.get('cpf')!;
    cpf.setValue('12345678901');

    const nome = ensureNomeControl();

    component.mostrarCadastro = true;

    nome.setValue('');
    expect(nome.valid).toBeFalse();
    nome.setValue('ab');
    expect(nome.valid).toBeFalse();
    nome.setValue('abc');
    expect(nome.valid).toBeTrue();
    expect(component.formsAssociado.valid).toBeTrue();

    component.mostrarCadastro = false;
    nome.setValue('');
    expect(nome.valid).toBeTrue();
    expect(component.formsAssociado.valid).toBeTrue();
  });

  it('getValue deve normalizar nome (trim) e cpf (apenas dígitos)', () => {
    ensureNomeControl().setValue('  Ana  ');
    component.formsAssociado.get('cpf')!.setValue('111.222.333-44');

    const payload = component.getValue();
    expect(payload).toEqual({ nome: 'Ana', cpf: '11122233344' });
  });

  it('getValue deve funcionar quando nome não existir no form', () => {
    if (component.formsAssociado.get('nome')) {
      component.formsAssociado.removeControl('nome');
    }
    component.formsAssociado.get('cpf')!.setValue('00011122233');

    const payload = component.getValue();
    expect(payload).toEqual({ nome: '', cpf: '00011122233' });
  });

  it('onModalClose deve resetar o form e emitir resetAssociado (via closeSubmit$)', () => {
    ensureNomeControl().setValue('Nome');
    component.formsAssociado.get('cpf')!.setValue('12345678901');
    component.formsAssociado.markAsDirty();
    component.formsAssociado.markAsTouched();

    spyOn(component.resetAssociado, 'emit');

    component.ngOnInit();
    component.onModalClose();

    expect(component.resetAssociado.emit).toHaveBeenCalled();
    expect(component.formsAssociado.get('nome')?.value).toBeNull();
    expect(component.formsAssociado.get('cpf')?.value).toBeNull();
    expect(component.formsAssociado.pristine).toBeTrue();
    expect(component.formsAssociado.untouched).toBeTrue();
  });

  it('deve resetar e emitir ao chamar closeSubmit$.next(true) externamente', () => {
    ensureNomeControl().setValue('Outro Nome');
    component.formsAssociado.get('cpf')!.setValue('98765432100');
    component.formsAssociado.markAsDirty();
    component.formsAssociado.markAsTouched();

    spyOn(component.resetAssociado, 'emit');
    component.ngOnInit();

    component.closeSubmit$.next(true);

    expect(component.resetAssociado.emit).toHaveBeenCalled();
    expect(component.formsAssociado.get('nome')?.value).toBeNull();
    expect(component.formsAssociado.get('cpf')?.value).toBeNull();
    expect(component.formsAssociado.pristine).toBeTrue();
    expect(component.formsAssociado.untouched).toBeTrue();
  });

  it('getter form deve retornar o FormGroup', () => {
    expect(component.form).toBe(component.formsAssociado);
  });
});
