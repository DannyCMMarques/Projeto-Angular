import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContainerComponent } from './container/container.component';
import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent, InformacoesResumoComponent, ModalComponent],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent,InformacoesResumoComponent,ModalComponent],
})
export class SharedComponentModule {}
