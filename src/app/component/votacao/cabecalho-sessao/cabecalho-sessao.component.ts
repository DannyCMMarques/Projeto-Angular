import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-cabecalho-sessao',
  templateUrl: './cabecalho-sessao.component.html',
  styleUrls: ['./cabecalho-sessao.component.css'],
})
export class CabecalhoSessaoComponent {
  @Input() sessao!: SessaoIniciadaResponseDTO;
  @Output() expired = new EventEmitter<void>();

  onExpired() {
    this.expired.emit();
  }
}
