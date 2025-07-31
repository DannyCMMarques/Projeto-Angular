// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { CapitalizarComEspacosPipe } from '../shared/pipes/capitalizar-com-espacos.pipe';
// import { BotaoStatusComponent } from './botao-status/botao-status.component';
// import { BotaoVotacaoComponent } from './botao-votacao/botao-votacao.component';
// import { CardsComponent } from './cards/cards.component';
// import { ContainerComponent } from './container/container.component';
// import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';
// import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
// import { ModalVisualizarDataComponent } from './modal-visualizar-data/modal-visualizar-data.component';
// import { ModalComponent } from './modal/modal.component';
// import { TagStatusComponent } from './tag-status/tag-status.component';
// import { TagsResumoComponent } from './tags-resumo/tags-resumo.component';

// @NgModule({
//   declarations: [
//     MenuLateralComponent,
//     ContainerComponent,
//     InformacoesResumoComponent,
//     ModalComponent,
//     BotaoStatusComponent,
//     ModalVisualizarDataComponent,
//     BotaoVotacaoComponent,
//     CardsComponent,
//     TagsResumoComponent,
//     TagStatusComponent,
//     CapitalizarComEspacosPipe,
//   ],
//   imports: [CommonModule],
//   exports: [  MenuLateralComponent,
//     ContainerComponent,
//     InformacoesResumoComponent,
//     ModalComponent,
//     BotaoStatusComponent,
//     ModalVisualizarDataComponent,
//     BotaoVotacaoComponent,
//     CardsComponent,
//     TagsResumoComponent,
//     TagStatusComponent,
//     CapitalizarComEspacosPipe,],
// })
// export class SharedComponentModule {}



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
import { TagStatusComponent } from './tag-status/tag-status.component';
import { TagsResumoComponent } from './tags-resumo/tags-resumo.component';
import { CapitalizarComEspacosPipe } from '../shared/pipes/capitalizar-com-espacos.pipe';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent, InformacoesResumoComponent, ModalComponent,BotaoStatusComponent, ModalVisualizarDataComponent, BotaoVotacaoComponent, CardsComponent,TagStatusComponent,TagsResumoComponent,CapitalizarComEspacosPipe ],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent,InformacoesResumoComponent,BotaoStatusComponent,ModalComponent,ModalVisualizarDataComponent,BotaoVotacaoComponent,CardsComponent,TagStatusComponent,TagsResumoComponent,CapitalizarComEspacosPipe],
})
export class SharedComponentModule {}
