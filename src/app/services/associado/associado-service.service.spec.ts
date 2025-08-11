import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urls } from '../../config/const/urlBase.const';
import {
  mockAssociadoPage,
  mockAssociadoRequest,
  mockAssociados,
} from '../../utils/mock/AssociadoMock';
import { AssociadoServiceService } from './associado-service.service';

describe('AssociadoServiceService', () => {
  let service: AssociadoServiceService;
  let httpMock: HttpTestingController;
  const baseUrl = urls.url_base;
  const apiUrl = `${baseUrl}/api/v1/associado`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssociadoServiceService],
    });
    service = TestBed.inject(AssociadoServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('cadastrarAssociado', () => {
    it('deve criar um novo associado', () => {
      const novoAssociado = mockAssociadoRequest;
      const associadoCriado = mockAssociados[0];

      service.cadastrarAssociado(novoAssociado).subscribe((response) => {
        expect(response).toEqual(associadoCriado);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novoAssociado);
      req.flush(associadoCriado);
    });
  });

  describe('buscarAssociado', () => {
    it('deve buscar associados por CPF com paginação', () => {
      const params = {
        page: 0,
        size: 10,
        sortBy: 'nome',
        direction: 'asc' as const,
        cpf: '12345678901',
      };

      service.buscarAssociado(params).subscribe((response) => {
        expect(response).toEqual(mockAssociadoPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=10&sortBy=nome&direction=asc&cpf=12345678901`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAssociadoPage);
    });

    it('deve buscar associados com ordenação descendente', () => {
      const params = {
        page: 0,
        size: 5,
        sortBy: 'id',
        direction: 'desc' as const,
        cpf: '12345678901',
      };

      service.buscarAssociado(params).subscribe((response) => {
        expect(response).toEqual(mockAssociadoPage);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=0&size=5&sortBy=id&direction=desc&cpf=12345678901`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAssociadoPage);
    });
  });
});
