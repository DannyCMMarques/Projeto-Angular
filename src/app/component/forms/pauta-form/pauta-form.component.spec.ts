import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PautaFormComponent } from './pauta-form.component';

describe('PautaFormComponent', () => {
  let component: PautaFormComponent;
  let fixture: ComponentFixture<PautaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PautaFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(PautaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o form com controles e validações requeridas', () => {
    const form = component.formsPauta;
    expect(form).toBeTruthy();
    expect(form.get('titulo')).toBeTruthy();
    expect(form.get('descricao')).toBeTruthy();

    expect(form.valid).toBeFalse();
    form.get('titulo')?.setValue('Título X');
    expect(form.valid).toBeFalse();
    form.get('descricao')?.setValue('Descrição Y');
    expect(form.valid).toBeTrue();
  });

  it('pautaId (setter) deve preencher o form e manter pristine/untouched', () => {
    const pautaMock = { id: 123, titulo: 'T1', descricao: 'D1' } as any;

    component.formsPauta.get('titulo')?.setValue('antes');
    component.formsPauta.get('descricao')?.setValue('antes');
    component.formsPauta.markAsDirty();
    component.formsPauta.markAsTouched();

    component.pautaId = pautaMock;

    expect(component.formsPauta.get('titulo')?.value).toBe('T1');
    expect(component.formsPauta.get('descricao')?.value).toBe('D1');
    expect(component.formsPauta.pristine).toBeTrue();
    expect(component.formsPauta.untouched).toBeTrue();
    expect(component.id).toBe(123);
  });

  it('pautaId (setter) undefined deve resetar o form', () => {
    component.formsPauta.get('titulo')?.setValue('vai zerar');
    component.formsPauta.get('descricao')?.setValue('vai zerar');

    component.pautaId = undefined;

    expect(component.formsPauta.get('titulo')?.value).toBe(null);
    expect(component.formsPauta.get('descricao')?.value).toBe(null);
  });

  it('getValue deve retornar payload com titulo e descricao', () => {
    component.formsPauta.setValue({ titulo: 'T2', descricao: 'D2' });
    const payload = component.getValue();
    expect(payload).toEqual({ titulo: 'T2', descricao: 'D2' });
  });

  it('getValue deve retornar descricao "" quando nullish', () => {
    component.formsPauta.get('titulo')?.setValue('T3');
    component.formsPauta.get('descricao')?.setValue(null);
    const payload = component.getValue();
    expect(payload).toEqual({ titulo: 'T3', descricao: '' });
  });

  it('id deve ser undefined quando pautaId não foi definido', () => {
    component.pautaId = undefined;
    expect(component.id).toBeUndefined();
  });

  it('onModalClose deve emitir resetePauta e resetar o form (via closeSubmit$)', () => {
    component.formsPauta.setValue({ titulo: 'A', descricao: 'B' });
    component.formsPauta.markAsDirty();
    component.formsPauta.markAsTouched();

    spyOn(component.resetePauta, 'emit');

    component.ngOnInit();
    component.onModalClose();

    expect(component.resetePauta.emit).toHaveBeenCalled();
    expect(component.formsPauta.get('titulo')?.value).toBeNull();
    expect(component.formsPauta.get('descricao')?.value).toBeNull();
    expect(component.formsPauta.pristine).toBeTrue();
    expect(component.formsPauta.untouched).toBeTrue();
  });

  it('deve resetar e emitir quando closeSubmit$ for acionado externamente', () => {
    component.formsPauta.setValue({ titulo: 'X', descricao: 'Y' });
    component.formsPauta.markAsDirty();
    component.formsPauta.markAsTouched();

    spyOn(component.resetePauta, 'emit');

    component.ngOnInit();
    component.closeSubmit$.next(true);
    expect(component.resetePauta.emit).toHaveBeenCalled();
    expect(component.formsPauta.get('titulo')?.value).toBeNull();
    expect(component.formsPauta.get('descricao')?.value).toBeNull();
    expect(component.formsPauta.pristine).toBeTrue();
    expect(component.formsPauta.untouched).toBeTrue();
  });
});
