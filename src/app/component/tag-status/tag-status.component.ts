import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-status',
  templateUrl: './tag-status.component.html',
  styleUrls: ['./tag-status.component.css']
})
export class TagStatusComponent {

  @Input() cor: 'verde' | 'amarelo' | 'vermelho' = 'verde';
  @Input() texto: string = '';
  coresClasses = {
    verde: 'bg-green-100 text-green-800',
    amarelo: 'bg-yellow-100 text-yellow-800',
    vermelho: 'bg-red-100 text-red-800',
  };

}
