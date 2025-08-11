import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { AssociadoServiceService } from 'src/app/services/associado/associado-service.service';
import { SessoesService } from 'src/app/services/sessoes/sessoes.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { mockSessoes } from 'src/app/utils/mock/SessaoMock';
import { VotacaoContainerComponent } from './votacao-container.component';

describe('VotacaoContainerComponent', () => {
  let component: VotacaoContainerComponent;
  let fixture: ComponentFixture<VotacaoContainerComponent>;
  let sessoesService: jasmine.SpyObj<SessoesService>;
  let votacaoService: jasmine.SpyObj<VotacaoService>;
  let associadoService: jasmine.SpyObj<AssociadoServiceService>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  let routeParams$: BehaviorSubject<any>;

  beforeEach(() => {
    const sessoesServiceSpy = jasmine.createSpyObj('SessoesService', [
      'buscarSessaoPorId',
    ]);
    const votacaoServiceSpy = jasmine.createSpyObj('VotacaoService', ['votar']);
    const associadoServiceSpy = jasmine.createSpyObj(
      'AssociadoServiceService',
      ['buscarAssociado', 'cadastrarAssociado']
    );
    const toastrSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    routeParams$ = new BehaviorSubject<any>({});

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      declarations: [VotacaoContainerComponent],
      providers: [
        { provide: SessoesService, useValue: sessoesServiceSpy },
        { provide: VotacaoService, useValue: votacaoServiceSpy },
        { provide: AssociadoServiceService, useValue: associadoServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        {
          provide: ActivatedRoute,
          useValue: { params: routeParams$.asObservable() },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(VotacaoContainerComponent);
    component = fixture.componentInstance;

    sessoesService = TestBed.inject(
      SessoesService
    ) as jasmine.SpyObj<SessoesService>;
    votacaoService = TestBed.inject(
      VotacaoService
    ) as jasmine.SpyObj<VotacaoService>;
    associadoService = TestBed.inject(
      AssociadoServiceService
    ) as jasmine.SpyObj<AssociadoServiceService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');

    const mockSessaoIniciadaPadrao = {
      ...mockSessoes[0],
      horarioInicio: '2023-01-01T10:00:00',
      horarioFim: null,
      votos: [],
    } as any;
    sessoesService.buscarSessaoPorId.and.returnValue(
      of(mockSessaoIniciadaPadrao)
    );
  });

  afterEach(() => {
    fixture.destroy();
    routeParams$.complete();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve buscar sessão por ID ao inicializar', () => {
      const sessaoId = 1;

      component.ngOnInit();
      routeParams$.next({ id: String(sessaoId) });

      expect(sessoesService.buscarSessaoPorId).toHaveBeenCalledWith(sessaoId);
      expect(component.sessaoEncontradaPorId).toBeTruthy();
    });

    it('deve mostrar erro quando ID da sessão não for encontrado', () => {
      component.ngOnInit();
      routeParams$.next({});

      expect(toastr.error).toHaveBeenCalledWith('ID da sessão não encontrado');
      expect(navigateSpy).toHaveBeenCalledWith(['/sessoes']);
      expect(sessoesService.buscarSessaoPorId).not.toHaveBeenCalled();
    });
  });

  describe('votar', () => {
    it('deve votar com sucesso', () => {
      const voto = 'SIM';
      component.idSessao = 1;
      component.idUsuario = 1;

      votacaoService.votar.and.returnValue(
        of({ id: 1, voto: 'SIM', associado: { id: 1 } } as any)
      );

      component.votar(voto);

      expect(votacaoService.votar).toHaveBeenCalledWith(1, {
        voto: true,
        associado: 1,
      });
      expect(toastr.success).toHaveBeenCalledWith('Voto realizado com sucesso');
      expect(sessoesService.buscarSessaoPorId).toHaveBeenCalledWith(1);
    });

    it('deve mostrar erro quando falhar ao votar', () => {
      const voto = 'SIM';
      component.idSessao = 1;
      component.idUsuario = 1;

      votacaoService.votar.and.returnValue(
        throwError(() => new Error('Erro ao votar'))
      );

      component.votar(voto);

      expect(toastr.error).toHaveBeenCalledWith('Erro ao votar.');
    });
  });
});
