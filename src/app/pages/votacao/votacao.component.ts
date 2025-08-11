import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.css'],
})
export class VotacaoComponent {
  @Output() voto = new EventEmitter<string>();
  @Input() sessao!: SessaoIniciadaResponseDTO;

  public handleVotar(voto: string) {
    this.voto.emit(voto);
  }

}
