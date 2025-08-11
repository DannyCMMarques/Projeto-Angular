import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CapitalizarComEspacosPipe } from '../shared/pipes/capitalizar-com-espacos.pipe';
import { BotaoStatusComponent } from './botao-status/botao-status.component';
import { BotaoVotacaoComponent } from './botao-votacao/botao-votacao.component';
import { CardsComponent } from './cards/cards.component';
import { ContainerComponent } from './container/container.component';
import { AssociadoFormComponent } from './forms/associado-form/associado-form.component';
import { PautaFormComponent } from './forms/pauta-form/pauta-form.component';
import { SessaoFormComponent } from './forms/sessao-form/sessao-form/sessao-form.component';
import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ModalVisualizarDataComponent } from './modal-visualizar-data/modal-visualizar-data.component';
import { ModalComponent } from './modal/modal.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { TagStatusComponent } from './tag-status/tag-status.component';
import { TagsResumoComponent } from './tags-resumo/tags-resumo.component';
import { VisualizarPautaComponent } from './visualizar-pauta/visualizar-pauta.component';
import { VisualizarSessaoComponent } from './visualizar-sessao/visualizar-sessao.component';
import { CabecalhoSessaoComponent } from './votacao/cabecalho-sessao/cabecalho-sessao.component';
import { EstatisticasVotosComponent } from './votacao/estatisticas-votos/estatisticas-votos.component';
import { HistoricoVotosComponent } from './votacao/historico-votos/historico-votos.component';
import { VotoItemComponent } from './votacao/voto-item/voto-item.component';

@NgModule({
  declarations: [
    MenuLateralComponent,
    ContainerComponent,
    InformacoesResumoComponent,
    ModalComponent,
    BotaoStatusComponent,
    ModalVisualizarDataComponent,
    BotaoVotacaoComponent,
    CardsComponent,
    TagStatusComponent,
    TagsResumoComponent,
    CapitalizarComEspacosPipe,
    LoadingComponent,
    PautaFormComponent,
    VisualizarPautaComponent,
    PaginadorComponent,
    SessaoFormComponent,
    VisualizarSessaoComponent,
    EstatisticasVotosComponent,
    HistoricoVotosComponent,
    VotoItemComponent,
    CabecalhoSessaoComponent,
    AssociadoFormComponent,
  ],
  imports: [CommonModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule, ],
  exports: [
    MenuLateralComponent,
    ContainerComponent,
    InformacoesResumoComponent,
    BotaoStatusComponent,
    ModalComponent,
    ModalVisualizarDataComponent,
    BotaoVotacaoComponent,
    CardsComponent,
    TagStatusComponent,
    TagsResumoComponent,
    CapitalizarComEspacosPipe,
    LoadingComponent,
    PautaFormComponent,
    VisualizarPautaComponent,
    PaginadorComponent,
    SessaoFormComponent,
    VisualizarSessaoComponent,
    EstatisticasVotosComponent,
    HistoricoVotosComponent,
    CabecalhoSessaoComponent,
    AssociadoFormComponent,
  ],
})
export class SharedComponentModule {}
