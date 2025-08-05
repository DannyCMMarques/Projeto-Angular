import { Injectable } from '@angular/core';
import { urls } from '../config/const/urlBase.const';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PautaRequestDTO, PautaResponseDTO } from '../interfaces/interfacePauta';

@Injectable({
  providedIn: 'root'
})
export class PautasService {
  baseUrl = urls.url_base;
  url = `${this.baseUrl}/api/v1/pauta`;

  constructor(private http: HttpClient) { }

  cadastrarPauta(
    pauta: PautaRequestDTO,

  ) {
    return this.http.post<PautaResponseDTO>(this.url, pauta);
  }

  buscarPautaPorId(id: number) {
    return this.http.get<PautaResponseDTO>(`${this.url}/${id}`);
  }

buscarPautas(
  params: {
    page: number,
    size?: number,
    sortBy?: string,
    direction?: 'asc' | 'desc',
    titulo?: string,
    status?: string,
  }
){
  const queryParams = new HttpParams()
    .set('pagina', params.page.toString())
    .set('tamanhoPagina', params.size?.toString() ?? '100');

if(params.sortBy) {
  queryParams.set('sortBy', params.sortBy);
}
if (params.direction) {
  queryParams.set('direction', params.direction);
}
if (params.titulo) {
  queryParams.set('titulo', params.titulo);
}
if (params.status) {
  queryParams.set('status', params.status);
}
return this.http.get<{ content: PautaResponseDTO[], totalElements: number, totalPages: number, last: boolean }>(this.url, { params: queryParams });
  }

  atualizarPauta(
    id: number,
    pauta: PautaRequestDTO
  ) {
    return this.http.put<PautaResponseDTO>(`${this.url}/${id}`, pauta);
  }

  excluirPauta(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}


