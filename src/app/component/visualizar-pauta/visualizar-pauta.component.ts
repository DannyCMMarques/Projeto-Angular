import { Component, Input, OnInit } from '@angular/core';
import { PautaResultadoDTO } from 'src/app/interfaces/interfacePauta';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-visualizar-pauta',
  templateUrl: './visualizar-pauta.component.html',
  styleUrls: ['./visualizar-pauta.component.css'],
})
export class VisualizarPautaComponent implements OnInit {
  @Input() pauta?: PautaResultadoDTO;
  @Input() sessaoDaPauta?: SessaoIniciadaResponseDTO;

  get deveMostrarGrafico(): boolean {
    return this.pauta?.status !== 'NAO_VOTADA';
  }

  ngOnInit(): void {
    console.log('sessao da pauta', this.sessaoDaPauta);
    console.log('votos da sessao', this.sessaoDaPauta?.votos);
    console.log('pauta', this.pauta);
  }
}
