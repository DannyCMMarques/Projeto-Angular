import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urls } from '../../config/const/urlBase.const';
import {
  mockSessaoPage,
  mockSessaoRequest,
  mockSessoes,
} from '../../utils/mock/SessaoMock';
import { SessoesService } from './sessoes.service';

describe('SessoesService', () => {
  let service: SessoesService;
  let httpMock: HttpTestingController;
  const baseUrl = urls.url_base;
  const apiUrl = `${baseUrl}/api/v1/sessao`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessoesService],
    });
    service = TestBed.inject(SessoesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('cadastrarSessao', () => {
    it('deve criar uma nova sessão', () => {
      const novaSessao = mockSessaoRequest;
      const sessaoCriada = mockSessoes[0];

      service.cadastrarSessao(novaSessao).subscribe((response) => {
        expect(response).toEqual(sessaoCriada);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novaSessao);
      req.flush(sessaoCriada);
    });
  });

  describe('buscarSessaoPorId', () => {
    it('deve buscar sessão por ID', () => {
      const sessaoId = 1;
      const sessao = mockSessoes[0];

      service.buscarSessaoPorId(sessaoId).subscribe((response) => {
        expect(response).toEqual(sessao);
      });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}`);
      expect(req.request.method).toBe('GET');
      req.flush(sessao);
    });
  });

  describe('buscarSessoes', () => {
    it('deve buscar sessões com paginação', () => {
      const params = {
        page: 0,
        size: 10,
        sortBy: 'id',
        direction: 'desc' as const,
      };

      service.buscarSessoes(params).subscribe((response) => {
        expect(response).toEqual(mockSessaoPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockSessaoPage);
    });

    it('deve buscar sessões com filtro por pauta', () => {
      const params = {
        page: 0,
        size: 10,
        sortBy: 'id',
        direction: 'desc' as const,
        pautaId: 1,
      };

      service.buscarSessoes(params).subscribe((response) => {
        expect(response).toEqual(mockSessaoPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc&pautaId=1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockSessaoPage);
    });

    it('deve buscar sessões com filtro por status', () => {
      const params = {
        page: 0,
        size: 10,
        sortBy: 'id',
        direction: 'desc' as const,
        status: 'EM_ANDAMENTO',
      };

      service.buscarSessoes(params).subscribe((response) => {
        expect(response).toEqual(mockSessaoPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc&status=EM_ANDAMENTO`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockSessaoPage);
    });
  });

  describe('atualizarSessao', () => {
    it('deve atualizar uma sessão existente', () => {
      const sessaoId = 1;
      const sessaoAtualizada = { ...mockSessaoRequest, duracao: 60 };
      const sessaoResponse = { ...mockSessoes[0], duracao: 60 };

      service
        .atualizarSessao(sessaoId, sessaoAtualizada)
        .subscribe((response) => {
          expect(response).toEqual(sessaoResponse);
        });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(sessaoAtualizada);
      req.flush(sessaoResponse);
    });
  });

  describe('excluirSessao', () => {
    it('deve excluir uma sessão', () => {
      const sessaoId = 1;

      service.excluirSessao(sessaoId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('iniciarSessao', () => {
    it('deve iniciar uma sessão', () => {
      const sessaoId = 1;
      const sessaoIniciada = {
        ...mockSessoes[0],
        status: 'EM_ANDAMENTO' as const,
      };

      service.iniciarSessao(sessaoId).subscribe((response) => {
        expect(response).toEqual(sessaoIniciada);
      });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}/start`);
      expect(req.request.method).toBe('PATCH');
      req.flush(sessaoIniciada);
    });
  });
});
