import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessaoIniciadaResponseDTO, SessaoResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-sessoes',
  templateUrl: './sessoes.component.html',
  styleUrls: ['./sessoes.component.css']
})
export class SessoesComponent {
@Output() abrirFormulario = new EventEmitter();
@Input() isLoading: boolean = true;
@Input() sessoes: (SessaoResponseDTO | SessaoIniciadaResponseDTO)[] = [];
@Output() deletarSessaoFn: EventEmitter<number> = new EventEmitter<number>();
@Output() verResultados: EventEmitter<SessaoResponseDTO|PointerEvent> = new EventEmitter<SessaoResponseDTO|PointerEvent>();
@Output() navegarParaSessao: EventEmitter<number> = new EventEmitter<number>();
@Input() pagina: number = 1;
@Output() iniciarSessao: EventEmitter<number> = new EventEmitter<number>();
@Input() totalPages: number = 1;
@Input() totalElementos: number = 0;
@Output() mudancaPagina: EventEmitter<number> = new EventEmitter<number>();

abrirFormularioSessao(sessao: SessaoResponseDTO|MouseEvent): void {
  this.abrirFormulario.emit(sessao);
}

abrirSessaoResultados(sessao?: SessaoResponseDTO|PointerEvent): void {
  this.verResultados.emit(sessao);
}

iniciarSessaoFn(id: number): void {
  this.iniciarSessao.emit(id);
}

redirecionarParaSessao(id: number): void {
  this.navegarParaSessao.emit(id);
}

getHorarioInicio(sessao: SessaoResponseDTO | SessaoIniciadaResponseDTO): string | null {
  return 'horarioInicio' in sessao ? sessao.horarioInicio : null;
}

getHorarioFim(sessao: SessaoResponseDTO | SessaoIniciadaResponseDTO): string | null {
  return 'horarioFim' in sessao ? sessao.horarioFim : null;
}

}
