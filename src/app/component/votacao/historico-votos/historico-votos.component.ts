import { Component, Input } from '@angular/core';
import { VotoResponseDTO } from 'src/app/interfaces/interfaceVotacao';

@Component({
  selector: 'app-historico-votos',
  templateUrl: './historico-votos.component.html',
  styleUrls: ['./historico-votos.component.css']
})
export class HistoricoVotosComponent {
  @Input() votos!:  VotoResponseDTO[];
  @Input() isConcluida: boolean = false;
}
