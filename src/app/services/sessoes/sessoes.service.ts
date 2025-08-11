import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from 'src/app/config/const/urlBase.const';
import {
  SessaoRequestDTO,
  SessaoResponseDTO,
} from 'src/app/interfaces/interfaceSessao';

@Injectable({
  providedIn: 'root',
})
export class SessoesService {
  baseUrl = urls.url_base;
  url = `${this.baseUrl}/api/v1/sessao`;
  constructor(private http: HttpClient) {}

  cadastrarSessao(sessao: SessaoRequestDTO) {
    return this.http.post<SessaoResponseDTO>(this.url, sessao);
  }

  buscarSessaoPorId(id: number) {
    return this.http.get<SessaoResponseDTO>(`${this.url}/${id}`);
  }

  buscarSessoes(params: {
    page: number;
    size: number;
    sortBy: string;
    direction: 'asc' | 'desc';
    pautaId?: number;
    status?: string;
  }) {
    const queryParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString())
      .set('sortBy', params.sortBy)
      .set('direction', params.direction);

    if (params.pautaId) {
      queryParams.set('pautaId', params.pautaId.toString());
    }

    if (params.status) {
      queryParams.set('status', params.status);
    }
    return this.http.get<{
      content: SessaoResponseDTO[];
      totalElements: number;
      totalPages: number;
      last: boolean;
    }>(this.url, { params: queryParams });
  }

  atualizarSessao(id: number, sessao: SessaoRequestDTO) {
    return this.http.put<SessaoResponseDTO>(`${this.url}/${id}`, sessao);
  }

  excluirSessao(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  iniciarSessao(id: number) {
    return this.http.patch<SessaoResponseDTO>(`${this.url}/${id}/start`, {});
  }
}
