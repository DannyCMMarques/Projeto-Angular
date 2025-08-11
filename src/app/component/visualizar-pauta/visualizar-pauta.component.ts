import { Component, Input, OnInit } from '@angular/core';
import { PautaResultadoDTO } from 'src/app/interfaces/interfacePauta';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-visualizar-pauta',
  templateUrl: './visualizar-pauta.component.html',
  styleUrls: ['./visualizar-pauta.component.css'],
})
export class VisualizarPautaComponent  {
  @Input() pauta?: PautaResultadoDTO;
  @Input() sessaoDaPauta?: SessaoIniciadaResponseDTO;

  get deveMostrarGrafico(): boolean {
    return this.pauta?.status !== 'NAO_VOTADA';
  }
}
