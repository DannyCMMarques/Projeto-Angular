import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informacoes-resumo',
  templateUrl: './informacoes-resumo.component.html',
  styleUrls: ['./informacoes-resumo.component.css']
})
export class InformacoesResumoComponent {

  @Input() icon?:string;
  @Input()  titulo!:string;
  @Input()  descricao?:string;
  @Input() duracao?:number;
  @Input()  horarioInicio?:string;
  @Input() horarioFim?:string;
  @Input() pautaTitulo?:string;
}
