import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voto-item',
  templateUrl: './voto-item.component.html',
  styleUrls: ['./voto-item.component.css']
})
export class VotoItemComponent {
  @Input() voto!: 'SIM' | 'NAO';
  @Input() nome!: string;


 public Icon:'thumb_up'|'thumb_down' = this.voto === 'SIM' ? 'thumb_up' : 'thumb_down';


}
