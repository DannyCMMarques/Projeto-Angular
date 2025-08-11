import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { PautasService } from 'src/app/services/pautas/pautas.service';
import { SessoesService } from 'src/app/services/sessoes/sessoes.service';
import { mockPautaPage, mockPautas } from 'src/app/utils/mock/PautaMock';
import { PautasContainerComponent } from './pautas-container.component';

describe('PautasContainerComponent', () => {
  let component: PautasContainerComponent;
  let fixture: ComponentFixture<PautasContainerComponent>;
  let pautasService: jasmine.SpyObj<PautasService>;
  let sessoesService: jasmine.SpyObj<SessoesService>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    const pautasServiceSpy = jasmine.createSpyObj('PautasService', [
      'buscarPautas',
      'cadastrarPauta',
      'atualizarPauta',
      'excluirPauta',
    ]);

    const sessoesServiceSpy = jasmine.createSpyObj('SessoesService', [
      'buscarSessoes',
    ]);

    const toastrSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
      ],
      declarations: [PautasContainerComponent],
      providers: [
        { provide: PautasService, useValue: pautasServiceSpy },
        { provide: SessoesService, useValue: sessoesServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    TestBed.overrideComponent(PautasContainerComponent, {
      set: { template: '<div></div>' },
    });

    fixture = TestBed.createComponent(PautasContainerComponent);
    component = fixture.componentInstance;

    pautasService = TestBed.inject(
      PautasService
    ) as jasmine.SpyObj<PautasService>;
    sessoesService = TestBed.inject(
      SessoesService
    ) as jasmine.SpyObj<SessoesService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('exibirPautas', () => {
    it('deve carregar pautas com sucesso', () => {
      pautasService.buscarPautas.and.returnValue(of(mockPautaPage));

      (component as any).exibirPautas();

      expect(pautasService.buscarPautas).toHaveBeenCalled();
      expect(component.pautas).toEqual(mockPautaPage.content);
      expect(component.isLoading).toBeFalse();
    });

    it('deve mostrar erro quando falhar ao carregar pautas', () => {
      pautasService.buscarPautas.and.returnValue(
        throwError(() => new Error('Erro'))
      );

      (component as any).exibirPautas();

      expect(toastr.error).toHaveBeenCalled();
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('submitPauta', () => {
    it('deve cadastrar nova pauta com sucesso', () => {
      const form = {
        formulario: { titulo: 'Nova Pauta', descricao: 'Descrição' },
      };
      pautasService.cadastrarPauta.and.returnValue(of(mockPautas[0]));
      pautasService.buscarPautas.and.returnValue(of(mockPautaPage));

      component.submitPauta(form);

      expect(pautasService.cadastrarPauta).toHaveBeenCalledWith(
        form.formulario
      );
      expect(toastr.success).toHaveBeenCalled();
      expect(component.showModalFormulario).toBeFalse();
    });

    it('deve editar pauta existente com sucesso', () => {
      const form = {
        id: 1,
        formulario: { titulo: 'Editada', descricao: 'Descrição' },
      };
      pautasService.atualizarPauta.and.returnValue(of(mockPautas[0]));
      pautasService.buscarPautas.and.returnValue(of(mockPautaPage));

      component.submitPauta(form);

      expect(pautasService.atualizarPauta).toHaveBeenCalledWith(
        form.id,
        form.formulario
      );
      expect(toastr.success).toHaveBeenCalled();
    });
  });

  describe('deletarPauta', () => {
    it('deve deletar pauta com sucesso', () => {
      const pautaId = 1;
      pautasService.excluirPauta.and.returnValue(of(void 0));
      pautasService.buscarPautas.and.returnValue(of(mockPautaPage));

      component.deletarPauta(pautaId);

      expect(pautasService.excluirPauta).toHaveBeenCalledWith(pautaId);
      expect(toastr.success).toHaveBeenCalled();
    });

    it('deve mostrar erro quando falhar ao deletar pauta', () => {
      pautasService.excluirPauta.and.returnValue(
        throwError(() => new Error('Erro'))
      );

      component.deletarPauta(1);

      expect(toastr.error).toHaveBeenCalled();
    });
  });

  describe('abrirFormularioPauta', () => {
    it('deve abrir formulário para nova pauta', () => {
      component.abrirFormularioPauta();

      expect(component.showModalFormulario).toBeTrue();
      expect(component.pauta).toBeUndefined();
    });

    it('deve abrir formulário para editar pauta existente', () => {
      const pauta = mockPautas[0];
      component.abrirFormularioPauta(pauta);

      expect(component.showModalFormulario).toBeTrue();
      expect(component.pauta).toEqual(pauta);
    });
  });

  describe('navegarParaSessao', () => {
    it('deve navegar para página de sessão', () => {
      const pautaId = 1;

      component.navegarParaSessao(pautaId);

      expect(router.navigate).toHaveBeenCalledWith(['/sessao', pautaId]);
    });
  });

  describe('isPautaValid', () => {
    it('deve retornar true para pauta válida', () => {
      const pauta = mockPautas[0];
      expect(component.isPautaValid(pauta)).toBeTrue();
    });

    it('deve retornar false para pauta inválida', () => {
      const pautaInvalida: any = { titulo: 'sem id' };
      expect(component.isPautaValid(pautaInvalida)).toBeFalse();
    });
  });

  describe('ngOnInit', () => {
    it('deve chamar exibirPautas ao inicializar', () => {
      spyOn(component as any, 'exibirPautas');
      component.ngOnInit();
      expect((component as any).exibirPautas).toHaveBeenCalled();
    });
  });
});
