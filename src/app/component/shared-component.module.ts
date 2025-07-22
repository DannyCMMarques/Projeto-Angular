import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContainerComponent } from './container/container.component';
import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';
import { ModalComponent } from './modal/modal.component';
import { ModalVisualizarDataComponent } from './modal-visualizar-data/modal-visualizar-data.component';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent, InformacoesResumoComponent, ModalComponent, ModalVisualizarDataComponent, ],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent,InformacoesResumoComponent,ModalComponent],
})
export class SharedComponentModule {}
