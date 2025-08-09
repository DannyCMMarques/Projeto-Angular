import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginaAtual: number = 1;
  @Input() totalPaginas: number = 1;
  @Input() totalItens: number = 0;
  @Output() aoMudarPagina: EventEmitter<number> = new EventEmitter<number>();

  private tamanhoSegmento: number = 5;
  public paginas: number[] = [];
  public inicio: number = 1;
  public fim: number = 1;

  ngOnInit() {
    this.calcularPaginas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginaAtual'] || changes['totalPaginas']) {
      this.calcularPaginas();
    }
  }

  public calcularPaginas() {
    this.inicio = Math.floor((this.paginaAtual - 1) / this.tamanhoSegmento) * this.tamanhoSegmento + 1;
    this.fim = Math.min(this.inicio + this.tamanhoSegmento - 1, this.totalPaginas);
    this.paginas = Array.from({ length: this.fim - this.inicio + 1 }, (_, i) => this.inicio + i);
  }

  emitirMudarPagina(pagina: number) {
    this.aoMudarPagina.emit(pagina);
  }

  deveExibirPaginador(): boolean {
    return this.totalPaginas > 1;
  }
}
