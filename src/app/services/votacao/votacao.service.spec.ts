import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urls } from '../../config/const/urlBase.const';
import { mockVotoRequestSim, mockVotos } from '../../utils/mock/VotoMock';
import { VotacaoService } from './votacao.service';

describe('VotacaoService', () => {
  let service: VotacaoService;
  let httpMock: HttpTestingController;
  const baseUrl = urls.url_base;
  const apiUrl = `${baseUrl}/api/v1/sessao`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VotacaoService],
    });
    service = TestBed.inject(VotacaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('votar', () => {
    it('deve registrar um voto favorável', () => {
      const sessaoId = 1;
      const votoRequest = mockVotoRequestSim;
      const votoResponse = mockVotos[0];

      service.votar(sessaoId, votoRequest).subscribe((response) => {
        expect(response).toEqual(votoResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}/votar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(votoRequest);
      req.flush(votoResponse);
    });

    it('deve registrar um voto contrário', () => {
      const sessaoId = 1;
      const votoRequest = {
        voto: false,
        associado: 102,
      };
      const votoResponse = mockVotos[1];

      service.votar(sessaoId, votoRequest).subscribe((response) => {
        expect(response).toEqual(votoResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/${sessaoId}/votar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(votoRequest);
      req.flush(votoResponse);
    });
  });
});
