import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContainerComponent } from './container/container.component';
import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';
import { ModalComponent } from './modal/modal.component';
import { ModalVisualizarDataComponent } from './modal-visualizar-data/modal-visualizar-data.component';
import { BotaoStatusComponent } from './botao-status/botao-status.component';
import { BotaoVotacaoComponent } from './botao-votacao/botao-votacao.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent, InformacoesResumoComponent, ModalComponent,BotaoStatusComponent, ModalVisualizarDataComponent, BotaoVotacaoComponent, CardsComponent, ],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent,InformacoesResumoComponent,BotaoStatusComponent,ModalComponent,ModalVisualizarDataComponent],
})
export class SharedComponentModule {}
