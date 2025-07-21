import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContainerComponent } from './container/container.component';
import { InformacoesResumoComponent } from './informacoes-resumo/informacoes-resumo.component';

@NgModule({
  declarations: [MenuLateralComponent, ContainerComponent, InformacoesResumoComponent],
  imports: [CommonModule,
],
  exports: [MenuLateralComponent,ContainerComponent],
})
export class SharedComponentModule {}
