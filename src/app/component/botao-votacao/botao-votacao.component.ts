import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-votacao',
  templateUrl: './botao-votacao.component.html',
  styleUrls: ['./botao-votacao.component.css']
})
export class BotaoVotacaoComponent {

  @Output() votar = new EventEmitter<'SIM' | 'NAO'>();

}
