import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MODAL_FORM } from 'src/app/contratos/modal-form.types';
import { SessaoFormDTO } from 'src/app/interfaces/interfaceSessao';
import { SessaoFormComponent } from './sessao-form.component';

describe('SessaoFormComponent', () => {
  let component: SessaoFormComponent;
  let fixture: ComponentFixture<SessaoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [SessaoFormComponent],
      providers: [{ provide: MODAL_FORM, useExisting: SessaoFormComponent }],
    });
    fixture = TestBed.createComponent(SessaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('inicialização', () => {
    it('deve inicializar formulário com valores padrão', () => {
      expect(component.formsSessao.get('duracao')?.value).toBe('1');
      expect(component.formsSessao.get('unidade')?.value).toBe('MIN');
      expect(component.formsSessao.get('idPauta')?.value).toBe('');
    });

    it('deve ter validações corretas', () => {
      const duracaoControl = component.formsSessao.get('duracao');
      const unidadeControl = component.formsSessao.get('unidade');
      const idPautaControl = component.formsSessao.get('idPauta');

      expect(duracaoControl?.hasValidator(Validators.required)).toBeTrue();
      expect(unidadeControl?.hasValidator(Validators.required)).toBeTrue();
      expect(idPautaControl?.hasValidator(Validators.required)).toBeTrue();
    });
  });

  describe('getValue', () => {
    it('deve retornar valores do formulário', () => {
      component.formsSessao.patchValue({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '1',
      });

      const result = component.getValue();

      expect(result).toEqual({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '1',
      });
    });
  });

  describe('onModalClose', () => {
    it('deve resetar o formulário e emitir evento', () => {
      spyOn(component.reseteSessao, 'emit');
      spyOn(component.closeSubmit$, 'next');

      component.formsSessao.patchValue({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '1',
      });

      component.onModalClose();

      expect(component.closeSubmit$.next).toHaveBeenCalledWith(true);
      expect(component.reseteSessao.emit).toHaveBeenCalled();
      expect(component.formsSessao.pristine).toBeTrue();
      expect(component.formsSessao.untouched).toBeTrue();
    });
  });

  describe('Input sessao', () => {
    it('deve configurar formulário para nova sessão quando sessao for undefined', () => {
      component.sessao = undefined;

      expect(component.formsSessao.pristine).toBeTrue();
      expect(component.formsSessao.untouched).toBeTrue();
    });

    it('deve configurar formulário para editar sessão existente', () => {
      const sessaoExistente: SessaoFormDTO = {
        id: 1,
        duracao: 30,
        unidade: 'MIN',
        idPauta: 1,
      };

      component.sessao = sessaoExistente;

      expect(component.formsSessao.get('duracao')?.value).toBe(30);
      expect(component.formsSessao.get('unidade')?.value).toBe('MIN');
      expect(component.formsSessao.get('idPauta')?.value).toBe(1);
      expect(component.formsSessao.pristine).toBeTrue();
      expect(component.formsSessao.untouched).toBeTrue();
    });
  });

  describe('getters', () => {
    it('deve retornar form corretamente', () => {
      expect(component.form).toBe(component.formsSessao);
    });

    it('deve retornar id quando sessao existe', () => {
      const sessao: SessaoFormDTO = {
        id: 1,
        duracao: 30,
        unidade: 'MIN',
        idPauta: 1,
      };

      component.sessao = sessao;
      expect(component.id).toBe(1);
    });

    it('deve retornar undefined quando sessao não existe', () => {
      component.sessao = undefined;
      expect(component.id).toBeUndefined();
    });
  });

  describe('closeSubmit$ subscription', () => {
    it('deve resetar formulário quando closeSubmit$ emite', () => {
      spyOn(component.reseteSessao, 'emit');

      component.formsSessao.patchValue({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '1',
      });

      component.closeSubmit$.next(true);

      expect(component.reseteSessao.emit).toHaveBeenCalled();
      expect(component.formsSessao.pristine).toBeTrue();
      expect(component.formsSessao.untouched).toBeTrue();
    });
  });

  describe('validação do formulário', () => {
    it('deve ser válido quando todos os campos estão preenchidos', () => {
      component.formsSessao.patchValue({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '1',
      });

      expect(component.formsSessao.valid).toBeTrue();
    });

    it('deve ser inválido quando campos obrigatórios estão vazios', () => {
      component.formsSessao.patchValue({
        duracao: '',
        unidade: '',
        idPauta: '',
      });

      expect(component.formsSessao.valid).toBeFalse();
    });

    it('deve ser inválido quando apenas alguns campos estão preenchidos', () => {
      component.formsSessao.patchValue({
        duracao: '30',
        unidade: 'MIN',
        idPauta: '',
      });

      expect(component.formsSessao.valid).toBeFalse();
    });
  });
});
