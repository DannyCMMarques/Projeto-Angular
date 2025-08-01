import { Component, Input } from '@angular/core';
import { Status } from 'src/app/interfaces/Status';
import { corTags } from 'src/app/utils/helper/corTags/corTags';

@Component({
  selector: 'app-tags-resumo',
  templateUrl: './tags-resumo.component.html',
  styleUrls: ['./tags-resumo.component.css']
})
export class TagsResumoComponent {

  @Input() status!: Status;
  @Input() resultado?: string;
  @Input() exibirResultado: boolean = true;


  getCor(valor: string): 'verde' | 'amarelo' | 'vermelho' {
    return corTags(valor);
  }
}
