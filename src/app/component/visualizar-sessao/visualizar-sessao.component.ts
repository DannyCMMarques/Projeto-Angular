import { Component, Input } from '@angular/core';
import { SessaoIniciadaResponseDTO, SessaoResponseDTO } from 'src/app/interfaces/interfaceSessao';

@Component({
  selector: 'app-visualizar-sessao',
  templateUrl: './visualizar-sessao.component.html',
  styleUrls: ['./visualizar-sessao.component.css']
})
export class VisualizarSessaoComponent {
  @Input() sessao!: SessaoResponseDTO | SessaoIniciadaResponseDTO;


  get deveMostrarGrafico(): boolean {
    return this.sessao?.pauta?.status !== 'NAO_VOTADA';
  }

  getHorarioInicio(): string | undefined {
    console.log('sessao', this.sessao)
    return 'horarioInicio' in this.sessao && this.sessao.horarioInicio ? this.sessao.horarioInicio : undefined;
  }

  getHorarioFim(): string | undefined {
    return 'horarioFim' in this.sessao && this.sessao.horarioFim ? this.sessao.horarioFim : undefined;
  }

}
