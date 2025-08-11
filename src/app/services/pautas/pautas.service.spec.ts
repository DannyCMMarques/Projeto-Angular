import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urls } from '../../config/const/urlBase.const';
import {
  mockPautaPage,
  mockPautaRequest,
  mockPautas,
} from '../../utils/mock/PautaMock';
import { PautasService } from './pautas.service';

describe('PautasService', () => {
  let service: PautasService;
  let httpMock: HttpTestingController;
  const baseUrl = urls.url_base;
  const apiUrl = `${baseUrl}/api/v1/pauta`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PautasService],
    });
    service = TestBed.inject(PautasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('cadastrarPauta', () => {
    it('deve criar uma nova pauta', () => {
      const novaPauta = mockPautaRequest;
      const pautaCriada = mockPautas[0];

      service.cadastrarPauta(novaPauta).subscribe((response) => {
        expect(response).toEqual(pautaCriada);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novaPauta);
      req.flush(pautaCriada);
    });
  });

  describe('buscarPautaPorId', () => {
    it('deve buscar pauta por ID', () => {
      const pautaId = 1;
      const pauta = mockPautas[0];

      service.buscarPautaPorId(pautaId).subscribe((response) => {
        expect(response).toEqual(pauta);
      });

      const req = httpMock.expectOne(`${apiUrl}/${pautaId}`);
      expect(req.request.method).toBe('GET');
      req.flush(pauta);
    });
  });

  describe('buscarPautas', () => {
    it('deve buscar pautas com paginação', () => {
      const params = {
        page: 0,
        size: 10,
        sortBy: 'id',
        direction: 'desc' as const,
      };

      service.buscarPautas(params).subscribe((response) => {
        expect(response).toEqual(mockPautaPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPautaPage);
    });

    it('deve buscar pautas com filtro por título', () => {
      const params = {
        page: 0,
        titulo: 'Biblioteca',
      };

      service.buscarPautas(params).subscribe((response) => {
        expect(response).toEqual(mockPautaPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPautaPage);
    });

    it('deve buscar pautas com filtro por status', () => {
      const params = {
        page: 0,
        status: 'EM_VOTACAO',
      };

      service.buscarPautas(params).subscribe((response) => {
        expect(response).toEqual(mockPautaPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=id&direction=desc`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPautaPage);
    });
  });

  describe('atualizarPauta', () => {
    it('deve atualizar uma pauta existente', () => {
      const pautaId = 1;
      const pautaAtualizada = {
        ...mockPautaRequest,
        titulo: 'Título Atualizado',
      };
      const pautaResponse = { ...mockPautas[0], titulo: 'Título Atualizado' };

      service.atualizarPauta(pautaId, pautaAtualizada).subscribe((response) => {
        expect(response).toEqual(pautaResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/${pautaId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(pautaAtualizada);
      req.flush(pautaResponse);
    });
  });

  describe('excluirPauta', () => {
    it('deve excluir uma pauta', () => {
      const pautaId = 1;

      service.excluirPauta(pautaId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${pautaId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
