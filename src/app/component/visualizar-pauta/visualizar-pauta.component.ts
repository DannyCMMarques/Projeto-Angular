import { Component, Input } from '@angular/core';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-visualizar-pauta',
  templateUrl: './visualizar-pauta.component.html',
  styleUrls: ['./visualizar-pauta.component.css']
})
export class VisualizarPautaComponent {

  @Input() pauta?: PautaResponseDTO;
  @Input() sessaoDaPauta?:SessaoIniciadaResponseDTO;
}
