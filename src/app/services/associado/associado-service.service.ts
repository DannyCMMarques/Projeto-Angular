import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from 'src/app/config/const/urlBase.const';
import {
  AssociadoRequestDTO,
  AssociadoResponseDTO,
} from 'src/app/interfaces/interfaceAssociados';

@Injectable({
  providedIn: 'root',
})
export class AssociadoServiceService {
  baseUrl = urls.url_base;
  url = `${this.baseUrl}/api/v1/associado`;
  constructor(private http: HttpClient) {}

  cadastrarAssociado(associado: AssociadoRequestDTO) {
    return this.http.post<AssociadoResponseDTO>(this.url, associado);
  }

  buscarAssociado(params: {
    page: number;
    size: number;
    sortBy: string;
    direction: 'asc' | 'desc';
    cpf: string;
  }) {
    const queryParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString())
      .set('sortBy', params.sortBy)
      .set('direction', params.direction)
      .set('cpf', params.cpf);

    return this.http.get<{
      content: AssociadoResponseDTO[];
      totalElements: number;
      totalPages: number;
      last: boolean;
    }>(this.url, { params: queryParams });
  }
}
