import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estatisticas-votos',
  templateUrl: './estatisticas-votos.component.html',
  styleUrls: ['./estatisticas-votos.component.css']
})
export class EstatisticasVotosComponent {
  @Input() total: number = 0;
  @Input() sim: number = 0;
  @Input() nao: number = 0;

  get simPct(): number {
    return this.total === 0 ? 0 : Math.round((this.sim / this.total) * 100);
  }

  get naoPct(): number {
    return this.total === 0 ? 0 : Math.round((this.nao / this.total) * 100);
  }

}
