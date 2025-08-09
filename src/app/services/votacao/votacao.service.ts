import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from 'src/app/config/const/urlBase.const';
import { VotoRequestDTO, VotoResponseDTO } from 'src/app/interfaces/interfaceVotacao';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {
  baseUrl = urls.url_base;
  url = `${this.baseUrl}/api/v1/sessao`;
  constructor(private http: HttpClient) { }

  votar(id: number, votacao: VotoRequestDTO) {
    return this.http.post<VotoResponseDTO>(`${this.url}/${id}/votar`, votacao);
  }
}
