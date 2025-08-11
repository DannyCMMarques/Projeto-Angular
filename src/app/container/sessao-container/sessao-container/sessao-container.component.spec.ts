import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { SessoesService } from 'src/app/services/sessoes/sessoes.service';
import { mockSessaoPage, mockSessoes } from '../../../utils/mock/SessaoMock';
import { SessaoContainerComponent } from './sessao-container.component';

describe('SessaoContainerComponent', () => {
  let component: SessaoContainerComponent;
  let fixture: ComponentFixture<SessaoContainerComponent>;
  let sessoesService: jasmine.SpyObj<SessoesService>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    const sessoesServiceSpy = jasmine.createSpyObj('SessoesService', [
      'buscarSessoes',
      'cadastrarSessao',
      'atualizarSessao',
      'excluirSessao',
      'iniciarSessao',
      'buscarSessaoPorId',
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
      declarations: [SessaoContainerComponent],
      providers: [
        { provide: SessoesService, useValue: sessoesServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SessaoContainerComponent);
    component = fixture.componentInstance;

    sessoesService = TestBed.inject(
      SessoesService
    ) as jasmine.SpyObj<SessoesService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('exibirSessoes', () => {
    it('deve carregar sessões com sucesso', () => {
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.exibirSessoes();

      expect(sessoesService.buscarSessoes).toHaveBeenCalledWith({
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'desc',
      });
      expect(component.sessoes).toEqual(mockSessaoPage.content);
      expect(component.totalElementos).toBe(mockSessaoPage.totalElements);
      expect(component.totalPaginas).toBe(mockSessaoPage.totalPages);
      expect(component.isLoading).toBeFalse();
    });

    it('deve mostrar erro quando falhar ao carregar sessões', () => {
      sessoesService.buscarSessoes.and.returnValue(
        throwError(() => new Error('Erro'))
      );

      component.exibirSessoes();

      expect(toastr.error).toHaveBeenCalledWith('Erro ao buscar sessões:');
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('iniciarSessao', () => {
    it('deve iniciar sessão com sucesso', () => {
      const sessaoId = 1;
      sessoesService.iniciarSessao.and.returnValue(of({ ...mockSessoes[0] }));
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.iniciarSessao(sessaoId);

      expect(sessoesService.iniciarSessao).toHaveBeenCalledWith(sessaoId);
      expect(toastr.success).toHaveBeenCalledWith(
        'Sessão iniciada com sucesso'
      );
      expect(sessoesService.buscarSessoes).toHaveBeenCalled();
    });

    it('deve mostrar erro quando falhar ao iniciar sessão', () => {
      const sessaoId = 1;
      sessoesService.iniciarSessao.and.returnValue(
        throwError(() => new Error('Erro'))
      );

      component.iniciarSessao(sessaoId);

      expect(toastr.error).toHaveBeenCalledWith('Erro ao iniciar sessão:');
    });
  });

  describe('submitSessao', () => {
    it('deve cadastrar nova sessão com sucesso', () => {
      const form = {
        formulario: { idPauta: 1, duracao: 30, unidade: 'MIN' as const },
      };
      sessoesService.cadastrarSessao.and.returnValue(of(mockSessoes[0]));
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.submitSessao(form);

      expect(sessoesService.cadastrarSessao).toHaveBeenCalledWith(
        form.formulario
      );
      expect(toastr.success).toHaveBeenCalledWith(
        'Sessão cadastrada com sucesso!'
      );
      expect(component.showModalFormulario).toBeFalse();
    });

    it('deve editar sessão existente com sucesso', () => {
      const form = {
        id: 1,
        formulario: { idPauta: 1, duracao: 60, unidade: 'MIN' as const },
      };
      sessoesService.atualizarSessao.and.returnValue(of(mockSessoes[0]));
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.submitSessao(form);

      expect(sessoesService.atualizarSessao).toHaveBeenCalledWith(
        form.id,
        form.formulario
      );
      expect(toastr.success).toHaveBeenCalledWith(
        'Sessão editada com sucesso!'
      );
      expect(component.showModalFormulario).toBeFalse();
    });
  });

  describe('deletarSessao', () => {
    it('deve deletar sessão com sucesso', () => {
      const sessaoId = 1;
      sessoesService.excluirSessao.and.returnValue(of(void 0));
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.deletarSessao(sessaoId);

      expect(sessoesService.excluirSessao).toHaveBeenCalledWith(sessaoId);
      expect(toastr.success).toHaveBeenCalledWith(
        'Sessão deletada com sucesso'
      );
    });

    it('deve mostrar erro quando falhar ao deletar sessão', () => {
      const sessaoId = 1;
      sessoesService.excluirSessao.and.returnValue(
        throwError(() => new Error('Erro'))
      );

      component.deletarSessao(sessaoId);

      expect(toastr.error).toHaveBeenCalledWith('Erro ao deletar sessão:');
    });
  });

  describe('abrirFormularioSessao', () => {
    it('deve abrir formulário para nova sessão', () => {
      component.showModalFormulario = false;

      component.abrirFormularioSessao();

      expect(component.showModalFormulario).toBeTrue();
      expect(component.sessao).toBeUndefined();
    });

    it('deve abrir formulário para editar sessão existente', () => {
      const sessao = mockSessoes[0];
      component.showModalFormulario = false;

      component.abrirFormularioSessao(sessao);

      expect(component.showModalFormulario).toBeTrue();
      expect(component.sessao).toEqual({
        id: sessao.id,
        idPauta: sessao.pauta.id || 0,
        duracao: sessao.duracao,
        unidade: 'MIN',
      });
    });
  });

  describe('navegarParaSessao', () => {
    it('deve navegar para página de sessão', () => {
      const sessaoId = 1;

      component.navegarParaSessao(sessaoId);

      expect(navigateSpy).toHaveBeenCalledWith(['/sessao', sessaoId]);
    });
  });

  describe('onMudancaPagina', () => {
    it('deve atualizar página e recarregar sessões', () => {
      const novaPagina = 2;
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.onMudancaPagina(novaPagina);

      expect(component.pagina).toBe(novaPagina);
      expect(sessoesService.buscarSessoes).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('deve chamar exibirSessoes ao inicializar', () => {
      sessoesService.buscarSessoes.and.returnValue(of(mockSessaoPage));

      component.ngOnInit();

      expect(sessoesService.buscarSessoes).toHaveBeenCalledWith({
        page: 1,
        size: 10,
        sortBy: 'id',
        direction: 'desc',
      });
    });
  });
});
